import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import local images
import heroImage from '../../images/Home.jpg';
import bestSeller1 from '../../images/BestSellers-1.jpeg';
import bestSeller2 from '../../images/BestSellers-2.jpeg';
import bestSeller3 from '../../images/BestSellers-3.jpeg';
import bestSeller4 from '../../images/BestSellers-4.jpeg';
import newArrival1 from '../../images/NewArrival-1.jpeg';
import newArrival2 from '../../images/NewArrival-2.jpeg';
import newArrival3 from '../../images/NewArrival-3.jpeg';
import newArrival4 from '../../images/NewArrival-4.jpeg';
import bagsShoes from '../../images/Bag&ShoesCategory.webp';
import kidsCategory from '../../images/KidsCategory.jpeg';
import womenCategory from '../../images/WomenCategory.avif';
import menCategory from '../../images/MensCategory.webp';

const Home = () => {
  // Sample product data - replace with real data from API later
  const featuredProducts = [
    {
      id: 1,
      name: 'Atelier Black Off shoulder Top',
      price: 11.20,
      image: bestSeller1
    },
    {
      id: 2,
      name: 'Atelier Brown Mid Dress',
      price: 14,
      image: bestSeller2
    },
    {
      id: 3,
      name: 'Atelier White T-Shirt',
      price: 12.60,
      image: bestSeller3
    },
    {
      id: 4,
      name: 'Atelier Off White Full Kit',
      price: 20.10,
      image: bestSeller4
    }
  ];

  const newArrivals = [
    {
      id: 1,
      image: newArrival1
    },
    {
      id: 2,
      image: newArrival2
    },
    {
      id: 3,
      image: newArrival3
    },
    {
      id: 4,
      image: newArrival4
    }
  ];

  const categories = [
    {
      id: 1,
      name: 'KIDS',
      image: kidsCategory,
      color: 'bg-blue-100'
    },
    {
      id: 2,
      name: 'WOMENS',
      image: womenCategory,
      color: 'bg-pink-100'
    },
    {
      id: 3,
      name: 'MENS',
      image: menCategory,
      color: 'bg-gray-100'
    },
    {
      id: 4,
      name: 'ACCESSORIES',
      image: bagsShoes,
      color: 'bg-purple-100'
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section - Lifestyle Edit */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden">
        {/* Full-screen background image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Lifestyle Edit"
            className="object-cover w-full h-full"
            style={{ objectPosition: 'center 20%' }}
          />
        </div>

        {/* CTA overlay on the right */}
        <div className="absolute inset-0 flex items-end justify-center pb-12 sm:justify-end sm:pb-16 sm:pr-8 md:pb-20 md:pr-16 lg:pb-24 lg:pr-32">
          <Button
            size="lg"
            className="px-6 py-2 text-sm font-semibold tracking-wider text-white uppercase transition-all duration-300 bg-black border-none outline-none sm:px-8 sm:py-3 sm:text-base hover:bg-gray-800 hover:scale-110 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
          >
            SHOP NOW
          </Button>
        </div>
      </section>

      {/* Tagline Section */}
      <section className="py-12 bg-white sm:py-16 md:py-20">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-3 font-serif text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
            Outfits for Every Moment!
          </h2>
          <p className="font-serif text-lg text-gray-800 sm:text-xl md:text-2xl lg:text-3xl">
            Everywhere - Everyday - Anywhere.
          </p>
        </div>
      </section>

      {/* Featured Products Section with Carousel */}
      <section className="py-12 bg-white sm:py-16 md:py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <h2 className="mb-8 font-serif text-3xl font-bold text-center text-gray-900 sm:mb-12 sm:text-4xl md:text-5xl md:mb-16">
            Featured
          </h2>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredProducts.map((product) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="cursor-pointer group">
                    <div className="aspect-[3/4] overflow-hidden mb-4 bg-gray-100 rounded-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="mb-2 text-sm font-medium text-gray-900 sm:text-base">
                      {product.name}
                    </h3>
                    <p className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                      ${product.price % 1 === 0 ? product.price : product.price.toFixed(2)}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden lg:block">
              <CarouselPrevious className="left-0 -translate-x-12" />
              <CarouselNext className="right-0 translate-x-12" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-12 bg-white sm:py-16 md:py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <h2 className="mb-8 font-serif text-3xl font-bold text-center text-gray-900 sm:mb-12 sm:text-4xl md:text-5xl md:mb-16">
            New Arrivals
          </h2>

          {/* Overlapping/Staggered Layout - Left to Right, Going Down */}
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] w-full">
            {/* Image 1 - Woman on stairs (Left, Highest) */}
            <div className="absolute left-[2%] md:left-[5%] top-0 w-[35%] md:w-[22%] h-[70%] cursor-pointer group overflow-hidden shadow-lg z-10">
              <img
                src={newArrivals[0].image}
                alt="New Arrival 1"
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Image 2 - Blue dress (Center Left, Going Down) */}
            <div className="absolute left-[22%] md:left-[20%] top-[10%] w-[35%] md:w-[25%] h-[75%] cursor-pointer group overflow-hidden shadow-lg z-20">
              <img
                src={newArrivals[1].image}
                alt="New Arrival 2"
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Image 3 - Man in polo (Center Right, Going Further Down) */}
            <div className="absolute left-[48%] md:left-[40%] top-[20%] w-[38%] md:w-[28%] h-[75%] cursor-pointer group overflow-hidden shadow-lg z-30">
              <img
                src={newArrivals[2].image}
                alt="New Arrival 3"
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Image 4 - Man in green shirt (Right, Lowest) */}
            <div className="absolute right-[2%] md:right-[5%] top-[30%] w-[42%] md:w-[30%] h-[70%] cursor-pointer group overflow-hidden shadow-lg z-40">
              <img
                src={newArrivals[3].image}
                alt="New Arrival 4"
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="py-12 bg-white sm:py-16 md:py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <h2 className="mb-8 font-serif text-3xl font-bold text-center text-gray-900 sm:mb-12 sm:text-4xl md:text-5xl md:mb-16">
            SHOP BY CATEGORY
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative overflow-hidden cursor-pointer h-64 sm:h-80 md:h-96 group"
              >
                <img
                  src={category.image}
                  alt={category.name}
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
                      variant="secondary"
                      size="lg"
                      className="px-4 py-2 text-xs font-bold tracking-wider text-black uppercase transition-all duration-300 bg-white border-none outline-none sm:px-6 sm:py-3 sm:text-sm md:text-base hover:bg-gray-100 hover:scale-110 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                    >
                      SHOP NOW
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Follow Us On Section */}
      <section className="py-16 bg-white sm:py-20 md:py-24">
        <div className="container max-w-4xl px-4 mx-auto text-center">
          <h2 className="mb-3 font-serif text-3xl font-bold text-gray-900 sm:mb-4 sm:text-4xl md:text-5xl">
            FOLLOW US ON
          </h2>
          <p className="text-base text-gray-700 sm:text-lg">
            Join our community for daily inspiration and a closer look at our creations
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
