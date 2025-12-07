'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { MapPin, Phone, Mail, Clock, Send, Users, Star, Award, ArrowRight, MessageCircle, Building2, PhoneCall } from 'lucide-react';
import Button from '@/components/ui/Button';
import posthog from 'posthog-js';

const contactInfo = [
  {
    campus: "Paonta Sahib Campus",
    address: "Jamniwala Road, Badripur, Paonta Sahib, H.P.",
    phone: "+91 8628800056",
    email: "info@ps.tsh.edu.in",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2066&q=80",
    mapsUrl: "https://maps.app.goo.gl/usUPzCSDEV8S2bpm7"
  },
  {
    campus: "Juniors Campus",
    address: "Near Degree College, Devinagar, Paonta Sahib, H.P.",
    phone: "+91 98057 35656",
    email: "info@jun.tsh.edu.in",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2022&q=80",
    mapsUrl: "https://maps.app.goo.gl/r8ndRFhkiR5YoX9R9"
  },
  {
    campus: "Majra Campus",
    address: "Near SBI Majra, Majra, Paonta Sahib, H.P.",
    phone: "+91 96927 00056",
    email: "info@majra.tsh.edu.in",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1970&q=80",
    mapsUrl: "https://maps.app.goo.gl/juYs3pcXLWUm8UzE9"
  }
];

