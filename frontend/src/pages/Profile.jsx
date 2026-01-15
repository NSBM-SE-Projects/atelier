import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import useAuthStore from '@/store/authStore';

const Profile = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    email: user?.email || '',
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || '',
    country: user?.country || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    if (isEditMode) {
      // Reset form to current user data
      setFormData({
        email: user?.email || '',
        fullName: user?.fullName || '',
        phone: user?.phone || '',
        address: user?.address || '',
        city: user?.city || '',
        postalCode: user?.postalCode || '',
        country: user?.country || '',
      });
    }
    setError('');
    setSuccessMessage('');
    setIsEditMode(!isEditMode);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.put(`/users/${user.userId}`, formData);

      // Update localStorage
      const updatedUser = { ...user, ...response.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Update Zustand store
      useAuthStore.getState().setUser(updatedUser);

      setSuccessMessage('Profile updated successfully!');
      setIsEditMode(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      // Extract error message from response (check multiple possible locations)
      let errorMessage = 'Failed to update profile. Please try again.';

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.response?.statusText) {
        errorMessage = err.response.statusText;
      }

      setError(errorMessage);
      console.error('Profile update error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-8rem)] bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors bg-transparent hover:border-transparent"
            aria-label="Go back"
          >
            <ArrowLeft size={24}/>
          </button>
          <h1 className="text-4xl font-black text-gray-900">My Profile</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {successMessage}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {!isEditMode ? (
            // View Mode
            <>
              <div className="space-y-6">
                {/* Username (Read-only) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-serif">Username</label>
                  <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-900">
                    {user?.username}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-900">
                    {user?.email}
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-900">
                    {user?.fullName || 'Not provided'}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-900">
                    {user?.phone || 'Not provided'}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-900">
                    {user?.address || 'Not provided'}
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-900">
                    {user?.city || 'Not provided'}
                  </div>
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Postal Code</label>
                  <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-900">
                    {user?.postalCode || 'Not provided'}
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                  <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-900">
                    {user?.country || 'Not provided'}
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <div className="mt-8">
                <Button
                  onClick={handleEditToggle}
                  className="w-full bg-gray-950 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold"
                >
                  Edit Profile
                </Button>
              </div>
            </>
          ) : (
            // Edit Mode
            <>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                {/* Username (Read-only) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                  <div className="px-4 py-3 bg-gray-100 rounded-lg text-gray-900">
                    {user?.username}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                  />
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                  />
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gray-950 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleEditToggle}
                    disabled={isLoading}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-3 rounded-lg font-semibold disabled:opacity-50"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
