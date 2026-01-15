import { useState } from 'react';
import { ShoppingCart, Search, User, Menu, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Badge } from './ui/badge';
import useAuthStore from '@/store/authStore';
import logo from '../assets/atelier-logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const cartItemCount = 0; // TODO: Replace with actual cart count from state management

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
    { name: 'Accessories', path: '/category/accessories' },
    { name: 'Gifts', path: '/category/gifts' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-b from-red-950 via-red-800 to-red-600 shadow-md">
      {/* Top Navigation */}
      <div>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left - Mobile Menu + Desktop Links */}
            <div className="flex items-center gap-5">
              {/* Mobile Menu Button */}
              <Sheet open={isOpen} onOpenChange={setIsOpen} className="bg-gray-950">
                <SheetTrigger asChild>
                  <button className="lg:hidden p-2 -ml-2 text-gray-100 hover:text-white transition-colors bg-transparent border-none outline-none focus:outline-none focus-visible:outline-none">
                    <Menu size={24} strokeWidth={3} />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[270px] sm:w-[300px] bg-gray-100">
                  <SheetHeader>
                    <SheetTitle className="text-left font-black">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 flex flex-col gap-6">
                    {/* Main Links */}
                    <div className="flex flex-col gap-1">
                      {mainLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-black transition-colors ${
                            isActive(link.path)
                              ? 'bg-gray-200 text-gray-900'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-950'
                          }`}
                        >
                          {link.name}
                          <ChevronRight size={18} />
                        </Link>
                      ))}
                    </div>

                    {/* Categories */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="px-4 mb-3 text-xs font-black text-gray-500 uppercase tracking-wider">
                        Categories
                      </h3>
                      <div className="flex flex-col gap-1">
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            to={category.path}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-black transition-colors ${
                              isActive(category.path)
                                ? 'bg-gray-200 text-gray-900'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-950'
                            }`}
                          >
                            {category.name}
                            <ChevronRight size={18} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Desktop Main Links */}
              <div className="hidden lg:flex items-center gap-8">
                {mainLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-black transition-all duration-200 ${
                      isActive(link.path)
                        ? 'text-gray-950 border-b-2 border-gray-950 hover:text-gray-950'
                        : 'text-gray-100 hover:text-gray-950'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Center - Logo */}
            <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
              <img
                src={logo}
                alt="Atelier Logo"
                className="h-12 lg:h-12 w-auto object-contain transition-transform hover:scale-105"
              />
            </Link>

            {/* Right - Icons */}
            <div className="flex items-center gap-3 lg:gap-3">

              {isLoggedIn && (
                <Link
                  to="/cart"
                  className={`p-2 transition-all duration-200 hover:scale-110 relative group ${
                    isActive('/cart')
                      ? 'text-gray-900'
                      : 'text-gray-100 hover:text-gray-950'
                  }`}
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart size={22} strokeWidth={3} />
                  {cartItemCount > 0 && (
                    <Badge
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-white hover:bg-red-700"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </Link>
              )}

              <Link
                to="/login"
                className={`p-2 transition-all duration-200 hover:scale-110 ${
                  isActive('/login')
                    ? 'text-gray-900'
                    : 'text-gray-100 hover:text-gray-950'
                }`}
                aria-label="User Account"
              >
                <User size={22} strokeWidth={3} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Categories - Desktop Only */}
      <div className="hidden lg:block ">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-12 h-12">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className={`text-sm font-black transition-all duration-200 ${
                  isActive(category.path)
                    ? 'text-gray-900 border-b-2 border-gray-900 hover:text-gray-950'
                    : 'text-gray-300 hover:text-gray-950'
                }`}
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

                               // ? 'bg-gray-100 text-gray-900'
                                //: 'text-gray-700 hover:bg-gray-50 hover:text-gray-950'
