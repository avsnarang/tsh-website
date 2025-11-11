import { supabase } from '../lib/supabase';
import Home from '../pages/Home';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';

// Replace Next.js metadata with React Helmet
function PageMetadata() {
  return (
    <Helmet>
      <title>The Scholars' Home | Excellence in Education Since 2003</title>
      <meta 
        name="description" 
        content="Join The Scholars' Home for world-class education and holistic development. CBSE-affiliated school offering comprehensive education from pre-primary to senior secondary levels."
      />
    </Helmet>
  );
}

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

export default function HomePage() {
  const [initialData, setInitialData] = useState<{
    messages: any[];
    latestUpdate: string;
  }>({ messages: [], latestUpdate: '' });

  useEffect(() => {
    getInitialData().then(setInitialData);
  }, []);

  return (
    <>
      <PageMetadata />
      <Home messages={initialData.messages} latestUpdate={initialData.latestUpdate} />
    </>
  );
}
