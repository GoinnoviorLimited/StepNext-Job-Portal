import React from "react";

const ShowJobs = () => {
  return (
    <div className="max-w-5xl mx-auto  mt-20  px-4">
      <div>
        <div className="border-3 border-b-white border-t-[#22A7F0] border-x-black/30 p-4 pb-0 rounded-xs">
          <h3 className="font-bold">Jobs near you</h3>
          <p>Job posted in the last week</p>
        </div>
        <div className="rounded-b-xs  border border-b-0 border-t-0 border-l-0   border-r-black/30">
          <p className="text-center text-black/50">
            No jobs match your search. Please try a different query.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowJobs;
