import React, { useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ShowcaseItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  position: 'left' | 'right';
  caseStudyRoute?: string;
}

const Showcase3D: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const navigate = useNavigate();

  const showcaseItems: ShowcaseItem[] = [
    {
      id: 1,
      title: "SWIGGY - A SLEEK NEW LOGIN EXPERIENCE",
      subtitle: "UI/UX Redesign",
      description: "Reimagined Swiggy's login flow with enhanced user experience and modern visual design patterns.",
      image: "/images/Desktop - 8 copy.png",
      link: "#",
      position: "left",
      caseStudyRoute: "/case-study/swiggy"
    },
    {
      id: 2,
      title: "SKILLUP — ONBOARDING EXPERIENCE FOR A LEARNING APP (UI/UX CASE STUDY)",
      subtitle: "Mobile App Design",
      description: "Complete onboarding experience design for an educational platform focusing on user engagement and retention.",
      image: "/images/Twitter header - 1.png",
      link: "#",
      position: "right",
      caseStudyRoute: "/case-study/skillup"
    },
    {
      id: 3,
      title: "CONNECT - A DEMO DESIGN",
      subtitle: "#fun project",
      description: "Experimental design project exploring modern interface patterns and interactive elements.",
      image: "/images/Twitter header - 3 copy.png",
      link: "#",
      position: "left",
      caseStudyRoute: "/case-study/connect"
    }
  ];

  const handleItemClick = (item: ShowcaseItem) => {
    if (item.caseStudyRoute) {
      navigate(item.caseStudyRoute);
    }
  };

  return (
    <section 
      id="case-studies" 
      ref={sectionRef}
      className="py-20 scroll-mt-20 overflow-hidden perspective-2000"
    >
      <div className={`space-y-4 max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <h2 className="text-3xl sm:text-4xl font-bold">
          Featured <span className="text-primary-500">Case Studies</span>
        </h2>
        <p className="text-xl text-gray-300">Design Deep Dives</p>
        <p className="text-gray-400 mt-6">
          Detailed explorations of my design process, from problem identification 
          to final implementation and user testing results.
        </p>
      </div>

      <div className="space-y-32 max-w-7xl mx-auto">
        {showcaseItems.map((item, index) => (
          <div 
            key={item.id}
            className={`relative transition-all duration-1000 ease-out transform-gpu ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ 
              transitionDelay: `${index * 200}ms`,
              transformStyle: 'preserve-3d'
            }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              item.position === 'right' ? 'lg:grid-flow-col-dense' : ''
            }`}>
              
              {/* Content Side */}
              <div className={`space-y-6 ${
                item.position === 'right' ? 'lg:col-start-2 lg:text-right' : ''
              } transform transition-all duration-700 ${
                hoveredItem === item.id ? 'translate-x-4 scale-105' : ''
              }`}>
                
                {/* Title */}
                <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight transition-all duration-500 ${
                  hoveredItem === item.id ? 'text-primary-400' : 'text-white'
                }`}>
                  {item.title}
                </h3>

                {/* Subtitle */}
                <p className="text-lg text-gray-400 font-medium">
                  {item.subtitle}
                </p>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed max-w-lg">
                  {item.description}
                </p>

                {/* CTA Button */}
                <div className={`pt-4 ${
                  item.position === 'right' ? 'lg:flex lg:justify-end' : ''
                }`}>
                  <button 
                    onClick={() => handleItemClick(item)}
                    className={`inline-flex items-center gap-2 px-6 py-3 bg-dark-800 hover:bg-dark-700 border border-dark-600 hover:border-primary-500/50 rounded-lg transition-all duration-300 group transform hover:scale-105 hover:shadow-lg hover:shadow-primary-500/20 ${
                      hoveredItem === item.id ? 'bg-dark-700 border-primary-500/50' : ''
                    } ${item.caseStudyRoute ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <span className="text-white font-medium">CLICK HERE</span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors duration-300" />
                  </button>
                </div>
              </div>

              {/* Image Side */}
              <div className={`relative ${
                item.position === 'right' ? 'lg:col-start-1' : ''
              } transform transition-all duration-700 perspective-1000 ${
                hoveredItem === item.id ? 'scale-105 rotate-y-6' : ''
              }`}>
                
                {/* 3D Container */}
                <div className="relative transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
                  
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-400/20 rounded-2xl blur-2xl transition-opacity duration-500 ${
                    hoveredItem === item.id ? 'opacity-100 scale-110' : 'opacity-0'
                  }`}></div>

                  {/* Main Image Container */}
                  <div className="relative bg-dark-800/60 backdrop-blur-xl rounded-2xl border border-dark-600/60 overflow-hidden shadow-2xl transform transition-all duration-500 hover:shadow-primary-500/20">
                    
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className={`w-full h-auto object-cover object-center transition-all duration-700 ${
                          hoveredItem === item.id ? 'scale-110' : 'scale-100'
                        }`}
                        style={{
                          aspectRatio: 'auto',
                          maxHeight: '500px'
                        }}
                      />
                      
                      {/* Overlay Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent transition-opacity duration-500 ${
                        hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                      }`}></div>
                    </div>

                    {/* Floating Elements */}
                    {hoveredItem === item.id && (
                      <>
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-primary-400 rounded-full animate-float pointer-events-none"
                            style={{
                              left: `${20 + Math.random() * 60}%`,
                              top: `${20 + Math.random() * 60}%`,
                              animationDelay: `${i * 0.3}s`,
                              animationDuration: `${2 + Math.random() * 2}s`,
                            }}
                          ></div>
                        ))}
                      </>
                    )}
                  </div>

                  {/* 3D Shadow */}
                  <div className={`absolute inset-0 bg-dark-900/40 rounded-2xl blur-xl transition-all duration-500 ${
                    hoveredItem === item.id ? 'translate-y-8 translate-z-[-20px] opacity-60' : 'translate-y-4 translate-z-[-10px] opacity-30'
                  }`} style={{ transform: 'translateZ(-20px)' }}></div>
                </div>
              </div>
            </div>

            {/* Connecting Line (Decorative) */}
            <div className={`absolute top-1/2 ${
              item.position === 'right' ? 'right-1/2' : 'left-1/2'
            } w-24 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent transform -translate-y-1/2 transition-opacity duration-500 ${
              hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
            }`}></div>
          </div>
        ))}
      </div>

      {/* Background Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
};

export default Showcase3D;