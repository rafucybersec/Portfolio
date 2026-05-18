import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent py-3 border-t border-[#00ff9d]/10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-cyber-green-dark dark:text-cyber-green text-l font-satoshi">
          &copy; {new Date().getFullYear()} Muhammad Rafay Ali. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;