'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Users, BookOpen, Building2, ArrowRight, CheckCircle2, Calendar } from 'lucide-react';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/animations/ScrollReveal';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';
import { usePostHog } from 'posthog-js/react';
import { useSearchParams } from 'next/navigation';

interface Campus {
  name: string;
  description: string;
  image: string;
  location: string;
  phone: string;
  email: string;
  features: string[];
  classSize: string;
  registrationLink: string;
}

const CAMPUSES: Campus[] = [
  {
    name: 'TSH, Paonta Sahib',
    description: 'Our flagship campus offering comprehensive education from primary to senior secondary levels with state-of-the-art facilities.',
    image: 'https://images.tsh.edu.in/campus/paonta-sahib.jpg',
    location: 'Jamniwala Road, Badripur, Paonta Sahib, H.P.',
    phone: '+91 8628800056',
    email: 'info@ps.tsh.edu.in',
    features: ['CBSE Affiliated', 'Classes Pre-Nursery to XII', 'Science, Commerce, Arts for Classes XI & XII', 'Safe Environment'],
    classSize: '28',
    registrationLink: 'https://scholarise.tsh.edu.in/register/cmbdk8dd9000w7ip2rpxsd5rr/cmi3gw27t14k5s6015cgibjhr'
  },
  {
    name: 'TSH, Juniors',
    description: 'Specialized campus for early childhood education with a focus on foundational learning and holistic development.',
    image: 'https://images.tsh.edu.in/campus/juniors.jpg',
    location: 'Near Degree College, Devinagar, Paonta Sahib, H.P.',
    phone: '+91 98057 35656',
    email: 'info@jun.tsh.edu.in',
    features: ['Pre-Nursery to I', 'Play-based Learning', 'Individual Attention', 'Safe Environment'],
    classSize: '24',
    registrationLink: 'https://scholarise.tsh.edu.in/register/cmbg6oyl600067itdktqdvegv/cmi3gw27t14k5s6015cgibjhr'
  },
  {
    name: 'TSH, Majra',
    description: 'A modern campus combining traditional values with contemporary teaching methodologies.',
    image: 'https://images.tsh.edu.in/campus/majra.jpg',
    location: 'Near SBI Majra, Majra, Paonta Sahib, H.P.',
    phone: '+91 96927 00056',
    email: 'info@majra.tsh.edu.in',
    features: ['Classes Pre-Nursery to VI', 'Smart Classrooms', 'Sports Facilities', 'Safe Environment'],
    classSize: '28',
    registrationLink: 'https://scholarise.tsh.edu.in/register/cmel0o6rn0032s601j18hudcg/cmi3gw27t14k5s6015cgibjhr'
  }
];

const ADMISSION_STEPS = [
  {
    title: "Submit Application",
    description: "Fill out the online application form for your preferred campus",
    icon: BookOpen
  },
  {
    title: "Entrance Assessment",
    description: "Complete a grade-appropriate assessment test",
    icon: Users
  },
  {
    title: "Interview",
    description: "Parent and student interaction with school leadership",
    icon: Calendar
  },
  {
    title: "Document Verification",
    description: "Submit required documents for verification",
    icon: CheckCircle2
  },
  {
    title: "Fee Payment",
    description: "Complete the admission process with fee payment",
    icon: Building2
  }
];

