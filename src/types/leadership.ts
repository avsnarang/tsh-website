export interface LeadershipMessage {
  id: string;
  name: string;
  role: string;
  photo_url: string | null;
  preview: string;
  fullMessage: string;
  display_locations: string[];
}
