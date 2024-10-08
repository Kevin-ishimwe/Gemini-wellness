import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import G_auth_Btn from "../components/G_auth_Btn";
import Success from "../components/notification/Success";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [islogin, setislogin] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      if (data.status === "success") {
        setislogin(true);
        localStorage.setItem("user_token", data.token);
        localStorage.setItem("user_data", JSON.stringify(data.data));
        navigate("/getstarted");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
    }
  };

  const password = useRef();

  const loginwith = [
    {
      icon: <G_auth_Btn setislogin={setislogin} />,
      action: () => {
        console.log("login initiated");
      },
    },
  ];

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center">
      {islogin ? <Success notification={"login successful"} /> : ""}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <h1 className="text-4xl mb-12">Sign In</h1>
      <form
        onSubmit={loginHandler}
        className="md:w-[70%] min-w-fit max-w-[40em] text-[#292D32] grid"
      >
        <div className="grid">
          <label htmlFor="email" className="font-bold mb-1">
            Email{" "}
          </label>
          <input
            name="email"
            type="text"
            placeholder="john@email.com"
            className="border-[1px] border-gray-400 rounded-lg py-3 px-4"
            value={form.email}
            onChange={handleInputChange}
            required
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
            value={form.password}
            onChange={handleInputChange}
            required
          />
          <FaEye
            className="text-2xl absolute right-4 top-[55%] text-gray-400"
            onClick={(e) => {
              e.target.style.color =
                e.target.style.color === "black" ? "gray" : "black";
              password.current.type =
                password.current.type === "password" ? "text" : "password";
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
        <h3 className="uppercase font-bold text-center text-[#818181] mt-2">
          Or Continue with
        </h3>
        <div className="flex justify-center mt-1">
          {loginwith.map(({ icon, action }, index) => (
            <button key={index} className="mx-2">
              {icon}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Login;
