import { useState, useEffect } from 'react';
import Container from '../components/ui/Container';
import InviteCard from '../components/invites/InviteCard';
import InviteModal from '../components/invites/InviteModal';
import { Invite } from '../types/invite';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import ScrollReveal from '../components/animations/ScrollReveal';
import TextReveal from '../components/animations/TextReveal';
import { useSEO } from '../lib/seo';
import { Filter, Calendar, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import InviteCardSkeleton from '../components/invites/InviteCardSkeleton';

export default function Invites() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(false); // Changed initial state to false
  const [error, setError] = useState('');
  const [selectedInvite, setSelectedInvite] = useState<Invite | null>(null);
  const [success, setSuccess] = useState('');
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(true); // New state for filter

  useSEO({
    title: "School Events | The Scholars' Home",
    description: "Join us for our upcoming events and celebrations at The Scholars' Home. RSVP for school functions and special occasions.",
  });

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
          const { data: totalGuests, error: countError } = await supabase
            .rpc('get_event_total_guests', { p_event_id: event.id });

          if (countError) throw countError;

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
      setError('Failed to load events');
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
          <ScrollReveal>
            <div className="text-center mb-16">
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
                <h1 className="font-display text-5xl md:text-7xl text-neutral-dark mb-6">
                  Join Our <span className="text-green">School</span>{" "}
                  <span className="text-orange">Events</span>
                </h1>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-xl text-neutral-dark/70 font-body max-w-2xl mx-auto">
                  Be part of our vibrant school community and celebrations
                </p>
              </TextReveal>
            </div>
          </ScrollReveal>

          {/* Filter Toggle */}
          <ScrollReveal>
            <div className="flex justify-center mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-1.5">
                <motion.button
                  onClick={() => setShowUpcomingOnly(!showUpcomingOnly)}
                  className="relative flex items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background pill that slides */}
                  <motion.div
                    className="absolute h-full w-[50%] bg-green rounded-xl"
                    initial={false}
                    animate={{
                      x: showUpcomingOnly ? '0%' : '100%',
                      opacity: 0.1
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />

                  {/* Filter Options */}
                  <div 
                    className={`flex items-center gap-2 px-6 py-3 w-[50%] transition-colors duration-200 ${
                      showUpcomingOnly ? 'text-green font-semibold' : 'text-neutral-400'
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    <span>Upcoming</span>
                  </div>
                  <div 
                    className={`flex items-center gap-2 px-6 py-3 w-[50%] transition-colors duration-200 ${
                      !showUpcomingOnly ? 'text-green font-semibold' : 'text-neutral-400'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>All Events</span>
                  </div>
                </motion.button>
              </div>
            </div>
          </ScrollReveal>

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

          {/* Events Grid with Skeleton Loading */}
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                // Show 6 skeleton cards while loading
                [...Array(6)].map((_, index) => (
                  <motion.div
                    key={`skeleton-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <InviteCardSkeleton />
                  </motion.div>
                ))
              ) : events.length === 0 ? (
                <div className="col-span-full text-center text-neutral-dark/60 py-12">
                  <Star className="h-12 w-12 mx-auto mb-4 text-orange-light" />
                  <p className="text-lg">No upcoming events at this time.</p>
                </div>
              ) : (
                events.map((invite) => (
                  <motion.div
                    key={invite.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <InviteCard
                      invite={invite}
                      onRSVP={handleRSVP}
                    />
                  </motion.div>
                ))
              )}
            </div>
          </ScrollReveal>
        </Container>
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
