import React, { useState, useRef, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { ChevronLeft, ChevronRight, MousePointer2 } from 'lucide-react';
import DataDisplaySection from './DataDisplaySection';

interface DesignItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

interface DesignCarouselProps {
  exploredPercentage: number;
  unknownRealityDiscovered: boolean;
}

const DesignCarousel: React.FC<DesignCarouselProps> = ({ exploredPercentage, unknownRealityDiscovered }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const designs: DesignItem[] = [
    {
      id: 1,
      title: "Cinema Streaming Platform",
      category: "Entertainment UI",
      description: "Modern streaming interface with immersive movie browsing experience",
      image: "/images/Cinema site concept copy.jpeg"
    },
    {
      id: 2,
      title: "Futuristic Landing Page",
      category: "Web Design",
      description: "Bold, futuristic design with striking typography and visual hierarchy",
      image: "/images/Cool homepage design copy.jpeg"
    },
    {
      id: 3,
      title: "Dark Mode Interface",
      category: "UI/UX Design",
      description: "Sophisticated dark theme with elegant content presentation",
      image: "/images/Daily UI _ Super Dark Mode_ copy.jpeg"
    },
    {
      id: 4,
      title: "Travel Discovery Platform",
      category: "Travel & Tourism",
      description: "Immersive travel experience with stunning visual storytelling",
      image: "/images/download copy.jpeg"
    },
    {
      id: 5,
      title: "Minimalist Portfolio",
      category: "Portfolio Design",
      description: "Clean, minimalist approach with focus on typography and whitespace",
      image: "/images/Landing page copy.jpeg"
    }
  ];

  const totalItems = designs.length;

  // Handle mouse/touch events for dragging
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    
    setCurrentX(clientX);
    const diff = clientX - startX;
    setDragOffset(diff);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const threshold = 100;
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        // Dragged right - go to previous
        setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
      } else {
        // Dragged left - go to next
        setCurrentIndex((prev) => (prev + 1) % totalItems);
      }
    }
    
    setDragOffset(0);
    setStartX(0);
    setCurrentX(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-rotation (optional)
  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalItems);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isDragging, totalItems]);

  // Calculate 3D positions
  const getItemStyle = (index: number) => {
    const angle = ((index - currentIndex) * 360) / totalItems;
    const radius = 400;
    const translateZ = Math.cos((angle * Math.PI) / 180) * radius;
    const translateX = Math.sin((angle * Math.PI) / 180) * radius;
    const rotateY = -angle;
    const scale = 0.8 + (Math.cos((angle * Math.PI) / 180) * 0.2);
    const opacity = 0.4 + (Math.cos((angle * Math.PI) / 180) * 0.6);
    
    // Apply drag offset to rotation
    const dragRotation = isDragging ? (dragOffset * 0.5) : 0;
    
    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY + dragRotation}deg) scale(${scale})`,
      opacity: opacity,
      zIndex: Math.round(translateZ),
    };
  };

  return (
    <section 
      id="design-interests" 
      ref={sectionRef}
      className="py-20 scroll-mt-20 overflow-hidden"
    >
      <div className={`space-y-4 max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <h2 className="text-3xl sm:text-4xl font-bold">
          The Type of Design I'm <span className="text-primary-500">Interested In</span>
        </h2>
        <p className="text-xl text-gray-300">Visual Inspiration & Style Direction</p>
        <p className="text-gray-400 mt-6">
          These designs represent the aesthetic and functional approaches that inspire my work—
          <br />
          bold, immersive, and user-centered experiences that push creative boundaries.
        </p>
      </div>

      {/* 3D Carousel Container */}
      <div className="relative h-[600px] perspective-[1200px] overflow-hidden">
        {/* Drag Instruction */}
        <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-2 text-gray-400 text-sm transition-opacity duration-300 ${
          isDragging ? 'opacity-0' : 'opacity-100'
        }`}>
          <MousePointer2 size={16} />
          <span>Drag to rotate • Click arrows to navigate</span>
        </div>

        {/* 3D Carousel */}
        <div 
          ref={carouselRef}
          className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ transformStyle: 'preserve-3d' }}
          onMouseDown={handleMouseDown}
          onMouseMove={isDragging ? handleMouseMove : undefined}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {designs.map((design, index) => (
            <div
              key={design.id}
              className="absolute w-80 h-96 transition-all duration-700 ease-out cursor-pointer"
              style={{
                ...getItemStyle(index),
                transformStyle: 'preserve-3d',
              }}
              onClick={() => goToSlide(index)}
            >
              {/* Card Container */}
              <div className="relative w-full h-full bg-dark-800/90 backdrop-blur-xl rounded-2xl border border-dark-600/60 shadow-2xl overflow-hidden group hover:border-primary-500/30 transition-all duration-300">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={design.image} 
                    alt={design.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded-full border border-primary-500/30">
                      {design.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                    {design.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {design.description}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-dark-800/90 hover:bg-dark-700 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 border border-dark-600/50 group hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-primary-500 transition-colors duration-300" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-dark-800/90 hover:bg-dark-700 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 border border-dark-600/50 group hover:scale-110"
        >
          <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-primary-500 transition-colors duration-300" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {designs.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary-500 scale-125 shadow-lg shadow-primary-500/50' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Background Ambient Light */}
        <div className="absolute inset-0 bg-gradient-radial from-primary-500/5 via-transparent to-transparent pointer-events-none"></div>
      </div>

      {/* Current Design Info */}
      <div className={`mt-12 text-center transition-all duration-500 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-primary-400 mb-2">
            {designs[currentIndex].title}
          </h3>
          <p className="text-gray-300 mb-4">
            {designs[currentIndex].category}
          </p>
          <p className="text-gray-400 leading-relaxed">
            {designs[currentIndex].description}
          </p>
        </div>
      </div>

      {/* Data Display Section - Moved here */}
      <DataDisplaySection 
        exploredPercentage={exploredPercentage}
        unknownRealityDiscovered={unknownRealityDiscovered}
      />
    </section>
  );
};

export default DesignCarousel;