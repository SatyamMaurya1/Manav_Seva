import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600">
            To provide comprehensive healthcare and education services to underserved communities,
            empowering individuals and families to lead healthier, more productive lives.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-600">
            A world where every individual has access to quality healthcare and education,
            regardless of their socioeconomic status.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Our Values</h2>
          <p className="text-gray-600">
            Compassion, integrity, excellence, and community engagement guide everything we do.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
