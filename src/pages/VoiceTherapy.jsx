import React, { useState, useEffect } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import Logo_max from "../components/Logo-max";
import AudioVisualizer from "../components/AudioVisualizer";

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
function VoiceTherapy() {
  // State for tracking different phases
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  useEffect(() => {
    if (isRecording && mediaRecorder) {
      mediaRecorder.start();
      mediaRecorder.ondataavailable = (event) => {
        setAudioChunks((prev) => [...prev, event.data]);
      };
    } else if (mediaRecorder) {
      mediaRecorder.stop();
      if (mediaRecorder.stream) {
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      }
    }
  }, [isRecording, mediaRecorder]);

  useEffect(() => {
    if (!isRecording && audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      handleTranscription(audioBlob);
      setAudioChunks([]);
    }
  }, [isRecording, audioChunks]);

  const generativeCompletion = async (prompt) => {
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

  const handleTranscription = async (audioBlob) => {
    setIsTranscribing(true);
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

      await handleGenerativeResponse(data.text);
    } catch (error) {
      console.error("Error during transcription:", error);
      setIsTranscribing(false);
    }
  };

  const handleGenerativeResponse = async (transcribedText) => {
    const generativeText = await generativeCompletion(transcribedText);
    const textChunks = generativeText.trim().split("\n");
    console.log(textChunks);
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
        playAudioChunks(chunks, index + 1);
      });
    };

    playAudioChunks(textChunks);
  };
  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const newMediaRecorder = new MediaRecorder(stream);
          setMediaRecorder(newMediaRecorder);
          setIsRecording(true);
        })
        .catch((err) => console.error("Error accessing microphone", err));
    }
  };

  return (
    <div className="h-[100vh] bg-[#F9F9F9] relative overflow-hidden">
      <div className="mt-[5vh] flex w-full justify-between px-[10vw]">
        <IoMdInformationCircleOutline className="text-4xl text-indigo-800" />
        <IoSettingsOutline className="text-4xl text-indigo-800" />
      </div>
      <div>
        <Logo_max orientation={true} />
      </div>
      <div className="absolute mx-auto grid w-full justify-center">
        <AudioVisualizer
          voice={isRecording}
          fetching={isTranscribing}
          aiVoice={isSpeaking}
        />
        <FaMicrophone
          className={`mx-auto mt-12 text-4xl text-indigo-800 h-[2em] w-[2em] py-4 rounded-full bg-white shadow-lg ${
            isRecording
              ? "text-red-600"
              : "hover:text-indigo-600 hover:scale-[1.02]"
          }`}
          onClick={handleRecord}
        />
      </div>
    </div>
  );
}

export default VoiceTherapy;
