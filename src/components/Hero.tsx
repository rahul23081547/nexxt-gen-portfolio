import React, { useEffect, useState, lazy, Suspense } from 'react';
import { ChevronDown } from 'lucide-react';

// Lazy load Spline component
const Spline = lazy(() => import('@splinetool/react-spline'));

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onSplineLoad = () => {
    setSplineLoaded(true);
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative">
      {/* 3D Background - Direct placement with no wrappers to preserve interactivity */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${splineLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Suspense fallback={<div className="w-full h-full bg-dark-950" />}>
          <Spline 
            scene="https://prod.spline.design/qq0TtCDqqs06lA0W/scene.splinecode"
            onLoad={onSplineLoad}
          />
        </Suspense>
      </div>

      {/* Content positioned with minimal spacing */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className={`space-y-6 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl font-medium text-gray-300 font-inter">
              Hi, I am
            </h2>
            
            {/* Interactive Rahul Text */}
            <div className="relative group cursor-pointer">
              <h1 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 animate-gradient-x pb-2 font-orbitron transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-2xl">
                Rahul
              </h1>
              
              {/* Interactive glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-primary-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              
              {/* Floating particles on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-primary-400 rounded-full animate-float"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: `${2 + Math.random() * 2}s`,
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Ripple effect on click */}
              <div className="absolute inset-0 rounded-full opacity-0 group-active:opacity-100 group-active:animate-ping bg-primary-500/30 transition-opacity duration-200"></div>
            </div>

            <div className="space-y-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-300 font-orbitron">
                <span className="text-primary-500">UI/UX Designer</span> & <span className="text-primary-500">Creative Technologist</span>
              </p>
              <p className="text-gray-400 text-lg max-w-2xl leading-relaxed font-inter">
                Building digital experiences that don't just look futuristic—but feel intuitive. I blend full-stack development with immersive UI/UX design to shape interfaces that truly connect with users.
              </p>
            </div>
            <div className="pt-4 flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-primary-600/20 transform hover:-translate-y-1 font-inter"
              >
                Get in Touch
              </a>
              <a 
                href="#projects" 
                className="px-6 py-3 bg-dark-700 border border-dark-600 hover:bg-dark-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 font-inter"
              >
                View Projects
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;