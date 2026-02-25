import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <motion.main
        animate={{ paddingLeft: isSidebarOpen ? 240 : 80 }}
        className="pt-4 transition-all duration-300"
      >
        <div className="p-6">
          {children}
        </div>
      </motion.main>
    </div>
  );
};

export default Layout;
