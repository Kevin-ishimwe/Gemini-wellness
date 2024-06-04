import vwaves from "../assets/Vectorwave.svg";
import hero_2_photo from "../assets/hero2.png";
import Hero from "../components/Hero";
import Faqs from "../components/Faqs";

const SubHero = () => {
  return (
    <div className="relative z-[10] ">
      <div className="relative bg-indigo-600 min-h-[80vh]mx-auto text-white flex flex-col justify-center p-20 hero-2">
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
            With a unique blend of evidence-based practices, personalized
            support, and cutting-edge technology, we offer tailored solutions to
            help you navigate the challenges of modern living. From mental
            health resources to nutritional guidance, physical activity
            tracking, and mindfulness practices, our holistic approach ensures a
            seamless journey towards optimal wellness.
          </p>
          <button className="bg-white text-indigo-600 py-2 px-4 rounded-md hover:scale-110 w-fit">
            Explore Features
          </button>
        </div>
        <img
          className="w-[35em] object-cover absolute right-2 bottom-[1x0vh] z-[5]"
          src={hero_2_photo}
          alt=""
        />
      </div>
      <img src={vwaves} alt="" className="upside w-screen bottom-[-10em] absolute left-0 " />
    </div>
  );
};

function Home() {
  return (
    <>
      <div className="bg-gray-100 ">
        <Hero />
        <SubHero />
        <Faqs />
      </div>
    </>
  );
}

export default Home;
