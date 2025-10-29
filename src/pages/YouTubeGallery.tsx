'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Container from '../components/ui/Container';
import { Video } from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';
import TextReveal from '../components/animations/TextReveal';
import { motion } from 'framer-motion';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string | null;
  embed_code: string;
}

export default function YouTubeGallery() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  
    title: "Video Gallery | The Scholars' Home",
    description: "Watch videos from The Scholars' Home YouTube channel featuring school events, student achievements, and more."
  });

  // Function to sanitize and format embed code
  const formatEmbedCode = (embedCode: string) => {
    // Extract src from iframe if it exists
    const srcMatch = embedCode.match(/src="([^"]+)"/);
    if (!srcMatch) return embedCode;

    const src = srcMatch[1];
    // Ensure URL uses HTTPS and includes recommended parameters
    const formattedSrc = src
      .replace('http://', 'https://')
      .includes('?') 
        ? `${src}&rel=0&modestbranding=1`
        : `${src}?rel=0&modestbranding=1`;

    return `<iframe 
      src="${formattedSrc}" 
      title="YouTube video player" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen 
      class="absolute top-0 left-0 w-full h-full"
    ></iframe>`;
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await supabase
        .from('youtube_videos')
        .select('*')
        .eq('is_visible', true)
        .order('position');
      
      setVideos(data || []);
      setLoading(false);
    };

    fetchVideos();
  }, []);

  return (
    <div className="relative min-h-screen bg-neutral-light pt-32 pb-24">
      {/* SVG Background Pattern */}
      <div className="absolute inset-0 z-0">
        {/* Top pattern */}
        <div className="absolute top-0 left-0 right-0 h-1/2">
          <svg className="w-full h-full opacity-[0.07]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M.5 16V0m16 .5H0" fill="none" stroke="currentColor" strokeOpacity="0.1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>
        
        {/* Bottom pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2">
          <svg className="w-full h-full opacity-[0.07]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" fillOpacity="0.1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots)"/>
          </svg>
        </div>
      </div>

      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-light/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-light/20 rounded-full filter blur-3xl" />
      </div>

      <Container className="relative z-10 pt-16">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full mb-6"
            >
              <Video className="h-4 w-4" />
              <span className="font-semibold">Video Gallery</span>
            </motion.div>

            <TextReveal>
              <h1 className="font-display text-4xl md:text-5xl text-neutral-dark mb-4">
                Watch Our <span className="text-green">Stories</span> Unfold
              </h1>
            </TextReveal>

            <TextReveal delay={0.2}>
              <p className="text-neutral-dark/70 text-lg max-w-2xl mx-auto">
                Explore our collection of videos showcasing school events, student achievements, and memorable moments at The Scholars' Home.
              </p>
            </TextReveal>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-4 animate-pulse">
                <div className="aspect-video bg-neutral-dark/10 rounded-xl mb-4" />
                <div className="h-6 bg-neutral-dark/10 rounded w-3/4 mb-3" />
                <div className="h-4 bg-neutral-dark/10 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative aspect-video w-full bg-neutral-light/50">
                  <div 
                    className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.01]"
                    dangerouslySetInnerHTML={{ 
                      __html: formatEmbedCode(video.embed_code) 
                    }} 
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-display text-neutral-dark mb-2 line-clamp-2 group-hover:text-green transition-colors">
                    {video.title}
                  </h2>
                  {video.description && (
                    <p className="text-neutral-dark/70 line-clamp-2 text-sm">
                      {video.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
