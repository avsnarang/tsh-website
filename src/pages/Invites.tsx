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

export default function Invites() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedInvite, setSelectedInvite] = useState<Invite | null>(null);
  const [success, setSuccess] = useState('');
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(true); // New state for filter

  useSEO({
    title: "School Events | The Scholars' Home",
    description: "Stay updated with upcoming events at The Scholars' Home. RSVP for school functions, celebrations, and special occasions.",
    url: "https://tsh.edu.in/invites"
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

  if (loading) {
    return (
      <div className="pt-32 pb-24 bg-neutral-light">
        <Container>
          <div className="text-center">Loading events...</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-neutral-light">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-16">
            <TextReveal>
              <h1 className="text-4xl font-bold text-neutral-dark mb-4">
                School Events
              </h1>
              <p className="text-neutral-dark/60">
                Join us for our upcoming events and celebrations
              </p>
            </TextReveal>
          </div>
        </ScrollReveal>

        {/* Add filter toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowUpcomingOnly(!showUpcomingOnly)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              showUpcomingOnly
                ? 'bg-primary text-white'
                : 'bg-neutral-200 text-neutral-700'
            }`}
          >
            {showUpcomingOnly ? 'Showing Upcoming Events' : 'Showing All Events'}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        {events.length === 0 ? (
          <div className="text-center text-neutral-dark/60">
            No upcoming events at this time.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((invite) => (
              <InviteCard
                key={invite.id}
                invite={invite}
                onRSVP={handleRSVP}
              />
            ))}
          </div>
        )}
      </Container>

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
