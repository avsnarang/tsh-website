export interface Invite {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  coverImage: string;
  coverImageMobile?: string;
  status: 'upcoming' | 'past';
  rsvpCount: number;
  maxCapacity?: number;
  maxGuestsPerRsvp: number;
  requiresAdmissionNumber: boolean;
  acceptingRsvps: boolean;
  userRsvp?: {
    status: 'attending' | 'not_attending' | 'maybe';
    guests: number;
    admission_number?: string;
  };
}

export interface RSVPResponse {
  id: string;
  inviteId: string;
  userId: string;
  status: 'attending' | 'not_attending' | 'maybe';
  guests: number;
  admissionNumber?: string;
  createdAt: string;
}