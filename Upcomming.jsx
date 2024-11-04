import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Upcomming = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/upcoming",
          {
            params: {
              api_key: "c45a857c193f6302f2b5061c3b85e743",
              language: "en-US",
              page: 1,
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    fetchUpcomingMovies();
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (
    <div className="bg-gray-900 p-6">
      <div className="w-full flex flex-wrap gap-6 md:gap-11 px-4 md:px-20">
        {currentMovies.map((movie) => (
          <Link
            to={`/upcoming/${movie.id}`}
            key={movie.id}
            className="h-[400px] w-full md:w-[22%] text-white shadow-[0_0_29px_0_rgba(0,0,0,0.3)]"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold no-underline">{movie.title}</h3>
            <p className="mt-2">Rating: {movie.vote_average}</p>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-6 flex-wrap">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 md:mx-2 px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Upcomming;
