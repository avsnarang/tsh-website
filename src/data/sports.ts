import type { Sport } from '../types/sports';

export const sports: Sport[] = [
  {
    id: 'cricket',
    name: 'Cricket',
    description: 'Professional cricket training with BCCI-certified coaches and world-class facilities.',
    level: 'All Levels',
    ageGroup: '8-18 years',
    facilities: [
      {
        id: 'cricket-ground',
        name: 'Main Cricket Ground',
        description: 'BCCI-standard cricket ground with professional facilities',
        features: ['International size ground', 'Professional cricket pitch', 'Practice nets', 'Bowling machines'],
        imageUrl: '/images/facilities/cricket-ground.jpg'
      }
    ],
    teams: [
      {
        id: 'senior-cricket',
        name: 'Senior Cricket Team',
        imageUrl: '/images/teams/cricket-senior.jpg',
        achievements: ['State Champions 2023', 'Regional Winners 2022'],
        coach: 'Mr. Rahul Sharma',
        practiceSchedule: 'Mon-Fri, 4:00 PM - 6:00 PM'
      }
    ],
    achievements: [
      'State Champions 2023',
      'Regional Winners 2022',
      'Best School Team Award 2021'
    ]
  },
  {
    id: 'football',
    name: 'Football',
    description: 'Comprehensive football program with FIFA-standard facilities and professional coaching.',
    level: 'All Levels',
    ageGroup: '6-18 years',
    facilities: [
      {
        id: 'football-ground',
        name: 'Football Stadium',
        description: 'FIFA-standard football field with modern amenities',
        features: ['Full-size pitch', 'Floodlights', 'Synthetic turf', 'Training areas'],
        imageUrl: '/images/facilities/football-ground.jpg'
      }
    ],
    teams: [
      {
        id: 'senior-football',
        name: 'Senior Football Team',
        imageUrl: '/images/teams/football-senior.jpg',
        achievements: ['District Champions 2023', 'State Runner-up 2022'],
        coach: 'Mr. Alex Rodriguez',
        practiceSchedule: 'Tue-Sat, 4:00 PM - 6:00 PM'
      }
    ],
    achievements: [
      'District Champions 2023',
      'State Runner-up 2022'
    ]
  },
  // Add more sports as needed
];

export const sportStats = [
  { id: 1, title: 'National Champions', value: '25+' },
  { id: 2, title: 'Sports Disciplines', value: '15+' },
  { id: 3, title: 'Professional Coaches', value: '20+' },
  { id: 4, title: 'Annual Tournaments', value: '10+' }
];
