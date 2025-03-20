import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { 
  Settings, 
  LogOut, 
  Calendar, 
  Image, 
  Bell, 
  School,
  UserPlus,
  BookOpen,
  Trophy
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminDashboard() {
  const { signOut } = useAuth();

  const menuItems = [
    {
      title: 'Events',
      description: 'Manage upcoming events and RSVPs',
      icon: Calendar,
      path: '/admin/events',
      color: 'from-green-light to-green'
    },
    {
      title: 'Gallery',
      description: 'Manage photo galleries',
      icon: Image,
      path: '/admin/gallery',
      color: 'from-orange-light to-orange'
    },
    {
      title: 'Updates',
      description: 'Manage latest updates',
      icon: Bell,
      path: '/admin/updates',
      color: 'from-blue-light to-blue'
    },
    {
      title: 'Alumni',
      description: 'Manage alumni profiles',
      icon: UserPlus,
      path: '/admin/alumni',
      color: 'from-purple-light to-purple'
    },
    {
      title: 'Students',
      description: 'Manage student records',
      icon: BookOpen,
      path: '/admin/students',
      color: 'from-yellow-light to-yellow'
    },
    {
      title: 'Teachers',
      description: 'Manage teacher records',
      icon: School,
      path: '/admin/teachers',
      color: 'from-indigo-light to-indigo'
    },
    {
      title: 'Calendar',
      description: 'Manage school calendar and events',
      icon: Calendar,
      path: '/admin/calendar',
      color: 'from-red-light to-red'
    },
    {
      title: 'Sports',
      description: 'Manage Sports Programs',
      icon: Trophy,
      path: '/admin/sports',
      color: 'from-green-light to-green'
    }
  ];

  return (
    <div className="relative min-h-screen bg-neutral-light">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-light/30" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-light/30" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      <div className="relative pt-32 pb-24">
        <Container>
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="flex-1 text-center mb-16"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Section Tag */}
              <motion.div
                className="inline-flex items-center px-4 py-3 rounded-full bg-green-light/20 text-green mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-sm font-semibold">ADMIN PANEL</span>
              </motion.div>

              <h1 className="font-display text-5xl lg:text-7xl text-neutral-dark mb-6">
                Welcome to the <span className="text-green">Dashboard</span>
              </h1>
            </motion.div>

            <div className="flex justify-end items-center gap-4 mb-12">
              <Link to="/admin/settings">
                <Button variant="outline" className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Settings
                </Button>
              </Link>
              <Button 
                onClick={signOut} 
                variant="redOutline" 
                className="flex items-center gap-2"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={item.path}
                    className="group block relative"
                  >
                    <div 
                      className="absolute -inset-0.5 bg-gradient-to-br opacity-0 group-hover:opacity-100 blur transition duration-500 rounded-2xl"
                      style={{ background: `linear-gradient(to bottom right, ${item.color.replace('from-', '').replace('to-', '')})` }}
                    />
                    <div className="relative bg-white p-8 rounded-2xl shadow-lg">
                      <div className="flex items-start gap-6">
                        {/* Fix the gradient background for the icon */}
                        <div 
                          className={`p-4 rounded-xl flex items-center justify-center`}
                          style={{ 
                            background: item.color === 'from-green-light to-green' ? 'linear-gradient(to bottom right, #A6D4B4, #00501B)' :
                                          item.color === 'from-orange-light to-orange' ? 'linear-gradient(to bottom right, #E1CEB9, #A65A20)' :
                                          item.color === 'from-blue-light to-blue' ? 'linear-gradient(to bottom right, #BFE6FF, #0284C7)' :
                                          item.color === 'from-purple-light to-purple' ? 'linear-gradient(to bottom right, #E9D5FF, #7E22CE)' :
                                          item.color === 'from-yellow-light to-yellow' ? 'linear-gradient(to bottom right, #FEF3C7, #D97706)' :
                                          item.color === 'from-indigo-light to-indigo' ? 'linear-gradient(to bottom right, #C7D2FE, #4F46E5)' :
                                          item.color === 'from-red-light to-red' ? 'linear-gradient(to bottom right, #FECACA, #DC2626)' :
                                          'linear-gradient(to bottom right, #A6D4B4, #00501B)'
                          }}
                        >
                          <item.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-display text-neutral-dark mb-2">
                            {item.title}
                          </h2>
                          <p className="text-neutral-dark/60">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
