import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        data-testid="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isDark
            ? 'bg-dark-bg/20 backdrop-blur-[30px] border-b border-white/10 shadow-2xl shadow-black/20'
            : 'bg-white/15 backdrop-blur-[30px] border-b border-black/10 shadow-2xl shadow-black/10'
        }`}
        style={{
          backdropFilter: 'blur(30px) saturate(200%)',
          WebkitBackdropFilter: 'blur(30px) saturate(200%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              data-testid="logo"
              className={`font-display text-lg md:text-xl font-semibold ${
                isDark ? 'text-dark-text' : 'text-light-text'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-primary">{'<'}</span>
              SD
              <span className="text-primary">{'/>'}</span>
            </motion.a>

            {/* Desktop Nav - Centered */}
            <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  data-testid={`nav-${link.name.toLowerCase()}`}
                  className={`text-sm font-medium ${
                    isDark ? 'text-dark-muted hover:text-dark-text' : 'text-light-muted hover:text-light-text'
                  } transition-colors`}
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center gap-3">
              <motion.button
                data-testid="theme-toggle"
                onClick={toggleTheme}
                className={`p-2.5 rounded-full ${
                  isDark ? 'bg-transparent hover:bg-dark-surface text-dark-text' : 'bg-transparent hover:bg-light-surface text-light-text'
                } transition-colors`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <Sun size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Moon size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <button
                data-testid="mobile-menu-toggle"
                className="md:hidden p-2 rounded-lg hover:bg-dark-surface/50"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X size={24} className={isDark ? 'text-dark-text' : 'text-light-text'} />
                ) : (
                  <Menu size={24} className={isDark ? 'text-dark-text' : 'text-light-text'} />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-0 z-40 pt-20 ${
              isDark ? 'bg-dark-bg/80' : 'bg-white/80'
            }`}
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            <div className="flex flex-col items-center gap-8 pt-12">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`font-display text-2xl ${
                    isDark ? 'text-dark-text' : 'text-light-text'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
