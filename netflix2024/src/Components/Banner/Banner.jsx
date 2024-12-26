import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import"./banner.css"
// Helper function to truncate text
const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

const Banner = () => {
  const [movie, setMovie] = useState({}); // Initializing the movie state

  useEffect(() => {
    // Fetching data from API on component mount
    (async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        console.log(request);

        // Select a random movie from the API response
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    })();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: movie?.backdrop_path
          ? `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`
          : "none", // Only use the background image if it exists
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner_contents">
        {/* Conditional rendering for movie title */}
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        
        <div className="banner_buttons">
          <button className="banner_button play">Play</button>
          <button className="banner_button">My List</button>
        </div>

        {/* Movie description with truncation */}
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="banner_fadeBottom" />
    </div>
  );
};

export default Banner;
