import Hero from "@/app/components/Hero/Hero";
import Image from "next/image";
import fetch from "node-fetch";
import React from "react";
import Movie from "../../components/Movie";

const getActor = async (person_id) => {
  const url = `https://api.themoviedb.org/3/person/${person_id}?language=en-US`;
  const url2 = `https://api.themoviedb.org/3/person/${person_id}/movie_credits?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_KEY,
    },
  };

  const lists = await Promise.all(
    [url, url2].map(async (url) => {
      const res = await fetch(url, options);
      return res.json();
    })
  );

  return lists;
};

async function page({ params }) {
  const [person, person_movies] = await getActor(params.id);
  console.log(person_movies);
  return (
    <div>
      <Hero isHome={false} title={person?.name} />
      <div className="mt-10 max-w-6xl mx-auto text-gray-400">
        <h2 className="p-1 text-3xl text-white">Biograpyh</h2>
        <div className="float-right p-2 bg-gray-900 rounded ">
          <Image
            width={300}
            height={500}
            unoptimized
            alt="image"
            src={`https://image.tmdb.org/t/p/w300${person?.profile_path}`}
          />
          <p className="mt-3 text-lg text-right">{person?.place_of_birth}</p>
          <p className="mt-1 text-lg text-right">
            Birthday: {person?.birthday}
          </p>
        </div>
        <p className="p-1 mt-2" style={{ minHeight: 600 }}>
          {Array.isArray(person?.biography)
            ? person?.biography.split("\n").map((item, idx) => {
                return (
                  <React.Fragment key={idx}>
                    {item}
                    <br />
                  </React.Fragment>
                );
              })
            : person?.biography}
        </p>
      </div>
      <div className="mt-10 max-w-6xl mx-auto">
        <div className="p-1 pr-5 flex justify-between">
          <h2 className="text-3xl text-white">Movies</h2>
          <select className="p-1">
            <option value="">1sad</option>
            <option value="">12asd</option>
          </select>
        </div>
        <div className="p-1 mt-3 flex flex-wrap">
          {/* {person_movies?.cast
            .filter((item) => item.poster_path)
            .sort((a, b) => b.vote_average - a.vote_average)
            .map((movie) => (
              <Movie item={movie} />
            ))} */}
        </div>
      </div>
    </div>
  );
}

export default page;
