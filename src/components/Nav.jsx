import Logo_max from "./Logo-max";
import { NavLink , useNavigate } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { FaUser, FaComments, FaMicrophone, FaHeartbeat } from "react-icons/fa";
import { useEffect, useState } from "react";
function Nav() {
  const [menu, setmenu] = useState(false);
  const [user, setuser] = useState(false);
  const [controllerprofile, setcontrollerprofile] = useState(false);
  const location =useNavigate()

  const links = [
    { text: "Home", link: "/home" },
    { text: "About", link: "/about" },
    { text: "Features", link: "/advice" },
    { text: "FAQ", link: "/faq" },
    { text: "Reviews", link: "/reviews" },
    { text: "Contact", link: "/contact" },
  ];
  const menuHandler = () => (menu ? setmenu(false) : setmenu(true));
  const closeMenu = () => setmenu(false);
  useEffect(() => {
    setuser(JSON.parse(localStorage.getItem("user_data")));
  }, []);
  const user_links = [
    {
      name: "Profile",
      href: "/user/profile",
      icon: <FaUser className="text-2xl mr-4 " />,
    },
    {
      name: "Chat Therapy",
      href: "/therapy/chat",
      icon: <FaComments className="text-2xl mr-4 " />,
    },
    {
      name: "Voice Therapy",
      href: "/therapy/voice",
      icon: <FaMicrophone className="text-2xl mr-4 " />,
    },
    {
      name: "Health Tracker",
      href: "/health",
      icon: <FaHeartbeat className="text-2xl mr-4 " />,
    }
  ];
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
              onClick={closeMenu}
              className=" p-4 text-gray-700 hover:text-indigo-500 px-4 flex items-center  lg:h-[100%] border-b-2 border-white hover:border-indigo-500"
            >
              {text}
            </NavLink>
          ))}
          <div className="flex-col flex lg:flex-row lg:items-center  lg:mt-0">
            {user ? (
              <div className="relative">
                <FaUserCircle
                  className="text-4xl text-indigo-600 hover:scale-[1.2]"
                  onClick={() => setcontrollerprofile(!controllerprofile)}
                />
                {controllerprofile ? (
                  <div className="bg-white  shadow-md absolute flex flex-col right-0 mt-6 w-max min-w-[16em] rounded-md text-right">
                    {user_links.map((link) => (
                      <NavLink
                        key={link.name}
                        to={link.href}
                        className="p-4 w-full hover:shadow-lg rounded-full flex items-center text-primary text-indigo-900 hover:bg-indigo-700 hover:text-white"
                      >
                        {link.icon}
                        {link.name}
                      </NavLink>
                    ))}
                    <button className="bg-indigo-800 hover:bg-indigo-950 p-2 my-4 mx-2 text-white rounded-full" onClick={()=>{
                      localStorage.removeItem("user_data")
                      localStorage.removeItem("user_token");
                      window.location.href('/')

                    }}>logout</button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <NavLink
                to={"/login"}
                onClick={closeMenu}
                className=" mt-4  lg:mt-0 bg-indigo-600 text-white py-2 px-12 mx-2 rounded-full hover:bg-indigo-800 border-2 border-indigo-600 text-lg"
              >
                Login
              </NavLink>
            )}
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
            onClick={closeMenu}
            className=" p-4 text-gray-700 hover:text-indigo-500 px-4 flex items-center  lg:h-[100%] border-b-2 border-white hover:border-indigo-500"
          >
            {text}
          </NavLink>
        ))}
        <div className="flex-col flex lg:flex-row lg:items-center mt-4  lg:mt-0">
          {user ? (
            <div className="flex items-center hover:bg-indigo-700 text-[#33393f] px-2 py-4 rounded-full hover:text-white">
              <FaUserCircle className="text-4xl  hover:scale-[1.2] text-inherit mx-4 hover:text-white" />
              <h1>{user.personalInfo.username}</h1>
            </div>
          ) : (
            <NavLink
              to={"/login"}
              onClick={closeMenu}
              className=" mt-4  text-center lg:mt-0 bg-indigo-600 text-white py-2 px-8 mx-2 rounded-full hover:bg-indigo-800 border-2 border-indigo-600"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
}

export default Nav;
