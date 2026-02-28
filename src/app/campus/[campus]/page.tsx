import CampusHome from '@/components/pages/campus/CampusHome';
import type { Metadata } from 'next';
import { campusInfo } from '@/data/campusData';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { LeadershipMessage } from '@/types/leadership';

export const revalidate = 3600;

type Props = {
  params: Promise<{ campus: string }>;
};

// Map URL slugs to campusInfo keys
const campusSlugMap: Record<string, string> = {
  'paonta-sahib': 'paontaSahib',
  'juniors': 'juniors',
  'majra': 'majra',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { campus } = await params;
  const campusKey = campusSlugMap[campus];
  const campusData = campusKey ? campusInfo[campusKey] : null;

  if (!campusData) {
    return {
      title: 'Campus Not Found',
      description: 'The requested campus page could not be found.',
    };
  }

  const campusName = campusData.name.replace("The Scholars' Home, ", '');

  return {
    title: `${campusName} Campus`,
    description: `${campusData.name} - ${campusData.tagline}. ${campusData.description} Offering quality CBSE education in Himachal Pradesh.`,
    keywords: [
      `${campusName} campus`,
      'The Scholars Home',
      'CBSE school',
      'best school Himachal Pradesh',
      `school in ${campusName}`,
    ],
    openGraph: {
      title: `${campusData.name} | The Scholars' Home`,
      description: campusData.description,
      ...(campusData.heroImage && { images: [campusData.heroImage] }),
    },
  };
}

async function getLeadershipMessages(campusName: string): Promise<LeadershipMessage[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('leadership_messages')
      .select('*')
      .order('order', { ascending: true });

    if (error) {
      console.error('Error fetching leadership messages:', error);
      return [];
    }

    return (data || [])
      .filter(msg => {
        const locations = msg.display_locations || [];
        return locations.includes('all') || locations.includes(campusName);
      })
      .map(msg => ({
        id: msg.id,
        name: msg.name,
        role: msg.role,
        photo_url: msg.photo_url,
        preview: msg.preview,
        fullMessage: msg.full_message || '',
        display_locations: msg.display_locations || ['all'],
      }));
  } catch (error) {
    console.error('Error fetching leadership messages:', error);
    return [];
  }
}

export default async function CampusPage({ params }: Props) {
  const { campus } = await params;
  const messages = await getLeadershipMessages(campus);
  return <CampusHome leadershipMessages={messages} />;
}
