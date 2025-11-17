import React from 'react';
import HeroSection from '../components/HeroSection';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-8">Welcome to Manav Seva</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Health Campaigns</h3>
            <p className="text-gray-700">Providing medical aid and health awareness programs to communities in need.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Education Initiatives</h3>
            <p className="text-gray-700">Supporting education through scholarships and learning programs.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Women Empowerment</h3>
            <p className="text-gray-700">Empowering women through skill development and support programs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
