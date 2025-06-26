import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RealityTransitionProps {
  isVisible: boolean;
  onComplete: () => void;
}

const RealityTransition: React.FC<RealityTransitionProps> = ({ isVisible, onComplete }) => {
  const navigate = useNavigate();
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (isVisible) {
      // Phase progression for cinematic effect
      const phaseTimer1 = setTimeout(() => setAnimationPhase(1), 500);
      const phaseTimer2 = setTimeout(() => setAnimationPhase(2), 1500);
      const phaseTimer3 = setTimeout(() => setAnimationPhase(3), 2500);
      
      const completeTimer = setTimeout(() => {
        navigate('/secret-reality');
        onComplete();
      }, 4000);

      return () => {
        clearTimeout(phaseTimer1);
        clearTimeout(phaseTimer2);
        clearTimeout(phaseTimer3);
        clearTimeout(completeTimer);
      };
    }
  }, [isVisible, navigate, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden perspective-2000">
      {/* 3D Tunnel Effect Background */}
      <div className="absolute inset-0">
        {/* Tunnel Rings */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute border-2 border-primary-500/30 rounded-full transition-all duration-1000 ${
              animationPhase >= 1 ? 'animate-tunnel-zoom' : ''
            }`}
            style={{
              width: `${100 + i * 150}px`,
              height: `${100 + i * 150}px`,
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translateZ(${-i * 200}px) scale(${1 + animationPhase * 0.5})`,
              animationDelay: `${i * 0.1}s`,
              opacity: animationPhase >= 2 ? 0.8 - (i * 0.06) : 0.3,
            }}
          />
        ))}

        {/* Particle Field */}
        {[...Array(100)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`absolute w-1 h-1 bg-primary-400 rounded-full transition-all duration-2000 ${
              animationPhase >= 1 ? 'animate-particle-stream' : ''
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateZ(${Math.random() * 1000 - 500}px)`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: animationPhase >= 1 ? Math.random() * 0.8 + 0.2 : 0,
            }}
          />
        ))}

        {/* Geometric Fragments */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`fragment-${i}`}
            className={`absolute border border-primary-300/40 transition-all duration-1500 ${
              animationPhase >= 2 ? 'animate-fragment-scatter' : ''
            }`}
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg) rotateZ(${Math.random() * 360}deg) translateZ(${Math.random() * 300}px)`,
              animationDelay: `${Math.random() * 1}s`,
              opacity: animationPhase >= 2 ? 0.6 : 0,
            }}
          />
        ))}
      </div>

      {/* Central Vortex */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-2000 ${
        animationPhase >= 1 ? 'scale-110' : 'scale-100'
      }`}>
        <div className={`relative transition-all duration-1500 ${
          animationPhase >= 2 ? 'scale-150 rotate-180' : 'scale-100'
        }`}>
          {/* Rotating Energy Rings */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`energy-${i}`}
              className={`absolute border-2 rounded-full transition-all duration-1000 ${
                animationPhase >= 1 ? 'animate-spin border-primary-400' : 'border-primary-600/30'
              }`}
              style={{
                width: `${80 + i * 40}px`,
                height: `${80 + i * 40}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animationDuration: `${2 - i * 0.2}s`,
                animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
                opacity: animationPhase >= 1 ? 0.8 - (i * 0.15) : 0.3,
              }}
            />
          ))}

          {/* Central Core */}
          <div className={`absolute w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
            animationPhase >= 2 ? 'scale-200 blur-sm' : animationPhase >= 1 ? 'scale-125 animate-pulse' : 'scale-100'
          }`}>
            <div className="absolute inset-0 bg-primary-300 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>
      </div>

      {/* Cinematic Typography */}
      <div className={`relative z-20 text-center transition-all duration-2000 ${
        animationPhase >= 3 ? 'opacity-0 scale-150' : 'opacity-100 scale-100'
      }`}>
        <h1 className={`text-5xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 animate-gradient-x mb-8 transition-all duration-1500 ${
          animationPhase >= 1 ? 'tracking-wider' : 'tracking-normal'
        }`}>
          Switching Realities...
        </h1>
        
        {/* Progress Visualization */}
        <div className="relative w-80 h-2 bg-dark-800/50 rounded-full overflow-hidden mx-auto">
          <div 
            className={`h-full bg-gradient-to-r from-primary-600 via-primary-400 to-primary-300 rounded-full transition-all duration-4000 ease-out ${
              animationPhase >= 1 ? 'w-full' : 'w-0'
            }`}
            style={{
              boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>

        {/* Phase Indicators */}
        <div className="mt-8 flex justify-center space-x-4">
          {['Initializing', 'Warping', 'Materializing'].map((phase, index) => (
            <div
              key={phase}
              className={`px-4 py-2 rounded-full border transition-all duration-500 ${
                animationPhase > index 
                  ? 'border-primary-400 bg-primary-500/20 text-primary-300' 
                  : 'border-primary-600/30 bg-dark-800/30 text-gray-500'
              }`}
            >
              <span className="text-sm font-medium">{phase}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Distortion Overlay */}
      <div className={`absolute inset-0 transition-all duration-2000 ${
        animationPhase >= 2 
          ? 'bg-gradient-radial from-primary-500/20 via-transparent to-black/50' 
          : 'bg-transparent'
      }`} />

      {/* Final Warp Effect */}
      {animationPhase >= 3 && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 via-black to-primary-600/30 animate-warp-final" />
      )}
    </div>
  );
};

export default RealityTransition;