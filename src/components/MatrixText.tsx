import React, { useState, useEffect } from 'react';

interface MatrixTextProps {
  text: string;
  isVisible: boolean;
  delay?: number;
  className?: string;
}

const MatrixText: React.FC<MatrixTextProps> = ({ 
  text, 
  isVisible, 
  delay = 0, 
  className = '' 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // Matrix-style characters for the glitch effect
  const matrixChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  useEffect(() => {
    if (!isVisible) {
      setDisplayText('');
      setIsAnimating(false);
      return;
    }

    const startAnimation = () => {
      setIsAnimating(true);
      let currentIndex = 0;
      const targetText = text;
      
      const animateText = () => {
        if (currentIndex <= targetText.length) {
          // Create the display text with resolved characters and glitchy ones
          let newDisplayText = '';
          
          for (let i = 0; i < targetText.length; i++) {
            if (i < currentIndex) {
              // Character is resolved
              newDisplayText += targetText[i];
            } else if (i < currentIndex + 3) {
              // Show glitchy characters for next few positions
              if (targetText[i] === ' ') {
                newDisplayText += ' ';
              } else {
                newDisplayText += matrixChars[Math.floor(Math.random() * matrixChars.length)];
              }
            } else {
              // Not yet revealed
              newDisplayText += ' ';
            }
          }
          
          setDisplayText(newDisplayText);
          currentIndex++;
          
          if (currentIndex <= targetText.length + 3) {
            setTimeout(animateText, 50); // Speed of character resolution
          } else {
            setDisplayText(targetText);
            setIsAnimating(false);
          }
        }
      };
      
      animateText();
    };

    const timer = setTimeout(startAnimation, delay);
    return () => clearTimeout(timer);
  }, [isVisible, text, delay]);

  return (
    <span className={`${className} ${isAnimating ? 'text-primary-400' : ''} transition-colors duration-300`}>
      {displayText}
    </span>
  );
};

export default MatrixText;