import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  // Company data
  const companyInfo = {
    founded: 2023,
    headquarters: "San Francisco, CA",
    team: [
      {
        name: "Jane Doe",
        position: "CEO & Founder",
        bio: "Former Netflix executive with 15 years of experience in the streaming industry.",
        image: "https://via.placeholder.com/200x200?text=Jane+Doe"
      },
      {
        name: "John Smith",
        position: "CTO",
        bio: "Tech innovator with background in media streaming technologies and cloud infrastructure.",
        image: "https://via.placeholder.com/200x200?text=John+Smith"
      },
      {
        name: "Sarah Johnson",
        position: "Content Director",
        bio: "Award-winning producer with connections to major studios worldwide.",
        image: "https://via.placeholder.com/200x200?text=Sarah+Johnson"
      }
    ],
    mission: "To bring premium cinematic experiences to audiences worldwide through innovative digital distribution at affordable prices.",
    vision: "A world where quality entertainment is accessible to everyone, everywhere, at any time."
  };

  // Stats 
  const stats = [
    { label: "Movies", value: "5,000+" },
    { label: "TV Shows", value: "850+" },
    { label: "Countries", value: "190+" },
    { label: "Subscribers", value: "2M+" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'url(https://via.placeholder.com/1920x1080?text=Cinema+Background)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Zaukho</h1>
            <p className="text-xl text-gray-300 mb-8">Revolutionizing the way you experience cinema and television.</p>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-800 p-8 rounded-lg transform hover:scale-105 transition duration-300">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Our Mission
              </h2>
              <p className="text-gray-300 leading-relaxed">{companyInfo.mission}</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg transform hover:scale-105 transition duration-300">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Our Vision
              </h2>
              <p className="text-gray-300 leading-relaxed">{companyInfo.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg transform hover:scale-105 transition duration-300">
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">{stat.value}</div>
                <div className="text-gray-400 uppercase tracking-wider text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="inline-block border-b-4 border-red-600 pb-1">Our Story</span>
            </h2>
            <div className="space-y-6 text-gray-300">
              <p>
                Founded in {companyInfo.founded}, Zaukho began with a simple idea: make premium movies and TV shows accessible to everyone at affordable prices.
              </p>
              <p>
                In a market dominated by expensive subscriptions and limited catalogs, we saw an opportunity to create a platform that offers both flexibility and value. Our pay-per-view model combined with budget-friendly subscription tiers allows viewers to choose exactly how they want to enjoy their entertainment.
              </p>
              <p>
                Based in {companyInfo.headquarters}, our team brings together experts from the film industry, technology sector, and content distribution. We've partnered with major studios, independent filmmakers, and television networks to build a diverse library that caters to all tastes and preferences.
              </p>
              <p>
                Today, Zaukho is more than just a streaming service — we're a community of film and television enthusiasts dedicated to delivering exceptional entertainment experiences. With customers in over 190 countries, we continue to grow and evolve based on viewer feedback and industry innovations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="inline-block border-b-4 border-red-600 pb-1">Leadership Team</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {companyInfo.team.map((member, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
                <div className="aspect-w-1 aspect-h-1">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-red-500 mb-4">{member.position}</p>
                  <p className="text-gray-400">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="inline-block border-b-4 border-red-600 pb-1">Frequently Asked Questions</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">How is Zaukho different from other streaming platforms?</h3>
                <p className="text-gray-300">Unlike most streaming services that require expensive monthly subscriptions, Zaukho offers both pay-per-view options and flexible subscription tiers. This means you can choose to rent individual titles or gain unlimited access through a subscription.</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Do you offer new releases?</h3>
                <p className="text-gray-300">Yes! We partner with studios to bring you new releases shortly after their theatrical runs, often sooner than other streaming platforms. Premium members get early access to select new releases.</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">What devices can I watch Zaukho on?</h3>
                <p className="text-gray-300">Zaukho is available on all major devices including smartphones, tablets, smart TVs, gaming consoles, and desktop browsers. Our apps are designed to provide the best viewing experience regardless of your device.</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Is there a free trial available?</h3>
                <p className="text-gray-300">Yes, we offer a 14-day free trial for all new subscribers. This gives you access to our entire catalog so you can experience the full range of content before committing to a subscription.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-900 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Watching?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join millions of viewers enjoying premium content at affordable prices.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/pricing" className="px-8 py-4 bg-white text-red-900 text-lg font-bold rounded-md hover:bg-gray-100 transition">
              View Pricing
            </Link>
            <Link to="/register" className="px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-bold rounded-md hover:bg-white/10 transition">
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 