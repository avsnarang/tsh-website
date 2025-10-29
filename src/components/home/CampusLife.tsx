'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import type { CampusActivity } from '../../types/components';

const activities: CampusActivity[] = [
  {
    title: "Sports & Athletics",
    image: "https://images.tsh.edu.in/homepage/tsh-life/sports.jpg",
    description: "State-of-the-art facilities for various sports including cricket, basketball, and athletics",
    link: "/co-curricular/sports-athletics"
  },
  {
    title: "Arts & Culture",
    image: "https://images.tsh.edu.in/homepage/tsh-life/arts.jpg",
    description: "Regular cultural events, art exhibitions, and performing arts programs",
    link: "/co-curricular/visual-arts"
  },
  {
    title: "Science & Technology",
    image: "https://images.tsh.edu.in/homepage/tsh-life/science.jpg",
    description: "Modern laboratories and regular STEM activities and competitions",
    link: "/co-curricular/science-technology"
  },
  {
    title: "Community Service",
    image: "https://images.tsh.edu.in/homepage/tsh-life/community.jpg",
    description: "Regular outreach programs and social responsibility initiatives",
    link: "/co-curricular/clubs-societies"
  }
];

export default function CampusLife() {
  return (
    <section className="py-24 relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-light/30" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-light/30" />
      </div>

      {/* Extended background pattern with consistent fades */}
      <div className="absolute inset-0">
        {/* Center pattern */}
        <div className="absolute top-[15%] left-0 right-0 h-[70%] opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-[15%] bg-gradient-to-b from-white to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-light/30 text-orange rounded-full mb-4">
            <Compass className="h-4 w-4" />
            <span className="font-medium">Campus Experience</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-neutral-dark font-display mb-4">
            Life at <span className="text-orange">The Scholars' Home</span>
          </h2>
          <p className="text-xl text-neutral-dark/70 max-w-2xl mx-auto">
            Discover a vibrant community where learning extends beyond classrooms
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content Container */}
              <div className="relative p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
                <div className="relative">
                  <h3 className="text-xl font-display text-neutral-dark mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-neutral-dark/70 mb-4 line-clamp-2">
                    {activity.description}
                  </p>
                  <Link
                    href={activity.link}
                    className="inline-flex items-center text-sm text-orange hover:text-orange-600 transition-colors group/link"
                  >
                    <span className="mr-2">Explore More</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-green-50/50 backdrop-blur-sm rounded-2xl p-6 border border-green-100">
            <h4 className="text-xl font-display text-green-600 mb-2">Modern Infrastructure</h4>
            <p className="text-neutral-dark/70">State-of-the-art facilities designed for optimal learning and development</p>
          </div>
          <div className="bg-orange-50/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-100">
            <h4 className="text-xl font-display text-orange-600 mb-2">Student Clubs</h4>
            <p className="text-neutral-dark/70">Diverse range of clubs and societies for extra-curricular engagement</p>
          </div>
          <div className="bg-purple-50/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
            <h4 className="text-xl font-display text-purple-600 mb-2">Safe Environment</h4>
            <p className="text-neutral-dark/70">Secure and nurturing atmosphere for all students</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
