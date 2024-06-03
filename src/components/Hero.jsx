import Logo_max from "../components/Logo-max";
import lady_phone from "../assets/lady_phone.jpg";
import computer_hero from "../assets/computer_hero.svg";
import dude_phone from "../assets/dude_phone.jpg";
import vwaves from "../assets/Vectorwave.svg";

const Hero = () => {
  return (
    <div className=" min-h-screen p-20 relative">
      <Logo_max />
      <div className=" p-6 h-[80vh] flex  justify-between items-center">
        <div>
          <h1 className="text-[4em] font-black mb-2 uppercase leading-[1em] text-indigo-900">
            Unlock Your <br></br>Path to Well-Being
          </h1>
          <p className=" mb-8 mt-4 font-PoppinsLight text-xl">
            Your mental, physical, and emotional health matters.
          </p>
          <div className="flex">
            <button className="bg-indigo-600 text-white py-2 px-8 rounded-md hover:bg-white hover:text-indigo-700  hover:scale-[1.15] border-2 border-indigo-600">
              Get Started
            </button>

            <button className="ml-4 border-2 border-indigo-600 py-2 px-4 rounded-md text-indigo-600 hover:bg-indigo-700 hover:text-white  hover:scale-[1.15]">
              Explore Features
            </button>
          </div>
        </div>
        <div>
          <div className="flex my-4">
            <img
              src={computer_hero}
              alt=""
              className="hover:scale-105  w-[20em]  rounded-bl-[10%] rounded-tr-[10%] border-indigo-200 "
            />
            <div className=" relative">
              <img
                src={lady_phone}
                alt=""
                className="hover:scale-105  object-cover w-[25em]  rounded-[30px] rounded-bl-[30px] rounded-tr-[100px] border-[1px] border-indigo-500 ml-4"
              />
              <div className=" absolute bg-[#928CFF] -top-[5em] left-8 -rotate-45 h-[7em] w-[3em] rounded-[200px]"></div>
              <div className="t1 absolute bg-[#2C97DE] -top-[10em] right-0 -rotate-45 h-[10em] w-[5em] "></div>
            </div>
          </div>
          <div className="relative flex gap-4">
            <div className="mr-4">
              <img
                src="https://dy7glz37jgl0b.cloudfront.net/advice/images/d9713b4d9844e3b1e289a5b64a879ae4-woman-green-shirt-headband-computer-smiling_l.jpg"
                alt=""
                className="hover:scale-105  object-cover w-[25em] rounded-[30px] rounded-bl-[100px] border-[1px] border-indigo-500 ml-4"
              />
              <div className="hover:scale-110 c1 absolute bg-[#F8E26C] -top-[5em] rotate-45 h-[10em] w-[5em] "></div>
            </div>
            <img
              src={dude_phone}
              alt=""
              className="hover:scale-105 w-[15em] object-cover rounded-[20px] rounded-br-[100px] border-[1px] border-indigo-500 mr-4 "
            />
          </div>
        </div>
      </div>

      <img
        src={vwaves}
        alt=""
        className="hover:scale-105 w-screen absolute bottom-[-10em] left-0"
      />
    </div>
  );
};

export default Hero;
