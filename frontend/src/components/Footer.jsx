import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribe:', email);
    setEmail('');
  };

  return (
    <footer className="w-full bg-gray-300 -mb-6">
      {/* Top Banner */}
      <div className="w-full py-6 sm:py-8 bg-gray-300">
        <div className="container px-4 sm:px-6 mx-auto text-center">
          <h2 className="font-serif italic text-base sm:text-lg md:text-xl font-black text-gray-800">
            Hurry, Shop Now and Embrace the Essence of Atelier's Unique Style!
          </h2>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-8 sm:py-12 bg-gray-300">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12">
            {/* Left Column - Logo */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-700">ATELIER</h3>
            </div>

            {/* Middle Column - Shop Links */}
            <div>
              <h4 className="mb-4 text-base sm:text-lg font-bold text-gray-900">
                Categories
              </h4>
              <div className="space-y-2 sm:space-y-3">
                <Link
                  to="/category/men"
                  className="block text-sm sm:text-base text-gray-700 transition-colors hover:text-gray-900"
                >
                  Men
                </Link>
                <Link
                  to="/category/women"
                  className="block text-sm sm:text-base text-gray-700 transition-colors hover:text-gray-900"
                >
                  Women
                </Link>
                <Link
                  to="/category/kids"
                  className="block text-sm sm:text-base text-gray-700 transition-colors hover:text-gray-900"
                >
                  Kids
                </Link>
                <Link
                  to="/category/accessories"
                  className="block text-sm sm:text-base text-gray-700 transition-colors hover:text-gray-900"
                >
                  Accessories
                </Link>
                <Link
                  to="/category/gifts"
                  className="block text-sm sm:text-base text-gray-700 transition-colors hover:text-gray-900"
                >
                  Gifts
                </Link>
              </div>
            </div>

            {/* Right Column - About Links */}
            <div>
              <h4 className="mb-4 text-base sm:text-lg font-bold text-gray-900">
                Info
              </h4>
              <div className="space-y-2 sm:space-y-3">
                <Link
                  to="/about"
                  className="block text-sm sm:text-base text-gray-700 transition-colors hover:text-gray-900"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="block text-sm sm:text-base text-gray-700 transition-colors hover:text-gray-900"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 sm:my-8 border-t border-gray-600"></div>

          {/* Bottom Footer */}
          <div className="text-center text-xs sm:text-sm text-gray-700 -mb-3">
            <span>Made with ❤ by the Atelier team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
