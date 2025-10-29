'use client';

import Container from '../components/ui/Container';
import { GraduationCap, Award, BookOpen, ArrowRight, Heart, Star, Users, Trophy } from 'lucide-react';
import Link from 'next/link';
import Button from '../components/ui/Button';
import ScrollReveal from '../components/animations/ScrollReveal';
import TextReveal from '../components/animations/TextReveal';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';
import { motion } from 'framer-motion';

const scholarships = [
  {
    icon: Star,
    title: "Merit Scholarship",
    description: "Recognizing academic excellence and outstanding performance",
    criteria: [
      "Minimum 90% in previous academic year",
      "Excellent conduct record",
      "Regular attendance",
      "Participation in school activities",
      "Recommendation from teachers"
    ],
    benefits: [
      "Up to 100% tuition fee waiver",
      "Academic resources support",
      "Special mentorship program",
      "Recognition at school events"
    ],
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=2066&q=80"
  },
  {
    icon: Trophy,
    title: "Sports Excellence Scholarship",
    description: "Supporting talented athletes and sports achievers",
    criteria: [
      "District/State/National/International level achievements",
      "Regular sports participation",
      "Good academic performance",
      "Physical fitness standards",
      "Coach recommendation"
    ],
    benefits: [
      "Up to 75% fee concession",
      "Sports equipment allowance",
      "Professional coaching",
      "Competition support"
    ],
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    icon: Heart,
    title: "Need-Based Financial Aid",
    description: "Ensuring quality education remains accessible to all deserving students",
    criteria: [
      "Family income assessment",
      "Academic potential",
      "Commitment to education",
      "Parent interview",
      "Required documentation"
    ],
    benefits: [
      "Flexible fee structure",
      "Book bank facility",
      "Transportation support",
      "Extended payment options"
    ],
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    icon: BookOpen,
    title: "Girl Child Scholarship",
    description: "Empowering female education and promoting gender equality",
    criteria: [
      "Female students",
      "Academic performance",
      "Extra-curricular participation",
      "Leadership qualities",
      "Family background"
    ],
    benefits: [
      "Up to 100% fee concession",
      "Special workshops",
      "Leadership training",
      "Career guidance"
    ],
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  }
];

const stats = [
  { icon: Users, value: "200+", label: "Students Supported" },
  { icon: Award, value: "₹50Lakh+", label: "Annual Scholarship Fund" },
  { icon: Star, value: "4", label: "Scholarship Programs" },
  { icon: Trophy, value: "21+", label: "Years of Impact" }
];

export default function Scholarship() {
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Hero Section with Background Pattern */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[#f8fafc]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 2% 50%, rgba(166, 212, 180, 0.9) 0%, transparent 35%),
              radial-gradient(circle at 98% 20%, rgba(166, 212, 180, 0.9) 0%, transparent 35%),
              radial-gradient(circle at 50% 90%, rgba(255, 162, 86, 0.7) 0%, transparent 35%)
            `,
          }} />
        </div>
        
        <Container className="relative z-20">
          <nav className="mb-12">
            <BreadcrumbNav />
          </nav>
          
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light/20 text-primary rounded-full mb-8"
              >
                <Award className="h-4 w-4" />
                <span className="font-semibold">Financial Aid Programs</span>
              </motion.div>
              
              <TextReveal>
                <h1 className="font-display text-5xl md:text-7xl text-neutral-dark mb-6">
                  Scholarship <span className="text-primary">Programs</span>
                </h1>
              </TextReveal>
              
              <TextReveal delay={0.2}>
                <p className="text-xl text-primary font-body max-w-2xl mx-auto mb-12">
                  Making Quality Education Accessible Through Merit and Need-Based Support
                </p>
              </TextReveal>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
                {stats.map((stat, index) => (
                  <ScrollReveal key={index} delay={0.3 + index * 0.1}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <stat.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <div className="text-3xl font-bold text-neutral-dark mb-2">{stat.value}</div>
                      <div className="text-primary text-sm text-center">{stat.label}</div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </div>

      {/* Scholarships Section */}
      <div className="py-24 bg-white">
        <Container>
          <div className="space-y-24">
            {scholarships.map((scholarship, index) => (
              <ScrollReveal 
                key={scholarship.title}
                delay={index * 0.1}
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                        <scholarship.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-3xl font-display text-neutral-dark">{scholarship.title}</h2>
                    </div>
                    
                    <p className="text-lg text-neutral-dark/80 mb-8">{scholarship.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h3 className="text-xl text-primary mb-4 font-display">Eligibility Criteria</h3>
                        <div className="space-y-3">
                          {scholarship.criteria.map((criterion, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              <span className="text-neutral-dark/80">{criterion}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl text-primary mb-4 font-display">Benefits</h3>
                        <div className="space-y-3">
                          {scholarship.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              <span className="text-neutral-dark/80">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Link href="/admissions">
                      <Button 
                        variant="cta"
                        className="flex items-center gap-2 group"
                      >
                        Apply Now
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                      </Button>
                    </Link>
                  </div>
                  
                  <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                      <img
                        src={scholarship.image}
                        alt={scholarship.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/noise.png')] opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange/20 rounded-full -translate-x-48 -translate-y-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green/20 rounded-full translate-x-24 translate-y-24 blur-3xl" />
        
        <Container className="relative">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <TextReveal>
                <h2 className="text-4xl text-white mb-6 font-display">Apply for Scholarship</h2>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-primary-light text-lg mb-8">
                  Take the first step towards quality education. Our team is here to guide you through the application process.
                </p>
              </TextReveal>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/admissions">
                  <Button 
                    variant="cta"
                    className="flex items-center gap-2 bg-white text-primary hover:bg-white/90"
                  >
                    <GraduationCap className="h-5 w-5" />
                    Start Application
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2 group border-white text-white hover:bg-white hover:text-primary"
                  >
                    Contact Us
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </div>
    </div>
  );
}
