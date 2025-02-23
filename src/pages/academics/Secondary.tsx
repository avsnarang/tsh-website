import React from 'react';
import Container from '../../components/ui/Container';
import { Brain, Heart, Star, Users, BookOpen } from 'lucide-react';

export default function Secondary() {
  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl text-neutral-dark mb-6">Secondary School</h1>
          <p className="text-xl text-primary">Grades 9-10</p>
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl text-neutral-dark mb-6">Program Overview</h2>
          <p className="text-lg text-neutral-dark/80 mb-8">
            Our Secondary School program prepares students for the CBSE Board examinations while 
            ensuring comprehensive understanding of subjects and development of critical thinking 
            skills. The curriculum is designed to build a strong foundation for higher education.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: "Academic Rigor", value: "Board preparation" },
              { icon: Heart, title: "Career Guidance", value: "Future planning" },
              { icon: Star, title: "Practical Learning", value: "Lab work" },
              { icon: Users, title: "Expert Faculty", value: "Specialized teachers" },
            ].map((stat, index) => (
              <div key={index} className="bg-primary-light/10 p-6 rounded-xl text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-neutral-dark font-semibold">{stat.title}</div>
                <div className="text-primary">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Grade-wise Curriculum */}
        <div className="space-y-12 mb-16">
          <h2 className="text-3xl text-neutral-dark text-center mb-8">Grade-wise Curriculum</h2>
          
          {[
            {
              grade: "Grade 9",
              focus: [
                "Advanced Mathematics",
                "Integrated Science",
                "Language and Literature",
                "Social Sciences",
                "Information Technology"
              ]
            },
            {
              grade: "Grade 10",
              focus: [
                "CBSE Board Preparation",
                "Advanced Sciences",
                "Complex Mathematics",
                "Language Proficiency",
                "Social Studies"
              ]
            }
          ].map((level, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl text-neutral-dark mb-4">{level.grade}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl text-primary mb-4">Key Focus Areas</h4>
                  <ul className="space-y-3">
                    {level.focus.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <span className="text-neutral-dark/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-primary-light/10 p-6 rounded-xl">
                  <h4 className="text-xl text-primary mb-4">Learning Outcomes</h4>
                  <ul className="space-y-2 text-neutral-dark/80">
                    <li>• Board examination readiness</li>
                    <li>• Advanced subject knowledge</li>
                    <li>• Analytical thinking skills</li>
                    <li>• Career path clarity</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Teaching Methodology */}
        <div className="bg-primary-light/10 rounded-2xl p-8">
          <h2 className="text-3xl text-neutral-dark text-center mb-8">Our Teaching Methodology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Comprehensive Coverage",
                description: "Thorough coverage of CBSE curriculum with additional focus on understanding concepts"
              },
              {
                title: "Practical Application",
                description: "Regular laboratory work and hands-on activities to reinforce theoretical learning"
              },
              {
                title: "Regular Assessment",
                description: "Periodic tests and mock examinations to track progress and improve performance"
              }
            ].map((method, index) => (
              <div key={index} className="bg-white p-6 rounded-xl">
                <h3 className="text-xl text-neutral-dark mb-3">{method.title}</h3>
                <p className="text-neutral-dark/80">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}