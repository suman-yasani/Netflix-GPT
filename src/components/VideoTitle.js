import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";


const VideoTitle = ({title, overview}) => {
  const langKey = useSelector((store) => store.config.lang);
 
  return (
    <div className="w-screen aspect-video pt-[15%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        <p className="hidden md:inline-block py-4 text-md w-1/3">{overview}</p>
        <div className="my-4 md:m-0">
          <button className="bg-white text-black py-3 md:py-3 px-3 w-28 text-xl rounded-lg hover:bg-opacity-80">{lang[langKey].play}</button>
          <button className="hidden md:inline-block mx-2 bg-gray-500 text-white py-3 px-6 text-xl bg-opacity-50 rounded-lg">{lang[langKey].moreInfo}</button>
        </div>
    </div>
  );
};

export default VideoTitle;