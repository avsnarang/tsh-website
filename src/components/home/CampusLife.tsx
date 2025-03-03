import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { CampusActivity } from '../../types/components';

const activities: CampusActivity[] = [
  {
    title: "Sports & Athletics",
    image: "/images/campus/sports.jpg",
    description: "State-of-the-art facilities for various sports including cricket, basketball, and athletics",
    link: "/campus-life/sports"
  },
  {
    title: "Arts & Culture",
    image: "/images/campus/arts.jpg",
    description: "Regular cultural events, art exhibitions, and performing arts programs",
    link: "/campus-life/arts"
  },
  {
    title: "Science & Technology",
    image: "/images/campus/science.jpg",
    description: "Modern laboratories and regular STEM activities and competitions",
    link: "/campus-life/science"
  },
  {
    title: "Community Service",
    image: "/images/campus/community.jpg",
    description: "Regular outreach programs and social responsibility initiatives",
    link: "/campus-life/community"
  }
];

export default function CampusLife() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Campus Life at The Scholars' Home
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience a vibrant and enriching campus life that goes beyond academics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              className="group relative overflow-hidden rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 p-6 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white mb-2">
                  {activity.title}
                </h3>
                <p className="text-white/90 mb-4">
                  {activity.description}
                </p>
                <a
                  href={activity.link}
                  className="inline-block w-fit px-4 py-2 bg-white text-primary font-medium rounded hover:bg-white/90 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="/campus-life"
            className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
          >
            Explore Campus Life
          </a>
        </motion.div>
      </div>
    </section>
  );
}