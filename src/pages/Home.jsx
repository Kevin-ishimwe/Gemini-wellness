import vwaves from "../assets/Vectorwave.svg";
import hero_2_photo from "../assets/hero2.png";
import Hero from "../components/Hero";
import Faqs from "../components/Faqs";
import WhyGemini from "../components/Why";
import Footer from "../components/Footer";

const SubHero = () => {
  return (
    <div className="relative z-[10] ">
      <div className="flex relative bg-indigo-600 mx-auto text-white justify-center p-20 hero-2">
        <div className="w-6/12">
          <h2 className="text-[4em] font-bold mb-4">
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
          <button className="bg-white text-indigo-600 py-2 px-4 rounded-md hover:scale-110 w-fit">
            Explore Features
          </button>
        </div>
        <div className="flex flex-col">
          <img
            src="https://dy7glz37jgl0b.cloudfront.net/advice/images/341c509086ff5067842a0d7027315868-girl-holding-mug-smiling-by-computer_l.jpg"
            alt=""
            className="hover:scale-105  object-cover w-[20em] h-[25em] rounded-bl-[100px] rounded-[30px] border-[3px] border-white "
          />

          <img
            className="hover:scale-105 my-4  object-cover w-[35em] h-[20em] rounded-bl-[100px] rounded-[30px] border-[3px] border-white "
            src="https://dy7glz37jgl0b.cloudfront.net/advice/images/297dfb7a92111b7dab757eda16fe1a8a-man-types-on-his-laptop-while-wearing-headphones-at-a-desk_l.jpg"
            alt=""
          />
        </div>
        <div></div>
      </div>
      <img
        src={vwaves}
        alt=""
        className="upside w-screen bottom-[-10em] absolute left-0 z-[-10]"
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
        <Faqs />
        <WhyGemini />
        <Footer />
      </div>
    </>
  );
}

export default Home;
