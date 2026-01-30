'use client';

import Container from '@/components/ui/Container';
import { Brain, Heart, Star, Users, BookOpen } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
import { motion } from 'framer-motion';

export default function PrePrimary() {

  return (
    <div className="min-h-screen pb-24 bg-neutral-light">
      {/* Decorative Background Elements - fixed to cover full viewport */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-light/30" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-light/30" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      <Container className="relative z-20">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full mb-8"
            >
              <Star className="h-4 w-4" />
              <span className="font-semibold">Early Years</span>
            </motion.div>
            <TextReveal>
              <h1 className="font-display text-5xl md:text-7xl text-neutral-dark mb-4">
                Pre-Primary <span className="text-green">School</span>
              </h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-xl text-primary">Pre-Nursery to UKG</p>
            </TextReveal>
          </div>
        </ScrollReveal>

        {/* Overview Section */}
        <ScrollReveal>
          <div className="relative bg-white rounded-2xl shadow-lg p-8 mb-12 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-light/10 via-transparent to-transparent" />
            <div className="relative">
              <TextReveal>
                <h2 className="text-3xl text-neutral-dark mb-6">Program Overview</h2>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-lg text-neutral-dark/80 mb-8">
                  Our Pre-Primary program is designed to provide a strong foundation for lifelong learning. 
                  Through play-based activities and structured learning experiences, we nurture young minds 
                  and help them develop essential skills for future academic success.
                </p>
              </TextReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Brain, title: "Cognitive Development", value: "Age-appropriate activities" },
                  { icon: Heart, title: "Social Skills", value: "Interactive learning" },
                  { icon: Star, title: "Creative Expression", value: "Daily art & music" },
                  { icon: Users, title: "Student-Teacher Ratio", value: "1:15" },
                ].map((stat, index) => (
                  <ScrollReveal key={index} delay={0.3 + index * 0.1}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-primary-light/10 p-6 rounded-xl text-center group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-light/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-light to-green rounded-full flex items-center justify-center mx-auto mb-3">
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-neutral-dark font-semibold">{stat.title}</div>
                        <div className="text-primary">{stat.value}</div>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Grade-wise Curriculum */}
        <div className="space-y-12 mb-16">
          <ScrollReveal>
            <TextReveal>
              <h2 className="text-3xl text-neutral-dark text-center mb-8">Grade-wise Curriculum</h2>
            </TextReveal>
          </ScrollReveal>
          
          {[
            {
              grade: "Pre-Nursery (2-3 years)",
              focus: [
                "Basic motor skills development",
                "Introduction to colors and shapes",
                "Social interaction through play",
                "Basic vocabulary building",
                "Music and movement activities"
              ]
            },
            {
              grade: "Nursery (3-4 years)",
              focus: [
                "Advanced motor skills",
                "Pre-writing activities",
                "Number concepts (1-10)",
                "Environmental awareness",
                "Creative expression through art"
              ]
            },
            {
              grade: "LKG (4-5 years)",
              focus: [
                "Introduction to alphabet and phonics",
                "Number recognition and counting",
                "Basic shapes and patterns",
                "Story-telling and comprehension",
                "Structured play activities"
              ]
            },
            {
              grade: "UKG (5-6 years)",
              focus: [
                "Basic reading and writing",
                "Simple mathematics",
                "Environmental science",
                "Language development",
                "Preparation for Grade 1"
              ]
            }
          ].map((level, index) => (
            <ScrollReveal key={index} delay={index * 0.1} direction={index % 2 === 0 ? 'left' : 'right'}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative bg-white rounded-2xl shadow-lg p-8 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-light/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <TextReveal>
                    <h3 className="text-2xl text-neutral-dark mb-4">{level.grade}</h3>
                  </TextReveal>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <TextReveal delay={0.2}>
                        <h4 className="text-xl text-primary mb-4">Key Focus Areas</h4>
                      </TextReveal>
                      <ul className="space-y-3">
                        {level.focus.map((item, idx) => (
                          <TextReveal key={idx} delay={0.3 + idx * 0.1}>
                            <motion.li
                              whileHover={{ x: 10 }}
                              className="flex items-center gap-3"
                            >
                              <div className="w-6 h-6 bg-gradient-to-br from-green-light to-green rounded-full flex items-center justify-center">
                                <BookOpen className="h-3 w-3 text-white" />
                              </div>
                              <span className="text-neutral-dark/80">{item}</span>
                            </motion.li>
                          </TextReveal>
                        ))}
                      </ul>
                    </div>
                    <ScrollReveal direction="right" delay={0.4}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-primary-light/10 p-6 rounded-xl"
                      >
                        <h4 className="text-xl text-primary mb-4">Learning Outcomes</h4>
                        <ul className="space-y-2 text-neutral-dark/80">
                          <li>• Development of age-appropriate skills</li>
                          <li>• Building confidence and independence</li>
                          <li>• Enhanced social interaction</li>
                          <li>• Foundation for formal education</li>
                        </ul>
                      </motion.div>
                    </ScrollReveal>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Teaching Methodology */}
        <ScrollReveal>
          <div className="relative bg-green p-12 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-light/10 via-transparent to-transparent" />
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl" />
            <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-orange-light rounded-2xl" />
            
            <div className="relative">
              <TextReveal>
                <h2 className="text-3xl text-white text-center mb-8">Our Teaching Methodology</h2>
              </TextReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Play-Based Learning",
                    description: "Learning through structured play activities that make education fun and engaging"
                  },
                  {
                    title: "Montessori Approach",
                    description: "Child-centered education that fosters creativity and natural development"
                  },
                  {
                    title: "Theme-Based Teaching",
                    description: "Integrated learning through monthly themes that connect different subjects"
                  }
                ].map((method, index) => (
                  <ScrollReveal key={index} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white p-6 rounded-xl group"
                    >
                      <TextReveal delay={0.2}>
                        <h3 className="text-xl text-neutral-dark mb-3 group-hover:text-green transition-colors">{method.title}</h3>
                      </TextReveal>
                      <TextReveal delay={0.3}>
                        <p className="text-neutral-dark/80">{method.description}</p>
                      </TextReveal>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}
