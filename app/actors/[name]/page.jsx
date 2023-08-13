import Hero from "@/app/components/Hero/Hero";
import { titleize } from "@/utils";
import React from "react";


function page({ params }) {
  return (
    <div>
      <Hero isHome={false} title={titleize(params.name)} />
    </div>
  );
}

export default page;
