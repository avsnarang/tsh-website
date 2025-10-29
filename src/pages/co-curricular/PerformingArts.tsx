'use client';

import Container from '../../components/ui/Container';
import { Music, Mic, Users, Star } from 'lucide-react';

export default function PerformingArts() {

  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl text-neutral-dark mb-6">Performing Arts</h1>
          <p className="text-xl text-primary">Nurturing Artistic Excellence</p>
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl text-neutral-dark mb-6">Program Overview</h2>
          <p className="text-lg text-neutral-dark/80 mb-8">
            Our Performing Arts program provides comprehensive training in music, dance, and theater, 
            helping students discover and develop their artistic talents. Through expert guidance and 
            regular performances, students gain confidence and master their chosen art forms.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Music, title: "Music Programs", value: "Classical & Contemporary" },
              { icon: Star, title: "Dance Forms", value: "Multiple styles" },
              { icon: Mic, title: "Theater", value: "Regular productions" },
              { icon: Users, title: "Annual Shows", value: "Public performances" },
            ].map((stat, index) => (
              <div key={index} className="bg-primary-light/10 p-6 rounded-xl text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-neutral-dark font-semibold">{stat.title}</div>
                <div className="text-primary">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Programs */}
        <div className="space-y-12 mb-16">
          <h2 className="text-3xl text-neutral-dark text-center mb-8">Our Programs</h2>
          
          {[
            {
              title: "Music",
              description: "Comprehensive music education covering various genres and instruments",
              offerings: [
                "Classical Vocal Training",
                "Western Music",
                "Instrumental Classes",
                "Choir",
                "Music Theory"
              ],
              outcomes: [
                "Technical proficiency",
                "Performance experience",
                "Music appreciation",
                "Ensemble skills"
              ]
            },
            {
              title: "Dance",
              description: "Diverse dance programs covering classical and contemporary styles",
              offerings: [
                "Classical Dance Forms",
                "Contemporary Dance",
                "Folk Dance",
                "Choreography",
                "Stage Performance"
              ],
              outcomes: [
                "Dance techniques",
                "Rhythm and coordination",
                "Performance skills",
                "Cultural awareness"
              ]
            },
            {
              title: "Theater",
              description: "Comprehensive theater arts program developing acting and production skills",
              offerings: [
                "Acting Workshops",
                "Voice Modulation",
                "Script Writing",
                "Stage Direction",
                "Theater Production"
              ],
              outcomes: [
                "Acting proficiency",
                "Public speaking",
                "Creative expression",
                "Team collaboration"
              ]
            }
          ].map((program, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl text-neutral-dark mb-4">{program.title}</h3>
              <p className="text-neutral-dark/80 mb-6">{program.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl text-primary mb-4">Program Offerings</h4>
                  <ul className="space-y-3">
                    {program.offerings.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <Music className="h-5 w-5 text-primary" />
                        <span className="text-neutral-dark/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-primary-light/10 p-6 rounded-xl">
                  <h4 className="text-xl text-primary mb-4">Learning Outcomes</h4>
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

        {/* Annual Events */}
        <div className="bg-primary-light/10 rounded-2xl p-8">
          <h2 className="text-3xl text-neutral-dark text-center mb-8">Annual Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Annual Day Performance",
                description: "Grand showcase of all performing arts programs featuring student performances"
              },
              {
                title: "Inter-School Competitions",
                description: "Participation in various competitions to gain exposure and experience"
              },
              {
                title: "Cultural Festivals",
                description: "Celebration of art and culture through themed performances and exhibitions"
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