'use client';

import { useState, useEffect } from 'react';
import InviteCard from '@/components/invites/InviteCard';
import InviteModal from '@/components/invites/InviteModal';
import { Invite } from '@/types/invite';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
import { Filter, Calendar, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import InviteCardSkeleton from '@/components/invites/InviteCardSkeleton';

export default function Invites() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(false); // Changed initial state to false
  const [error, setError] = useState('');
  const [selectedInvite, setSelectedInvite] = useState<Invite | null>(null);
  const [success, setSuccess] = useState('');
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(true); // New state for filter
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    fetchEvents();
  }, [showUpcomingOnly]); // Refetch when filter changes

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');

      const query = supabase
        .from('events')
        .select(`
          id,
          title,
          date,
          time,
          location,
          description,
          cover_image,
          max_capacity,
          max_guests_per_rsvp,
          requires_admission_number,
          accepting_rsvps
        `)
        .order('date', { ascending: true });

      // Apply upcoming filter if enabled
      if (showUpcomingOnly) {
        query.gte('date', new Date().toISOString().split('T')[0]);
      }

      const { data: eventsData, error: eventsError } = await query;

      if (eventsError) throw eventsError;

      // Get RSVP counts and user's RSVP status for each event
      const eventsWithDetails = await Promise.all(
        (eventsData || []).map(async (event) => {
          // Try to get total guests count via RPC function, fallback to direct query
          let totalGuests = 0;
          const { data: rpcCount, error: rpcError } = await supabase
            .rpc('get_event_total_guests', { p_event_id: event.id });

          if (rpcError) {
            console.warn('RPC call failed, using direct query:', rpcError);
            // Fallback: calculate directly from event_rsvps table
            const { data: rsvpsData, error: rsvpsError } = await supabase
              .from('event_rsvps')
              .select('guests')
              .eq('event_id', event.id)
              .eq('status', 'attending');

            if (rsvpsError) {
              console.error('Error fetching RSVP counts:', rsvpsError);
              totalGuests = 0;
            } else {
              totalGuests = (rsvpsData || []).reduce((sum, rsvp) => sum + (rsvp.guests || 0), 0);
            }
          } else {
            totalGuests = rpcCount || 0;
          }

          let userRsvp = null;
          if (user) {
            const { data: rsvpData } = await supabase
              .from('event_rsvps')
              .select('status, guests, admission_number')
              .eq('event_id', event.id)
              .eq('user_id', user.id)
              .maybeSingle();

            userRsvp = rsvpData;
          }

          // Determine if the event is upcoming or past
          const eventDate = new Date(event.date);
          const today = new Date();
          const status: 'upcoming' | 'past' = eventDate >= today ? 'upcoming' : 'past';

          return {
            id: event.id,
            title: event.title,
            date: event.date,
            time: event.time,
            location: event.location,
            description: event.description,
            coverImage: event.cover_image,
            coverImageMobile: event.cover_image, // Use cover_image as fallback until cover_image_mobile is added
            maxCapacity: event.max_capacity,
            maxGuestsPerRsvp: event.max_guests_per_rsvp,
            requiresAdmissionNumber: true,
            status,
            rsvpCount: totalGuests || 0,
            userRsvp,
            acceptingRsvps: event.accepting_rsvps
          };
        })
      );

      setEvents(eventsWithDetails as Invite[]);
    } catch (error) {
      console.error('Error fetching events:', error);
      // Log more details about the error
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      } else if (typeof error === 'object' && error !== null) {
        console.error('Error object:', JSON.stringify(error, null, 2));
      }
      setError('Failed to load events. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = (inviteId: string) => {
    const invite = events.find(inv => inv.id === inviteId);
    if (invite) {
      if (!invite.acceptingRsvps) {
        setError('RSVPs are no longer being accepted for this event');
        return;
      }
      setSelectedInvite(invite);
    }
  };

  const goToNext = () => {
    if (events.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }
  };

  const goToPrevious = () => {
    if (events.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
    }
  };

  // Reset index when events change
  useEffect(() => {
    setCurrentIndex(0);
  }, [events.length, showUpcomingOnly]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (events.length === 0) return;
      
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % events.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [events.length]);

  const handleSubmitRSVP = async (
    status: 'attending' | 'not_attending' | 'maybe', 
    guests: number,
    admissionNumber?: string
  ) => {
    if (!selectedInvite) return;

    try {
      setError('');
      
      // Always require admission number
      if (!admissionNumber) {
        setError('Please provide and verify student admission number');
        return;
      }

      // Check if user already has an RSVP
      let existingRsvpId: string | null = null;
      
      if (user) {
        // If user is logged in, check based on user ID
        const { data: userRsvp } = await supabase
          .from('event_rsvps')
          .select('id')
          .eq('event_id', selectedInvite.id)
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (userRsvp) {
          existingRsvpId = userRsvp.id;
        }
      }

      const rsvpData = {
        event_id: selectedInvite.id,
        user_id: user?.id || null,
        status,
        guests,
        admission_number: admissionNumber
      };

      if (existingRsvpId) {
        // Update existing RSVP
        const { error: updateError } = await supabase
          .from('event_rsvps')
          .update(rsvpData)
          .eq('id', existingRsvpId);

        if (updateError) throw updateError;
      } else {
        // Create new RSVP
        const { error: insertError } = await supabase
          .from('event_rsvps')
          .insert([rsvpData]);

        if (insertError) throw insertError;
      }

      setSuccess('Your RSVP has been submitted successfully!');
      setTimeout(() => setSuccess(''), 3000);
      setSelectedInvite(null);
      await fetchEvents(); // Refresh events to update counts
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setError('Failed to submit RSVP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen md:h-screen overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-light/30" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen md:h-full flex flex-col md:flex-row">
        {/* Left Column - Top on mobile, fixed sidebar on desktop */}
        <div className="w-full md:w-[30%] md:h-screen md:fixed md:left-0 md:top-0 flex items-center justify-center px-4 md:px-8 pt-32 md:pt-32 pb-4 md:pb-0 overflow-y-auto md:overflow-y-visible">
          <div className="max-w-md w-full">
            <ScrollReveal>
              <div className="text-center mb-8 md:mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full mb-8"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="font-semibold">School Events</span>
                </motion.div>
                <TextReveal>
                  <h1 className="font-display text-4xl text-neutral-dark mb-6">
                    Join Our <span className="text-green">School</span>{" "}
                    <span className="text-orange">Events</span>
                  </h1>
                </TextReveal>
                <TextReveal delay={0.2}>
                  <p className="text-lg text-neutral-dark/70 font-body">
                    Be part of our vibrant school community and celebrations
                  </p>
                </TextReveal>
              </div>

              {/* Filter Toggle */}
              <div className="mb-4 md:mb-8">
                <motion.div 
                  className="bg-white rounded-2xl shadow-lg p-1.5 origin-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <button
                    onClick={() => setShowUpcomingOnly(!showUpcomingOnly)}
                    className="relative flex items-center w-full overflow-hidden rounded-xl"
                >
                  <motion.div
                      className="absolute h-full w-[50%] bg-green rounded-xl z-0"
                    initial={false}
                    animate={{
                      x: showUpcomingOnly ? '0%' : '100%',
                      opacity: 0.1
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  <div 
                      className={`flex items-center justify-center gap-2 px-6 py-3 w-[50%] transition-colors duration-200 relative z-10 ${
                      showUpcomingOnly ? 'text-green font-semibold' : 'text-neutral-400'
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    <span>Upcoming</span>
                  </div>
                  <div 
                      className={`flex items-center justify-center gap-2 px-6 py-3 w-[50%] transition-colors duration-200 relative z-10 ${
                      !showUpcomingOnly ? 'text-green font-semibold' : 'text-neutral-400'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>All Events</span>
                  </div>
                  </button>
                </motion.div>
              </div>

              {/* Messages */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-8">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-8">
                  {success}
                </div>
              )}
            </ScrollReveal>
          </div>
        </div>

        {/* Right Column - Full Screen Carousel */}
        <div className="w-full md:w-[70%] md:ml-[30%] min-h-screen md:h-screen bg-transparent relative">
              {loading ? (
            <div className="flex items-center justify-center h-screen md:h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green"></div>
            </div>
              ) : events.length === 0 ? (
            <div className="flex items-center justify-center h-screen md:h-full">
              <div className="text-center text-neutral-dark/60">
                  <Star className="h-12 w-12 mx-auto mb-4 text-orange-light" />
                  <p className="text-lg">No upcoming events at this time.</p>
              </div>
                </div>
              ) : (
            <div className="absolute inset-0 pt-24 md:pt-48 pb-8 md:pb-20 px-4 md:px-8 flex items-center gap-2 md:gap-4">
              {/* Left Navigation Button - Hidden on mobile */}
              {events.length > 1 && (
                <button
                  onClick={goToPrevious}
                  className="hidden md:flex shrink-0 p-4 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200 hover:scale-110 z-20"
                  aria-label="Previous event"
                >
                  <ChevronLeft className="h-6 w-6 text-neutral-dark" />
                </button>
              )}

              {/* Full Screen Card Container with Swipe Support */}
              <div className="flex-1 h-full relative touch-pan-y">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentIndex}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.3}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipeThreshold = 50;
                      const velocityThreshold = 500;

                      // Check for swipe based on distance and velocity
                      if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > velocityThreshold) {
                        if (offset.x > 0 || velocity.x > 0) {
                          goToPrevious();
                        } else {
                          goToNext();
                        }
                      }
                    }}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="h-full w-full"
                  >
                    <InviteCard
                      invite={events[currentIndex]}
                      onRSVP={handleRSVP}
                      isFullScreen
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Card Indicator */}
                {events.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {events.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentIndex
                            ? 'w-8 bg-green'
                            : 'w-2 bg-white/50 hover:bg-white/70'
                        }`}
                        aria-label={`Go to event ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Right Navigation Button - Hidden on mobile */}
              {events.length > 1 && (
                <button
                  onClick={goToNext}
                  className="hidden md:flex shrink-0 p-4 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200 hover:scale-110 z-20"
                  aria-label="Next event"
                >
                  <ChevronRight className="h-6 w-6 text-neutral-dark" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {selectedInvite && (
        <InviteModal
          invite={selectedInvite}
          onClose={() => setSelectedInvite(null)}
          onRSVP={handleSubmitRSVP}
        />
      )}
    </div>
  );
}
