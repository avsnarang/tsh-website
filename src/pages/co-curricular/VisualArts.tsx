import Container from '../../components/ui/Container';
import { Palette, Image, Brush, Award } from 'lucide-react';
import { useSEO } from '../../lib/seo';

export default function VisualArts() {
  useSEO({
    title: "Visual Arts | The Scholars' Home",
    description: "Visual arts program at The Scholars' Home. Nurturing creativity through various art forms and modern techniques.",
    url: "https://tsh.edu.in/co-curricular/visual-arts"
  });

  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl text-neutral-dark mb-6">Visual Arts</h1>
          <p className="text-xl text-primary">Unleashing Creative Expression</p>
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl text-neutral-dark mb-6">Program Overview</h2>
          <p className="text-lg text-neutral-dark/80 mb-8">
            Our Visual Arts program nurtures creativity and artistic expression through various 
            mediums and techniques. Students explore traditional and contemporary art forms while 
            developing their unique artistic voice and technical skills.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Palette, title: "Art Forms", value: "Multiple mediums" },
              { icon: Image, title: "Digital Arts", value: "Modern techniques" },
              { icon: Brush, title: "Studio Space", value: "Professional setup" },
              { icon: Award, title: "Exhibitions", value: "Regular showcases" },
            ].map((stat, index) => (
              <div key={index} className="bg-primary-light/10 p-6 rounded-xl text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-neutral-dark font-semibold">{stat.title}</div>
                <div className="text-primary">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Art Programs */}
        <div className="space-y-12 mb-16">
          <h2 className="text-3xl text-neutral-dark text-center mb-8">Our Programs</h2>
          
          {[
            {
              title: "Traditional Art",
              description: "Mastering classical art techniques and mediums",
              offerings: [
                "Drawing & Sketching",
                "Oil Painting",
                "Watercolor",
                "Sculpture",
                "Pottery"
              ],
              outcomes: [
                "Technical mastery",
                "Artistic expression",
                "Medium proficiency",
                "Creative development"
              ]
            },
            {
              title: "Digital Arts",
              description: "Exploring modern digital art tools and techniques",
              offerings: [
                "Digital Illustration",
                "Graphic Design",
                "Animation Basics",
                "Photo Editing",
                "Digital Photography"
              ],
              outcomes: [
                "Software proficiency",
                "Digital creativity",
                "Modern techniques",
                "Portfolio development"
              ]
            },
            {
              title: "Contemporary Art",
              description: "Exploring modern art forms and mixed media",
              offerings: [
                "Mixed Media",
                "Installation Art",
                "Contemporary Painting",
                "Experimental Art",
                "Art History"
              ],
              outcomes: [
                "Artistic innovation",
                "Conceptual thinking",
                "Creative expression",
                "Art appreciation"
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
                        <Palette className="h-5 w-5 text-primary" />
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

        {/* Events and Exhibitions */}
        <div className="bg-primary-light/10 rounded-2xl p-8">
          <h2 className="text-3xl text-neutral-dark text-center mb-8">Events & Exhibitions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Annual Art Exhibition",
                description: "Showcase of student artworks across various mediums and styles"
              },
              {
                title: "Art Competitions",
                description: "Participation in local and national level art competitions"
              },
              {
                title: "Artist Workshops",
                description: "Interactive sessions with professional artists and art educators"
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