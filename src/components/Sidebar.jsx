import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  LayoutDashboard, 
  Search, 
  Info, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'm' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  const navItems = [
    { icon: <Home size={20} />, label: 'Home', path: '/home' },
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Search size={20} />, label: 'Explore', path: '/explore' },
    { icon: <Info size={20} />, label: 'About', path: '/about' },
  ];

  return (
    <motion.aside
      animate={{ width: isOpen ? 240 : 80 }}
      className="glass border-r border-white/20 h-[calc(100vh-64px)] fixed left-0 top-16 z-40 overflow-hidden flex flex-col"
    >
      <div className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 p-3 rounded-xl transition-all duration-300
              ${isActive 
                ? 'bg-blue-400 text-white shadow-md' 
                : 'text-slate-500 hover:bg-white/50 hover:text-blue-500'}
            `}
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => navigate('/login')}
          className="w-full flex items-center gap-4 p-3 rounded-xl text-slate-500 hover:bg-pink-50 hover:text-pink-500 transition-all duration-300"
        >
          <LogOut size={20} />
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-medium whitespace-nowrap"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <button
          onClick={toggleSidebar}
          className="mt-4 w-full flex items-center justify-center p-2 rounded-lg bg-white/30 text-slate-400 hover:text-blue-400 transition-colors"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
