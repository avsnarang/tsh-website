export interface LeadershipMessage {
  id: string;
  name: string;
  role: string;
  preview: string;
  full_message: string;
  fullMessage?: string; // For client-side formatting
  photo_url?: string;
  order: number;
  display_locations: string[];
} 