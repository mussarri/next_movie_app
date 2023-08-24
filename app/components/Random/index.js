import Image from "next/image";
import Link from "next/link";
import React from "react";

const getTrendingMovies = async () => {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.API_KEY,
    },
  };

  const res = await fetch(url, options);
  return res.json();
};

async function index() {
  const data = await getTrendingMovies();
  console.log(data);

  const movie = data?.results?.filter((item) => item.adult === false)[
    Math.round(Math.random() * 20)
  ];
  return (
    <>
      <div className="my-10 p-14 max-w-7xl w-full mx-auto">
        <h1 className="text-3xl">Editor's Choice</h1>
        {movie && (
          <div className="pt-5 flex gap-5 w-full">
            <Link href={"/movie/" + movie.id}>
              <div className="relative">
                <Image
                  unoptimized
                  width={500}
                  height={200}
                  alt="image"
                  src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
                />
              </div>
            </Link>
            <div className="text-gray-500 max-w-3xl p-2 relative">
              <h1 className="text-2xl">
                {movie.title + " (" + movie.release_date.split("-")[0] + ")"}
              </h1>
              <p className="mt-2 max-w-2xl">{movie.overview}</p>
              <p className="mt-2">
                Language: {movie.original_language.toUpperCase()}
              </p>
              <p className="mt-2 text-3xl absolute bottom-0 pb-2">
                {movie.vote_average.toFixed(1)}
                <span className="text-xl">/10</span>{" "}
              </p>
              <div className="mt-2 absolute bottom-0 p-2 right-10">
                <button className="rounded-full bg-red-700 py-2 px-4 text-gray-300 hover:text-white">
                  Watch now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default index;
