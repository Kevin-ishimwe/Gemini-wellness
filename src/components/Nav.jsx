import Logo_max from "./Logo-max";
import { NavLink } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";

import { useState } from "react";
function Nav() {
  const [menu, setmenu] = useState(false);
  const links = [
    { text: "Home", link: "/home" },
    { text: "About", link: "/about" },
    { text: "Features", link: "/advice" },
    { text: "FAQ", link: "/faq" },
    { text: "Reviews", link: "/reviews" },
    { text: "Therapy", link: "/therapy" },
    { text: "Contact", link: "/contact" },
  ];
  const menuHandler = () => (menu ? setmenu(false) : setmenu(true));
  return (
    <>
      <div className="h-[5em] flex justify-between items-center bg-white py-2 px-4 fixed w-full shadow-[0px_2px_40px_#2121210d] rounded-b-[10px] z-[100]">
        <Logo_max />
        {/* large screens */}
        <div className="hidden lg:flex  relative justify-end h-[4.9em] items-center ">
          {links.map(({ text, link }) => (
            <NavLink
              key={link}
              to={link}
              className=" p-4 text-gray-700 hover:text-indigo-500 px-4 flex items-center  lg:h-[100%] border-b-2 border-white hover:border-indigo-500"
            >
              {text}
            </NavLink>
          ))}
          <div className="flex-col flex lg:flex-row lg:items-center mt-4  lg:mt-0">
            <NavLink
              to={"/login"}
              className="ml-4 border-2 border-indigo-600 py-2 px-8 mx-2 rounded-full text-indigo-600 hover:bg-indigo-100  "
            >
              Login
            </NavLink>
            <button className=" mt-4  lg:mt-0 bg-indigo-600 text-white py-2 px-8 mx-2 rounded-full hover:bg-indigo-800 border-2 border-indigo-600">
              Get Started
            </button>
          </div>
        </div>
        {/* mobile */}
        {menu ? (
          <RxCross1 className="text-3xl flex lg:hidden" onClick={menuHandler} />
        ) : (
          <HiMiniBars3
            className="text-3xl flex lg:hidden"
            onClick={menuHandler}
          />
        )}
      </div>
      <div
        className="blur3 flex flex-col lg:hidden pt-[10em]  fixed top-[0em] h-[100vh] w-[100vw] z-30 left-0 "
        style={{
          clipPath: !menu
            ? "polygon(100% 0, 100% 0, 100% 100%, 100% 98%)"
            : "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      >
        {links.map(({ text, link }) => (
          <NavLink
            key={link}
            to={link}
            className=" p-4 text-gray-700 hover:text-indigo-500 px-4 flex items-center  lg:h-[100%] border-b-2 border-white hover:border-indigo-500"
          >
            {text}
          </NavLink>
        ))}
        <div className="flex-col flex lg:flex-row lg:items-center mt-4  lg:mt-0">
          <NavLink
            to={"/login"}
            className="ml-4 border-2 border-indigo-600 py-2 px-8 mx-2 rounded-full text-indigo-600 hover:bg-indigo-100  "
          >
            Login
          </NavLink>
          <button className=" mt-4  lg:mt-0 bg-indigo-600 text-white py-2 px-8 mx-2 rounded-full hover:bg-indigo-800 border-2 border-indigo-600">
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}

export default Nav;
