'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, BookOpen, School, Users } from 'lucide-react';
import Button from '../ui/Button';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const quickStats = [
  { icon: Users, value: "1700+", label: "Students" },
  { icon: GraduationCap, value: "100%", label: "Success Rate" },
  { icon: BookOpen, value: "25+", label: "Programs" },
  { icon: School, value: "130+", label: "Qualified Faculty" },
];

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-neutral-light flex items-center justify-center">
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
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 mt-24 lg:mt-4 md:mt-6 sm:mt-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {/* Left Column - Main Content */}
          <motion.div
            className="flex-1 text-center lg:text-left w-full max-w-3xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* School Tag */}
            <motion.div
              className="inline-flex items-center px-4 py-3 rounded-full bg-green-light/20 text-green mb-2 sm:mb-4 lg:mb-6"
              {...fadeIn}
            >
              <span className="text-xs sm:text-sm font-semibold">Best Educational Institute in your region!</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-neutral-dark mb-4 sm:mb-6 leading-tight">
              <span className="text-green">Nurturing</span> Excellence,{" "}
              <span className="text-orange">Building</span> Character
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-dark/70 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
              Join The Scholars' Home for a transformative educational journey. We combine academic excellence with character development to prepare future leaders.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
              <Link href="/admissions" className="w-full sm:w-auto">
                <Button variant="cta" className="flex items-center justify-center gap-2 group w-full sm:w-auto">
                  <GraduationCap className="h-5 w-5" />
                  Begin Your Journey
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button
                  variant="outline2"
                  className="flex items-center justify-center gap-2 group w-full sm:w-auto"
                >
                  Our Story
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-light to-green mb-2 sm:mb-3 mx-auto">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-xl sm:text-2xl font-display text-green">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-dark/70">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            className="flex-1 relative w-full max-w-2xl lg:max-w-none"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-auto">
                <Image
                  src="https://images.tsh.edu.in/homepage/hero.jpeg"
                  alt="Students at The Scholars' Home"
                  width={800}
                  height={600}
                  priority
                  className="w-full h-full object-cover min-h-[300px] sm:min-h-[400px]"
                />
                {/* Overlay gradient
                  <div className="absolute inset-0 bg-gradient-to-t from-green/30 to-transparent" />
                */}
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-full h-full border-2 border-orange rounded-2xl" />
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-full h-full border-2 border-green rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
