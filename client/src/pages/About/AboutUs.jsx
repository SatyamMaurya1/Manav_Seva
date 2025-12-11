import React, { useState, useEffect } from 'react';
import { getAboutUs } from '../../utils/api';
import Loader from '../../components/Loader';

const AboutUs = () => {
  const [aboutUs, setAboutUs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await getAboutUs();
        setAboutUs(response.data);
      } catch {
        setError('Failed to load About Us content.');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUs();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">{aboutUs?.title || 'About Us'}</h1>
      <div className="max-w-4xl mx-auto">
        {aboutUs?.image && (
          <img src={aboutUs.image} alt="About Us" className="w-full h-64 object-cover mb-6 rounded-lg" />
        )}
        <div className="text-lg text-gray-700" dangerouslySetInnerHTML={{ __html: aboutUs?.content || 'Content not available.' }} />
      </div>
    </div>
  );
};

export default AboutUs;
