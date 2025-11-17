import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import { getTenders, createTender, updateTender, deleteTender } from '../utils/api';

const ManageTenders = () => {
  const [tenders, setTenders] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', deadline: '', documents: '' });
  const [editing, setEditing] = useState(null);

  const fetchTenders = async () => {
    try {
      const res = await getTenders();
      setTenders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadTenders = async () => {
      await fetchTenders();
    };
    loadTenders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateTender(editing._id, formData);
      } else {
        await createTender(formData);
      }
      setFormData({ title: '', description: '', deadline: '', documents: '' });
      setEditing(null);
      fetchTenders();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setFormData({ title: item.title, description: item.description, deadline: item.deadline, documents: item.documents });
    setEditing(item);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTender(id);
      fetchTenders();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { header: 'Title', key: 'title' },
    { header: 'Description', key: 'description' },
    { header: 'Deadline', key: 'deadline' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Tenders</h1>
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
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="date"
          placeholder="Deadline"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Documents URL"
          value={formData.documents}
          onChange={(e) => setFormData({ ...formData, documents: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editing ? 'Update' : 'Add'} Tender
        </button>
      </form>
      <DataTable data={tenders} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ManageTenders;
