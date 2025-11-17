import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import { getReports, createReport, updateReport, deleteReport } from '../utils/api';

const ManageReports = () => {
  const [reports, setReports] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', year: '', file: '' });
  const [editing, setEditing] = useState(null);

  const fetchReports = async () => {
    try {
      const res = await getReports();
      setReports(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadReports = async () => {
      await fetchReports();
    };
    loadReports();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateReport(editing._id, formData);
      } else {
        await createReport(formData);
      }
      setFormData({ title: '', content: '', year: '', file: '' });
      setEditing(null);
      fetchReports();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setFormData({ title: item.title, content: item.content, year: item.year, file: item.file });
    setEditing(item);
  };

  const handleDelete = async (id) => {
    try {
      await deleteReport(id);
      fetchReports();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { header: 'Title', key: 'title' },
    { header: 'Year', key: 'year' },
    { header: 'Content', key: 'content' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Reports</h1>
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
          type="number"
          placeholder="Year"
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="File URL"
          value={formData.file}
          onChange={(e) => setFormData({ ...formData, file: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editing ? 'Update' : 'Add'} Report
        </button>
      </form>
      <DataTable data={reports} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ManageReports;
