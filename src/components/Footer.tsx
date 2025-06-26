import React from 'react';
import { Triangle } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <Triangle className="h-8 w-8 transform rotate-180 fill-primary-500 stroke-primary-500" />
            <span className="text-xl font-bold text-white">Rahul</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400">
              &copy; {currentYear} Rahul. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Designed and built with passion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;