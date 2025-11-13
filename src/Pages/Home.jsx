import React from "react";
import Banner from "../Components/BAnner";
import WhyAdopt from "../Components/WhyAdopt";
import MeetHeros from "../Components/MeetHeros";
import RecentListings from "../Components/RecentListings";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <RecentListings></RecentListings>
      <WhyAdopt></WhyAdopt>
      <MeetHeros></MeetHeros>
    </div>
  );
};

export default Home;
