import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader';

const OrganizationStructure = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/organization-structure');
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
  if (!data) return <div className="text-red-500">No data available</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">{data.title || 'Organization Structure'}</h1>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">{data.leadershipTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.leadershipTeam.map((leader, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg flex items-center gap-4">
                {leader.image && <img src={leader.image} alt={leader.name} className="w-16 h-16 rounded-full object-cover" />}
                <div>
                  <h3 className="text-lg font-medium">{leader.position}</h3>
                  <p className="text-gray-600">{leader.name}</p>
                  <p className="text-sm text-gray-500 mt-2">{leader.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">{data.departmentsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.departments.map((dept, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{dept.name}</h3>
                <p className="text-blue-600 text-sm mb-2">Head: {dept.head}</p>
                <p className="text-gray-600 text-sm mb-3">Team Size: {dept.teamSize} members</p>
                <p className="text-gray-700">{dept.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">{data.supportTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.supportFunctions.map((func, index) => (
              <div key={index} className="text-center">
                <h3 className="text-lg font-medium mb-2">{func.name}</h3>
                <p className="text-gray-600 text-sm">{func.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationStructure;
