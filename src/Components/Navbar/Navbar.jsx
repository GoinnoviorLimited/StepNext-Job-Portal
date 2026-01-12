import React, { useState } from "react";
import { FaBriefcase } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import ProfileDropdown from "../Auth/ProfileDropdown";
import SignInModal from "../Auth/SignInModal";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div>
      <SignInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <div className="drawer drawer-end">
        <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {/* Page content here */}
          <div className="bg-base-100 ">
            <div className="navbar mx-auto px-4 md:px-11 mt-2">
              <div className="flex-1">
                <NavLink
                  to={"/"}
                  className=" text-3xl md:text-4xl font-bold cursor-pointer"
                >
                  <span className="text-[#22A7F0]">Step</span>Next.
                </NavLink>
              </div>
              <div className=" flex items-center gap-6 justify-center">
                <NavLink className="xs:flex hidden items-center  gap-2  ">
                  <FaBriefcase size={18} className="mb-1" />
                  <p>Post Jobs</p>
                </NavLink>
                <div className="hidden md:block">
                  <div className="flex justify-center items-center gap-6">
                    <NavLink>Skill - Eco System</NavLink>
                    {currentUser ? (
                      <ProfileDropdown />
                    ) : (
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="hover:text-black/60 transition-colors cursor-pointer"
                      >
                        Sign In / Create Account
                      </button>
                    )}
                  </div>
                </div>
                <label
                  htmlFor="my-drawer-5"
                  className="cursor-pointer text-black/50 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 25 25"
                    className="inline-block h-8 w-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-5"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-white min-h-full w-70 border-l-6 border-l-[#22A7F0] border-0">
            {/* Sidebar content here */}
            <label
              htmlFor="my-drawer-5"
              className="mr-auto p-2 hover:bg-base-200 rounded-md cursor-pointer"
            >
              <IoClose size={24} />
            </label>

            <div className="flex flex-col ">
              {currentUser ? (
                <>
                  <NavLink
                    to="/profile"
                    className={
                      "mx-auto font-semibold text-[16px] hover:bg-indigo-500/10 px-6 py-2 rounded-full"
                    }
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={handleSignOut}
                    className={
                      "mx-auto font-semibold text-[16px] hover:bg-indigo-500/10 px-6 py-2 rounded-full cursor-pointer"
                    }
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={
                    "mx-auto font-semibold text-[16px] hover:bg-indigo-500/10 px-6 py-2 rounded-full cursor-pointer"
                  }
                >
                  Sign In / Create Account
                </button>
              )}
              <div className="p-4">
                <div className="border-t-2  border-t-black/10 w-full flex flex-col items-end py-4 gap-y-4">
                  <NavLink className={"font-semibold text-lg text-black/60"}>
                    Post Jobs
                  </NavLink>
                  <NavLink className={"font-semibold text-lg text-black/60"}>
                    Browse
                  </NavLink>
                  <NavLink className={"font-semibold text-lg text-black/60"}>
                    Job Seeker Tools
                  </NavLink>
                  <NavLink className={"font-semibold text-lg text-black/60"}>
                    Contact Us
                  </NavLink>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
