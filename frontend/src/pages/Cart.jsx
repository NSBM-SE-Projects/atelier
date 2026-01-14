import { Button } from '@/components/ui/button';
import { useCartStore } from '../store/cartStore';
import logo from '../assets/atelier-logo-new.png';

const Cart = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    toggleSelection,
    getSelectedItems,
    getTotal,
    getDiscount,
    getFinalTotal,
    getSelectedCount
  } = useCartStore();

  const selectedItems = getSelectedItems();
  const total = getTotal();
  const discount = getDiscount();
  const finalTotal = getFinalTotal();
  const selectedCount = getSelectedCount();

  return (
    <div className="h-screen flex">
      {/* Left gray strip */}
      <div className="w-8 bg-gray-200 flex-shrink-0"></div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left: Your Cart */}
        <div className="flex-1 bg-white flex flex-col overflow-hidden">
          {/* Heading */}
          <div className="pt-12 px-12 pb-8">
            <h1 className="text-5xl font-serif italic text-[#8B4555]">
              Your Cart
            </h1>
          </div>

          {/* Scrollable Items */}
          <div className="flex-1 overflow-y-auto px-12 pb-12">
            <div className="space-y-8">
              {items.length === 0 ? (
                <p className="text-gray-600">Your cart is empty</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-start gap-6">
                    {/* Round Checkbox */}
                    <div className="flex items-center pt-10">
                      <button
                        onClick={() => toggleSelection(item.id)}
                        className={`w-5 h-5 flex items-center justify-center transition-all ${
                          item.selected
                            ? 'bg-black'
                            : 'bg-white border-2 border-gray-700'
                        }`}
                        style={{ borderRadius: '50%', aspectRatio: '1/1' }}
                      >
                        {item.selected && (
                          <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Product Image */}
                    <div className="flex-shrink-0 w-32 h-32 overflow-hidden bg-gray-100 rounded-lg">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 pt-2">
                      <h3 className="text-base font-medium text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">Size: {item.size}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-sm bg-white border border-black rounded-lg px-3 py-1 hover:bg-gray-50"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex flex-col items-end gap-4 pt-2">
                      <span className="text-lg font-medium text-gray-700">
                        $ {item.price.toFixed(1)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 border border-gray-300 rounded-l-lg flex items-center justify-center text-lg bg-white hover:bg-gray-50"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value) || 1)
                          }
                          className="w-10 h-10 border-t border-b border-gray-300 text-center text-lg font-medium focus:outline-none bg-white"
                          min="1"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 border border-gray-300 rounded-r-lg flex items-center justify-center text-lg bg-white hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="w-[420px] bg-gray-100 flex flex-col overflow-hidden">
          {/* Logo */}
          <div className="flex justify-end pt-6 pr-8">
            <img src={logo} alt="Atelier Logo" className="w-auto h-14" />
          </div>

          {/* Title */}
          <div className="px-10 pt-4 pb-6">
            <h2 className="text-4xl font-serif italic text-[#8B4555]">
              Order Summary
            </h2>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-10">
            {/* Selected Items */}
            <div className="space-y-6">
              {selectedItems.length === 0 ? (
                <p className="py-8 text-center text-gray-500 text-sm">
                  No items selected
                </p>
              ) : (
                selectedItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-24 h-24 overflow-hidden bg-gray-200 rounded-lg">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 pt-1">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-1">Size: {item.size}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-xs bg-white border border-black rounded-lg px-2 py-1 hover:bg-gray-50"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-base font-medium text-gray-700">
                        $ {item.price.toFixed(1)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-300 rounded-l-lg flex items-center justify-center text-sm hover:bg-gray-50 bg-white"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value) || 1)
                          }
                          className="w-8 h-8 border-t border-b border-gray-300 text-center text-sm font-medium focus:outline-none bg-white"
                          min="1"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-300 rounded-r-lg flex items-center justify-center text-sm hover:bg-gray-50 bg-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Totals */}
            <div className="mt-10 space-y-4">
              <div className="flex justify-between text-lg">
                <span className="text-gray-900">Item total:</span>
                <span className="font-medium text-[#8B4555]">$ {total.toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-900">Item discount:</span>
                <span className="font-medium text-[#8B4555]">-$ {discount.toFixed(1)}</span>
              </div>
              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between text-xl font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-[#8B4555]">$ {finalTotal.toFixed(1)}</span>
                </div>
              </div>
            </div>

            {/* Note */}
            <p className="mt-4 text-xs text-center text-gray-500">
              Please refer to your final actual payment amount.
            </p>

            {/* Checkout Button */}
            <div className="mt-6 pb-10">
              <Button
                className="w-full bg-[#8B4555] hover:bg-[#6B3545] text-white text-base py-6 rounded-full font-medium"
              >
                Checkout ({selectedCount})
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
