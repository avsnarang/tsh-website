import { CampusInfo } from '../../types/campus';

export function generateCampusSchema(info: CampusInfo, campus: string) {
  const campusNames = {
    'paonta-sahib': 'Paonta Sahib',
    'juniors': 'Juniors',
    'majra': 'Majra'
  };

  const campusAddresses = {
    'paonta-sahib': {
      street: 'Jamniwala Road, Badripur',
      phone: '+91-8628800056',
      email: 'info@ps.tsh.edu.in'
    },
    'juniors': {
      street: 'Near Degree College, Devinagar',
      phone: '+91-98057 35656',
      email: 'info@jun.tsh.edu.in'
    },
    'majra': {
      street: 'Near SBI Majra',
      phone: '+91-96927 00056',
      email: 'info@majra.tsh.edu.in'
    }
  };

  const address = campusAddresses[campus as keyof typeof campusAddresses];

  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": `The Scholars' Home, ${campusNames[campus as keyof typeof campusNames]}`,
    "url": `https://tsh.edu.in/campus/${campus}`,
    "logo": "https://tsh.edu.in/logo.png",
    "image": info.facilities[0]?.image || "https://tsh.edu.in/campus.jpg",
    "description": info.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.street,
      "addressLocality": "Paonta Sahib",
      "addressRegion": "Himachal Pradesh",
      "postalCode": "173025",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": address.phone,
      "contactType": "admissions",
      "email": address.email,
      "availableLanguage": ["English", "Hindi"]
    },
    "foundingDate": "2003",
    "numberOfStudents": info.stats.find(s => s.label === "Students")?.value || "500+",
    "educationalLevel": ["Primary", "Secondary", "Senior Secondary"],
    "teaches": [
      "CBSE Curriculum",
      "Mathematics",
      "Science",
      "Languages",
      "Social Studies",
      "Computer Science",
      "Physical Education"
    ],
    "areaServed": "Paonta Sahib",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Academic Programs",
      "itemListElement": [
        {
          "@type": "EducationalOccupationalProgram",
          "name": "Primary Education",
          "educationalLevel": "Primary",
          "educationalProgramMode": "Full-Time"
        },
        {
          "@type": "EducationalOccupationalProgram",
          "name": "Secondary Education",
          "educationalLevel": "Secondary",
          "educationalProgramMode": "Full-Time"
        }
      ]
    },
    "amenityFeature": info.facilities.map(facility => ({
      "@type": "LocationFeatureSpecification",
      "name": facility.title,
      "value": true
    }))
  };
}