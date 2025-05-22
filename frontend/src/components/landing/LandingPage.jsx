import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import WhatWeOffer from './WhatWeOffer';
import HowItBenefitsYou from './HowItBenefitsYou';
import FeaturedAgents from './FeaturedAgents';
import Testimonials from './Testimonials';
import Footer from '../common/Footer';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-[#181C2A]">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <HeroSection />
          <WhatWeOffer />
          <HowItBenefitsYou />
          <FeaturedAgents />
          <Testimonials />
        </main>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

