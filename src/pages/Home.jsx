import vwaves from "../assets/Vectorwave.svg";
import Hero from "../components/Hero";
import Faqs from "../components/Faqs";
import WhyGemini from "../components/Why";

const SubHero = () => {
  return (
    <div className="relative z-[10] ">
      <div className="lg:flex relative bg-indigo-600 lg:mx-auto text-white justify-between items-center p-6 lg:p-20 hero-2">
        <div className="lg:w-6/12 text-center lg:text-left">
          <h2 className="text-4xl lg:text-[4em] leading-[1.7em] font-bold mb-4">
            Introducing <br></br>Gemini Wellness
          </h2>
          <p className=" mb-8 ">
            At Gemini Wellness, we understand the intricate connection between
            mind, body, and soul. Our mission is to provide a comprehensive
            platform that empowers individuals to prioritize their overall
            well-being, fostering a harmonious balance in all aspects of life.
          </p>
          <p className=" mb-8">
            With a unique blend of evidence-based practices, personalized
            support, and cutting-edge technology, we offer tailored solutions to
            help you navigate the challenges of modern living. From mental
            health resources to nutritional guidance, physical activity
            tracking, and mindfulness practices, our holistic approach ensures a
            seamless journey towards optimal wellness.
          </p>
          <button className=" bg-white text-indigo-600 py-2 px-4 rounded-lg hover:scale-110 w-fit">
            Explore Features
          </button>
        </div>
        <div className="flex flex-col justify-end lg:w-[40em] gap-2 lg:gap-4 mt-4 overflow-hidden lg:p-12">
          <div className="flex gap-2 lg:gap-4">
            <div className="text-overlay-container w-[45%] h-[15em] lg:w-[50%] lg:h-[25em] relative overflow-hidden">
              <img
                src="https://dy7glz37jgl0b.cloudfront.net/advice/images/341c509086ff5067842a0d7027315868-girl-holding-mug-smiling-by-computer_l.jpg"
                alt=""
                className="object-cover w-full h-full rounded-l-[100px] rounded-[30px] border-[3px] border-white"
              />
              <div className="overlay-text rounded-l-[100px] rounded-[30px] border-[3px] bg-[#03391269] uppercase font-bold">
                <p>
                  Your Safe Space <br></br>Chat Freely, Anytime.
                </p>
              </div>
            </div>
            <div className="text-overlay-container w-[45%] h-[15em] lg:w-[50%] lg:h-[25em] relative overflow-hidden">
              <img
                src="https://dy7glz37jgl0b.cloudfront.net/advice/images/ee27b7980e4f81e46bd25482cffbd6c2-man-looks-past-his-laptop-in-an-office-setting_l.jpeg"
                alt=""
                className="object-cover w-full h-full rounded-r-[100px] rounded-[30px] border-[3px] border-white"
              />
              <div className="overlay-text bg-[#3a093569] rounded-r-[100px] rounded-[30px] border-[3px] uppercase font-bold">
                <p>
                  Find Your Balance<br></br> we support your journey
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="text-overlay-container w-full h-[15em] md:h-[20em] lg:h-[20em] relative overflow-hidden">
              <img
                className="object-cover w-full h-full rounded-b-[100px] rounded-[30px] border-[3px] border-white"
                src="https://dy7glz37jgl0b.cloudfront.net/advice/images/297dfb7a92111b7dab757eda16fe1a8a-man-types-on-his-laptop-while-wearing-headphones-at-a-desk_l.jpg"
                alt=""
              />
              <div className="overlay-text rounded-b-[100px] rounded-[30px] border-[3px] bg-[#09093a69] uppercase font-bold translate-Y-20">
                <p>
                  Embrace Well-Being<br></br> you matter
                </p>
              </div>
            </div>
            <div className="hover:translate-x-8 absolute bg-[#a5da20] -top-[5em] left-8 -rotate-45 h-[7em] w-[3em] rounded-[200px]"></div>
            <div className="t1 absolute hover:scale-105 hover:translate-y-8 bg-[#e93a66] -top-[5em] left-[80%] lg:-right-12 -rotate-30 h-[5em] w-[7em]"></div>
            <div className="absolute hover:scale-105 hover:translate-y-8 bg-[#ce3fb6] top-[30%] right-[1%] -rotate-45 h-[2em] w-[5em] z-5"></div>
          </div>
        </div>

        <div></div>
      </div>
      <img
        src={vwaves}
        alt=""
        className="upside w-screen bottom-[-5em] lg:bottom-[-15em] absolute left-0 z-[-10]"
      />
    </div>
  );
};

function Home() {
  return (
    <>
      <Hero />
      <SubHero />
      <Faqs />
      <WhyGemini />
    </>
  );
}

export default Home;
