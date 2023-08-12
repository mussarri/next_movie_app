import Image from "next/image";
import Link from "next/link";
import fetch from "node-fetch";
import React from "react";
import style from "./style.module.css";

export const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getPopularActors = async () => {
  const url =
    "https://api.themoviedb.org/3/person/popular?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmQ4Y2Q3NTFiYzExZmVlYzlhNmNjMzJjMGExMmYxOCIsInN1YiI6IjY0ZDM5YWE3ZDEwMGI2MDEzOTViMjkyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UkttgYSxtHequR7MOULzbEF-dQGjRUCLCkctQDohls0",
    },
  };
  const res = await fetch(url, options);
  return res.json();
};

async function PopularActors() {
  const data = await getPopularActors();
  console.log(data.results);
  return (
    <div className="px-10 mt-10">
      <h1 className="p-21 mb-10 text-3xl">Popular Actors</h1>
      <div className="grid grid-cols-8 gap-4">
        {data.results.slice(0, 16).map((actor, i) => (
          <Link href={"/actors/" + slugify(actor.name)}>
            <div className={style.actor + " relative"}>
              <Image
                unoptimized
                width={200}
                height={200}
                alt="image"
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
              />
              <div className="absolute bottom-0 pt-4 px-2 w-full bg-gradient-to-t from-black to-transparent">
                {actor.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="my-5 text-right">
        <Link href={"/actors"}>Show more</Link>
      </div>
    </div>
  );
}

export default PopularActors;
