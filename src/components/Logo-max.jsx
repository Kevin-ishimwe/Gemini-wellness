import logo from "../assets/logo.png"

function Logo_max() {
  return (
    <div className="flex items-center">
      <img src={logo} alt="" className="rounded-full h-[3em] w-[3em]  lg:h-[3.5em] p-1  shadow-md "/>
      <h1 className="text-2xl lg:text-3xl mx-2 font-black linear_text_1 w-fit">Gemini Wellness</h1>
    </div>
  );
}

export default Logo_max
