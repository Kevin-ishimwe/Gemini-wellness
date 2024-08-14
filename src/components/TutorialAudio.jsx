import React, { useState, useEffect } from "react";
import { FaChrome, FaFirefox, FaEdge } from "react-icons/fa";
import { MdMic, MdPlayArrow } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const workflow = [
  {
    message: `these browsers are the supported browsers! <br/> <strong>don't use safari </strong><img style="width: 50px; margin: 0% auto;" src="https://th.bing.com/th/id/OIP.j8Kl7s5ZX5RpeHjZIGl_GAAAAA?rs=1&pid=ImgDetMain"/>`,
    icon: (
      <div className="flex justify-center space-x-6">
        <FaChrome className="text-4xl gradient-chrome text-[#ffffff] rounded-full p-1" />
        <FaFirefox className="text-4xl gradient-firefox text-white rounded-full p-1" />
        <FaEdge className="text-4xl text-[#ffffff] rounded-full p-1 gradient-edge" />
      </div>
    ),
  },
  {
    message: "Please allow microphone access for this site.",
    icon: <MdMic className="text-4xl text-blue-600 " />,
  },
  {
    message: "Please allow autoplay in settings for this site.",
    icon: <MdPlayArrow className="text-4xl text-blue-600 " />,
  },
];

function TutorialAudio() {
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorial, settutorial] = useState(true);

  useEffect(() => {
    // Check if the tutorial has been watched before
    const tutorialWatched = localStorage.getItem("tutorialWatched");
    if (tutorialWatched) {
    }
  }, []);

  const handleNext = () => {
    if (currentStep < workflow.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    localStorage.setItem("tutorialWatched", "true");
    settutorial(false);
  };

  if (tutorial) {
    return (
      <div className="bg-[#00000073] w-[100vw] h-[100vh] fixed top-0 left-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg max-w-md">
          <h2 className="text-2xl font-bold mb-4">Audio Setup Tutorial</h2>
          <div className="mb-4 flex flex-col items-center">
            {workflow[currentStep].icon}
            <p
              className="mt-2 text-center"
              dangerouslySetInnerHTML={{
                __html: workflow[currentStep].message,
              }}
            ></p>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded disabled:opacity-50 flex items-center"
            >
              <IoIosArrowBack className="mr-1" /> Previous
            </button>
            {currentStep === workflow.length - 1 ? (
              <button
                onClick={handleFinish}
                className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
              >
                Finish
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-indigo-500 hover:bg-indigo-800 text-white px-4 py-2 rounded flex items-center"
              >
                Next <IoIosArrowForward className="ml-1" />
              </button>
            )}
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            Step {currentStep + 1} of {workflow.length}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default TutorialAudio;
