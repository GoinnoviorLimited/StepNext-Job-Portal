import React, { useState } from "react";
import { NavLink } from "react-router";
import privacyIcon from "../../assets/privacy.png";
import { FaChevronDown } from "react-icons/fa";

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="bg-base-200 border md:border-0 border-y-black/10 border-x-0">
        <footer className="max-w-5xl mx-auto px-10">
          {/* --- MOBILE VIEW: Collapsible Dropdown (Visible only on small screens) --- */}
          <div className="md:hidden collapse  bg-base-200 ">
            <input
              type="checkbox"
              className="collapse-toggle"
              onClick={() => setIsOpen(!isOpen)}
            />

            <div className="collapse-title   flex justify-center items-center gap-2 cursor-pointer">
              Resources and Tools
              <FaChevronDown
                size={14}
                className={`transition-transform duration-300  ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            <div className="collapse-content px-0">
              <div className="grid grid-cols-2 py-4">
                <nav className="flex flex-col gap-2">
                  <h6 className="footer-title opacity-100 text-base-content font-bold capitalize">
                    Job Seeker Tools
                  </h6>
                  <NavLink className="link link-hover text-sm">
                    Salary Estimator
                  </NavLink>
                  <NavLink className="link link-hover text-sm">
                    Glassdoor Community
                  </NavLink>

                  <h6 className="footer-title opacity-100 text-base-content font-bold capitalize mt-6">
                    Employer Tools
                  </h6>
                  <NavLink className="link link-hover text-sm">
                    Post Jobs
                  </NavLink>
                </nav>

                <nav className="flex flex-col gap-2">
                  <h6 className="footer-title opacity-100 text-base-content font-bold capitalize">
                    Browse
                  </h6>
                  <NavLink className="link link-hover text-sm">
                    All Jobs
                  </NavLink>
                  <NavLink className="link link-hover text-sm">
                    All Salaries
                  </NavLink>
                  <NavLink className="link link-hover text-sm">
                    All Cities
                  </NavLink>
                  <NavLink className="link link-hover text-sm">
                    All Companies
                  </NavLink>

                  <h6 className="footer-title opacity-100 text-base-content font-bold capitalize mt-6">
                    Stay Connected
                  </h6>
                  <NavLink className="link link-hover text-sm">
                    Contact Us
                  </NavLink>
                </nav>
              </div>
            </div>
          </div>

          {/* --- DESKTOP VIEW: Normal Footer (Hidden on sm, visible on md and up) --- */}
          <div className="hidden  md:grid grid-cols-4 gap-16 sm:footer sm:footer-horizontal text-base-content py-10">
            <nav>
              <h6 className="footer-title capitalize">Job Seeker Tools</h6>
              <NavLink className="link link-hover">Salary Estimator</NavLink>
              <NavLink className="link link-hover">Glassdoor Community</NavLink>
              <p className="mt-10">Country</p>
              <select
                defaultValue="Bangladesh"
                className="select select-neutral outline-0"
              >
                <option>Bangladesh</option>
                <option>North America</option>
                <option>EU west</option>
                <option>South East Asia</option>
              </select>
            </nav>

            <nav>
              <h6 className="footer-title capitalize">Employer Tools</h6>
              <NavLink className="link link-hover">Post Jobs</NavLink>
            </nav>

            <nav>
              <h6 className="footer-title capitalize">Browse</h6>
              <NavLink className="link link-hover">All Jobs</NavLink>
              <NavLink className="link link-hover">All Salaries</NavLink>
              <NavLink className="link link-hover">All Cities</NavLink>
              <NavLink className="link link-hover">All Companies</NavLink>
            </nav>

            <nav>
              <h6 className="footer-title capitalize">Stay Connected</h6>
              <NavLink className="link link-hover">Contact Us</NavLink>
              <NavLink className="link link-hover">Privacy policy</NavLink>
              <NavLink className="link link-hover">Cookie policy</NavLink>
            </nav>
          </div>
        </footer>
      </div>
      <footer className="px-2">
        <div className="flex flex-col md:flex-row items-center justify-center max-w-7xl gap-6  mx-auto my-6 ">
          <div>
            <NavLink
              to={"/"}
              className=" text-4xl md:text-4xl font-bold cursor-pointer flex justify-center"
            >
              <span className="text-[#22A7F0]">Step</span>Next.
            </NavLink>
            <div className="md:hidden">
              <p className="mt-4 mb-2 text-black/70">Country</p>
              <select
                defaultValue="Bangladesh"
                className="select select-neutral outline-0"
              >
                <option>Bangladesh</option>
                <option>North America</option>
                <option>EU west</option>
                <option>South East Asia</option>
              </select>
              <p className="text-xs font-semibold mt-6">
                Take your job search wherever you go.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
            <p className="text-xs font-semibold">
              &copy; 2025 Design & Developed By Goinnovior Limited, all rights
              reserved to StepNext{" "}
              <NavLink className={"underline text-teal-600/90"}>
                Terms of Service
              </NavLink>
              .
            </p>
            <div className="flex flex-wrap gap-2 text-xs items-center">
              <NavLink>Privacy</NavLink>|<NavLink>Cookies </NavLink>|
              <NavLink>Privacy Center </NavLink>|
              <NavLink>Accessibility </NavLink>|
              <NavLink className={"flex items-center gap-2"}>
                Your Privacy Choices
                <img src={privacyIcon} alt="" className="w-6 h-3" />
              </NavLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
