import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
  // const [trailerId, setTrailerId] = useState(null);
  
  // fetching the trailer video and updating the store with trailer video
  const getMovieVideos = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/videos?', API_OPTIONS);
    // console.log(data);
    const json = await data.json();
    // console.log(json);
    // console.log(json.results);

    const filterData = json.results.filter((video) => video.type === "Trailer");
    // console.log(filterData);
    const trailer = filterData.length ? filterData[0] : json.results[0];
    // console.log(trailer);
    // setTrailerId(trailer.key);
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;