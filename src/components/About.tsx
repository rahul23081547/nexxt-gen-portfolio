import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { Cuboid as Cube, Layout, Bot } from 'lucide-react';

const SkillCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });

  return (
    <div 
      ref={ref} 
      className={`bg-dark-800 p-6 rounded-xl border border-dark-600 transition-all duration-500 transform perspective-1000 ${
        isInView ? 'opacity-100 translate-y-0 rotate-y-0' : 'opacity-0 translate-y-10 rotate-y-45'
      } hover:border-primary-500/30 hover:bg-dark-700 group hover:scale-105 hover:rotate-y-12 hover:shadow-2xl hover:shadow-primary-500/10`}
    >
      <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-all duration-300 transform group-hover:rotate-12">
        <Icon className="w-6 h-6 text-primary-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2 transform transition-transform group-hover:translate-x-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 scroll-mt-20 perspective-1000"
    >
      <div className={`space-y-4 max-w-7xl mx-auto text-center mb-16 transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <h2 className="text-4xl sm:text-5xl font-bold mb-8 animate-fade-in relative">
          Who <span className="text-primary-500">Am I?</span>
          <div className="absolute -inset-1 bg-primary-500/20 blur-lg -z-10 animate-pulse"></div>
        </h2>
        <p className="text-xl text-gray-300 leading-relaxed mb-12 animate-fade-in-up">
          Hi, I'm Rahul Prakash Kanade — a UI/UX designer and 3D enthusiast passionate about creating intuitive and visually striking digital experiences. Currently pursuing my BCA, I love combining design thinking with modern tools, including AI, to craft smooth, animated websites and apps. I learn fast, adapt quickly, and thrive on bringing ideas to life through design. Always curious, always evolving.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* My Journey Section */}
          <div className="lg:col-span-5 transform transition-all duration-700 hover:scale-[1.02] perspective-1000">
            <div className="bg-dark-800 p-8 rounded-xl border border-dark-600 h-full hover:border-primary-500/30 transition-all duration-300 transform hover:rotate-y-6 hover:shadow-2xl hover:shadow-primary-500/10 group">
              <h3 className="text-2xl font-bold mb-4 text-primary-400 transform transition-transform group-hover:translate-x-2">My journey</h3>
              <p className="text-gray-400 text-left transform transition-all duration-300 group-hover:translate-z-10">
                Hey, I'm Rahul Prakash Kanade — a passionate UI/UX designer and 3D creative on a mission to shape digital experiences that not only look stunning but also feel seamless.
                <br /><br />
                My journey began with curiosity — a deep interest in how design influences behavior, how users interact with interfaces, and how I could be a part of building something meaningful. What started as an exploration quickly turned into a purpose.
                <br /><br />
                Over time, I sharpened my skills in UI/UX design and began experimenting with 3D modeling — blending form and function. From creating engaging app designs in Figma to working on complete apps with over 50+ frames, I've consistently challenged myself through real-world projects that push creative boundaries.
                <br /><br />
                I'm just getting started. Let's build something amazing together. 🚀
              </p>
            </div>
          </div>

          {/* Profile Image - Updated with new image */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96 transform hover:scale-105 transition-transform duration-300 perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-400/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-400/10 rounded-full animate-pulse delay-75"></div>
              <img 
                src="/images/My image.png" 
                alt="Rahul Prakash Kanade" 
                className="rounded-full w-full h-full object-cover border-4 border-dark-800 relative z-10 shadow-xl transform hover:rotate-y-12 transition-transform duration-300"
              />
            </div>
          </div>

          {/* My Approach Section */}
          <div className="lg:col-span-5 transform transition-all duration-700 hover:scale-[1.02] perspective-1000">
            <div className="bg-dark-800 p-8 rounded-xl border border-dark-600 h-full hover:border-primary-500/30 transition-all duration-300 transform hover:rotate-y-[-6deg] hover:shadow-2xl hover:shadow-primary-500/10 group">
              <h3 className="text-2xl font-bold mb-4 text-primary-400 transform transition-transform group-hover:translate-x-2">My approach</h3>
              <p className="text-gray-400 text-left transform transition-all duration-300 group-hover:translate-z-10">
                Every project I take on starts the same way — with a question:
                <br /><br />
                "How can I make this feel right for the user?"
                Not just look right. Feel right.
                <br /><br />
                I begin by stepping into their shoes, trying to feel what they feel, think how they think. It's like detective work — mapping out their journey, spotting friction, and uncovering what truly matters.
                <br /><br />
                Once I get the full picture, I move fast. Sketch. Frame. Prototype. Test. It's a rhythm I love — not rushing, but staying in flow. I believe design should evolve with feedback, not fear it.
                <br /><br />
                And through it all, I keep things simple. Clean lines. Intuitive flows. No clutter. Just clear, purposeful design that works beautifully.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkillCard 
            icon={Cube} 
            title="3D Design" 
            description="Building Immersive 3d experience for the web" 
          />
          <SkillCard 
            icon={Layout} 
            title="UI/UX Design" 
            description="Designing intuitive interfaces and seamless User interface" 
          />
          <SkillCard 
            icon={Bot} 
            title="AI Efficiency" 
            description="Blending creativity with AI, I build websites that move beautifully — literally" 
          />
        </div>
      </div>
    </section>
  );
};

export default About;