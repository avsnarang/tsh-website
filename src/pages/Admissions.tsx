import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, BookOpen, GraduationCap, ArrowRight, Phone, Mail } from 'lucide-react';
import { schoolInfo } from '../data/schoolData';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import ScrollReveal from '../components/animations/ScrollReveal';
import TextReveal from '../components/animations/TextReveal';
import { trackEvent } from '../lib/analytics';
import { useSEO } from '../lib/seo';

const getRegistrationLink = (location: string) => {
  switch (location) {
    case 'Paonta Sahib':
      return 'https://learn.tsh.edu.in/#/erp/the_scholars_home_registration_form_cbse';
    case 'Juniors':
      return 'https://learn.tsh.edu.in/#/erp/the_scholars_home_registration_form_juniors';
    case 'Majra':
      return 'https://learn.tsh.edu.in/#/erp/the_scholars_home_registration_form_majra';
    default:
      return 'https://learn.tsh.edu.in/#/erp/the_scholars_home_registration_form_cbse';
  }
};

const getProgramsForCampus = (location: string) => {
  switch (location) {
    case 'Paonta Sahib':
      return [
        { 
          name: 'Pre-Primary',
          description: 'Pre-Nursery (2-3 years), Nursery (3-4 years), LKG (4-5 years), UKG (5-6 years)'
        },
        { 
          name: 'Primary',
          description: 'Grades 1-5 (Ages 6-11 years)'
        },
        { 
          name: 'Middle School',
          description: 'Grades 6-8 (Ages 11-14 years)'
        },
        { 
          name: 'Secondary',
          description: 'Grades 9-10 (Ages 14-16 years)'
        },
        { 
          name: 'Senior Secondary',
          description: 'Grades 11-12 (Ages 16-18 years)'
        }
      ];
    case 'Juniors':
      return [
        { 
          name: 'Pre-Primary',
          description: 'Pre-Nursery (2-3 years), Nursery (3-4 years), LKG (4-5 years), UKG (5-6 years)'
        },
        { 
          name: 'Primary',
          description: 'Grade 1 (Ages 6-7 years)'
        }
      ];
    case 'Majra':
      return [
        { 
          name: 'Pre-Primary',
          description: 'Pre-Nursery (2-3 years), Nursery (3-4 years), LKG (4-5 years), UKG (5-6 years)'
        },
        { 
          name: 'Primary',
          description: 'Grades 1-5 (Ages 6-11 years)'
        },
        { 
          name: 'Middle School',
          description: 'Grade 6 (Ages 11-12 years)'
        }
      ];
    default:
      return [];
  }
};

const getCampusPhone = (location: string) => {
  switch (location) {
    case 'Juniors':
      return '+91 98057 35656';
    case 'Majra':
      return '+91 96927 00056';
    default:
      return '+91 8628800056';
  }
};

const getCampusLocation = (location: string) => {
  switch (location) {
    case 'Juniors':
      return 'Near Degree College, Devinagar, Paonta Sahib, H.P.';
    case 'Majra':
      return 'Near SBI Majra, Majra, Paonta Sahib, H.P.';
    default:
      return 'Jamniwala Road, Badripur, Paonta Sahib, H.P.';
  }
};

export default function Admissions() {
  useSEO({
    title: "Admissions 2025-26 | The Scholars' Home",
    description: "Join The Scholars' Home for the academic year 2025-26. Information about admission process, eligibility, and campus-specific details.",
    url: "https://tsh.edu.in/admissions"
  });

  return (
    <div className="min-h-screen pt-32 pb-24 bg-neutral-light">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-16">
            <TextReveal>
              <h1 className="text-5xl text-neutral-dark mb-4">Admissions Open 2025-26</h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-xl text-primary font-body max-w-2xl mx-auto">
                Join The Scholars' Home and embark on a journey of excellence
              </p>
            </TextReveal>
          </div>
        </ScrollReveal>

        <div className="space-y-24">
          {schoolInfo.branches.map((branch, index) => (
            <ScrollReveal key={branch.location} delay={index * 0.1}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <img
                    src={branch.imageUrl}
                    alt={`${branch.location} Campus`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-3xl text-neutral-light mb-2">{branch.location} Campus</h2>
                    <div className="flex items-center gap-4 text-primary-light">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <a 
                          href="#" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-neutral-light transition-colors"
                        >
                          {getCampusLocation(branch.location)}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Limited seats available</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl text-neutral-dark mb-4">Programs Offered</h3>
                      <div className="space-y-4">
                        {getProgramsForCampus(branch.location).map((program, idx) => (
                          <div key={idx} className="flex flex-col gap-1">
                            <div className="flex items-center gap-3">
                              <BookOpen className="h-5 w-5 text-primary shrink-0" />
                              <span className="text-neutral-dark font-semibold">
                                {program.name}
                              </span>
                            </div>
                            <div className="ml-8 text-neutral-dark/80 text-sm">
                              {program.description}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 space-y-4">
                        <h4 className="text-xl text-neutral-dark">Key Features</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {branch.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-primary">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-primary-light/10 p-6 rounded-xl">
                        <h4 className="text-xl text-neutral-dark mb-4">Contact Information</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-primary" />
                            <a 
                              href={`tel:${getCampusPhone(branch.location).replace(/\s/g, '')}`}
                              className="text-neutral-dark/80 hover:text-primary transition-colors"
                            >
                              {getCampusPhone(branch.location)}
                            </a>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-primary" />
                            <a 
                              href="mailto:admissions@tsh.edu.in"
                              className="text-neutral-dark/80 hover:text-primary transition-colors"
                            >
                              admissions@tsh.edu.in
                            </a>
                          </div>
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-primary mt-1" />
                            <a 
                              href="#" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-neutral-dark/80 hover:text-primary transition-colors"
                            >
                              {getCampusLocation(branch.location)}
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4">
                        <a 
                          href={getRegistrationLink(branch.location)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent('Registration Button Clicked', {
                            campus: branch.location,
                            button_location: 'card',
                            registration_url: getRegistrationLink(branch.location)
                          })}
                        >
                          <Button 
                            variant="cta-green"
                            className="w-full flex items-center justify-center gap-2 text-lg"
                          >
                            <GraduationCap className="h-6 w-6" />
                            Apply for Admission
                          </Button>
                        </a>
                        <Link to={`/campus/${branch.location.toLowerCase().replace(' ', '')}`}>
                          <Button 
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2 group"
                          >
                            Learn More About Campus
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-16 bg-primary p-8 rounded-2xl text-center">
            <h2 className="text-3xl text-neutral-light mb-4">Need Help?</h2>
            <p className="text-primary-light mb-8 max-w-2xl mx-auto">
              Our admissions team is here to assist you with the application process and answer any questions you may have.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="tel:+918628800056"
                className="flex items-center gap-2 text-neutral-light hover:text-primary-light transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>Paonta Sahib: +91 8628800056</span>
              </a>
              <a 
                href="tel:+919805735656"
                className="flex items-center gap-2 text-neutral-light hover:text-primary-light transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>Juniors: +91 98057 35656</span>
              </a>
              <a 
                href="tel:+919692700056"
                className="flex items-center gap-2 text-neutral-light hover:text-primary-light transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>Majra: +91 96927 00056</span>
              </a>
              <a 
                href="mailto:admissions@tsh.edu.in"
                className="flex items-center gap-2 text-neutral-light hover:text-primary-light transition-colors"
              >
                <Mail className="h-5 w-5" />
                admissions@tsh.edu.in
              </a>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}