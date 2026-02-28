import { SchoolInfo } from '../types/school';

export const schoolInfo: SchoolInfo = {
  name: "The Scholars' Home",
  tagline: "Nurturing Excellence, Building Character",
  description: "A legacy of academic excellence and holistic development across multiple campuses in India.",
  branches: [
    {
      name: "The Scholars' Home",
      location: "Paonta Sahib",
      description: "Our flagship campus offering comprehensive education from primary to senior secondary levels with state-of-the-art facilities.",
      imageUrl: "https://images.tsh.edu.in/campus/paonta-sahib.jpg",
      domain: "ps.tsh.edu.in",
      features: [
        "CBSE Affiliated",
        "Advanced Science Labs",
        "Sports Complex",
        "Digital Library"
      ]
    },
    {
      name: "The Scholars' Home",
      location: "Juniors",
      description: "Specialized campus focused on early childhood education and primary schooling with a nurturing environment.",
      imageUrl: "https://images.tsh.edu.in/campus/juniors.jpg",
      domain: "jun.tsh.edu.in",
      features: [
        "Play-based Learning",
        "Modern Montessori",
        "Child-safe Campus",
        "Activity Rooms"
      ]
    },
    {
      name: "The Scholars' Home",
      location: "Majra",
      description: "A perfect blend of traditional values and modern education methodologies for comprehensive student development.",
      imageUrl: "https://images.tsh.edu.in/campus/majra.jpg",
      domain: "majra.tsh.edu.in",
      features: [
        "Smart Classrooms",
        "Performing Arts Center",
        "Sports Academy",
        "Digital Library"
      ]
    }
  ]
};
