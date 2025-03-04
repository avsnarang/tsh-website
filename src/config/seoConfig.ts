interface SEOConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
  schema?: object;
}

export const seoConfig: Record<string, SEOConfig> = {
  home: {
    title: "The Scholars' Home | Excellence in Education Since 2003",
    description: "Join The Scholars' Home for world-class education and holistic development. CBSE-affiliated school offering comprehensive education from pre-primary to senior secondary levels.",
    url: "https://tsh.edu.in",
    image: "/og-image.jpg"
  },
  academics: {
    title: "Academics | The Scholars' Home",
    description: "Explore our comprehensive academic programs from pre-primary to senior secondary. CBSE curriculum with focus on holistic development and excellence.",
    url: "https://tsh.edu.in/academics",
  },
  prePrimary: {
    title: "Pre-Primary Education | The Scholars' Home",
    description: "Early childhood education program at The Scholars' Home. Nurturing young minds through play-based learning and holistic development.",
    url: "https://tsh.edu.in/academics/pre-primary"
  },
  primary: {
    title: "Primary School | The Scholars' Home",
    description: "Primary education program at The Scholars' Home. Building strong foundations through comprehensive curriculum and personalized attention.",
    url: "https://tsh.edu.in/academics/primary"
  },
  secondary: {
    title: "Secondary School | The Scholars' Home",
    description: "Secondary education program at The Scholars' Home. Preparing students for CBSE board examinations with comprehensive subject coverage.",
    url: "https://tsh.edu.in/academics/secondary"
  },
  seniorSecondary: {
    title: "Senior Secondary School | The Scholars' Home",
    description: "Senior secondary education at The Scholars' Home. Specialized streams in Science, Commerce, and Humanities with expert faculty guidance.",
    url: "https://tsh.edu.in/academics/senior-secondary"
  },
  coCurricular: {
    title: "Co-Curricular Activities | The Scholars' Home",
    description: "Explore our diverse co-curricular programs including performing arts, sports, visual arts, and clubs. Nurturing talents beyond academics.",
    url: "https://tsh.edu.in/co-curricular"
  },
  performingArts: {
    title: "Performing Arts | The Scholars' Home",
    description: "Discover our performing arts program including music, dance, and theater. Nurturing artistic talents and creative expression.",
    url: "https://tsh.edu.in/co-curricular/performing-arts"
  },
  visualArts: {
    title: "Visual Arts | The Scholars' Home",
    description: "Visual arts program at The Scholars' Home. Nurturing creativity through various art forms and modern techniques.",
    url: "https://tsh.edu.in/co-curricular/visual-arts"
  },
  sportsAthletics: {
    title: "Sports & Athletics | The Scholars' Home",
    description: "Excellence in sports and athletics at The Scholars' Home. Professional coaching and world-class facilities for comprehensive physical development.",
    url: "https://tsh.edu.in/co-curricular/sports-athletics"
  },
  clubsSocieties: {
    title: "Clubs & Societies | The Scholars' Home",
    description: "Explore our diverse clubs and societies. Fostering interests and building communities through extra-curricular activities.",
    url: "https://tsh.edu.in/co-curricular/clubs-societies"
  },
  scholarship: {
    title: "Scholarships | The Scholars' Home",
    description: "Explore scholarship opportunities at The Scholars' Home. Merit-based and need-based financial aid programs for deserving students.",
    url: "https://tsh.edu.in/scholarship"
  },
  contact: {
    title: "Contact Us | The Scholars' Home",
    description: "Get in touch with The Scholars' Home. Contact information for all our campuses and admission inquiries.",
    url: "https://tsh.edu.in/contact"
  },
  alumni: {
    title: "Alumni Network | The Scholars' Home",
    description: "Join our alumni network to connect with fellow graduates and share your success stories",
    url: "https://tsh.edu.in/alumni/network"
  },
  alumniSuccess: {
    title: "Alumni Success Stories | The Scholars' Home",
    description: "Discover inspiring success stories from The Scholars' Home alumni community.",
    url: "https://tsh.edu.in/alumni/success"
  }
};