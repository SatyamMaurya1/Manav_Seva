import React, { useEffect, useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import { getNews, getTenders, getGallery, getReports } from '../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    news: 0,
    tenders: 0,
    gallery: 0,
    reports: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [newsRes, tendersRes, galleryRes, reportsRes] = await Promise.all([
          getNews(),
          getTenders(),
          getGallery(),
          getReports(),
        ]);
        setStats({
          news: newsRes.data.length,
          tenders: tendersRes.data.length,
          gallery: galleryRes.data.length,
          reports: reportsRes.data.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="News" value={stats.news} icon="📰" />
        <DashboardCard title="Tenders" value={stats.tenders} icon="📄" />
        <DashboardCard title="Gallery" value={stats.gallery} icon="🖼️" />
        <DashboardCard title="Reports" value={stats.reports} icon="📊" />
      </div>
    </div>
  );
};

export default Dashboard;
