import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ToggleLeft,
  ToggleRight,
  LogOut,
  Settings,
  Search,
  X,
  Trash2,
  Edit,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  getAllCustomers,
  getCustomerCounts,
  getCustomerById,
  updateCustomer,
  updateCustomerStatus,
} from '../lib/customers';
import useAuthStore from '../store/authStore';

const Customers = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [customers, setCustomers] = useState([]);
  const [counts, setCounts] = useState({ total: 0, active: 0, inactive: 0 });
  const [loading, setLoading] = useState(true);

  // Popup state
  const [showManagePopup, setShowManagePopup] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [searchedCustomer, setSearchedCustomer] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({});
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [customersData, countsData] = await Promise.all([
        getAllCustomers(),
        getCustomerCounts(),
      ]);
      console.log('Customers API Response:', customersData);
      console.log('Counts API Response:', countsData);
      setCustomers(Array.isArray(customersData) ? customersData : []);
      setCounts(countsData || { total: 0, active: 0, inactive: 0 });
    } catch (error) {
      console.error('Error fetching data:', error);
      setCustomers([]);
      setCounts({ total: 0, active: 0, inactive: 0 });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Popup functions
  const openManagePopup = () => {
    setShowManagePopup(true);
    setSearchId('');
    setSearchedCustomer(null);
    setSearchError('');
    setShowUpdateForm(false);
    setSuccessMessage('');
  };

  const closeManagePopup = () => {
    setShowManagePopup(false);
    setSearchId('');
    setSearchedCustomer(null);
    setSearchError('');
    setShowUpdateForm(false);
    setSuccessMessage('');
  };

  const handleSearch = async () => {
    if (!searchId.trim()) {
      setSearchError('Please enter a customer ID');
      return;
    }

    const id = parseInt(searchId.trim());
    if (isNaN(id) || id <= 0) {
      setSearchError('Please enter a valid customer ID (number)');
      return;
    }

    try {
      setActionLoading(true);
      setSearchError('');
      setSuccessMessage('');
      const customer = await getCustomerById(id);
      setSearchedCustomer(customer);
      setShowUpdateForm(false);
    } catch (error) {
      setSearchError(`Customer with ID ${id} not found`);
      setSearchedCustomer(null);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!searchedCustomer) return;

    try {
      setActionLoading(true);
      await updateCustomerStatus(searchedCustomer.id, false);
      setSuccessMessage(`Customer "${searchedCustomer.fullName}" has been deactivated`);
      setSearchedCustomer({ ...searchedCustomer, isActive: false });
      fetchData();
    } catch (error) {
      setSearchError('Failed to deactivate customer');
    } finally {
      setActionLoading(false);
    }
  };

  const handleShowUpdateForm = () => {
    setUpdateFormData({
      fullName: searchedCustomer.fullName || '',
      email: searchedCustomer.email || '',
      username: searchedCustomer.username || '',
      phone: searchedCustomer.phone || '',
      address: searchedCustomer.address || '',
      city: searchedCustomer.city || '',
      postalCode: searchedCustomer.postalCode || '',
      country: searchedCustomer.country || '',
    });
    setShowUpdateForm(true);
    setSuccessMessage('');
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!searchedCustomer) return;

    try {
      setActionLoading(true);
      const updatedCustomer = await updateCustomer(searchedCustomer.id, updateFormData);
      setSearchedCustomer(updatedCustomer);
      setShowUpdateForm(false);
      setSuccessMessage('Customer details updated successfully');
      fetchData();
    } catch (error) {
      setSearchError('Failed to update customer');
    } finally {
      setActionLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
              <p className="text-gray-500 text-sm mt-1">Manage your customer base</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={openManagePopup}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
              >
                <Settings className="w-4 h-4 mr-2" />
                Manage Customer
              </Button>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Customers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {loading ? '...' : counts.total}
                  </p>
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
                  <p className="text-2xl font-bold text-gray-900">
                    {loading ? '...' : counts.active}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <ToggleLeft className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Inactive</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {loading ? '...' : counts.inactive}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Customers Table */}
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Contact</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Location</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Joined</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Last Login</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-12" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-32" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-40" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-24" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-20" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-4 bg-gray-200 rounded w-20" /></td>
                        <td className="py-4 px-4"><div className="animate-pulse h-6 bg-gray-200 rounded w-16" /></td>
                      </tr>
                    ))
                  ) : customers.length > 0 ? (
                    customers.map((customer) => (
                      <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <span className="font-mono text-sm font-medium text-gray-900">
                            #{customer.id}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{customer.fullName}</p>
                            <p className="text-sm text-gray-500">@{customer.username}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="w-3 h-3" />
                              {customer.email}
                            </div>
                            {customer.phone && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone className="w-3 h-3" />
                                {customer.phone}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {customer.city ? (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-3 h-3" />
                              {customer.city}{customer.country && `, ${customer.country}`}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-3 h-3" />
                            {formatDate(customer.createdAt)}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {formatDate(customer.lastLogin)}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                            customer.isActive
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              customer.isActive ? 'bg-green-500' : 'bg-red-500'
                            }`} />
                            {customer.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-gray-500">
                        <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No customers found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>

      {/* Manage Customer Popup */}
      {showManagePopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-hidden">
            {/* Popup Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Manage Customer</h3>
                <p className="text-sm text-gray-500 mt-1">Search, update or deactivate customers</p>
              </div>
              <button
                onClick={closeManagePopup}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Popup Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* Search Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search by Customer ID
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      placeholder="Enter customer ID (e.g., 1, 2, 3...)"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <Button
                    onClick={handleSearch}
                    disabled={actionLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                  >
                    {actionLoading ? 'Searching...' : 'Search'}
                  </Button>
                </div>
              </div>

              {/* Error Message */}
              {searchError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{searchError}</span>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">{successMessage}</span>
                </div>
              )}

              {/* Customer Details */}
              {searchedCustomer && !showUpdateForm && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-lg font-semibold text-gray-900">
                          {searchedCustomer.fullName}
                        </p>
                        <p className="text-sm text-gray-500">@{searchedCustomer.username}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        searchedCustomer.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {searchedCustomer.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-medium w-24">ID:</span>
                        <span className="font-mono">#{searchedCustomer.id}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-medium w-24">Email:</span>
                        <span>{searchedCustomer.email}</span>
                      </div>
                      {searchedCustomer.phone && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="font-medium w-24">Phone:</span>
                          <span>{searchedCustomer.phone}</span>
                        </div>
                      )}
                      {searchedCustomer.address && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="font-medium w-24">Address:</span>
                          <span>{searchedCustomer.address}</span>
                        </div>
                      )}
                      {searchedCustomer.city && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="font-medium w-24">City:</span>
                          <span>{searchedCustomer.city}</span>
                        </div>
                      )}
                      {searchedCustomer.country && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="font-medium w-24">Country:</span>
                          <span>{searchedCustomer.country}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={handleShowUpdateForm}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Update
                    </Button>
                    <Button
                      onClick={handleDelete}
                      disabled={actionLoading || !searchedCustomer.isActive}
                      className={`flex-1 ${
                        searchedCustomer.isActive
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {searchedCustomer.isActive ? 'Delete' : 'Already Inactive'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Update Form */}
              {showUpdateForm && searchedCustomer && (
                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      Editing Customer #{searchedCustomer.id} - ID cannot be changed
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <Input
                        name="fullName"
                        value={updateFormData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <Input
                        name="username"
                        value={updateFormData.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={updateFormData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <Input
                      name="phone"
                      value={updateFormData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <Input
                      name="address"
                      value={updateFormData.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <Input
                        name="city"
                        value={updateFormData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code
                      </label>
                      <Input
                        name="postalCode"
                        value={updateFormData.postalCode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <Input
                      name="country"
                      value={updateFormData.country}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      onClick={() => setShowUpdateForm(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={actionLoading}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      {actionLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
