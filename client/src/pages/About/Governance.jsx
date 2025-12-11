import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader';

const Governance = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/about/governance');
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

  const renderHierarchy = (nodes, level = 0) => {
    if (!nodes || !Array.isArray(nodes)) return null;

    return nodes.map((node, index) => (
      <div key={node.id || index} className={`mb-4 ${level > 0 ? 'ml-8' : ''}`}>
        <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
          <div className="flex items-center gap-4">
            {node.image && <img src={node.image} alt={node.name} className="w-12 h-12 rounded-full object-cover" />}
            <div>
              <h3 className="text-lg font-medium text-gray-900">{node.name}</h3>
              <p className="text-blue-600 font-medium">{node.position}</p>
              {node.experience && <p className="text-gray-600 mt-1">{node.experience}</p>}
            </div>
          </div>
        </div>
        {node.children && node.children.length > 0 && (
          <div className="mt-4">
            {renderHierarchy(node.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">{data.title}</h1>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Organizational Hierarchy</h2>
          <div className="space-y-4">
            {renderHierarchy(data.hierarchy)}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">{data.ethicsTitle}</h2>
          <div className="prose max-w-none">
            <p className="mb-4">{data.ethicsContent}</p>
            <ul className="list-disc list-inside">
              {data.ethicsPoints && data.ethicsPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Governance;
