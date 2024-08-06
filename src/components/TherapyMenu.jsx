import React, { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { SiActigraph } from "react-icons/si";
import { RiMentalHealthFill } from "react-icons/ri";
import {
  FaComments,
  FaMicrophone,
  FaUser,
  FaHeart,
  FaQuestionCircle,
  FaPhone,
} from "react-icons/fa";

const style = "text-2xl ";
const settings = [
  {
    option: "Chat",
    icon: <FaComments className={style} />,
    path: "/therapy/chat",
  },
  {
    option: "Voice",
    icon: <RiMentalHealthFill className={style} />,
    path: "/therapy/voice",
  },
  { option: "Profile", icon: <FaUser className={style} />, path: "/profile" },
  {
    option: "Health Track",
    icon: <SiActigraph  className={style} />,
    path: "/wellness",
  },
  {
    option: "Contact",
    icon: <FaPhone className={style} />,
    path: "/contact",
  },
  {
    option: "FAQ",
    icon: <FaQuestionCircle className={style} />,
    path: "/faq",
  },
];
function TherapyMenu({ fixed }) {
  const [menu, setmenu] = useState(false);
  return (
    <div className="flex items-center bg-white ">
      <div className="mt-[5vh] flex justify-between px-[10vw] absolute top-0 left-0 w-full">
        <div className="relative inline-block group">
          <IoMdInformationCircleOutline className="text-4xl text-indigo-800 cursor-pointer" />
          <div className="absolute left-0 hidden mt-2 w-56 p-3 bg-white border border-gray-300 rounded shadow-lg group-hover:block z-10">
            <p className="text-sm text-gray-700">
              This is a therapy session. You can either use chat or voice to
              communicate by Clicking on settings icon. You can also delete the conversation if needed.
            </p>
          </div>
        </div>
        <IoSettingsOutline
          className="text-4xl text-indigo-800"
          onClick={() => setmenu(!menu)}
        />
      </div>

      <div
        className={`min-w-[25em] bg-white shadow-md mx-4 rounded-xl transition-all 
          ${fixed == true ? "fixed right-0 top-[20%]" : ""}
        `}
        style={{
          clipPath: menu
            ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
            : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
          display: menu ? "grid" : "none",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full px-4 text-indigo-600">
          {settings.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="py-4 my-2 px-12 w-full bg-[#fbfbfb] flex justify-between rounded-md shadow-sm hover:shadow-xl"
            >
              {item.option}
              {item.icon}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TherapyMenu;
