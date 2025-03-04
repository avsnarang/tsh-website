import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  image: string;
}

export default function TestimonialCard({ content, author, role, image }: TestimonialCardProps) {
  return (
    <div className="bg-neutral-light p-6 rounded-2xl shadow-lg">
      <Quote className="h-8 w-8 text-primary-light mb-4" />
      <p className="text-neutral-dark font-body mb-6 line-clamp-4">{content}</p>
      <div className="flex items-center gap-4">
        <img 
          src={image} 
          alt={author} 
          className="w-12 h-12 rounded-full object-cover shrink-0"
        />
        <div>
          <h4 className="text-neutral-dark font-semibold truncate">{author}</h4>
          <p className="text-primary text-sm truncate">{role}</p>
        </div>
      </div>
    </div>
  );
}