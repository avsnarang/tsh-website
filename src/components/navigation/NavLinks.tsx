'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { motion, MotionValue } from 'framer-motion';
import { ALUMNI_ROUTES } from '../../config/routes';

interface NavLinksProps {
  textColor: MotionValue<string>;
  isMenuOpen: boolean;
}

export default function NavLinks({ textColor, isMenuOpen }: NavLinksProps) {
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isCampusesHovered, setIsCampusesHovered] = useState(false);

  const dropdownClass = `absolute top-full left-0 w-48 py-2 rounded-lg shadow-lg transition-all duration-300 ${
    isMenuOpen ? 'bg-orange' : 'bg-white'
  }`;

  return (
    <div className="flex items-center space-x-8">
      <div 
        className="relative"
        onMouseEnter={() => setIsAboutHovered(true)}
        onMouseLeave={() => setIsAboutHovered(false)}
      >
        <motion.div style={{ color: isMenuOpen ? '#FFFFFF' : textColor }}>
          <Link 
            href="/about" 
            className="flex items-center gap-1"
          >
            About
            <ChevronDown className={`h-4 w-4 transition-transform ${isAboutHovered ? 'rotate-180' : ''}`} />
          </Link>
        </motion.div>
        
        {isAboutHovered && (
          <div className={dropdownClass}>
            <Link 
              href="/about" 
              className={`block px-4 py-2 ${isMenuOpen ? 'hover:bg-orange-dark text-neutral-light' : 'hover:bg-primary/10 text-neutral-dark'}`}
            >
              Overview
            </Link>
            <Link 
              href="/about/vision" 
              className={`block px-4 py-2 ${isMenuOpen ? 'hover:bg-orange-dark text-neutral-light' : 'hover:bg-primary/10 text-neutral-dark'}`}
            >
              Mission & Vision
            </Link>
            <Link 
              href="/about/messages" 
              className={`block px-4 py-2 ${isMenuOpen ? 'hover:bg-orange-dark text-neutral-light' : 'hover:bg-primary/10 text-neutral-dark'}`}
            >
              What our Leaders Say
            </Link>
            <Link 
              href="/scholarship" 
              className={`block px-4 py-2 ${isMenuOpen ? 'hover:bg-orange-dark text-neutral-light' : 'hover:bg-primary/10 text-neutral-dark'}`}
            >
              Scholarship
            </Link>
          </div>
        )}
      </div>

      <div 
        className="relative"
        onMouseEnter={() => setIsCampusesHovered(true)}
        onMouseLeave={() => setIsCampusesHovered(false)}
      >
        <motion.div style={{ color: isMenuOpen ? '#FFFFFF' : textColor }}>
          <Link 
            href="/campuses" 
            className="flex items-center gap-1"
          >
            Campuses
            <ChevronDown className={`h-4 w-4 transition-transform ${isCampusesHovered ? 'rotate-180' : ''}`} />
          </Link>
        </motion.div>
        
        {isCampusesHovered && (
          <div className={dropdownClass}>
            <Link 
              href="./campus/paonta-sahib" 
              className={`block px-4 py-2 ${isMenuOpen ? 'hover:bg-orange-dark text-neutral-light' : 'hover:bg-primary/10 text-neutral-dark'}`}
            >
              Paonta Sahib
            </Link>
            <Link 
              href="./campus/juniors" 
              className={`block px-4 py-2 ${isMenuOpen ? 'hover:bg-orange-dark text-neutral-light' : 'hover:bg-primary/10 text-neutral-dark'}`}
            >
              Juniors
            </Link>
            <Link 
              href="./campus/majra" 
              className={`block px-4 py-2 ${isMenuOpen ? 'hover:bg-orange-dark text-neutral-light' : 'hover:bg-primary/10 text-neutral-dark'}`}
            >
              Majra
            </Link>
          </div>
        )}
      </div>

      {[
        { to: "/academics", text: "Academics" },
        { to: "/scholarship", text: "Scholarship" },
        { to: "/co-curricular", text: "Co-curricular" },
        { to: ALUMNI_ROUTES.HOME, text: "Alumni" },
        { to: "/invites", text: "Events" },
        { to: "/gallery", text: "Gallery" },
        { to: "/contact", text: "Contact" }
      ].map((link) => (
        <motion.div key={link.to} style={{ color: isMenuOpen ? '#FFFFFF' : textColor }}>
          <Link href={link.to}>{link.text}</Link>
        </motion.div>
      ))}
    </div>
  );
}
