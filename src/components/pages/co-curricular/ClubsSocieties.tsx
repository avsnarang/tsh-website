'use client';

import Container from '@/components/ui/Container';
import { Users, Brain, Globe, Lightbulb } from 'lucide-react';

export default function ClubsSocieties() {

  return (
    <div className="pb-24">
      <Container className="relative z-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl text-neutral-dark mb-6">Clubs & Societies</h1>
          <p className="text-xl text-primary">Fostering Interests, Building Communities</p>
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl text-neutral-dark mb-6">Program Overview</h2>
          <p className="text-lg text-neutral-dark/80 mb-8">
            Our Clubs and Societies program offers students opportunities to explore their interests, 
            develop leadership skills, and engage in meaningful activities beyond academics. Each club 
            provides a platform for learning, collaboration, and personal growth.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Active Clubs", value: "15+ Groups" },
              { icon: Brain, title: "Student Leaders", value: "Peer mentoring" },
              { icon: Globe, title: "Community Impact", value: "Social projects" },
              { icon: Lightbulb, title: "Innovation", value: "Creative initiatives" },
            ].map((stat, index) => (
              <div key={index} className="bg-primary-light/10 p-6 rounded-xl text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-neutral-dark font-semibold">{stat.title}</div>
                <div className="text-primary">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Club Categories */}
        <div className="space-y-12 mb-16">
          <h2 className="text-3xl text-neutral-dark text-center mb-8">Our Clubs</h2>
          
          {[
            {
              title: "Academic Clubs",
              description: "Extending learning beyond the classroom through specialized interest groups",
              offerings: [
                "Science Club",
                "Mathematics Society",
                "Literary Club",
                "Coding Club",
                "Robotics Club"
              ],
              outcomes: [
                "Advanced learning",
                "Practical application",
                "Research skills",
                "Innovation mindset"
              ]
            },
            {
              title: "Cultural & Social Clubs",
              description: "Promoting cultural awareness and social responsibility",
              offerings: [
                "Debate Society",
                "Model United Nations",
                "Environmental Club",
                "Social Service Club",
                "Heritage Club"
              ],
              outcomes: [
                "Public speaking",
                "Global awareness",
                "Social responsibility",
                "Leadership skills"
              ]
            },
            {
              title: "Special Interest Clubs",
              description: "Exploring unique interests and developing specific skills",
              offerings: [
                "Photography Club",
                "Film Making Society",
                "Chess Club",
                "Astronomy Club",
                "Creative Writing Club"
              ],
              outcomes: [
                "Skill development",
                "Creative expression",
                "Technical expertise",
                "Community building"
              ]
            }
          ].map((program, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl text-neutral-dark mb-4">{program.title}</h3>
              <p className="text-neutral-dark/80 mb-6">{program.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl text-primary mb-4">Active Clubs</h4>
                  <ul className="space-y-3">
                    {program.offerings.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary" />
                        <span className="text-neutral-dark/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-primary-light/10 p-6 rounded-xl">
                  <h4 className="text-xl text-primary mb-4">Key Benefits</h4>
                  <ul className="space-y-2 text-neutral-dark/80">
                    {program.outcomes.map((outcome, idx) => (
                      <li key={idx}>• {outcome}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Activities and Events */}
        <div className="bg-primary-light/10 rounded-2xl p-8">
          <h2 className="text-3xl text-neutral-dark text-center mb-8">Activities & Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Inter-School Events",
                description: "Competitions and collaborations with other schools' clubs and societies"
              },
              {
                title: "Community Projects",
                description: "Social initiatives and community service activities throughout the year"
              },
              {
                title: "Annual Club Fest",
                description: "Showcase of club achievements and recruitment of new members"
              }
            ].map((event, index) => (
              <div key={index} className="bg-white p-6 rounded-xl">
                <h3 className="text-xl text-neutral-dark mb-3">{event.title}</h3>
                <p className="text-neutral-dark/80">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}