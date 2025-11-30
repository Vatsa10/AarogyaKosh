"use client";

import { useState } from 'react';

export default function TubeLightNavbar() {
  const [activeItem, setActiveItem] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', icon: '🏠' },
    { name: 'About', icon: '👤' },
    { name: 'Experience', icon: '💼' },
    { name: 'Projects', icon: '🚀' },
    { name: 'Contact', icon: '✉️' }
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-20">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <div className="flex justify-center pt-8">
          <div className="relative flex items-center justify-center rounded-full bg-neutral-800/90 backdrop-blur-md px-2 py-2 shadow-lg">
            {/* Floating animated emojis with glow */}
            <div className="absolute -top-8 -left-4 text-2xl animate-bounce" style={{animationDuration: '3s', animationDelay: '0s', filter: 'drop-shadow(0 0 8px rgba(255, 255, 100, 0.6))'}}>
              ⚡
            </div>
            <div className="absolute -top-6 -right-6 text-xl animate-spin" style={{animationDuration: '8s', filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.4))'}}>
              ✨
            </div>
            <div className="absolute -bottom-4 left-8 text-lg animate-pulse" style={{animationDuration: '2s', filter: 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.6))'}}>
              🔮
            </div>
            <div className="absolute -bottom-6 right-8 text-xl animate-bounce" style={{animationDuration: '2.5s', animationDelay: '1s', filter: 'drop-shadow(0 0 8px rgba(100, 200, 255, 0.6))'}}>
              💫
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
                  <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 text-lg transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 ${activeItem === item.name ? 'opacity-100 -translate-y-2' : ''}`}>
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
          <div className="relative flex items-center justify-center rounded-full bg-neutral-800/90 backdrop-blur-md px-2 py-2 shadow-lg">
            {/* Mobile floating emojis with glow */}
            <div className="absolute -top-6 -left-2 text-lg animate-bounce" style={{animationDuration: '3s', filter: 'drop-shadow(0 0 6px rgba(255, 255, 100, 0.6))'}}>
              ⚡
            </div>
            <div className="absolute -top-4 -right-3 text-sm animate-spin" style={{animationDuration: '8s', filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.4))'}}>
              ✨
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="px-4 py-2 rounded-full text-white text-sm font-medium relative group"
            >
              <span className="flex items-center gap-2">
                {isMenuOpen ? 'Close' : 'Menu'}
                <span className="text-lg">{isMenuOpen ? '🔒' : '📱'}</span>
              </span>
              {/* Mobile menu icon animation */}
              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-lg transition-all duration-300 opacity-0 group-hover:opacity-100">
                {isMenuOpen ? '👋' : '👆'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-4 right-4 z-20">
            <div className="bg-neutral-800/90 backdrop-blur-md rounded-2xl shadow-lg p-4 relative overflow-hidden">
              {/* Mobile menu floating emojis with glow */}
              <div className="absolute top-2 left-2 text-lg animate-pulse" style={{filter: 'drop-shadow(0 0 8px rgba(147, 51, 234, 0.6))'}}>🔮</div>
              <div className="absolute top-2 right-2 text-sm animate-bounce" style={{animationDuration: '2s', filter: 'drop-shadow(0 0 6px rgba(100, 200, 255, 0.6))'}}>💫</div>
              <div className="absolute bottom-2 left-2 text-sm animate-spin" style={{animationDuration: '6s', filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.4))'}}>✨</div>
              
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
                    <span className="text-lg">{item.icon}</span>
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
