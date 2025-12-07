'use client';

import Container from '@/components/ui/Container';
import { MapPin, Users, ArrowRight } from 'lucide-react';
import { schoolInfo } from '@/data/schoolData';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Campuses() {
  return (
    <div className="pt-52 sm:pt-56 pb-24">
      <Container className="relative z-20 mt-10 lg:mt-4 md:mt-6 sm:mt-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl text-neutral-dark mb-6">Our Campuses</h1>
          <p className="text-xl text-primary">Three Unique Environments, One Vision</p>
        </div>

        <div className="space-y-24">
          {schoolInfo.branches.map((branch, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <h2 className="text-3xl text-neutral-dark mb-4">{branch.location} Campus</h2>
                <p className="text-lg text-neutral-dark/80 mb-8">{branch.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {branch.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-primary">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-neutral-dark/80">Location details available on request</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-neutral-dark/80">Student capacity: 1000+</span>
                  </div>
                  <div className="mt-8">
                    <Link href={`/campus/${branch.location.toLowerCase().replace(' ', '-')}`}>
                      <Button className="flex items-center gap-2 group">
                        See More About {branch.location} Campus
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <img
                  src={branch.imageUrl}
                  alt={`${branch.location} Campus`}
                  className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}