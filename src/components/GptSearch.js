import { BACKGROUND } from "../utils/constants";
import GptMovieSugestions from "./GptMovieSugestions";
import GptSearchBar from "./GptSearchBar";


const GptSearch = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img className="object-cover" src={BACKGROUND} alt="background"/>
      </div>
      <div>
        <GptSearchBar/>
        <GptMovieSugestions/>
      </div>
    </>
  );
};

export default GptSearch;