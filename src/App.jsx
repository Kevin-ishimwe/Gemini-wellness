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
import ChatTherapy from "./pages/ChatTherapy";
import HealthTrack from "./pages/HealthTrack";
import SideNav from "./components/NavHealth";
import Activity from "./pages/TrackPages/Activity";
import SleepPage from "./pages/TrackPages/Sleep";
import Nutrition from "./pages/TrackPages/Nutrition";
import WeightManagement from "./pages/TrackPages/Weight";
import VitalSigns from "./pages/TrackPages/VitalSigns";
import Medications from "./pages/TrackPages/Medication";
import GoalsManagement from "./pages/TrackPages/GoalsManagement";

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
                      <GoogleOAuthProvider
                        clientId={
                          "177416270778-ifuh7b2con9gc295gfva790t85rm38cj.apps.googleusercontent.com"
                        }
                      >
                        <Signup />
                      </GoogleOAuthProvider>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <GoogleOAuthProvider
                        clientId={
                          "177416270778-ifuh7b2con9gc295gfva790t85rm38cj.apps.googleusercontent.com"
                        }
                      >
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
          <Route path="/therapy/chat" element={<ChatTherapy />} />
          <Route path="/getstarted" element={<GetStarted />} />
          <Route
            path="/health/*"
            element={
              <div className="flex items-center w-full">
                <SideNav />
                <Routes>
                  <Route path="/" element={<HealthTrack />} />
                  <Route path="/Activity" element={<Activity />} />
                  <Route path="/sleep" element={<SleepPage />} />
                  <Route path="/nutrition" element={<Nutrition />} />
                  <Route path="/weight" element={<WeightManagement />} />
                  <Route path="/vitals" element={<VitalSigns />} />
                  <Route path="/Medications" element={<Medications />} />
                  <Route path="/goals" element={<GoalsManagement />} />
                  <Route path="/*" element={<HealthTrack />} />
                </Routes>
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
