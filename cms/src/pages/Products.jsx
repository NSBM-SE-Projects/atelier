import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  Tag,
  DollarSign,
  Boxes,
  Star,
  ToggleLeft,
  ToggleRight,
  LogOut,
  AlertTriangle,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { getAllProducts, updateProductStatus, updateProductFeatured } from '../lib/products';
import useAuthStore from '../store/authStore';

const Products = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await updateProductStatus(id, !currentStatus);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };

  const handleToggleFeatured = async (id, currentFeatured) => {
    try {
      await updateProductFeatured(id, !currentFeatured);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product featured status:', error);
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

  const activeProducts = products.filter(p => p.isActive).length;
  const lowStockProducts = products.filter(p => p.stockQuantity < 10).length;
  const featuredProducts = products.filter(p => p.isFeatured).length;

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
            <div className="flex items-center gap-4">
              <Button
                onClick={handleLogout}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6"
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
                  <ToggleRight className="w-6 h-6 text-green-600" />
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
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Product</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Category</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">SKU</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Price</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Stock</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Featured</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-40" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-24" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-20" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-16" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-12" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-6 bg-gray-200 rounded w-16" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-6 bg-gray-200 rounded w-16" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-8 bg-gray-200 rounded w-24" /></td>
                      </tr>
                    ))
                  ) : products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
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
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(product.price)}
                          </span>
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
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleToggleStatus(product.id, product.isActive)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                              product.isActive
                                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                : 'bg-green-50 text-green-600 hover:bg-green-100'
                            }`}
                          >
                            {product.isActive ? 'Deactivate' : 'Activate'}
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
    </div>
  );
};

export default Products;
