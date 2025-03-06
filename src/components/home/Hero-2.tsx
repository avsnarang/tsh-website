import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, GraduationCap, Medal, Users } from 'lucide-react';
import Button from '../ui/Button';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const integrationIcons = [
  'https://placehold.co/40x40/00501b/ffffff?text=WP',
  'https://placehold.co/40x40/00501b/ffffff?text=React',
  'https://placehold.co/40x40/00501b/ffffff?text=Figma',
  'https://placehold.co/40x40/00501b/ffffff?text=Stripe',
  'https://placehold.co/40x40/00501b/ffffff?text=Webflow',
  'https://placehold.co/40x40/00501b/ffffff?text=Discord',
  'https://placehold.co/40x40/00501b/ffffff?text=Notion',
  'https://placehold.co/40x40/00501b/ffffff?text=Netlify',
];

const quickStats = [
  { icon: Users, value: "1200+", label: "Students" },
  { icon: GraduationCap, value: "98%", label: "Success Rate" },
  { icon: BookOpen, value: "25+", label: "Programs" },
  { icon: Medal, value: "150+", label: "Awards" },
];

export default function Hero2() {
  return (
    <div className="relative min-h-[90vh] bg-gradient-to-r from-orange-light/30 to-green-light/30">
      {/* Main Content */}
      <div className="relative container mx-auto px-4">
        <div className="flex flex-col items-center min-h-[90vh] pt-40 lg:pt-20 pb-20">
          {/* Top Tag */}
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-neutral-dark/10 text-neutral-dark mb-6"
            {...fadeIn}
          >
            <span className="text-sm font-semibold">NEW</span>
            <span className="mx-2 text-sm">Community design showcase</span>
            <ArrowRight className="h-4 w-4" />
          </motion.div>

          {/* Main Heading */}
          <motion.div 
            className="relative mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-light to-orange-light rounded-lg blur-md"></div>
            <motion.h1 
              className="relative font-display text-5xl md:text-6xl lg:text-7xl text-neutral-dark text-center max-w-4xl"
            >
              The Membership
              <br />
              Operating System
            </motion.h1>
          </motion.div>

          {/* Description */}
          <motion.p 
            className="text-lg text-neutral-dark/80 text-center mb-8 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Payments, auth, gating, CRM, email—it's all here. Ditch the cookie cutter platforms and monetize
            your <span className="font-semibold">membership site</span>, <span className="font-semibold">SaaS</span>, <span className="font-semibold">course</span>, <span className="font-semibold">community</span>, or <span className="font-semibold">association</span> using your favorite tools.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/sign-up">
              <Button variant="cta" className="flex items-center gap-2 group">
                Sign up for free
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant="outline2"
                className="flex items-center gap-2 group"
              >
                Is it for me?
              </Button>
            </Link>
          </motion.div>

          {/* Integration Text */}
          <motion.div
            className="text-sm text-neutral-dark/70 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Integrate with nearly any tool or framework under the sun
            <span className="ml-2 text-neutral-dark font-semibold">View all →</span>
          </motion.div>

          {/* Integration Icons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {integrationIcons.map((icon, index) => (
              <motion.img
                key={index}
                src={icon}
                alt="Integration icon"
                className="h-8 w-8 opacity-70 hover:opacity-100 transition-opacity"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
              />
            ))}
          </motion.div>

          {/* Dashboard Preview Image */}
          <motion.div
            className="w-full max-w-5xl mx-auto relative rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <img
              src="https://placehold.co/1200x800/e1ceb9/00501b?text=Dashboard+Preview"
              alt="Dashboard Preview"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
