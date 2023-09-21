import React from "react";
import Hero from "../components/Hero";
import UrlBuilder from "../components/UrlBuilder";
import InfoSection from "../components/InfoSection";
import CTASection from "../components/CtaSection";
import PlansSection from "../components/PlansSection";

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
