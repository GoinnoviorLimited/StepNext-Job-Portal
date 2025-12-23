import React from "react";
import Header from "./Header";
import ShowJobs from "../ShowJobSection/ShowJobs";
import Banner from "../BannerSection/Banner";
import Browse from "../BrowseSection/Browse";

const Home = () => {
  return (
    <div>
      <Header />
      <ShowJobs />
      <Banner />
      <Browse />
    </div>
  );
};

export default Home;
