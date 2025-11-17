import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (data) => api.post('/auth/login', data);

// News
export const getNews = () => api.get('/news');
export const getNewsById = (id) => api.get(`/news/${id}`);
export const createNews = (data) => api.post('/news', data);
export const updateNews = (id, data) => api.put(`/news/${id}`, data);
export const deleteNews = (id) => api.delete(`/news/${id}`);

// Tenders
export const getTenders = () => api.get('/tenders');
export const getTenderById = (id) => api.get(`/tenders/${id}`);
export const createTender = (data) => api.post('/tenders', data);
export const updateTender = (id, data) => api.put(`/tenders/${id}`, data);
export const deleteTender = (id) => api.delete(`/tenders/${id}`);

// Gallery
export const getGallery = () => api.get('/gallery');
export const getGalleryItemById = (id) => api.get(`/gallery/${id}`);
export const createGalleryItem = (data) => api.post('/gallery', data);
export const updateGalleryItem = (id, data) => api.put(`/gallery/${id}`, data);
export const deleteGalleryItem = (id) => api.delete(`/gallery/${id}`);

// Reports
export const getReports = () => api.get('/reports');
export const getReportById = (id) => api.get(`/reports/${id}`);
export const createReport = (data) => api.post('/reports', data);
export const updateReport = (id, data) => api.put(`/reports/${id}`, data);
export const deleteReport = (id) => api.delete(`/reports/${id}`);

// Users
export const getUsers = () => api.get('/auth/users');
export const createUser = (data) => api.post('/auth/register', data);
export const updateUser = (id, data) => api.put(`/auth/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/auth/users/${id}`);

// Contact
export const sendContactMessage = (data) => api.post('/contact', data);
