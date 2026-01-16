import api from './api';

export const getAllProducts = async () => {
  const response = await api.get('/admin/products');
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/admin/products/categories');
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/admin/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post('/admin/products', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/admin/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/admin/products/${id}`);
  return response.data;
};

export const updateProductStatus = async (id, isActive) => {
  const response = await api.patch(`/admin/products/${id}/status`, { isActive });
  return response.data;
};

export const updateProductFeatured = async (id, isFeatured) => {
  const response = await api.patch(`/admin/products/${id}/featured`, { isFeatured });
  return response.data;
};

export const updateStock = async (id, stockQuantity) => {
  const response = await api.patch(`/admin/products/${id}/stock`, { stockQuantity });
  return response.data;
};
