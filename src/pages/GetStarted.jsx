import Logo_max from "../components/Logo-max";
import { NavLink } from "react-router-dom";
const services = [
  {
    service: "Health Track Advisor",
    description:
      "Personalized guidance for your wellness journey, including nutrition, fitness, and lifestyle recommendations.",
    route: "/health-advisor",
    icon: "🏋️‍♂️",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
    hoverBg: "hover:bg-blue-200",
    img: "https://cdn.prod.website-files.com/6480cd9bff9f9835689b10c3/6527e19dd280808ec95dd3d2_predictionhealth_analytics-robot-and-data-scientist.gif",
  },
  {
    service: "AI Therapist Bot",
    description:
      "24/7 AI-powered chat support for mental health and emotional well-being.",
    route: "/ai-therapist",
    icon: "🤖",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    hoverBg: "hover:bg-green-200",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/cb/WhatsApp-BOT-Image-2_2.gif?20230131061007",
  },
];

const GetStarted = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <NavLink to={"/"}>
        <Logo_max orientation={true} />
      </NavLink>
      <p className="text-lg my-4"> what service can we help with you with?</p>
      <div className=" flex my-12">
        {services.map((service, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-md transition duration-300 ease-in-out w-[25em] mx-4 flex flex-col justify-center`}
          >
            <h3 className="text-xl font-bold mb-2">
              {service.icon} {service.service}
            </h3>
            <img src={service.img} alt="" className="w-full" />
            <p className="mb-4">{service.description}</p>
            <a
              href={service.route}
              className="inline-block px-4 py-2 bg-indigo-700 text-white rounded-full font-semibold hover:bg-gray-100 transition duration-300 ease-in-out w-max"
            >
              Get Started
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetStarted;
