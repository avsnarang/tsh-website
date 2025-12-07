'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Container from '@/components/ui/Container';
import { Trophy, Medal, Clock, User, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav'; // Keep for setDynamicLabel

interface Sport {
  id: string;
  name: string;
  category: string;
  coach: string;
  achievements: string;
  description: string;
  age_groups: string[];
  schedules: Array<{
    type: string;
    timings: string[];
  }>;
  images: {
    main_image: string;
    gallery_images: string[];
  };
}

export default function SportDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string | undefined;
  const [sport, setSport] = useState<Sport | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (id) {
      fetchSportDetails();
    }
  }, [id]);

  useEffect(() => {
    // Update breadcrumb label when sport data is loaded
    if (sport?.name) {
      BreadcrumbNav.setDynamicLabel(sport.name);
    }
    return () => {
      // Reset the label when component unmounts
      BreadcrumbNav.setDynamicLabel('');
    };
  }, [sport?.name]);

  const fetchSportDetails = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('sports_programs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setSport(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch sport details');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    // Implement registration logic or navigation
    if (id) {
      router.push(`/register/sports/${id}`);
    }
  };

  const nextImage = () => {
    if (sport) {
      const images = [sport.images.main_image, ...sport.images.gallery_images];
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (sport) {
      const images = [sport.images.main_image, ...sport.images.gallery_images];
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };


  const renderSkeleton = () => (
    <Container className="relative z-20 mt-10 lg:mt-4 md:mt-6 sm:mt-8 py-40">
      <div className="space-y-8">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Image skeleton */}
        <div className="relative h-[500px] rounded-2xl overflow-hidden bg-gray-200 animate-pulse" />

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main content skeleton */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-6 rounded bg-gray-200 animate-pulse" />
                  <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-200 animate-pulse" />
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-gray-200 animate-pulse" />
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse ml-6" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        {renderSkeleton()}
      </div>
    );
  }

  if (error || !sport) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Sport not found'}</p>
          <button
            onClick={() => router.push('/co-curricular/sports-athletics')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sports
          </button>
        </div>
      </div>
    );
  }

  const allImages = [sport.images.main_image, ...sport.images.gallery_images];

  return (
    <div className="min-h-screen bg-neutral-50">
      <Container className="relative z-20 mt-10 lg:mt-4 md:mt-6 sm:mt-8 py-48">

        {/* Image Slideshow */}
        <div className="relative h-[500px] rounded-2xl overflow-hidden mb-8">
          <img
            src={allImages[currentImageIndex]}
            alt={sport.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Slideshow Controls */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
            <button
              onClick={prevImage}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
            {currentImageIndex + 1} / {allImages.length}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-green" />
                <h1 className="text-3xl font-bold">{sport.name}</h1>
              </div>
              <p className="text-gray-600 leading-relaxed mb-8">{sport.description}</p>
              
              <button
                onClick={handleRegister}
                className="w-full md:w-auto px-8 py-3 bg-green text-white rounded-xl font-semibold hover:bg-green-dark transition-colors"
              >
                Register Now
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-semibold text-xl mb-4">Program Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-green" />
                  <div>
                    <p className="text-sm text-gray-500">Coach</p>
                    <p className="font-medium">{sport.coach}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Medal className="w-5 h-5 text-green" />
                  <div>
                    <p className="text-sm text-gray-500">Achievements</p>
                    <p className="font-medium">{sport.achievements}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Age Groups</p>
                  <div className="flex flex-wrap gap-2">
                    {sport.age_groups.map((group, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-light/20 text-green rounded-full text-sm"
                      >
                        {group}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-semibold text-xl mb-4">Training Schedule</h2>
              <div className="space-y-4">
                {sport.schedules.map((schedule, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-green" />
                      <span className="font-medium">{schedule.type}</span>
                    </div>
                    <div className="space-y-1">
                      {schedule.timings.map((timing, idx) => (
                        <p key={idx} className="text-sm text-gray-600 pl-6">
                          {timing}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
