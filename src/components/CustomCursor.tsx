import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { MousePointer } from 'lucide-react';

const CustomCursor = () => {
  const [isCustomCursor, setIsCustomCursor] = useState(() => {
    const saved = localStorage.getItem('isCustomCursor');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
          target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    if (isCustomCursor) {
      window.addEventListener('mousemove', updateMousePosition, { passive: true });
      document.addEventListener('mouseover', handleMouseEnter);
      document.body.style.cursor = 'none';
    } else {
      document.body.style.cursor = 'auto';
    }

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseEnter);
    };
  }, [isCustomCursor]);

  useEffect(() => {
    localStorage.setItem('isCustomCursor', JSON.stringify(isCustomCursor));
  }, [isCustomCursor]);

  const toggleCursor = () => {
    setIsCustomCursor(!isCustomCursor);
  };

  const variants = {
    default: {
      scale: 1,
      opacity: 1
    },
    hover: {
      scale: 2,
      opacity: 0.8
    }
  };

  return (
    <>
      {/* Fixed position cursor toggle button */}
      <button
        onClick={toggleCursor}
        className="fixed bottom-6 left-6 z-50 p-3 bg-dark-800/90 hover:bg-dark-700 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 group border border-dark-600/50 hover:scale-110"
        title={isCustomCursor ? "Switch to default cursor" : "Switch to custom cursor"}
      >
        <MousePointer 
          className={`w-5 h-5 transition-colors duration-300 ${
            isCustomCursor ? 'text-primary-500' : 'text-gray-400'
          }`}
        />
        {/* Subtle glow effect */}
        <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
          isCustomCursor ? 'bg-primary-500/20 opacity-100' : 'opacity-0'
        } blur-md -z-10`}></div>
      </button>

      {isCustomCursor && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-3 h-3 bg-primary-500 rounded-full pointer-events-none mix-blend-difference z-50"
            style={{
              x: smoothX,
              y: smoothY,
              translateX: '-50%',
              translateY: '-50%'
            }}
            animate={isHovering ? "hover" : "default"}
            variants={variants}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
          />
          <motion.div
            className="fixed top-0 left-0 w-8 h-8 border border-primary-500/30 rounded-full pointer-events-none z-50"
            style={{
              x: smoothX,
              y: smoothY,
              translateX: '-50%',
              translateY: '-50%'
            }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          />
        </>
      )}
    </>
  );
};

export default CustomCursor;