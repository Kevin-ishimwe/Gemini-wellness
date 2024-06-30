import React, { useState, useEffect } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

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
   
      </div>
    </div>
  );
}

export default VoiceTherapy;
