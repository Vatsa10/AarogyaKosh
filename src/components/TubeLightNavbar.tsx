"use client";

import { useState } from 'react';

// SVG Icon Components
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const RocketIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LightningIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const SparkleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const CrystalIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const HandIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
  </svg>
);

export default function TubeLightNavbar() {
  const [activeItem, setActiveItem] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', icon: <HomeIcon /> },
    { name: 'About', icon: <UserIcon /> },
    { name: 'Experience', icon: <BriefcaseIcon /> },
    { name: 'Projects', icon: <RocketIcon /> },
    { name: 'Contact', icon: <MailIcon /> }
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-20">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <div className="flex justify-center pt-8">
          <div className="relative flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl px-2 py-2 shadow-lg border border-white/20">
            {/* Floating animated SVG icons with glow */}
            <div className="absolute -top-8 -left-4 text-2xl animate-bounce text-white" style={{animationDuration: '3s', animationDelay: '0s', filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))'}}>
              <LightningIcon />
            </div>
            <div className="absolute -top-6 -right-6 text-xl animate-spin text-white" style={{animationDuration: '8s', filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.6))'}}>
              <SparkleIcon />
            </div>
            <div className="absolute -bottom-4 left-8 text-lg animate-pulse text-white" style={{animationDuration: '2s', filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.6))'}}>
              <CrystalIcon />
            </div>
            <div className="absolute -bottom-6 right-8 text-xl animate-bounce text-white" style={{animationDuration: '2.5s', animationDelay: '1s', filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))'}}>
              <RocketIcon />
            </div>
            
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => setActiveItem(item.name)}
                className={`relative px-6 py-2 rounded-full text-white text-sm font-medium transition-all duration-300 group
                  ${activeItem === item.name ? 'bg-neutral-700 shadow-inner' : 'hover:text-neutral-300'}`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {item.name}
                  {/* Icon that appears on hover */}
                  <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 text-lg transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 text-white ${activeItem === item.name ? 'opacity-100 -translate-y-2' : ''}`}>
                    {item.icon}
                  </span>
                </span>
                
                {/* Glowing effect for active item */}
                {activeItem === item.name && (
                  <>
                    <span className="absolute inset-0 rounded-full overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full animate-pulse" />
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
                    </span>
                    <span className="absolute inset-0 rounded-full shadow-lg shadow-purple-500/30" />
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden">
        <div className="flex justify-center pt-6 px-4">
          <div className="relative flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl px-2 py-2 shadow-lg border border-white/20">
            {/* Mobile floating SVG icons with glow */}
            <div className="absolute -top-6 -left-2 text-lg animate-bounce text-white" style={{animationDuration: '3s', filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.6))'}}>
              <LightningIcon />
            </div>
            <div className="absolute -top-4 -right-3 text-sm animate-spin text-white" style={{animationDuration: '8s', filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))'}}>
              <SparkleIcon />
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="px-4 py-2 rounded-full text-white text-sm font-medium relative group"
            >
              <span className="flex items-center gap-2">
                {isMenuOpen ? 'Close' : 'Menu'}
                <span className="text-lg">{isMenuOpen ? <CloseIcon /> : <MenuIcon />}</span>
              </span>
              {/* Mobile menu icon animation */}
              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-lg transition-all duration-300 opacity-0 group-hover:opacity-100 text-white">
                <HandIcon />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-4 right-4 z-20">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-4 relative overflow-hidden border border-white/20">
              {/* Mobile menu floating SVG icons with glow */}
              <div className="absolute top-2 left-2 text-lg animate-pulse text-white" style={{filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))'}}>
                <CrystalIcon />
              </div>
              <div className="absolute top-2 right-2 text-sm animate-bounce text-white" style={{animationDuration: '2s', filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.6))'}}>
                <RocketIcon />
              </div>
              <div className="absolute bottom-2 left-2 text-sm animate-spin text-white" style={{animationDuration: '6s', filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))'}}>
                <SparkleIcon />
              </div>
              
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveItem(item.name);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-full text-white text-sm font-medium transition-all duration-300 text-left relative group
                    ${activeItem === item.name ? 'bg-neutral-700' : 'hover:text-neutral-300'}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg text-white">{item.icon}</span>
                    {item.name}
                  </span>
                  
                  {/* Mobile glowing effect for active item */}
                  {activeItem === item.name && (
                    <span className="absolute inset-0 rounded-full overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full animate-pulse" />
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
                      <span className="absolute inset-0 rounded-full shadow-lg shadow-purple-500/30" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
