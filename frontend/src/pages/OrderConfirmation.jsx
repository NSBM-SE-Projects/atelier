import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import api from '@/lib/api';

const OrderConfirmation = () => {
  const { orderNumber } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/orders/number/${orderNumber}`);
        setOrder(response.data);
      } catch (err) {
        console.error('Failed to fetch order:', err);
        setError('Failed to load order details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-8rem)] bg-gray-50">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-8rem)] bg-gray-50">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <p className="text-red-600 font-semibold mb-4">{error || 'Order not found'}</p>
              <Button
                onClick={() => navigate('/shop')}
                className="bg-[#8B4555] hover:bg-[#6B3545] text-white rounded-full px-8"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-8rem)] bg-gray-50 font-serif">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
        {/* Success Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-4">
                <CheckCircle size={48} className="text-green-600" strokeWidth={3} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 italic">
              Order Confirmed!
            </h1>
            <p className="text-gray-600 text-lg">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Number */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 border-2 border-green-200">
            <p className="text-center text-gray-600 mb-2">Your Order Number</p>
            <p className="text-center text-3xl font-bold font-serif text-[#8B4555]">
              {order.orderNumber}
            </p>
            <p className="text-center text-sm text-gray-600 mt-2">
              We've sent a confirmation email with your order details.
            </p>
          </div>

          {/* Order Details */}
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Order Details</h2>

            {/* Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-2">Order ID</p>
                <p className="text-gray-900 font-semibold">{order.id}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-2">Order Date</p>
                <p className="text-gray-900 font-semibold">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">Shipping Address</p>
              <p className="text-gray-900 font-semibold">{order.shippingAddress}</p>
              <p className="text-gray-900 font-semibold">
                {order.shippingCity}, {order.shippingPostalCode}
              </p>
              <p className="text-gray-900 font-semibold">{order.shippingCountry}</p>
            </div>

            {/* Order Items */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-4">Items Ordered</p>
              <div className="space-y-3">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center pb-3 border-b last:border-b-0">
                      <div>
                        <p className="font-semibold text-gray-900">{item.productName}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${(item.totalPrice || item.unitPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No items in order</p>
                )}
              </div>
            </div>

            {/* Order Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-2">Payment Method</p>
                <p className="text-gray-900 font-semibold">
                  {order.paymentMethod === 'CARD' && 'Credit/Debit Card'}
                  {order.paymentMethod === 'ONLINE' && 'Online Payment'}
                  {order.paymentMethod === 'CASH' && 'Cash on Delivery'}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-2">Order Status</p>
                <p className="text-gray-900 font-semibold px-3 py-1 bg-green-100 text-green-800 rounded-full inline-block">
                  {order.status}
                </p>
              </div>
            </div>
          </div>

          {/* Order Total */}
          <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4 pb-4 border-b">
              <span className="text-gray-700 font-semibold">Order Total</span>
              <span className="text-3xl font-bold text-[#8B4555]">
                ${order.totalPrice.toFixed(2)}
              </span>
            </div>
            {order.customerNotes && (
              <div className="mt-4 pt-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Special Instructions</p>
                <p className="text-gray-900">{order.customerNotes}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => navigate('/shop')}
              variant="outline"
              className="flex-1 border-2 border-gray-300 text-gray-900 hover:bg-gray-100 py-3 md:py-6 lg:py-6 rounded-full font-semibold hover:border-gray-200"
            >
              Continue Shopping
            </Button>
            <Button
              onClick={() => navigate('/')}
              className="flex-1 bg-[#8B4555] hover:bg-[#6B3545] text-white py-3 md:py-6 lg:py-6 rounded-full font-semibold hover:border-transparent"
            >
              Back to Home
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>✓ You will receive a confirmation email shortly</li>
            <li>✓ Your order will be processed and prepared for shipping</li>
            <li>✓ You will receive a tracking number once your order ships</li>
            <li>✓ Estimated delivery: 3-5 business days</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
