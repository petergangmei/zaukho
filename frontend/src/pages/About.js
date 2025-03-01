import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common';

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
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'url(https://via.placeholder.com/1920x1080?text=Cinema+Background)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About ZAUKHO</h1>
            <p className="text-xl text-gray-300 mb-8">Revolutionizing the way you experience cinema and television.</p>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <svg className="w-6 h-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Our Mission
                </h2>
                <p className="text-gray-300 text-lg">{companyInfo.mission}</p>
              </div>
              
              <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <svg className="w-6 h-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Our Vision
                </h2>
                <p className="text-gray-300 text-lg">{companyInfo.vision}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-black bg-opacity-50 rounded-lg border border-gray-800">
                  <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">{stat.value}</div>
                  <div className="text-gray-400 uppercase tracking-wider text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="space-y-6 text-gray-300">
                <p>
                  Founded in {companyInfo.founded} in {companyInfo.headquarters}, ZAUKHO began with a simple idea: to create a streaming platform that puts quality and affordability first.
                </p>
                <p>
                  Our journey started when a group of entertainment industry veterans and tech innovators came together with a shared frustration about the fragmented streaming landscape. We believed that viewers deserved better – a single platform with premium content at reasonable prices.
                </p>
                <p>
                  What began as a small startup has quickly grown into a global streaming service, available in over 190 countries. We've built partnerships with major studios and independent filmmakers alike, curating a diverse library that spans genres, languages, and cultures.
                </p>
                <p>
                  Today, ZAUKHO continues to push the boundaries of what a streaming service can be. We're not just a platform for watching content – we're building a community of entertainment lovers who share our passion for great storytelling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Leadership</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {companyInfo.team.map((member, index) => (
              <div key={index} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 transition-transform duration-300 hover:scale-105">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover object-center"
                />
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
      
      {/* Values Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Quality First</h3>
                <p className="text-gray-300">We believe in quality over quantity. Every title on our platform is carefully selected to ensure an exceptional viewing experience.</p>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Global Perspective</h3>
                <p className="text-gray-300">We celebrate diversity in storytelling, bringing content from around the world to global audiences and breaking down cultural barriers.</p>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">User Privacy</h3>
                <p className="text-gray-300">We respect your privacy and are committed to protecting your data. We believe in transparency and giving you control over your information.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-t from-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the ZAUKHO Community</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience the future of entertainment today with our growing library of premium content.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.location.href = '/register'}
            >
              Start Your Free Trial
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => window.location.href = '/pricing'}
            >
              View Plans
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 