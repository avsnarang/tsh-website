'use client';

import Container from '@/components/ui/Container';
import { Building, ArrowRight, GraduationCap, CheckCircle2 } from 'lucide-react';
import { schoolInfo } from '@/data/schoolData';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
import { motion } from 'framer-motion';

const campusColors = ['green', 'orange', 'green'] as const;

export default function Campuses() {
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Decorative Background Elements */}
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

      {/* Hero Section */}
      <div className="relative pb-8 overflow-hidden">
        <Container className="relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full mb-8"
              >
                <Building className="h-4 w-4" />
                <span className="font-semibold">Our Campuses</span>
              </motion.div>
              <TextReveal>
                <h1 className="font-display text-5xl md:text-7xl text-neutral-dark mb-6">
                  Three <span className="text-green">Campuses</span>, One <span className="text-orange">Vision</span>
                </h1>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-xl text-neutral-dark/70 font-body max-w-2xl mx-auto">
                  Each campus offers a unique environment tailored to different stages of learning, united by our commitment to excellence.
                </p>
              </TextReveal>
            </div>
          </ScrollReveal>
        </Container>
      </div>

      {/* Campus Cards Section */}
      <div className="pb-24">
        <Container>
          <div className="space-y-20">
            {schoolInfo.branches.map((branch, index) => {
              const color = campusColors[index];
              return (
                <ScrollReveal
                  key={branch.location}
                  delay={index * 0.1}
                  direction={index % 2 === 0 ? 'left' : 'right'}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Content Side */}
                    <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                        {/* Decorative border */}
                        <div className={`absolute -top-4 -right-4 w-full h-full border-2 ${color === 'green' ? 'border-green' : 'border-orange'} rounded-2xl`} />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-dark/5 rounded-full -translate-x-32 -translate-y-32 group-hover:scale-110 transition-transform duration-500" />

                        <div className="relative">
                          <div className="flex items-center gap-4 mb-6">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color === 'green' ? 'bg-linear-to-br from-green-light to-green' : 'bg-linear-to-br from-orange-light to-orange'}`}>
                              <Building className="h-7 w-7 text-white" />
                            </div>
                            <div>
                              <h2 className="text-2xl md:text-3xl font-display text-neutral-dark">{branch.location} Campus</h2>
                              <p className={`text-sm ${color === 'green' ? 'text-green' : 'text-orange'}`}>{branch.name}</p>
                            </div>
                          </div>

                          <p className="text-neutral-dark/70 mb-8">{branch.description}</p>

                          <div className="grid grid-cols-2 gap-3 mb-8">
                            {branch.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <CheckCircle2 className={`w-4 h-4 shrink-0 ${color === 'green' ? 'text-green' : 'text-orange'}`} />
                                <span className="text-neutral-dark/70 text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <Link href={`/campus/${branch.location.toLowerCase().replace(' ', '-')}`}>
                            <Button
                              variant={color === 'green' ? 'cta-green' : 'cta'}
                              className="flex items-center gap-2 group w-full sm:w-auto justify-center"
                            >
                              Explore {branch.location} Campus
                              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Image Side */}
                    <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative"
                      >
                        {/* Decorative glow */}
                        <div className={`absolute -inset-4 ${color === 'green' ? 'bg-linear-to-br from-green-light/40 to-green/20' : 'bg-linear-to-br from-orange-light/40 to-orange/20'} rounded-2xl blur-xl`} />

                        <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl">
                          <Image
                            src={branch.imageUrl}
                            alt={`${branch.location} Campus`}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-110"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          <div className={`absolute inset-0 bg-linear-to-t ${color === 'green' ? 'from-green/40' : 'from-orange/40'} to-transparent`} />

                          {/* Floating badge */}
                          <div className={`absolute top-4 right-4 px-4 py-2 rounded-full ${color === 'green' ? 'bg-green' : 'bg-orange'} text-white text-sm font-semibold shadow-lg`}>
                            {branch.location}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative py-24 overflow-hidden bg-green">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-green-light/20" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-orange-light/30" />
          <div className="absolute inset-0 opacity-5">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
        </div>

        <Container className="relative">
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl" />
            <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-orange-light rounded-2xl" />

            <div className="relative bg-white/10 backdrop-blur-xs rounded-2xl p-12">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full mb-8"
                  >
                    <GraduationCap className="h-4 w-4" />
                    <span className="font-semibold">Begin Your Journey</span>
                  </motion.div>

                  <TextReveal>
                    <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
                      Ready to <span className="text-orange-light">Join</span> Our Family?
                    </h2>
                  </TextReveal>
                  <TextReveal delay={0.2}>
                    <p className="text-white/80 text-lg mb-10">
                      Discover the perfect campus for your child. Visit us to experience our world-class facilities and meet our dedicated educators.
                    </p>
                  </TextReveal>

                  <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/admissions">
                      <Button
                        variant="cta"
                        className="flex items-center gap-2 bg-orange text-white hover:bg-orange-dark shadow-xl"
                      >
                        <GraduationCap className="h-5 w-5" />
                        Apply for Admission
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 group border-white text-green hover:bg-white hover:text-green"
                      >
                        Schedule a Visit
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
