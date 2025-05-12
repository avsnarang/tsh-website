import { useState, useEffect } from 'react';
import { X, Trash, Plus, Globe, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const GAME_CATEGORIES = [
  'Individual Sports',
  'Team Sports',
  'Racquet Sports',
  'Combat Sports',
  'Athletics',
  'Indoor Sports',
  'Outdoor Sports',
  'Aquatics'
] as const;

interface Schedule {
  type: 'Weekday' | 'Weekend' | 'Summer' | 'Winter';
  timings: string[];
}

interface SportImages {
  main_image: string;
  gallery_images: string[];
}

interface SportData {
  id?: string;
  name: string;
  category: string;
  coach: string;
  achievements: string;
  description: string;
  age_groups: string[];
  schedules: Schedule[];
  images: SportImages;
  updated_by?: string;
  updated_at?: string;
  is_published: boolean;
}

interface SportEditModalProps {
  sportId: string;
  onSave: (sportData: Partial<SportData>) => Promise<void>;
  onClose: () => void;
  initialData?: SportData;
}

export default function SportEditModal({ 
  sportId, 
  onSave, 
  onClose 
}: SportEditModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { user, userRole } = useAuth();
  const [formData, setFormData] = useState<Partial<SportData>>({
    name: '',
    category: '',
    coach: '',
    achievements: '',
    description: '',
    age_groups: [],
    schedules: [],
    images: {
      main_image: '',
      gallery_images: []
    },
    is_published: true
  });

  useEffect(() => {
    // Disable scroll on mount
    document.body.style.overflow = 'hidden';
    
    // Re-enable scroll on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    if (sportId !== 'new') {
      fetchSportData();
    }
  }, [sportId]);

  const fetchSportData = async () => {
    try {
      if (userRole !== 'admin') {
        throw new Error('Permission denied: Admin access required');
      }

      setIsLoading(true);
      setError('');

      const { data, error: fetchError } = await supabase
        .from('sports_programs')
        .select('*')
        .eq('id', sportId)
        .single();

      if (fetchError) throw fetchError;

      if (data) {
        setFormData({
          id: data.id,
          name: data.name || '',
          category: data.category || '',
          coach: data.coach || '',
          achievements: data.achievements || '',
          description: data.description || '',
          age_groups: data.age_groups || [],
          schedules: data.schedules || [],
          images: data.images || {
            main_image: '',
            gallery_images: []
          },
          is_published: data.is_published ?? true
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching sport data';
      setError(errorMessage);
      console.error('Error fetching sport data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (userRole !== 'admin' || !user) {
        throw new Error('Permission denied: Admin access required');
      }

      setError('');
      
      const cleanedAgeGroups = formData.age_groups
        ?.filter(group => group !== '')
        ?.map(group => group.trim())
        || [];

      const dataToSave: Partial<SportData> = {
        id: sportId !== 'new' ? sportId : undefined,
        name: formData.name?.trim(),
        category: formData.category?.trim(),
        coach: formData.coach?.trim(),
        achievements: formData.achievements?.trim(),
        description: formData.description?.trim(),
        age_groups: cleanedAgeGroups,
        schedules: formData.schedules || [],
        images: {
          main_image: formData.images?.main_image?.trim() || '',
          gallery_images: formData.images?.gallery_images?.filter(url => url.trim()) || []
        },
        updated_by: user.id,
        updated_at: new Date().toISOString(),
        is_published: formData.is_published
      };

      await onSave(dataToSave);
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error saving sport';
      setError(errorMessage);
      console.error('Error saving sport:', err);
    }
  };

  const handleAddSchedule = () => {
    setFormData(prev => ({
      ...prev,
      schedules: [...(prev.schedules || []), {
        type: 'Weekday',
        timings: ['']
      }]
    }));
  };

  const handleRemoveSchedule = (index: number) => {
    setFormData(prev => ({
      ...prev,
      schedules: (prev.schedules || []).filter((_, i) => i !== index)
    }));
  };

  const handleScheduleChange = (index: number, field: keyof Schedule, value: any) => {
    setFormData(prev => {
      const newSchedules = [...(prev.schedules || [])];
      newSchedules[index] = { ...newSchedules[index], [field]: value };
      return { ...prev, schedules: newSchedules };
    });
  };

  const handleAddTiming = (scheduleIndex: number) => {
    setFormData(prev => {
      const newSchedules = [...(prev.schedules || [])];
      newSchedules[scheduleIndex].timings.push('');
      return { ...prev, schedules: newSchedules };
    });
  };

  const handleRemoveTiming = (scheduleIndex: number, timingIndex: number) => {
    setFormData(prev => {
      const newSchedules = [...(prev.schedules || [])];
      newSchedules[scheduleIndex].timings = newSchedules[scheduleIndex].timings.filter((_, i) => i !== timingIndex);
      return { ...prev, schedules: newSchedules };
    });
  };

  const handleMainImageChange = (value: string) => {
    setFormData({
      ...formData,
      images: {
        main_image: value,
        gallery_images: formData.images?.gallery_images || []
      }
    });
  };

  const handleGalleryImagesChange = (value: string) => {
    setFormData({
      ...formData,
      images: {
        main_image: formData.images?.main_image || '',
        gallery_images: value.split('\n').filter(url => url.trim())
      }
    });
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-neutral-dark/50 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl w-[95vw] h-[90vh] max-h-[90vh] flex flex-col relative"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-display text-neutral-dark">
                  {sportId === 'new' ? 'Add New Sport' : 'Edit Sport'}
                </h2>
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={formData.is_published}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        is_published: e.target.checked
                      }))}
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green"></div>
                  </label>
                  <span className="text-sm text-neutral-dark/60">
                    {formData.is_published ? (
                      <span className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        Published
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <EyeOff className="w-4 h-4" />
                        Draft
                      </span>
                    )}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green"></div>
                </div>
              ) : (
                <div className="max-w-5xl mx-auto space-y-8">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Basic Information</h3>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                          type="text"
                          value={formData.name || ''}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select
                          value={formData.category || ''}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg"
                          required
                        >
                          <option value="">Select Category</option>
                          {GAME_CATEGORIES.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Coach</label>
                        <input
                          type="text"
                          value={formData.coach || ''}
                          onChange={(e) => setFormData({ ...formData, coach: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Age Groups</label>
                        <textarea
                          value={formData.age_groups?.join('\n') || ''}
                          onChange={(e) => {
                            const newAgeGroups = e.target.value
                              .split('\n')
                              .map(group => group.replace(/\r/g, '')) // Remove carriage returns
                              .filter(group => group !== ''); // Only remove completely empty lines
                          
                            setFormData({
                              ...formData,
                              age_groups: newAgeGroups
                            });
                          }}
                          placeholder="Enter each age group on a new line"
                          className="w-full px-3 py-2 border rounded-lg h-32 resize-none"
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Details & Media</h3>

                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                          value={formData.description || ''}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg h-32"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Achievements</label>
                        <textarea
                          value={formData.achievements || ''}
                          onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg h-32"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Main Image URL</label>
                        <input
                          type="url"
                          value={formData.images?.main_image || ''}
                          onChange={(e) => handleMainImageChange(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Gallery Images</label>
                        <textarea
                          value={formData.images?.gallery_images?.join('\n') || ''}
                          onChange={(e) => handleGalleryImagesChange(e.target.value)}
                          placeholder="Enter each image URL on a new line"
                          className="w-full px-3 py-2 border rounded-lg h-32"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Schedules Section - Full Width */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Training Schedules</h3>
                      <button
                        type="button"
                        onClick={handleAddSchedule}
                        className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green rounded-lg"
                      >
                        <Plus className="h-4 w-4" />
                        Add Schedule
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {formData.schedules?.map((schedule, scheduleIndex) => (
                        <div key={scheduleIndex} className="border rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <select
                              value={schedule.type}
                              onChange={(e) => handleScheduleChange(
                                scheduleIndex,
                                'type',
                                e.target.value as Schedule['type']
                              )}
                              className="px-3 py-2 border rounded-lg"
                            >
                              <option value="Weekday">Weekday</option>
                              <option value="Weekend">Weekend</option>
                              <option value="Summer">Summer</option>
                              <option value="Winter">Winter</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => handleRemoveSchedule(scheduleIndex)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </div>

                          {schedule.timings.map((timing, timingIndex) => (
                            <div key={timingIndex} className="flex gap-2">
                              <input
                                type="text"
                                value={timing}
                                onChange={(e) => {
                                  const newSchedules = [...(formData.schedules || [])];
                                  newSchedules[scheduleIndex].timings[timingIndex] = e.target.value;
                                  setFormData({ ...formData, schedules: newSchedules });
                                }}
                                placeholder="e.g., 4:00 PM - 6:00 PM"
                                className="flex-1 px-3 py-2 border rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveTiming(scheduleIndex, timingIndex)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() => handleAddTiming(scheduleIndex)}
                            className="text-sm text-green hover:underline"
                          >
                            + Add Timing
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-200 p-6 flex items-center justify-end gap-3 bg-neutral-50">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-neutral-dark hover:bg-neutral-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-6 py-2 bg-green hover:bg-green-dark disabled:bg-neutral-300 text-white rounded-xl transition-colors flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
