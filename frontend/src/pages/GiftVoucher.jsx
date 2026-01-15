import { useState } from 'react';
import { Plus } from 'lucide-react';

// Import images
import giftBg from '../../images/gift.jpg';
import logo from '../../images/logo.png';
import logoBlack from '../../images/logo-black.png';

const GiftVoucher = () => {
  // Accordion state
  const [expandedSections, setExpandedSections] = useState({
    categories: false,
    refine: false,
    collection: true
  });

  // Gift voucher products
  const giftVouchers = [
    {
      id: 1,
      name: 'ATELIER GIFT VOUCHER -$ 100.0',
      price: 100.0,
      displayPrice: '$ 100'
    },
    {
      id: 2,
      name: 'ATELIER GIFT VOUCHER - $ 50.0',
      price: 50.0,
      displayPrice: '$ 50'
    }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Leaf/Branch SVG Component
  const LeafDecoration = () => (
    <svg width="50" height="70" viewBox="0 0 50 70" fill="none" className="absolute top-4 right-24">
      <path
        d="M25 65V15M25 15C18 15 10 8 10 2M25 15C32 15 40 8 40 2"
        stroke="#666"
        strokeWidth="1"
        fill="none"
      />
      <ellipse cx="10" cy="4" rx="4" ry="6" fill="#555" transform="rotate(-30 10 4)"/>
      <ellipse cx="40" cy="4" rx="4" ry="6" fill="#555" transform="rotate(30 40 4)"/>
      <ellipse cx="14" cy="18" rx="3" ry="5" fill="#555" transform="rotate(-20 14 18)"/>
      <ellipse cx="36" cy="18" rx="3" ry="5" fill="#555" transform="rotate(20 36 18)"/>
      <ellipse cx="17" cy="32" rx="3" ry="4" fill="#555" transform="rotate(-15 17 32)"/>
      <ellipse cx="33" cy="32" rx="3" ry="4" fill="#555" transform="rotate(15 33 32)"/>
    </svg>
  );

  // Gift Voucher Card Component
  const GiftVoucherCard = ({ voucher }) => (
    <div className="flex flex-col items-center cursor-pointer group">
      {/* Card */}
      <div className="relative w-full max-w-[380px] aspect-[1.8/1] bg-black rounded-lg overflow-hidden mb-3">
        {/* Gift Voucher text */}
        <span className="absolute top-4 left-5 italic text-gray-400 text-lg font-serif">
          Gift Voucher
        </span>

        {/* Leaf decoration */}
        <LeafDecoration />

        {/* Logo box in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="border border-gray-500 p-3">
            <img
              src={logo}
              alt="Atelier Logo"
              className="w-16 h-16 object-contain opacity-60"
            />
          </div>
          <span className="text-gray-500 text-xs tracking-[0.2em] mt-2">
            A T E L I E R
          </span>
        </div>

        {/* Price */}
        <span className="absolute bottom-4 right-5 text-gray-400 text-2xl italic font-serif">
          {voucher.displayPrice}
        </span>
      </div>

      {/* Product name and price */}
      <h3 className="text-center text-gray-900 font-medium text-base mb-0.5">
        {voucher.name}
      </h3>
      <p className="text-center text-gray-900 text-base">
        $ {voucher.price.toFixed(1)}
      </p>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Background Image with Filters */}
      <div className="relative w-1/2 min-h-screen z-10 shadow-[8px_0_25px_rgba(0,0,0,0.15)]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={giftBg}
            alt="Gift Voucher"
            className="w-full h-full object-cover object-top"
          />
          {/* Light gray overlay */}
          <div className="absolute inset-0 bg-gray-200/40"></div>
        </div>

        {/* Overlay content */}
        <div className="relative z-10 p-8 lg:p-12">
          {/* Logo with ATELIER text */}
          <div className="mb-10 flex flex-col items-center w-fit">
            <img src={logoBlack} alt="Atelier" className="w-24 h-24 object-contain" />
            <span className="text-sm tracking-[0.3em] text-gray-600 font-medium mt-2">ATELIER</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-5xl lg:text-6xl font-black tracking-[0.35em] text-gray-900 mb-12" style={{textShadow: '1px 1px 0px rgba(0,0,0,0.1)'}}>
            GIFT VOUCHER
          </h1>

          {/* Filter Sidebar */}
          <div className="max-w-sm">
            {/* Categories */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-xl italic text-gray-900">CATEGORIES</span>
                <button
                  onClick={() => toggleSection('categories')}
                  className="text-gray-900 hover:text-gray-600 bg-transparent border-none outline-none p-0"
                >
                  <Plus className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
              <div className="border-b border-gray-500 w-full"></div>
              {expandedSections.categories && (
                <div className="mt-3 pl-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-3 h-3" />
                    <span className="text-gray-800 text-sm">Gift Voucher</span>
                  </label>
                </div>
              )}
            </div>

            {/* Refine */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-xl italic text-gray-900">REFINE</span>
                <button
                  onClick={() => toggleSection('refine')}
                  className="px-4 py-1 text-xs bg-gray-600/80 text-white rounded-full hover:bg-gray-700/80"
                >
                  View all
                </button>
              </div>
              <div className="border-b border-gray-500 w-full"></div>
              {expandedSections.refine && (
                <div className="mt-3 pl-1">
                  <p className="text-gray-800 text-sm">No refinements available</p>
                </div>
              )}
            </div>

            {/* Collection */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-xl italic text-gray-900">COLLECTION</span>
                <button
                  onClick={() => toggleSection('collection')}
                  className="px-4 py-1 text-xs bg-gray-600/80 text-white rounded-full hover:bg-gray-700/80"
                >
                  clear
                </button>
              </div>
              <div className="border-b border-gray-500 w-full"></div>
            </div>

            {/* Gift Voucher Tag */}
            {expandedSections.collection && (
              <div className="bg-white/90 rounded px-3 py-2 inline-flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-gray-800"></span>
                <span className="text-gray-900 text-sm font-medium">Gift Voucher</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Gift Voucher Cards */}
      <div className="w-1/2 bg-white p-8 lg:p-12 flex flex-col justify-center items-center">
        <div className="space-y-8 w-full max-w-md">
          {giftVouchers.map((voucher) => (
            <GiftVoucherCard key={voucher.id} voucher={voucher} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftVoucher;
