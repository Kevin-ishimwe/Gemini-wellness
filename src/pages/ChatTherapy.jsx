import logo from "../assets/logo.png";

function Logo_max({ orientation }) {
  return (
    <div
      className="flex items-center "
      style={{
        display: orientation ? "grid" : "flex",
        justifyContent: orientation ? "center" : "flex",
      }}
    >
      <img
        src={logo}
        alt=""
        className="rounded-full h-[3em] w-[3em] lg:w-[5em]  lg:h-[5em]  shadow-[0px_30px_20px_#00000021] mx-auto my-12"
      />
      <h1 className="text-2xl lg:text-4xl font-bold linear_text_1 w-fit">
        Gemini Wellness
      </h1>
    </div>
  );
}

const demo = ["", "", ""];

function ChatTherapy() {
  return (
    <div className="bg-[#F9F9F9] ">
      <div className="py-4">
        <Logo_max orientation={true} />
      </div>
      <div className="flex w-[80vw] justify-center mx-auto my-12">
        {demo.map(() => (
          <div className="w-[12em] bg-white h-[12em] mx-12 rounded-[2em] p-12 shadow-[1px_10px_30px_#1C0AE51C]"></div>
        ))}
      </div>
      <div className="">
        <input
          type="text"
          className="mx-auto bg-white px-12 rounded-full py-[1.2em] w-[70vw] fixed bottom-12 left-[50%] translate-x-[-50%] shadow-[1px_10px_30px_#1C0AE51C] focus:outline-none"
        />
      </div>
    </div>
  );
}

export default ChatTherapy;
