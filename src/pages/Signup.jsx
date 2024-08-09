import { useState, useRef } from "react";
import { BsFacebook } from "react-icons/bs";
import { FaApple } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import G_auth_Btn from "../components/G_auth_Btn";
import Success from "../components/notification/Success";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Signup() {
  const [islogin, setislogin] = useState(false);
  const [error, setError] = useState("");
  const password = useRef();
  const passwordConfirm = useRef();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const signHandler = async (e) => {
    e.preventDefault();
    if (form.password !== form.passwordConfirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(`${VITE_BACKEND_URL}user/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await response.json();
      if (data.status === "success") {
        setIslogin(true);
        // You might want to redirect the user or show a success message
      } else {
        setError(data.message || "Sign up failed");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      setError("An error occurred during sign up");
    }
  };

  const signupwith = [
    {
      icon: <G_auth_Btn setislogin={setislogin} />,
      action: () => {},
    },
  ];
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center pt-[5em]">
      {islogin ? <Success notification={"login successful"} /> : ""}
      <form onSubmit={signHandler}>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <h1 className="text-4xl mb-12 text-center">Sign Up</h1>
        <div className=" md:w-[70vw] min-w-fit max-w-[40em] text-[#292D32] ">
          <div className="grid grid-cols-2">
            <div className="grid mx-2 ">
              <label htmlFor="email" className="font-bold mb-1 ">
                User name
              </label>
              <input
                name="username"
                type="text"
                placeholder="john"
                className="w-[100%] border-[1px] border-gray-400 rounded-lg py-3 px-4"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid mx-2 ">
              <label htmlFor="email" className="font-bold mb-1 ">
                Email
              </label>
              <input
                name="email"
                type="text"
                placeholder="john@email.com"
                className="w-[100%]  border-[1px] border-gray-400 rounded-lg py-3 px-4"
                value={form.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid mt-4 relative mx-2">
              <label htmlFor="password" className="font-bold mb-1">
                Enter Password{" "}
              </label>
              <input
                ref={password}
                name="password"
                type="password"
                placeholder="**********"
                className="w-[100%]  border-[1px] border-gray-400 rounded-lg py-3 px-4 "
                onChange={handleInputChange}
                required
              />
              <FaEye
                className="text-2xl absolute right-4 top-[55%] text-gray"
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
            <div className="grid mt-4 relative mx-2">
              <label htmlFor="password" className="font-bold mb-1">
                Confirm Password
              </label>
              <input
                ref={passwordConfirm}
                name="password"
                type="password"
                placeholder="**********"
                className="w-[100%] border-[1px] border-gray-400 rounded-lg py-3 px-4 "
                onChange={handleInputChange}
                required
              />
              <FaEye
                className="text-2xl absolute right-4 top-[55%] text-gray-400"
                onClick={(e) => {
                  passwordConfirm.current.type == "text"
                    ? (passwordConfirm.current.type = "password")
                    : (passwordConfirm.current.type = "text");
                  e.target.style.color == "black"
                    ? (e.target.style.color = "gray")
                    : (e.target.style.color = "black");
                }}
              />
            </div>
          </div>

          <div className="grid">
            <a href="/login" className="mt-2 font-bold underline ml-2">
              have an account, Sign In
            </a>
            <button
              type="submit"
              className="my-2 w-[96%] mx-auto md:w-full py-4 bg-indigo-600 text-white rounded-xl hover:bg-white hover:text-indigo-600 border-2 border-indigo-600"
            >
              Continue
            </button>
            <h3 className="uppercase font-bold text-center  text-[#818181] mt-2">
              Or register with
            </h3>

            <div className="flex justify-center mt-1">
              {signupwith.map(({ icon, action }) => (
                <button key={icon} className="mx-2" onClick={action}>
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
