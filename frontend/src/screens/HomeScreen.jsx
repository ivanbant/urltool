import React from "react";
import Hero from "../components/Hero";
import UrlBuilder from "../components/UrlBuilder";
import InfoSection from "../components/InfoSection";
import CTASection from "../components/CtaSection";

const HomeScreen = () => {
  return (
    <>
      <Hero />
      <UrlBuilder />
      <InfoSection />
      <CTASection />
    </>
  );
};

export default HomeScreen;
