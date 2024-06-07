import { NavLink } from "react-router-dom";
function Footer() {
  const links = [
    { text: "Home", link: "/home" },
    { text: "Business", link: "/business" },
    { text: "About", link: "/about" },
    { text: "FAQ", link: "/faq" },
    { text: "Reviews", link: "/reviews" },
    { text: "Advice", link: "/advice" },
    { text: "Careers", link: "/careers" },
    { text: "Find a Therapist", link: "/find-therapist" },
    { text: "Online Therapy", link: "/online-therapy" },
    { text: "Contact", link: "/contact" },
    { text: "For Therapists", link: "/for-therapists" },
    
  ];
  const links2 = [
    { text: "Terms & Conditions", link: "/terms-conditions" },
    { text: "Privacy Policy", link: "/privacy-policy" },
    { text: "Sharing Settings", link: "/sharing-settings" },
    { text: "Web Accessibility", link: "/web-accessibility" },
    { text: "© 2024 GeminiWellness", link: "/copyright" },
  ];

  return (
    <div>
      <div className="py-6 bg-[#F7F0E6] px-12">
        If you are in a crisis or any other person may be in danger - don't use
        this site.<br></br>
        <NavLink
          to={"/gethelpnow"}
          className=" text-indigo-600 underline font-bold"
        >
          These resources{" "}
        </NavLink>{" "}
        can provide you with immediate help.
      </div>
      <div className="flex flex-wrap justify-between py-8 px-12 border-b-2">
        {links.map(({ text, link }) => (
          <NavLink key={link} to={link} className="text-gray-700 hover:text-indigo-500">
            <p>{text}</p>
          </NavLink>
        ))}
      </div>
      <div className="flex flex-wrap gap-12 py-8 px-12 ">
        {links2.map(({ text, link }) => (
          <NavLink key={link} to={link} className="text-gray-700">
            <p>{text}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Footer;
