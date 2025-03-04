import { useParams, Navigate } from 'react-router-dom';
import { campusInfo } from '../../data/campusData';
import { contactInfo, CampusKey } from '../../data/contactInfo';
import CampusHero from '../../components/campus/CampusHero';
import CampusFeatures from '../../components/campus/CampusFeatures';
import CampusFacilities from '../../components/campus/CampusFacilities';
import CampusAchievements from '../../components/campus/CampusAchievements';
import LeadershipMessages from '../../components/campus/LeadershipMessages';
import Container from '../../components/ui/Container';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useSEO } from '../../lib/seo';
import { generateCampusSchema } from '../../lib/schemas/campusSchema';

// Convert URL parameter to campusInfo key format
const getCampusKey = (urlParam: string): CampusKey | null => {
  switch (urlParam) {
    case 'paonta-sahib':
      return 'paontaSahib';
    case 'juniors':
      return 'juniors';
    case 'majra':
      return 'majra';
    default:
      return null;
  }
};

const campusNames = {
  'paonta-sahib': 'Paonta Sahib',
  'juniors': 'Juniors',
  'majra': 'Majra'
};

export default function CampusHome() {
  const { campus } = useParams<{ campus: string }>();

  const campusKey = campus ? getCampusKey(campus) : null;
  const info = campusKey ? campusInfo[campusKey] : null;
  const contact = campusKey ? contactInfo[campusKey] : null;

  useSEO({
    title: `${campusNames[campus as keyof typeof campusNames] || ''} Campus | The Scholars' Home`,
    description: info?.description || "Explore our campus facilities, programs, and achievements. Join The Scholars' Home for excellence in education.",
    url: `https://tsh.edu.in/campus/${campus}`,
    image: info?.facilities[0]?.image || "https://tsh.edu.in/campus.jpg",
    schema: info && campus ? generateCampusSchema(info, campus) : undefined
  });

  if (!info || !contact) {
    return <Navigate to="/campuses" replace />;
  }

  return (
    <div>
      <CampusHero info={info} />
      <CampusFeatures info={info} />
      <LeadershipMessages campusName={campus || ''} />
      <CampusFacilities info={info} />
      <CampusAchievements info={info} />

      {/* Contact Section */}
      <div className="py-24 bg-primary">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl text-neutral-light mb-4">Get in Touch</h2>
            <p className="text-primary-light">Contact us for admissions and inquiries</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-6 w-6 text-primary" />
                <h3 className="text-xl text-neutral-dark">Location</h3>
              </div>
              <p className="text-neutral-dark/80">{contact.address}</p>
            </div>

            <div className="bg-white p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-6 w-6 text-primary" />
                <h3 className="text-xl text-neutral-dark">Phone</h3>
              </div>
              <a 
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
                className="text-neutral-dark/80 hover:text-primary transition-colors"
              >
                {contact.phone}
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-6 w-6 text-primary" />
                <h3 className="text-xl text-neutral-dark">Email</h3>
              </div>
              <a 
                href={`mailto:${contact.email}`}
                className="text-neutral-dark/80 hover:text-primary transition-colors"
              >
                {contact.email}
              </a>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}