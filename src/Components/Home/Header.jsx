import React from "react";
import Buttons from "../Shared/Buttons/Buttons";

const Header = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto">
        {/* search section--------------- */}
        <div className="w-max mx-auto mt-24">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              One Search, Millions of Jobs
            </h2>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Company Name/Search, what you deserve/desire"
              className="input input-ghost outline-1 w-100"
            />
            <input
              type="text"
              placeholder="Job position/Internship"
              className="input input-ghost outline-1 w-100"
            />
            <Buttons>Search Jobs</Buttons>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
