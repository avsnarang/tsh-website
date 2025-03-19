import { useParams, Navigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Check, User, Clock } from 'lucide-react';
import Container from '../../components/ui/Container';
import InterestForm from '../../components/sports/InterestForm';

interface Facility {
  name: string;
  image: string;
  features: string[];
}

interface Achievement {
  year: string;
  title: string;
}

interface Sport {
  id: string;
  name: string;
  levels: string[];
  schedule: string;
  coach: string;
  achievements: string;
  image: string;
  description: string;
  facilities: Facility[];
  trainingSchedule: {
    [key: string]: string[];
  };
  achievementList: Achievement[];
}

interface SportCategory {
  category: string;
  sports: Sport[];
}

const sportsData: SportCategory[] = [
  {
    category: "Team Sports",
    sports: [
      {
        id: "basketball",
        name: "Basketball",
        levels: ["Junior", "Senior"],
        schedule: "Mon, Wed, Fri",
        coach: "Coach Sarah Williams",
        achievements: "State Champions 2023",
        image: "/images/sports/basketball-court.jpg",
        description: "Professional basketball training program with state-of-the-art indoor courts.",
        facilities: [
          {
            name: "Indoor Court",
            image: "/images/sports/basketball/indoor-court.jpg",
            features: ["FIBA standard dimensions", "Professional flooring", "Digital scoreboard"]
          },
        ],
        trainingSchedule: {
          junior: ["Monday: 3:00 PM - 4:30 PM", "Wednesday: 3:00 PM - 4:30 PM"],
          senior: ["Monday: 4:30 PM - 6:00 PM", "Wednesday: 4:30 PM - 6:00 PM"]
        },
        achievementList: [
          { year: "2023", title: "State Champions" },
          { year: "2022", title: "District Champions" }
        ]
      },
      // ... rest of the sports data
    ]
  },
  // ... rest of the categories
];

export default function SportDetail() {
  const { id } = useParams<{ id: string }>();
  const [showInterestForm, setShowInterestForm] = useState(false);

  const sport = useMemo(() => {
    return sportsData
      .flatMap(category => category.sports)
      .find(sport => sport.id === id);
  }, [id]);

  if (!sport) {
    return <Navigate to="/co-curricular/sports-athletics" replace />;
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-neutral-light">
      <Container>
        {/* Hero Section */}
        <div className="relative h-[400px] rounded-2xl overflow-hidden mb-12">
          <img
            src={sport.image}
            alt={sport.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h1 className="text-4xl md:text-5xl text-white font-display mb-4">
              {sport.name}
            </h1>
            <div className="flex gap-3">
              {sport.levels.map((level: string) => (
                <span key={level} className="px-3 py-1 bg-green/90 text-white rounded-full">
                  {level}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-xl p-8">
              <h2 className="text-2xl font-display text-neutral-dark mb-4">About the Program</h2>
              <p className="text-neutral-dark/70">{sport.description}</p>
            </div>

            {/* Facilities Section */}
            <div className="bg-white rounded-xl p-8">
              <h2 className="text-2xl font-display text-neutral-dark mb-6">Facilities</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {sport.facilities.map((facility: Facility) => (
                  <div key={facility.name} className="space-y-4">
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <h3 className="font-display text-lg text-neutral-dark">{facility.name}</h3>
                    <ul className="space-y-2">
                      {facility.features.map((feature: string) => (
                        <li key={feature} className="flex items-center gap-2 text-neutral-dark/70">
                          <Check className="w-4 h-4 text-green" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Coach Info */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-display text-lg text-neutral-dark mb-4">Coach</h3>
              <div className="flex items-center gap-4">
                <User className="w-12 h-12 text-green" />
                <div>
                  <div className="font-medium text-neutral-dark">{sport.coach}</div>
                  <div className="text-sm text-neutral-dark/70">Head Coach</div>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-display text-lg text-neutral-dark mb-4">Training Schedule</h3>
              {Object.entries(sport.trainingSchedule).map(([level, times]) => (
                <div key={level} className="mb-4">
                  <h4 className="font-medium text-neutral-dark mb-2 capitalize">{level}</h4>
                  <ul className="space-y-2">
                    {times.map((time: string) => (
                      <li key={time} className="flex items-center gap-2 text-sm text-neutral-dark/70">
                        <Clock className="w-4 h-4 text-green" />
                        <span>{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-display text-lg text-neutral-dark mb-4">Achievements</h3>
              <div className="space-y-3">
                {sport.achievementList.map((achievement: Achievement) => (
                  <div key={achievement.year} className="flex items-center gap-3">
                    <div className="w-16 text-sm font-medium text-green">{achievement.year}</div>
                    <div className="text-sm text-neutral-dark">{achievement.title}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6">
              <button
                onClick={() => setShowInterestForm(true)}
                className="w-full bg-green text-white py-3 px-6 rounded-lg font-medium hover:bg-green-dark transition-colors"
              >
                Show Interest
              </button>
            </div>
          </div>
        </div>
      </Container>
      {showInterestForm && (
        <InterestForm
          sportId={sport.id}
          sportName={sport.name}
          onClose={() => setShowInterestForm(false)}
        />
      )}
    </div>
  );
}

