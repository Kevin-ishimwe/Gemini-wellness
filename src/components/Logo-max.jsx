import logo from "../assets/logo.png"

function Logo_max() {
  return (
    <div className="flex items-center w-fit">
      <img src={logo} alt="" className="rounded-full h-[4em] "/>
      <h1 className="text-4xl font-black ml-3 linear_text_1">Gemini Wellness</h1>
    </div>
  );
}

export default Logo_max
