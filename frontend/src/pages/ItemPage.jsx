import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, ShoppingCart, Truck, RotateCcw } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import api from '@/lib/api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

const ItemPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetchProduct();
    fetchRelatedItems();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedItems = async () => {
    try {
      const response = await api.get('/products');
      const filtered = response.data.filter(p => p.id !== parseInt(id));
      const shuffled = filtered.sort(() => 0.5 - Math.random());
      setRelatedItems(shuffled.slice(0, 4));
    } catch (err) {
      console.error('Error fetching related items:', err);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart({
        id: product.id,
        quantity: quantity,
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  const getStockStatus = () => {
    if (product.stockQuantity === 0) {
      return { label: 'Out of Stock', color: 'bg-red-100 text-red-700', available: false };
    } else if (product.stockQuantity <= 10) {
      return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-700', available: true };
    }
    return { label: 'In Stock', color: 'bg-green-100 text-green-700', available: true };
  };

  const getColorStyle = (colorName) => {
    const colorMap = {
      'White': 'bg-white border border-gray-300',
      'Black': 'bg-black',
      'Blue': 'bg-blue-500',
      'Red': 'bg-red-500',
      'Pink': 'bg-pink-500',
      'Beige': 'bg-yellow-100 border border-gray-300',
      'Light Blue': 'bg-blue-200 border border-gray-300',
      'Off White': 'bg-gray-100 border border-gray-300',
      'Brown': 'bg-amber-700',
      'Dark Blue': 'bg-blue-900',
      'Gold/Black': 'bg-gradient-to-r from-yellow-500 to-black',
      'Multi': 'bg-gradient-to-r from-red-500 via-purple-500 to-blue-500',
    };
    return colorMap[colorName] || 'bg-gray-300';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-600 text-lg">Error: {error || 'Product not found'}</div>
      </div>
    );
  }

  const stockStatus = getStockStatus();

  return (
    <div className="min-h-screen bg-white">
      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left - Product Image */}
          <div className="flex items-start justify-center">
            <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow-sm">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right - Product Details */}
          <div className="flex flex-col justify-start">
            {/* Category Badge */}
            <span className="inline-flex w-fit mb-4 px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full font-serif italic">
              {product.categoryName}
            </span>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight font-serif italic">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 font-serif">
              ${typeof product.price === 'object' ? (product.price / 1).toFixed(2) : parseFloat(product.price).toFixed(2)}
            </p>

            {/* Stock Status */}
            <div className="mb-6">
              <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full font-serif ${stockStatus.color}`}>
                {stockStatus.label} ({product.stockQuantity} available)
              </span>
            </div>

            {/* SKU and Gender */}
            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200 font-serif">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">SKU</p>
                <p className="text-sm font-medium text-gray-900">{product.sku}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Category</p>
                <p className="text-sm font-medium text-gray-900">{product.gender || 'Unisex'}</p>
              </div>
            </div>

            {/* Size and Color */}
            <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-200 font-serif">
              {/* Size */}
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2 font-semibold">Size</label>
                <div className="px-4 py-3 bg-gray-100 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">{product.size || 'One Size'}</p>
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2 font-semibold">Color</label>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full border-2 border-gray-300 ${getColorStyle(product.color)}`}></div>
                  <p className="text-sm font-medium text-gray-900">{product.color}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-gray-600 leading-relaxed text-sm md:text-base font-serif">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="text-xs text-gray-500 uppercase tracking-wider block mb-3 font-semibold font-serif">Quantity</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    disabled={!stockStatus.available}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400 transition-colors"
                  >
                    {quantity}
                    <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-28">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <DropdownMenuItem
                      key={num}
                      onClick={() => setQuantity(num)}
                      className={quantity === num ? 'bg-gray-100' : ''}
                    >
                      {num}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!stockStatus.available}
              className={`w-full py-4 rounded-lg text-white text-lg font-semibold flex items-center justify-center gap-2 transition-colors mb-6 ${
                !stockStatus.available
                  ? 'bg-gray-400 cursor-not-allowed'
                  : addedToCart
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-700 hover:bg-red-900 hover:border-transparent'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {addedToCart ? '✓ Added to Cart' : 'Add To Cart'}
            </button>

            {/* Shipping & Returns Info */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" strokeWidth={2} />
                <div className="font-serif">
                  <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                  <p className="text-xs text-gray-500">on orders over $50</p>
                </div>
              </div>
              <div className="flex items-start gap-3 font-serif">
                <RotateCcw className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" strokeWidth={2 } />
                <div>
                  <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                  <p className="text-xs text-gray-500">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Items Section */}
        {relatedItems.length > 0 && (
          <div className="mb-10 sm:mb-0 mt-16 md:mt-20 pt-12 md:pt-16 border-t border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 font-black font-serif italic">
              Related Items
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 font-serif italic">
              {relatedItems.map((item) => (
                <Link to={`/item/${item.id}`} key={item.id} className="group">
                  <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                  <p className="text-sm text-gray-900">
                    ${typeof item.price === 'object' ? (item.price / 1).toFixed(2) : parseFloat(item.price).toFixed(2)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemPage;
