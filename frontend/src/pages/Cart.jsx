import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useCartStore } from '../store/cartStore';
import { Trash2 } from 'lucide-react';
import blackLogo from '../assets/black-atelier-logo.png';

const Cart = () => {
  const {
    items,
    loading,
    error,
    fetchCart,
    removeFromCart,
    updateQuantity,
    toggleSelection,
    getSelectedItems,
    getTotal,
    getDiscount,
    getFinalTotal,
    getSelectedCount
  } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, []);

  const selectedItems = getSelectedItems();
  const total = getTotal();
  const discount = getDiscount();
  const finalTotal = getFinalTotal();
  const selectedCount = getSelectedCount();

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-white py-8 md:py-12 px-4 md:px-8 -mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold italic text-red-900">Your Shopping Cart</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 font-serif">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Cart Items */}
          <div className="lg:col-span-2">
            {loading && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">Loading cart...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg text-red-700 mb-6">
                <p className="font-semibold">Error loading cart</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {!loading && items.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
                <Link to="/shop">
                  <Button className="bg-[#8B4555] hover:bg-[#6B3545] text-white rounded-full px-8">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 md:p-6 hover:shadow-md transition-shadow font-bold"
                  >
                    {/* Top row: Checkbox, Image, Details */}
                    <div className="flex gap-3 sm:gap-4 md:gap-6 mb-3">
                      {/* Checkbox */}
                      <div className="flex items-start pt-1 flex-shrink-0">
                        <Checkbox
                          checked={item.selected}
                          onCheckedChange={() => toggleSelection(item.id)}
                          className="h-auto w-5 rounded-full border-2 border-gray-400 bg-white data-[state=checked]:bg-white data-[state=checked]:border-red-950 data-[state=checked]:text-red-950"
                        />
                      </div>

                      {/* Product Image */}
                      <div className="flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 overflow-hidden bg-gray-100 rounded-lg">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full text-gray-400 text-xs">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <h3 className="text-sm sm:text-base md:text-lg font-black text-gray-900 mb-1 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1">
                            <span className="font-medium">Size:</span> {item.size}
                          </p>
                          {item.color && (
                            <p className="text-xs sm:text-sm text-gray-600">
                              <span className="font-medium">Color:</span> {item.color}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-fit flex items-center gap-1 text-red-500 hover:text-red-700 text-xs sm:text-sm font-medium transition-colors bg-transparent hover:border-transparent mt-1 -ml-5"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Bottom row: Price and Quantity */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#8B4555]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center text-sm sm:text-lg bg-white hover:bg-gray-100 hover:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value) || 1)
                          }
                          className="w-10 sm:w-12 h-8 sm:h-10 text-sm sm:text-lg font-semibold focus:outline-none bg-white border-l border-r border-gray-300 pl-4 pr-1 md:pl-5 md:pr-4 lg:pl-4 lg:pr-1"
                          min="1"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center text-sm sm:text-lg bg-white hover:bg-gray-100 transition-colors hover:border-transparent"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 md:p-8 sticky top-6 border border-gray-200">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <img src={blackLogo} alt="Atelier Logo" className="w-auto h-16" />
              </div>

              {/* Title */}
              <h2 className="text-3xl font-serif italic text-[#8B4555] mb-8 text-center">
                Order Summary
              </h2>

              {/* Selected Items Summary */}
              <div className="bg-white rounded-lg p-4 mb-6 max-h-64 overflow-y-auto">
                {selectedItems.length === 0 ? (
                  <p className="text-center text-gray-500 text-sm py-8">
                    No items selected
                  </p>
                ) : (
                  <div className="space-y-4">
                    {selectedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-gray-900 truncate italic">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {item.quantity}x ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-[#8B4555] ml-4">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">${total.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-[#8B4555]">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Note */}
              <p className="text-xs text-center text-gray-500 mb-6">
                Tax and shipping will be calculated at checkout
              </p>

              {/* Checkout Button */}
              <Button
                disabled={selectedCount === 0}
                className="w-full bg-[#8B4555] hover:bg-[#6B3545] disabled:opacity-50 hover:border-transparent disabled:cursor-not-allowed text-white text-base py-6 rounded-full font-semibold transition-colors"
              >
                Checkout ({selectedCount} {selectedCount === 1 ? 'item' : 'items'})
              </Button>

              {/* Continue Shopping */}
              <Link to="/shop" className="w-full">
                <Button
                  variant="outline"
                  className="w-full mt-3 border-gray-300 text-gray-900 hover:bg-gray-100 rounded-full hover:border-gray-200 py-6 font-semibold"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
