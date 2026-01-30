import CampusHome from '@/components/pages/campus/CampusHome';
import type { Metadata } from 'next';
import { campusInfo } from '@/data/campusData';

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

export default async function CampusPage({ params }: Props) {
  const { campus } = await params;
  return <CampusHome />;
}
