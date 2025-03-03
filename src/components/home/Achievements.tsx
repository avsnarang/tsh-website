import { motion } from 'framer-motion';
import { Award, Users, BookOpen, Trophy, LucideIcon } from 'lucide-react';

interface Achievement {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}

const achievements: Achievement[] = [
  {
    title: "Academic Excellence",
    value: "98%",
    description: "Board exam success rate",
    icon: BookOpen
  },
  {
    title: "Student Placement",
    value: "95%",
    description: "Higher education admission rate",
    icon: Users
  },
  {
    title: "Awards Won",
    value: "200+",
    description: "National & international accolades",
    icon: Trophy
  },
  {
    title: "Distinctions",
    value: "50+",
    description: "Subject distinctions per year",
    icon: Award
  }
];

export default function Achievements() {
  return (
    <section className="py-24 relative bg-white">
      {/* Gradient transition continuing from MissionVision */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-light/50 via-white to-white" />

      {/* Background decorative elements - continuing from MissionVision */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Green blur continuing from MissionVision's right side */}
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-green-light/40 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
        {/* Orange blur continuing from MissionVision's left side */}
        <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-orange-light/40 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/30 text-green rounded-full mb-4">
            <Trophy className="h-4 w-4" />
            <span className="font-medium">Our Success</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display text-neutral-dark mb-4">
            Outstanding <span className="text-green">Achievements</span>
          </h2>
          <p className="text-xl text-neutral-dark/70 max-w-2xl mx-auto">
            A track record of excellence in academics and beyond
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            
            return (
              <motion.div
                key={achievement.title}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-light/20 to-transparent rounded-2xl" />
                  <div className="absolute -top-2 -right-2 w-full h-full border-2 border-green rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                  
                  <div className="relative">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-light to-green rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-display text-green mb-2">{achievement.value}</h3>
                    <p className="text-xl font-display text-neutral-dark mb-2">{achievement.title}</p>
                    <p className="text-neutral-dark/70">{achievement.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
