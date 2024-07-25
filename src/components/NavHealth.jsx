import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import Logo_max from "./Logo-max";
import {
  FaHome,
  FaHeartbeat,
  FaBed,
  FaUtensils,
  FaWeight,
  FaChartLine,
  FaPills,
  FaCalendarAlt,
} from "react-icons/fa";

function SideNav() {
  const [fold, setfold] = useState(true);

  const iconStyle = `text-2xl  text-[#07408b] ${fold ? "mr-0" : "mr-3"}`;
  const items = [
    {
      link: "Dashboard",
      name: "Dashboard",
      icon: <FaHome className={iconStyle} />,
    },
    {
      link: "Activity",
      name: "Activity",
      icon: <FaHeartbeat className={iconStyle} />,
    },
    {
      link: "Sleep",
      name: "Sleep",
      icon: <FaBed className={iconStyle} />,
    },
    {
      link: "Nutrition",
      name: "Nutrition",
      icon: <FaUtensils className={iconStyle} />,
    },
    {
      link: "Weight",
      name: "Weight",
      icon: <FaWeight className={iconStyle} />,
    },
    {
      link: "Vitals",
      name: "Vital Signs",
      icon: <FaChartLine className={iconStyle} />,
    },
    {
      link: "Medications",
      name: "Medications",
      icon: <FaPills className={iconStyle} />,
    },
    {
      link: "Goals",
      name: "Goals",
      icon: <FaCalendarAlt className={iconStyle} />,
    },
  ];

  return (
    <div>
      <div
        className=" bg-white z-[100] flex flex-col left-1 h-[98vh] items-center backdrop-blur-[40em] shadow-[0_0_5px_#c6c6e6] rounded-[1em] mt-[1vh] ml-2 "
        style={{
          width: fold ? "4em" : "15em",
          transition: ".1s",
        }}
        onMouseEnter={() => {
          setfold(false);
        }}
        onMouseLeave={() => {
          setfold(true);
        }}
      >
        <div className="my-2 bg-white py-3 w-[80%] grid  rounded-xl h-[5em] ">
          {fold ? (
            <img className="h-full object-contain" src={logo} />
          ) : (
            <Logo_max size={"1.4em"} orientation={true} />
          )}
        </div>
        <ul className="grid w-[90%] px-[2%] bg-[#6cbdff09] rounded-xl py-8">
          {items.map(({ link, name, icon }) => {
            return (
              <NavLink
                key={link}
                to={link}
                className="my-2 w-full hover:font-semibold rounded-xl hover:shadow-[0px_5px_100px_#00000038] text-[#07408b] flex hover:text-brandRed hover:scale-[1.01]"
                style={{
                  padding: fold ? "1em .5em" : "1em 1em",
                  justifyContent: fold ? "center" : "left",
                }}
              >
                {icon}
                {fold ? "" : name}
              </NavLink>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SideNav;
