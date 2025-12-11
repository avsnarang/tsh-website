// Organization and Website structured data for SEO
// These schemas help search engines understand the business entity

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://tsh.edu.in/#organization",
  "name": "The Scholars' Home",
  "alternateName": ["TSH", "Scholars Home", "The Scholars Home"],
  "url": "https://tsh.edu.in",
  "logo": {
    "@type": "ImageObject",
    "url": "https://tsh.edu.in/logo.png",
    "width": 512,
    "height": 512
  },
  "image": "https://tsh.edu.in/og-image.jpg",
  "description": "The Scholars' Home is a premier CBSE-affiliated educational institution in Himachal Pradesh, India, offering excellence in education from pre-primary to senior secondary levels since 2003.",
  "foundingDate": "2003",
  "founder": {
    "@type": "Person",
    "name": "The Scholars' Home Foundation"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jamniwala Road, Badripur",
    "addressLocality": "Paonta Sahib",
    "addressRegion": "Himachal Pradesh",
    "postalCode": "173025",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "30.4358",
    "longitude": "77.6183"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91-8628800056",
      "contactType": "admissions",
      "email": "info@tsh.edu.in",
      "availableLanguage": ["English", "Hindi"],
      "areaServed": "IN"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+91-98057-35656",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"]
    }
  ],
  "sameAs": [
    "https://www.facebook.com/thescholarsHome",
    "https://www.instagram.com/the_scholars_home",
    "https://www.youtube.com/@thescholarsHome"
  ],
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "30.4358",
      "longitude": "77.6183"
    },
    "geoRadius": "50000"
  },
  "priceRange": "$$",
  "currenciesAccepted": "INR",
  "paymentAccepted": ["Cash", "Bank Transfer", "Online Payment"],
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 50,
    "maxValue": 200
  },
  "slogan": "Excellence in Education Since 2003",
  "knowsAbout": [
    "CBSE Education",
    "Primary Education",
    "Secondary Education",
    "Senior Secondary Education",
    "Pre-Primary Education",
    "Holistic Development",
    "Co-curricular Activities",
    "Sports Education"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Academic Programs",
    "itemListElement": [
      {
        "@type": "EducationalOccupationalProgram",
        "name": "Pre-Primary Education",
        "educationalLevel": "Pre-Primary",
        "educationalProgramMode": "Full-Time",
        "offers": {
          "@type": "Offer",
          "category": "Education"
        }
      },
      {
        "@type": "EducationalOccupationalProgram",
        "name": "Primary Education (Classes 1-5)",
        "educationalLevel": "Primary",
        "educationalProgramMode": "Full-Time"
      },
      {
        "@type": "EducationalOccupationalProgram",
        "name": "Middle School Education (Classes 6-8)",
        "educationalLevel": "Middle School",
        "educationalProgramMode": "Full-Time"
      },
      {
        "@type": "EducationalOccupationalProgram",
        "name": "Secondary Education (Classes 9-10)",
        "educationalLevel": "Secondary",
        "educationalProgramMode": "Full-Time",
        "educationalCredentialAwarded": "CBSE Class 10 Certificate"
      },
      {
        "@type": "EducationalOccupationalProgram",
        "name": "Senior Secondary Education (Classes 11-12)",
        "educationalLevel": "Senior Secondary",
        "educationalProgramMode": "Full-Time",
        "educationalCredentialAwarded": "CBSE Class 12 Certificate"
      }
    ]
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://tsh.edu.in/#website",
  "name": "The Scholars' Home",
  "alternateName": "TSH",
  "url": "https://tsh.edu.in",
  "description": "Official website of The Scholars' Home - Premier CBSE school in Himachal Pradesh offering quality education from pre-primary to senior secondary.",
  "publisher": {
    "@id": "https://tsh.edu.in/#organization"
  },
  "inLanguage": "en-IN",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://tsh.edu.in/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "School",
  "@id": "https://tsh.edu.in/#school",
  "name": "The Scholars' Home",
  "image": "https://tsh.edu.in/og-image.jpg",
  "url": "https://tsh.edu.in",
  "telephone": "+91-8628800056",
  "email": "info@tsh.edu.in",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jamniwala Road, Badripur",
    "addressLocality": "Paonta Sahib",
    "addressRegion": "Himachal Pradesh",
    "postalCode": "173025",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "30.4358",
    "longitude": "77.6183"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "15:00"
    }
  ],
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "150"
  }
};

// Combined schema graph for homepage
export const homePageSchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    websiteSchema,
    localBusinessSchema
  ]
};

// Helper function to generate JSON-LD script
export function generateJsonLd(schema: object): string {
  return JSON.stringify(schema);
}
