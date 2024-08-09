import React, { useState, useEffect, useRef } from "react";
import AudioVisualizer from "./AudioVisualizer";
import { FaMicrophone } from "react-icons/fa";


const key1 = import.meta.env.VITE_OPENAI_API_KEY;
const backend_url = import.meta.env.VITE_BACKEND_URL;
export const updateChatHistory = (userPrompt, modelResponse) => {
  const storageKey = "ChatHistory";
  let chatHistory = JSON.parse(localStorage.getItem(storageKey)) || [];

  const userEntry = {
    role: "user",
    parts: [{ text: userPrompt }],
  };

  const modelEntry = {
    role: "model",
    parts: [{ text: modelResponse }],
  };
  chatHistory.push(userEntry, modelEntry);
  localStorage.setItem(storageKey, JSON.stringify(chatHistory));
};

const handleTranscription = async (audioBlob) => {
  try {
    const formData = new FormData();
    const audioFile = new File([audioBlob], "audio.mp3", {
      type: "audio/mp3",
    });
    formData.append("file", audioFile);
    formData.append("model", "whisper-1");
    console.log(audioBlob);
    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key1}`,
        },
        body: formData,
      }
    );
    const data = await response.json();
    console.log(data.text);
    return data.text;
  } catch (error) {
    console.error("Error during transcription:", error);
  }
};
const safariCheck = () =>
  /constructor/i.test(window.HTMLElement) ||
  (function (p) {
    return p.toString() === "[object SafariRemoteNotification]";
  })(
    !window["safari"] ||
      (typeof safari !== "undefined" && window["safari"].pushNotification)
  );
function AudioLevelMeter() {
  const [isActive, setisActive] = useState(true);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSafari, setisSafari] = useState(safariCheck());
  // Refs
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const SILENCE_THRESHOLD= useRef(isSafari ? 0.65 : 1.2);
  const SILENCE_DURATION = useRef( 1000); // 1 second in milliseconds
  console.log(isSafari, SILENCE_DURATION.current, SILENCE_THRESHOLD.current);
  const handleGenerativeResponseVoice = async (response) => {
    const textChunks = response.trim().replace("\n", "").split(".");
    console.log("#############", textChunks);
    const playAudioChunks = async (chunks, index = 0) => {
      if (index >= chunks.length) return setIsSpeaking(false);
      setIsSpeaking(true);
      setIsTranscribing(false);

      const ttsResponse = await fetch(
        "https://api.openai.com/v1/audio/speech",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key1}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "tts-1",
            input: chunks[index],
            voice: "alloy",
          }),
        }
      );
      if (ttsResponse.status == 200) {
        const ttsBlob = await ttsResponse.blob();
        const audioUrl = URL.createObjectURL(ttsBlob);
        const audioElement = new Audio(audioUrl);
        audioElement.play();
        audioElement.addEventListener("ended", () => {
          if (index === chunks.length - 1) {
            setisActive(true);
            console.log("All audio chunks have finished playing");
          }
          playAudioChunks(chunks, index + 1);
        });
      } else {
        if (index === chunks.length - 1) {
          setisActive(true);
          console.log("All audio chunks have finished playing");
        }
        playAudioChunks(chunks, index + 1);
      }
    };
    playAudioChunks(textChunks);
  };

  useEffect(() => {
    try {
      navigator.mediaDevices
        .getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true },
          video: false,
        })
        .then((stream) => {
          if (isActive) {
            try {
              mediaRecorderRef.current = new MediaRecorder(stream, {
                mimeType: "audio/webm",
              });
            } catch (err) {
              mediaRecorderRef.current = new MediaRecorder(stream);
            }
            let chunkz = [];
            mediaRecorderRef.current.ondataavailable = (e) => {
              chunkz.push(e.data);
            };
            mediaRecorderRef.current.onstop = () => {
              if (chunkz.length > 0) {
                const audioBlob = new Blob(chunkz, { type: "audio/mp4" });
                handleGeminiText(audioBlob);
                chunkz = [];
              }
            };

            audioContextRef.current = new (window.AudioContext ||
              window.webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 32;
            const source =
              audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);
            measureAudioLevel();
            return () => {
              if (audioContextRef.current) {
                audioContextRef.current.close();
              }
              if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
              }
              if (silenceTimerRef.current) {
                clearTimeout(silenceTimerRef.current);
              }
            };
          }
        })
        .catch((err) => console.error("Error accessing microphone:", err));
      if (!isActive) {
        audioContextRef.current.close();
        return mediaRecorderRef.current.stream.getTracks().forEach((track) => {
          mediaRecorderRef.current.stream?.removeTrack(track);
          track.stop();
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [isActive]);

  const measureAudioLevel = () => {
    if (!analyserRef.current && isSpeaking) return;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    const sum = dataArray.reduce((acc, val) => acc + val, 0);
    const average = sum / bufferLength;
    const normalizedAverage = average / 70;
    setAudioLevel(normalizedAverage);

    if (normalizedAverage > SILENCE_THRESHOLD.current) {
      setIsRecording(true);
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
    } else if (!silenceTimerRef.current) {
      // Start the silence timer if it's not already running
      silenceTimerRef.current = setTimeout(() => {
        setIsRecording(false);
        silenceTimerRef.current = null;
      }, SILENCE_DURATION.current);
    }

    animationFrameRef.current = requestAnimationFrame(measureAudioLevel);
  };

  useEffect(() => {
    if (mediaRecorderRef.current) {
      if (isRecording & !isSpeaking) {
        mediaRecorderRef.current.start();
      } else if (!isRecording) {
        mediaRecorderRef.current.stop();
      }
    }
  }, [isRecording, isSpeaking]);

  const handleGeminiText = async (audioBlob) => {
    setIsTranscribing(true);
    setisActive(false);
    const transcription = await handleTranscription(audioBlob);
    try {
      const chatResponse = await fetch(`${backend_url}/conversation/chat`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: transcription,
          history: localStorage.getItem("ChatHistory")
            ? JSON.parse(localStorage.getItem("ChatHistory"))
            : [],
        }),
      });
      const res = await chatResponse.json();
      console.log(res);
      if (res.status == "success") {
        updateChatHistory(transcription, res.response);
        setIsTranscribing(false);
        handleGenerativeResponseVoice(res.response);
      }
    } catch (error) {
      console.error("Error during transcription:", error);
      setIsTranscribing(false);
    }
  };

  return (
    <div>
      <p
        className={` bg-red-300 h-[.4em] mx-auto my-4 rounded-full linear-bg`}
        style={{ width: `${14 * audioLevel.toFixed(2) + 1}em` }}
      ></p>
      <AudioVisualizer
        aiVoice={isSpeaking}
        fetching={isTranscribing}
        voice={isRecording}
        active={isActive}
      />
      <FaMicrophone
        className={`mx-auto mt-12 text-4xl h-[2em] w-[2em] py-4 rounded-full bg-white shadow-lg ${
          isActive ? "text-red-600" : "text-gray-600 hover:scale-[1.02]"
        }`}
        onClick={() => setisActive(!isActive)}
      />
    </div>
  );
}

export default AudioLevelMeter;
