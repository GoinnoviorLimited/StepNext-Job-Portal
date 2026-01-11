import React from "react";
import Buttons from "../Shared/Buttons/Buttons";
import { Crown } from "lucide-react";

const Banner = () => {
  return (
    <div>
      <div className="bg-slate-400/10 my-20 relative">
        <div
          className=" md:w-90 lg:w-120 lg:flex items-center lg:mr-40  py-10 h-60 sm:h-80 md:h-90 md:ml-auto md:mr-20 xl:mx-auto
      "
        >
          <div className="hidden  md:block text-center w-full ">
            <h2 className="text-lg font-bold ">
              Already have a resume? Create/Get your Industry/Corporate Standard
              CV/Resume through StepNext.
            </h2>
            <p>
              Match with a career coach who knows your industry for an expert
              resume review
            </p>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-4 mt-4 w-full">
              <Buttons className="order-2 lg:order-1" to="/resumebuilders">
                Get Resume Help
              </Buttons>
              <div className="relative order-1 lg:order-2 group">
                <Buttons className="!bg-gradient-to-r !from-[#bf953f] !via-[#fcf6ba] !to-[#b38728] !text-black border-none shadow-lg hover:!scale-105 transition-transform duration-300 relative overflow-hidden">
                  <span className="relative z-10">Get Premium Resume</span>
                  <div className="absolute top-0 left-[-100%] h-full w-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[100%]" />
                </Buttons>
                <Crown 
                  className="absolute -top-3 -right-3 text-[#d4af37] drop-shadow-md rotate-12 group-hover:rotate-[30deg] transition-transform duration-300 z-20" 
                  size={24} 
                  fill="#d4af37"
                />
              </div>
            </div>
            <div className="flex items-center justify-center mt-4 gap-1">
              <p className="">A service of </p>
              <p className="font-bold">StepNext.</p>
            </div>
          </div>
        </div>
        <div>
          <img
            className="absolute left-0 bottom-0 w-70 sm:w-100 "
            src="https://www.simplyhired.com/next-assets/careerServicesBanner/img-left.webp"
            alt=""
          />
          <img
            className="absolute bottom-0 right-0 w-99  hidden xl:block"
            src="https://www.simplyhired.com/next-assets/careerServicesBanner/img-right.webp"
            alt=""
          />
        </div>
      </div>
      <div className="md:hidden">
        <div className="text-center md:w-full px-4 w-100 mx-auto -mt-15">
          <h2 className="text-xl font-bold mb-2">
            Already have a resume? Create/Get your Industry/Corporate Standard
            CV/Resume through StepNext.
          </h2>
          <p>
            Match with a career coach who knows your industry for an expert
            resume review
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4 w-full">
            <Buttons className="order-2 md:order-1 " to="/resumebuilders">
              Get Resume Help
            </Buttons>
            <div className="relative order-1 md:order-2 group">
              <Buttons className="!bg-gradient-to-r !from-[#bf953f] !via-[#fcf6ba] !to-[#b38728] !text-black border-none shadow-lg hover:!scale-105 transition-transform duration-300 relative overflow-hidden">
                <span className="relative z-10">Get Premium Resume</span>
                <div className="absolute top-0 left-[-100%] h-full w-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[100%]" />
              </Buttons>
              <Crown 
                className="absolute -top-3 -right-3 text-[#d4af37] drop-shadow-md rotate-12 group-hover:rotate-[30deg] transition-transform duration-300 z-20" 
                size={24} 
                fill="#d4af37"
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-4 gap-1">
            <p className="">A service of </p>
            <p className="font-bold">StepNext.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
