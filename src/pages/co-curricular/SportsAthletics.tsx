import React from 'react';
import Container from '../../components/ui/Container';
import { Trophy, Target, Users, Medal } from 'lucide-react';

export default function SportsAthletics() {
  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl text-neutral-dark mb-6">Sports & Athletics</h1>
          <p className="text-xl text-primary">Building Champions, Developing Character</p>
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl text-neutral-dark mb-6">Program Overview</h2>
          <p className="text-lg text-neutral-dark/80 mb-8">
            Our comprehensive sports program focuses on developing physical fitness, sportsmanship, 
            and competitive excellence. With state-of-the-art facilities and professional coaching, 
            we help students achieve their full athletic potential.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Trophy, title: "Sports Facilities", value: "World-class" },
              { icon: Target, title: "Professional Coaches", value: "Expert training" },
              { icon: Users, title: "Team Sports", value: "Multiple options" },
              { icon: Medal, title: "Competitions", value: "Regular events" },
            ].map((stat, index) => (
              <div key={index} className="bg-primary-light/10 p-6 rounded-xl text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-neutral-dark font-semibold">{stat.title}</div>
                <div className="text-primary">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sports Programs */}
        <div className="space-y-12 mb-16">
          <h2 className="text-3xl text-neutral-dark text-center mb-8">Sports Programs</h2>
          
          {[
            {
              title: "Team Sports",
              description: "Developing teamwork and strategic thinking through competitive sports",
              offerings: [
                "Cricket Academy",
                "Basketball Team",
                "Football",
                "Volleyball",
                "Hockey"
              ],
              outcomes: [
                "Team coordination",
                "Strategic thinking",
                "Leadership skills",
                "Competitive spirit"
              ]
            },
            {
              title: "Individual Sports",
              description: "Fostering personal excellence and self-discipline",
              offerings: [
                "Athletics",
                "Swimming",
                "Badminton",
                "Table Tennis",
                "Martial Arts"
              ],
              outcomes: [
                "Personal excellence",
                "Self-discipline",
                "Physical fitness",
                "Mental strength"
              ]
            },
            {
              title: "Fitness Programs",
              description: "Promoting overall health and physical well-being",
              offerings: [
                "Strength Training",
                "Cardio Fitness",
                "Yoga",
                "Aerobics",
                "Sports Nutrition"
              ],
              outcomes: [
                "Physical fitness",
                "Healthy lifestyle",
                "Stress management",
                "Body awareness"
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
                        <Trophy className="h-5 w-5 text-primary" />
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

        {/* Facilities */}
        <div className="bg-primary-light/10 rounded-2xl p-8">
          <h2 className="text-3xl text-neutral-dark text-center mb-8">Our Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Sports Complex",
                description: "Multi-purpose indoor stadium with international standard facilities"
              },
              {
                title: "Swimming Pool",
                description: "Olympic-size swimming pool with professional training facilities"
              },
              {
                title: "Fitness Center",
                description: "Modern gym equipment and dedicated training areas for various sports"
              }
            ].map((facility, index) => (
              <div key={index} className="bg-white p-6 rounded-xl">
                <h3 className="text-xl text-neutral-dark mb-3">{facility.title}</h3>
                <p className="text-neutral-dark/80">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}