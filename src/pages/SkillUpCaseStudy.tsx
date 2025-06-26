import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Clock, Target, Lightbulb, Wrench, CheckCircle, Users, Smartphone, Zap, BookOpen, GraduationCap, Brain } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const SkillUpCaseStudy: React.FC = () => {
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
          detail: { caseStudyId: 'skillup' }
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
          {/* Enhanced 3D loading animation with learning theme */}
          <div className="relative mb-12">
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-orange-400/30 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-2 w-16 h-16 border-2 border-blue-300/20 border-r-transparent rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
            <BookOpen className="absolute inset-0 m-auto w-8 h-8 text-blue-400 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400 animate-pulse mb-4">
            Loading Learning Experience
          </h2>
          <div className="w-64 h-2 bg-dark-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-orange-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-400 mt-4 text-sm">Preparing educational journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-dark-950 via-blue-950/20 to-orange-950/20 text-white overflow-hidden transition-all duration-2000 ${
      isEntering ? 'animate-cinematic-zoom' : ''
    }`}>
      {/* Enhanced Progress Bar with learning theme colors */}
      <div className="fixed top-0 left-0 w-full h-1 bg-dark-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-orange-400 transition-all duration-300 shadow-lg shadow-blue-500/50"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Enhanced Back Button */}
      <button
        onClick={goBack}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-dark-800/90 hover:bg-dark-700 backdrop-blur-sm rounded-lg border border-dark-600/50 transition-all duration-300 group hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
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
        <MidDesignProcess openFullscreen={openFullscreen} />
        <WhyItWorks />
        <KeyLearnings />
        <ToolsUsed />
        <MoralInsight />
      </div>

      {/* Enhanced Background Effects with learning theme */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
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
      {/* Enhanced 3D Background Elements with learning theme */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
          style={{
            transform: `translate3d(${mousePosition.x * 20}px, ${mousePosition.y * 20}px, 0) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-48 h-48 bg-orange-500/5 rounded-full blur-2xl"
          style={{
            transform: `translate3d(${mousePosition.x * -30}px, ${mousePosition.y * -30}px, 0) rotateX(${mousePosition.y * -15}deg) rotateY(${mousePosition.x * -15}deg)`
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-10 w-24 h-24 bg-blue-500/8 rounded-full blur-lg"
          style={{
            transform: `translate3d(${mousePosition.x * 15}px, ${mousePosition.y * -25}px, 0) rotateZ(${mousePosition.x * 20}deg)`
          }}
        ></div>
      </div>

      <div className={`text-center space-y-8 transform transition-all duration-2000 max-w-4xl mx-auto ${
        isInView && !isEntering ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
      }`}>
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-orange-400 animate-gradient-x">
            SKILLUP
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-300">
            Onboarding Experience for a Learning App
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive UI/UX case study focused on creating an engaging and intuitive onboarding flow that motivates learners and reduces drop-off rates through thoughtful design and user psychology
          </p>
        </div>

        {/* Hero Image Section */}
        <div className={`mt-12 transform transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
        }`} style={{ transitionDelay: '0.5s' }}>
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-6 border border-dark-600/50 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group cursor-pointer"
                 onClick={() => openFullscreen('/images/ONBOARDING SCREENS copy.png')}>
              <img 
                src="/images/ONBOARDING SCREENS copy.png" 
                alt="SkillUp Onboarding Screens"
                className="w-full h-auto rounded-lg shadow-lg group-hover:scale-[1.02] transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-dark-800/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-500/30">
                  <span className="text-blue-400 text-sm font-medium">Click to view fullscreen</span>
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
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-blue-500" />
            <h2 className="text-3xl font-bold">PROJECT OVERVIEW</h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">
            SkillUp is a comprehensive learning platform designed to make education accessible, engaging, and effective. 
            This project focused on creating an onboarding experience that would immediately communicate the app's value 
            proposition while guiding users through a seamless setup process that encourages long-term engagement and learning success.
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
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-8 h-8 text-blue-500" />
            <h2 className="text-3xl font-bold">PROJECT OUTCOME</h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            The redesigned onboarding flow successfully creates an emotional connection with learners from the first interaction. 
            Through carefully crafted visuals, progressive disclosure, and motivational messaging, the experience reduces cognitive 
            load while building excitement for the learning journey ahead. The result is a welcoming, confidence-building 
            introduction that sets users up for educational success.
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
    "High drop-off rates during initial app setup and account creation",
    "Users feeling overwhelmed by too many options and unclear learning paths", 
    "Lack of emotional engagement and motivation in the first-time user experience",
    "Insufficient communication of the app's unique value proposition and learning methodology",
    "Generic onboarding that didn't reflect the personalized, adaptive nature of the learning platform"
  ];

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-8 h-8 text-orange-500" />
            <h2 className="text-3xl font-bold">WHAT WAS THE PROBLEM?</h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            The original onboarding experience was:
          </p>
          <div className="space-y-4">
            {problems.map((problem, index) => (
              <div 
                key={index}
                className={`flex items-start gap-3 p-4 bg-dark-700/50 rounded-lg border border-dark-600/30 transform transition-all duration-500 hover:scale-[1.02] hover:border-orange-500/30 ${
                  isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
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
      icon: GraduationCap,
      title: "Progressive Learning Introduction",
      description: "Introduced the three core learning pillars (Video Courses, Better Learning, Track Progress) through engaging visuals and clear value propositions"
    },
    {
      icon: Brain,
      title: "Emotional Design Language", 
      description: "Used vibrant, encouraging illustrations and warm color palettes to create a positive, motivating first impression that reduces learning anxiety"
    },
    {
      icon: Users,
      title: "Personalization Focus",
      description: "Emphasized the adaptive, personalized nature of the learning experience to help users understand how the app will cater to their individual needs"
    },
    {
      icon: Smartphone,
      title: "Intuitive Flow Design",
      description: "Created a logical, step-by-step progression that builds confidence while gathering necessary user preferences and learning goals"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <Wrench className="w-8 h-8 text-blue-500" />
            <h2 className="text-3xl font-bold">MY APPROACH</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {approaches.map((approach, index) => (
              <div 
                key={index}
                className={`p-6 bg-dark-700/50 rounded-xl border border-dark-600/30 transform transition-all duration-500 hover:scale-105 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <approach.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-blue-400 mb-3">{approach.title}</h3>
                <p className="text-gray-300">{approach.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const MidDesignProcess: React.FC<{ openFullscreen: (src: string) => void }> = ({ openFullscreen }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-blue-500" />
              <h2 className="text-3xl font-bold">MID DESIGN PROCESS</h2>
            </div>
            <p className="text-gray-400 mb-6">Behind the scenes: Figma design iterations and user flow development</p>
          </div>
          <div className="relative group cursor-pointer" onClick={() => openFullscreen('/images/image 23.png')}>
            <img 
              src="/images/image 23.png" 
              alt="Mid Design Process - Figma Designs"
              className="w-full h-auto rounded-lg shadow-lg group-hover:scale-[1.02] transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-dark-800/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-500/30">
                <span className="text-blue-400 text-sm font-medium">Click to view fullscreen</span>
              </div>
            </div>
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
      icon: BookOpen,
      title: "Clear Learning Value",
      description: "Each screen immediately communicates specific benefits, helping users understand exactly what they'll gain from the platform"
    },
    {
      icon: Brain,
      title: "Reduced Cognitive Load",
      description: "Progressive disclosure and intuitive visual hierarchy prevent information overload while maintaining user engagement"
    },
    {
      icon: GraduationCap,
      title: "Motivational Design",
      description: "Encouraging illustrations and positive messaging build confidence and excitement about the learning journey ahead"
    },
    {
      icon: CheckCircle,
      title: "Seamless User Flow",
      description: "Logical progression through features creates a natural, comfortable introduction that feels guided rather than forced"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
          <h2 className="text-3xl font-bold mb-8 text-center">WHY THIS DESIGN WORKS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <div 
                key={index}
                className={`flex items-start gap-4 p-6 bg-dark-700/50 rounded-xl border border-dark-600/30 transform transition-all duration-500 hover:scale-105 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <reason.icon className="w-6 h-6 text-blue-500" />
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
    "Onboarding is about building confidence, not just collecting information—users need to feel capable and excited about their learning journey",
    "Visual storytelling through illustrations can significantly reduce anxiety and create positive emotional associations with learning",
    "Progressive disclosure is crucial in educational apps—revealing features gradually prevents overwhelm and builds mastery",
    "Personalization messaging from the start helps users envision how the app will adapt to their unique learning style and goals"
  ];

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-8 h-8 text-orange-500" />
            <h2 className="text-3xl font-bold">KEY LEARNINGS</h2>
          </div>
          <div className="space-y-4">
            {learnings.map((learning, index) => (
              <div 
                key={index}
                className={`flex items-start gap-3 p-4 bg-dark-700/50 rounded-lg border border-dark-600/30 transform transition-all duration-500 hover:scale-[1.02] hover:border-orange-500/30 ${
                  isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
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
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <Wrench className="w-8 h-8 text-blue-500" />
            <h2 className="text-3xl font-bold">TOOLS USED</h2>
          </div>
          <div className="flex items-center justify-center">
            <div className="px-8 py-4 bg-gradient-to-r from-blue-500/20 to-orange-400/20 rounded-xl border border-blue-500/30 hover:scale-105 transition-all duration-300">
              <span className="text-2xl font-bold text-blue-400">Figma</span>
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-orange-500/10 to-blue-500/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-dark-800/40 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20 shadow-2xl">
              <h3 className="text-xl font-semibold text-blue-400 mb-4 italic">Moral Insight</h3>
              <p className="text-lg text-gray-300 leading-relaxed italic font-light">
                "Learning should never feel like a chore. A thoughtful design can make curiosity feel natural again."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillUpCaseStudy;