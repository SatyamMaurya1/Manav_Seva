import React, { useState, useEffect } from 'react';
import { getReports } from '../utils/api';
import Loader from '../components/Loader';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getReports();
        setReports(response.data);
      } catch (err) {
        setError('Failed to load reports');
        console.error('Error fetching reports:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleDownload = (report) => {
    if (report.fileUrl) {
      window.open(report.fileUrl, '_blank');
    } else {
      alert('Download link not available');
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Reports</h1>
      {reports.length === 0 ? (
        <div className="text-center text-gray-500">No reports available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report) => (
            <div key={report._id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">{report.title}</h2>
              <p className="text-gray-700 mb-4">{report.description}</p>
              <button
                onClick={() => handleDownload(report)}
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Download Report
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;
