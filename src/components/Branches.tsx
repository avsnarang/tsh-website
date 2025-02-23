import React from 'react';
import Container from './ui/Container';
import { schoolInfo } from '../data/schoolData';
import ScrollReveal from './animations/ScrollReveal';

export default function Branches() {
  return (
    <div id="branches" className="py-24 bg-neutral-light">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl text-neutral-dark">Our Campuses</h2>
            <p className="mt-4 text-xl text-primary font-body line-clamp-2">Three Unique Environments, One Vision</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {schoolInfo.branches.map((branch, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <div className="group relative overflow-hidden rounded-lg">
                <img
                  src={branch.imageUrl}
                  alt={`${branch.name} ${branch.location}`}
                  className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark to-transparent opacity-90 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-neutral-light">
                  <h3 className="text-2xl mb-2 truncate">{branch.location}</h3>
                  <p className="font-body mb-4 line-clamp-3">{branch.description}</p>
                  <ul className="space-y-2">
                    {branch.features.map((feature, idx) => (
                      <li key={idx} className="font-body text-sm flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2 shrink-0"></span>
                        <span className="truncate">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </div>
  );
}