import React from "react";
import { Link } from "react-router";

const Buttons = (props) => {
  return (
    <Link to={props.to}>
      <button className="bg-[#22A7F0] text-white px-4 py-2 rounded-full font-bold cursor-pointer">
        {props.children}
      </button>
    </Link>
  );
};

export default Buttons;
