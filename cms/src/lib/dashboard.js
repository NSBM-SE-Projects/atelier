import api from './api';

export const getDashboardStats = async () => {
  const response = await api.get('/admin/dashboard/stats');
  return response.data;
};

export const getTopSpenders = async () => {
  const response = await api.get('/admin/dashboard/top-spenders');
  return response.data;
};

export const getSalesByCategory = async (period = 'monthly') => {
  const response = await api.get(`/admin/sales/by-category?period=${period}`);
  return response.data;
};

// Activity APIs
export const getAllActivities = async () => {
  const response = await api.get('/admin/activities');
  return response.data;
};

export const getNotifications = async () => {
  const response = await api.get('/admin/activities/notifications');
  return response.data;
};

export const getUnreadCount = async () => {
  const response = await api.get('/admin/activities/notifications/count');
  return response.data;
};

export const markAllNotificationsRead = async () => {
  const response = await api.post('/admin/activities/notifications/mark-all-read');
  return response.data;
};

export const markNotificationRead = async (id) => {
  const response = await api.post(`/admin/activities/notifications/${id}/mark-read`);
  return response.data;
};

export const generateTestActivities = async () => {
  const response = await api.post('/admin/test/generate-activities');
  return response.data;
};
