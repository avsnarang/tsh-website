import React, { useEffect, useState } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import Container from './ui/Container';
import Button from './ui/Button';
import NavLinks from './navigation/NavLinks';
import MobileMenu from './navigation/MobileMenu';
import Logo from './ui/Logo';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(166, 90, 32, 0.95)', 'rgba(255, 255, 255, 1)']
  );
  const textColor = useTransform(
    scrollY,
    [0, 100],
    ['rgb(255, 255, 255)', 'rgb(32, 32, 32)']
  );
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ['none', '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)']
  );

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed w-full z-50 pt-4">
        <Container>
          <motion.div 
            style={{ 
              backgroundColor: isMenuOpen ? 'transparent' : backgroundColor,
              boxShadow: isMenuOpen ? 'none' : boxShadow
            }}
            className="relative flex justify-between items-center rounded-full px-6 py-3 backdrop-blur-sm"
          >
            <motion.div style={{ color: isMenuOpen ? '#FFFFFF' : textColor }}>
              <Logo variant={isMenuOpen ? 'light' : 'default'} />
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              <motion.div style={{ color: isMenuOpen ? '#FFFFFF' : textColor }}>
                <NavLinks textColor={textColor} isMenuOpen={isMenuOpen} />
              </motion.div>
              <Link to="/admissions">
                <Button 
                  variant="cta-green"
                  className="min-w-[160px] flex items-center justify-center gap-2"
                >
                  <GraduationCap className="h-5 w-5" />
                  Join Now
                </Button>
              </Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 z-50"
              style={{ color: isMenuOpen ? '#FFFFFF' : textColor }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </Container>
      </nav>

      <AnimatePresence>
        {isMenuOpen && <MobileMenu onClose={handleCloseMenu} />}
      </AnimatePresence>
    </>
  );
}