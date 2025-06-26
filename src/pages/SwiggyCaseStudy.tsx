import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Clock, Target, Lightbulb, Wrench, CheckCircle, Users, Smartphone, Zap } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const SwiggyCaseStudy: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isEntering, setIsEntering] = useState(false);

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
          detail: { caseStudyId: 'swiggy' }
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

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-dark-950 z-50 flex items-center justify-center">
        <div className="text-center">
          {/* Enhanced 3D loading animation */}
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-primary-400/30 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-2 w-16 h-16 border-2 border-primary-300/20 border-r-transparent rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
          </div>
          <h2 className="text-2xl font-bold text-primary-400 mb-4 animate-pulse">Loading Case Study</h2>
          <div className="w-64 h-2 bg-dark-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-400 mt-4 text-sm">Preparing immersive experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-dark-950 to-dark-900 text-white overflow-hidden transition-all duration-2000 ${
      isEntering ? 'animate-cinematic-zoom' : ''
    }`}>
      {/* Enhanced Progress Bar with glow */}
      <div className="fixed top-0 left-0 w-full h-1 bg-dark-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-primary-600 to-primary-400 transition-all duration-300 shadow-lg shadow-primary-500/50"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Enhanced Back Button */}
      <button
        onClick={goBack}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-dark-800/90 hover:bg-dark-700 backdrop-blur-sm rounded-lg border border-dark-600/50 transition-all duration-300 group hover:scale-105 hover:shadow-lg hover:shadow-primary-500/20"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
        <span>Back to Portfolio</span>
      </button>

      {/* Hero Section */}
      <HeroSection mousePosition={mousePosition} isEntering={isEntering} />

      {/* Main Content with enhanced transitions */}
      <div className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 transition-all duration-1500 ${
        isEntering ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'
      }`} style={{ transitionDelay: '1s' }}>
        <ProjectOverview />
        <ProjectOutcome />
        <ProblemStatement />
        <MyApproach />
        <BeforeAfterComparison />
        <WhyItWorks />
        <KeyLearnings />
        <ToolsUsed />
        <MidDesignProcess />
        <MoralInsight />
      </div>

      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-500/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
    </div>
  );
};

