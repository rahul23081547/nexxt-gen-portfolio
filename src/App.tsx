import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Showcase3D from './components/Showcase3D';
import DesignCarousel from './components/DesignCarousel';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import AudioControl from './components/AudioControl';
import MobileAlert from './components/MobileAlert';
import RealityTransition from './components/RealityTransition';
import EasterEggPopup from './components/EasterEggPopup';
import SwiggyCaseStudy from './pages/SwiggyCaseStudy';
import SkillUpCaseStudy from './pages/SkillUpCaseStudy';
import ConnectCaseStudy from './pages/ConnectCaseStudy';
import SecretRealityPage from './pages/SecretRealityPage';

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showRealityTransition, setShowRealityTransition] = useState(false);
  const [showEasterEggHint, setShowEasterEggHint] = useState(false);
  const [showEasterEggDiscovered, setShowEasterEggDiscovered] = useState(false);
  const [easterEggTimer, setEasterEggTimer] = useState<NodeJS.Timeout | null>(null);
  const [exploredPercentage, setExploredPercentage] = useState(0);
  const [unknownRealityDiscovered, setUnknownRealityDiscovered] = useState(false);
  const [easterEggShownThisSession, setEasterEggShownThisSession] = useState(false);
  const [sectionsViewed, setSectionsViewed] = useState(new Set<string>());
  const [caseStudiesViewed, setCaseStudiesViewed] = useState(new Set<string>());

  // Check if Easter egg was already shown this session
  useEffect(() => {
    const easterEggShown = sessionStorage.getItem('easterEggShown');
    const realityDiscovered = localStorage.getItem('unknownRealityDiscovered');
    const viewedSections = sessionStorage.getItem('viewedSections');
    const viewedCaseStudies = sessionStorage.getItem('viewedCaseStudies');
    
    if (easterEggShown === 'true') {
      setEasterEggShownThisSession(true);
    }
    
    if (realityDiscovered === 'true') {
      setUnknownRealityDiscovered(true);
    }

    if (viewedSections) {
      setSectionsViewed(new Set(JSON.parse(viewedSections)));
    }

    if (viewedCaseStudies) {
      setCaseStudiesViewed(new Set(JSON.parse(viewedCaseStudies)));
    }
  }, []);

  // Enhanced discovery tracking with intersection observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.8, // 80% of section must be visible
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId && !sectionsViewed.has(sectionId)) {
            const newSectionsViewed = new Set(sectionsViewed);
            newSectionsViewed.add(sectionId);
            setSectionsViewed(newSectionsViewed);
            sessionStorage.setItem('viewedSections', JSON.stringify([...newSectionsViewed]));
          }
        }
      });
    }, observerOptions);

    // Observe all main sections
    const sections = document.querySelectorAll('#home, #about, #timeline, #case-studies, #design-interests, #contact');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [sectionsViewed]);

  // Calculate exploration percentage based on discovery logic
  useEffect(() => {
    const totalSections = 6; // home, about, timeline, case-studies, design-interests, contact
    const totalCaseStudies = 3; // swiggy, skillup, connect
    
    let discoveryPercentage = 0;
    
    // Base sections discovery (60% total)
    const sectionProgress = (sectionsViewed.size / totalSections) * 60;
    discoveryPercentage += sectionProgress;
    
    // Case studies discovery (25% total)
    const caseStudyProgress = (caseStudiesViewed.size / totalCaseStudies) * 25;
    discoveryPercentage += caseStudyProgress;
    
    // Unknown Reality discovery (15% total)
    if (unknownRealityDiscovered) {
      discoveryPercentage += 15;
    }
    
    // Cap at 99% if Unknown Reality not discovered, otherwise allow 100%
    if (!unknownRealityDiscovered && discoveryPercentage > 99) {
      discoveryPercentage = 99;
    }
    
    setExploredPercentage(Math.round(discoveryPercentage));
  }, [sectionsViewed, caseStudiesViewed, unknownRealityDiscovered]);

  // Track case study completion
  useEffect(() => {
    const handleCaseStudyComplete = (event: CustomEvent) => {
      const caseStudyId = event.detail.caseStudyId;
      if (!caseStudiesViewed.has(caseStudyId)) {
        const newCaseStudiesViewed = new Set(caseStudiesViewed);
        newCaseStudiesViewed.add(caseStudyId);
        setCaseStudiesViewed(newCaseStudiesViewed);
        sessionStorage.setItem('viewedCaseStudies', JSON.stringify([...newCaseStudiesViewed]));
      }
    };

    window.addEventListener('caseStudyComplete', handleCaseStudyComplete as EventListener);
    return () => window.removeEventListener('caseStudyComplete', handleCaseStudyComplete as EventListener);
  }, [caseStudiesViewed]);

  useEffect(() => {
    // Allow loading screen to complete its animation
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Start content animation slightly after loading screen fades
      setTimeout(() => {
        setShowContent(true);
        
        // Start Easter egg hint timer after content loads (only if not shown this session)
        if (!easterEggShownThisSession) {
          const eggTimer = setTimeout(() => {
            setShowEasterEggHint(true);
          }, 15000); // 15 seconds after content loads
          
          setEasterEggTimer(eggTimer);
        }
      }, 200);
    }, 3000);

    return () => {
      clearTimeout(timer);
      if (easterEggTimer) {
        clearTimeout(easterEggTimer);
      }
    };
  }, [easterEggShownThisSession]);

  const triggerRealityShift = () => {
    // Clear the hint timer if reality shift is triggered
    if (easterEggTimer) {
      clearTimeout(easterEggTimer);
      setEasterEggTimer(null);
    }
    
    // Close hint popup if open
    setShowEasterEggHint(false);
    
    // Show reality transition
    setShowRealityTransition(true);
    
    // Update reality discovered status
    setUnknownRealityDiscovered(true);
    localStorage.setItem('unknownRealityDiscovered', 'true');
    
    // Show discovered popup after transition
    setTimeout(() => {
      setShowEasterEggDiscovered(true);
    }, 4500); // After reality transition completes
  };

  const handleRealityTransitionComplete = () => {
    setShowRealityTransition(false);
  };

  const closeEasterEggHint = () => {
    setShowEasterEggHint(false);
    setEasterEggShownThisSession(true);
    sessionStorage.setItem('easterEggShown', 'true');
  };

  const closeEasterEggDiscovered = () => {
    setShowEasterEggDiscovered(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      
      {/* Reality Transition Overlay */}
      <RealityTransition 
        isVisible={showRealityTransition} 
        onComplete={handleRealityTransitionComplete}
      />
      
      {/* Easter Egg Popups */}
      <EasterEggPopup 
        type="hint"
        isVisible={showEasterEggHint}
        onClose={closeEasterEggHint}
      />
      
      <EasterEggPopup 
        type="discovered"
        isVisible={showEasterEggDiscovered}
        onClose={closeEasterEggDiscovered}
      />
      
      {/* Navigation Bar - Always visible after loading, independent of content transitions */}
      <Navbar isVisible={!isLoading} onRealityShift={triggerRealityShift} />
      
      {/* Mobile Alert - Show only on mobile devices */}
      {!isLoading && <MobileAlert />}
      
      {/* Persistent Controls */}
      {!isLoading && (
        <>
          <CustomCursor />
          <AudioControl />
        </>
      )}
      
      <div className={`min-h-screen bg-gradient-to-br from-dark-950 to-dark-900 text-white transition-all duration-1500 ease-out ${
        isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <main>
            <div className={`transition-all duration-1000 ease-out delay-200 ${
              showContent ? 'transform translate-y-0 opacity-100 scale-100' : 'transform translate-y-12 opacity-0 scale-95'
            }`}>
              <Hero />
            </div>
            <div className={`transition-all duration-1000 ease-out delay-300 ${
              showContent ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
            }`}>
              <About />
            </div>
            <div className={`transition-all duration-1000 ease-out delay-400 ${
              showContent ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
            }`}>
              <Timeline />
            </div>
            <div className={`transition-all duration-1000 ease-out delay-500 ${
              showContent ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
            }`}>
              <Showcase3D />
            </div>
            <div className={`transition-all duration-1000 ease-out delay-600 ${
              showContent ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
            }`}>
              <DesignCarousel 
                exploredPercentage={exploredPercentage}
                unknownRealityDiscovered={unknownRealityDiscovered}
              />
            </div>
            <div className={`transition-all duration-1000 ease-out delay-700 ${
              showContent ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
            }`}>
              <Contact />
            </div>
          </main>
          <div className={`transition-all duration-1000 ease-out delay-800 ${
            showContent ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/case-study/swiggy" element={<SwiggyCaseStudy />} />
        <Route path="/case-study/skillup" element={<SkillUpCaseStudy />} />
        <Route path="/case-study/connect" element={<ConnectCaseStudy />} />
        <Route path="/secret-reality" element={<SecretRealityPage />} />
      </Routes>
    </Router>
  );
}

export default App;