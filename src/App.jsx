import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Emergency from "./pages/Emergency";
import NotFound from "./pages/NotFound";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VoiceTherapy from "./pages/VoiceTherapy";
import GetStarted from "./pages/GetStarted";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="*"
            element={
              <>
                <Nav />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route
                    path="/register"
                    element={
                      <GoogleOAuthProvider clientId={"sdkdkmf"}>
                        <Signup />
                      </GoogleOAuthProvider>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <GoogleOAuthProvider clientId={"sdkdkmf"}>
                        <Login />
                      </GoogleOAuthProvider>
                    }
                  />
                  <Route path="/gethelpnow" element={<Emergency />} />
                  <Route path="/*" element={<NotFound />} />
                </Routes>
                <Footer />
              </>
            }
          />
          <Route path="/therapy/voice" element={<VoiceTherapy />} />
          <Route path="/getstarted" element={<GetStarted />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
