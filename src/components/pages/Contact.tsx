'use client';

import Container from '@/components/ui/Container';
import { MapPin, Phone, Mail, Clock, Send, Users, Star, Award, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
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
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-x-48 -translate-y-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange/10 rounded-full translate-x-24 translate-y-24 blur-3xl" />
        
        <Container className="relative z-20 mt-10 lg:mt-4 md:mt-6 sm:mt-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <TextReveal>
                <h1 className="text-5xl md:text-6xl text-neutral-dark mb-6">Get in Touch</h1>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-xl text-primary font-body max-w-2xl mx-auto mb-12">
                  We're here to help. Reach out to us for any inquiries.
                </p>
              </TextReveal>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
                {stats.map((stat, index) => (
                  <ScrollReveal key={index} delay={0.3 + index * 0.1}>
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <stat.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-neutral-dark mb-2">{stat.value}</div>
                      <div className="text-primary text-sm text-center">{stat.label}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </div>

      {/* Contact Form Section */}
      <div className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg">
                <TextReveal>
                  <h3 className="text-2xl text-neutral-dark mb-8">Send us a message</h3>
                </TextReveal>
                <form className="space-y-6" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  posthog.capture('contact_form_submitted', {
                    subject: formData.get('subject'),
                  });
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-neutral-dark font-medium">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="w-full px-4 py-3 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-neutral-dark font-medium">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-3 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-neutral-dark font-medium">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                      placeholder="Subject"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-neutral-dark font-medium">Message</label>
                    <textarea
                      className="w-full px-4 py-3 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary bg-white h-32"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 group"
                  >
                    Send Message
                    <Send className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </Button>
                </form>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="space-y-8">
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg">
                  <TextReveal>
                    <h3 className="text-2xl text-neutral-dark mb-8">Office Hours</h3>
                  </TextReveal>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Clock className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold text-neutral-dark">Working Hours</h4>
                        <p className="text-neutral-dark/80">
                          Monday - Saturday: 8:00 AM - 4:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </div>

      {/* Campus Contacts */}
      <div className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-light/10 via-transparent to-transparent" />
        
        <Container className="relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <TextReveal>
                <h2 className="text-4xl text-neutral-light mb-6">Our Campuses</h2>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-primary-light text-lg">
                  Get in touch with our campus-specific teams
                </p>
              </TextReveal>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((campus, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0">
                      <img
                        src={campus.image}
                        alt={campus.campus}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/80 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-2xl text-neutral-light">{campus.campus}</h3>
                  </div>

                  <div className="p-6 space-y-4 flex-grow">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                      <span className="text-neutral-dark/80">{campus.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary shrink-0" />
                      <a
                        href={`tel:${campus.phone.replace(/\s/g, '')}`}
                        className="text-neutral-dark/80 hover:text-primary transition-colors"
                      >
                        {campus.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary shrink-0" />
                      <a
                        href={`mailto:${campus.email}`}
                        className="text-neutral-dark/80 hover:text-primary transition-colors"
                      >
                        {campus.email}
                      </a>
                    </div>
                    <a
                      href={campus.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center justify-center w-full gap-2 px-6 py-3 bg-primary text-neutral-light rounded-lg hover:bg-primary-dark transition-colors group"
                    >
                      Get Directions
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}