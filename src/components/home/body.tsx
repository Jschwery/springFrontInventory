import React from "react";

function Body() {
  return (
    <div className="bg-slate-500 h-screen flex flex-col sm:flex-row">
      <div className="bg-orange-200 h-full w-full flex flex-col p-12 items-start justify-start space-y-6 ">
        <h2 className=" text-4xl font-Inter">Task Tribe</h2>
        <h3 className="text-3xl pl-0.5">
          {" "}
          Discover a new way of working together
        </h3>
      </div>
      <div className="bg-teal-400 h-full w-full">
        <p>hi2</p>
      </div>
    </div>
  );
}

export default Body;
