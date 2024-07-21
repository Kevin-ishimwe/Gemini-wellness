import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

function G_auth_Btn({ setislogin }) {
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // handle token validation oon backend on fetch
      console.log(tokenResponse,tokenResponse.access_token.split(".")[1]);
      const link = `http://localhost:2020/user/auth/complete?code=4/${
        tokenResponse.access_token.split(".")[1]
      }&scope=email%20profile%20openid%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email&authuser=1&prompt=consent`;
      localStorage.setItem("G_auth_data", JSON.stringify(tokenResponse));
      await fetch(link, {
        method: "GET",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
      setislogin(true);
      setTimeout(() => {
        setislogin(false);
        // navigate("/dashboard/discover");
      }, 2000);
    },
    onError: () => {
      console.error("Google login failed");
    },
  });
  return (
    <>
      <FcGoogle className="text-4xl" onClick={googleLogin} />
    </>
  );
}

export default G_auth_Btn;
