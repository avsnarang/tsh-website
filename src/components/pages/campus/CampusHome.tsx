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
import { MapPin, Phone, Mail, ArrowRight, Send } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const getCampusKey = (urlParam: string): CampusKey | null => {
  switch (urlParam) {
    case 'paonta-sahib': return 'paontaSahib';
    case 'juniors': return 'juniors';
    case 'majra': return 'majra';
    default: return null;
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
    if (!info || !contact) router.replace('/campuses');
  }, [info, contact, router]);

  if (!info || !contact) return null;

  const contactItems = [
    { icon: MapPin, title: "Location", content: contact.address, href: null },
    { icon: Phone, title: "Phone", content: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    { icon: Mail, title: "Email", content: contact.email, href: `mailto:${contact.email}` },
  ];

  return (
    <div className="min-h-screen">
      <CampusHero info={info} />
      <CampusFeatures info={info} />
      <LeadershipMessages campusName={campus || ''} />
      <CampusFacilities info={info} />
      <CampusAchievements info={info} />

      {/* Contact Section */}
      <section className="relative py-24 overflow-hidden bg-green">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -right-32 w-[400px] h-[400px] rounded-full bg-green-light/20" />
          <div className="absolute bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-green-dark/30" />
        </div>

        <Container className="relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 text-white rounded-full mb-6"
              >
                <Send className="h-4 w-4" />
                <span className="font-semibold text-sm">Get in Touch</span>
              </motion.div>
              
              <TextReveal>
                <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
                  Contact <span className="text-orange-light">Us</span>
                </h2>
              </TextReveal>
              
              <TextReveal delay={0.2}>
                <p className="text-xl text-white/80 font-body max-w-2xl mx-auto">
                  We would love to hear from you. Reach out for admissions and inquiries.
                </p>
              </TextReveal>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactItems.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                    <div className="w-12 h-12 rounded-xl bg-green flex items-center justify-center mb-4 mx-auto">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-display text-neutral-dark mb-2">{item.title}</h3>
                    {item.href ? (
                      <a href={item.href} className="text-neutral-dark/70 hover:text-green transition-colors text-sm">
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-neutral-dark/70 text-sm">{item.content}</p>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="text-center">
              <Link href="/contact">
                <Button variant="cta" className="text-lg px-8 bg-orange text-white hover:bg-orange-dark shadow-xl">
                  Send Us a Message
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </div>
  );
}
