export interface Branch {
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  features: string[];
  domain: string;
}

export interface SchoolInfo {
  name: string;
  tagline: string;
  description: string;
  branches: Branch[];
}