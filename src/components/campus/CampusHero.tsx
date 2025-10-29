'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Users, Building2, GraduationCap, MessageSquareQuote, Trophy } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { CampusInfo } from '../../types/campus';
import OptimizedImage from '../OptimizedImage';
import Link from 'next/link';

interface CampusHeroProps {
  info: CampusInfo;
}

export default function CampusHero({ info }: CampusHeroProps) {
  return (
    <section className="relative py-64 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Unique geometric background */}
        <div className="absolute inset-0 bg-[#f8fafc]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 15% 50%, rgba(166, 212, 180, 0.4) 0%, transparent 50%),
                             radial-gradient(circle at 85% 30%, rgba(166, 212, 180, 0.4) 0%, transparent 50%),
                             radial-gradient(circle at 50% 90%, rgba(255, 162, 86, 0.3) 0%, transparent 50%)`
          }} />
        </div>

        {/* Animated wave pattern */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23374151' fill-opacity='0.8' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 20px'
        }} />
      </div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-green-light/20 text-green rounded-full text-sm font-medium mb-6">
                <MapPin className="h-4 w-4" />
                Discover Our Campus
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-display mb-6 text-neutral-dark">
                Welcome to{" "}
                <span className="relative">
                  <span className="relative z-10 text-green">{info.name}</span>
                </span>
              </h1>

              <p className="text-xl text-neutral-dark/70 max-w-xl">
                {info.description}
              </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {info.stats.map((stat, index) => (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-light/10 via-primary-light/5 to-transparent rounded-2xl transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-green-light/30 to-primary-light/30 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                  
                  <div className="relative bg-white rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-4">
                      {index === 0 && <Users className="w-8 h-8 text-green" />}
                      {index === 1 && <Building2 className="w-8 h-8 text-orange" />}
                      {index === 2 && <GraduationCap className="w-8 h-8 text-primary" />}
                      {index === 3 && <MessageSquareQuote className="w-8 h-8 text-green" />}
                      <div>
                        <div className="text-3xl font-display text-neutral-dark">
                          {stat.value}
                        </div>
                        <div className="text-neutral-dark/60">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                variant="cta"
                className="group text-lg px-8 shadow-xl shadow-green/20"
              >
                Schedule a Visit
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Link href="/about">
                <Button
                  variant="outline2"
                  className="group text-lg px-12 py-4 border-2 flex items-center justify-center"
                >
                  Our Story <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <OptimizedImage
                src={info.facilities[0]?.image || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1"}
                alt={`${info.name} Campus`}
                className="w-full h-full object-cover"
              />
              
              {/* Image Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-dark/30 to-transparent" />
              
              {/* Decorative Elements */}
              <div className="absolute -inset-1 border-2 border-green/30 rounded-3xl transform rotate-3" />
              <div className="absolute -inset-1 border-2 border-orange/30 rounded-3xl transform -rotate-3" />
            </div>

            {/* Floating Achievement Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-light/20 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-green" />
                </div>
                <div>
                  <div className="text-2xl font-display text-neutral-dark">
                    Top 10
                  </div>
                  <div className="text-sm text-neutral-dark/60">
                    Best Campus 2023
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
