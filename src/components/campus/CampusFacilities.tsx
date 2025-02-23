import React from 'react';
import Container from '../ui/Container';
import { CampusInfo } from '../../types/campus';

interface CampusFacilitiesProps {
  info: CampusInfo;
}

export default function CampusFacilities({ info }: CampusFacilitiesProps) {
  return (
    <div className="py-24 bg-primary-light/10">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl text-neutral-dark mb-4">Our Facilities</h2>
          <p className="text-xl text-primary font-body max-w-2xl mx-auto line-clamp-2">
            State-of-the-art infrastructure for holistic development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {info.facilities.map((facility, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl text-neutral-light truncate pr-4">
                  {facility.title}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-neutral-dark/80 line-clamp-3">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}