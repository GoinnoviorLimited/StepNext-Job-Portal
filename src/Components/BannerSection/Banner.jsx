import React from "react";
import Buttons from "../Shared/Buttons/Buttons";

const Banner = () => {
  return (
    <div>
      <div className="bg-slate-400/10 my-20 relative">
        <div
          className=" md:w-90 py-10 h-60 sm:h-80 md:h-90 md:ml-auto md:mr-20 lg:mx-auto
      "
        >
          <div className="hidden  md:block text-center">
            <h2 className="text-lg font-bold ">
              Already have a resume? Create/Get your Industry/Corporate Standard
              CV/Resume through StepNext.
            </h2>
            <p>
              Match with a career coach who knows your industry for an expert
              resume review
            </p>
            <div className="flex flex-col justify-center items-center gap-4 mt-4">
              <Buttons className="order-2 lg:order-1">Get Resume Help</Buttons>
              <Buttons className="order-1 lg:order-2">
                Get Premium Resume
              </Buttons>
            </div>
            <div className="flex items-center justify-center mt-4 gap-1">
              <p className="mt-1">A service of </p>
              <img
                src="https://www.simplyhired.com/next-assets/careerServicesBanner/indeed-logo.webp"
                alt=""
                className="w-14"
              />
            </div>
          </div>
        </div>
        <div>
          <img
            className="absolute left-0 bottom-0 w-70 sm:w-95 "
            src="https://www.simplyhired.com/next-assets/careerServicesBanner/img-left.webp"
            alt=""
          />
          <img
            className="absolute bottom-0 right-0 w-99  hidden lg:block"
            src="https://www.simplyhired.com/next-assets/careerServicesBanner/img-right.webp"
            alt=""
          />
        </div>
      </div>
      <div className="md:hidden">
        <div className="text-center w-full px-4 xs:w-100 mx-auto -mt-15">
          <h2 className="text-xl font-bold mb-2">
            Already have a resume? Create/Get your Industry/Corporate Standard
            CV/Resume through StepNext.
          </h2>
          <p>
            Match with a career coach who knows your industry for an expert
            resume review
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
            <Buttons className="order-2 md:order-1">Get Resume Help</Buttons>
            <Buttons className="order-1 md:order-2">Get Premium Resume</Buttons>
          </div>
          <div className="flex items-center justify-center mt-4 gap-1">
            <p className="mt-1">A service of </p>
            <img
              src="https://www.simplyhired.com/next-assets/careerServicesBanner/indeed-logo.webp"
              alt=""
              className="w-14"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
