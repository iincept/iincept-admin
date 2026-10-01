import axiosClient from './axiosClient';

export const getProducts = async (params = {}) => {
  const response = await axiosClient.get('/products', { params });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axiosClient.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axiosClient.post('/products', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axiosClient.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axiosClient.delete(`/products/${id}`);
  return response.data;
};

export const exportProductsExcel = async (category = 'all') => {
  const response = await axiosClient.get(`/products/export-excel?category=${encodeURIComponent(category)}`, {
    responseType: 'blob'
  });
  return response;
};

export const previewImportProductsExcel = async (file, category = 'all') => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axiosClient.post(`/products/import-preview?category=${encodeURIComponent(category)}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const importProductsExcel = async (file, category = 'all') => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axiosClient.post(`/products/import-excel?category=${encodeURIComponent(category)}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

