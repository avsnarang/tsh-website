import React from 'react';
import Container from '../../components/ui/Container';
import { Brain, Heart, Star, Users, BookOpen } from 'lucide-react';
import { useSEO } from '../../lib/seo';

export default function Primary() {
  useSEO({
    title: "Primary School | The Scholars' Home",
    description: "Primary education program at The Scholars' Home. Building strong foundations through comprehensive curriculum and personalized attention.",
    url: "https://tsh.edu.in/academics/primary"
  });

  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl text-neutral-dark mb-6">Primary School</h1>
          <p className="text-xl text-primary">Grades 1-5</p>
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl text-neutral-dark mb-6">Program Overview</h2>
          <p className="text-lg text-neutral-dark/80 mb-8">
            Our Primary School program builds a strong academic foundation while fostering creativity 
            and critical thinking. We focus on developing core competencies in language, mathematics, 
            and science, complemented by arts, physical education, and character development.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: "Academic Excellence", value: "Core subject mastery" },
              { icon: Heart, title: "Holistic Growth", value: "Beyond academics" },
              { icon: Star, title: "Individual Attention", value: "1:20 teacher ratio" },
              { icon: Users, title: "Learning Support", value: "Personalized guidance" },
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
              grade: "Grade 1",
              focus: [
                "Basic reading and writing skills",
                "Numbers and basic operations",
                "Environmental awareness",
                "Art and craft activities",
                "Physical education and games"
              ]
            },
            {
              grade: "Grade 2",
              focus: [
                "Advanced reading comprehension",
                "Writing short paragraphs",
                "Addition and subtraction",
                "Science experiments",
                "Music and movement"
              ]
            },
            {
              grade: "Grade 3",
              focus: [
                "Creative writing",
                "Multiplication and division",
                "Basic science concepts",
                "Computer fundamentals",
                "Sports and fitness"
              ]
            },
            {
              grade: "Grade 4",
              focus: [
                "Language mastery",
                "Fractions and decimals",
                "Advanced science topics",
                "Social studies",
                "Project-based learning"
              ]
            },
            {
              grade: "Grade 5",
              focus: [
                "Complex language skills",
                "Advanced mathematics",
                "Environmental science",
                "Digital literacy",
                "Leadership activities"
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
                    <li>• Strong foundation in core subjects</li>
                    <li>• Critical thinking abilities</li>
                    <li>• Effective communication skills</li>
                    <li>• Collaborative learning experience</li>
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
                title: "Interactive Learning",
                description: "Engaging activities and discussions that promote active participation and understanding"
              },
              {
                title: "Project-Based Approach",
                description: "Hands-on projects that integrate multiple subjects and real-world applications"
              },
              {
                title: "Continuous Assessment",
                description: "Regular evaluation and feedback to ensure steady academic progress"
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