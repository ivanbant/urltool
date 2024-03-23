import React from "react";
import Hero from "@components/Hero.jsx";
import UrlBuilder from "@components/UrlBuilder.jsx";
import InfoSection from "@components/InfoSection.jsx";
import CTASection from "@components/CTASection.jsx";
import PlansSection from "@components/PlansSection.jsx";

const HomeScreen = () => {
  return (
    <>
      <Hero />
      <UrlBuilder />
      <InfoSection />
      <PlansSection />
      <CTASection />
    </>
  );
};

export default HomeScreen;
