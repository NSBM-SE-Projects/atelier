import { ShoppingCart, Search, Phone, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const mainLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP', path: '/shop' },
    { name: 'NEW ARRIVALS', path: '/new-arrivals' },
    { name: 'COLLECTION', path: '/collection' }
  ];

  const categories = [
    { name: 'Men', path: '/category/men' },
    { name: 'Women', path: '/category/women' },
    { name: 'Kids', path: '/category/kids' },
    { name: 'Gifts', path: '/gift-voucher' },
    { name: 'Bags', path: '/category/bags' },
    { name: 'Shoes', path: '/category/shoes' },
    { name: 'Accessories', path: '/category/accessories' },
    { name: 'Other', path: '/category/other' }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Navigation */}
      <div className="border-b border-gray-200">
        <div className="w-full px-0 py-4">
          <div className="flex items-center justify-between px-4">
            {/* Left - Main Links */}
            <div className="flex items-center gap-8 ml-0">
              {mainLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-medium text-gray-900 transition-colors hover:text-gray-600"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right - Icons */}
            <div className="flex gap-12 ml-auto mr-0 items-right">
              <button className="p-0 text-gray-700 transition-colors bg-transparent border-none hover:text-gray-900">
                <ShoppingCart size={24} strokeWidth={1.5} />
              </button>
              <button className="p-0 text-gray-700 transition-colors bg-transparent border-none hover:text-gray-900">
                <Search size={24} strokeWidth={1.5} />
              </button>
              <button className="p-0 text-gray-700 transition-colors bg-transparent border-none hover:text-gray-900">
                <Phone size={24} strokeWidth={1.5} />
              </button>
              <button className="p-0 text-gray-700 transition-colors bg-transparent border-none hover:text-gray-900">
                <User size={24} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Categories */}
      <div className="bg-black">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center justify-center gap-12">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-sm font-medium text-white transition-colors hover:text-gray-300"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
