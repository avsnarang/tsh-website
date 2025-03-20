import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

const routeLabels: Record<string, string> = {
  about: 'About',
  vision: 'Vision',
  messages: 'Messages',
  academics: 'Academics',
  'pre-primary': 'Pre-Primary',
  primary: 'Primary',
  middle: 'Middle',
  secondary: 'Secondary',
  'senior-secondary': 'Senior Secondary',
  campus: 'Campus',
  'paonta-sahib': 'Paonta Sahib',
  juniors: 'Juniors',
  majra: 'Majra',
  'co-curricular': 'Co-curricular',
  'performing-arts': 'Performing Arts',
  'sports-athletics': 'Sports & Athletics',
  'visual-arts': 'Visual Arts',
  'clubs-societies': 'Clubs & Societies',
  alumni: 'Alumni',
  directory: 'Directory',
  profile: 'Profile',
  register: 'Register',
  gallery: 'Gallery',
  faculty: 'Faculty',
  admissions: 'Admissions',
  contact: 'Contact',
  scholarship: 'Scholarship',
  calendar: 'Calendar',
  admin: 'Admin',
  dashboard: 'Dashboard',
  events: 'Events',
  students: 'Students',
  teachers: 'Teachers',
};

export default function BreadcrumbNav() {
  const location = useLocation();
  const [dynamicLabel, setDynamicLabel] = useState<string>('');

  useEffect(() => {
    const handleUpdateLabel = (event: CustomEvent) => {
      setDynamicLabel(event.detail);
    };

    window.addEventListener('updateBreadcrumbLabel', handleUpdateLabel as EventListener);

    return () => {
      window.removeEventListener('updateBreadcrumbLabel', handleUpdateLabel as EventListener);
    };
  }, []);

  if (location.pathname === '/') return null;

  const segments = location.pathname.split('/').filter(Boolean);

  return (
    <div className="mb-6 -mt-12 pl-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">
                <HomeIcon size={16} aria-hidden="true" />
                <span className="sr-only">Home</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {segments.map((segment, index) => {
            const path = `/${segments.slice(0, index + 1).join('/')}`;
            const isLast = index === segments.length - 1;
            
            // Check if this is a UUID pattern and we have a dynamic label
            const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment);
            const label = (isLast && isUUID && dynamicLabel) 
              ? dynamicLabel 
              : (routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1));

            return (
              <React.Fragment key={path}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={path}>{label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

// Add a method to update the dynamic label
BreadcrumbNav.setDynamicLabel = (label: string) => {
  window.dispatchEvent(new CustomEvent('updateBreadcrumbLabel', { detail: label }));
};
