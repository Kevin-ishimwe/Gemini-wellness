import logo from "../assets/logo.png";

function Logo_max({ orientation,size }) {
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
        className="rounded-full h-[3em] w-[3em] lg:w-[3.5em]  lg:h-[3.5em] p-1  shadow-md mx-auto"
      />
      <h1 className="text-2xl lg:text-3xl mx-2 font-black linear_text_1 w-fit"
      style={{fontSize:size?size:"none"}}
      >
        Gemini Wellness
      </h1>
    </div>
  );
}

export default Logo_max;
