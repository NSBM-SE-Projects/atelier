import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  Tag,
  Boxes,
  Star,
  LogOut,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  X,
  Search,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  getAllProducts,
  getCategories,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductFeatured,
} from '../lib/products';
import useAuthStore from '../store/authStore';

const Products = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Popup states
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  // Search and form states
  const [searchId, setSearchId] = useState('');
  const [searchedProduct, setSearchedProduct] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Form data for add/update
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sku: '',
    categoryId: '',
    price: '',
    costPrice: '',
    stockQuantity: '',
    size: '',
    color: '',
    gender: '',
    imageUrl: '',
    isActive: true,
    isFeatured: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        getAllProducts(),
        getCategories(),
      ]);
      setProducts(productsData || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const formatCurrency = (amount) => {
    if (!amount) return '$0.00';
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      sku: '',
      categoryId: '',
      price: '',
      costPrice: '',
      stockQuantity: '',
      size: '',
      color: '',
      gender: '',
      imageUrl: '',
      isActive: true,
      isFeatured: false,
    });
    setSearchId('');
    setSearchedProduct(null);
    setSearchError('');
    setSuccessMessage('');
  };

  // Add Product
  const openAddPopup = () => {
    resetForm();
    setShowAddPopup(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setSearchError('');

    // Validate required fields
    if (!formData.name.trim()) {
      setSearchError('Product name is required');
      return;
    }
    if (!formData.sku.trim()) {
      setSearchError('SKU is required');
      return;
    }
    if (!formData.description.trim()) {
      setSearchError('Description is required');
      return;
    }
    if (!formData.categoryId) {
      setSearchError('Category is required');
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setSearchError('Valid price is required');
      return;
    }

    try {
      setActionLoading(true);

      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        sku: formData.sku.trim(),
        categoryId: parseInt(formData.categoryId),
        price: parseFloat(formData.price),
        costPrice: formData.costPrice ? parseFloat(formData.costPrice) : null,
        stockQuantity: formData.stockQuantity ? parseInt(formData.stockQuantity) : 0,
        size: formData.size.trim() || null,
        color: formData.color.trim() || null,
        gender: formData.gender || null,
        imageUrl: formData.imageUrl.trim() || null,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
      };

      console.log('Sending product data:', productData);
      await createProduct(productData);
      setSuccessMessage('Product added successfully!');
      fetchData();
      setTimeout(() => {
        setShowAddPopup(false);
        resetForm();
      }, 1500);
    } catch (error) {
      console.error('Error adding product:', error);
      const errorMsg = error.response?.data?.message || error.response?.data || error.message || 'Failed to add product';
      setSearchError(typeof errorMsg === 'string' ? errorMsg : 'Failed to add product. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  // Update Product
  const openUpdatePopup = () => {
    resetForm();
    setShowUpdatePopup(true);
  };

  const handleSearchForUpdate = async () => {
    if (!searchId.trim()) {
      setSearchError('Please enter a product ID');
      return;
    }

    const id = parseInt(searchId.trim());
    if (isNaN(id) || id <= 0) {
      setSearchError('Please enter a valid product ID');
      return;
    }

    try {
      setActionLoading(true);
      setSearchError('');
      setSuccessMessage('');
      const product = await getProductById(id);
      setSearchedProduct(product);
      setFormData({
        name: product.name || '',
        description: product.description || '',
        sku: product.sku || '',
        categoryId: product.categoryId?.toString() || '',
        price: product.price?.toString() || '',
        costPrice: product.costPrice?.toString() || '',
        stockQuantity: product.stockQuantity?.toString() || '',
        size: product.size || '',
        color: product.color || '',
        gender: product.gender || '',
        imageUrl: product.imageUrl || '',
        isActive: product.isActive ?? true,
        isFeatured: product.isFeatured ?? false,
      });
    } catch (error) {
      setSearchError(`Product with ID ${id} not found`);
      setSearchedProduct(null);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!searchedProduct) return;
    setSearchError('');

    // Validate required fields
    if (!formData.name.trim()) {
      setSearchError('Product name is required');
      return;
    }
    if (!formData.sku.trim()) {
      setSearchError('SKU is required');
      return;
    }
    if (!formData.description.trim()) {
      setSearchError('Description is required');
      return;
    }
    if (!formData.categoryId) {
      setSearchError('Category is required');
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setSearchError('Valid price is required');
      return;
    }

    try {
      setActionLoading(true);

      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        sku: formData.sku.trim(),
        categoryId: parseInt(formData.categoryId),
        price: parseFloat(formData.price),
        costPrice: formData.costPrice ? parseFloat(formData.costPrice) : null,
        stockQuantity: formData.stockQuantity ? parseInt(formData.stockQuantity) : 0,
        size: formData.size.trim() || null,
        color: formData.color.trim() || null,
        gender: formData.gender || null,
        imageUrl: formData.imageUrl.trim() || null,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
      };

      console.log('Updating product data:', productData);
      await updateProduct(searchedProduct.id, productData);
      setSuccessMessage('Product updated successfully!');
      fetchData();
      setTimeout(() => {
        setShowUpdatePopup(false);
        resetForm();
      }, 1500);
    } catch (error) {
      console.error('Error updating product:', error);
      const errorMsg = error.response?.data?.message || error.response?.data || error.message || 'Failed to update product';
      setSearchError(typeof errorMsg === 'string' ? errorMsg : 'Failed to update product. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Product
  const openDeletePopup = () => {
    resetForm();
    setShowDeletePopup(true);
  };

  const handleSearchForDelete = async () => {
    if (!searchId.trim()) {
      setSearchError('Please enter a product ID');
      return;
    }

    const id = parseInt(searchId.trim());
    if (isNaN(id) || id <= 0) {
      setSearchError('Please enter a valid product ID');
      return;
    }

    try {
      setActionLoading(true);
      setSearchError('');
      setSuccessMessage('');
      const product = await getProductById(id);
      setSearchedProduct(product);
    } catch (error) {
      setSearchError(`Product with ID ${id} not found`);
      setSearchedProduct(null);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!searchedProduct) return;

    try {
      setActionLoading(true);
      await deleteProduct(searchedProduct.id);
      setSuccessMessage('Product deleted successfully!');
      fetchData();
      setTimeout(() => {
        setShowDeletePopup(false);
        resetForm();
      }, 1500);
    } catch (error) {
      setSearchError('Failed to delete product');
    } finally {
      setActionLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleToggleFeatured = async (id, currentFeatured) => {
    try {
      await updateProductFeatured(id, !currentFeatured);
      fetchData();
    } catch (error) {
      console.error('Error updating featured status:', error);
    }
  };

  const activeProducts = products.filter((p) => p.isActive).length;
  const lowStockProducts = products.filter((p) => p.stockQuantity < 10).length;
  const featuredProducts = products.filter((p) => p.isFeatured).length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Products</h2>
              <p className="text-gray-500 text-sm mt-1">Manage your product catalog</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={openAddPopup}
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-5"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
              <Button
                onClick={openUpdatePopup}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5"
              >
                <Edit className="w-4 h-4 mr-2" />
                Update
              </Button>
              <Button
                onClick={openDeletePopup}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-5"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
              <Button
                onClick={handleLogout}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-5"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Active</p>
                  <p className="text-2xl font-bold text-gray-900">{activeProducts}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Featured</p>
                  <p className="text-2xl font-bold text-gray-900">{featuredProducts}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Low Stock</p>
                  <p className="text-2xl font-bold text-gray-900">{lowStockProducts}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Products Table */}
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Product</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Category</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">SKU</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Price</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Stock</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Featured</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-12" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-40" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-24" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-20" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-16" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-12" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-6 bg-gray-200 rounded w-16" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-6 bg-gray-200 rounded w-8" /></td>
                      </tr>
                    ))
                  ) : products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <span className="font-mono text-sm font-medium text-gray-900">#{product.id}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                                <Package className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-500">
                                {product.color && `${product.color}`}
                                {product.size && ` / ${product.size}`}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            <Tag className="w-3 h-3" />
                            {product.categoryName}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-mono text-sm text-gray-600">{product.sku}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-gray-900">{formatCurrency(product.price)}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${
                            product.stockQuantity < 10
                              ? 'bg-red-100 text-red-700'
                              : product.stockQuantity < 50
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            <Boxes className="w-3 h-3" />
                            {product.stockQuantity}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                            product.isActive
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              product.isActive ? 'bg-green-500' : 'bg-red-500'
                            }`} />
                            {product.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleToggleFeatured(product.id, product.isFeatured)}
                            className={`p-2 rounded-lg transition-colors ${
                              product.isFeatured
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                            }`}
                          >
                            <Star className={`w-4 h-4 ${product.isFeatured ? 'fill-yellow-500' : ''}`} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-gray-500">
                        <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No products found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>

      {/* Add Product Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Add New Product</h3>
                <p className="text-sm text-gray-500 mt-1">Fill in the details to add a new product</p>
              </div>
              <button onClick={() => { setShowAddPopup(false); resetForm(); }} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {searchError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{searchError}</span>
                </div>
              )}
              {successMessage && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">{successMessage}</span>
                </div>
              )}
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                    <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter product name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                    <Input name="sku" value={formData.sku} onChange={handleInputChange} placeholder="Enter SKU" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter product description" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select name="categoryId" value={formData.categoryId} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select Gender</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                    <Input name="price" type="number" step="0.01" value={formData.price} onChange={handleInputChange} placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price</label>
                    <Input name="costPrice" type="number" step="0.01" value={formData.costPrice} onChange={handleInputChange} placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                    <Input name="stockQuantity" type="number" value={formData.stockQuantity} onChange={handleInputChange} placeholder="0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                    <Input name="size" value={formData.size} onChange={handleInputChange} placeholder="e.g., S, M, L, XL" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                    <Input name="color" value={formData.color} onChange={handleInputChange} placeholder="e.g., Black, White" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <Input name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="https://example.com/image.jpg" />
                </div>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-sm text-gray-700">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} className="w-4 h-4 text-yellow-600 rounded" />
                    <span className="text-sm text-gray-700">Featured</span>
                  </label>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" onClick={() => { setShowAddPopup(false); resetForm(); }} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700">Cancel</Button>
                  <Button type="submit" disabled={actionLoading} className="flex-1 bg-green-600 hover:bg-green-700 text-white">{actionLoading ? 'Saving...' : 'Add Product'}</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Update Product Popup */}
      {showUpdatePopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Update Product</h3>
                <p className="text-sm text-gray-500 mt-1">Search by ID and update product details</p>
              </div>
              <button onClick={() => { setShowUpdatePopup(false); resetForm(); }} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {!searchedProduct ? (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search by Product ID</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input type="text" placeholder="Enter product ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearchForUpdate()} className="pl-10" />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      <Button onClick={handleSearchForUpdate} disabled={actionLoading} className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                        {actionLoading ? 'Searching...' : 'Search'}
                      </Button>
                    </div>
                  </div>
                  {searchError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{searchError}</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {searchError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{searchError}</span>
                    </div>
                  )}
                  {successMessage && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">{successMessage}</span>
                    </div>
                  )}
                  <form onSubmit={handleUpdateSubmit} className="space-y-4">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700">Editing Product #{searchedProduct.id} - ID cannot be changed</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                        <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter product name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                        <Input name="sku" value={formData.sku} onChange={handleInputChange} placeholder="Enter SKU" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                      <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter product description" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                        <select name="categoryId" value={formData.categoryId} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Select Gender</option>
                          <option value="Men">Men</option>
                          <option value="Women">Women</option>
                          <option value="Unisex">Unisex</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                        <Input name="price" type="number" step="0.01" value={formData.price} onChange={handleInputChange} placeholder="0.00" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price</label>
                        <Input name="costPrice" type="number" step="0.01" value={formData.costPrice} onChange={handleInputChange} placeholder="0.00" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                        <Input name="stockQuantity" type="number" value={formData.stockQuantity} onChange={handleInputChange} placeholder="0" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                        <Input name="size" value={formData.size} onChange={handleInputChange} placeholder="e.g., S, M, L, XL" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                        <Input name="color" value={formData.color} onChange={handleInputChange} placeholder="e.g., Black, White" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                      <Input name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="https://example.com/image.jpg" />
                    </div>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="w-4 h-4 text-blue-600 rounded" />
                        <span className="text-sm text-gray-700">Active</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} className="w-4 h-4 text-yellow-600 rounded" />
                        <span className="text-sm text-gray-700">Featured</span>
                      </label>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button type="button" onClick={() => { setShowUpdatePopup(false); resetForm(); }} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700">Cancel</Button>
                      <Button type="submit" disabled={actionLoading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">{actionLoading ? 'Saving...' : 'Update Product'}</Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Product Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Delete Product</h3>
                <p className="text-sm text-gray-500 mt-1">Search by ID to delete a product</p>
              </div>
              <button onClick={() => { setShowDeletePopup(false); resetForm(); }} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              {!searchedProduct ? (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search by Product ID</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          type="text"
                          placeholder="Enter product ID"
                          value={searchId}
                          onChange={(e) => setSearchId(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSearchForDelete()}
                          className="pl-10"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      <Button onClick={handleSearchForDelete} disabled={actionLoading} className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                        {actionLoading ? 'Searching...' : 'Search'}
                      </Button>
                    </div>
                  </div>
                  {searchError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{searchError}</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {searchError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{searchError}</span>
                    </div>
                  )}
                  {successMessage && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">{successMessage}</span>
                    </div>
                  )}
                  {!successMessage && (
                    <>
                      <div className="p-4 bg-gray-50 rounded-xl mb-4">
                        <div className="flex items-center gap-3 mb-3">
                          {searchedProduct.imageUrl ? (
                            <img src={searchedProduct.imageUrl} alt={searchedProduct.name} className="w-16 h-16 rounded-lg object-cover" />
                          ) : (
                            <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                              <Package className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-900">{searchedProduct.name}</p>
                            <p className="text-sm text-gray-500">ID: #{searchedProduct.id} | SKU: {searchedProduct.sku}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><span className="font-medium">Category:</span> {searchedProduct.categoryName}</p>
                          <p><span className="font-medium">Price:</span> {formatCurrency(searchedProduct.price)}</p>
                          <p><span className="font-medium">Stock:</span> {searchedProduct.stockQuantity}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                        <p className="text-sm text-red-700">
                          <strong>Warning:</strong> This action will permanently delete this product. This cannot be undone.
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          onClick={() => { setShowDeletePopup(false); resetForm(); }}
                          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleDeleteConfirm}
                          disabled={actionLoading}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                        >
                          {actionLoading ? 'Deleting...' : 'Delete Product'}
                        </Button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
