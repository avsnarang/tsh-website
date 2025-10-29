import SportsAthletics from '@/pages/co-curricular/SportsAthletics';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sports & Athletics',
  description: 'Excellence in sports and athletics at The Scholars\' Home. Professional coaching and world-class facilities for comprehensive physical development.',
};

export default function SportsAthleticsPage() {
  return <SportsAthletics />;
}

