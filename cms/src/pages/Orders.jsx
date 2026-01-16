import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { getAllOrders, updateOrderStatus } from '../lib/orders';
import useAuthStore from '../store/authStore';

const Orders = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusDropdown, setStatusDropdown] = useState(null);

  const statusOptions = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'COMPLETED', 'CANCELLED'];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      setStatusDropdown(null);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return '$0.00';
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case 'PENDING':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500', icon: Clock };
      case 'PROCESSING':
        return { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500', icon: Package };
      case 'SHIPPED':
        return { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500', icon: Truck };
      case 'DELIVERED':
        return { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500', icon: CheckCircle };
      case 'COMPLETED':
        return { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500', icon: CheckCircle };
      case 'CANCELLED':
        return { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500', icon: XCircle };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500', icon: Clock };
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.totalAmount || 0), 0);
  const pendingOrders = orders.filter(o => o.status?.toUpperCase() === 'PENDING').length;
  const completedOrders = orders.filter(o => ['COMPLETED', 'DELIVERED'].includes(o.status?.toUpperCase())).length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
              <p className="text-gray-500 text-sm mt-1">Manage and track customer orders</p>
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
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedOrders}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Orders Table */}
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Total</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Payment</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-16" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-32" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-28" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-20" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-20" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-6 bg-gray-200 rounded w-24" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-8 bg-gray-200 rounded w-28" /></td>
                      </tr>
                    ))
                  ) : orders.length > 0 ? (
                    orders.map((order) => {
                      const badge = getStatusBadge(order.status);
                      const StatusIcon = badge.icon;
                      return (
                        <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4">
                            <span className="font-mono text-sm font-medium text-gray-900">
                              #{order.id.toString().padStart(4, '0')}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-gray-900">{order.customerName}</p>
                              <p className="text-sm text-gray-500">{order.customerEmail}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {formatDate(order.createdAt)}
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-semibold text-gray-900">
                              {formatCurrency(order.totalAmount)}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {order.paymentMethod}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                              <StatusIcon className="w-3 h-3" />
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="relative">
                              <button
                                onClick={() => setStatusDropdown(statusDropdown === order.id ? null : order.id)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                              >
                                Update Status
                                <ChevronDown className="w-3 h-3" />
                              </button>
                              {statusDropdown === order.id && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                  {statusOptions.map((status) => (
                                    <button
                                      key={status}
                                      onClick={() => handleStatusChange(order.id, status)}
                                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                                        order.status === status
                                          ? 'text-blue-600 font-medium bg-blue-50'
                                          : 'text-gray-600'
                                      }`}
                                    >
                                      {status}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-gray-500">
                        <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No orders found</p>
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

export default Orders;
