import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

// Import logo
import logoBlack from '../../images/logo-black.png';

const ItemPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const sizes = ['XS', 'S', 'M', 'L'];
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetchProduct();
    fetchRelatedItems();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      setProduct(data);
      setSelectedColor(data.color || '');
    } catch (err) {
      setError(err.message);
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedItems = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products');
      if (response.ok) {
        const data = await response.json();
        // Get 4 random products excluding current one
        const filtered = data.filter(p => p.id !== parseInt(id));
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        setRelatedItems(shuffled.slice(0, 4));
      }
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Logo */}
      <div className="p-6 lg:p-8">
        <Link to="/" className="flex flex-col items-center w-fit">
          <img src={logoBlack} alt="Atelier" className="w-32 h-32 object-contain" />
          <span className="text-base tracking-[0.35em] text-gray-500 font-normal -mt-10">ATELIER</span>
        </Link>
      </div>

      {/* Product Section */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left - Main Image */}
          <div className="flex-shrink-0">
            <div className="w-64 h-96 md:w-72 md:h-[450px] lg:w-80 lg:h-[500px] bg-gray-100 rounded overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right - Product Details */}
          <div className="flex-1 lg:pt-0">
            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-6 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-3xl lg:text-4xl text-gray-900 mb-8 font-light">
              $ {product.price.toFixed(2)}
            </p>

            {/* Color Display */}
            <div className="mb-8">
              <p className="text-sm text-gray-700">
                Color: <span className="font-normal">{selectedColor}</span>
              </p>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <label className="text-sm font-medium text-gray-900 mb-4 block">Size</label>
              <div className="flex gap-4">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-11 rounded-full border-2 text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'border-gray-900 text-gray-900 bg-white'
                        : 'border-gray-300 text-gray-700 hover:border-gray-500 bg-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-10">
              <label className="text-sm font-medium text-gray-900 mb-3 block">Qty</label>
              <div className="relative w-24">
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-11 px-4 border border-gray-300 rounded appearance-none bg-white text-gray-700 focus:outline-none focus:border-gray-900"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full max-w-md py-4 bg-[#722F37] text-white rounded-full text-lg font-medium hover:bg-[#5a252c] transition-colors"
            >
              {addedToCart ? '✓ Added to Cart!' : 'Add To Cart'}
            </button>
          </div>
        </div>

        {/* Related Items Section */}
        {relatedItems.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl lg:text-3xl font-serif text-center text-gray-900 mb-10">
              Related Items
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((item) => (
                <Link to={`/item/${item.id}`} key={item.id} className="cursor-pointer group">
                  <div className="aspect-[3/4] bg-gray-100 rounded overflow-hidden mb-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-sm text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-900">$ {item.price.toFixed(2)}</p>
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
