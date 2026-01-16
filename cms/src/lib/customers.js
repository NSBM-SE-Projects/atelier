import api from './api';

export const getAllCustomers = async () => {
  const response = await api.get('/admin/customers');
  return response.data;
};

export const getCustomerCounts = async () => {
  const response = await api.get('/admin/customers/counts');
  return response.data;
};

export const getCustomerById = async (id) => {
  const response = await api.get(`/admin/customers/${id}`);
  return response.data;
};

export const updateCustomer = async (id, customerData) => {
  const response = await api.put(`/admin/customers/${id}`, customerData);
  return response.data;
};

export const updateCustomerStatus = async (id, isActive) => {
  const response = await api.patch(`/admin/customers/${id}/status`, { isActive });
  return response.data;
};
