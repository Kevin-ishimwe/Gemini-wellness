import React, { useState, useEffect, useRef } from "react";
import AudioVisualizer from "./AudioVisualizer";
import { FaMicrophone } from "react-icons/fa";

const key1 = import.meta.env.VITE_OPENAI_API_KEY;

function updateChatHistory(userPrompt, modelResponse) {
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
}

const generativeCompletion = async (prompt) => {
  console.log(prompt);
  try {
    const chatResponse = await fetch("http://localhost:2020/conversation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, history: [] }),
    }).then((res) => res.json());

    const modelResponse = await chatResponse.response;
    updateChatHistory(prompt, modelResponse);
    return modelResponse;
  } catch (err) {
    console.log("Generative completion failed:", err);
  }
};
function AudioLevelMeter() {
  const [isActive, setisActive] = useState(true);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  // Refs
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const SILENCE_THRESHOLD = 1;
  const SILENCE_DURATION = 2500; // 1 second in milliseconds

  const handleGenerativeResponse = async (transcribedText) => {
    console.log(transcribedText);
    const generativeText = await generativeCompletion(transcribedText);
    const textChunks = generativeText.trim().split("\n");
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
      if (!ttsResponse.ok) {
        const errorDetails = await ttsResponse.json();
        setIsSpeaking(false);
        throw new Error(
          `TTS API request failed: ${ttsResponse.statusText} - ${errorDetails.error.message}`
        );
      }

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
    };
    playAudioChunks(textChunks);
  };
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        if (isActive) {
          mediaRecorderRef.current = new MediaRecorder(stream, {
            mimeType: "audio/webm",
          });
          let chunkz = [];
          mediaRecorderRef.current.ondataavailable = (e) => {
            console.log(e.data.size);
            if (e.data.size > 20000) {
              chunkz.push(e.data);
            }
          };
          mediaRecorderRef.current.onstop = () => {
            if (chunkz.length > 0) {
              const audioBlob = new Blob(chunkz, { type: "audio/webm" });
              handleTranscription(audioBlob);
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
        } else {
          audioContextRef.current.close();
          stream.getTracks().forEach((track) => track.stop());
        }
      })
      .catch((err) => console.error("Error accessing microphone:", err));
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

    if (normalizedAverage > SILENCE_THRESHOLD) {
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
      }, SILENCE_DURATION);
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

  const handleTranscription = async (audioBlob) => {
    setIsTranscribing(true);
    setisActive(false);
    const formData = new FormData();
    const audioFile = new File([audioBlob], "audio.webm", {
      type: "audio/webm",
    });
    formData.append("file", audioFile);
    formData.append("model", "whisper-1");

    try {
      const response = await fetch(
        "https://api.openai.com/v1/audio/transcriptions",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${key1}` },
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data.text);
      // Handle transcription result here
      setIsTranscribing(false);
      handleGenerativeResponse(data.text);
    } catch (error) {
      console.error("Error during transcription:", error);
      setIsTranscribing(false);
    }
  };

  return (
    <div>
      <p>Current Audio Level: {audioLevel.toFixed(2)}</p>
      <p>Status: {isSpeaking ? "Speaking" : "Silent"}</p>
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
