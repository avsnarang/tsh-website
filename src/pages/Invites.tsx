import { useState, useEffect } from 'react';
import Container from '../components/ui/Container';
import InviteCard from '../components/invites/InviteCard';
import InviteModal from '../components/invites/InviteModal';
import type { Invite as InviteType } from '../types/invite';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import Title from '../components/utils/Title';
import ScrollReveal from '../components/animations/ScrollReveal';
import TextReveal from '../components/animations/TextReveal';
import { useSEO } from '../lib/seo';

export default function Invites() {
  const { user } = useAuth();
  const [invites, setInvites] = useState<InviteType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedInvite, setSelectedInvite] = useState<InviteType | null>(null);
  const [success, setSuccess] = useState('');

  useSEO({
    title: "School Events | The Scholars' Home",
    description: "Stay updated with upcoming events at The Scholars' Home. RSVP for school functions, celebrations, and special occasions.",
    url: "https://tsh.edu.in/invites"
  });

  useEffect(() => {
    fetchInvites();
  }, []);

  const fetchInvites = async () => {
    try {
      setLoading(true);
      setError('');

      const { data: invitesData, error: invitesError } = await supabase
        .from('invites')
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
        .order('date', { ascending: true })
        .gte('date', new Date().toISOString().split('T')[0]);

      if (invitesError) throw invitesError;

      const invitesWithDetails = await Promise.all(
        (invitesData || []).map(async (invite) => {
          const { data: totalGuests, error: countError } = await supabase
            .rpc('get_event_total_guests', { p_event_id: invite.id });

          if (countError) throw countError;

          let userRsvp: InviteType['userRsvp'] | undefined = undefined;
          if (user) {
            const { data: rsvpData } = await supabase
              .from('event_rsvps')
              .select('status, guests, admission_number')
              .eq('event_id', invite.id)
              .eq('user_id', user.id)
              .maybeSingle();

            if (rsvpData) {
              userRsvp = {
                status: rsvpData.status,
                guests: rsvpData.guests,
                admission_number: rsvpData.admission_number
              } as InviteType['userRsvp'];
            }
          }

          return {
            id: invite.id,
            title: invite.title,
            date: invite.date,
            time: invite.time,
            location: invite.location,
            description: invite.description,
            coverImage: invite.cover_image,
            maxCapacity: invite.max_capacity,
            maxGuestsPerRsvp: invite.max_guests_per_rsvp,
            requiresAdmissionNumber: true,
            status: 'upcoming' as const,
            rsvpCount: totalGuests || 0,
            userRsvp,
            acceptingRsvps: invite.accepting_rsvps
          } satisfies InviteType;
        })
      );

      setInvites(invitesWithDetails);
    } catch (error) {
      console.error('Error fetching invites:', error);
      setError('Failed to load invites');
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = (inviteId: string) => {
    const invite = invites.find(inv => inv.id === inviteId);
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
      await fetchInvites(); // Refresh invites to update counts
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

        {invites.length === 0 ? (
          <div className="text-center text-neutral-dark/60">
            No upcoming events at this time.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {invites.map((invite) => (
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
