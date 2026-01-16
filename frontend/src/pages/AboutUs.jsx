import { Github } from 'lucide-react';

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Dwain',
      github: 'https://github.com/dwainXDL',
      username: 'dwainXDL',
    },
    {
      id: 2,
      name: 'Thamindu',
      github: 'https://github.com/PWTMihisara',
      username: 'PWTMihisara',
    },
    {
      id: 3,
      name: 'Ashen',
      github: 'https://github.com/drnykteresteinwayne',
      username: 'drnykteresteinwayne',
    },
    {
      id: 4,
      name: 'Thiranya',
      github: 'https://github.com/thiranya123',
      username: 'thiranya123',
    },
    {
      id: 5,
      name: 'Yameesha',
      github: 'https://github.com/Yameeshaa',
      username: 'Yameeshaa',
    },
    {
      id: 6,
      name: 'Sewwandi',
      github: 'https://github.com/kmss-sew',
      username: 'kmss-sew',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center w-full py-20 sm:py-28 md:py-36 bg-gradient-to-b from-red-600 via-red-800 to-red-950">
        <div className="container px-6 text-center">
          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            About Us
          </h1>
          <p className="max-w-xl mx-auto text-lg text-red-200 md:text-xl">
            The story behind Atelier
          </p>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container max-w-4xl px-6 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-8 font-serif text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              Our Story
            </h2>
          </div>

          <div className="space-y-6 font-serif text-lg leading-relaxed text-gray-700">
            <p>
              At Atelier, luxury is more than fashion—it is a statement of identity, confidence, and refined taste.
              Our collections are thoughtfully designed with premium fabrics, expert craftsmanship, and timeless
              silhouettes that transcend trends.
            </p>
            <p>
              Each piece reflects our commitment to quality, elegance, and sophistication, created for those who
              appreciate exclusivity and detail.
            </p>
            <p className="text-xl italic text-gray-800">
              We believe true luxury lies in how clothing makes you feel—empowered, confident, and unforgettable.
              Welcome to a world where style meets excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container max-w-4xl px-16 mx-auto">
        <div className="border-t-4 border-gray-300"></div>
      </div>

      {/* Team Section */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container max-w-6xl px-6 mx-auto">
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="mb-2 font-serif text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              Meet Our Team
            </h2>
            <p className="font-serif text-lg italic text-gray-600">
              The creative minds behind Atelier
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 sm:gap-8">
            {teamMembers.map((member) => (
              <a
                key={member.id}
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center group"
              >
                <div className="flex items-center justify-center w-24 h-24 mb-4 transition-transform duration-300 rounded-full shadow-lg sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-red-600 to-red-900 group-hover:scale-110">
                  <span className="font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="mb-1 font-serif text-lg font-bold text-gray-900 sm:text-xl">
                  {member.name}
                </h3>
                <div className="flex items-center gap-1 text-gray-500 transition-colors group-hover:text-red-700">
                  <Github className="w-4 h-4" />
                  <span className="text-sm">@{member.username}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-100 to-white">
        <div className="container max-w-3xl px-6 mx-auto text-center">
          <h2 className="mb-4 font-serif text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Experience Luxury
          </h2>
          <p className="mb-8 font-serif text-lg italic text-gray-600">
            Discover our exclusive collections crafted with passion and precision.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-4 text-base font-medium text-white transition-colors bg-black rounded-md hover:bg-gray-900"
          >
            Explore Collections
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
