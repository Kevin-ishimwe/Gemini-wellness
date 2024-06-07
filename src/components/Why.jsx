import { LuPieChart, LuStar } from "react-icons/lu";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { LuSunMoon } from "react-icons/lu";
import { MdPrivacyTip } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
const whyGeminiWellness = [
  {
    icon: <LuPieChart className="text-[3em]" />,
    description:
      "We're not like other therapy websites! You get all the tools and support you need to be happier - now and in the future.",
    title: "Complete Tools for Your Health",
  },
  {
    icon: <FaRegEyeSlash className="text-[3em]" />,
    description:
      "Your privacy is our top priority. Your identity and information are kept completely anonymous.",
    title: "Anonymous & Private",
  },
  {
    icon: <MdPrivacyTip className="text-[3em]" />,
    description:
      "Our platform uses the latest encryption and security measures to ensure your data is confidential and protected.",
    title: "Secure & Confidential",
  },
  {
    icon: <LuStar className="text-[3em]" />,
    description:
      "Our team of licensed therapists and counselors are highly qualified and provide top-quality therapy services.",
    title: "Great Quality Therapy",
  },
  {
    icon: <FaMoneyCheckAlt className="text-[3em]" />,
    description:
      "Our therapy services are completely free, so everyone can access the mental health support they need.",
    title: "Free",
  },
  {
    icon: <LuSunMoon className="text-[3em]" />,
    description:
      "Our platform is available 24/7, so you can access support and resources whenever you need them.",
    title: "24/7 Availability",
  },
];

function WhyGemini() {
  return (
    <div className="py-12 bg-indigo-600 text-center">
      <h1 className="text-[3em] font-bold text-white ">Why Gemini Wellness?</h1>
      <div className="grid grid-cols-3 justify-evenly px-[2%] gap-2 ">
        {whyGeminiWellness.map(({ icon, title, description }, index) => (
          <div key={index} className="text-white text-left my-4rounded-[1em] p-12">
            {icon}
            <h3 className="font-bold py-2 text-xl">{title}</h3>
            <p className="font-light">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyGemini;
