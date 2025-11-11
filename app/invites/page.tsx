import Invites from '@/components/pages/Invites';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Invites',
  description: 'View and respond to event invitations.',
};

export default function InvitesPage() {
  return <Invites />;
}

