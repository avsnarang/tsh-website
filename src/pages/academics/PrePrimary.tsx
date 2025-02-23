import React from 'react';
import Container from '../../components/ui/Container';
import { Brain, Heart, Star, Users, BookOpen } from 'lucide-react';
import ScrollReveal from '../../components/animations/ScrollReveal';
import TextReveal from '../../components/animations/TextReveal';
import { motion } from 'framer-motion';

export default function PrePrimary() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-neutral-light">
      <Container>
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <TextReveal>
              <h1 className="text-5xl text-neutral-dark mb-6">Pre-Primary School</h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-xl text-primary">Pre-Nursery to UKG</p>
            </TextReveal>
          </div>
        </ScrollReveal>

        {/* Overview Section */}
        <ScrollReveal>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
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
                    className="bg-primary-light/10 p-6 rounded-xl text-center"
                  >
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-neutral-dark font-semibold">{stat.title}</div>
                    <div className="text-primary">{stat.value}</div>
                  </motion.div>
                </ScrollReveal>
              ))}
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
                className="bg-white rounded-2xl shadow-lg p-8"
              >
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
                            <BookOpen className="h-5 w-5 text-primary" />
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
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Teaching Methodology */}
        <ScrollReveal>
          <div className="bg-primary-light/10 rounded-2xl p-8">
            <TextReveal>
              <h2 className="text-3xl text-neutral-dark text-center mb-8">Our Teaching Methodology</h2>
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
                    className="bg-white p-6 rounded-xl"
                  >
                    <TextReveal delay={0.2}>
                      <h3 className="text-xl text-neutral-dark mb-3">{method.title}</h3>
                    </TextReveal>
                    <TextReveal delay={0.3}>
                      <p className="text-neutral-dark/80">{method.description}</p>
                    </TextReveal>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}