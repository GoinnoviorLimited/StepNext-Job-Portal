import React from "react";
import Buttons from "../Shared/Buttons/Buttons";

const Header = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4">
        {/* Search section */}
        <div className="mx-auto mt-16 sm:mt-24 flex flex-col items-center">
          {/* Heading */}
          <div className="w-full md:w-full lg:w-max">
            <h2 className="text-center md:text-start text-2xl sm:text-4xl font-bold mb-6">
              One Search, Millions of Jobs
            </h2>

            {/* Inputs */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch sm:items-center w-full">
              <input
                type="text"
                placeholder="Company Name / Keyword"
                className="input input-ghost outline-1 h-11 w-full lg:w-94"
              />

              <input
                type="text"
                placeholder="Job position / Internship"
                className="input input-ghost outline-1 h-11 w-full lg:w-94"
              />

              <Buttons className="w-full md:w-full lg:w-auto ">Search Jobs</Buttons>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
