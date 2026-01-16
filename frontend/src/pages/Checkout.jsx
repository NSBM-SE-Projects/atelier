import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard, Wallet, Banknote } from 'lucide-react';
import api from '@/lib/api';
import useAuthStore from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { getSessionId } from '@/utils/session';

const Checkout = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { items, clearCart, getSelectedItems, getTotal, getDiscount, getFinalTotal } = useCartStore();

  const [formData, setFormData] = useState({
    email: user?.email || '',
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    shippingAddress: user?.address || '',
    shippingCity: user?.city || '',
    shippingPostalCode: user?.postalCode || '',
    shippingCountry: user?.country || '',
    paymentMethod: 'CARD',
    customerNotes: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const selectedItems = getSelectedItems();
  const subtotal = getTotal();
  const discount = getDiscount();
  const total = getFinalTotal();

  // Check if user has selected items
  useEffect(() => {
    if (selectedItems.length === 0 && items.length > 0) {
      setError('Please select items from your cart before checkout');
    }
  }, [selectedItems, items]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }

    if (!formData.shippingAddress.trim()) {
      newErrors.shippingAddress = 'Shipping address is required';
    }

    if (!formData.shippingCity.trim()) {
      newErrors.shippingCity = 'City is required';
    }

    if (!formData.shippingPostalCode.trim()) {
      newErrors.shippingPostalCode = 'Postal code is required';
    }

    if (!formData.shippingCountry.trim()) {
      newErrors.shippingCountry = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      setError('Please fix the errors below');
      return;
    }

    if (selectedItems.length === 0) {
      setError('Please select items from your cart before checkout');
      return;
    }

    setIsLoading(true);

    try {
      const sessionId = getSessionId();

      const response = await api.post('/orders', {
        customerId: user.userId,
        sessionId: sessionId,
        shippingAddress: formData.shippingAddress,
        shippingCity: formData.shippingCity,
        shippingPostalCode: formData.shippingPostalCode,
        shippingCountry: formData.shippingCountry,
        paymentMethod: formData.paymentMethod,
        customerNotes: formData.customerNotes
      });

      // Clear cart
      clearCart();

      // Redirect to order confirmation
      navigate(`/order-confirmation/${response.data.orderNumber}`);
    } catch (err) {
      let errorMessage = 'Failed to place order. Please try again.';
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      setError(errorMessage);
      console.error('Order creation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const paymentMethods = [
    { id: 'CARD', label: 'Credit/Debit Card', icon: CreditCard },
    { id: 'ONLINE', label: 'Online Payment', icon: Wallet },
    { id: 'CASH', label: 'Cash on Delivery', icon: Banknote }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-8rem)] bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors bg-transparent hover:border-transparent"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-4xl md:text-5xl font-serif font-bold italic text-red-900">Checkout</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 font-serif">
            <form onSubmit={handlePlaceOrder} className="bg-white rounded-lg shadow-md p-6 md:p-8">
              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 italic">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email <span className="text-red-600">*</span></label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white text-gray-900 border-2 rounded-lg
                        focus:outline-none transition-colors
                        ${errors.email ? 'border-red-400 focus:border-red-600' : 'border-gray-300 focus:border-gray-600'}`}
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name <span className="text-red-600">*</span></label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white text-gray-900 border-2 rounded-lg
                        focus:outline-none transition-colors
                        ${errors.fullName ? 'border-red-400 focus:border-red-600' : 'border-gray-300 focus:border-gray-600'}`}
                    />
                    {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-red-600">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      className={`w-full px-4 py-3 bg-white text-gray-900 border-2 rounded-lg
                        focus:outline-none transition-colors
                        ${errors.phone ? 'border-red-400 focus:border-red-600' : 'border-gray-300 focus:border-gray-600'}`}
                    />
                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 italic">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address <span className="text-red-600">*</span></label>
                    <input
                      type="text"
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      className={`w-full px-4 py-3 bg-white text-gray-900 border-2 rounded-lg
                        focus:outline-none transition-colors
                        ${errors.shippingAddress ? 'border-red-400 focus:border-red-600' : 'border-gray-300 focus:border-gray-600'}`}
                    />
                    {errors.shippingAddress && <p className="text-red-600 text-sm mt-1">{errors.shippingAddress}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">City <span className="text-red-600">*</span></label>
                      <input
                        type="text"
                        name="shippingCity"
                        value={formData.shippingCity}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white text-gray-900 border-2 rounded-lg
                          focus:outline-none transition-colors
                          ${errors.shippingCity ? 'border-red-400 focus:border-red-600' : 'border-gray-300 focus:border-gray-600'}`}
                      />
                      {errors.shippingCity && <p className="text-red-600 text-sm mt-1">{errors.shippingCity}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Postal Code <span className="text-red-600">*</span></label>
                      <input
                        type="text"
                        name="shippingPostalCode"
                        value={formData.shippingPostalCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white text-gray-900 border-2 rounded-lg
                          focus:outline-none transition-colors
                          ${errors.shippingPostalCode ? 'border-red-400 focus:border-red-600' : 'border-gray-300 focus:border-gray-600'}`}
                      />
                      {errors.shippingPostalCode && <p className="text-red-600 text-sm mt-1">{errors.shippingPostalCode}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Country <span className="text-red-600">*</span></label>
                    <input
                      type="text"
                      name="shippingCountry"
                      value={formData.shippingCountry}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white text-gray-900 border-2 rounded-lg
                        focus:outline-none transition-colors
                        ${errors.shippingCountry ? 'border-red-400 focus:border-red-600' : 'border-gray-300 focus:border-gray-600'}`}
                    />
                    {errors.shippingCountry && <p className="text-red-600 text-sm mt-1">{errors.shippingCountry}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 italic">Payment Method</h2>
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <label
                        key={method.id}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors
                        ${
                          formData.paymentMethod === method.id
                            ? 'border-[#8B4555] bg-red-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={handleInputChange}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <IconComponent size={20} className="ml-3 text-gray-700" />
                        <span className="ml-3 font-semibold text-gray-900">{method.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Order Notes */}
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 italic">Special Instructions (Optional)</h2>
                <textarea
                  name="customerNotes"
                  value={formData.customerNotes}
                  onChange={handleInputChange}
                  placeholder="Add any special instructions for your order..."
                  className="w-full px-4 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-lg
                    focus:outline-none focus:border-gray-600 transition-colors resize-none"
                  rows="4"
                />
              </div>

              {/* Mobile Order Summary (visible on small screens) */}
              <div className="lg:hidden bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
                <h2 className="text-2xl font-serif italic text-[#8B4555] mb-6 text-center">Order Total</h2>

                {selectedItems.length > 0 && (
                  <div className="bg-white rounded-lg p-4 mb-6 max-h-64 overflow-y-auto">
                    {selectedItems.map((item) => (
                      <div key={item.id} className="flex justify-between pb-3 border-b last:border-b-0">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Discount (10%)</span>
                    <span className="font-semibold text-green-600">-${discount.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-2xl text-[#8B4555]">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 md:p-8 sticky top-6 border border-gray-200 hidden lg:block">
              <h2 className="text-3xl font-serif italic text-[#8B4555] mb-8 text-center">Order Summary</h2>

              {selectedItems.length > 0 ? (
                <>
                  <div className="bg-white rounded-lg p-4 mb-6 max-h-64 overflow-y-auto">
                    {selectedItems.map((item) => (
                      <div key={item.id} className="flex justify-between pb-4 border-b last:border-b-0 last:pb-0">
                        <div className="flex-1 pr-3">
                          <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                          <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                          {item.image && (
                            <img src={item.image} alt={item.name} className="w-12 h-12 mt-2 rounded object-cover" />
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 mb-8 bg-white rounded-lg p-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Discount (10%)</span>
                      <span className="font-semibold text-green-600">-${discount.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-bold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-2xl text-[#8B4555]">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <form onSubmit={handlePlaceOrder} className="space-y-3">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#8B4555] hover:bg-[#6B3545] text-white py-4 rounded-full
                        font-semibold disabled:opacity-50 transition-colors"
                    >
                      {isLoading ? 'Processing...' : 'Place Order'}
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No items selected</p>
                  <p className="text-sm text-gray-500 mt-2">Please go back to your cart and select items</p>
                </div>
              )}
            </div>

            {/* Mobile Submit Button */}
            <div className="lg:hidden mt-1">
              <Button
                onClick={handlePlaceOrder}
                disabled={isLoading || selectedItems.length === 0}
                className="w-full bg-[#8B4555] hover:bg-[#6B3545] text-white py-4 rounded-full
                  font-semibold disabled:opacity-50 transition-colors mb-5"
              >
                {isLoading ? 'Processing...' : 'Place Order'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
