import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="h-16 glass border-b border-white/20 sticky top-0 z-50 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-400 rounded-xl flex items-center justify-center text-white shadow-lg">
          <Brain size={24} />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
          Deciscope AI
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-slate-500 hidden sm:block">A calmer way to think.</span>
      </div>
    </nav>
  );
};

export default Navbar;
