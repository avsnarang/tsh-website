import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const slides = [
  {
    image: "/images/campus-life.jpg",
    title: "Where Dreams Take Flight",
    subtitle: "Join our vibrant community of learners",
    color: "from-blue-600 to-violet-600"
  },
  {
    image: "/images/academics.jpg",
    title: "Academic Excellence",
    subtitle: "Discover our world-class curriculum",
    color: "from-emerald-600 to-teal-600"
  },
  {
    image: "/images/sports.jpg",
    title: "Beyond the Classroom",
    subtitle: "Excel in sports and extracurriculars",
    color: "from-orange-600 to-red-600"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="relative h-full">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="object-cover w-full h-full"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].color} opacity-60`} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center text-white"
            >
              <h1 className="font-display text-7xl md:text-8xl mb-6">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl mb-12 opacity-90">
                {slides[currentSlide].subtitle}
              </p>
              <div className="flex justify-center gap-6">
                <Button 
                  variant="cta"
                  className="group flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 bg-white' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Arrow Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white z-10"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white z-10"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </section>
  );
}
