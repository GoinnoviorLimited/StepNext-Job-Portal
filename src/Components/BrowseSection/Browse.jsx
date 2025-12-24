import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import ExploreJobs from "./ExploreJobs";
import Buttons from "../Shared/Buttons/Buttons";

const Browse = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-10">
      <div className="text-center my-6 px-4">
        <h2 className="text-2xl  font-bold">Browse StepNext</h2>
        <p className="max-w-2xl mx-auto ">
          Browse StepNext for jobs, view local and national salary information,
          discover companies, and learn about the job market in a specific city.
        </p>
      </div>
      {/* Toggle Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setOpen(!open)}
          className="cursor-pointer text-[#22A7F0] hover:bg-slate-400/10 p-2 rounded-md"
        >
          <FaChevronDown
            size={24}
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      {/* Dropdown */}
      {open && (
        <div className="mt-10 px-6">
          {/* Explore jobs--- */}
          <ExploreJobs />
          <div className="flex flex-col items-center my-10 gap-y-4">
            <h3 className="text-xl font-bold">A job search tailored for you</h3>
            <p>Find the job that's right for you.</p>
            <Buttons>Search Jobs</Buttons>
          </div>
        </div>
      )}
    </div>
  );
};

export default Browse;
