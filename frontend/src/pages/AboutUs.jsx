import { Github } from 'lucide-react';

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Dwain',
      github: 'https://github.com/orgs/NSBM-SE-Projects/people/dwainXDL',
      username: 'dwainXDL',
    },
    {
      id: 2,
      name: 'Thamindu',
      github: 'https://github.com/orgs/NSBM-SE-Projects/people/PWTMihisara',
      username: 'PWTMihisara',
    },
    {
      id: 3,
      name: 'Ashen',
      github: 'https://github.com/orgs/NSBM-SE-Projects/people/drnykteresteinwayne',
      username: 'drnykteresteinwayne',
    },
    {
      id: 4,
      name: 'Thiranya',
      github: 'https://github.com/orgs/NSBM-SE-Projects/people/thiranya123',
      username: 'thiranya123',
    },
    {
      id: 5,
      name: 'Yameesha',
      github: 'https://github.com/orgs/NSBM-SE-Projects/people/Yameeshaa',
      username: 'Yameeshaa',
    },
    {
      id: 6,
      name: 'Sewwandi',
      github: 'https://github.com/orgs/NSBM-SE-Projects/people/kmss-sew',
      username: 'kmss-sew',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full py-20 sm:py-28 md:py-36 flex items-center justify-center bg-gradient-to-b from-red-600 via-red-800 to-red-950">
        <div className="container px-6 text-center">
          <h1 className="mb-4 font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-red-200 max-w-xl mx-auto">
            The story behind Atelier
          </p>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container px-6 mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Our Story
            </h2>
          </div>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-serif">
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
      <div className="container max-w-4xl mx-auto px-16">
        <div className="border-t-4 border-gray-300"></div>
      </div>

      {/* Team Section */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container px-6 mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 italic font-serif">
              The creative minds behind Atelier
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {teamMembers.map((member) => (
              <a
                key={member.id}
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-lg">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <div className="flex items-center gap-1 text-gray-500 group-hover:text-red-700 transition-colors">
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
        <div className="container px-6 mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Experience Luxury
          </h2>
          <p className="text-lg text-gray-600 mb-8 font-serif italic">
            Discover our exclusive collections crafted with passion and precision.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-4 text-base font-medium text-white bg-black hover:bg-gray-900 transition-colors rounded-md"
          >
            Explore Collections
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
