import lady_phone from "../assets/lady_phone.jpg";
import computer_hero from "../assets/computer_hero.svg";
import dude_phone from "../assets/dude_phone.jpg";
import vwaves from "../assets/Vectorwave.svg";

const Hero = () => {
  return (
    <div className="py-[5em] min-h-screen lg:px-8 lg:p-20 relative">
      <div className=" lg:p-6 flex flex-col-reverse lg:flex-row lg:min-h-[80vh]  justify-between items-center">
        <div>
          <h1 className="text-4xl lg:text-[3.3em] font-black mb-2 uppercase leading-[1em] text-indigo-900 text-center mt-4 lg:text-left ">
            Unlock Your <br></br>Path to Well-Being
          </h1>
          <p className=" mb-8 mt-4 font-PoppinsLight text-xl text-center lg:text-left">
            Your mental, physical, and emotional health matters.
          </p>
        </div>
        <div>
          <div className="flex my-12 items-center">
            <img
              src={computer_hero}
              alt=""
              className="hover:scale-105  lg:w-[20em]  rounded-bl-[10%] rounded-tr-[10%] border-indigo-200 "
            />
            <div className=" relative">
              <img
                src={lady_phone}
                alt=""
                className="hover:scale-105  object-cover w-[90%] h-[10em] lg:w-[20em]  rounded-[30px] rounded-bl-[30px] rounded-tr-[100px] border-[1px] border-indigo-500 ml-4"
              />
              <div className="hover:scale-105 hover:translate-x-8 absolute bg-[#928CFF] h-[4em] w-[2em]  -top-[3em] lg:-top-[5em] left-8 -rotate-45 lg:h-[7em] lg:w-[3em] rounded-[200px]"></div>
              <div className="t1 absolute hover:scale-105 hover:translate-y-8 bg-[#2C97DE] -top-[3em] h-[3em] w-[3em] lg:-top-[10em] right-4 -rotate-45 lg:h-[10em] lg:w-[5em] "></div>
            </div>
          </div>
          <div className="relative flex gap-4 ">
            <div className="mr-4">
              <img
                src="https://dy7glz37jgl0b.cloudfront.net/advice/images/d9713b4d9844e3b1e289a5b64a879ae4-woman-green-shirt-headband-computer-smiling_l.jpg"
                alt=""
                className="hover:scale-105 w-[50vw]  object-cover lg:w-[20em] h-full rounded-[30px] rounded-bl-[100px] border-[1px] border-indigo-500 ml-4"
              />
              <div className="hover:scale-110 hover:translate-y-4 c1 absolute bg-[#F8E26C] -top-[5em] rotate-45 h-[5em] w-[5em] left-8 lg:h-[10em] lg:w-[5em] "></div>
            </div>
            <img
              src={dude_phone}
              alt=""
              className="hover:scale-105 w-[50vw] lg:w-[15em] object-cover rounded-[20px] rounded-br-[100px] border-[1px] border-indigo-500 mr-4 "
            />
          </div>
        </div>
      </div>

      <img
        src={vwaves}
        alt=""
        className="w-[100vw] bottom-0 object-cover absolute lg:bottom-[-10em] left-0"
      />
    </div>
  );
};

export default Hero;
