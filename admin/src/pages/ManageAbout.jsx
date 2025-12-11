import React, { useEffect, useState, useMemo } from 'react';
import HierarchyForm from '../components/HierarchyForm';
import {
  getAboutUs,
  createOrUpdateAboutUs,
  getGovernance,
  createOrUpdateGovernance,
  getGeographicFocus,
  createOrUpdateGeographicFocus,
  getMessages,
  createOrUpdateMessage,
  deleteMessage,
} from '../utils/api';

const ManageAbout = () => {
  const [activeTab, setActiveTab] = useState('about-us');
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageForm, setMessageForm] = useState({ name: '', position: '', displayOrder: '', message: '', image: '' });
  const [editingMessage, setEditingMessage] = useState(null);
  const [governanceFormData, setGovernanceFormData] = useState({
    title: '',
    hierarchy: [{ id: '1', name: '', position: '', experience: '', image: '', children: [] }],
    ethicsTitle: '',
    ethicsContent: '',
    ethicsPoints: [''],
  });
  const [geographicFocusFormData, setGeographicFocusFormData] = useState({
    title: '',
    content: '',
    image: '',
    showMap: false,
    mapImage: '',
  });

  const tabs = useMemo(() => [
    { key: 'about-us', label: 'About Us', fetch: getAboutUs, update: createOrUpdateAboutUs },
    { key: 'messages', label: 'Messages', fetch: null, update: null },
    { key: 'governance', label: 'Governance', fetch: getGovernance, update: createOrUpdateGovernance },
    { key: 'geographic-focus', label: 'Geographic Focus', fetch: getGeographicFocus, update: createOrUpdateGeographicFocus },
  ], []);

  const fetchData = async (tab) => {
    try {
      const res = await tab.fetch();
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    setLoading(true);
    if (activeTab === 'messages') {
      const fetchMessages = async () => {
        try {
          const res = await getMessages();
          setMessages(res.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchMessages();
    } else {
      const activeTabData = tabs.find((tab) => tab.key === activeTab);
      if (activeTabData && activeTabData.fetch) {
        if (!formData[activeTabData.key]) {
          fetchData(activeTabData).then((data) => {
            if (activeTabData.key === 'governance') {
              setGovernanceFormData({
                title: data?.title || '',
                hierarchy: data?.hierarchy || [{ id: '1', name: '', position: '', experience: '', image: '', children: [] }],
                ethicsTitle: data?.ethicsTitle || '',
                ethicsContent: data?.ethicsContent || '',
                ethicsPoints: data?.ethicsPoints || [''],
              });
            } else if (activeTabData.key === 'geographic-focus') {
              setGeographicFocusFormData({
                title: data?.title || '',
                content: data?.content || '',
                image: data?.image || '',
                showMap: data?.showMap || false,
                mapImage: data?.mapImage || '',
              });
            } else {
              setFormData((prev) => ({
                ...prev,
                [activeTabData.key]: { title: data?.title || '', content: data?.content || '', image: data?.image || '' }
              }));
            }
          }).finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
  }, [activeTab, tabs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const activeTabData = tabs.find((tab) => tab.key === activeTab);
      if (activeTabData) {
        let dataToSubmit;
        if (activeTab === 'governance') {
          dataToSubmit = governanceFormData;
        } else if (activeTab === 'geographic-focus') {
          dataToSubmit = geographicFocusFormData;
        } else {
          dataToSubmit = formData[activeTab];
        }
        console.log('Submitting for tab:', activeTab);
        console.log('Form data:', dataToSubmit);
        if (!dataToSubmit) {
          console.error('No form data available for submission');
          alert('No form data available for submission');
          return;
        }
        if (activeTab === 'governance') {
          await activeTabData.update(governanceFormData);
        } else if (activeTab === 'geographic-focus') {
          await activeTabData.update(geographicFocusFormData);
        } else {
          await activeTabData.update(formData[activeTab]);
        }
        const updatedData = await fetchData(activeTabData);
        if (activeTabData.key === 'governance') {
          setGovernanceFormData({
            title: updatedData?.title || '',
            hierarchy: updatedData?.hierarchy || [{ id: '1', name: '', position: '', experience: '', image: '', children: [] }],
            ethicsTitle: updatedData?.ethicsTitle || '',
            ethicsContent: updatedData?.ethicsContent || '',
            ethicsPoints: updatedData?.ethicsPoints || [''],
          });
        } else if (activeTabData.key === 'geographic-focus') {
          setGeographicFocusFormData({
            title: updatedData?.title || '',
            content: updatedData?.content || '',
            image: updatedData?.image || '',
            showMap: updatedData?.showMap || false,
            mapImage: updatedData?.mapImage || '',
          });
        } else {
          setFormData((prev) => ({
            ...prev,
            [activeTabData.key]: { title: updatedData?.title || '', content: updatedData?.content || '', image: updatedData?.image || '' }
          }));
        }
        alert('Data saved successfully');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to save data');
    } finally {
      setSubmitting(false);
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { ...messageForm, displayOrder: parseInt(messageForm.displayOrder, 10) };
      if (editingMessage) {
        await createOrUpdateMessage({ ...formData, _id: editingMessage._id });
      } else {
        await createOrUpdateMessage(formData);
      }
      const res = await getMessages();
      setMessages(res.data);
      setMessageForm({ name: '', position: '', displayOrder: '', message: '', image: '' });
      setEditingMessage(null);
      alert('Message saved successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to save message');
    }
  };

  const handleEditMessage = (message) => {
    setMessageForm({ name: message.name, position: message.position, displayOrder: message.displayOrder, message: message.message, image: message.image });
    setEditingMessage(message);
  };

  const handleDeleteMessage = async (id) => {
    try {
      await deleteMessage(id);
      const res = await getMessages();
      setMessages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage About</h1>
      <div className="mb-6">
        <div className="flex space-x-4 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-4 ${activeTab === tab.key ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {activeTab === 'messages' ? (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Manage Messages</h2>
          <form onSubmit={handleMessageSubmit} className="mb-6">
            <input
              type="text"
              placeholder="Name"
              value={messageForm.name}
              onChange={(e) => setMessageForm({ ...messageForm, name: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Position (e.g., Chairperson)"
              value={messageForm.position}
              onChange={(e) => setMessageForm({ ...messageForm, position: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Display Order"
              value={messageForm.displayOrder}
              onChange={(e) => setMessageForm({ ...messageForm, displayOrder: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <textarea
              placeholder="Message"
              value={messageForm.message}
              onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={messageForm.image}
              onChange={(e) => setMessageForm({ ...messageForm, image: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {editingMessage ? 'Update' : 'Add'} Message
            </button>
            {editingMessage && (
              <button
                type="button"
                onClick={() => {
                  setMessageForm({ name: '', position: '', displayOrder: '', message: '', image: '' });
                  setEditingMessage(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            )}
          </form>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message._id} className="bg-gray-100 p-4 rounded flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{message.name}</h3>
                  <p className="text-gray-600">{message.position}</p>
                  <p>{message.message}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleEditMessage(message)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMessage(message._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activeTab === 'governance' ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            placeholder="Title"
            value={governanceFormData.title || ''}
            onChange={(e) => setGovernanceFormData({ ...governanceFormData, title: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
            required
          />

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Organizational Hierarchy</h3>
            <HierarchyForm
              hierarchy={governanceFormData.hierarchy}
              onChange={(newHierarchy) => setGovernanceFormData({ ...governanceFormData, hierarchy: newHierarchy })}
            />
          </div>

          <input
            type="text"
            placeholder="Ethics Title"
            value={governanceFormData.ethicsTitle || ''}
            onChange={(e) => setGovernanceFormData({ ...governanceFormData, ethicsTitle: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <textarea
            placeholder="Ethics Content"
            value={governanceFormData.ethicsContent || ''}
            onChange={(e) => setGovernanceFormData({ ...governanceFormData, ethicsContent: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Ethics Points</h3>
            {governanceFormData.ethicsPoints.map((point, index) => (
              <input
                key={index}
                type="text"
                placeholder="Point"
                value={point || ''}
                onChange={(e) => {
                  const newPoints = [...governanceFormData.ethicsPoints];
                  newPoints[index] = e.target.value;
                  setGovernanceFormData({ ...governanceFormData, ethicsPoints: newPoints });
                }}
                className="w-full p-2 mb-2 border rounded"
              />
            ))}
            <button
              type="button"
              onClick={() => setGovernanceFormData({
                ...governanceFormData,
                ethicsPoints: [...governanceFormData.ethicsPoints, '']
              })}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Add Point
            </button>
          </div>
          <button type="submit" disabled={submitting} className="bg-blue-500 text-white px-4 py-2 rounded">
            {submitting ? 'Saving...' : 'Save'}
          </button>
        </form>
      ) : activeTab === 'geographic-focus' ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            placeholder="Title"
            value={geographicFocusFormData.title || ''}
            onChange={(e) => setGeographicFocusFormData({ ...geographicFocusFormData, title: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <textarea
            placeholder="Content"
            value={geographicFocusFormData.content || ''}
            onChange={(e) => setGeographicFocusFormData({ ...geographicFocusFormData, content: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={geographicFocusFormData.image || ''}
            onChange={(e) => setGeographicFocusFormData({ ...geographicFocusFormData, image: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
          />
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={geographicFocusFormData.showMap || false}
                onChange={(e) => setGeographicFocusFormData({ ...geographicFocusFormData, showMap: e.target.checked })}
                className="mr-2"
              />
              Show Map
            </label>
          </div>
          <input
            type="text"
            placeholder="Map Image URL"
            value={geographicFocusFormData.mapImage || ''}
            onChange={(e) => setGeographicFocusFormData({ ...geographicFocusFormData, mapImage: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
          />
          <button type="submit" disabled={submitting} className="bg-blue-500 text-white px-4 py-2 rounded">
            {submitting ? 'Saving...' : 'Save'}
          </button>
        </form>
      ) : loading ? (
        <div className="mb-6">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            placeholder="Title"
            value={formData[activeTab]?.title || ''}
            onChange={(e) => setFormData((prev) => ({ ...prev, [activeTab]: { ...prev[activeTab], title: e.target.value } }))}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <textarea
            placeholder="Content"
            value={formData[activeTab]?.content || ''}
            onChange={(e) => setFormData((prev) => ({ ...prev, [activeTab]: { ...prev[activeTab], content: e.target.value } }))}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formData[activeTab]?.image || ''}
            onChange={(e) => setFormData((prev) => ({ ...prev, [activeTab]: { ...prev[activeTab], image: e.target.value } }))}
            className="w-full p-2 mb-4 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default ManageAbout;
