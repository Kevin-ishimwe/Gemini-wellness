import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import Logo_max from "../components/Logo-max";
function VoiceTherapy() {
  return (
    <div className="h-[100vh] bg-[#F9F9F9] relative overflow-hidden">
      <div className="mt-[10vh] flex w-full justify-between px-[10vw]">
        <IoMdInformationCircleOutline className="text-4xl text-indigo-800" />
        <IoSettingsOutline className="text-4xl text-indigo-800" />
      </div>
      <div className="">
        <Logo_max orientation={true} />
      </div>
      <div className="linear-bg h-[.3em] w-[80vw] left-[10vw] absolute top-[80vh] rounded-full"></div>
    </div>
  );
}

export default VoiceTherapy;
