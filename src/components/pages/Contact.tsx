'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { MapPin, Phone, Mail, Clock, Send, Users, Star, Award, ArrowRight, MessageCircle, Building2 } from 'lucide-react';
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

const stats = [
  { icon: Users, value: "100%", label: "Parent Satisfaction" },
  { icon: Star, value: "3", label: "Campus Locations" },
  { icon: Clock, value: "8AM-4PM", label: "Office Hours" },
  { icon: Award, value: "21+", label: "Years of Service" }
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Hero Section - Matching Home Page Style */}
      <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top right decorative circle */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-light/30" />
          {/* Bottom left decorative circle */}
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-light/30" />

          {/* Center decorative pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 mt-24 lg:mt-4 md:mt-6 sm:mt-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-16">
            {/* Left Column - Main Content */}
            <div className="flex-1 text-center lg:text-left w-full max-w-3xl animate-[fadeIn_0.3s_ease-out]">
              {/* Tag */}
              <div className="inline-flex items-center px-4 py-3 rounded-full bg-green-light/20 text-green mb-2 sm:mb-4 lg:mb-6">
                <MessageCircle className="h-4 w-4 mr-2" />
                <span className="text-xs sm:text-sm font-semibold">We're here to help!</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-neutral-dark mb-4 sm:mb-6 leading-tight">
                <span className="text-green">Get in</span> Touch{" "}
                <span className="text-orange">With Us</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-neutral-dark/70 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
                Have questions about admissions, programs, or our campuses? Our team is ready to assist you. Reach out and we'll get back to you as soon as possible.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
                <Link href="/admissions" className="w-full sm:w-auto">
                  <Button variant="cta" className="flex items-center justify-center gap-2 group w-full sm:w-auto">
                    <Mail className="h-5 w-5" />
                    Apply Now
                  </Button>
                </Link>
                <Link href="/campuses" className="w-full sm:w-auto">
                  <Button
                    variant="outline2"
                    className="flex items-center justify-center gap-2 group w-full sm:w-auto"
                  >
                    <Building2 className="h-5 w-5" />
                    View Campuses
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-light to-green mb-2 sm:mb-3 mx-auto">
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="text-xl sm:text-2xl font-display text-green">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-neutral-dark/70">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="flex-1 relative w-full max-w-2xl lg:max-w-none animate-[fadeIn_0.3s_ease-out]">
              <div className="relative">
                {/* Main Image */}
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                    alt="Contact The Scholars' Home"
                    width={800}
                    height={600}
                    priority
                    className="w-full h-full object-cover min-h-[300px] sm:min-h-[400px]"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-green/20 to-transparent" />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-full h-full border-2 border-orange rounded-2xl" />
                <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-full h-full border-2 border-green rounded-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Gradient fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-light to-transparent" />
      </div>

      {/* Contact Form & Info Section */}
      <section className="py-24 relative">
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-[70%] opacity-5">
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
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-light/30 text-orange rounded-full mb-4">
              <Send className="h-4 w-4" />
              <span className="font-medium">Send a Message</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-neutral-dark font-display mb-4">
              How Can We <span className="text-orange">Help You</span>?
            </h2>
            <p className="text-xl text-neutral-dark/70 max-w-2xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-light/5 to-transparent rounded-2xl" />
              <div className="relative">
                <h3 className="text-2xl font-display text-neutral-dark mb-8">Send us a message</h3>
                <form className="space-y-6" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  posthog.capture('contact_form_submitted', {
                    subject: formData.get('subject'),
                  });
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-neutral-dark font-medium text-sm">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-dark/10 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent bg-neutral-light/50 transition-all duration-200"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-neutral-dark font-medium text-sm">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-dark/10 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent bg-neutral-light/50 transition-all duration-200"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-neutral-dark font-medium text-sm">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-dark/10 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent bg-neutral-light/50 transition-all duration-200"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-neutral-dark font-medium text-sm">Message</label>
                    <textarea
                      name="message"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-dark/10 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent bg-neutral-light/50 h-32 resize-none transition-all duration-200"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    variant="cta"
                    className="w-full flex items-center justify-center gap-2 group"
                  >
                    Send Message
                    <Send className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Office Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Office Hours Card */}
              <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-light/5 to-transparent rounded-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-light to-orange rounded-xl flex items-center justify-center">
                      <Clock className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display text-neutral-dark">Office Hours</h3>
                      <p className="text-neutral-dark/70 text-sm">When you can reach us</p>
                    </div>
                  </div>
                  <div className="space-y-4 pl-[4.5rem]">
                    <div className="flex justify-between items-center py-3 border-b border-neutral-dark/5">
                      <span className="text-neutral-dark/70">Monday - Friday</span>
                      <span className="font-semibold text-green">8:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-neutral-dark/5">
                      <span className="text-neutral-dark/70">Saturday</span>
                      <span className="font-semibold text-green">8:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-neutral-dark/70">Sunday</span>
                      <span className="font-semibold text-orange">Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green to-green-dark rounded-2xl p-6 text-white">
                  <Phone className="h-8 w-8 mb-4 opacity-80" />
                  <h4 className="font-display text-lg mb-2">Call Us</h4>
                  <a href="tel:+918628800056" className="text-green-light hover:text-white transition-colors">
                    +91 8628800056
                  </a>
                </div>
                <div className="bg-gradient-to-br from-orange to-orange-dark rounded-2xl p-6 text-white">
                  <Mail className="h-8 w-8 mb-4 opacity-80" />
                  <h4 className="font-display text-lg mb-2">Email Us</h4>
                  <a href="mailto:info@tsh.edu.in" className="text-orange-light hover:text-white transition-colors">
                    info@tsh.edu.in
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Campus Contacts Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-light/30" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-light/30" />
        </div>

        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-[15%] left-0 right-0 h-[70%] opacity-5">
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
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full mb-4">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">Our Locations</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-neutral-dark font-display mb-4">
              Visit Our <span className="text-green">Campuses</span>
            </h2>
            <p className="text-xl text-neutral-dark/70 max-w-2xl mx-auto">
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
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={campus.image}
                    alt={campus.campus}
                    width={400}
                    height={192}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/80 via-neutral-dark/20 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-2xl font-display text-white">{campus.campus}</h3>
                </div>

                {/* Content Container */}
                <div className="relative p-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-light/5 to-transparent rounded-2xl" />
                  <div className="relative space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-light/20 rounded-lg flex items-center justify-center shrink-0">
                        <MapPin className="h-4 w-4 text-green" />
                      </div>
                      <span className="text-neutral-dark/70 text-sm">{campus.address}</span>
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
                    <a
                      href={campus.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center w-full gap-2 px-6 py-3 bg-gradient-to-r from-green to-green-dark text-white rounded-xl hover:shadow-lg transition-all duration-300 group/btn"
                    >
                      Get Directions
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-2" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info Cards */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-green-50/50 backdrop-blur-sm rounded-2xl p-6 border border-green-100">
              <h4 className="text-xl font-display text-green mb-2">Admissions Office</h4>
              <p className="text-neutral-dark/70">Connect with our admissions team for enrollment queries and campus tours</p>
            </div>
            <div className="bg-orange-50/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-100">
              <h4 className="text-xl font-display text-orange mb-2">Parent Support</h4>
              <p className="text-neutral-dark/70">Dedicated support for parents with questions about student progress and activities</p>
            </div>
            <div className="bg-green-50/50 backdrop-blur-sm rounded-2xl p-6 border border-green-100">
              <h4 className="text-xl font-display text-green mb-2">General Inquiries</h4>
              <p className="text-neutral-dark/70">For all other questions, our staff is ready to assist you during office hours</p>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
