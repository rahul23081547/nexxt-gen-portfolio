import React, { useState, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import MatrixText from './MatrixText';

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

const Timeline: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [textAnimationKey, setTextAnimationKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  const timelineData: TimelineItem[] = [
    {
      year: "2022",
      title: "First Spark",
      subtitle: "Stumbled upon the world of UI/UX for the first time",
      description: "The beginning of my design journey",
      highlights: [
        "Started understanding what UI/UX actually means",
        "Played around with mobile apps, noticing patterns and layouts",
        "Spark of curiosity was born — didn't know it yet, but I was hooked"
      ]
    },
    {
      year: "2023",
      title: "First Steps into Design",
      subtitle: "Discovered Figma — my first design tool",
      description: "Learning the fundamentals",
      highlights: [
        "Watched tutorials, redesigned random app screens for fun",
        "Participated in a few design challenges and mini hackathons",
        "Realized I enjoy solving problems visually, not just making things look pretty"
      ]
    },
    {
      year: "2024",
      title: "Leveling Up",
      subtitle: "From passion to process",
      description: "Developing systematic approach",
      highlights: [
        "Took deep dives into UI/UX case studies, design systems, and component logic",
        "Learned 3D modeling to bring more visual energy into projects",
        "Collaborated on a 50+ screen app design in Figma — a milestone moment",
        "Started comparing real-world apps (like Swiggy) and reimagining their UI"
      ]
    },
    {
      year: "2025",
      title: "Bold Experiments",
      subtitle: "Merging skills, telling stories through design",
      description: "Current focus and future goals",
      highlights: [
        "Redesigned Swiggy UI with new interactions and category visuals",
        "Built a case study around Dragon Ball Legends UI redesign — combining anime passion + design logic",
        "Focused more on storytelling through case studies",
        "Exploring motion, micro-interactions, and cleaner hierarchy systems"
      ]
    }
  ];

  const handleItemInteraction = (index: number) => {
    const newActiveItem = activeItem === index ? null : index;
    setActiveItem(newActiveItem);
    
    // Trigger text animation by updating the key
    if (newActiveItem !== null) {
      setTextAnimationKey(prev => prev + 1);
    }
  };

  return (
    <section 
      id="timeline" 
      ref={sectionRef}
      className="py-16 scroll-mt-20 perspective-1000"
    >
      <div className={`space-y-4 max-w-3xl mx-auto text-center mb-12 transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 relative">
          My Timeline Into The World Of <span className="text-primary-500">UI/UX</span>
          <div className="absolute -inset-1 bg-primary-500/10 blur-xl -z-10 animate-pulse"></div>
        </h2>
      </div>

      {/* Reduced Timeline Container with Enhanced Glassmorphism */}
      <div className="bg-dark-800/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-dark-700/60 shadow-2xl relative overflow-hidden max-w-6xl mx-auto">
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-primary-500/5 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/20 to-transparent pointer-events-none"></div>
        
        <div className="relative px-4 perspective-1000">
          {/* Enhanced Timeline Line - Positioned to pass through circle centers (Desktop Only) */}
          <div className="hidden md:block absolute left-0 right-0 h-1 z-0" style={{ top: '60px' }}>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/60 to-transparent rounded-full blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/50 via-primary-500 to-primary-600/50 rounded-full shadow-lg shadow-primary-500/40"></div>
            </div>
          </div>
          
          {/* Timeline Items */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {timelineData.map((item, index) => (
              <div key={index} className="relative flex flex-col items-center perspective-1000">
                {/* Enhanced Timeline Circle */}
                <div 
                  className={`w-20 h-20 rounded-full border-4 border-primary-500 bg-dark-900 flex items-center justify-center cursor-pointer transition-all duration-500 ease-out z-20 relative group ${
                    activeItem === index 
                      ? 'bg-primary-500 scale-125 shadow-2xl shadow-primary-500/60 rotate-y-12' 
                      : 'hover:scale-110 hover:bg-primary-500/20 hover:shadow-xl hover:shadow-primary-500/40 hover:rotate-y-6'
                  }`}
                  onClick={() => handleItemInteraction(index)}
                  onMouseEnter={() => setActiveItem(index)}
                  onMouseLeave={() => setActiveItem(null)}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Enhanced glow effect */}
                  <div className="absolute inset-0 rounded-full bg-primary-500/30 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <span className={`text-2xl font-bold transition-all duration-300 relative z-10 ${
                    activeItem === index ? 'text-white scale-110' : 'text-primary-500'
                  }`}>
                    {index + 1}
                  </span>

                  {/* Floating particles around active circle */}
                  {activeItem === index && (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-primary-400 rounded-full animate-float"
                          style={{
                            left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 35}%`,
                            top: `${50 + Math.sin(i * 60 * Math.PI / 180) * 35}%`,
                            transform: 'translate(-50%, -50%)',
                            animationDelay: `${i * 0.2}s`,
                          }}
                        ></div>
                      ))}
                    </>
                  )}
                </div>

                {/* Year Label */}
                <div className="mt-6 mb-4">
                  <span className={`text-xl font-bold transition-all duration-300 ${
                    activeItem === index 
                      ? 'text-primary-400 scale-110 drop-shadow-lg' 
                      : 'text-primary-500'
                  }`}>
                    {item.year}
                  </span>
                </div>

                {/* Enhanced Glassmorphism Content Box */}
                <div className={`w-full max-w-xs md:w-80 mt-8 transition-all duration-700 ease-out perspective-1000 ${
                  activeItem === index 
                    ? 'opacity-100 translate-y-0 scale-100 rotate-x-0 translate-z-0' 
                    : 'opacity-0 translate-y-8 scale-90 rotate-x-45 translate-z-[-50px] pointer-events-none'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}>
                  <div className="relative bg-dark-800/80 backdrop-blur-xl border border-dark-600/60 rounded-2xl p-6 md:p-8 shadow-2xl transform-gpu">
                    {/* Enhanced glassmorphism effects */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/30 via-primary-400/20 to-primary-500/30 rounded-2xl blur-lg opacity-60"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-primary-500/5 rounded-2xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 to-transparent rounded-2xl"></div>
                    
                    {/* Arrow pointing upward */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[12px] border-l-transparent border-r-transparent border-b-dark-800/80 drop-shadow-lg"></div>
                    </div>

                    <div className="relative z-10 space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold text-primary-400 transform transition-transform duration-300 hover:translate-x-2">
                        <MatrixText 
                          text={item.title}
                          isVisible={activeItem === index}
                          delay={0}
                          key={`title-${textAnimationKey}-${index}`}
                        />
                      </h3>
                      <p className="text-sm text-gray-300 italic font-medium">
                        <MatrixText 
                          text={item.subtitle}
                          isVisible={activeItem === index}
                          delay={200}
                          key={`subtitle-${textAnimationKey}-${index}`}
                        />
                      </p>
                      
                      <div className="space-y-3 mt-6">
                        {item.highlights.map((highlight, highlightIndex) => (
                          <div 
                            key={highlightIndex} 
                            className="flex items-start gap-3 transform transition-all duration-300 hover:translate-x-2"
                            style={{ animationDelay: `${highlightIndex * 100}ms` }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-primary-500/50"></div>
                            <p className="text-sm text-gray-400 leading-relaxed">
                              <MatrixText 
                                text={highlight}
                                isVisible={activeItem === index}
                                delay={400 + (highlightIndex * 150)}
                                key={`highlight-${textAnimationKey}-${index}-${highlightIndex}`}
                              />
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced inner glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary-500/10 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;