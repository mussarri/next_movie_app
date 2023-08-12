import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import fetch from "node-fetch";

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 8,
  slidesToScroll: 4,
  cssEase: "linear",
  variableWidth: false,
  arrows: false,
  pauseOnHover: false,
};

const getCategories = async () => {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
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

async function CategorySlider() {
  const data = await getCategories();

  return (
    <>
      <div className="my-10 p-10 w-full">
        <h1 className="text-3xl">Categories</h1>
        <div className="mt-5 flex flex-wrap">
          {data?.genres &&
            data.genres.map((item) => (
              <div className="h-13 p-4">
                <Link
                  href={{
                    pathname: "/category/" + item.name.toLowerCase(),
                    query: { id: item.id },
                  }}
                >
                  <div className="bg-gray-900 rounded p-2 px-4 text-center align-baseline">
                    {item.name}
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default CategorySlider;
