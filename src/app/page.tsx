import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import Home from '@/components/pages/Home';

export const metadata: Metadata = {
  title: "The Scholars' Home | Excellence in Education Since 2003",
  description: "Join The Scholars' Home for world-class education and holistic development. CBSE-affiliated school offering comprehensive education from pre-primary to senior secondary levels.",
};

async function getInitialData() {
  const { data: messages } = await supabase
    .from('leadership_messages')
    .select('*')
    .eq('display_locations', ['homepage'])
    .order('order');

  const { data: latestUpdate } = await supabase
    .from('latest_updates')
    .select('content')
    .eq('is_active', true)
    .single();

  return {
    messages: messages || [],
    latestUpdate: latestUpdate?.content || ''
  };
}

export default async function HomePage() {
  const initialData = await getInitialData();
  
  return <Home initialData={initialData} />;
}