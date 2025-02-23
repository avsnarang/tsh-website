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
      imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2066&q=80",
      domain: "ps.tsh.edu.in",
      features: [
        "CBSE Affiliated",
        "Advanced Science Labs",
        "Sports Complex",
        "Residential Facilities"
      ]
    },
    {
      name: "The Scholars' Home",
      location: "Juniors",
      description: "Specialized campus focused on early childhood education and primary schooling with a nurturing environment.",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2022&q=80",
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
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1970&q=80",
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