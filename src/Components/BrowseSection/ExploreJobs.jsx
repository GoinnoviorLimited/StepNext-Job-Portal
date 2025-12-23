import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";

const ExploreJobs = () => {
  const [menuData, setMenuData] = useState({});

  const linkClass =
    "block text-sm text-gray-600 hover:text-[#22A7F0] transition";

  useEffect(() => {
    fetch("/Data/exploreJobsData.json")
      .then((res) => res.json())
      .then((data) => setMenuData(data))
      .catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
      {Object.entries(menuData).map(([section, items]) => (
        <div key={section}>
          <h3 className="font-semibold mb-4">{section}</h3>

          <ul className="space-y-2">
            {items.map((item, index) => (
              <li
                key={index}
                className={
                  item.label.startsWith("Browse All") ? "font-medium" : ""
                }
              >
                <NavLink
                  to={item.to || "#"}
                  className={linkClass}
                  onClick={(e) => item.to === "" && e.preventDefault()}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExploreJobs;
