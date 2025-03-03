import React from 'react';
import Container from '../../components/ui/Container';
import { Brain, Heart, Star, Users, BookOpen } from 'lucide-react';
import ScrollReveal from '../../components/animations/ScrollReveal';
import TextReveal from '../../components/animations/TextReveal';
import { motion } from 'framer-motion';
import { useSEO } from '../../lib/seo';

export default function Secondary() {
  useSEO({
    title: "Secondary School | The Scholars' Home",
    description: "Secondary education program at The Scholars' Home. Preparing students for CBSE board examinations with comprehensive subject coverage.",
    url: "https://tsh.edu.in/academics/secondary"
  });

  return (
    <div className="min-h-screen pt-32 pb-24 bg-neutral-light">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-light/30" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-orange-light/30" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      <Container className="relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light/20 text-primary rounded-full mb-8"
            >
              <Star className="h-4 w-4" />
              <span className="font-semibold">Board Preparation Years</span>
            </motion.div>
            <TextReveal>
              <h1 className="font-display text-5xl md:text-7xl text-neutral-dark mb-4">
                Secondary <span className="text-primary">School</span>
              </h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-xl text-primary">Grades 9-10</p>
            </TextReveal>
          </div>
        </ScrollReveal>

        {/* Overview Section */}
        <ScrollReveal>
          <div className="relative bg-white rounded-2xl shadow-lg p-8 mb-12 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-light/10 via-transparent to-transparent" />
            <div className="relative">
              <TextReveal>
                <h2 className="text-3xl text-neutral-dark mb-6">Program Overview</h2>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-lg text-neutral-dark/80 mb-8">
                  Our Secondary School program prepares students for the CBSE Board examinations while 
                  ensuring comprehensive understanding of subjects and development of critical thinking 
                  skills. The curriculum is designed to build a strong foundation for higher education.
                </p>
              </TextReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Brain, title: "Academic Rigor", value: "Board preparation" },
                  { icon: Heart, title: "Career Guidance", value: "Future planning" },
                  { icon: Star, title: "Practical Learning", value: "Lab work" },
                  { icon: Users, title: "Expert Faculty", value: "Specialized teachers" },
                ].map((stat, index) => (
                  <ScrollReveal key={index} delay={0.3 + index * 0.1}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-primary-light/10 p-6 rounded-xl text-center group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-light to-primary rounded-full flex items-center justify-center mx-auto mb-3">
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
              grade: "Grade 9",
              focus: [
                "Advanced Mathematics",
                "Integrated Science",
                "Language and Literature",
                "Social Sciences",
                "Information Technology"
              ]
            },
            {
              grade: "Grade 10",
              focus: [
                "CBSE Board Preparation",
                "Advanced Sciences",
                "Complex Mathematics",
                "Language Proficiency",
                "Social Studies"
              ]
            }
          ].map((level, index) => (
            <ScrollReveal key={index} delay={index * 0.1} direction={index % 2 === 0 ? 'left' : 'right'}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative bg-white rounded-2xl shadow-lg p-8 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                              <div className="w-6 h-6 bg-gradient-to-br from-primary-light to-primary rounded-full flex items-center justify-center">
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
                          <li>• Board examination readiness</li>
                          <li>• Advanced subject knowledge</li>
                          <li>• Analytical thinking skills</li>
                          <li>• Career path clarity</li>
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
          <div className="relative bg-primary p-12 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-light/10 via-transparent to-transparent" />
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl" />
            <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-orange-light rounded-2xl" />
            
            <div className="relative">
              <TextReveal>
                <h2 className="text-3xl text-white text-center mb-8">Our Teaching Methodology</h2>
              </TextReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Comprehensive Coverage",
                    description: "Thorough coverage of CBSE curriculum with additional focus on understanding concepts"
                  },
                  {
                    title: "Practical Application",
                    description: "Regular laboratory work and hands-on activities to reinforce theoretical learning"
                  },
                  {
                    title: "Regular Assessment",
                    description: "Periodic tests and mock examinations to track progress and improve performance"
                  }
                ].map((method, index) => (
                  <ScrollReveal key={index} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white p-6 rounded-xl group"
                    >
                      <TextReveal delay={0.2}>
                        <h3 className="text-xl text-neutral-dark mb-3 group-hover:text-primary transition-colors">{method.title}</h3>
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
