import React from 'react';
import { motion } from 'framer-motion';

const Mascot = () => {
  return (
    <motion.div
      animate={{ 
        y: [0, -10, 0],
        rotate: [0, 2, -2, 0]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="relative w-48 h-48 mx-auto"
    >
      {/* Simple representative mascot using shapes since I don't have the image file */}
      <div className="w-40 h-40 bg-blue-100 rounded-full absolute bottom-0 left-4 shadow-inner border-4 border-white"></div>
      <div className="w-12 h-12 bg-pink-100 rounded-full absolute top-8 left-8 border-2 border-white"></div>
      <div className="w-12 h-12 bg-pink-100 rounded-full absolute top-8 right-8 border-2 border-white"></div>
      <div className="absolute top-20 left-1/2 -translate-x-1/2 flex gap-6">
        <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
        <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-8 h-4 border-b-4 border-slate-400 rounded-full"></div>
      
      {/* Sparkles */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -top-2 -right-2 text-2xl"
      >
        ✨
      </motion.div>
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: [1, 0.5, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute top-10 -left-4 text-xl"
      >
        🌈
      </motion.div>
    </motion.div>
  );
};

export default Mascot;
