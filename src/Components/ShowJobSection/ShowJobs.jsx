import React from "react";

const ShowJobs = () => {
  return (
    <div className="max-w-5xl mx-auto border-3 border-b-0 mt-20 p-4 border-t-[#22A7F0] border-x-black/30">
      <div>
        <div>
          <h3 className="font-bold">Jobs near you</h3>
          <p>Job posted in the last week</p>
        </div>
        <div>
          <p className="text-center text-black/50">
            No jobs match your search. Please try a different query.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowJobs;
