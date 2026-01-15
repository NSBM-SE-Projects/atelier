import { useState } from 'react';
import { Link } from 'react-router-dom';

const Store = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  // Sample products data
  const products = [
    {
      id: 1,
      name: 'Printed Shirt Dress',
      code: '120126',
      price: 6800.00,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
    },
    {
      id: 2,
      name: 'Gathered Crop Top',
      code: '120126',
      price: 5600.00,
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500',
    },
    {
      id: 3,
      name: 'Cami Top',
      code: '120126',
      price: 3400.00,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500',
    },
    {
      id: 4,
      name: 'Chinese Collared Midi Dress',
      code: '120126',
      price: 8300.00,
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500',
    },
    {
      id: 5,
      name: 'Wrap Front Dress',
      code: '120127',
      price: 7200.00,
      image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=500',
    },
    {
      id: 6,
      name: 'Knit Crop Top',
      code: '120127',
      price: 4500.00,
      image: 'https://images.unsplash.com/photo-1562137369-1a1a0bc66744?w=500',
    },
    {
      id: 7,
      name: 'Classic White Blouse',
      code: '120127',
      price: 5200.00,
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500',
    },
    {
      id: 8,
      name: 'Blue Midi Dress',
      code: '120127',
      price: 9100.00,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/item/${product.id}`}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredItem(product.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Quick Shop Button */}
                {hoveredItem === product.id && (
                  <div className="absolute top-4 right-4">
                    <button className="px-4 py-2 bg-gray-700/80 text-white text-sm rounded hover:bg-gray-800/80 transition-colors">
                      Quick Shop
                    </button>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h3 className="text-base font-medium text-gray-900 mb-1">
                  {product.name} - {product.code}
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  {product.price.toLocaleString()}.00
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
