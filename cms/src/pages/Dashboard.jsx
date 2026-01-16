import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  ShoppingCart,
  Package,
  LogOut,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Medal,
  Bell,
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import Sidebar from '../components/Sidebar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  getDashboardStats,
  getTopSpenders,
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from '../lib/dashboard';
import SalesSummary from '../components/SalesSummary';
import ActivityTable from '../components/ActivityTable';
import NotificationPopup from '../components/NotificationPopup';

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [stats, setStats] = useState(null);
  const [topSpenders, setTopSpenders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Notification state
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  // Ref for activity table
  const activityTableRef = useRef(null);

  useEffect(() => {
    fetchDashboardData();
    fetchNotifications();

    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, spendersData] = await Promise.all([
        getDashboardStats(),
        getTopSpenders(),
      ]);
      console.log('Dashboard stats:', statsData);
      setStats(statsData || {});
      setTopSpenders(spendersData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setStats({});
      setTopSpenders([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleNotificationClick = async (notification) => {
    // Mark as read
    await markNotificationRead(notification.id);

    // Close popup
    setShowNotifications(false);

    // Refresh notifications
    fetchNotifications();

    // Scroll to activity table
    if (activityTableRef.current) {
      activityTableRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleMarkAllRead = async () => {
    await markAllNotificationsRead();
    fetchNotifications();
    setShowNotifications(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };


  const formatCurrency = (amount) => {
    if (!amount) return '$0';
    const num = parseFloat(amount);
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}m`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}k`;
    return `$${num.toFixed(2)}`;
  };

  const getMedalColor = (rank) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-orange-400 to-orange-700';
      default: return 'from-gray-200 to-gray-400';
    }
  };

  const getMedalEmoji = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-2 rounded-full transition-colors ${
                    showNotifications ? 'bg-gray-100' : 'hover:bg-gray-100'
                  }`}
                >
                  <Bell className={`w-5 h-5 ${unreadCount > 0 ? 'text-gray-700' : 'text-gray-500'}`} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Popup */}
                {showNotifications && (
                  <NotificationPopup
                    notifications={notifications}
                    onClose={() => setShowNotifications(false)}
                    onNotificationClick={handleNotificationClick}
                    onMarkAllRead={handleMarkAllRead}
                  />
                )}
              </div>

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

        {/* Dashboard Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-500 mt-1">Welcome back! Here&apos;s your store overview.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <TrendingUp className="w-7 h-7 text-blue-600" />
                </div>
                <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                <p className="text-xs text-green-500 mt-1">+15% Increase</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {loading ? '---' : formatCurrency(stats?.totalRevenue)}
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <DollarSign className="w-7 h-7 text-green-600" />
                </div>
                <p className="text-gray-500 text-sm font-medium">Daily Sales</p>
                <p className="text-xs text-gray-400 mt-1">Today&apos;s Sales</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {loading ? '---' : formatCurrency(stats?.dailySales)}
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-purple-600" />
                </div>
                <p className="text-gray-500 text-sm font-medium">Total Customers</p>
                <p className="text-xs text-green-500 mt-1">+8% New Users</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {loading ? '---' : (stats?.totalCustomers ?? 0).toLocaleString()}
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <Package className="w-7 h-7 text-orange-600" />
                </div>
                <p className="text-gray-500 text-sm font-medium">Products</p>
                <p className="text-xs text-gray-400 mt-1">Active Items</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {loading ? '---' : (stats?.totalProducts ?? 0).toLocaleString()}
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-7 h-7 text-pink-600" />
                </div>
                <p className="text-gray-500 text-sm font-medium">Total Orders</p>
                <p className="text-xs text-gray-400 mt-1">All Time</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {loading ? '---' : (stats?.totalOrders ?? 0).toLocaleString()}
                </p>
              </div>
            </Card>
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Top Daily Spenders */}
            <Card className="p-6 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <Medal className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-semibold text-gray-900">Top Daily Spenders</h3>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                      <div className="w-10 h-10 bg-gray-200 rounded-full" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-24" />
                        <div className="h-3 bg-gray-200 rounded w-16 mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : topSpenders.length > 0 ? (
                <div className="space-y-3">
                  {topSpenders.map((spender) => (
                    <div
                      key={spender.customerId}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                        spender.rank === 1 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' :
                        spender.rank === 2 ? 'bg-gray-50 border border-gray-200' :
                        'bg-orange-50 border border-orange-200'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getMedalColor(spender.rank)} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                        {spender.rank}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 flex items-center gap-2">
                          {spender.customerName}
                          <span className="text-xl">{getMedalEmoji(spender.rank)}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Spent: <span className="font-semibold text-green-600">{formatCurrency(spender.totalSpent)}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Medal className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No spenders today</p>
                </div>
              )}
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => navigate('/admin/products')}
                  className="p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all group"
                >
                  <Package className="w-10 h-10 mx-auto mb-3 text-gray-400 group-hover:text-blue-500" />
                  <p className="text-gray-600 font-medium group-hover:text-blue-600">Add New Product</p>
                </button>
                <button
                  onClick={() => navigate('/admin/orders')}
                  className="p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all group"
                >
                  <ShoppingCart className="w-10 h-10 mx-auto mb-3 text-gray-400 group-hover:text-green-500" />
                  <p className="text-gray-600 font-medium group-hover:text-green-600">View Orders</p>
                </button>
                <button
                  onClick={() => navigate('/admin/customers')}
                  className="p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all group"
                >
                  <Users className="w-10 h-10 mx-auto mb-3 text-gray-400 group-hover:text-purple-500" />
                  <p className="text-gray-600 font-medium group-hover:text-purple-600">Manage Customers</p>
                </button>
              </div>
            </Card>
          </div>

          {/* Sales Summary Chart */}
          <div className="mb-6">
            <SalesSummary />
          </div>

          {/* Activity Table */}
          <div className="mt-6">
            <ActivityTable ref={activityTableRef} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
