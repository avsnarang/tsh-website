export interface CampusInfo {
  name: string;
  tagline: string;
  description: string;
  registrationUrl: string;
  features: {
    title: string;
    description: string;
  }[];
  stats: {
    label: string;
    value: string;
  }[];
  facilities: {
    title: string;
    description: string;
    image: string;
  }[];
  achievements: {
    title: string;
    description: string;
    year: string;
  }[];
}
