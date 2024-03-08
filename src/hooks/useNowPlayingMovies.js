import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";



const useNowPlayingMovies = () => {
    // fetching the data from TMDB API and updating the Redux store
    const dispatch = useDispatch();

    const getNowPlayingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
    // console.log(data);
    const json = await data.json();
    // console.log(json);
    // console.log(json.results);
    dispatch(addNowPlayingMovies(json.results));
    }

    useEffect(() => {
        getNowPlayingMovies();
    }, []);
}

export default useNowPlayingMovies;