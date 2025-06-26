import React, { useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Mail, Phone, MapPin, Send, Linkedin, Github, MessageSquare } from 'lucide-react';

const ContactItem = ({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: string }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
      <Icon className="w-5 h-5 text-primary-500" />
    </div>
    <div>
      <h4 className="text-lg font-medium">{title}</h4>
      <p className="text-gray-400">{content}</p>
    </div>
  </div>
);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState<{
    message: string;
    type: 'success' | 'error' | '';
  }>({
    message: '',
    type: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formState.name || !formState.email || !formState.message) {
      setFormStatus({
        message: 'Please fill in all fields',
        type: 'error',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setFormStatus({
        message: 'Please enter a valid email address',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create Gmail compose URL with pre-filled content
      const subject = encodeURIComponent(`Portfolio Contact: Message from ${formState.name}`);
      const body = encodeURIComponent(
        `Name: ${formState.name}\n` +
        `Email: ${formState.email}\n\n` +
        `Message:\n${formState.message}\n\n` +
        `---\n` +
        `Sent from Portfolio Contact Form`
      );
      
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=rahulprakashkanade@gmail.com&su=${subject}&body=${body}`;
      
      // Open Gmail in a new tab
      window.open(gmailUrl, '_blank');
      
      // Show success message
      setFormStatus({
        message: 'Gmail opened successfully! Please send the pre-filled email.',
        type: 'success',
      });
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        message: '',
      });
      
      // Clear success message after 8 seconds
      setTimeout(() => {
        setFormStatus({
          message: '',
          type: '',
        });
      }, 8000);
      
    } catch (error) {
      console.error('Error opening Gmail:', error);
      setFormStatus({
        message: 'Error opening Gmail. Please try again or contact directly.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 scroll-mt-20"
    >
      <div className={`space-y-4 max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <h2 className="text-3xl sm:text-4xl font-bold">
          Get In <span className="text-primary-500">Touch</span>
        </h2>
        <p className="text-xl text-gray-300">Let's Make Cool Stuff</p>
        <p className="text-gray-400 mt-6">
          Got an idea? A weird thought? A half-baked plan?
          <br />
          Awesome—I'm all ears.
          <br />
          Whether it's a collab, a fun side project, or just a random creative spark, drop me a message.
          <br />
          Let's turn that spark into something awesome ✨
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className={`space-y-8 transition-all duration-700 delay-100 ${
          isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}>
          <div className="space-y-6 mt-8">
            <ContactItem 
              icon={Mail} 
              title="Email" 
              content="rahulprakashkanade@gmail.com" 
            />
            <ContactItem 
              icon={Phone} 
              title="Phone" 
              content="+91 9588054093" 
            />
            <ContactItem 
              icon={MapPin} 
              title="Location" 
              content="Jaipur, Rajasthan" 
            />
          </div>
          
          <div className="pt-6">
            <h4 className="text-xl font-semibold mb-4">Connect with me</h4>
            <div className="flex space-x-4">
              <a 
                href="https://wa.me/919588054093"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-700 hover:bg-primary-500 text-white rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <span className="sr-only">WhatsApp</span>
                <MessageSquare className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/rahul-prakash-kanade-43ba15292"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-700 hover:bg-primary-500 text-white rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/rahul23081547"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-700 hover:bg-primary-500 text-white rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <span className="sr-only">GitHub</span>
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className={`transition-all duration-700 delay-200 ${
          isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-white"
                placeholder="John Doe"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-white"
                placeholder="john@example.com"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-white resize-none"
                placeholder="Hello, I'd like to talk about..."
                disabled={isSubmitting}
              ></textarea>
            </div>
            
            {formStatus.message && (
              <div className={`p-3 rounded-lg ${
                formStatus.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {formStatus.message}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 disabled:from-gray-600 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-primary-600/20 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? 'Opening Gmail...' : 'Send via Gmail'}</span>
              <Send size={18} />
            </button>
            
            <p className="text-xs text-gray-500 text-center">
              This will open Gmail with a pre-filled message for you to send
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;