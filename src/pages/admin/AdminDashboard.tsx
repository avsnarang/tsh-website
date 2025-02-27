import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../components/ui/Container';
import { Image, MessageSquare, LogOut, FileText, Calendar, Users, Settings, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Title from '../../components/utils/Title';
import Button from '../../components/ui/Button';

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="pt-32 pb-24">
      <Title title="Admin Portal" description="School Management Portal" />
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header with Logout */}
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-12">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl text-neutral-dark">Admin Portal</h1>
                <p className="text-neutral-dark/60 mt-2">Manage school content and events</p>
              </div>
              <Button
                onClick={handleSignOut}
                variant="delete"
                className="flex items-center gap-2"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Content Management */}
            <div className="col-span-full">
              <h2 className="text-2xl text-neutral-dark mb-6 flex items-center gap-2">
                <Settings className="h-6 w-6 text-primary" />
                Content Management
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                  to="/admin/testimonials"
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <MessageSquare className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl text-neutral-dark mb-2">Testimonials</h3>
                  <p className="text-neutral-dark/80">
                    Manage alumni testimonials and success stories
                  </p>
                </Link>

                <Link
                  to="/admin/gallery"
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <Image className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl text-neutral-dark mb-2">Gallery</h3>
                  <p className="text-neutral-dark/80">
                    Manage photo gallery and event albums
                  </p>
                </Link>

                <Link
                  to="/admin/messages"
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <FileText className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl text-neutral-dark mb-2">Messages</h3>
                  <p className="text-neutral-dark/80">
                    Update leadership messages and announcements
                  </p>
                </Link>
              </div>
            </div>

            {/* Event Management */}
            <div className="col-span-full mt-8">
              <h2 className="text-2xl text-neutral-dark mb-6 flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                Event Management
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                  to="/admin/events"
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <Calendar className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl text-neutral-dark mb-2">Events</h3>
                  <p className="text-neutral-dark/80">
                    Create and manage school events and invitations
                  </p>
                </Link>

                <Link
                  to="/admin/updates"
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <Bell className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl text-neutral-dark mb-2">Latest Updates</h3>
                  <p className="text-neutral-dark/80">
                    Manage the latest updates ticker on homepage
                  </p>
                </Link>

                <Link
                  to="/admin/students"
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl text-neutral-dark mb-2">Student Data</h3>
                  <p className="text-neutral-dark/80">
                    Upload and manage student admission records
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}