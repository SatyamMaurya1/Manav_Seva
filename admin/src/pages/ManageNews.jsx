import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import { getNews, createNews, updateNews, deleteNews } from '../utils/api';

const ManageNews = () => {
  const [news, setNews] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', image: '' });
  const [editing, setEditing] = useState(null);

  const fetchNews = async () => {
    try {
      const res = await getNews();
      setNews(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadNews = async () => {
      await fetchNews();
    };
    loadNews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateNews(editing._id, formData);
      } else {
        await createNews(formData);
      }
      setFormData({ title: '', content: '', image: '' });
      setEditing(null);
      fetchNews();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setFormData({ title: item.title, content: item.content, image: item.image });
    setEditing(item);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNews(id);
      fetchNews();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { header: 'Title', key: 'title' },
    { header: 'Content', key: 'content' },
    { header: 'Date', key: 'date' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage News</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editing ? 'Update' : 'Add'} News
        </button>
      </form>
      <DataTable data={news} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ManageNews;
