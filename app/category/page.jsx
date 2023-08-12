import React from "react";


async function page() {
  const data = await getMovieByCategory();
  console.log(data);
  return <div>Category</div>;
}

export default page;
