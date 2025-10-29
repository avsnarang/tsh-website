'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { Phone, Mail, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const socialIconHover = {
  hover: { scale: 1.2, rotate: 15 }
};

const linkHover = {
  hover: { x: 10, transition: { duration: 0.2 } }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-[#A65A20] to-[#7A4217] pt-16 pb-8 overflow-hidden">
      {/* Background Text - Hidden on Mobile */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block"
      >
        <div className="absolute bottom-0 w-full text-[12vw] font-display text-white/15 text-center">
          The Scholars' Home
        </div>
      </motion.div>

      <Container className="relative z-10">
        {/* Main Footer Content */}
        <motion.div 
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12"
        >
          {/* School Info */}
          <motion.div variants={fadeInUp} className="flex flex-col items-center lg:items-start space-y-6">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl text-neutral-light font-display"
            >
              The Scholars' Home
            </motion.h3>
            <motion.p 
              variants={fadeInUp}
              className="text-neutral-light/80 leading-relaxed text-center lg:text-left"
            >
              Since 2003, we have been nurturing young minds and shaping future leaders through 
              excellence in education and holistic development.
            </motion.p>
            <motion.div 
              variants={staggerChildren}
              className="flex gap-6"
            >
              {[
                { icon: Facebook, href: "https://www.facebook.com/tscholarshome", target: "_blank", rel: "noopener noreferrer" },
                { icon: Instagram, href: "https://www.instagram.com/thescholars.home", target: "_blank", rel: "noopener noreferrer" },
                { icon: Linkedin, href: "https://www.linkedin.com/school/thescholarshome", target: "_blank", rel: "noopener noreferrer" },
                { icon: Youtube, href: "https://www.youtube.com/@the.scholarshome", target: "_blank", rel: "noopener noreferrer" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover="hover"
                  variants={socialIconHover}
                  className="text-neutral-light/80 hover:text-neutral-light transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp} className="flex flex-col items-center lg:items-start">
            <motion.h3 
              variants={fadeInUp}
              className="text-xl text-neutral-light mb-6"
            >
              Quick Links
            </motion.h3>
            <motion.ul 
              variants={staggerChildren}
              className="space-y-4 text-center lg:text-left"
            >
              {[
                { to: "/about", label: "About Us" },
                { to: "/admissions", label: "Admissions" },
                { to: "/academics", label: "Academics" },
                { to: "/campuses", label: "Campus Life" },
                { to: "/co-curricular", label: "Co-Curricular" }
              ].map((link) => (
                <motion.li 
                  key={link.label}
                  variants={fadeInUp}
                  whileHover="hover"
                >
                  <Link 
                    to={link.to}
                    className="text-neutral-light/80 hover:text-neutral-light transition-colors block"
                  >
                    <motion.span variants={linkHover} className="inline-block">
                      {link.label}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Our Campuses */}
          <motion.div variants={fadeInUp} className="flex flex-col items-center lg:items-start">
            <motion.h3 
              variants={fadeInUp}
              className="text-xl text-neutral-light mb-6"
            >
              Our Campuses
            </motion.h3>
            <motion.div 
              variants={staggerChildren}
              className="space-y-4 text-center lg:text-left"
            >
              {[
                {
                  name: "Paonta Sahib Campus",
                  phone: "+91 86288 00056",
                  path: "/campus/paonta-sahib"
                },
                {
                  name: "Juniors Campus",
                  phone: "+91 98057 23356",
                  path: "/campus/juniors"
                },
                {
                  name: "Majra Campus",
                  phone: "+91 96927 00056",
                  path: "/campus/majra"
                }
              ].map((campus) => (
                <motion.div 
                  key={campus.name}
                  variants={fadeInUp}
                  whileHover="hover"
                >
                  <Link 
                    to={campus.path}
                    className="text-neutral-light hover:text-neutral-light/80 transition-colors font-semibold block"
                  >
                    <motion.span variants={linkHover} className="inline-block">
                      {campus.name}
                    </motion.span>
                  </Link>
                  <p className="text-neutral-light/60 text-sm">{campus.phone}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp} className="flex flex-col items-center lg:items-start">
            <motion.h3 
              variants={fadeInUp}
              className="text-xl text-neutral-light mb-6"
            >
              Contact Us
            </motion.h3>
            <motion.div 
              variants={staggerChildren}
              className="space-y-4 text-center lg:text-left"
            >
              <motion.div 
                variants={fadeInUp}
                className="flex items-center gap-3 justify-center lg:justify-start"
              >
                <Phone className="h-5 w-5 text-neutral-light/60" />
                <a 
                  href="tel:+918628800056" 
                  className="text-neutral-light/80 hover:text-neutral-light transition-colors"
                >
                  +91 8628800056
                </a>
              </motion.div>
              <motion.div 
                variants={fadeInUp}
                className="flex items-center gap-3 justify-center lg:justify-start"
              >
                <Mail className="h-5 w-5 text-neutral-light/60" />
                <a 
                  href="mailto:info@tsh.edu.in"
                  className="text-neutral-light/80 hover:text-neutral-light transition-colors"
                >
                  info@tsh.edu.in
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="pt-8 border-t border-neutral-light/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6">
              <Link 
                to="/privacy"
                className="text-neutral-light/60 hover:text-neutral-light transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms"
                className="text-neutral-light/60 hover:text-neutral-light transition-colors text-sm"
              >
                Terms of Service
              </Link>
            </div>
            <p className="text-neutral-light/60 text-sm order-first md:order-none">
              © {currentYear} The Scholars' Home. All rights reserved.
            </p>
            <p className="text-neutral-light/60 text-sm">
              Shaping Tomorrow's Leaders Today
            </p>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
}