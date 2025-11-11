'use client';

import { motion } from 'framer-motion';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export default function HorizontalTimeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      {/* Story Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }} // Reduced threshold
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg text-neutral-dark/80 leading-relaxed">
            Founded in 2003, The Scholars' Home began with a vision to provide excellence in education 
            that goes beyond traditional academics. What started as a single campus has grown into three 
            distinguished branches, each serving its unique purpose in our educational mission. From our 
            flagship campus in Paonta Sahib to our specialized Juniors wing and the innovative Majra campus, 
            we've consistently evolved while staying true to our founding principles of nurturing excellence 
            and building character. Over two decades, we've shaped thousands of young minds, achieved numerous 
            milestones, and established ourselves as a leading educational institution in the region. Our 
            journey reflects our commitment to holistic development, academic rigor, and the cultivation of 
            future leaders.
          </p>
        </motion.div>
      </div>

      {/* Desktop Timeline */}
      <div className="hidden md:block relative py-20">
        {/* Timeline Track */}
        <div className="absolute left-0 right-0 h-1 bg-primary/20 top-1/2 -translate-y-1/2" />

        {/* Timeline Events */}
        <div className="flex justify-between relative">
          {events.map((event, index) => (
            <div
              key={index}
              className="w-64 px-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Year Marker */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full top-0 bg-primary" />
                
                {/* Content Card */}
                <div className="mt-8 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  {event.image && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <div className="text-primary font-display text-2xl mb-2">
                    {event.year}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                    {event.title}
                  </h3>
                  <p className="text-neutral-dark/70">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Timeline (Vertical) */}
      <div className="md:hidden relative px-4 py-12">
        <div className="space-y-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }} // Reduced threshold
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-12"
            >
              {/* Year Marker */}
              <div className="absolute left-2 top-4 -translate-x-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>

              {/* Content Card */}
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                {event.image && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                <div className="text-primary font-display text-2xl mb-2">
                  {event.year}
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                  {event.title}
                </h3>
                <p className="text-neutral-dark/70">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
