export interface SportFacility {
  id: string;
  name: string;
  description: string;
  features: string[];
  imageUrl: string;
}

export interface SportTeam {
  id: string;
  name: string;
  imageUrl: string;
  achievements: string[];
  coach: string;
  practiceSchedule: string;
}

export interface Sport {
  id: string;
  name: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  ageGroup: string;
  facilities: SportFacility[];
  teams: SportTeam[];
  achievements: string[];
}