const quickContacts = [
  { 
    icon: PhoneCall, 
    title: "Call Us", 
    value: "+91 8628800056", 
    href: "tel:+918628800056",
    color: "green" 
  },
  { 
    icon: Mail, 
    title: "Email Us", 
    value: "info@tsh.edu.in", 
    href: "mailto:info@tsh.edu.in",
    color: "orange" 
  },
  { 
    icon: Clock, 
    title: "Office Hours", 
    value: "Mon-Sat: 8AM - 4PM", 
    href: null,
    color: "green" 
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Hero Section - Centered Design */}
      <div className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large decorative circles */}
          <div className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full bg-orange-light/20" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-green-light/20" />
          
          {/* Small floating circles */}
          <div className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full bg-green/10 animate-pulse-slow" />
          <div className="absolute bottom-1/3 left-1/5 w-16 h-16 rounded-full bg-orange/10 animate-pulse-slow" style={{ animationDelay: '2s' }} />

          {/* Center decorative pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Main Content - Centered */}
        <Container className="relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-green-light/20 text-green mb-6"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              <span className="text-sm font-semibold">We'd love to hear from you</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-neutral-dark mb-6 leading-tight"
            >
              Get in <span className="text-green">Touch</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-neutral-dark/70 mb-10 max-w-2xl mx-auto"
            >
              Have questions about admissions, academics, or our campuses? Our team is here to help guide you on your educational journey.
            </motion.p>

            {/* Quick Contact Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
            >
              {quickContacts.map((contact, index) => (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group ${
                    contact.href ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => contact.href && window.open(contact.href, '_self')}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    contact.color === 'green' ? 'from-green-light/10' : 'from-orange-light/10'
                  } to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative">
                    <div className={`w-12 h-12 ${
                      contact.color === 'green' 
                        ? 'bg-gradient-to-br from-green-light to-green' 
                        : 'bg-gradient-to-br from-orange-light to-orange'
                    } rounded-xl flex items-center justify-center mb-4 mx-auto transform group-hover:scale-110 transition-transform`}>
                      <contact.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-display text-lg text-neutral-dark mb-1">{contact.title}</h3>
                    <p className={`text-sm ${
                      contact.color === 'green' ? 'text-green' : 'text-orange'
                    } font-medium`}>{contact.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>

        {/* Gradient fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-light to-transparent" />
      </div>

      {/* Contact Form & Info Section */}
      <section className="py-20 relative">
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-[70%] opacity-[0.03]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
          <div className="absolute top-[40%] left-0 right-0 h-[30%] bg-gradient-to-b from-transparent to-neutral-light" />
        </div>

        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form - Takes 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 group relative bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-light/5 to-transparent rounded-2xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full mb-6">
                  <Send className="h-4 w-4" />
                  <span className="font-medium text-sm">Send a Message</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display text-neutral-dark mb-2">Drop us a line</h3>
                <p className="text-neutral-dark/60 mb-8">We'll get back to you within 24 hours</p>
                
                <form className="space-y-5" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  posthog.capture('contact_form_submitted', {
                    subject: formData.get('subject'),
                  });
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block text-neutral-dark font-medium text-sm">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-dark/10 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent bg-neutral-light/50 transition-all duration-200 placeholder:text-neutral-dark/40"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-neutral-dark font-medium text-sm">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-dark/10 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent bg-neutral-light/50 transition-all duration-200 placeholder:text-neutral-dark/40"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block text-neutral-dark font-medium text-sm">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-dark/10 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent bg-neutral-light/50 transition-all duration-200 placeholder:text-neutral-dark/40"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-neutral-dark font-medium text-sm">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-dark/10 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent bg-neutral-light/50 transition-all duration-200 placeholder:text-neutral-dark/40"
                        placeholder="What's this about?"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-neutral-dark font-medium text-sm">Message</label>
                    <textarea
                      name="message"
                      className="w-full px-4 py-3.5 rounded-xl border border-neutral-dark/10 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent bg-neutral-light/50 h-36 resize-none transition-all duration-200 placeholder:text-neutral-dark/40"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    variant="cta"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 group px-8"
                  >
                    Send Message
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Office Info - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Office Hours Card */}
              <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-light/5 to-transparent rounded-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-light to-orange rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-display text-neutral-dark">Office Hours</h3>
                      <p className="text-neutral-dark/60 text-sm">When to visit us</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2.5 border-b border-neutral-dark/5">
                      <span className="text-neutral-dark/70 text-sm">Monday - Friday</span>
                      <span className="font-semibold text-green text-sm">8:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 border-b border-neutral-dark/5">
                      <span className="text-neutral-dark/70 text-sm">Saturday</span>
                      <span className="font-semibold text-green text-sm">8:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5">
                      <span className="text-neutral-dark/70 text-sm">Sunday</span>
                      <span className="font-semibold text-orange text-sm">Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Cards */}
              <div className="bg-gradient-to-br from-green to-green-dark rounded-2xl p-6 text-white">
                <Users className="h-8 w-8 mb-4 opacity-80" />
                <h4 className="font-display text-xl mb-2">Schedule a Visit</h4>
                <p className="text-green-light/80 text-sm mb-4">Book a campus tour to see our facilities in person</p>
                <Link href="/admissions">
                  <Button variant="outline" className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20 text-sm">
                    Book Tour
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="bg-gradient-to-br from-orange to-orange-dark rounded-2xl p-6 text-white">
                <Award className="h-8 w-8 mb-4 opacity-80" />
                <h4 className="font-display text-xl mb-2">Admissions Open</h4>
                <p className="text-orange-light/80 text-sm mb-4">Session 2026-27 enrollments are now open</p>
                <Link href="/admissions">
                  <Button variant="outline" className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20 text-sm">
                    Apply Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Campus Contacts Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-green-light/20" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-orange-light/20" />
        </div>

        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-[15%] left-0 right-0 h-[70%] opacity-[0.03]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
          <div className="absolute top-0 left-0 right-0 h-[15%] bg-gradient-to-b from-neutral-light to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-neutral-light to-transparent" />
        </div>

        <Container className="relative">
          {/* Section Header */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full mb-4">
              <Building2 className="h-4 w-4" />
              <span className="font-medium text-sm">Our Locations</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-neutral-dark font-display mb-4">
              Visit Our <span className="text-green">Campuses</span>
            </h2>
            <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
              Get in touch with our campus-specific teams for personalized assistance
            </p>
          </motion.div>

          {/* Campus Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((campus, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={campus.image}
                    alt={campus.campus}
                    width={400}
                    height={176}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/90 via-neutral-dark/30 to-transparent" />
                  <h3 className="absolute bottom-4 left-5 text-xl font-display text-white">{campus.campus}</h3>
                </div>

                {/* Content Container */}
                <div className="relative p-5">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-light/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="h-4 w-4 text-green" />
                      </div>
                      <span className="text-neutral-dark/70 text-sm leading-relaxed">{campus.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-light/20 rounded-lg flex items-center justify-center shrink-0">
                        <Phone className="h-4 w-4 text-green" />
                      </div>
                      <a
                        href={`tel:${campus.phone.replace(/\s/g, '')}`}
                        className="text-neutral-dark/70 hover:text-green transition-colors text-sm"
                      >
                        {campus.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-light/20 rounded-lg flex items-center justify-center shrink-0">
                        <Mail className="h-4 w-4 text-green" />
                      </div>
                      <a
                        href={`mailto:${campus.email}`}
                        className="text-neutral-dark/70 hover:text-green transition-colors text-sm"
                      >
                        {campus.email}
                      </a>
                    </div>
                  </div>
                  <a
                    href={campus.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center justify-center w-full gap-2 px-5 py-3 bg-gradient-to-r from-green to-green-dark text-white rounded-xl hover:shadow-lg transition-all duration-300 group/btn text-sm font-medium"
                  >
                    Get Directions
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
