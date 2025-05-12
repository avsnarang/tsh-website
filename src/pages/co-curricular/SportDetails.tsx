import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Container from '../../components/ui/Container';
import { Trophy, Medal, Clock, User, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSEO } from '../../lib/seo';
import BreadcrumbNav from '../../components/navigation/BreadcrumbNav';
import { toast } from 'react-hot-toast';

interface Sport {
  id: string;
  name: string;
  category: string;
  coach: string;
  achievements: string;
  description: string;
  age_groups: string[];
  schedules: Array<{
    type: string;
    timings: string[];
  }>;
  images: {
    main_image: string;
    gallery_images: string[];
  };
}

interface SportRegistration {
  sport_id: string;
  admission_number: string;
  medical_conditions: string;
  preferred_schedule: string;
  student_id?: string; // Added this field
}

interface Student {
  id: string;
  auth_user_id: string;
  full_name: string;
  admission_number: string;
}

interface RegistrationModalProps {
  sport: Sport | null;
  onClose: () => void;
  onSubmit: (data: SportRegistration) => Promise<void>;
}

export default function SportDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sport, setSport] = useState<Sport | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  useEffect(() => {
    fetchSportDetails();
  }, [id]);

  useEffect(() => {
    // Update breadcrumb label when sport data is loaded
    if (sport?.name) {
      BreadcrumbNav.setDynamicLabel(sport.name);
    }
    return () => {
      // Reset the label when component unmounts
      BreadcrumbNav.setDynamicLabel('');
    };
  }, [sport?.name]);

  const fetchSportDetails = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('sports_programs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setSport(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch sport details');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    setShowRegistrationModal(true);
  };

  const handleRegistrationSubmit = async (data: SportRegistration) => {
    try {
      if (!id) {
        throw new Error('Sport ID is missing');
      }

      // Check if student has already registered for this sport
      const { data: existingReg, error: checkError } = await supabase
        .from('sports_registrations')
        .select('id')
        .eq('admission_number', data.admission_number.trim())
        .eq('sport_id', id)
        .maybeSingle(); // Use maybeSingle() instead of single()

      if (checkError) {
        console.error('Registration check error:', checkError);
        throw new Error('Failed to check existing registration');
      }

      if (existingReg) {
        toast.error('You have already registered for this sport');
        return;
      }

      const { error: insertError } = await supabase
        .from('sports_registrations')
        .insert({
          admission_number: data.admission_number.trim(),
          sport_id: id,
          medical_conditions: data.medical_conditions?.trim() || 'None',
          preferred_schedule: data.preferred_schedule.trim(),
          status: 'pending'
        });

      if (insertError) {
        console.error('Insert error:', insertError);
        if (insertError.code === '23505') {
          throw new Error('You have already registered for this sport');
        }
        throw new Error('Failed to submit registration');
      }

      toast.success('Registration submitted successfully!');
      setShowRegistrationModal(false);
    } catch (err) {
      console.error('Registration error:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to submit registration');
      throw err;
    }
  };

  const nextImage = () => {
    if (sport) {
      const images = [sport.images.main_image, ...sport.images.gallery_images];
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (sport) {
      const images = [sport.images.main_image, ...sport.images.gallery_images];
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  useSEO({
    title: sport ? `${sport.name} | The Scholars' Home` : "Sports Program",
    description: sport?.description || "Sports program details",
    url: `https://tsh.edu.in/co-curricular/sports-athletics/${id}`
  });

  const renderSkeleton = () => (
    <Container className="py-40">
      <div className="space-y-8">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Image skeleton */}
        <div className="relative h-[500px] rounded-2xl overflow-hidden bg-gray-200 animate-pulse" />

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main content skeleton */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-6 rounded bg-gray-200 animate-pulse" />
                  <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-200 animate-pulse" />
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-gray-200 animate-pulse" />
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse ml-6" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        {renderSkeleton()}
      </div>
    );
  }

  if (error || !sport) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Sport not found'}</p>
          <button
            onClick={() => navigate('/co-curricular/sports-athletics')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sports
          </button>
        </div>
      </div>
    );
  }

  const allImages = [sport.images.main_image, ...sport.images.gallery_images];

  const RegistrationModal = ({ sport, onClose, onSubmit }: RegistrationModalProps) => {
    const [registrationData, setRegistrationData] = useState<SportRegistration>({
      sport_id: sport?.id || '',  // Initialize with the sport ID
      admission_number: '',
      medical_conditions: '',
      preferred_schedule: ''
    });
    const [verifying, setVerifying] = useState(false);
    const [verified, setVerified] = useState(false);
    const [studentName, setStudentName] = useState('');
    const [admissionError, setAdmissionError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const verifyAdmissionNumber = async (number: string) => {
      try {
        setVerifying(true);
        setAdmissionError('');
        setVerified(false);
        setStudentName('');

        if (!number.trim()) {
          setAdmissionError('Please enter an admission number');
          return;
        }

        const { data: student, error: studentError } = await supabase
          .from('students')
          .select('full_name')  // Remove auth_user_id from select
          .eq('admission_number', number.trim())
          .single();

        if (studentError) {
          if (studentError.code === 'PGRST116') {
            setAdmissionError('Invalid admission number');
            return;
          }
          throw studentError;
        }

        setStudentName(student.full_name);
        setVerified(true);
      } catch (error) {
        console.error('Error verifying admission number:', error);
        setAdmissionError('Failed to verify admission number');
      } finally {
        setVerifying(false);
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      try {
        if (!verified) {
          toast.error('Please verify your admission number first');
          return;
        }

        if (!registrationData.preferred_schedule) {
          toast.error('Please select a preferred schedule');
          return;
        }

        setIsSubmitting(true);
        await onSubmit({
          ...registrationData,
          sport_id: sport?.id || '', // Ensure sport_id is set
          medical_conditions: registrationData.medical_conditions || 'None' // Default value if empty
        });
      } catch (error) {
        console.error('Form submission error:', error);
        toast.error('Failed to submit registration');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-neutral-dark/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Register for {sport?.name}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Admission Number</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={registrationData.admission_number}
                  onChange={(e) => setRegistrationData(prev => ({
                    ...prev,
                    admission_number: e.target.value
                  }))}
                  className="flex-1 px-3 py-2 border rounded-lg"
                  placeholder="Enter your admission number"
                  disabled={verified}
                />
                <button
                  type="button"
                  onClick={() => verifyAdmissionNumber(registrationData.admission_number)}
                  disabled={verifying || verified || !registrationData.admission_number}
                  className="px-4 py-2 bg-green hover:bg-green-dark disabled:bg-neutral-300 text-white rounded-xl transition-colors"
                >
                  {verifying ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
                  ) : verified ? 'Verified' : 'Verify'}
                </button>
              </div>
              {admissionError && (
                <p className="text-red-500 text-sm mt-1">{admissionError}</p>
              )}
              {verified && studentName && (
                <p className="text-green-600 text-sm mt-1">Verified: {studentName}</p>
              )}
            </div>

            {verified && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Medical Conditions (if any)</label>
                  <textarea
                    value={registrationData.medical_conditions}
                    onChange={(e) => setRegistrationData(prev => ({
                      ...prev,
                      medical_conditions: e.target.value
                    }))}
                    className="w-full px-3 py-2 border rounded-lg h-20"
                    placeholder="List any medical conditions or allergies..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Preferred Schedule</label>
                  <select
                    required
                    value={registrationData.preferred_schedule}
                    onChange={(e) => setRegistrationData(prev => ({
                      ...prev,
                      preferred_schedule: e.target.value
                    }))}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="">Select Schedule</option>
                    {sport?.schedules.map((schedule) => (
                      <option key={schedule.type} value={schedule.type}>
                        {schedule.type}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-neutral-dark hover:bg-neutral-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !verified}
                className="px-6 py-2 bg-green hover:bg-green-dark disabled:bg-neutral-300 text-white rounded-xl transition-colors flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                    <span>Registering...</span>
                  </>
                ) : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Container className="py-48">
        <BreadcrumbNav />

        {/* Image Slideshow */}
        <div className="relative h-[500px] rounded-2xl overflow-hidden mb-8">
          <img
            src={allImages[currentImageIndex]}
            alt={sport.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Slideshow Controls */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
            <button
              onClick={prevImage}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
            {currentImageIndex + 1} / {allImages.length}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-green" />
                <h1 className="text-3xl font-bold">{sport.name}</h1>
              </div>
              <p className="text-gray-600 leading-relaxed mb-8">{sport.description}</p>
              
              <button
                onClick={handleRegister}
                className="w-full md:w-auto px-8 py-3 bg-green text-white rounded-xl font-semibold hover:bg-green-dark transition-colors"
              >
                Register Now
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-semibold text-xl mb-4">Program Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-green" />
                  <div>
                    <p className="text-sm text-gray-500">Coach</p>
                    <p className="font-medium">{sport.coach}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Medal className="w-5 h-5 text-green" />
                  <div>
                    <p className="text-sm text-gray-500">Achievements</p>
                    <p className="font-medium">{sport.achievements}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Age Groups</p>
                  <div className="flex flex-wrap gap-2">
                    {sport.age_groups.map((group, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-light/20 text-green rounded-full text-sm"
                      >
                        {group}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-semibold text-xl mb-4">Training Schedule</h2>
              <div className="space-y-4">
                {sport.schedules.map((schedule, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-green" />
                      <span className="font-medium">{schedule.type}</span>
                    </div>
                    <div className="space-y-1">
                      {schedule.timings.map((timing, idx) => (
                        <p key={idx} className="text-sm text-gray-600 pl-6">
                          {timing}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
      {showRegistrationModal && (
        <RegistrationModal
          sport={sport}
          onClose={() => setShowRegistrationModal(false)}
          onSubmit={handleRegistrationSubmit}
        />
      )}
    </div>
  );
}
