import React from 'react';
import Container from '../../components/ui/Container';
import { Brain, Heart, Star, Users, BookOpen } from 'lucide-react';
import { useSEO } from '../../lib/seo';

export default function SeniorSecondary() {
  useSEO({
    title: "Senior Secondary School | The Scholars' Home",
    description: "Senior secondary education at The Scholars' Home. Specialized streams in Science, Commerce, and Humanities with expert faculty guidance.",
    url: "https://tsh.edu.in/academics/senior-secondary"
  });

  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl text-neutral-dark mb-6">Senior Secondary School</h1>
          <p className="text-xl text-primary">Grades 11-12</p>
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl text-neutral-dark mb-6">Program Overview</h2>
          <p className="text-lg text-neutral-dark/80 mb-8">
            The Senior Secondary program offers specialized streams in Science, Commerce, and Humanities, 
            preparing students for higher education and professional careers. Our comprehensive approach 
            combines academic excellence with career guidance and competitive exam preparation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: "Specialized Streams", value: "Career focus" },
              { icon: Heart, title: "Career Counseling", value: "Expert guidance" },
              { icon: Star, title: "Competitive Prep", value: "Entrance exams" },
              { icon: Users, title: "Industry Exposure", value: "Real-world connect" },
            ].map((stat, index) => (
              <div key={index} className="bg-primary-light/10 p-6 rounded-xl text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-neutral-dark font-semibold">{stat.title}</div>
                <div className="text-primary">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stream-wise Curriculum */}
        <div className="space-y-12 mb-16">
          <h2 className="text-3xl text-neutral-dark text-center mb-8">Stream-wise Curriculum</h2>
          
          {[
            {
              grade: "Science Stream",
              focus: [
                "Physics with practical lab work",
                "Chemistry and experiments",
                "Biology/Computer Science",
                "Mathematics",
                "English Core"
              ]
            },
            {
              grade: "Commerce Stream",
              focus: [
                "Accountancy",
                "Business Studies",
                "Economics",
                "Mathematics/Applied Mathematics",
                "English Core"
              ]
            },
            {
              grade: "Humanities Stream",
              focus: [
                "History",
                "Political Science",
                "Geography/Psychology",
                "Economics",
                "English Core"
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
                  <h4 className="text-xl text-primary mb-4">Career Prospects</h4>
                  <ul className="space-y-2 text-neutral-dark/80">
                    <li>• Professional course preparation</li>
                    <li>• Competitive exam readiness</li>
                    <li>• Industry knowledge</li>
                    <li>• Higher education pathway</li>
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
                title: "Expert Faculty",
                description: "Experienced teachers with specialization in their respective subjects"
              },
              {
                title: "Career Integration",
                description: "Regular industry exposure through seminars, workshops, and field visits"
              },
              {
                title: "Competitive Focus",
                description: "Special coaching for various entrance examinations and competitive tests"
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