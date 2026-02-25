import Image from 'next/image';
import Container from '../ui/Container';
import { User } from 'lucide-react';
import ScrollReveal from '../animations/ScrollReveal';

interface AlumniTestimonial {
  id: string;
  full_name: string;
  batch_year?: number;
  occupation: string;
  company: string;
  profile_picture_url?: string;
  testimonial: string;
}

interface TestimonialsProps {
  testimonials?: AlumniTestimonial[];
}

export default function Testimonials({ testimonials = [] }: TestimonialsProps) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className="py-24 bg-primary-light/10">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl text-neutral-dark mb-4">Voices of Our Community</h2>
            <p className="text-xl text-primary font-body max-w-2xl mx-auto">
              Hear from our alumni about their journey with The Scholars' Home
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <ScrollReveal
              key={testimonial.id}
              delay={index * 0.1}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
                    {testimonial.profile_picture_url ? (
                      <Image
                        src={testimonial.profile_picture_url}
                        alt={testimonial.full_name}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-dark">
                      {testimonial.full_name}
                    </h3>
                    <p className="text-primary text-sm">
                      {testimonial.occupation}
                      {testimonial.company && ` at ${testimonial.company}`}
                    </p>
                    {testimonial.batch_year && (
                      <p className="text-primary/80 text-sm">
                        Batch of {testimonial.batch_year}
                      </p>
                    )}
                  </div>
                </div>
                <blockquote className="text-neutral-dark/80 italic">
                  "{testimonial.testimonial}"
                </blockquote>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
