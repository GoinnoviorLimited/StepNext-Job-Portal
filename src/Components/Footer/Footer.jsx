import React from "react";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <div>
      <div className=" bg-base-200">
        <footer className="footer sm:footer-horizontal text-base-content p-10 max-w-5xl mx-auto ">
          <nav>
            <h6 className="footer-title capitalize">Job Seeker Tools</h6>
            <NavLink className="link link-hover">Salary Estimator</NavLink>
            <NavLink className="link link-hover">Glassdoor Community</NavLink>
            <p className="mt-10">Country</p>
            <select
              defaultValue="Server location"
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
            <NavLink className="link link-hover">Contact</NavLink>
            <NavLink className="link link-hover">Jobs</NavLink>
            <NavLink className="link link-hover">Press kit</NavLink>
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
        </footer>
      </div>
      <footer>
        <div className="flex items-center max-w-7xl gap-6 mx-auto my-6">
          <p className="text-3xl font-bold">StepNext.</p>
          <p className="text-xs">
            &copy; 2025 SH Inc. SimplyHired is part of the Indeed Site, and by
            using SimplyHired you agree to the Indeed Terms of Service.
          </p>
          <div className="flex flex-wrap gap-2 text-xs ">
            <NavLink>Privacy</NavLink>|<NavLink>Cookies </NavLink>|
            <NavLink>Privacy Center </NavLink>|<NavLink>Accessibility </NavLink>
            |<NavLink>Your Privacy Choices </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
