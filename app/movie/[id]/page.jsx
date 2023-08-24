import { date, titleize } from "@/utils";
import fetch from "node-fetch";
import React from "react";
import style from "./style.module.css";
import { Rating } from "@mui/material";

const getSingleMovie = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_KEY,
    },
  };
  const res = await fetch(url, options);
  return res.json();
};

async function page({ params }) {
  const movie = await getSingleMovie(params.id);
  console.log(movie);
  return (
    <div
      className={style.hero + " h-144"}
      style={{
        backgroundImage: movie.backdrop_path
          ? `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`
          : "url(https://cdn.pixabay.com/photo/2013/03/08/05/28/filmstrip-91434_1280.jpg)",
      }}
    >
      <div className="absolute py-5 z-10 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl">
            <h1 className="text-5xl">
              {movie.title + " (" + date(movie.release_date) + ")"}
            </h1>

            <p className="p-2 mt-3 text-3xl">
              <Rating
                name="read-only"
                value={movie.vote_average / 2}
                readOnly
              />
              <span className="ml-2">{movie.vote_average.toFixed(1)}</span>
            </p>
            <p className="mt-3 p-2 text-gray-400">{movie.overview}</p>
            <div className="m-2">
              <button className="rounded-full bg-red-800 p-2 text-lg px-10 text-gray-300 hover:text-white">
                Play
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
