import { Button, Carousel, CarouselContent, CarouselItem } from '@/components';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import Autoplay from "embla-carousel-autoplay";
import { Instagram, Facebook, Twitter, Youtube, ArrowRight } from 'lucide-react';

// Import logo
import atelierLogo from '@/assets/atelier-logo.png';

const Home = () => {
  // Fetch featured products
  const { data: featuredProducts = [], isLoading: featuredLoading, isError, error } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const response = await api.get('/products/featured');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch latest products (New Arrivals)
  const { data: latestProducts = [], isLoading: latestLoading, isError: latestError } = useQuery({
    queryKey: ['latest-products'],
    queryFn: async () => {
      const response = await api.get('/products/latest');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const categories = [
    {
      id: 1,
      name: 'KIDS',
      image: 'https://res.cloudinary.com/dclidhsza/image/upload/v1768469622/KidsCategory_vwf5cw.jpg',
    },
    {
      id: 2,
      name: 'WOMENS',
      image: 'https://res.cloudinary.com/dclidhsza/image/upload/v1768469641/WomenCategory_xklrnr.avif',
    },
    {
      id: 3,
      name: 'MENS',
      image: 'https://res.cloudinary.com/dclidhsza/image/upload/v1768469628/MensCategory_yearvo.webp',
    },
    {
      id: 4,
      name: 'ACCESSORIES',
      image: 'https://res.cloudinary.com/dclidhsza/image/upload/v1768469616/Bag_ShoesCategory_uhpwhe.webp',
    }
  ];

  return (
    <div className="w-full">

      {/* Hero Section */}
      <section className="relative w-full min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gradient-to-b from-red-600 via-red-800 to-red-950">
        <div className="container text-center px-11">
          {/* Logo */}
          <div className="flex justify-center mb-3 sm:mb-3">
            <img
              src={atelierLogo}
              alt="Atelier"
              className="object-contain w-auto h-48 md:h-60 lg:h-72"
            />
          </div>

          {/* Heading */}
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl text-foreground">
            Timeless Elegance,<br />Modern Style
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-base font-black leading-relaxed mb-7 sm:mb-10 md:text-2xl text-red-950">
            Every piece tells a story...
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              variant="thamindu"
              className="w-64 h-12 px-8 py-6 text-base text-white bg-black sm:w-72 hover:bg-gray-950"
            >
              Shop Collection
            </Button>
            <Button
              variant="thamindu"
              className="w-64 h-12 px-8 py-6 text-base text-black bg-white border-2 border-black sm:w-72 hover:bg-black hover:text-white"
            >
              Explore New Arrivals
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute -translate-x-1/2 bottom-8 left-1/2">
            <div className="flex flex-col items-center animate-bounce">
              <span className="mb-2 text-xs text-gray-950">SCROLL</span>
              <div className="w-px h-12 bg-gradient-to-b from-gray-900 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section with Carousel */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="mb-8 -mt-2 text-center sm:mb-12">
          <h2 className="font-serif text-3xl font-bold text-gray-900  mb:1 sm:mb-1 sm:text-4xl md:text-5xl">
            Featured
          </h2>
            <p className="font-serif text-lg italic"> Browse our collection </p>
          </div>  

          {featuredLoading ? (
            <div className="py-12 text-center text-gray-500">Loading featured products...</div>
          ) : isError ? (
            <div className="py-12 text-center">
              <p className="text-red-600">Error loading featured products</p>
              <p className="mt-2 text-sm text-gray-500">{error?.message || 'Please try again later'}</p>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-600">No featured items available</p>
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {featuredProducts.map((product) => (
                  <CarouselItem key={product.pId} className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div className="cursor-pointer group">
                      <div className="aspect-[3/4] overflow-hidden mb-4 bg-gray-100 rounded-lg">
                        <img
                          src={product.pImageUrl}
                          alt={product.pName}
                          loading="lazy"
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="font-serif text-xl italic font-bold">
                        {product.pName}
                      </h3>
                      <p className="mb-3 font-serif text-lg italic font-medium sm:text-xl">
                        ${product.pPrice % 1 === 0 ? product.pPrice : product.pPrice.toFixed(2)}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="container px-32 mx-auto max-w-7xl">
        <div className="border-t-4 border-gray-300"></div>
      </div>

      {/* New Arrivals Section - Fetched from Database */}
      <section className="py-12 -mt-2 sm:py-16 md:py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="mb-8 font-serif text-center md:mb-16 sm:mb-12">
          <h2 className="mb-1 text-3xl font-bold text-gray-900  sm:text-4xl md:text-5xl">
              New Arrivals
          </h2>
          <p className="italic"> Check out whats new! </p> 
          </div>

          {latestLoading ? (
            <div className="py-12 text-center text-gray-500">Loading latest products...</div>
          ) : latestError ? (
            <div className="py-12 text-center">
              <p className="text-red-600">Error loading latest products</p>
            </div>
          ) : latestProducts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-600">No new arrivals available</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {latestProducts.map((product) => (
                <div key={product.pId} className="cursor-pointer group">
                  <div className="aspect-[3/4] overflow-hidden mb-4 bg-gray-100 rounded-lg">
                    <img
                      src={product.pImageUrl}
                      alt={product.pName}
                      loading="lazy"
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="font-serif italic">
                  <h3 className="mb-2 text-sm font-bold text-gray-900 sm:text-base">
                    {product.pName}
                  </h3>
                  <p className="mb-1 text-xs text-gray-500 uppercase">{product.pGender}</p>
                  <p className="text-lg text-gray-900 sm:text-xl">
                    ${product.pPrice % 1 === 0 ? product.pPrice : product.pPrice.toFixed(2)}
                  </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

       {/* Divider */}
      <div className="container px-32 mx-auto mb-8 max-w-7xl sm:mb-0">
        <div className="border-t-4 border-gray-300"></div>
      </div>

      {/* Shop by Category Section */}
      <section className="py-12sm:py-16 md:py-20">
        <div className="container px-5 mx-auto max-w-7xl">
          <div className="mb-8 font-serif text-center md:mb-16 sm:mb-12">
          <h2 className="mb-1 text-3xl font-bold text-gray-900  sm:text-4xl md:text-5xl">
              Shop By Category
          </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative h-64 overflow-hidden cursor-pointer sm:h-80 md:h-96 group"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 p-4 sm:p-6 md:p-8 lg:p-12">
                  {/* Category name on the left center */}
                  <div className="flex items-center h-full">
                    <h3 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl drop-shadow-lg">
                      {category.name}
                    </h3>
                  </div>
                  {/* Button on the bottom right */}
                  <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12">
                    <Button
                      variant="thamindu"
                      className="p-3 text-black bg-white rounded-full sm:p-4 hover:bg-gray-100 hover:scale-110"
                    >
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container px-32 mx-auto mb-8 max-w-7xl sm:mb-0 sm:mt-0 mt-14 ">
        <div className="border-t-4 border-gray-300 "></div>
      </div>

      {/* Follow Us On Section */}
      <section className="py-16 -mt-10 sm:py-20 md:py-24 sm:-mt-4">
        <div className="container max-w-4xl px-4 mx-auto text-center">
          <h2 className="mb-1 font-serif text-3xl font-bold text-gray-900 sm:mb-4 sm:text-4xl md:text-5xl">
            Follow Us On
          </h2>
          <p className="font-serif text-base italic text-gray-700  sm:text-lg">
            Join to see where we get our inspiration!
          </p>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 mt-1">
            <button className="p-3 transition-all duration-300 bg-gray-100 rounded-full hover:bg-gray-900 hover:text-white group">
              <Instagram className="w-6 h-6 text-gray-900 transition-colors group-hover:text-white" strokeWidth={3} />
            </button>
            <button className="p-3 transition-all duration-300 bg-gray-100 rounded-full hover:bg-gray-900 hover:text-white group">
              <Facebook className="w-6 h-6 text-gray-900 transition-colors group-hover:text-white" strokeWidth={3} />
            </button>
            <button className="p-3 transition-all duration-300 bg-gray-100 rounded-full hover:bg-gray-900 hover:text-white group">
              <Twitter className="w-6 h-6 text-gray-900 transition-colors group-hover:text-white" strokeWidth={3} />
            </button>
            <button className="p-3 transition-all duration-300 bg-gray-100 rounded-full hover:bg-gray-900 hover:text-white group">
              <Youtube className="w-6 h-6 text-gray-900 transition-colors group-hover:text-white" strokeWidth={3} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
