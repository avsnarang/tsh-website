interface SEOConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
  keywords?: string[];
  schema?: object;
}

const baseUrl = 'https://tsh.edu.in';

export const seoConfig: Record<string, SEOConfig> = {
  home: {
    title: "The Scholars' Home | Best CBSE School in Paonta Sahib, Himachal Pradesh",
    description: "The Scholars' Home is a premier CBSE-affiliated school in Paonta Sahib, Himachal Pradesh. Excellence in education from pre-primary to senior secondary since 2003. Admissions open!",
    url: baseUrl,
    image: `${baseUrl}/og-image.jpg`,
    keywords: ['CBSE school Paonta Sahib', 'best school Himachal Pradesh', 'TSH school']
  },
  academics: {
    title: "Academic Programs - CBSE Curriculum",
    description: "Comprehensive CBSE academic programs from pre-primary to Class 12 at The Scholars' Home. Experienced faculty, modern teaching methods, and excellent board results.",
    url: `${baseUrl}/academics`,
    keywords: ['CBSE curriculum', 'academic programs', 'board exams preparation']
  },
  prePrimary: {
    title: "Pre-Primary Education - Nursery, LKG, UKG",
    description: "Best pre-primary school in Paonta Sahib. Play-based early childhood education program at The Scholars' Home. Nurturing young minds with holistic development approach.",
    url: `${baseUrl}/academics/pre-primary`,
    keywords: ['nursery school Paonta Sahib', 'pre-primary education', 'kindergarten Himachal']
  },
  primary: {
    title: "Primary School - Classes 1 to 5",
    description: "Quality primary education at The Scholars' Home. CBSE curriculum for Classes 1-5 with focus on foundational learning, interactive teaching, and all-round development.",
    url: `${baseUrl}/academics/primary`,
    keywords: ['primary school CBSE', 'classes 1-5', 'primary education Himachal']
  },
  middle: {
    title: "Middle School - Classes 6 to 8",
    description: "Middle school education at The Scholars' Home. Comprehensive CBSE curriculum for Classes 6-8 preparing students for secondary academics with practical learning.",
    url: `${baseUrl}/academics/middle`,
    keywords: ['middle school CBSE', 'classes 6-8', 'middle school education']
  },
  secondary: {
    title: "Secondary School - Classes 9 & 10 (CBSE Board)",
    description: "CBSE secondary education for Classes 9-10 at The Scholars' Home. Expert faculty, comprehensive board exam preparation, and consistent excellent results.",
    url: `${baseUrl}/academics/secondary`,
    keywords: ['CBSE class 10', 'secondary school', 'board exam preparation']
  },
  seniorSecondary: {
    title: "Senior Secondary - Classes 11 & 12 (Science, Commerce, Humanities)",
    description: "Senior secondary education at The Scholars' Home. CBSE Classes 11-12 with Science, Commerce, and Humanities streams. Expert guidance for competitive exams.",
    url: `${baseUrl}/academics/senior-secondary`,
    keywords: ['CBSE class 12', 'science stream', 'commerce stream', 'humanities', 'JEE NEET preparation']
  },
  coCurricular: {
    title: "Co-Curricular Activities - Sports, Arts & More",
    description: "Diverse co-curricular programs at The Scholars' Home including sports, performing arts, visual arts, and clubs. Developing well-rounded personalities.",
    url: `${baseUrl}/co-curricular`,
    keywords: ['co-curricular activities', 'school sports', 'arts education']
  },
  performingArts: {
    title: "Performing Arts - Music, Dance & Theater",
    description: "Performing arts program at The Scholars' Home. Music, dance, and theater training by experienced instructors. Nurturing artistic talents and creative expression.",
    url: `${baseUrl}/co-curricular/performing-arts`,
    keywords: ['school music program', 'dance classes', 'theater education']
  },
  visualArts: {
    title: "Visual Arts - Drawing, Painting & Crafts",
    description: "Visual arts education at The Scholars' Home. Drawing, painting, and crafts with modern techniques. Fostering creativity and artistic development.",
    url: `${baseUrl}/co-curricular/visual-arts`,
    keywords: ['art education', 'drawing classes', 'painting school']
  },
  sportsAthletics: {
    title: "Sports & Athletics - Professional Training",
    description: "Sports and athletics at The Scholars' Home. Professional coaching in cricket, football, basketball, athletics, and more. State-of-the-art sports facilities.",
    url: `${baseUrl}/co-curricular/sports-athletics`,
    keywords: ['school sports program', 'athletics training', 'sports coaching']
  },
  clubsSocieties: {
    title: "Clubs & Societies - Student Organizations",
    description: "Student clubs and societies at The Scholars' Home. Science club, debate society, eco club, and more. Building leadership and teamwork skills.",
    url: `${baseUrl}/co-curricular/clubs-societies`,
    keywords: ['school clubs', 'student societies', 'extra-curricular activities']
  },
  scholarship: {
    title: "Scholarships - Merit & Need-Based Financial Aid",
    description: "Scholarship programs at The Scholars' Home. Merit-based and need-based financial aid for deserving students. Making quality education accessible.",
    url: `${baseUrl}/scholarship`,
    keywords: ['school scholarship', 'financial aid', 'merit scholarship']
  },
  contact: {
    title: "Contact Us - Admissions & Inquiries",
    description: "Contact The Scholars' Home for admissions and inquiries. Find addresses, phone numbers, and email for all our campuses in Paonta Sahib, Himachal Pradesh.",
    url: `${baseUrl}/contact`,
    keywords: ['contact school', 'admission inquiry', 'school address Paonta Sahib']
  },
  campuses: {
    title: "Our Campuses - Paonta Sahib, Juniors & Majra",
    description: "The Scholars' Home campuses in Himachal Pradesh. State-of-the-art facilities at Paonta Sahib, Juniors, and Majra locations. World-class infrastructure.",
    url: `${baseUrl}/campuses`,
    keywords: ['school campuses', 'TSH locations', 'school facilities']
  },
  alumni: {
    title: "Alumni Network - Connect with TSH Graduates",
    description: "Join The Scholars' Home alumni network. Connect with fellow graduates, share success stories, and stay connected with your alma mater.",
    url: `${baseUrl}/alumni`,
    keywords: ['alumni network', 'school alumni', 'graduate community']
  },
  faculty: {
    title: "Our Faculty - Experienced & Dedicated Teachers",
    description: "Meet the experienced faculty at The Scholars' Home. Qualified teachers dedicated to student success with modern teaching methodologies.",
    url: `${baseUrl}/faculty`,
    keywords: ['school teachers', 'qualified faculty', 'experienced educators']
  },
  alumniSuccess: {
    title: "Alumni Success Stories - TSH Achievers",
    description: "Inspiring success stories from The Scholars' Home alumni. Discover how our graduates are excelling in various fields across India and abroad.",
    url: `${baseUrl}/alumni/success`,
    keywords: ['alumni achievements', 'success stories', 'school alumni accomplishments']
  },
  admissions: {
    title: "Admissions 2024-25 - Apply Now",
    description: "Apply for admission at The Scholars' Home. CBSE school admissions open for 2024-25. Learn about eligibility, process, and important dates.",
    url: `${baseUrl}/admissions`,
    keywords: ['school admission 2024', 'CBSE admission', 'apply for admission']
  },
  gallery: {
    title: "Photo Gallery - School Events & Activities",
    description: "Browse photos from The Scholars' Home events, activities, and celebrations. Glimpse into student life and school culture.",
    url: `${baseUrl}/gallery`,
    keywords: ['school photos', 'event gallery', 'school activities']
  },
  videoGallery: {
    title: "Video Gallery - School Videos & Highlights",
    description: "Watch videos from The Scholars' Home. Event highlights, student performances, and school activities captured on video.",
    url: `${baseUrl}/video-gallery`,
    keywords: ['school videos', 'event videos', 'student performances']
  },
  calendar: {
    title: "Academic Calendar - Events & Important Dates",
    description: "View The Scholars' Home academic calendar. Important dates, holidays, exams, and school events for the current academic year.",
    url: `${baseUrl}/calendar`,
    keywords: ['academic calendar', 'school events', 'exam dates']
  },
  about: {
    title: "About Us - Our Story & Values",
    description: "Learn about The Scholars' Home. Our history, mission, vision, and commitment to excellence in education since 2003.",
    url: `${baseUrl}/about`,
    keywords: ['about TSH', 'school history', 'mission vision']
  },
  vision: {
    title: "Vision & Mission - Our Educational Philosophy",
    description: "The Scholars' Home vision and mission. Our educational philosophy focusing on holistic development and academic excellence.",
    url: `${baseUrl}/about/vision`,
    keywords: ['school vision', 'educational mission', 'school philosophy']
  },
  messages: {
    title: "Messages from Leadership - Principal & Management",
    description: "Messages from The Scholars' Home leadership. Read insights from our Principal and Management team about our educational approach.",
    url: `${baseUrl}/about/messages`,
    keywords: ['principal message', 'school leadership', 'management message']
  }
};