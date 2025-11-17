import React, { useState, useEffect } from 'react';
import { getNews } from '../utils/api';
import Loader from '../components/Loader';

const NewsEvents = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews();
        setNewsItems(response.data);
      } catch (err) {
        setError('Failed to load news and events');
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">News & Events</h1>
      {newsItems.length === 0 ? (
        <div className="text-center text-gray-500">No news available</div>
      ) : (
        <div className="space-y-8">
          {newsItems.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    className="h-48 w-full md:w-48 object-cover"
                    src={item.imageUrl || 'https://via.placeholder.com/400x300?text=News+Image'}
                    alt={item.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=News+Image';
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Date not available'}
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                  <p className="text-gray-700">{item.content || item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsEvents;
