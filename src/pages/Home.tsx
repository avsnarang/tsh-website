import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, User, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSEO } from '../lib/seo';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Achievements from '../components/achievements/Achievements';
import CampusLife from '../components/campus/CampusLife';
import Testimonials from '../components/testimonials/Testimonials';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import ScrollReveal from '../components/animations/ScrollReveal';
import TextReveal from '../components/animations/TextReveal';
import { LeadershipMessage } from '../types/leadership';

export default function Home() {
  const [selectedMessage, setSelectedMessage] = useState<LeadershipMessage | null>(null);
  const [messages, setMessages] = useState<LeadershipMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: "The Scholars' Home | Excellence in Education Since 2003",
    description: "Join The Scholars' Home for world-class education and holistic development. CBSE-affiliated school offering comprehensive education from pre-primary to senior secondary levels.",
    url: "https://tsh.edu.in"
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('leadership_messages')
          .select('*')
          .neq('role', 'Principal') // Exclude principal messages
          .eq('campus', 'all') // Only get global messages
          .order('order');

        if (error) throw error;

        setMessages(data.map(msg => ({
          ...msg,
          fullMessage: msg.full_message || ''
        })));
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <Hero />
      <Features />
      
      {/* Leadership Messages Section */}
      {!loading && messages.length > 0 && (
        <div className="py-24 bg-primary-light/10">
          <Container>
            <ScrollReveal>
              <div className="text-center mb-16">
                <TextReveal>
                  <h2 className="text-4xl text-neutral-dark mb-4">Leadership Messages</h2>
                </TextReveal>
                <TextReveal delay={0.2}>
                  <p className="text-xl text-primary font-body max-w-2xl mx-auto">
                    Guidance and vision from our school leadership
                  </p>
                </TextReveal>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {messages.map((leader, index) => (
                <ScrollReveal
                  key={leader.id}
                  delay={index * 0.1}
                  direction={index % 2 === 0 ? 'left' : 'right'}
                >
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col">
                    <div className="flex-grow">
                      <div className="w-36 h-36 bg-primary-light/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        {leader.photo_url ? (
                          <img
                            src={leader.photo_url}
                            alt={leader.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="h-20 w-20 text-primary" />
                        )}
                      </div>
                      <TextReveal delay={0.3 + index * 0.1}>
                        <h3 className="text-xl text-neutral-dark font-semibold mb-2 text-center">{leader.name}</h3>
                      </TextReveal>
                      <TextReveal delay={0.4 + index * 0.1}>
                        <p className="text-primary mb-4 text-center">{leader.role}</p>
                      </TextReveal>
                      <TextReveal delay={0.5 + index * 0.1}>
                        <p className="text-neutral-dark/80 mb-6 line-clamp-3">{leader.preview}</p>
                      </TextReveal>
                    </div>
                    <Button 
                      onClick={() => setSelectedMessage(leader)}
                      variant="primary"
                      className="w-full flex items-center justify-center gap-2 group-hover:gap-3 mt-auto"
                    >
                      Read Message
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* Vision and Mission Section */}
      <div className="py-24 bg-neutral-light">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-16">
              <TextReveal>
                <h2 className="text-4xl text-neutral-dark mb-4">Our Vision & Mission</h2>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-xl text-primary font-body max-w-2xl mx-auto">
                  Shaping tomorrow's leaders today
                </p>
              </TextReveal>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIgZmlsbD0icmdiYSgwLCA4MCwgMjcsIDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Mission Card */}
              <ScrollReveal direction="left">
                <div className="group relative bg-gradient-to-br from-white to-green-50 p-1 rounded-2xl h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-light/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-70" />
                  <div className="relative bg-white p-8 rounded-2xl h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-12 w-1 bg-primary rounded-full" />
                      <TextReveal>
                        <h3 className="text-3xl font-display text-primary">Mission</h3>
                      </TextReveal>
                    </div>
                    <TextReveal delay={0.2}>
                      <div className="flex-grow">
                        <p className="text-neutral-dark/80 leading-relaxed">
                          "We aim to help our Scholars grow into compassionate independent thinkers and innovators who will become the custodians of the environment, world culture and the rich legacy of traditions. We shall provide a conducive environment for their holistic development which will enable them to become the proclaimers of change in society."
                        </p>
                      </div>
                    </TextReveal>
                    <Link
                      to="/about/vision"
                      className="mt-8 inline-flex items-center px-6 py-3 rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors group/link w-fit"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/link:translate-x-2" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>

              {/* Vision Card */}
              <ScrollReveal direction="right">
                <div className="group relative bg-gradient-to-br from-white to-orange-50 p-1 rounded-2xl h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange/20 to-orange-light/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-70" />
                  <div className="relative bg-white p-8 rounded-2xl h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-12 w-1 bg-orange rounded-full" />
                      <TextReveal>
                        <h3 className="text-3xl font-display text-orange">Vision</h3>
                      </TextReveal>
                    </div>
                    <TextReveal delay={0.2}>
                      <div className="flex-grow">
                        <p className="text-neutral-dark/80 leading-relaxed">
                          "We want to help our students reach their full potential, teaching them to think for themselves, care for the environment, and respect all cultures and traditions. Our school is more than a place to learn; it's where students prepare for the future. We hope that with our well-rounded education, they'll confidently face today's challenges. As they grow, nurtured by our school, they'll become leaders in making the world a better, more united place."
                        </p>
                      </div>
                    </TextReveal>
                    <Link
                      to="/about/vision"
                      className="mt-8 inline-flex items-center px-6 py-3 rounded-full bg-orange/5 text-orange hover:bg-orange/10 transition-colors group/link w-fit"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/link:translate-x-2" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </div>

      <Achievements />
      <CampusLife />
      <Testimonials />

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <TextReveal>
                  <h2 className="text-2xl font-semibold text-neutral-dark">{selectedMessage.name}</h2>
                </TextReveal>
                <TextReveal delay={0.1}>
                  <p className="text-primary">{selectedMessage.role}</p>
                </TextReveal>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-2 hover:bg-neutral-dark/10 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-neutral-dark" />
              </button>
            </div>
            <div className="prose prose-lg">
              {(selectedMessage.fullMessage ?? '').split('\n\n').map((paragraph, index) => (
                <TextReveal key={index} delay={0.2 + index * 0.1}>
                  <p className="text-neutral-dark/80 mb-4">
                    {paragraph}
                  </p>
                </TextReveal>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
