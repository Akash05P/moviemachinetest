import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewPopular = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: "c45a857c193f6302f2b5061c3b85e743",
              language: "en-US",
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits`,
          {
            params: {
              api_key: "c45a857c193f6302f2b5061c3b85e743",
              language: "en-US",
            },
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      }
    };

    fetchMovieDetails();
    fetchMovieCast();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <>
      <div
        className="flex flex-col text-white h-auto w-full"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-gray-900 bg-opacity-70 h-full w-full md:w-[40%] rounded-md p-3">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-[30%] h-[200px] rounded-md">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="h-[200px] w-full"
              />
            </div>

            <div className="pl-3 w-full md:w-[70%] text-left">
              <h1 className="text-3xl font-bold my-2">{movie.title}</h1>
              <p className="text-3xl mb-3">Rating: {movie.vote_average}</p>
              <p className="text-md mb-3">
                {movie.runtime} min | {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className="text-md mb-2">Release Date: {movie.release_date}</p>
            </div>
          </div>

          <div className="text-left">
            <h2 className="text-2xl mt-4 mb-2">Overview</h2>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 bg-opacity-80 p-3 w-full">
        <h2 className="text-2xl font-bold mb-3 text-left text-white pl-2">Cast</h2>
        <div className="w-full flex flex-wrap justify-center">
          {cast.slice(0, 10).map((actor) => (
            <div key={actor.cast_id} className="w-full sm:w-[45%] md:w-[30%] lg:w-[15%] m-2 text-center shadow-[0_0_29px_0_rgba(0,0,0,0.3)]">
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="h-[300px] w-[200px] object-cover mx-auto"
              />
              <p className="text-gray-300 text-left pl-2">{actor.name}</p>
              <p className="text-gray-300 text-left pl-2">Character: {actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewPopular;
