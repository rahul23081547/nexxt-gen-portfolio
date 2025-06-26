import React, { useState, useEffect } from 'react';
import { Monitor, X } from 'lucide-react';

const MobileAlert: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Check if alert was already shown this session
    const alertShown = sessionStorage.getItem('mobileAlertShown');
    
    if (alertShown === 'true') {
      return; // Don't show if already shown this session
    }

    // Check if device is mobile/tablet
    const isMobile = window.innerWidth <= 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      setShowAlert(true);
      
      // Mark as shown for this session
      sessionStorage.setItem('mobileAlertShown', 'true');
      
      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowAlert(false);
  };

  if (!showAlert) return null;

  return (
    <div className="fixed top-20 left-4 right-4 z-50 animate-fade-in-up">
      <div className="bg-dark-800/95 backdrop-blur-lg border border-primary-500/30 rounded-xl p-4 shadow-2xl shadow-primary-500/10 max-w-sm mx-auto">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
            <Monitor className="w-5 h-5 text-primary-500" />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white mb-1">
              Best Experience
            </p>
            <p className="text-xs text-gray-300 leading-relaxed">
              Best viewed on desktop/laptop for full experience.
            </p>
          </div>
          
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors duration-200 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Progress bar for auto-dismiss */}
        <div className="mt-3 h-1 bg-dark-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full animate-[shrink_5s_linear_forwards]"></div>
        </div>
      </div>
    </div>
  );
};

export default MobileAlert;