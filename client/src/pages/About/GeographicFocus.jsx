import React, { useState, useEffect } from 'react';
import { getGeographicFocus } from '../../utils/api';
import Loader from '../../components/Loader';

// Simple SVG Map of India
const IndiaMap = () => (
  <svg viewBox="0 0 600 600" className="w-full h-auto max-w-2xl mx-auto">
    <defs>
      <linearGradient id="indiaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#FF9933", stopOpacity:1}} />
        <stop offset="50%" style={{stopColor:"#FFFFFF", stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:"#128807", stopOpacity:1}} />
      </linearGradient>
    </defs>
    <path
      d="M150 100 L200 80 L250 90 L300 70 L350 80 L400 60 L450 70 L500 50 L520 100 L510 150 L520 200 L510 250 L520 300 L500 350 L480 400 L460 450 L440 500 L400 520 L350 510 L300 520 L250 510 L200 520 L150 500 L120 450 L100 400 L110 350 L100 300 L110 250 L100 200 L110 150 L120 100 Z"
      fill="url(#indiaGradient)"
      stroke="#000080"
      strokeWidth="3"
    />
    <circle cx="300" cy="250" r="8" fill="#FF0000" />
    <circle cx="350" cy="200" r="6" fill="#FF0000" />
    <circle cx="250" cy="300" r="7" fill="#FF0000" />
    <text x="300" y="350" textAnchor="middle" fill="#000080" fontSize="24" fontWeight="bold">INDIA</text>
    <text x="300" y="380" textAnchor="middle" fill="#666" fontSize="14">Geographic Focus</text>
  </svg>
);

const GeographicFocus = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getGeographicFocus();
        setData(response.data);
      } catch {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">{data.title}</h1>
      <div className="max-w-4xl mx-auto">
        {data.image && (
          <div className="mb-8">
            <img src={data.image} alt={data.title} className="w-full h-64 object-cover rounded-lg shadow-md" />
          </div>
        )}
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 whitespace-pre-line">{data.content}</p>
        </div>
        {data.showMap && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-center mb-4">Geographic Focus Map</h2>
            {data.mapImage ? (
              <img src={data.mapImage} alt="Geographic Focus Map" className="w-full h-auto rounded-lg shadow-md" />
            ) : (
              <IndiaMap />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeographicFocus;
