'use client';

import { useState } from 'react';
import { NavWrapper } from '@/components/NavbarWrapper/NavWrapper';
import { useAuth } from '@/context/userContext';




const teamMembers = [
  {
    id: 1,
    name: "Solomon Kanu",
    role: "Founder & CEO",
    image: "Sk",
    bio: "Visionary leader with 15+ years in tech",
    color: "from-red-500 to-pink-500"
  },
  {
    id: 2,
    name: "Dauda Kanu",
    role: "CTO",
    image: "DK",
    bio: "Tech innovator passionate about scalable solutions",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    name: "Gifty Hemans",
    role: "Head of Design",
    image: "GH",
    bio: "Creative mind crafting beautiful experiences",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 4,
    name: "Judah Dore",
    role: "Lead Developer",
    image: "JD",
    bio: "Code architect building the future",
    color: "from-green-500 to-teal-500"
  }
];

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Innovation",
    description: "We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Collaboration",
    description: "Together we achieve more. We foster a culture of teamwork and mutual support."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Excellence",
    description: "We maintain the highest standards in everything we do, delivering quality without compromise."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Passion",
    description: "We love what we do and it shows in our work. Every project is driven by genuine enthusiasm."
  }
];

const stats = [
  { number: "500+", label: "Projects Completed" },
  { number: "50+", label: "Team Members" },
  { number: "25+", label: "Countries Served" },
  { number: "10+", label: "Years Experience" }
];

export default function AboutUs() {
  const [hoveredMember, setHoveredMember] = useState(null);
  const { authState } = useAuth();


  return (
    <NavWrapper>
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-24 sm:py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-red-600 dark:text-red-400">Our Story</span>
            </div>
            
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl mb-6">
              About <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Us</span>
            </h1>
            
            <p className="text-xl leading-8 text-gray-600 dark:text-gray-300 mb-8">
              We're a passionate team of innovators, designers, and developers dedicated to transforming ideas into exceptional digital experiences.
            </p>
            
            <div className="flex justify-center gap-4">
              <button className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-8 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105">
                Join Our Team
              </button>
              <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                Our Work
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-red-600"></div>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                We believe in the power of technology to transform businesses and improve lives. Our mission is to create innovative digital solutions that empower organizations to reach their full potential.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Founded in 2015, we've grown from a small startup to a leading force in the tech industry, serving clients across the globe with cutting-edge solutions and unwavering dedication.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Since 2015</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-32 h-32 text-red-500/30" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These principles guide everything we do and shape our company culture
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-red-600 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="text-red-500 mb-4">
                  {value.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The talented individuals behind our success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-red-600"></div>
                
                <div className="p-6">
                  <div className={`w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-3xl font-bold transition-transform duration-300 ${hoveredMember === member.id ? 'scale-110' : ''}`}>
                    {member.image}
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-red-600 dark:text-red-400 font-medium text-sm mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {member.bio}
                    </p>
                  </div>
                  
                  <div className="flex justify-center gap-3 mt-6">
                    <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 text-gray-600 dark:text-gray-400 transition-colors flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 text-gray-600 dark:text-gray-400 transition-colors flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-500 to-red-600 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptLTEwIDBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Let's create something amazing. Get in touch with our team today.
          </p>
          <button className="bg-white text-red-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
            Get Started
          </button>
        </div>
      </div>
      
    </div>
    </NavWrapper>
  );
}