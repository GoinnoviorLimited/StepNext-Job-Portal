import React from "react";
import Buttons from "../Shared/Buttons/Buttons";

const Banner = () => {
  return (
    <div className="bg-slate-400/10 my-20 relative">
      <div className="text-center w-150 mx-auto py-10">
        <h2 className="text-3xl font-bold ">
          Already have a resume? Create/Get your Industry/Corporate Standard
          CV/Resume through StepNext.
        </h2>
        <p>
          Match with a career coach who knows your industry for an expert resume
          review
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Buttons>Get Resume Help</Buttons>
          <Buttons>Get Premium Resume</Buttons>
        </div>
        <div>
          <p className="mt-4">A service of indeed</p>
        </div>
      </div>
      <div>
        <img
          className="absolute left-0 bottom-0 w-85"
          src="https://www.simplyhired.com/next-assets/careerServicesBanner/img-left.webp"
          alt=""
        />
        <img
          className="absolute top-0 right-0 w-85"
          src="https://www.simplyhired.com/next-assets/careerServicesBanner/img-right.webp"
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
