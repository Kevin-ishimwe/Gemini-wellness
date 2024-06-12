import React, { useState, useEffect } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import Logo_max from "../components/Logo-max";

const apicall = async (transcribedText) => {
  // Call the chat completion API
  const chatResponse = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer `,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a professional therapist named Gemmi. Talk to the user in a calm manner and try to help them resolve their emotional strife.",
          },
          { role: "user", content: transcribedText },
        ],
      }),
    }
  );

  const chatCompletion = await chatResponse.json();
  const message = chatCompletion.choices[0].message.content;
  const textchunks = message.split(".");

  // Function to play audio chunks sequentially
  const playAudioChunks = async (chunks, index = 0) => {
    if (index >= chunks.length || chunks[index].trim() === "") return;

    const ttsResponse = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer `,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1",
        input: chunks[index],
        voice: "alloy",
      }),
    });

    if (!ttsResponse.ok) {
      const errorDetails = await ttsResponse.json();
      throw new Error(
        `TTS API request failed: ${ttsResponse.statusText} - ${errorDetails.error.message}`
      );
    }

    // Stream the response audio in real-time
    const ttsBlob = await ttsResponse.blob();
    const audioUrl = URL.createObjectURL(ttsBlob);
    const audioElement = new Audio(audioUrl);

    audioElement.addEventListener("ended", () => {
      // Play the next audio chunk after the current one ends
      playAudioChunks(chunks, index + 1);
    });

    audioElement.play();
  };

  // Start playing the audio chunks
  playAudioChunks(textchunks);

  return { chatCompletion };
};

const handleTranscription = async (audioBlob) => {
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
        headers: {
          Authorization: `Bearer `,
        },
        body: formData,
      }
    );

    const data = await response.json();
    console.log("Transcription response:", data);
    apicall(data.text);
    return data.text;
  } catch (error) {
    console.error("Error during transcription:", error);
  }
};

function VoiceTherapy() {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  // transcribed text

  useEffect(() => {
    if (recording && mediaRecorder) {
      mediaRecorder.start();
      mediaRecorder.ondataavailable = (event) => {
        setAudioChunks((prev) => [...prev, event.data]);
      };
    } else if (mediaRecorder) {
      mediaRecorder.stop();
      if (mediaRecorder.stream) {
        mediaRecorder.stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    }
  }, [recording, mediaRecorder]);

  useEffect(() => {
    if (!recording && audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      handleTranscription(audioBlob);

      //   const audioUrl = URL.createObjectURL(audioBlob);
      //   const audio = new Audio(audioUrl);
      //   audio.play();
      setAudioChunks([]);
    }
  }, [recording, audioChunks]);

  const handleRecord = () => {
    if (recording) {
      setRecording(false);
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const newMediaRecorder = new MediaRecorder(stream);
          setMediaRecorder(newMediaRecorder);
          setRecording(true);
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
      <div className="linear-bg h-[.3em] w-[80vw] left-[10vw] absolute top-[70vh] rounded-full">
        <FaMicrophone
          className={`mx-auto mt-12 text-4xl text-indigo-800 h-[2em] w-[2em] py-4 rounded-full bg-white shadow-lg 
          ${
            recording
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
