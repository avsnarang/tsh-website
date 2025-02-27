import React from 'react';
import Container from '../../components/ui/Container';
import { Brain, Heart, Star, Users, BookOpen } from 'lucide-react';
import { useSEO } from '../../lib/seo';

export default function Middle() {
  useSEO({
    title: "Middle School | The Scholars' Home",
    description: "Middle school education at The Scholars' Home. Fostering critical thinking and comprehensive development for grades 6-8.",
    url: "https://tsh.edu.in/academics/middle"
  });

  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl text-neutral-dark mb-6">Middle School</h1>
          <p className="text-xl text-primary">Grades 6-8</p>
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl text-neutral-dark mb-6">Program Overview</h2>
          <p className="text-lg text-neutral-dark/80 mb-8">
            The Middle School program bridges primary and secondary education, focusing on developing 
            analytical thinking, subject expertise, and essential life skills. Students are encouraged 
            to explore their interests while building a strong academic foundation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: "Critical Thinking", value: "Advanced concepts" },
              { icon: Heart, title: "Life Skills", value: "Personal development" },
              { icon: Star, title: "Academic Growth", value: "Subject mastery" },
              { icon: Users, title: "Collaborative Learning", value: "Team projects" },
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
              grade: "Grade 6",
              focus: [
                "Advanced language skills",
                "Pre-algebra concepts",
                "Physical sciences introduction",
                "World geography",
                "Digital technology"
              ]
            },
            {
              grade: "Grade 7",
              focus: [
                "Literature analysis",
                "Algebra fundamentals",
                "Life sciences",
                "World history",
                "Computer programming basics"
              ]
            },
            {
              grade: "Grade 8",
              focus: [
                "Advanced writing skills",
                "Geometry introduction",
                "Chemistry & Physics",
                "Civics and economics",
                "Advanced technology skills"
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
                    <li>• Advanced analytical skills</li>
                    <li>• Subject matter expertise</li>
                    <li>• Research capabilities</li>
                    <li>• Problem-solving abilities</li>
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
                title: "Inquiry-Based Learning",
                description: "Encouraging students to ask questions and discover answers through research and experimentation"
              },
              {
                title: "Collaborative Projects",
                description: "Group activities that develop teamwork and leadership skills while exploring complex topics"
              },
              {
                title: "Technology Integration",
                description: "Using digital tools and resources to enhance learning and develop 21st-century skills"
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