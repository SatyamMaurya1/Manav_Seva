import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// News
export const getNews = () => api.get('/news');
export const getNewsById = (id) => api.get(`/news/${id}`);

// Tenders
export const getTenders = () => api.get('/tenders');
export const getTenderById = (id) => api.get(`/tenders/${id}`);

// Gallery
export const getGallery = () => api.get('/gallery');
export const getGalleryItemById = (id) => api.get(`/gallery/${id}`);

// Reports
export const getReports = () => api.get('/reports');
export const getReportById = (id) => api.get(`/reports/${id}`);

// Contact
export const sendContactMessage = (data) => api.post('/contact', data);

// About
export const getAboutUs = () => api.get('/about/about-us');
export const getMessages = () => api.get('/about/messages');
export const getGeographicFocus = () => api.get('/about/geographic-focus');
