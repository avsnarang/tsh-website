import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, BookOpen, Medal, Users } from 'lucide-react';
import Button from '../ui/Button';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const quickStats = [
  { icon: Users, value: "1200+", label: "Students" },
  { icon: GraduationCap, value: "98%", label: "Success Rate" },
  { icon: BookOpen, value: "25+", label: "Programs" },
  { icon: Medal, value: "150+", label: "Awards" },
];

export default function Hero() {
  return (
    <div className="relative min-h-[90vh] bg-neutral-light">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top right decorative circle */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-light/30" />
        {/* Remove the bottom left decorative circle since it's now in Features */}
        
        {/* Center decorative pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center min-h-[90vh] gap-12 pt-40 lg:pt-20 pb-20">
          {/* Left Column - Main Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* School Name Tag */}
            <motion.div
              className="inline-flex items-center px-4 py-3 rounded-full bg-green-light/20 text-green mb-12"
              {...fadeIn}
            >
              <span className="text-sm font-semibold">CBSE Affiliated</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="font-display text-5xl lg:text-7xl text-neutral-dark mb-6">
              <span className="text-green">Nurturing</span> Excellence,{" "}
              <span className="text-orange">Building</span> Character
            </h1>

            {/* Description */}
            <p className="text-lg text-neutral-dark/70 mb-8 max-w-2xl">
              Join The Scholars' Home for a transformative educational journey.
              We combine academic excellence with character development to
              prepare future leaders.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
              <Link to="/admissions">
                <Button variant="cta" className="flex items-center gap-2 group">
                  <GraduationCap className="h-5 w-5" />
                  Begin Your Journey
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline2"
                  className="flex items-center gap-2 group"
                >
                  Our Story
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-light to-green mb-3 mx-auto">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-display text-green">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-dark/70">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Students at The Scholars' Home"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-green/30 to-transparent" />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl" />
              <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
