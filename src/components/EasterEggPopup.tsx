import React, { useState, useEffect } from 'react';
import { X, Sparkles, Eye, Zap } from 'lucide-react';

interface EasterEggPopupProps {
  type: 'hint' | 'discovered';
  isVisible: boolean;
  onClose: () => void;
}

const EasterEggPopup: React.FC<EasterEggPopupProps> = ({ type, isVisible, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-all duration-300 ${
      isAnimating ? 'bg-black/60 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className={`relative max-w-sm w-full transform transition-all duration-500 ${
        isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'
      }`}>
        {/* Enhanced Glassmorphism Container - Reduced Size */}
        <div className="relative bg-dark-800/90 backdrop-blur-xl rounded-xl p-6 border border-primary-500/30 shadow-2xl shadow-primary-500/20 overflow-hidden">
          {/* Animated Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-primary-500/5 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 to-transparent pointer-events-none"></div>
          
          {/* Floating Particles - Reduced Count */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary-400 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                  opacity: 0.6
                }}
              />
            ))}
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-6 h-6 bg-dark-700/80 hover:bg-dark-600 rounded-full flex items-center justify-center transition-all duration-300 group z-10"
          >
            <X className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors duration-300" />
          </button>

          {/* Content */}
          <div className="relative z-10 text-center space-y-4">
            {type === 'hint' ? (
              <>
                {/* Hint Icon - Futuristic Symbol */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center border border-primary-500/30">
                      <Zap className="w-6 h-6 text-primary-400 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 bg-primary-500/30 rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>

                {/* Hint Text */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-primary-400">
                    Easter Egg Alert
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    There's an Easter egg waiting for you.
                  </p>
                  <div className="inline-block px-3 py-1 bg-primary-500/20 rounded-lg border border-primary-500/30">
                    <p className="text-primary-300 text-xs font-medium">
                      <span className="text-primary-400 font-semibold">Hint:</span> Located on the landing page
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Success Icon - Futuristic Symbol */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                      <Eye className="w-6 h-6 text-green-400 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 bg-green-500/30 rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>

                {/* Success Text */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-green-400">
                    Easter Egg Discovered!
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    You've unlocked the <span className="text-primary-400 font-semibold">Unknown Reality</span>
                  </p>
                  <div className="inline-block px-3 py-1 bg-green-500/20 rounded-lg border border-green-500/30">
                    <p className="text-green-300 text-xs font-medium">
                      Welcome to the secret dimension
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Action Button */}
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-primary-600/20 transform hover:scale-105 text-sm"
            >
              {type === 'hint' ? 'Got it!' : 'Awesome!'}
            </button>
          </div>

          {/* Enhanced Border Glow */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 via-primary-400/10 to-primary-500/20 blur-xl opacity-60 -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default EasterEggPopup;