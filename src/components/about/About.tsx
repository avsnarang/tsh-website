'use client';

import Container from '../ui/Container';
import { Star, ArrowRight } from 'lucide-react';
import ScrollReveal from '../animations/ScrollReveal';
import TextReveal from '../animations/TextReveal';
import Link from 'next/link';
import Button from '../ui/Button';
import HorizontalTimeline from './HorizontalTimeline';
import { motion } from 'framer-motion';
import BreadcrumbNav from '../navigation/BreadcrumbNav';

const timelineEvents = [
  {
    year: "2003",
    title: "Foundation",
    description: "The Scholars' Home was established with a vision to provide excellence in education.",
    image: "/images/history/foundation.jpg"
  },
  {
    year: "2008",
    title: "CBSE Affiliation",
    description: "Achieved CBSE affiliation and celebrated our first batch of graduates with remarkable results.",
    image: "/images/history/affiliation.jpg"
  },
  {
    year: "2013",
    title: "Campus Expansion",
    description: "Inaugurated our state-of-the-art 25-acre main campus in Paonta Sahib with modern facilities.",
    image: "/images/history/campus.jpg"
  },
  {
    year: "2018",
    title: "Excellence Center",
    description: "Launched specialized programs for sports and performing arts, enhancing our holistic education approach.",
    image: "/images/history/excellence.jpg"
  },
  {
    year: "2023",
    title: "Two Decades of Excellence",
    description: "Celebrating 20 years of nurturing future leaders and innovators with state-of-the-art facilities.",
    image: "/images/history/celebration.jpg"
  }
];

export default function About() {
    title: "Our Story | The Scholars' Home",
    description: "Discover the journey of The Scholars' Home since 2003. Learn about our legacy of educational excellence and commitment to nurturing future leaders."
  });

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Hero Section */}
      <div className="relative pt-40 pb-20 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Top right decorative circle */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-light/30" />
          {/* Bottom left decorative circle */}
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-light/30" />
          {/* Center decorative pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
        </div>

        <Container className="relative">
          <BreadcrumbNav />
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full mb-8"
              >
                <Star className="h-4 w-4" />
                <span className="font-semibold">Established 2003</span>
              </motion.div>
              <TextReveal>
                <h1 className="font-display text-5xl md:text-7xl text-neutral-dark mb-6">
                  Our <span className="text-green">Journey</span> of{" "}
                  <span className="text-orange">Excellence</span>
                </h1>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-xl text-neutral-dark/70 font-body max-w-2xl mx-auto">
                  Two decades of shaping minds and building futures
                </p>
              </TextReveal>
            </div>
          </ScrollReveal>

          {/* Timeline Section */}
          <ScrollReveal>
            <div className="relative mt-16 scroll-mt-16">
              {" "}
              {/* Added scroll-mt-16 */}
              <div className="relative bg-white rounded-2xl shadow-xl">
                <HorizontalTimeline events={timelineEvents} />
              </div>
            </div>
          </ScrollReveal>

          {/* Vision & Mission CTA */}
          <ScrollReveal>
            <div className="mt-20">
              <div className="relative bg-green rounded-2xl overflow-hidden shadow-xl">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-green-light/30" />
                  <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-orange-light/30" />
                  <div className="absolute inset-0 opacity-5">
                    <div
                      className="h-full w-full"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>
                </div>

                {/* Content Container */}
                <div className="relative grid md:grid-cols-2 gap-12 p-12">
                  {/* Left Content */}
                  <div className="text-left space-y-8">
                    <TextReveal>
                      <h2 className="text-4xl md:text-5xl font-display text-neutral-light leading-tight">
                        Shaping Tomorrow's{" "}
                        <span className="text-orange-light">Leaders</span> Today
                      </h2>
                    </TextReveal>
                    <TextReveal delay={0.2}>
                      <p className="text-neutral-light/80 text-lg">
                        Our vision and mission are the cornerstones of our
                        educational philosophy, guiding us in nurturing young
                        minds to become future leaders and innovators.
                      </p>
                    </TextReveal>
                    <TextReveal delay={0.3}>
                      <Link href="/about/vision">
                        <Button
                          variant="cta"
                          className="flex items-center gap-2 group hover:bg-orange-light/90"
                        >
                          Explore Our Vision
                          <ArrowRight className="transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </TextReveal>
                  </div>

                  {/* Right Content - Stats */}
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "Years of Excellence", value: "20+" },
                      { label: "Student Success Rate", value: "98%" },
                      { label: "Qualified Teachers", value: "100+" },
                      { label: "Academic Programs", value: "25+" },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="text-center"
                      >
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-light to-orange mb-3 mx-auto">
                          <span className="text-lg font-display text-neutral-light">
                            {index + 1}
                          </span>
                        </div>
                        <div className="text-2xl font-display text-orange-light">
                          {stat.value}
                        </div>
                        <div className="text-sm text-neutral-light/80">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </div>
    </div>
  );
}
