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
    <footer className="w-full bg-gray-300">
      {/* Top Banner */}
      <div className="w-full py-8 bg-gray-300">
        <div className="container px-4 mx-auto text-center">
          <h2 className="font-serif text-lg font-bold text-gray-900">
            Hurry, Shop Now and Embrace the Essence of Atelier Unique Style!
          </h2>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16 bg-gray-300">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-16 mb-12 md:grid-cols-3">
            {/* Left Column - Logo & Newsletter */}
            <div>
              <h3 className="mb-12 text-3xl font-bold text-gray-900">ATELIER</h3>

              <div>
                <h4 className="mb-6 font-serif text-lg text-gray-900">
                  Sign up for our newsletter
                </h4>

                <form onSubmit={handleSubscribe}>
                  <div className="flex items-center pb-4 border-b border-gray-600">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 text-gray-900 placeholder-gray-700 bg-transparent focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-transparent border-none p-0 text-gray-900 transition-colors hover:text-gray-700"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Middle Column - Links */}
            <div className="mx-auto">
              <div className="space-y-4">
                <div className="text-lg font-medium text-gray-900">
                  Shop
                </div>
                <div className="text-gray-700 underline">
                  Search
                </div>
              </div>
            </div>

            {/* Right Column - About Links */}
            <div className="ml-auto mr-0 pr-12">
              <h4 className="mb-6 font-serif text-lg text-gray-900">
                About us
              </h4>
              <div className="space-y-3">
                <Link
                  to="/about"
                  className="block text-gray-700 transition-colors hover:text-gray-900"
                >
                  -About Us
                </Link>
                <Link
                  to="/contact"
                  className="block text-gray-700 transition-colors hover:text-gray-900"
                >
                  -Contact Us
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-gray-600"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col items-center justify-between text-sm text-gray-700 md:flex-row">
            <div>
              <span>© 2026 Atelier— Powered by </span>
              <a
                href="#"
                className="text-gray-900 underline transition-colors hover:text-blue-600"
              >
                Dawn 360
              </a>
            </div>
            <Link
              to="/terms"
              className="mt-4 text-gray-900 transition-colors hover:text-blue-600 md:mt-0"
            >
              Terms and Policies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
