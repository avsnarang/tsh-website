'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { MapPin, Phone, Mail, Clock, Send, ArrowRight, Building2, PhoneCall } from 'lucide-react';
import Button from '@/components/ui/Button';
import posthog from 'posthog-js';

const contactInfo = [
  {
    campus: "Paonta Sahib Campus",
    address: "Jamniwala Road, Badripur, Paonta Sahib, H.P.",
    phone: "+91 8628800056",
    email: "info@ps.tsh.edu.in",
    image: "https://images.tsh.edu.in/campus/paonta-sahib.jpg",
    mapsUrl: "https://maps.app.goo.gl/usUPzCSDEV8S2bpm7"
  },
  {
    campus: "Juniors Campus",
    address: "Near Degree College, Devinagar, Paonta Sahib, H.P.",
    phone: "+91 98057 35656",
    email: "info@jun.tsh.edu.in",
    image: "https://images.tsh.edu.in/campus/juniors.jpg",
    mapsUrl: "https://maps.app.goo.gl/r8ndRFhkiR5YoX9R9"
  },
  {
    campus: "Majra Campus",
    address: "Near SBI Majra, Majra, Paonta Sahib, H.P.",
    phone: "+91 96927 00056",
    email: "info@majra.tsh.edu.in",
    image: "https://images.tsh.edu.in/campus/majra.jpg",
    mapsUrl: "https://maps.app.goo.gl/juYs3pcXLWUm8UzE9"
  }
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Decorative Background - Consistent with site */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full bg-orange-light/15" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-green-light/15" />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative pt-36 sm:pt-40 lg:pt-44 pb-20">
        <Container>
          {/* Page Header - Simple and Clean */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl text-neutral-dark mb-3">
              Contact <span className="text-green">Us</span>
            </h1>
            <p className="text-neutral-dark/70 text-lg max-w-xl">
              Get in touch with our team for admissions, inquiries, or campus visits.
            </p>
          </motion.div>

          {/* Quick Contact Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
          >
            <a 
              href="tel:+918628800056"
              className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-light to-green rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <PhoneCall className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-neutral-dark/60">Call Us</p>
                <p className="font-semibold text-neutral-dark">+91 8628800056</p>
              </div>
            </a>
            
            <a 
              href="mailto:info@tsh.edu.in"
              className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-light to-orange rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-neutral-dark/60">Email Us</p>
                <p className="font-semibold text-neutral-dark">info@tsh.edu.in</p>
              </div>
            </a>
            
            <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-green-light to-green rounded-xl flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-neutral-dark/60">Office Hours</p>
                <p className="font-semibold text-neutral-dark">Mon-Sat: 8AM - 4PM</p>
              </div>
            </div>
          </motion.div>

          {/* Main Grid: Form + Campuses */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 bg-white rounded-2xl p-6 md:p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-light/20 rounded-lg flex items-center justify-center">
                  <Send className="h-5 w-5 text-green" />
                </div>
                <h2 className="text-xl font-display text-neutral-dark">Send a Message</h2>
              </div>
              
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                posthog.capture('contact_form_submitted', {
                  subject: formData.get('subject'),
                });
              }}>
                <div className="space-y-1.5">
                  <label className="block text-neutral-dark text-sm font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-dark/10 focus:outline-none focus:ring-2 focus:ring-green/50 focus:border-green bg-neutral-light/30 transition-all text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-neutral-dark text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-dark/10 focus:outline-none focus:ring-2 focus:ring-green/50 focus:border-green bg-neutral-light/30 transition-all text-sm"
                    placeholder="Your email"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-neutral-dark text-sm font-medium">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-dark/10 focus:outline-none focus:ring-2 focus:ring-green/50 focus:border-green bg-neutral-light/30 transition-all text-sm"
                    placeholder="Your phone number"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-neutral-dark text-sm font-medium">Message</label>
                  <textarea
                    name="message"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-dark/10 focus:outline-none focus:ring-2 focus:ring-green/50 focus:border-green bg-neutral-light/30 h-28 resize-none transition-all text-sm"
                    placeholder="How can we help?"
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  variant="cta"
                  className="w-full flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </motion.div>

            {/* Campus Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-light/20 rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-orange" />
                </div>
                <h2 className="text-xl font-display text-neutral-dark">Our Campuses</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {contactInfo.map((campus, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-32 overflow-hidden">
                      <Image
                        src={campus.image}
                        alt={campus.campus}
                        width={300}
                        height={128}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/80 to-transparent" />
                      <h3 className="absolute bottom-3 left-4 text-lg font-display text-white">{campus.campus}</h3>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2.5">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="h-4 w-4 text-green shrink-0 mt-0.5" />
                        <span className="text-neutral-dark/70 text-xs leading-relaxed">{campus.address}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="h-4 w-4 text-green shrink-0" />
                        <a
                          href={`tel:${campus.phone.replace(/\s/g, '')}`}
                          className="text-neutral-dark/70 hover:text-green transition-colors text-xs"
                        >
                          {campus.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Mail className="h-4 w-4 text-green shrink-0" />
                        <a
                          href={`mailto:${campus.email}`}
                          className="text-neutral-dark/70 hover:text-green transition-colors text-xs"
                        >
                          {campus.email}
                        </a>
                      </div>
                      <a
                        href={campus.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-green/10 text-green rounded-xl hover:bg-green hover:text-white transition-all duration-300 text-xs font-medium group/btn"
                      >
                        Get Directions
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
    </div>
  );
}
