import React from "react";
import { FaBriefcase } from "react-icons/fa";

const Navbar = () => {
  return (
    <div>
      <div className="drawer drawer-end">
        <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {/* Page content here */}
          <div className="bg-base-100 ">
            <div className="navbar mx-auto max-w-6xl">
              <div className="flex-1">
                <a className="text-2xl font-bold">StepNext.</a>
              </div>
              <div className="flex items-center gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <FaBriefcase />
                  <p>Post Jobs</p>
                </div>
                <div>
                  <p>Sign In/ Create Account</p>
                </div>
                <label htmlFor="my-drawer-5" className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-5 w-5 stroke-current"
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>{" "}
                  </svg>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-5"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
