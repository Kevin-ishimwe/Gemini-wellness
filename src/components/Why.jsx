import { LuPieChart } from "react-icons/lu";

const whyGeminiWellness = [
  {
    icon: <LuPieChart  className="text-3xl"/>,
    description:
      "We're not like other therapy websites! You get all the tools and support you need to be happier - now and in the future.",
    title: "Complete Tools for Your Health",
  },
  {
    icon: <LuPieChart className="text-3xl" />,
    description:
      "Your privacy is our top priority. Your identity and information are kept completely anonymous.",
    title: "Anonymous & Private",
  },
  {
    icon: <LuPieChart className="text-3xl" />,
    description:
      "Our platform uses the latest encryption and security measures to ensure your data is confidential and protected.",
    title: "Secure & Confidential",
  },
  {
    icon: <LuPieChart className="text-3xl" />,
    description:
      "Our team of licensed therapists and counselors are highly qualified and provide top-quality therapy services.",
    title: "Top Quality Therapy",
  },
  {
    icon: <LuPieChart className="text-3xl" />,
    description:
      "Our basic therapy services are completely free, so everyone can access the mental health support they need.",
    title: "Free",
  },
  {
    icon: <LuPieChart className="text-3xl" />,
    description:
      "Our platform is available 24/7, so you can access support and resources whenever you need them.",
    title: "24/7 Availability",
  },
];

function WhyGemini() {
  return (
    <div className="min-h-screen bg-indigo-600 text-center">
      <h1 className="text-[3em] font-bold text-white ">Why Gemini Wellness?</h1>
      <div className="grid grid-cols-3 justify-evenly px-[2%] gap-4 ">
        {whyGeminiWellness.map(({ icon, title, description }, index) => (
          <div key={index} className="text-white text-left my-4 border-4 rounded-[1em] p-4">
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
