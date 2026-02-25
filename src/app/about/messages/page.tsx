import Messages from '@/components/pages/about/Messages';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { LeadershipMessage } from '@/types/leadership';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Leadership Messages',
  description: 'Read messages from our leadership team at The Scholars\' Home.',
};

async function getMessages(): Promise<LeadershipMessage[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('leadership_messages')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching leadership messages:', error);
    return [];
  }

  return (data || []).map(msg => ({
    id: msg.id,
    name: msg.name,
    role: msg.role,
    photo_url: msg.photo_url,
    preview: msg.preview,
    fullMessage: msg.full_message || '',
    display_locations: msg.display_locations || ['all'],
  }));
}

export default async function MessagesPage() {
  const messages = await getMessages();
  return <Messages messages={messages} />;
}
