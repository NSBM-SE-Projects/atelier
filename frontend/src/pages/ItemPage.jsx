import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Import logo
import logoBlack from '../../images/logo-black.png';

const ItemPage = () => {
  const [selectedColor, setSelectedColor] = useState('Brown');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  // Product data
  const product = {
    name: 'Atelier Brown Mid Dress',
    price: 14,
    colors: [
      { name: 'Red', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400' },
      { name: 'Blue', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400' },
      { name: 'Black', image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=400' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    mainImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
  };

  // Related items
  const relatedItems = [
    {
      id: 1,
      name: 'Atelier white crop top',
      price: 15.0,
      image: 'https://images.unsplash.com/photo-1562137369-1a1a0bc66744?w=400',
    },
    {
      id: 2,
      name: 'Atelier Light green basic shirt',
      price: 20.5,
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
    },
    {
      id: 3,
      name: 'Atelier Elouise bodycorn maxi dress',
      price: 40.0,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400',
    },
    {
      id: 4,
      name: 'Atelier Maisy pink tube top',
      price: 13.0,
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Logo */}
      <div className="p-6 lg:p-8">
        <div className="flex flex-col items-center w-fit">
          <img src={logoBlack} alt="Atelier" className="w-32 h-32 object-contain" />
          <span className="text-base tracking-[0.35em] text-gray-500 font-normal -mt-10">ATELIER</span>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left - Images */}
          <div className="flex gap-4">
            {/* Main Image */}
            <div className="w-72 h-96 lg:w-80 lg:h-[450px] bg-gray-100 rounded overflow-hidden">
              <img
                src={product.mainImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Color Thumbnails */}
            <div className="flex flex-col gap-3">
              {product.colors.map((color) => (
                <div
                  key={color.name}
                  className="cursor-pointer"
                  onClick={() => setSelectedColor(color.name)}
                >
                  <div className={`w-16 h-20 bg-gray-100 rounded overflow-hidden border-2 ${selectedColor === color.name ? 'border-gray-800' : 'border-transparent'}`}>
                    <img
                      src={color.image}
                      alt={color.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-center mt-1 text-gray-700">{color.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Product Details */}
          <div className="flex-1 pt-4">
            {/* Product Name */}
            <h1 className="text-2xl lg:text-3xl font-serif italic text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-2xl lg:text-3xl text-gray-900 mb-6">
              $ {product.price}
            </p>

            {/* Color Selector */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-900 mb-2 block">
                Color: <span className="font-normal">{selectedColor}</span>
                <ChevronDown className="inline-block w-4 h-4 ml-1" />
              </label>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-900 mb-3 block">Size</label>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-10 rounded-full border text-sm font-medium transition-colors bg-white ${
                      selectedSize === size
                        ? 'border-gray-900 text-gray-900'
                        : 'border-gray-300 text-gray-700 hover:border-gray-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="text-sm font-medium text-gray-900 mb-2 block">Qty</label>
              <div className="relative w-20">
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-10 px-3 border border-gray-300 rounded appearance-none bg-white text-gray-700 focus:outline-none focus:border-gray-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full max-w-md py-4 bg-[#722F37] text-white rounded-full text-lg font-medium hover:bg-[#5a252c] transition-colors">
              Add To Cart
            </button>
          </div>
        </div>

        {/* Related Items Section */}
        <div className="mt-20">
          <h2 className="text-2xl lg:text-3xl font-serif text-center text-gray-900 mb-10">
            Related Items
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedItems.map((item) => (
              <div key={item.id} className="cursor-pointer group">
                <div className="aspect-[3/4] bg-gray-100 rounded overflow-hidden mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-900">$ {item.price.toFixed(1)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
