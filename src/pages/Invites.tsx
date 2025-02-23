import React, { useState, useEffect } from 'react';
import Container from '../components/ui/Container';
import InviteCard from '../components/invites/InviteCard';
import InviteModal from '../components/invites/InviteModal';
import { Invite } from '../types/invite';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import Title from '../components/utils/Title';
import ScrollReveal from '../components/animations/ScrollReveal';
import TextReveal from '../components/animations/TextReveal';

export default function Invites() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedInvite, setSelectedInvite] = useState<Invite | null>(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');

      const { data: eventsData, error: eventsError } = await supabase
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
          requires_admission_number
        `)
        .order('date', { ascending: true })
        .gte('date', new Date().toISOString().split('T')[0]); // Only get upcoming events

      if (eventsError) throw eventsError;

      // Get RSVP counts and user's RSVP status for each event
      const eventsWithDetails = await Promise.all(
        (eventsData || []).map(async (event) => {
          // Get total RSVP count
          const { count } = await supabase
            .from('event_rsvps')
            .select('*', { count: 'exact', head: true })
            .eq('event_id', event.id)
            .eq('status', 'attending');

          // Get user's RSVP if logged in
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
            requiresAdmissionNumber: event.requires_admission_number,
            status: 'upcoming',
            rsvpCount: count || 0,
            userRsvp
          };
        })
      );

      setEvents(eventsWithDetails);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = (inviteId: string) => {
    if (!user) {
      setError('Please sign in to RSVP for events');
      return;
    }

    const invite = events.find(inv => inv.id === inviteId);
    if (invite) {
      setSelectedInvite(invite);
    }
  };

  const handleSubmitRSVP = async (
    status: 'attending' | 'not_attending' | 'maybe', 
    guests: number,
    admissionNumber?: string
  ) => {
    if (!user || !selectedInvite) return;

    try {
      setError('');

      // Check if user already has an RSVP
      const { data: existingRsvp } = await supabase
        .from('event_rsvps')
        .select('id')
        .eq('event_id', selectedInvite.id)
        .eq('user_id', user.id)
        .maybeSingle();

      const rsvpData = {
        event_id: selectedInvite.id,
        user_id: user.id,
        status,
        guests,
        admission_number: admissionNumber,
        updated_at: new Date().toISOString()
      };

      if (existingRsvp) {
        // Update existing RSVP
        const { error: updateError } = await supabase
          .from('event_rsvps')
          .update(rsvpData)
          .eq('id', existingRsvp.id);

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
      <Title title="School Events" description="Join Our Special Occasions" />
      <Container>
        <ScrollReveal>
          <div className="text-center mb-16">
            <TextReveal>
              <h1 className="text-5xl text-neutral-dark mb-4">School Events</h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-xl text-primary font-body max-w-2xl mx-auto">
                Join us in celebrating special moments and milestones
              </p>
            </TextReveal>
          </div>
        </ScrollReveal>

        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        )}

        {success && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
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