import { useState } from 'react';
import { ShoppingCart, User, Menu, ChevronRight, LogOut, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from './ui/dropdown-menu';
import useAuthStore from '@/store/authStore';
import logo from '../assets/atelier-logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const cartItemCount = 0; // TODO: Replace with actual cart count from state management

  const handleLogout = () => {
    localStorage.removeItem('user');
    useAuthStore.getState().logout();
    navigate('/login');
  };

  const mainLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP', path: '/shop' }
  ];

  const categories = [
    { name: 'Men', path: '/men' },
    { name: 'Women', path: '/women' },
    { name: 'Kids', path: '/kids' },
    { name: 'Accessories', path: '/accessories' },
    { name: 'Gifts', path: '/gifts' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full shadow-md bg-gradient-to-b from-red-950 via-red-800 to-red-600">
      {/* Top Navigation */}
      <div>
        <div className="container px-4 mx-auto lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left - Mobile Menu + Desktop Links */}
            <div className="flex items-center gap-5">
              {/* Mobile Menu Button */}
              <Sheet open={isOpen} onOpenChange={setIsOpen} className="bg-gray-950">
                <SheetTrigger asChild>
                  <button className="p-2 -ml-2 text-gray-100 transition-colors bg-transparent border-none outline-none lg:hidden hover:text-white focus:outline-none focus-visible:outline-none">
                    <Menu size={24} strokeWidth={3} />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[270px] sm:w-[300px] bg-gray-100">
                  <SheetHeader>
                    <SheetTitle className="font-black text-left">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 mt-8">
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
                      <h3 className="px-4 mb-3 text-xs font-black tracking-wider text-gray-500 uppercase">
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
              <div className="items-center hidden gap-8 lg:flex">
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

                {/* Categories Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className=" -mt-1 -ml-3 group flex items-center gap-1 text-sm font-black !text-gray-100 transition-all duration-200 hover:!text-gray-950 bg-transparent border-b-2 border-transparent outline-none pb-1 focus:ring-0 focus:outline-none focus:border-none">
                      CATEGORIES
                      <ChevronDown size={16} className="text-gray-100 transition-colors group-hover:text-gray-950" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-36 z-50 bg-red-600 border-gray-900">
                    {categories.map((category) => (
                      <DropdownMenuItem key={category.name} asChild>
                        <Link
                          to={category.path}
                          className="w-full cursor-pointer text-gray-900 font-semibold"
                        >
                          {category.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Center - Logo */}
            <Link to="/" className="absolute transform -translate-x-1/2 left-1/2">
              <img
                src={logo}
                alt="Atelier Logo"
                className="object-contain w-auto h-12 transition-transform lg:h-12 hover:scale-105"
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

              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/profile"
                    className={`p-2 transition-all duration-200 hover:scale-110 ${
                      isActive('/profile')
                        ? 'text-gray-900'
                        : 'text-gray-100 hover:text-gray-950'
                    }`}
                    aria-label="User Profile"
                  >
                    <User size={22} strokeWidth={3} />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 transition-all duration-200 hover:scale-110 text-gray-100 hover:text-gray-950 bg-transparent hover:border-transparent"
                    aria-label="Logout"
                  >
                    <LogOut size={22} strokeWidth={3} />
                  </button>
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

                               // ? 'bg-gray-100 text-gray-900'
                                //: 'text-gray-700 hover:bg-gray-50 hover:text-gray-950'
