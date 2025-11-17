import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import { getGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem } from '../utils/api';

const ManageGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [formData, setFormData] = useState({ title: '', image: '', description: '' });
  const [editing, setEditing] = useState(null);

  const fetchGallery = async () => {
    try {
      const res = await getGallery();
      setGallery(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadGallery = async () => {
      await fetchGallery();
    };
    loadGallery();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateGalleryItem(editing._id, formData);
      } else {
        await createGalleryItem(formData);
      }
      setFormData({ title: '', image: '', description: '' });
      setEditing(null);
      fetchGallery();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setFormData({ title: item.title, image: item.image, description: item.description });
    setEditing(item);
  };

  const handleDelete = async (id) => {
    try {
      await deleteGalleryItem(id);
      fetchGallery();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { header: 'Title', key: 'title' },
    { header: 'Description', key: 'description' },
    { header: 'Date', key: 'date' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Gallery</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editing ? 'Update' : 'Add'} Gallery Item
        </button>
      </form>
      <DataTable data={gallery} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ManageGallery;
