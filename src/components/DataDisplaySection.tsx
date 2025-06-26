import React, { useState, useEffect } from 'react';
import { Eye, Zap, Users } from 'lucide-react';

interface DataDisplaySectionProps {
  exploredPercentage: number;
  unknownRealityDiscovered: boolean;
}

const DataDisplaySection: React.FC<DataDisplaySectionProps> = ({ 
  exploredPercentage, 
  unknownRealityDiscovered 
}) => {
  const [visitorNumber, setVisitorNumber] = useState(2103);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Generate random visitor number for this session
    const randomVisitor = Math.floor(Math.random() * 1000) + 2000;
    setVisitorNumber(randomVisitor);
    
    // Animate in after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const dataPoints = [
    {
      id: 'explored',
      icon: Zap,
      label: 'Portfolio Explored',
      value: `${exploredPercentage}%`,
      color: 'text-primary-400',
      glowColor: 'shadow-primary-500/30',
      bgColor: 'bg-primary-500/10',
      borderColor: 'border-primary-500/30'
    },
    {
      id: 'reality',
      icon: Eye,
      label: 'Unknown Reality Discovered',
      value: unknownRealityDiscovered ? 'Yes' : 'No',
      color: unknownRealityDiscovered ? 'text-green-400' : 'text-gray-400',
      glowColor: unknownRealityDiscovered ? 'shadow-green-400/30' : 'shadow-gray-500/20',
      bgColor: unknownRealityDiscovered ? 'bg-green-500/10' : 'bg-gray-500/10',
      borderColor: unknownRealityDiscovered ? 'border-green-500/30' : 'border-gray-500/30'
    },
    {
      id: 'visitor',
      icon: Users,
      label: 'Visitor Number',
      value: `#${visitorNumber}`,
      color: 'text-blue-400',
      glowColor: 'shadow-blue-500/30',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30'
    }
  ];

  return (
    <section className="py-16 relative">
      <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        
        {/* Section Header */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">
            Portfolio <span className="text-primary-500">Analytics</span>
          </h3>
          <p className="text-gray-400">Real-time exploration data</p>
        </div>

        {/* Data Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dataPoints.map((point, index) => (
            <div
              key={point.id}
              className={`relative transform transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Data Card */}
              <div className={`relative ${point.bgColor} backdrop-blur-xl rounded-xl p-6 border ${point.borderColor} shadow-xl ${point.glowColor} group hover:scale-105 transition-all duration-300 overflow-hidden`}>
                
                {/* Glassmorphism Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/20 to-transparent pointer-events-none"></div>
                
                {/* Animated Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer pointer-events-none"></div>
                
                {/* Icon Container */}
                <div className={`w-12 h-12 ${point.bgColor} rounded-lg flex items-center justify-center mb-4 mx-auto ${point.borderColor} border group-hover:scale-110 transition-transform duration-300`}>
                  <point.icon className={`w-6 h-6 ${point.color}`} />
                </div>

                {/* Label */}
                <div className="text-sm text-gray-300 mb-2 font-medium">
                  {point.label}
                </div>

                {/* Value */}
                <div className={`text-2xl font-bold ${point.color} font-mono tracking-wide mb-2`}>
                  {point.value}
                </div>

                {/* Subtle Description */}
                <div className="text-xs text-gray-500">
                  {point.id === 'explored' && 'Scroll progress + discoveries'}
                  {point.id === 'reality' && 'Easter egg status'}
                  {point.id === 'visitor' && 'Session identifier'}
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-1 h-1 ${point.color.replace('text-', 'bg-')} rounded-full animate-float opacity-60`}
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.7}s`,
                        animationDuration: `${3 + Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-xl ${point.bgColor.replace('/10', '/20')} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Ambient Background Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary-500/3 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </section>
  );
};

export default DataDisplaySection;