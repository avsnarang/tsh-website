import { CampusInfo } from '../types/campus';

export const campusInfo: { [key: string]: CampusInfo } = {
  paontaSahib: {
    name: "The Scholars' Home, Paonta Sahib",
    tagline: "Excellence in Education Since 2004",
    description: "Our flagship campus offers comprehensive education from primary to senior secondary levels with state-of-the-art facilities.",
    registrationUrl: "https://learn.tsh.edu.in/#/erp/the_scholars_home_registration_form_cbse",
    features: [
      {
        title: "Academic Excellence",
        description: "Consistently achieving outstanding results in CBSE board examinations"
      },
      {
        title: "Modern Infrastructure",
        description: "State-of-the-art laboratories, smart classrooms, and sports facilities"
      },
      {
        title: "Holistic Development",
        description: "Focus on academic, physical, and personality development"
      }
    ],
    stats: [
      { label: "Students", value: "1400+" },
      { label: "Faculty", value: "100+" },
      { label: "Acres Campus", value: "25" },
      { label: "Years of Excellence", value: "20+" }
    ],
    facilities: [
      {
        title: "Smart Classrooms",
        description: "Interactive learning with modern technology",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2066&q=80"
      },
      {
        title: "Sports Complex",
        description: "Multi-sport facilities for physical development",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=2066&q=80"
      },
      {
        title: "Science Labs",
        description: "Well-equipped laboratories for practical learning",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      }
    ],
    achievements: [
      {
        title: "Ranked in Top 100 Schools",
        description: "Awarded recognition for Future-Proof Learning by Education Today!",
        year: "2023"
      },
      {
        title: "National Chess Championship",
        description: "Students selected for Internation Chess Championship",
        year: "2023"
      },
      {
        title: "Most Effective Blended Learning Model",
        description: "Ranked Number 1 in North India by Education Today!",
        year: "2024"
      }
    ]
  },
  juniors: {
    name: "The Scholars' Home, Juniors",
    tagline: "Nurturing Young Minds",
    description: "A specialized campus dedicated to early childhood education and primary schooling in a nurturing environment.",
    registrationUrl: "https://learn.tsh.edu.in/#/erp/the_scholars_home_registration_form_juniors",
    features: [
      {
        title: "Play-based Learning",
        description: "Interactive and engaging educational activities"
      },
      {
        title: "Safe Environment",
        description: "Secure and child-friendly campus facilities"
      },
      {
        title: "Individual Attention",
        description: "Low student-teacher ratio for personalized care"
      }
    ],
    stats: [
      { label: "Students", value: "150+" },
      { label: "Teachers", value: "10+" },
      { label: "Activities", value: "20+" }
    ],
    facilities: [
      {
        title: "Activity Rooms",
        description: "Specially designed spaces for creative learning",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2022&q=80"
      },
      {
        title: "Play Areas",
        description: "Safe and engaging outdoor play spaces",
        image: "https://images.unsplash.com/photo-1526634332515-d56c5fd16991?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      },
      {
        title: "Learning Centers",
        description: "Interactive zones for different subjects",
        image: "https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
      }
    ],
    achievements: []
  },
  majra: {
    name: "The Scholars' Home, Majra",
    tagline: "Tradition Meets Innovation",
    description: "A perfect blend of traditional values and modern education methodologies for comprehensive student development.",
    registrationUrl: "https://learn.tsh.edu.in/#/erp/the_scholars_home_registration_form_majra",
    features: [
      {
        title: "Digital Learning",
        description: "Integration of technology in education"
      },
      {
        title: "Cultural Heritage",
        description: "Strong focus on traditional values and culture"
      },
      {
        title: "Sports Excellence",
        description: "Comprehensive sports and fitness programs"
      }
    ],
    stats: [
      { label: "Students", value: "1500+" },
      { label: "Faculty", value: "100+" },
      { label: "Acres Campus", value: "15" },
      { label: "Success Rate", value: "99%" }
    ],
    facilities: [
      {
        title: "Digital Library",
        description: "Modern library with digital resources",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1970&q=80"
      },
      {
        title: "Performing Arts Center",
        description: "State-of-the-art auditorium and practice rooms",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      },
      {
        title: "Sports Academy",
        description: "Professional training facilities for various sports",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      }
    ],
    achievements: []
  }
};