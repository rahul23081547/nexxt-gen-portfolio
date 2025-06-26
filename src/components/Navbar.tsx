import React, { useState, useEffect, useRef } from 'react';
import { Triangle, X } from 'lucide-react';

interface NavbarProps {
  isVisible?: boolean;
  onRealityShift?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isVisible = true, onRealityShift }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isLongPressing, setIsLongPressing] = useState(false);
  
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Hover handlers for glitch effect
  const handleLogoMouseEnter = () => {
    hoverTimerRef.current = setTimeout(() => {
      setIsGlitching(true);
    }, 3000);
  };

  const handleLogoMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setIsGlitching(false);
  };

  // Long press handlers for reality shift
  const handleLongPressStart = () => {
    setIsLongPressing(true);
    longPressTimerRef.current = setTimeout(() => {
      if (onRealityShift) {
        onRealityShift();
      }
      setIsLongPressing(false);
    }, 3000);
  };

  const handleLongPressEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    setIsLongPressing(false);
  };

  // Combined event handlers
  const handleLogoMouseDown = () => {
    handleLongPressStart();
  };

  const handleLogoMouseUp = () => {
    handleLongPressEnd();
  };

  const handleLogoTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleLongPressStart();
  };

  const handleLogoTouchEnd = () => {
    handleLongPressEnd();
  };

  // Updated nav items - removed "Design Interests"
  const navItems = ['Home', 'About', 'Timeline', 'Case Studies', 'Contact'];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isVisible ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-full opacity-0'
        } ${
          isScrolled 
            ? 'bg-dark-900/80 backdrop-blur-lg py-3 shadow-lg border-b border-dark-700/30' 
            : 'bg-dark-900/60 backdrop-blur-md py-5 border-b border-dark-700/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Enhanced 3D Logo with Glitch Effect */}
            <div 
              className={`flex items-center space-x-2 text-primary-500 transition-all duration-300 hover:text-primary-400 cursor-pointer perspective-1000 group ${
                isGlitching ? 'animate-glitch' : ''
              } ${
                isLongPressing ? 'scale-110' : ''
              }`}
              style={{ transformStyle: 'preserve-3d' }}
              onMouseEnter={handleLogoMouseEnter}
              onMouseLeave={handleLogoMouseLeave}
              onMouseDown={handleLogoMouseDown}
              onMouseUp={handleLogoMouseUp}
              onTouchStart={handleLogoTouchStart}
              onTouchEnd={handleLogoTouchEnd}
            >
              {/* 3D Triangle with Enhanced Depth */}
              <div className="relative">
                <Triangle 
                  className={`h-8 w-8 transform rotate-180 fill-primary-500 stroke-primary-500 transition-all duration-500 ${
                    isGlitching ? 'drop-shadow-2xl' : 'drop-shadow-lg'
                  } ${
                    isLongPressing ? 'scale-125 rotate-[225deg]' : 'group-hover:scale-110 group-hover:rotate-[200deg]'
                  }`}
                  style={{
                    transform: `rotateY(15deg) rotateX(5deg) translateZ(10px)`,
                    filter: isGlitching ? 'hue-rotate(180deg) saturate(2)' : 'none'
                  }}
                />
                
                {/* 3D Glow Effect */}
                <div className={`absolute inset-0 bg-primary-500/30 blur-xl rounded-full transition-all duration-500 ${
                  isGlitching || isLongPressing ? 'opacity-100 scale-150' : 'opacity-0 group-hover:opacity-70 group-hover:scale-125'
                }`}></div>
                
                {/* Orbital Rings for 3D Effect */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${
                  isGlitching || isLongPressing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  <div className="absolute inset-0 border border-primary-500/40 rounded-full animate-spin" style={{ animationDuration: '4s' }}></div>
                  <div className="absolute inset-1 border border-primary-400/30 rounded-full animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }}></div>
                </div>

                {/* Long Press Progress Ring */}
                {isLongPressing && (
                  <div className="absolute inset-0 border-2 border-primary-300 rounded-full">
                    <div className="absolute inset-0 border-2 border-transparent border-t-primary-500 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
                  </div>
                )}
              </div>

              {/* Enhanced Text with 3D Effect */}
              <span 
                className={`text-xl font-bold transition-all duration-500 ${
                  isGlitching ? 'text-primary-300' : ''
                } ${
                  isLongPressing ? 'scale-110 text-primary-300' : 'hidden sm:block'
                }`}
                style={{
                  transform: 'translateZ(5px)',
                  textShadow: isGlitching ? '2px 2px 4px rgba(255, 0, 0, 0.5), -2px -2px 4px rgba(0, 255, 255, 0.3)' : '1px 1px 2px rgba(0, 0, 0, 0.5)'
                }}
              >
                Rahul
              </span>

              {/* Reality Shift Indicator */}
              {isLongPressing && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-primary-400 animate-pulse whitespace-nowrap">
                  Hold to switch realities...
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-300 hover:text-primary-500 transition-all duration-300 font-medium relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-300 focus:outline-none z-60 relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Drawer - Slide from Right */}
      <div className={`fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-dark-900/90 backdrop-blur-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden border-l border-dark-700/50 shadow-2xl ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full p-6">
          {/* Close Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={closeMobileMenu}
              className="text-gray-300 hover:text-primary-500 transition-colors duration-300 p-2 rounded-full hover:bg-dark-800/50"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 space-y-2">
            {navItems.map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="block text-lg text-gray-300 hover:text-primary-500 transition-all duration-300 font-medium py-4 px-4 rounded-lg hover:bg-dark-800/50 border-b border-dark-700/30 hover:border-primary-500/30 transform hover:translate-x-2"
                onClick={closeMobileMenu}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: isMobileMenuOpen ? 'slide-in-right 0.5s ease-out forwards' : 'none'
                }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Footer Info */}
          <div className="pt-8 border-t border-dark-700/30">
            <div className="flex items-center space-x-2 text-primary-500 mb-4">
              <Triangle className="h-6 w-6 transform rotate-180 fill-primary-500 stroke-primary-500" />
              <span className="text-lg font-bold">Rahul</span>
            </div>
            <p className="text-sm text-gray-400">
              UI/UX Designer & Creative Technologist
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;