const HeroSection: React.FC<{ mousePosition: { x: number; y: number }, isEntering: boolean }> = ({ mousePosition, isEntering }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center perspective-1000 overflow-hidden">
      {/* Enhanced 3D Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-20 left-20 w-32 h-32 bg-primary-500/10 rounded-full blur-xl"
          style={{
            transform: `translate3d(${mousePosition.x * 20}px, ${mousePosition.y * 20}px, 0) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-48 h-48 bg-primary-500/5 rounded-full blur-2xl"
          style={{
            transform: `translate3d(${mousePosition.x * -30}px, ${mousePosition.y * -30}px, 0) rotateX(${mousePosition.y * -15}deg) rotateY(${mousePosition.x * -15}deg)`
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-10 w-24 h-24 bg-primary-500/8 rounded-full blur-lg"
          style={{
            transform: `translate3d(${mousePosition.x * 15}px, ${mousePosition.y * -25}px, 0) rotateZ(${mousePosition.x * 20}deg)`
          }}
        ></div>
      </div>

      <div className={`text-center space-y-8 transform transition-all duration-2000 ${
        isInView && !isEntering ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
      }`}>
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 animate-gradient-x">
            SWIGGY
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-300">
            Login Experience Redesign
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A comprehensive UI/UX case study focused on enhancing user engagement and conversion rates through strategic design improvements
          </p>
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
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-primary-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-primary-500" />
            <h2 className="text-3xl font-bold">PROJECT OVERVIEW</h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">
            This project involved a conceptual redesign of the Swiggy login screen. The goal was to 
            enhance the user's first impression, communicate trust more effectively, and 
            improve overall visual engagement—all without compromising the original flow.
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
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-primary-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-8 h-8 text-primary-500" />
            <h2 className="text-3xl font-bold">PROJECT OUTCOME</h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            The redesign delivers a visually rich, trust-building, and brand-driven 
            experience. It balances aesthetics and functionality, improving first-time user 
            engagement while staying true to Swiggy's design language.
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
    "Too functional—while efficient, it lacked emotional engagement",
    "Visually generic—not reflective of the brand's scale or services", 
    "Under-informative—offered no value proposition or trust indicators for new users. This could result in lower brand recall and reduced first-time conversion, especially for users unfamiliar with Swiggy",
    "Missed opportunity—failed to communicate what Swiggy offers, especially for users unfamiliar with the platform"
  ];

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-primary-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-8 h-8 text-primary-500" />
            <h2 className="text-3xl font-bold">WHAT WAS THE PROBLEM?</h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            The original Swiggy login screen was:
          </p>
          <div className="space-y-4">
            {problems.map((problem, index) => (
              <div 
                key={index}
                className={`flex items-start gap-3 p-4 bg-dark-700/50 rounded-lg border border-dark-600/30 transform transition-all duration-500 hover:scale-[1.02] hover:border-red-500/30 ${
                  isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
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
      title: "Brand Analysis",
      description: "Included key stats ('10+ crore users', '300+ crore orders') to establish credibility and showcase Swiggy's market dominance"
    },
    {
      title: "Clear Value Proposition", 
      description: "Added a concise tagline 'One app for food, grocery, dining & more in minutes!' to immediately communicate what Swiggy offers"
    },
    {
      title: "Visual Enhancements",
      description: "Used appetizing food imagery and vibrant brand colors to create emotional connection and appetite appeal"
    },
    {
      title: "Structured Hierarchy",
      description: "Carefully organized content using strategic spacing, contrast, and typography to maintain clarity despite the added visual elements"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-primary-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <Wrench className="w-8 h-8 text-primary-500" />
            <h2 className="text-3xl font-bold">MY APPROACH</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {approaches.map((approach, index) => (
              <div 
                key={index}
                className={`p-6 bg-dark-700/50 rounded-xl border border-dark-600/30 transform transition-all duration-500 hover:scale-105 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/10 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <h3 className="text-xl font-semibold text-primary-400 mb-3">{approach.title}</h3>
                <p className="text-gray-300">{approach.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const BeforeAfterComparison: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Before vs After Comparison</h2>
          <p className="text-gray-400">Visual transformation of the login experience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Before */}
          <div className="space-y-4">
            <div className="text-center">
              <span className="inline-block px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-sm font-medium border border-red-500/30">
                ORIGINAL
              </span>
            </div>
            <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-6 border border-dark-600/50 hover:scale-[1.02] transition-all duration-300">
              <img 
                src="/images/swiggy original copy copy copy copy copy copy copy copy.png" 
                alt="Original Swiggy Login"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* After */}
          <div className="space-y-4">
            <div className="text-center">
              <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium border border-primary-500/30">
                MY VERSION
              </span>
            </div>
            <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-6 border border-dark-600/50 hover:scale-[1.02] transition-all duration-300">
              <img 
                src="/images/my version.png" 
                alt="Redesigned Swiggy Login"
                className="w-full h-auto rounded-lg shadow-lg"
              />
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
      icon: Users,
      title: "Stronger First Impression",
      description: "Creates immediate trust through compelling stats and professional visuals that establish credibility"
    },
    {
      icon: Target,
      title: "User Clarity",
      description: "Users instantly understand what Swiggy offers through clear value proposition and visual cues"
    },
    {
      icon: Smartphone,
      title: "Emotional Engagement",
      description: "Appetizing food imagery creates desire and visual warmth, making the experience more inviting"
    },
    {
      icon: CheckCircle,
      title: "Brand Consistency",
      description: "Maintains Swiggy's signature orange palette and design feel while significantly enhancing visual polish"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-primary-500/10 transition-all duration-300">
          <h2 className="text-3xl font-bold mb-8 text-center">WHY THIS DESIGN WORKS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <div 
                key={index}
                className={`flex items-start gap-4 p-6 bg-dark-700/50 rounded-xl border border-dark-600/30 transform transition-all duration-500 hover:scale-105 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/10 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <reason.icon className="w-6 h-6 text-primary-500" />
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
    "Even the smallest screens can communicate powerful brand stories and build meaningful connections",
    "Visual trust elements (like user statistics and compelling imagery) have significant impact on conversion rates",
    "Balancing clarity and creativity is essential in UI design—beauty should never compromise usability",
    "Strategic use of microcopy and visual hierarchy is crucial in guiding seamless user flow and decision-making"
  ];

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-primary-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-8 h-8 text-primary-500" />
            <h2 className="text-3xl font-bold">LEARNINGS</h2>
          </div>
          <div className="space-y-4">
            {learnings.map((learning, index) => (
              <div 
                key={index}
                className={`flex items-start gap-3 p-4 bg-dark-700/50 rounded-lg border border-dark-600/30 transform transition-all duration-500 hover:scale-[1.02] hover:border-primary-500/30 ${
                  isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
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
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-primary-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <Wrench className="w-8 h-8 text-primary-500" />
            <h2 className="text-3xl font-bold">TOOLS USED</h2>
          </div>
          <div className="flex items-center justify-center">
            <div className="px-8 py-4 bg-gradient-to-r from-primary-500/20 to-primary-400/20 rounded-xl border border-primary-500/30 hover:scale-105 transition-all duration-300">
              <span className="text-2xl font-bold text-primary-400">Figma</span>
              <p className="text-gray-400 text-center mt-2">UI design, prototyping, and layout structuring</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MidDesignProcess: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-20">
      <div className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="bg-dark-800/60 backdrop-blur-xl rounded-2xl p-8 border border-dark-600/50 shadow-2xl hover:shadow-primary-500/10 transition-all duration-300">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-primary-500" />
              <h2 className="text-3xl font-bold">MID DESIGN PROCESS</h2>
            </div>
            <p className="text-gray-400 mb-6">Behind the scenes: Design iteration and refinement process</p>
          </div>
          <div className="relative">
            <img 
              src="/images/mid process.png" 
              alt="Mid Design Process"
              className="w-full h-auto rounded-lg shadow-lg hover:scale-[1.02] transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/20 to-transparent rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
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
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-primary-400/10 to-primary-500/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-dark-800/40 backdrop-blur-xl rounded-2xl p-8 border border-primary-500/20 shadow-2xl">
              <h3 className="text-xl font-semibold text-primary-400 mb-4 italic">Moral Insight</h3>
              <p className="text-lg text-gray-300 leading-relaxed italic font-light">
                "Sometimes, all it takes is a warm welcome screen to make users feel like they belong. First impressions matter—even in pixels."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SwiggyCaseStudy;