export default function Admissions() {
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  // Track QR code visits (billboard and pamphlet)
  useEffect(() => {
    if (!posthog || !searchParams) return;

    const utmSource = searchParams.get('utm_source');
    const utmMedium = searchParams.get('utm_medium');
    const utmCampaign = searchParams.get('utm_campaign');
    const utmContent = searchParams.get('utm_content');

    // Check if this is a QR code billboard visit
    const isQRCodeBillboardVisit = utmSource === 'billboard' && utmMedium === 'qr_code';
    
    // Check if this is a QR code pamphlet visit
    const isQRCodePamphletVisit = utmSource === 'pamphlet' && utmMedium === 'qr_code';

    if (isQRCodeBillboardVisit) {
      // Track QR code billboard visit
      posthog.capture('qr_code_billboard_visit', {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_content: utmContent,
        page: 'admissions',
        timestamp: new Date().toISOString(),
      });

      if (process.env.NODE_ENV === 'development') {
        console.log('[PostHog] QR code billboard visit tracked:', { utmCampaign, utmContent });
      }
    }

    if (isQRCodePamphletVisit) {
      // Track QR code pamphlet visit
      posthog.capture('qr_code_pamphlet_visit', {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_content: utmContent,
        page: 'admissions',
        timestamp: new Date().toISOString(),
      });

      if (process.env.NODE_ENV === 'development') {
        console.log('[PostHog] QR code pamphlet visit tracked:', { utmCampaign, utmContent });
      }
    }
  }, [posthog, searchParams]);

  return (
    <>
      <section className="relative py-40">
        {/* Top fade-in gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white to-transparent z-10" />

        {/* Unique geometric background */}
        <div className="absolute inset-0 bg-[#f8fafc]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2% 50%, rgba(166, 212, 180, 0.9) 0%, transparent 35%),
                             radial-gradient(circle at 98% 20%, rgba(166, 212, 180, 0.9) 0%, transparent 35%),
                             radial-gradient(circle at 50% 90%, rgba(255, 162, 86, 0.7) 0%, transparent 35%)`,
          }} />
          
          {/* Animated wave pattern */}
          <div className="absolute inset-0 opacity-[0.07]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23374151' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 20px',
            animation: 'wave 60s linear infinite',
          }} />
        </div>

        <Container className="relative z-20">
          <BreadcrumbNav />
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="inline-block px-6 py-2 bg-green-light/20 text-green rounded-full text-sm font-medium mb-6">
                Admissions Open 2025-26
              </span>
              <h1 className="text-5xl md:text-6xl font-display text-neutral-dark mb-8">
                Shape Your <span className="text-green">Future</span> With Us
              </h1>
              <p className="text-neutral-dark/70 text-xl max-w-2xl mx-auto">
                Join a legacy of excellence at The Scholars' Home, where every student's potential is nurtured and transformed into achievement.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-10">
            {CAMPUSES.map((campus, index) => (
              <ScrollReveal key={campus.name} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="relative group h-full"
                >
                  {/* Card background effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-light/10 via-primary-light/5 to-transparent rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-green-light/30 to-primary-light/30 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                  
                  {/* Main card */}
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl h-full flex flex-col">
                    {/* Large Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={campus.image}
                        alt={campus.name}
                        width={600}
                        height={192}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-display text-white mb-1">{campus.name}</h3>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 flex flex-col flex-grow">
                      <p className="text-neutral-dark/80 text-lg leading-relaxed mb-6">
                        {campus.description}
                      </p>

                      <div className="space-y-3 mb-6 flex-grow">
                        {campus.features.map(feature => (
                          <div key={feature} className="flex items-center gap-3 text-neutral-dark/80">
                            <CheckCircle2 className="h-5 w-5 text-green flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Key Statistics */}
                      <div className="mb-6 pt-6 border-t border-neutral-100">
                        <div className="text-center">
                          <Users className="h-6 w-6 text-green mx-auto mb-2" />
                          <p className="text-sm text-neutral-dark/70">Class Size</p>
                          <p className="text-lg font-semibold text-neutral-dark">{campus.classSize}</p>
                        </div>
                      </div>

                      <motion.a
                        href={campus.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full bg-green text-white py-3 rounded-xl hover:bg-green-dark transition-colors"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          if (!posthog) return;
                          
                          const utmSource = searchParams?.get('utm_source');
                          const utmMedium = searchParams?.get('utm_medium');
                          const utmCampaign = searchParams?.get('utm_campaign');
                          const utmContent = searchParams?.get('utm_content');
                          const isQRCodeBillboardVisit = utmSource === 'billboard' && utmMedium === 'qr_code';
                          const isQRCodePamphletVisit = utmSource === 'pamphlet' && utmMedium === 'qr_code';
                          const isQRCodeVisit = isQRCodeBillboardVisit || isQRCodePamphletVisit;

                          // Track Apply Now button click
                          posthog.capture('admission_cta_clicked', {
                            campus_name: campus.name,
                            campus_location: campus.location,
                            registration_link: campus.registrationLink,
                            button_location: 'campus_card',
                            page: 'admissions',
                            utm_source: utmSource,
                            utm_medium: utmMedium,
                            utm_campaign: utmCampaign,
                            utm_content: utmContent,
                            is_qr_code_visit: isQRCodeVisit,
                            click_timestamp: new Date().toISOString(),
                          });

                          // Track QR code billboard conversion if applicable
                          if (isQRCodeBillboardVisit) {
                            posthog.capture('qr_code_billboard_conversion', {
                              event_type: 'apply_button_clicked',
                              campus_name: campus.name,
                              utm_campaign: utmCampaign,
                              utm_content: utmContent,
                              conversion_timestamp: new Date().toISOString(),
                            });

                            if (process.env.NODE_ENV === 'development') {
                              console.log('[PostHog] QR code billboard conversion tracked:', { campus: campus.name, utmCampaign });
                            }
                          }

                          // Track QR code pamphlet conversion if applicable
                          if (isQRCodePamphletVisit) {
                            posthog.capture('qr_code_pamphlet_conversion', {
                              event_type: 'apply_button_clicked',
                              campus_name: campus.name,
                              utm_campaign: utmCampaign,
                              utm_content: utmContent,
                              conversion_timestamp: new Date().toISOString(),
                            });

                            if (process.env.NODE_ENV === 'development') {
                              console.log('[PostHog] QR code pamphlet conversion tracked:', { campus: campus.name, utmCampaign });
                            }
                          }
                        }}
                      >
                        Apply Now
                        <ArrowRight className="h-5 w-5" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </Container>

        {/* Bottom decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white to-transparent z-10" />
      </section>

      {/* Admission Steps Section */}
      <section className="pt-2 pb-24 bg-white">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="inline-block px-6 py-2 bg-green-light/20 text-green rounded-full text-sm font-medium mb-6">
                Simple Process
              </span>
              <h2 className="text-4xl md:text-5xl font-display text-neutral-dark mb-8">
                Your Journey <span className="text-green">Begins Here</span>
              </h2>
              <p className="text-neutral-dark/70 text-xl max-w-2xl mx-auto">
                A straightforward path to joining our community of learners
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {ADMISSION_STEPS.map((step, index) => (
              <ScrollReveal key={step.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-green-light/20 flex items-center justify-center mb-4 text-green group-hover:bg-green group-hover:text-white transition-all duration-300">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-display mb-2 text-neutral-dark group-hover:text-green transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-neutral-dark/70">
                      {step.description}
                    </p>
                  </div>
                  {index < ADMISSION_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-green/20" />
                  )}
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
