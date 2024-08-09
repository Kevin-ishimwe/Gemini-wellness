import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const backend_url = import.meta.env.BACKEND_URL;

function GoogleAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const response = await fetch(
          `${backend_url}/user/auth/complete`,
          {
            method: "GET",
            credentials: "include", // This is important for including cookies if you're using sessions
          }
        );

        if (!response.ok) {
          throw new Error("Authentication failed");
        }

        const data = await response.json();

        if (data.status === "success") {
          // Store the token and user data in localStorage or state management solution
          localStorage.setItem("token", data.token);
          localStorage.setItem("userData", JSON.stringify(data.data));

          // Navigate to the dashboard or wherever you want to redirect after successful login
          navigate("/dashboard/discover");
        } else {
          // Handle authentication failure
          navigate("/login");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        navigate("/login");
      }
    };

    fetchAuthData();
  }, [navigate]);

  return <div>Authenticating...</div>;
}

export default GoogleAuthCallback;
