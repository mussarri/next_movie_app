"use client";
import React, { useEffect, useState } from "react";
import fetch from "node-fetch";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./movieslider.module.css";
import { date } from "@/utils";

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 2,
  autoplay: true,
  speed: 8000,
  autoplaySpeed: 8000,
  cssEase: "linear",
  variableWidth: false,
  arrows: false,
  pauseOnHover: false,
  variableWidth: true,
};

function MovieSlider({ list, title }) {
  const [data, setData] = useState();

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${list}?language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_KEY2,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className={style.slider + " px-14 mt-10 mx-auto"}>
      <h2 className="p-21 text-3xl">{title} Movies</h2>
      <div className="my-5 w-full">
        <Slider {...settings}>
          {data?.results
            ? data.results.map((item) => (
                <Link href={"/movie/" + item.id}>
                  <div className={style.movie}>
                    <Image
                      unoptimized
                      width={200}
                      height={200}
                      alt="image"
                      src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                    />
                    <div className="absolute bottom-0 left-0 w-full py-5 px-2 bg-gradient-to-t from-black to-transparent pt-2 text-md">
                      <p>{item.title}</p>
                      <div className="flex justify-between text-lg">
                        <p>{date(item.release_date)}</p>
                        <p>
                          {item.vote_average}
                          <span className="text-xs">/10</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            : Array(10)
                .fill(0)
                .map((item) => (
                  <div className="p-4">
                    <div className="h-48">Loading</div>
                  </div>
                ))}
        </Slider>
      </div>
    </div>
  );
}

export default MovieSlider;
