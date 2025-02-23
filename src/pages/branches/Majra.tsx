import React from 'react';
import Container from '../../components/ui/Container';
import { MapPin, Phone, Mail, Users, BookOpen, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import ScrollReveal from '../../components/animations/ScrollReveal';
import TextReveal from '../../components/animations/TextReveal';

export default function Majra() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1970&q=80"
            alt="Majra Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-dark/80 to-neutral-dark/40" />
        </div>

        <Container className="relative">
          <div className="min-h-screen flex flex-col justify-center">
            <div className="max-w-3xl space-y-6">
              <div className="flex gap-4 md:gap-8 mb-8">
                {[
                  { value: "1500+", label: "Students" },
                  { value: "100+", label: "Faculty" },
                  { value: "15", label: "Acres Campus" },
                  { value: "99%", label: "Success Rate" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl text-neutral-light font-display mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-primary-light">{stat.label}</div>
                  </div>
                ))}
              </div>

              <h1 className="text-5xl md:text-7xl text-neutral-light leading-tight">
                The Scholars' Home
              </h1>
              <p className="text-2xl text-primary-light font-display mb-4">
                Majra Campus
              </p>
              <p className="text-xl text-primary-light font-body max-w-2xl">
                A perfect blend of traditional values and modern education methodologies for comprehensive student development.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/admissions">
                  <Button variant="cta" className="group flex items-center gap-2">
                    Apply Now
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button variant="outline">
                  Virtual Tour
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-neutral-light">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-16">
              <TextReveal>
                <h2 className="text-4xl text-neutral-dark mb-4">Why Choose Us</h2>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-xl text-primary">Tradition Meets Innovation</p>
              </TextReveal>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Digital Learning",
                description: "Integration of technology in education with smart classrooms and digital resources"
              },
              {
                title: "Cultural Heritage",
                description: "Strong focus on traditional values and cultural education"
              },
              {
                title: "Sports Excellence",
                description: "Comprehensive sports and fitness programs with professional coaching"
              }
            ].map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl text-neutral-dark mb-4">{feature.title}</h3>
                  <p className="text-neutral-dark/80">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </div>

      {/* Contact Section */}
      <div className="py-24 bg-primary">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl text-neutral-light mb-4">Get in Touch</h2>
            <p className="text-primary-light">Contact us for admissions and inquiries</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-6 w-6 text-primary" />
                <h3 className="text-xl text-neutral-dark">Location</h3>
              </div>
              <p className="text-neutral-dark/80">
                Near SBI Majra,<br />
                Majra, Paonta Sahib, H.P.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-6 w-6 text-primary" />
                <h3 className="text-xl text-neutral-dark">Phone</h3>
              </div>
              <a 
                href="tel:+919692700056"
                className="text-neutral-dark/80 hover:text-primary transition-colors"
              >
                +91 96927 00056
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-6 w-6 text-primary" />
                <h3 className="text-xl text-neutral-dark">Email</h3>
              </div>
              <a 
                href="mailto:majra@tsh.edu.in"
                className="text-neutral-dark/80 hover:text-primary transition-colors"
              >
                majra@tsh.edu.in
              </a>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}