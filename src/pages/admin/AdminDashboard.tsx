import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import {
  MessageSquare,
  Calendar,
  Image,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/', { replace: true });
      return;
    }

    const checkAccess = async () => {
      try {
        const { data, error } = await supabase
          .from('auth_user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error || data?.role !== 'admin' || !data) { // Check if data is null or undefined
          navigate('/admin/login', { replace: true });
        }
      } catch (err) {
        console.error('Error checking access:', err);
        navigate('/admin/login', { replace: true });
      }
    };

    checkAccess();
  }, [user, navigate]);

  const handleSignOut = async () => {
    console.log('Sign out button clicked');
    try {
      // Force clear localStorage first for good measure
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('supabase.auth.')) {
          localStorage.removeItem(key);
        }
      });
      
      // Then attempt the normal sign out
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('Successfully signed out');
      
      // Force a hard redirect instead of using navigate
      window.location.href = '/';
    } catch (error: any) {
      console.error('Sign out error:', error);
      alert('Failed to sign out. Please try again or refresh the page.');
    }
  };

  const menuItems = [
    {
      title: 'Manage Messages',
      description: 'Update leadership messages',
      icon: MessageSquare,
      path: '/admin/messages'
    },
    {
      title: 'Manage Events',
      description: 'Create and manage events',
      icon: Calendar,
      path: '/admin/events'
    },
    {
      title: 'Gallery',
      description: 'Manage photo gallery',
      icon: Image,
      path: '/admin/gallery'
    },
    {
      title: 'Updates',
      description: 'Manage latest updates',
      icon: Bell,
      path: '/admin/updates'
    }
  ];

  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl text-neutral-dark">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <Link to="/admin/settings">
                <Button variant="outline" className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Settings
                </Button>
              </Link>
              <Button 
                onClick={handleSignOut} 
                variant="redOutline" 
                className="flex items-center gap-2"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.map((item, index) => (
              <Link 
                key={index}
                to={item.path}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl text-neutral-dark font-semibold">{item.title}</h2>
                    <p className="text-neutral-dark/60">{item.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
