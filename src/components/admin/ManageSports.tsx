'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash, ArrowLeft, Trophy } from 'lucide-react';
import SportEditModal from './SportEditModal';
import Container from '../ui/Container';
import { motion } from 'framer-motion';
import ScrollReveal from '../animations/ScrollReveal';
import TextReveal from '../animations/TextReveal';
import { useAuth } from '../../contexts/AuthContext';
import { ALUMNI_ROUTES } from '../../config/routes';

interface SportImages {
  main_image?: string;
  gallery_images?: string[];
  training_images?: string[];
  facility_images?: string[];
}

interface SportFacility {
  name: string;
  image: string;
  features: string[];
}

interface Schedule {
  type: 'Weekday' | 'Weekend' | 'Summer' | 'Winter';
  timings: string[];
  notes?: string;
}

interface SportData {
  id: string;
  name: string;
  category: string;
  levels: string[];
  schedules: Schedule[];  // Replace the single schedule string with an array of Schedule objects
  coach: string;
  achievements: string;
  image: string;
  description: string;
  facilities: SportFacility[];
  training_schedule: Record<string, string[]>;
  images?: SportImages;
}

export default function ManageSports() {
  const [sports, setSports] = useState<SportData[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { user, userRole, sessionState } = useAuth();
  const router = useRouter();

  // Check auth status and redirect if necessary
  useEffect(() => {
    if (sessionState === 'invalid' || !user) {
      router.push(ALUMNI_ROUTES.LOGIN);
      return;
    }
    
    if (userRole !== 'admin') {
      router.push('/admin/dashboard');
      return;
    }
  }, [user, userRole, sessionState, router]);

  useEffect(() => {
    if (userRole === 'admin' && sessionState === 'valid') {
      fetchSports();
    }
  }, [userRole, sessionState]);

  const fetchSports = async () => {
    try {
      setLoading(true);
      setError('');
      
      const { data, error: fetchError } = await supabase
        .from('sports_programs')
        .select('*')
        .order('name', { ascending: true });
    
      if (fetchError) {
        throw new Error(fetchError.message);
      }
    
      setSports(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch sports programs';
      setError(errorMessage);
      console.error('Error fetching sports:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (sportData: Partial<SportData>) => {
    try {
      setError('');
      
      if (userRole !== 'admin' || !user) {
        throw new Error('Permission denied: Admin access required');
      }

      const { id, ...restData } = sportData;
      
      const sportPayload = {
        ...(id ? { id } : {}),
        ...restData,
        updated_at: new Date().toISOString(),
        updated_by: user.id // Track who made the change
      };

      const { error: saveError } = await supabase
        .from('sports_programs')
        .upsert(sportPayload);

      if (saveError) {
        throw new Error(saveError.message);
      }

      await fetchSports();
      setIsEditing(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save sport program';
      setError(errorMessage);
      console.error('Error saving sport:', err);
      throw err; // Propagate error to modal
    }
  };

  const handleDelete = async (sportId: string) => {
    try {
      setError('');
      
      if (userRole !== 'admin' || !user) {
        throw new Error('Permission denied: Admin access required');
      }

      const { error: deleteError } = await supabase
        .from('sports_programs')
        .delete()
        .eq('id', sportId);

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      await fetchSports();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete sport program';
      setError(errorMessage);
      console.error('Error deleting sport:', err);
    }
  };

  // Show loading state while checking auth
  if (loading || sessionState === 'unknown') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green"></div>
      </div>
    );
  }

  // Don't render anything if not admin
  if (userRole !== 'admin') {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-neutral-light pb-24">
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

      <Container>
        <div className="relative">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="flex items-center justify-between gap-4 mb-8">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2 text-green hover:text-green-dark transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back to Dashboard
                </Link>
              </div>

              <div className="flex flex-col items-center gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full"
                >
                  <Trophy className="h-4 w-4" />
                  <span className="font-semibold">Sports Management</span>
                </motion.div>
              </div>
              
              <TextReveal>
                <h1 className="font-display text-4xl md:text-5xl text-neutral-dark mb-4">
                  Manage <span className="text-green">Sports Programs</span>
                </h1>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-neutral-dark/70 text-lg max-w-2xl mx-auto">
                  Add and manage sports programs, schedules, and achievements
                </p>
              </TextReveal>
            </div>
          </ScrollReveal>

          {/* Add Sport Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setIsEditing('new')}
              className="btn btn-primary flex items-center gap-2 px-6 py-2.5 bg-green hover:bg-green-dark text-white rounded-xl transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Sport
            </button>
          </div>

          {/* Add error message display */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {/* Add loading state */}
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {sports.map(sport => (
                <motion.div
                  key={sport.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-2xl shadow-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-display text-neutral-dark">{sport.name}</h3>
                      <p className="text-neutral-dark/70">{sport.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditing(sport.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(sport.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Container>

      {/* Edit Modal */}
      {isEditing && (
        <SportEditModal
          sportId={isEditing}
          onSave={handleSave}
          onClose={() => setIsEditing(null)}
        />
      )}
    </div>
  );
}
