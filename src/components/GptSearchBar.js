import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef, useState } from "react";
import openai from "../utils/openai";
import { API_OPTIONS, TMDB_SEARCH_URL } from "../utils/constants";
import { addGptMovieResults } from "../utils/gptSlice";


const GptSearchBar = () => {
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    const searchMovieTMDB = async (movie) => {
        const data = await fetch(TMDB_SEARCH_URL + movie + '&include_adult=false&page=1', API_OPTIONS);
        const json = await data.json();
        return json.results;
    };

    const handleGptSearchClick = async () => {
        const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query: " + searchText.current.value + 
            "only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Oopiri, Mr.Perfect, Legend, Bimbisara, Maharshi";

        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
        });

        if (!gptResults.choices) {
            setError("No results found!")
        }

        const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
        const tmdbResults = await Promise.all(promiseArray);
        dispatch(addGptMovieResults({movieNames: gptMovies, movieResults: tmdbResults}));
    };

    return (
        <div className="pt-[40%] md:pt-[10%] flex justify-center">
            <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
                <input ref={searchText} className="p-2 m-4 col-span-9" type="text" placeholder={lang[langKey].gptSearchPlaceholder}/>
                <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg" onClick={handleGptSearchClick}>{lang[langKey].tmdbSearch}</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default GptSearchBar;