import { useState, useRef } from "react";
import { BsFacebook } from "react-icons/bs";
import { FaApple } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import G_auth_Btn from "../components/G_auth_Btn";
import Success from "../components/notification/Success";
const Login = () => {
  // const [form, setform] = useState({});
  const [islogin, setislogin] = useState(false);
  const signup = async () => {};
  const password = useRef();
  const styleIcon = "text-4xl";
  const loginwith = [
    // {
    //   icon: <BsFacebook className={styleIcon} />,
    //   action: () => {
    //     console.log("login initiated");
    //   },
    // },
    {
      icon: <G_auth_Btn setislogin={setislogin} />,
      action: () => {
        console.log("login initiated");
      },
    },
    // ,
    // {
    //   icon: <FaApple className={styleIcon} />,
    //   action: () => {
    //     console.log("login initiated");
    //   },
    // },
  ];
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center">
      {islogin ? <Success notification={"login successful"} /> : ""}
      <h1 className="text-4xl mb-12">Sign In</h1>
      <div className="md:w-[70%] min-w-fit max-w-[40em] text-[#292D32] grid">
        <div className="grid">
          <label htmlFor="email" className="font-bold mb-1">
            Email{" "}
          </label>
          <input
            name="email"
            type="text"
            placeholder="john@email.com"
            className="border-[1px] border-gray-400 rounded-lg py-3 px-4"
          />
        </div>
        <div className="grid mt-4 relative">
          <label htmlFor="password" className="font-bold mb-1">
            Enter Password{" "}
          </label>
          <input
            ref={password}
            name="password"
            type="password"
            placeholder="**********"
            className="border-[1px] border-gray-400 rounded-lg py-3 px-4 "
          />
          <FaEye
            className="text-2xl absolute right-4 top-[55%] text-gray-400"
            onClick={(e) => {
              e.target.style.color == "black"
                ? (e.target.style.color = "gray")
                : (e.target.style.color = "black");
              password.current.type == "password"
                ? (password.current.type = "text")
                : (password.current.type = "password");
            }}
          />
        </div>
        <div className="flex justify-between">
          <a href="/register" className="mt-2 font-bold underline">
            don't have an account, Sign Up
          </a>
          <a
            href="/reset/password"
            className="text-indigo-600 mt-1 text-right font-bold"
          >
            Reset Password
          </a>
        </div>
        <button
          type="submit"
          className="my-1 font-bold w-full py-4 bg-indigo-600 text-white rounded-xl hover:bg-white hover:text-indigo-600 border-2 border-indigo-600"
        >
          Continue
        </button>
        <h3 className="uppercase font-bold text-center  text-[#818181] mt-2">
          Or Continue with
        </h3>
        <div className="flex justify-center mt-1">
          {loginwith.map(({ icon, action }) => {
            return (
              <button key={icon} className="mx-2">
                {icon}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Login;
