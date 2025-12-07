'use client';

import Container from '@/components/ui/Container';
import { GraduationCap, Award, BookOpen, ArrowRight, Heart, Star, Users, Trophy, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
import { motion } from 'framer-motion';

const scholarships = [
  {
    icon: Star,
    title: "Merit Scholarship",
    description: "Recognizing academic excellence and outstanding performance",
    color: "green",
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
    color: "orange",
    criteria: [
      "District/State/National level achievements",
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
    color: "green",
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
    color: "orange",
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
      {/* Hero Section */}
      <div className="relative pt-40 pb-24 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Top right decorative circle */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-light/30" />
          {/* Bottom left decorative circle */}
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-light/30" />
          {/* Center decorative pattern */}
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full mb-8"
              >
                <Award className="h-4 w-4" />
                <span className="font-semibold">Financial Aid Programs</span>
              </motion.div>
              <TextReveal>
                <h1 className="font-display text-5xl md:text-7xl text-neutral-dark mb-6">
                  <span className="text-green">Scholarship</span> <span className="text-orange">Programs</span>
                </h1>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-xl text-neutral-dark/70 font-body max-w-2xl mx-auto">
                  Making Quality Education Accessible Through Merit and Need-Based Support
                </p>
              </TextReveal>
            </div>
          </ScrollReveal>

          {/* Stats Grid */}
          <ScrollReveal delay={0.3}>
            <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12">
              {/* Decorative border elements */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl" />
              <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green rounded-2xl" />
              
              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="text-center group"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-green-light to-green rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-display text-neutral-dark mb-1">{stat.value}</div>
                    <div className="text-neutral-dark/60 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </div>

      {/* Scholarships Section */}
      <div className="py-24">
        <Container>
          <div className="space-y-32">
            {scholarships.map((scholarship, index) => (
              <ScrollReveal 
                key={scholarship.title}
                delay={index * 0.1}
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Content Side */}
                  <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                      {/* Decorative Elements */}
                      <div className={`absolute -top-4 -right-4 w-full h-full border-2 ${scholarship.color === 'green' ? 'border-green' : 'border-orange'} rounded-2xl`} />
                      <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-dark/5 rounded-full -translate-x-32 -translate-y-32 group-hover:scale-110 transition-transform duration-500" />
                      
                      <div className="relative">
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${scholarship.color === 'green' ? 'bg-gradient-to-br from-green-light to-green' : 'bg-gradient-to-br from-orange-light to-orange'}`}>
                            <scholarship.icon className="h-7 w-7 text-white" />
                          </div>
                          <div>
                            <h2 className="text-2xl md:text-3xl font-display text-neutral-dark">{scholarship.title}</h2>
                            <p className={`text-sm ${scholarship.color === 'green' ? 'text-green' : 'text-orange'}`}>{scholarship.description}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                          <div className="bg-neutral-light/50 rounded-xl p-5">
                            <h3 className={`text-lg mb-4 font-display ${scholarship.color === 'green' ? 'text-green' : 'text-orange'}`}>Eligibility Criteria</h3>
                            <div className="space-y-2">
                              {scholarship.criteria.map((criterion, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${scholarship.color === 'green' ? 'text-green' : 'text-orange'}`} />
                                  <span className="text-neutral-dark/70 text-sm">{criterion}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-neutral-light/50 rounded-xl p-5">
                            <h3 className={`text-lg mb-4 font-display ${scholarship.color === 'green' ? 'text-green' : 'text-orange'}`}>Benefits</h3>
                            <div className="space-y-2">
                              {scholarship.benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <Star className={`w-4 h-4 mt-0.5 flex-shrink-0 ${scholarship.color === 'green' ? 'text-green' : 'text-orange'}`} />
                                  <span className="text-neutral-dark/70 text-sm">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <Link href="/admissions">
                          <Button 
                            variant={scholarship.color === 'green' ? 'cta-green' : 'cta'}
                            className="flex items-center gap-2 group w-full sm:w-auto justify-center"
                          >
                            Apply for Scholarship
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
                      {/* Decorative frame */}
                      <div className={`absolute -inset-4 ${scholarship.color === 'green' ? 'bg-gradient-to-br from-green-light/40 to-green/20' : 'bg-gradient-to-br from-orange-light/40 to-orange/20'} rounded-2xl blur-xl`} />
                      
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                        <img
                          src={scholarship.image}
                          alt={scholarship.title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${scholarship.color === 'green' ? 'from-green/40' : 'from-orange/40'} to-transparent`} />
                        
                        {/* Floating badge */}
                        <div className={`absolute top-4 right-4 px-4 py-2 rounded-full ${scholarship.color === 'green' ? 'bg-green' : 'bg-orange'} text-white text-sm font-semibold shadow-lg`}>
                          Apply Now
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden bg-green">
        {/* Decorative Background */}
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

        {/* Decorative border frames */}
        <Container className="relative">
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl" />
            <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-orange-light rounded-2xl" />
            
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-12">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full mb-8"
                  >
                    <GraduationCap className="h-4 w-4" />
                    <span className="font-semibold">Start Your Journey</span>
                  </motion.div>
                  
                  <TextReveal>
                    <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
                      Ready to <span className="text-orange-light">Transform</span> Your Future?
                    </h2>
                  </TextReveal>
                  <TextReveal delay={0.2}>
                    <p className="text-white/80 text-lg mb-10">
                      Take the first step towards quality education. Our team is here to guide you through the application process and help you find the right scholarship for your needs.
                    </p>
                  </TextReveal>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/admissions">
                      <Button 
                        variant="cta"
                        className="flex items-center gap-2 bg-orange text-white hover:bg-orange-dark shadow-xl"
                      >
                        <GraduationCap className="h-5 w-5" />
                        Start Application
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button 
                        variant="outline"
                        className="flex items-center gap-2 group border-white text-white hover:bg-white hover:text-green"
                      >
                        Contact Us
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
