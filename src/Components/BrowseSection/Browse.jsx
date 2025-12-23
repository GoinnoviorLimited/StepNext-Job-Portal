import React from "react";
import { FaChevronDown } from "react-icons/fa";

const Browse = () => {
  return (
    <div className="my-10">
      <div className="text-center my-6">
        <h2 className="text-2xl  font-bold">Browse StepNext</h2>
        <p className="max-w-2xl mx-auto">
          Browse StepNext for jobs, view local and national salary information,
          discover companies, and learn about the job market in a specific city.
        </p>
      </div>
      <div className="flex justify-center">
        <button className="text-[#22A7F0] cursor-pointer hover:bg-slate-400/10 p-4 rounded-md">
          <FaChevronDown size={24} />
        </button>
      </div>
    </div>
  );
};

export default Browse;
