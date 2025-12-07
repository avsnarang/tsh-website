'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { campusInfo } from '@/data/campusData';
import { contactInfo, CampusKey } from '@/data/contactInfo';
import CampusHero from '@/components/campus/CampusHero';
import CampusFeatures from '@/components/campus/CampusFeatures';
import CampusFacilities from '@/components/campus/CampusFacilities';
import CampusAchievements from '@/components/campus/CampusAchievements';
import LeadershipMessages from '@/components/campus/LeadershipMessages';
import Container from '@/components/ui/Container';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// Convert URL parameter to campusInfo key format
const getCampusKey = (urlParam: string): CampusKey | null => {
  switch (urlParam) {
    case 'paonta-sahib':
      return 'paontaSahib';
    case 'juniors':
      return 'juniors';
    case 'majra':
      return 'majra';
    default:
      return null;
  }
};

export default function CampusHome() {
  const params = useParams();
  const router = useRouter();
  const campus = params?.campus as string | undefined;

  const campusKey = campus ? getCampusKey(campus) : null;
  const info = campusKey ? campusInfo[campusKey] : null;
  const contact = campusKey ? contactInfo[campusKey] : null;

  useEffect(() => {
    if (!info || !contact) {
      router.replace('/campuses');
    }
  }, [info, contact, router]);

  if (!info || !contact) {
    return null;
  }

  const contactItems = [
    {
      icon: MapPin,
      title: "Location",
      content: contact.address,
      href: null,
    },
    {
      icon: Phone,
      title: "Phone",
      content: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      title: "Email",
      content: contact.email,
      href: `mailto:${contact.email}`,
    },
  ];

  return (
    <div className="min-h-screen">
      <CampusHero info={info} />
      <CampusFeatures info={info} />
      <LeadershipMessages campusName={campus || ''} />
      <CampusFacilities info={info} />
      <CampusAchievements info={info} />

      {/* Contact Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Top transition gradient for seamless flow from Achievements */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-green to-transparent z-[2]" />

        {/* Green Background with decorative elements */}
        <div className="absolute inset-0 bg-green">
          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-green-light/20" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-orange-light/20" />
          
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
        </div>

        <Container className="relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full mb-6 backdrop-blur-sm"
              >
                <Mail className="h-4 w-4" />
                <span className="font-semibold text-sm">Get in Touch</span>
              </motion.div>
              
              <TextReveal>
                <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
                  Contact <span className="text-orange-light">Us</span>
                </h2>
              </TextReveal>
              
              <TextReveal delay={0.2}>
                <p className="text-xl text-white/80 font-body max-w-2xl mx-auto">
                  We'd love to hear from you. Reach out for admissions and inquiries.
                </p>
              </TextReveal>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {contactItems.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative group h-full"
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-white/30 to-orange-light/30 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                  
                  <div className="relative bg-white rounded-3xl p-8 shadow-xl group-hover:shadow-2xl transition-all duration-300 h-full text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-light/20 to-green-light/5 flex items-center justify-center mb-6 mx-auto group-hover:from-green group-hover:to-green-dark transition-all duration-300">
                      <item.icon className="w-8 h-8 text-green group-hover:text-white transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-display text-neutral-dark mb-3">
                      {item.title}
                    </h3>
                    {item.href ? (
                      <a 
                        href={item.href}
                        className="text-neutral-dark/70 hover:text-green transition-colors font-body"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-neutral-dark/70 font-body">{item.content}</p>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal delay={0.3}>
            <div className="text-center">
              <Link href="/contact">
                <Button
                  variant="cta"
                  className="group text-lg px-8 bg-white text-green hover:bg-orange-light hover:text-neutral-dark shadow-xl"
                >
                  Send Us a Message
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </div>
  );
}
