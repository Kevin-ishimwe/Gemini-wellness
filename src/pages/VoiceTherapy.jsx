import React, { useState } from "react";
import AudioLevelMeter from "../components/AudioMeter";
import Logo_max from "../components/Logo-max";
import TherapyMenu from "../components/TherapyMenu";
import { IoTrashSharp } from "react-icons/io5";

function VoiceTherapy() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    setShowConfirmation(false);
    localStorage.removeItem("ChatHistory");
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="flex gap-0 relative transition-all">
      <div className="h-[100vh] bg-[#F9F9F9] relative overflow-hidden min-h-full flex flex-col items-center justify-center w-full">
        <IoTrashSharp
          className="text-[4em] text-primary-200 hover:bg-indigo-100 py-2 px-3 rounded-full cursor-pointer"
          onClick={handleDelete}
        />
        <div>
          <Logo_max orientation={true} />
        </div>
        <AudioLevelMeter />
      </div>
      <TherapyMenu />

      {showConfirmation && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">
              Are you sure you want to clear conversation?
            </h2>
            <p className="mb-4 text-center">This action cannot be undone.</p>
            <div className="flex space-x-4 justify-center">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VoiceTherapy;
