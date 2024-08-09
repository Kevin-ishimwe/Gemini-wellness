import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const backend_url = import.meta.env.BACKEND_URL;

function G_auth_Btn({ setislogin }) {
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        const userData = await userInfo.json();
        console.log(await userData);
        const response = await fetch(
          `${backend_url}/user/auth/complete`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({ user: await userData }),
          }
        )
          .then((res) => res.json())

  

        const data = await response;

        if (data.status === "success") {
          setislogin(true);
          // Handle successful login (e.g., store token, redirect)
          localStorage.setItem("user_token", data.token);
          localStorage.setItem("user_data", JSON.stringify(data.data));
          navigate("/getstarted");
        } else {
          throw new Error(data.message || "Authentication failed");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setislogin(false);
      }
    },
    onError: (error) => {
      console.error("Google login failed", error);
      setislogin(false);
    },
  });
  return (
    <>
      <FcGoogle className="text-4xl" onClick={googleLogin} />
    </>
  );
}

export default G_auth_Btn;
