'use client';

import Container from '../ui/Container';
import { CampusInfo } from '../../types/campus';

interface CampusFeaturesProps {
  info: CampusInfo;
}

export default function CampusFeatures({ info }: CampusFeaturesProps) {
  return (
    <div className="py-24 bg-neutral-light">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl text-neutral-dark mb-4">Why Choose Us</h2>
          <p className="text-xl text-primary font-body max-w-2xl mx-auto line-clamp-2">
            Discover what makes us unique and how we nurture excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {info.features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <h3 className="text-2xl text-neutral-dark mb-4 line-clamp-2">{feature.title}</h3>
              <p className="text-neutral-dark/80 line-clamp-4">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}