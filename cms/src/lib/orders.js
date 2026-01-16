import api from './api';

export const getAllOrders = async () => {
  const response = await api.get('/admin/orders');
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/admin/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.patch(`/admin/orders/${id}/status`, { status });
  return response.data;
};

export const updateAdminNotes = async (id, notes) => {
  const response = await api.patch(`/admin/orders/${id}/notes`, { notes });
  return response.data;
};
