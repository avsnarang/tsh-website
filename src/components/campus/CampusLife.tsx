import React from 'react';
import Container from '../ui/Container';

const images = [
  {
    url: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Sports Excellence"
  },
  {
    url: "https://images.unsplash.com/photo-1522661067900-ab829854a57f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Learning Labs"
  },
  {
    url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Cultural Activities"
  },
  {
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Library"
  }
];

export default function CampusLife() {
  return (
    <div className="py-24 bg-primary-dark">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl text-neutral-light mb-4">Campus Life</h2>
          <p className="text-xl text-primary-light font-body max-w-2xl mx-auto">
            Experience the vibrant atmosphere of The Scholars' Home
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl aspect-square"
            >
              <img 
                src={image.url} 
                alt={image.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark to-transparent opacity-60" />
              <p className="absolute bottom-4 left-4 text-neutral-light font-semibold">
                {image.caption}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}