import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ManageNews from '../pages/ManageNews';
import ManageGallery from '../pages/ManageGallery';
import ManageReports from '../pages/ManageReports';
import ManageTenders from '../pages/ManageTenders';
import Users from '../pages/Users';
import Settings from '../pages/Settings';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const AppRoutes = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage-news" element={<ManageNews />} />
          <Route path="/manage-gallery" element={<ManageGallery />} />
          <Route path="/manage-reports" element={<ManageReports />} />
          <Route path="/manage-tenders" element={<ManageTenders />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppRoutes;
