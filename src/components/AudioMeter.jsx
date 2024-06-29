import React, { useState, useEffect, useRef } from "react";
import AudioVisualizer from "./AudioVisualizer";

const key1 = import.meta.env.VITE_OPENAI_API_KEY;

function AudioLevelMeter() {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(null);
  // Refs
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const SILENCE_THRESHOLD = 1.1;
  const SILENCE_DURATION = 2000; // 1 second in milliseconds

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream, {
          mimeType: "audio/webm",
        });
        let chunkz = [];
        mediaRecorderRef.current.ondataavailable = (e) => {

          if (e.data.size > 50000) {
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
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
        measureAudioLevel();
      })
      .catch((err) => console.error("Error accessing microphone:", err));

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
  }, []);

  const measureAudioLevel = () => {
    if (!analyserRef.current) return;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    const sum = dataArray.reduce((acc, val) => acc + val, 0);
    const average = sum / bufferLength;
    const normalizedAverage = average / 70;
    setAudioLevel(normalizedAverage);

    if (normalizedAverage > SILENCE_THRESHOLD) {
      setIsSpeaking(true);
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
    } else if (!silenceTimerRef.current) {
      // Start the silence timer if it's not already running
      silenceTimerRef.current = setTimeout(() => {
        setIsSpeaking(false);
        silenceTimerRef.current = null;
      }, SILENCE_DURATION);
    }

    animationFrameRef.current = requestAnimationFrame(measureAudioLevel);
  };
  useEffect(() => {
    if (mediaRecorderRef.current) {
      if (isSpeaking) {
        mediaRecorderRef.current.start();
      } else if (!isSpeaking) {
        mediaRecorderRef.current.stop();
      }
    }
  }, [isSpeaking]);

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
      console.log(data);
      // Handle transcription result here

      setIsTranscribing(false);
    } catch (error) {
      console.error("Error during transcription:", error);
      setIsTranscribing(false);
    }
  };

  return (
    <div>
      <p>Current Audio Level: {audioLevel.toFixed(2)}</p>
      <p>Status: {isSpeaking ? "Speaking" : "Silent"}</p>
      <AudioVisualizer voice={isSpeaking} fetching={isTranscribing} />
    </div>
  );
}

export default AudioLevelMeter;
