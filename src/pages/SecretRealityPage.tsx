import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AlternateRealityAudio from '../components/AlternateRealityAudio';

const SecretRealityPage: React.FC = () => {
  const [isReturning, setIsReturning] = useState(false);
  const navigate = useNavigate();

  const handleReturnToReality = () => {
    setIsReturning(true);
    
    // Add dramatic exit animation
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className={`fixed inset-0 bg-black transition-all duration-1500 ${
      isReturning ? 'animate-reality-exit' : ''
    }`}>
      {/* Audio Control for Alternate Reality */}
      <AlternateRealityAudio />

      {/* Enhanced Return Button */}
      <button
        onClick={handleReturnToReality}
        className="fixed top-6 left-6 z-50 group"
      >
        <div className="relative">
          {/* Main Button */}
          <div className="flex items-center gap-3 px-6 py-3 bg-black/90 hover:bg-gray-900 backdrop-blur-sm rounded-xl border border-gray-600/50 hover:border-gray-400/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/30">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300 text-white" />
            <span className="font-semibold text-white">Switch Reality</span>
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300 text-gray-300" />
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-500/20 to-gray-400/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-110"></div>

          {/* Reverse Glitch Effect on Hover */}
          <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
            isReturning ? 'animate-reverse-glitch' : 'opacity-0 group-hover:opacity-100'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-red-500/20 rounded-xl blur-sm"></div>
          </div>

          {/* Floating Particles on Hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-gray-400 rounded-full animate-float"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </button>

      {/* Full-Screen 3D Spline Model with Updated Scene */}
      <div className="w-full h-full">
        <spline-viewer 
          url="https://prod.spline.design/iSzqMTRS6tztqHP7/scene.splinecode"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            outline: 'none'
          }}
        />
      </div>

      {/* Enhanced CSS to Hide Spline Branding */}
      <style jsx>{`
        spline-viewer::part(logo) {
          display: none !important;
        }
        
        spline-viewer {
          --spline-logo-display: none !important;
        }
        
        /* Hide any floating buttons or branding elements */
        spline-viewer::shadow .spline-watermark,
        spline-viewer::shadow .logo,
        spline-viewer::shadow [class*="logo"],
        spline-viewer::shadow [class*="watermark"],
        spline-viewer::shadow [class*="branding"],
        spline-viewer::shadow [data-testid*="logo"],
        spline-viewer::shadow [data-testid*="watermark"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }

        /* Hide any floating buttons in bottom corner */
        spline-viewer::shadow div[style*="position: absolute"][style*="bottom"],
        spline-viewer::shadow div[style*="position: fixed"][style*="bottom"] {
          display: none !important;
        }

        /* Force hide any Spline UI elements */
        spline-viewer * {
          --spline-ui-display: none !important;
        }
      `}</style>

      {/* Exit Animation Overlay */}
      {isReturning && (
        <div className="fixed inset-0 bg-gradient-to-br from-primary-400/30 via-black to-primary-600/30 animate-reality-exit z-40 pointer-events-none" />
      )}
    </div>
  );
};

export default SecretRealityPage;