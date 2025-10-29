'use client';

import Link from 'next/link';
import { 
  ChevronRight, 
  GraduationCap,
  Info,
  Building,
  BookOpen,
  Music,
  Users,
  Calendar,
  Image,
  Phone,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ALUMNI_ROUTES } from '../../config/routes';

interface MobileMenuProps {
  onClose: () => void;
}

const menuVariants = {
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  closed: {
    opacity: 0,
    x: 50,
    transition: {
      duration: 0.2
    }
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2
    }
  }
};

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      variants={menuVariants}
      className="fixed inset-0 bg-primary z-40"
    >
      <div className="h-screen overflow-y-auto pb-safe">
        <div className="min-h-full pt-32 pb-8 px-6">
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <div className="space-y-4">
                <Link 
                  href="/about" 
                  className="flex items-center justify-between text-xl text-neutral-light hover:text-primary-light transition-colors"
                  onClick={handleLinkClick}
                >
                  <div className="flex items-center gap-3">
                    <Info className="h-5 w-5" />
                    About
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </Link>
                <div className="pl-4 space-y-3">
                  <Link 
                    href="/about/vision" 
                    className="block text-lg text-neutral-light/80 hover:text-primary-light transition-colors"
                    onClick={handleLinkClick}
                  >
                    Vision & Mission
                  </Link>
                  <Link 
                    href="/about/messages" 
                    className="block text-lg text-neutral-light/80 hover:text-primary-light transition-colors"
                    onClick={handleLinkClick}
                  >
                    What our Leaders Say
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="space-y-4">
                <Link 
                  href="/campuses" 
                  className="flex items-center justify-between text-xl text-neutral-light hover:text-primary-light transition-colors"
                  onClick={handleLinkClick}
                >
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5" />
                    Campuses
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </Link>
                <div className="pl-4 space-y-3">
                  <Link 
                    href="/campus/paonta-sahib" 
                    className="block text-lg text-neutral-light/80 hover:text-primary-light transition-colors"
                    onClick={handleLinkClick}
                  >
                    Paonta Sahib
                  </Link>
                  <Link 
                    href="/campus/juniors" 
                    className="block text-lg text-neutral-light/80 hover:text-primary-light transition-colors"
                    onClick={handleLinkClick}
                  >
                    Juniors
                  </Link>
                  <Link 
                    href="/campus/majra" 
                    className="block text-lg text-neutral-light/80 hover:text-primary-light transition-colors"
                    onClick={handleLinkClick}
                  >
                    Majra
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link 
                href="/academics" 
                className="flex items-center justify-between text-xl text-neutral-light hover:text-primary-light transition-colors"
                onClick={handleLinkClick}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5" />
                  Academics
                </div>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link 
                href="/scholarship" 
                className="flex items-center justify-between text-xl text-neutral-light hover:text-primary-light transition-colors"
                onClick={handleLinkClick}
              >
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5" />
                  Scholarship
                </div>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link 
                href="/co-curricular" 
                className="flex items-center justify-between text-xl text-neutral-light hover:text-primary-light transition-colors"
                onClick={handleLinkClick}
              >
                <div className="flex items-center gap-3">
                  <Music className="h-5 w-5" />
                  Co-curricular
                </div>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link 
                href={ALUMNI_ROUTES.HOME}
                className="flex items-center justify-between text-xl text-neutral-light hover:text-primary-light transition-colors"
                onClick={handleLinkClick}
              >
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5" />
                  Alumni
                </div>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link 
                href="/invites" 
                className="flex items-center justify-between text-xl text-neutral-light hover:text-primary-light transition-colors"
                onClick={handleLinkClick}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5" />
                  Events
                </div>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link 
                href="/gallery" 
                className="flex items-center justify-between text-xl text-neutral-light hover:text-primary-light transition-colors"
                onClick={handleLinkClick}
              >
                <div className="flex items-center gap-3">
                  <Image className="h-5 w-5" />
                  Gallery
                </div>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link 
                href="/contact" 
                className="flex items-center justify-between text-xl text-neutral-light hover:text-primary-light transition-colors"
                onClick={handleLinkClick}
              >
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5" />
                  Contact
                </div>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <Link href="/admissions" onClick={handleLinkClick}>
                <Button 
                  variant="cta"
                  className="w-full text-lg flex items-center justify-center gap-2"
                >
                  <GraduationCap className="h-5 w-5" />
                  Join Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
