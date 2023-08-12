import Hero from "@/app/components/Hero/Hero";
import React from "react";

export function titleize(slug) {
  var words = slug.split("-");
  return words
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    })
    .join(" ");
}

function page({ params }) {
  return (
    <div>
      <Hero isHome={false} title={titleize(params.name)} />
    </div>
  );
}

export default page;
