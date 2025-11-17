import React from 'react';
import { Link } from 'react-router-dom';

const Activities = () => {
  const activities = [
    { name: 'Health Campaigns', path: '/health-campaigns', description: 'Comprehensive healthcare initiatives for underserved communities.' },
    { name: 'Education Initiatives', path: '/education-initiatives', description: 'Empowering through quality education programs.' },
    { name: 'Women Empowerment', path: '/women-empowerment', description: 'Supporting women to achieve their full potential.' },
    { name: 'Career Development', path: '/career', description: 'Skill development and career guidance programs.' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Activities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map((activity) => (
          <Link
            key={activity.path}
            to={activity.path}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-4 text-blue-600">{activity.name}</h2>
            <p className="text-gray-600">{activity.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Activities;
