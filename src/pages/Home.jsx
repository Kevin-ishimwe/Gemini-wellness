import Logo_max from "../components/Logo-max";

const Hero = () => {
  return (
    <div className=" min-h-screen p-20">
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
        <img
          src="https://dy7glz37jgl0b.cloudfront.net/advice/images/d9713b4d9844e3b1e289a5b64a879ae4-woman-green-shirt-headband-computer-smiling_l.jpg"
          alt=""
          className=" absolute right-6 object-cover w-[30em] h-[60vh] rounded-bl-[10%] rounded-tr-[10%] border-[12px] border-indigo-200 "
        />
      </div>
    </div>
  );
};

const SubHero = () => {
  return (
    <div className="bg-indigo-600 mx-auto text-white min-h-screen flex flex-col justify-center p-20 relative">
      <div className="w-8/12">
        <h2 className="text-[4em] font-bold mb-4">
          Introducing Gemini Wellness
        </h2>
        <p className=" mb-8 ">
          At Gemini Wellness, we understand the intricate connection between
          mind, body, and soul. Our mission is to provide a comprehensive
          platform that empowers individuals to prioritize their overall
          well-being, fostering a harmonious balance in all aspects of life.
        </p>
        <p className=" mb-8">
          With a unique blend of evidence-based practices, personalized support,
          and cutting-edge technology, we offer tailored solutions to help you
          navigate the challenges of modern living. From mental health resources
          to nutritional guidance, physical activity tracking, and mindfulness
          practices, our holistic approach ensures a seamless journey towards
          optimal wellness.
        </p>
        <button className="bg-white text-indigo-600 py-2 px-4 rounded-md hover:scale-110 w-fit">
          Explore Features
        </button>
      </div>
      <img
        className="h-[25em] w-[30em] object-cover absolute right-8 bottom-12 rounded-br-[10%] rounded-tl-[10%] border-[12px] border-white"
        src="https://imageio.forbes.com/specials-images/imageserve/916126638/Smiling-couple-learning-yoga-exercises-watching-video-on-laptop-pandemic-travel/960x0.jpg?format=jpg&width=1440"
        alt=""
      />
    </div>
  );
};

function Home() {
  return (
    <>
      <div className="bg-gray-100 ">
        <Hero />
        <SubHero />
      </div>
    </>
  );
}

export default Home;
