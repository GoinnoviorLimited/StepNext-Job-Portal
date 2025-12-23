import React from "react";
import { Link } from "react-router";

const Buttons = (props) => {
  return (
    <Link
      to={props.to}
      className="bg-[#22A7F0] text-white px-6 py-2 rounded-full font-bold cursor-pointer text-lg text-center hover:bg-[#1b8ac4] transition-colors duration-300 inline-block"
    >
      {props.children}
    </Link>
  );
};

export default Buttons;
