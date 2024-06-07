import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import vwaves from "../assets/Vectorwave.svg";

const qas = [
  {
    question: "What is Gemini Wellness?",
    answer:
      "Gemini Wellness is a comprehensive web-based platform designed to support and promote holistic well-being. Our app integrates mental health resources, nutritional guidance, physical activity tracking, mindfulness practices, and personalized recommendations to help you achieve a balanced and fulfilling life.",
  },
  {
    question: "How does Gemini Wellness protect my privacy?",
    answer:
      "At Gemini Wellness, we prioritize data privacy and security. We implement robust encryption and adhere to strict data protection policies. Your personal information and health data are treated with the utmost confidentiality and will never be shared without your explicit consent.",
  },
  {
    question: "Can I access Gemini Wellness on my mobile device?",
    answer:
      "Absolutely! Gemini Wellness is a web-based application, which means you can access it from any device with a modern web browser, including smartphones and tablets. Our responsive design ensures an optimized user experience across all screen sizes.",
  },
  {
    question: "Does Gemini Wellness offer virtual therapy sessions?",
    answer:
      "Yes, Gemini Wellness provides secure video conferencing capabilities that allow you to participate in virtual therapy sessions with licensed mental health professionals. Our platform ensures a safe and confidential environment for remote counseling and support.",
  },
  {
    question: "How does Gemini Wellness integrate with wearable devices?",
    answer:
      "Gemini Wellness seamlessly integrates with popular wearable devices and fitness trackers through APIs. This integration allows us to monitor your physical activity, sleep patterns, and other health metrics, providing a more comprehensive view of your overall well-being and enabling personalized recommendations.",
  },
  {
    question: "Is there a mobile app available for Gemini Wellness?",
    answer:
      "While Gemini Wellness is currently available as a web application, we are actively working on developing native mobile apps for iOS and Android platforms. Stay tuned for updates on the release of our mobile apps, which will provide an even more convenient and immersive experience.",
  },
];

const Faqs = () => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (question) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [question]: !prevExpanded[question],
    }));
  };

  return (
    <div className=" relative min-h-screen flex flex-col items-center justify-center pt-[15em]">
      <h1 className="font-bold text-4xl mb-12 text-[#252625]">
        Frequently asked questions
      </h1>
      <div className="w-[70vw] border-b-2">
        {qas.map(({ question, answer }) => (
          <div
            key={question}
            onClick={() => toggleExpand(question)}
            className="hover:text-[#4F46E5] transition-all"
          >
            <div className="py-3 border-t-[1px] border-[#C3C8C1] my-[1px] w-full flex items-center justify-between pr-2">
              <h4 className="text-lg">{question}</h4>
              <FaChevronDown
                className={`transform  duration-[.8s] hover:scale-110 hover:text-indigo-700 ${
                  expanded[question] ? "rotate-180" : ""
                }`}
              />
            </div>
            {expanded[question] && (
              <p className="anim-1 text-[#4a4d4a] text-md py-1 font-light">
                {answer}
              </p>
            )}
          </div>
        ))}
      </div>
      <h1 className="underline my-4 font-bold text-indigo-700">
        ask a question ?
      </h1>
      <button className="bg-indigo-700 py-4 px-6 rounded-full text-white ">
        Get started
      </button>
      <img src={vwaves} className="flip w-screen" />
    </div>
  );
};

export default Faqs;
