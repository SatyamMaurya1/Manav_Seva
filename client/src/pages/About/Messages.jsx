import React, { useEffect, useState } from 'react';
import { getMessages } from '../../utils/api.js';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await getMessages();
        setMessages(res.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Messages</h1>
      <p className="text-gray-600 text-center mb-8">
        Messages from our leadership and key figures.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.map((message) => (
          <div key={message._id} className="bg-white shadow-md rounded-lg p-6">
            {message.image && (
              <img
                src={message.image}
                alt={message.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
            )}
            <h3 className="text-xl font-semibold text-center mb-2">{message.name}</h3>
            <p className="text-gray-600 text-center mb-4">{message.position}</p>
            <p className="text-gray-800">{message.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
