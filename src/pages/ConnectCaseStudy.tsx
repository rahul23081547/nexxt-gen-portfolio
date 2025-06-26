import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Target, Lightbulb, Wrench, CheckCircle, Users, Smartphone, Zap, Share2, Briefcase, Heart, ExternalLink, Play } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const ConnectCaseStudy: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isEntering, setIsEntering] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Enhanced loading animation with 3D effects
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsEntering(true);
      // Reset entering state after animation completes
      setTimeout(() => setIsEntering(false), 2000);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Track case study completion
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.pageYOffset;
      const progressPercentage = (currentProgress / totalScroll) * 100;
      setScrollProgress(progressPercentage);
      
      // If user has scrolled to 90% of the case study, mark as complete
      if (progressPercentage >= 90) {
        const event = new CustomEvent('caseStudyComplete', {
          detail: { caseStudyId: 'connect' }
        });
        window.dispatchEvent(event);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const goBack = () => {
    window.history.back();
  };

  const openFullscreen = (imageSrc: string) => {
    setFullscreenImage(imageSrc);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-dark-950 z-50 flex items-center justify-center">
        <div className="text-center">
          {/* Enhanced 3D loading animation with social theme */}
          <div className="relative mb-12">
            <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-pink-400/30 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-2 w-16 h-16 border-2 border-blue-300/20 border-r-transparent rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
            <Share2 className="absolute inset-0 m-auto w-8 h-8 text-purple-400 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse mb-4">
            Loading Connect Experience
          </h2>
          <div className="w-64 h-2 bg-dark-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-600 to-pink-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-400 mt-4 text-sm">Preparing social network demo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-dark-950 via-purple-950/20 to-pink-950/20 text-white overflow-hidden transition-all duration-2000 ${
      isEntering ? 'animate-cinematic-zoom' : ''
    }`}>
      {/* Enhanced Progress Bar with social theme colors */}
      <div className="fixed top-0 left-0 w-full h-1 bg-dark-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-600 to-pink-400 transition-all duration-300 shadow-lg shadow-purple-500/50"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Enhanced Back Button */}
      <button
        onClick={goBack}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-dark-800/90 hover:bg-dark-700 backdrop-blur-sm rounded-lg border border-dark-600/50 transition-all duration-300 group hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
        <span>Back to Portfolio</span>
      </button>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 cursor-pointer"
          onClick={closeFullscreen}
        >
          <div className="relative max-w-7xl max-h-full">
            <img 
              src={fullscreenImage} 
              alt="Fullscreen view"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 w-10 h-10 bg-dark-800/80 hover:bg-dark-700 rounded-full flex items-center justify-center text-white transition-all duration-300"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <HeroSection mousePosition={mousePosition} isEntering={isEntering} openFullscreen={openFullscreen} />

      {/* Main Content with enhanced transitions */}
      <div className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 transition-all duration-1500 ${
        isEntering ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'
      }`} style={{ transitionDelay: '1s' }}>
        <ProjectOverview />
        <ProjectOutcome />
        <ProblemStatement />
        <MyApproach />
        <MidPrototypingProcess openFullscreen={openFullscreen} />
        <ProjectVideoSection />
        <WhyItWorks />
        <KeyLearnings />
        <ToolsUsed />
        <MoralInsight />
      </div>

      {/* Enhanced Background Effects with social theme */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
    </div>
  );
};

