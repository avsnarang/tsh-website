import { ArrowRight } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { CampusInfo } from '../../types/campus';

interface CampusHeroProps {
  info: CampusInfo;
}

export default function CampusHero({ info }: CampusHeroProps) {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Campus view"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-dark/80 to-neutral-dark/40" />
      </div>
      
      <Container className="relative">
        <div className="min-h-screen flex flex-col justify-center">
          <div className="max-w-3xl space-y-6">
            <div className="flex gap-4 md:gap-8 mb-8">
              {info.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl text-neutral-light font-display mb-2 truncate">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-light truncate">{stat.label}</div>
                </div>
              ))}
            </div>

            <h1 className="text-5xl md:text-7xl text-neutral-light leading-tight line-clamp-2">
              {info.name}
            </h1>
            <p className="text-2xl text-primary-light font-display mb-4 line-clamp-2">
              {info.tagline}
            </p>
            <p className="text-xl text-primary-light font-body max-w-2xl line-clamp-3">
              {info.description}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href={info.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[200px]"
              >
                <Button 
                  variant="cta-green" 
                  className="w-full flex items-center justify-center gap-2 group"
                >
                  Join Now
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <Button 
                variant="outline"
                className="w-[200px] flex items-center justify-center gap-2 group"
              >
                Virtual Tour
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}