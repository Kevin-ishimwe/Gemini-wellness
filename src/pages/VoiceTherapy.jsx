import AudioLevelMeter from "../components/AudioMeter";
import Logo_max from "../components/Logo-max";

function VoiceTherapy() {
  return (
    <div className="h-[100vh] bg-[#F9F9F9] relative overflow-hidden min-h-full flex flex-col items-center justify-center">
      <Logo_max orientation={true}/>
      
      <AudioLevelMeter />
    </div>
  );
}

export default VoiceTherapy;
