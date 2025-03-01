import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from './ui/Button';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  
  // Add these transforms for text animations
  const textY = useTransform(scrollY, [0, 300], [0, 100]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-green-50 to-green-100">
      {/* Minimalist Texture Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 80, 27, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 80, 27, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Subtle Dot Pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(0, 80, 27, 0.15) 1px, transparent 0)
            `,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Gradient Accents */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 pt-20 md:pt-0"
          >
            <motion.div
              style={{ y: textY, opacity: textOpacity }}
              className="flex items-center gap-2 px-3 py-2 bg-white/40 backdrop-blur-sm rounded-full w-fit"
            >
              <Sparkles className="text-primary h-5 w-5" />
              <span className="text-primary font-body font-semibold tracking-wider text-sm">
                NURTURING MINDS SINCE 2003
              </span>
            </motion.div>

            <motion.h1
              style={{ y: textY, opacity: textOpacity }}
              className="font-display text-6xl lg:text-7xl leading-tight"
            >
              <span className="text-primary">Where Learning</span>
              <span className="block text-orange mt-2">Comes Alive!</span>
            </motion.h1>

            <motion.p
              style={{ y: textY, opacity: textOpacity }}
              className="font-body text-xl text-primary/80 leading-relaxed"
            >
              Join our vibrant community where creativity meets excellence.
              Experience world-class education with a perfect blend of
              traditional values and modern innovation.
            </motion.p>

            <motion.div
              style={{ y: textY, opacity: textOpacity }}
              className="flex items-center gap-8"
            >
              <Button
                variant="cta-green"
                className="group relative overflow-hidden px-10 py-5 text-lg"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Begin Your Journey
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                </span>
              </Button>

              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary font-body font-semibold">
                    Admissions Open
                  </span>
                </div>
                <div className="text-primary/60 font-body text-sm pl-6">
                  Limited seats available
                </div>
              </div>
            </motion.div>

            <motion.div
              style={{ y: textY, opacity: textOpacity }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-primary/20"
            >
              {[
                { value: "1200+", label: "Happy Students" },
                { value: "98%", label: "Board Results" },
                { value: "25+", label: "Activities" },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="font-display text-3xl text-orange mb-1">
                    {stat.value}
                  </div>
                  <div className="font-body text-primary/70 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ opacity }}
            className="hidden lg:grid grid-cols-12 gap-4 h-[600px]"
          >
            {/* Main Large Image */}
            <motion.div
              style={{ y: y1 }}
              className="col-span-8 row-span-2 rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.tsh.edu.in/homepage/grid_1.jpg"
                alt="Campus Life"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Side Images */}
            <div className="col-span-4 space-y-4">
              <motion.div
                style={{ y: y1 }}
                className="rounded-2xl overflow-hidden shadow-2xl h-[280px]"
              >
                <img
                  src="https://images.tsh.edu.in/homepage/grid_2.jpg"
                  alt="Music"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
              <motion.div
                style={{ y: y1 }}
                className="rounded-2xl overflow-hidden shadow-2xl h-[280px]"
              >
                <img
                  src="https://images.tsh.edu.in/homepage/grid_4.jpg"
                  alt="Dance"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
