import AudioLevelMeter from "../components/AudioMeter";
import Logo_max from "../components/Logo-max";
import TherapyMenu from "../components/TherapyMenu";

function VoiceTherapy() {
  return (
    <div className="flex gap-0 relative transition-all">
      <div className="h-[100vh] bg-[#F9F9F9] relative overflow-hidden min-h-full flex flex-col items-center justify-center w-full">
        <div>
          <Logo_max orientation={true} />
        </div>
        <AudioLevelMeter />
      </div>
      <TherapyMenu />
    </div>
  );
}

export default VoiceTherapy;
