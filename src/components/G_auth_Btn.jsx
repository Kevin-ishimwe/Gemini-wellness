import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

function G_auth_Btn({ setislogin }) {
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // handle token validation oon backend on fetch
      localStorage.setItem("G_auth_data", JSON.stringify(tokenResponse));
      setislogin(true);
      setTimeout(() => {
        setislogin(false);
        navigate("/dashboard/discover");
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