const HeroSection: React.FC<{ 
  mousePosition: { x: number; y: number }, 
  isEntering: boolean,
  openFullscreen: (src: string) => void 
}> = ({ mousePosition, isEntering, openFullscreen }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center perspective-1000 overflow-hidden py-20">
      {/* Enhanced 3D Background Elements with social theme */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-20 left-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
          style={{
            transform: `translate3d(${mousePosition.x * 20}px, ${mousePosition.y * 20}px, 0) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-48 h-48 bg-pink-500/5 rounded-full blur-2xl"
          style={{
            transform: `translate3d(${mousePosition.x * -30}px, ${mousePosition.y * -30}px, 0) rotateX(${mousePosition.y * -15}deg) rotateY(${mousePosition.x * -15}deg)`
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-10 w-24 h-24 bg-purple-500/8 rounded-full blur-lg"
          style={{
            transform: `translate3d(${mousePosition.x * 15}px, ${mousePosition.y * -25}px, 0) rotateZ(${mousePosition.x * 20}deg)`
          }}
        ></div>
      </div>

      <div className={`text-center space-y-8 transform transition-all duration-2000 max-w-4xl mx-auto ${
        isInView && !isEntering ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
      }`}>
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-pink-400 animate-gradient-x">
            CONNECT
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-300">
            A Demo Design
          </h2>
          <div className="inline-block px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-lg font-medium border border-purple-500/30 mb-4">
            #fun project
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            An experimental social networking app that blends the best of Instagram's visual storytelling, 
            LinkedIn's professional networking, and Fiverr's freelance marketplace into one cohesive platform
          </p>
        </div>

        {/* Hero Image Section */}
        <div className={`mt-12 transform transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
        }`} style={{ transitionDelay: '0.5s' }}>
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-6 border border-dark-600/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 group cursor-pointer"
                 onClick={() => openFullscreen('/images/connect copy.png')}>
              <img 
                src="/images/connect copy.png" 
                alt="Connect App Preview"
                className="w-full h-auto rounded-lg shadow-lg group-hover:scale-[1.02] transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-dark-800/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-purple-500/30">
                  <span className="text-purple-400 text-sm font-medium">Click to view fullscreen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectOverview: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-purple-500" />
            <h2 className="text-3xl font-bold">OVERVIEW</h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            The Connect app was a demo mobile design project, deeply inspired by the features of Instagram, LinkedIn, and Fiverr. 
            Designed to explore modern social and freelance network interactions—the idea was to blend content discovery, 
            professional profiles, and gig-based functionality in a clean UI.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            This was also my first complete mobile app design, where I explored user flow, consistency, and UI aesthetics deeply.
          </p>
        </div>
      </div>
    </section>
  );
};

const ProjectOutcome: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-8 h-8 text-purple-500" />
            <h2 className="text-3xl font-bold">PROJECT OUTCOME</h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Connect successfully demonstrates how different social platform paradigms can be unified into a cohesive experience. 
            The design balances visual appeal with functional clarity, creating an interface that feels familiar yet innovative. 
            As my first complete mobile app design, it established foundational skills in user flow design, component consistency, 
            and mobile-first thinking that continue to influence my design approach today.
          </p>
        </div>
      </div>
    </section>
  );
};

const ProblemStatement: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  const problems = [
    "Existing social platforms serve single purposes—Instagram for content, LinkedIn for networking, Fiverr for freelancing",
    "Users need to switch between multiple apps to manage their complete professional and social presence", 
    "No unified platform that seamlessly blends visual storytelling with professional networking and service offerings",
    "Fragmented user experience across different platforms with inconsistent design languages and interaction patterns",
    "Opportunity to explore how modern UI patterns could create a more integrated social-professional ecosystem"
  ];

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-8 h-8 text-pink-500" />
            <h2 className="text-3xl font-bold">DESIGN CHALLENGE</h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            The challenge was to explore:
          </p>
          <div className="space-y-4">
            {problems.map((problem, index) => (
              <div 
                key={index}
                className={`flex items-start gap-3 p-4 bg-dark-700/50 rounded-lg border border-dark-600/30 transform transition-all duration-500 hover:scale-[1.02] hover:border-pink-500/30 ${
                  isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">{problem}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const MyApproach: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  const approaches = [
    {
      icon: Share2,
      title: "Social-First Design Language",
      description: "Adopted Instagram's visual-centric approach with card-based layouts, story formats, and engaging visual hierarchy for content discovery"
    },
    {
      icon: Users,
      title: "Professional Networking Integration", 
      description: "Incorporated LinkedIn's professional profile structure and networking features while maintaining a more casual, approachable aesthetic"
    },
    {
      icon: Briefcase,
      title: "Marketplace Functionality",
      description: "Integrated Fiverr's service marketplace concept with streamlined gig posting, browsing, and transaction flows"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Experience",
      description: "Designed exclusively for mobile to ensure optimal touch interactions, thumb-friendly navigation, and responsive component scaling"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <Wrench className="w-8 h-8 text-purple-500" />
            <h2 className="text-3xl font-bold">MY APPROACH</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {approaches.map((approach, index) => (
              <div 
                key={index}
                className={`p-6 bg-dark-700/50 rounded-xl border border-dark-600/30 transform transition-all duration-500 hover:scale-105 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                  <approach.icon className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-purple-400 mb-3">{approach.title}</h3>
                <p className="text-gray-300">{approach.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const MidPrototypingProcess: React.FC<{ openFullscreen: (src: string) => void }> = ({ openFullscreen }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-purple-500" />
              <h2 className="text-3xl font-bold">MID PROTOTYPING PROCESS</h2>
            </div>
            <p className="text-gray-400 mb-6">Behind the scenes: Figma prototype layout and user flow development</p>
          </div>
          <div className="relative group cursor-pointer" onClick={() => openFullscreen('/images/image 29.png')}>
            <img 
              src="/images/image 29.png" 
              alt="Mid Prototyping Process - Figma Layout"
              className="w-full h-auto rounded-lg shadow-lg group-hover:scale-[1.02] transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-dark-800/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-purple-500/30">
                <span className="text-purple-400 text-sm font-medium">Click to view fullscreen</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectVideoSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  const handleVideoClick = () => {
    window.open('https://www.linkedin.com/posts/rahul-prakash-kanade-43ba15292_uiuxdesign-figmaprototype-appdesign-activity-7326197554419826689-9Tzp', '_blank');
  };

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Play className="w-8 h-8 text-purple-500" />
              <h2 className="text-3xl font-bold">PROJECT VIDEO</h2>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Want to see the Connect app in action? Here's the full video prototype walkthrough!
            </p>

            <div className="flex justify-center">
              <button
                onClick={handleVideoClick}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-600/20 transform hover:scale-105 group"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Watch the Video</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            <p className="text-gray-400 text-sm mt-4">
              Opens in LinkedIn • Full prototype demonstration
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  const reasons = [
    {
      icon: Share2,
      title: "Unified User Experience",
      description: "Successfully combines three distinct platform paradigms into a cohesive interface that feels natural and intuitive"
    },
    {
      icon: Heart,
      title: "Visual Consistency",
      description: "Maintains design consistency across different feature sets while allowing each function to have its own personality"
    },
    {
      icon: Users,
      title: "Familiar Yet Fresh",
      description: "Leverages user familiarity with existing platforms while introducing innovative interaction patterns"
    },
    {
      icon: Smartphone,
      title: "Mobile-Optimized Flow",
      description: "Every interaction is designed for mobile-first usage with thumb-friendly navigation and optimal touch targets"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
          <h2 className="text-3xl font-bold mb-8 text-center">WHY THIS DESIGN WORKS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <div 
                key={index}
                className={`flex items-start gap-4 p-6 bg-dark-700/50 rounded-xl border border-dark-600/30 transform transition-all duration-500 hover:scale-105 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <reason.icon className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{reason.title}</h3>
                  <p className="text-gray-400">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const KeyLearnings: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  const learnings = [
    "First complete mobile app design taught me the importance of consistent component systems and reusable design patterns",
    "Combining multiple platform paradigms requires careful balance—each feature needs to feel integrated, not forced",
    "Mobile-first design thinking fundamentally changes how you approach navigation, content hierarchy, and interaction design",
    "User flow mapping is crucial when designing complex apps—every path needs to feel logical and purposeful",
    "Visual consistency doesn't mean visual monotony—different sections can have personality while maintaining overall cohesion"
  ];

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-8 h-8 text-pink-500" />
            <h2 className="text-3xl font-bold">KEY LEARNINGS</h2>
          </div>
          <div className="space-y-4">
            {learnings.map((learning, index) => (
              <div 
                key={index}
                className={`flex items-start gap-3 p-4 bg-dark-700/50 rounded-lg border border-dark-600/30 transform transition-all duration-500 hover:scale-[1.02] hover:border-pink-500/30 ${
                  isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">{learning}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ToolsUsed: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <Wrench className="w-8 h-8 text-purple-500" />
            <h2 className="text-3xl font-bold">TOOLS USED</h2>
          </div>
          <div className="flex items-center justify-center">
            <div className="px-8 py-4 bg-gradient-to-r from-purple-500/20 to-pink-400/20 rounded-xl border border-purple-500/30 hover:scale-105 transition-all duration-300">
              <span className="text-2xl font-bold text-purple-400">Figma</span>
              <p className="text-gray-400 text-center mt-2">UI design, prototyping, user flow mapping, and component systems</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MoralInsight: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="text-center max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-dark-800/40 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 shadow-2xl">
              <h3 className="text-xl font-semibold text-purple-400 mb-4 italic">Moral Insight</h3>
              <p className="text-lg text-gray-300 leading-relaxed italic font-light">
                "Designing your first real app is like saying hello to your future self. This one was mine—and I learned a lot on the way."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectCaseStudy;