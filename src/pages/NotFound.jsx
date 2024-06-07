import Logo_max from "../components/Logo-max";
import not_found from "../assets/404-error.png";
import { NavLink } from "react-router-dom";
function NotFound() {
  return (
    <div className="">
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Logo_max />

        <h1 className="text-4xl font-bold my-4 text-indigo-400">
          Page not found
        </h1>
        <img src={not_found} alt="" className="w-[20em]" />
        <p>
          Possible reasons <br />
          - Typing an incorrect or misspelled web address
          <br /> - Clicking on a broken or outdated link on a website <br />- The
          web page has been removed or doesn't exist
        </p>
        <NavLink to={'/'} className="px-8 py-3 rounded-md bg-indigo-600 text-white font-thin my-4 ">Home</NavLink>
      </div>
    </div>
  );
}

export default NotFound;
