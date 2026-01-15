import { Button } from '@/components/ui/button';

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
  const bestSellers = [
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
      name: 'BAGS & SHOES',
      image: bagsShoes,
      color: 'bg-purple-100'
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section - Lifestyle Edit */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Full-screen background image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Lifestyle Edit"
            className="object-cover object-center w-full h-full"
          />
        </div>

        {/* CTA overlay on the right */}
        <div className="absolute inset-0 flex items-end justify-end pb-16 pr-12 md:pb-20 md:pr-24 lg:pb-24 lg:pr-32">
          <Button
            size="lg"
            className="font-semibold tracking-wider text-white uppercase transition-all duration-300 bg-black border-none outline-none hover:bg-gray-800 hover:scale-110 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
          >
            SHOP NOW
          </Button>
        </div>
      </section>

      {/* Tagline Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-3 font-serif text-4xl font-bold text-gray-900 md:text-5xl">
            Outfits for Every Moment!
          </h2>
          <p className="font-serif text-2xl text-gray-800 md:text-3xl">
            Everywhere - Everyday - Anywhere.
          </p>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto max-w-7xl">
          <h2 className="mb-16 font-serif text-5xl font-bold text-center text-gray-900">
            Best Sellers
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <div key={product.id} className="cursor-pointer group">
                <div className="aspect-[3/4] overflow-hidden mb-4 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mb-2 text-base font-medium text-gray-900">
                  {product.name}
                </h3>
                <p className="mb-3 text-xl font-bold text-gray-900">
                  ${product.price % 1 === 0 ? product.price : product.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto max-w-7xl">
          <h2 className="mb-16 font-serif text-5xl font-bold text-center text-gray-900">
            New Arrivals
          </h2>

          {/* Overlapping/Staggered Layout - Left to Right, Going Down */}
          <div className="relative h-[500px] md:h-[650px] w-full">
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
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto max-w-7xl">
          <h2 className="mb-16 font-serif text-5xl font-bold text-center text-gray-900">
            SHOP BY CATEGORY
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative overflow-hidden cursor-pointer h-96 group"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 p-8 md:p-12">
                  {/* Category name on the left center */}
                  <div className="flex items-center h-full">
                    <h3 className="text-sm font-bold text-white md:text-7xl drop-shadow-lg">
                      {category.name}
                    </h3>
                  </div>
                  {/* Button on the bottom right */}
                  <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="font-bold tracking-wider text-black uppercase transition-all duration-300 bg-white border-none outline-none hover:bg-gray-100 hover:scale-110 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
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
      <section className="py-24 bg-white">
        <div className="container max-w-4xl px-4 mx-auto text-center">
          <h2 className="mb-4 font-serif text-5xl font-bold text-gray-900">
            FOLLOW US ON
          </h2>
          <p className="text-lg text-gray-700">
            Join our community for daily inspiration and a closer look at our creations
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
