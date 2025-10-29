import Messages from '@/pages/about/Messages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leadership Messages',
  description: 'Read messages from our leadership team at The Scholars\' Home.',
};

export default function MessagesPage() {
  return <Messages />;
}

