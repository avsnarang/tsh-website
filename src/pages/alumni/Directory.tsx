import React, { useState, useEffect } from 'react';
import Container from '../../components/ui/Container';
import { supabase } from '../../lib/supabase';
import { Linkedin, Briefcase, MapPin, GraduationCap, User, X, Phone, Mail, Instagram, Facebook } from 'lucide-react';

interface AlumniProfile {
  id: string;
  full_name: string;
  batch_year: number;
  current_location: string;
  occupation: string;
  company: string;
  bio: string;
  linkedin_url: string;
  profile_picture_url?: string;
  phone?: string;
  email?: string;
  instagram_url?: string;
  facebook_url?: string;
  show_contact_info: boolean;
}

export default function Directory() {
  const [profiles, setProfiles] = useState<AlumniProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedProfile, setSelectedProfile] = useState<AlumniProfile | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data, error } = await supabase
          .from('alumni_profiles')
          .select('*')
          .eq('is_public', true)
          .order('batch_year', { ascending: false });

        if (error) throw error;
        setProfiles(data || []);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const years = [...new Set(profiles.map(p => p.batch_year))].sort((a, b) => b - a);

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.occupation?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear === 'all' || profile.batch_year === selectedYear;
    return matchesSearch && matchesYear;
  });

  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl text-neutral-dark mb-6">Alumni Directory</h1>
          <p className="text-xl text-primary">Connect with fellow alumni</p>
        </div>

        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Search by name, company, or occupation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedYear('all')}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedYear === 'all'
                  ? 'bg-primary text-neutral-light'
                  : 'bg-neutral-light text-primary hover:bg-primary/10'
              }`}
            >
              All Years
            </button>
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedYear === year
                    ? 'bg-primary text-neutral-light'
                    : 'bg-neutral-light text-primary hover:bg-primary/10'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProfiles.map(profile => (
              <div 
                key={profile.id} 
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProfile(profile)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    {profile.profile_picture_url ? (
                      <img
                        src={profile.profile_picture_url}
                        alt={profile.full_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl text-neutral-dark font-semibold">{profile.full_name}</h3>
                    <div className="flex items-center gap-2 text-primary">
                      <GraduationCap className="h-4 w-4" />
                      <span>Batch of {profile.batch_year}</span>
                    </div>
                  </div>
                </div>
                
                {profile.occupation && (
                  <div className="flex items-center gap-2 text-neutral-dark/80 mb-1">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span>{profile.occupation}</span>
                  </div>
                )}
                
                {profile.company && (
                  <div className="flex items-center gap-2 text-neutral-dark/80 mb-1">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span>{profile.company}</span>
                  </div>
                )}
                
                {profile.current_location && (
                  <div className="flex items-center gap-2 text-neutral-dark/80 mb-4">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{profile.current_location}</span>
                  </div>
                )}
                
                {profile.bio && (
                  <p className="text-neutral-dark/80 mb-4 line-clamp-3">{profile.bio}</p>
                )}

                {profile.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Linkedin className="h-5 w-5 mr-2" />
                    LinkedIn Profile
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Profile Modal */}
        {selectedProfile && (
          <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                      {selectedProfile.profile_picture_url ? (
                        <img
                          src={selectedProfile.profile_picture_url}
                          alt={selectedProfile.full_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <User className="h-12 w-12 text-primary" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl text-neutral-dark font-semibold mb-2">
                        {selectedProfile.full_name}
                      </h2>
                      <div className="flex items-center gap-2 text-primary">
                        <GraduationCap className="h-5 w-5" />
                        <span>Batch of {selectedProfile.batch_year}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProfile(null)}
                    className="p-2 hover:bg-neutral-dark/10 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6 text-neutral-dark" />
                  </button>
                </div>

                <div className="space-y-6">
                  {(selectedProfile.occupation || selectedProfile.company) && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-neutral-dark">Professional Info</h3>
                      {selectedProfile.occupation && (
                        <div className="flex items-center gap-2 text-neutral-dark/80">
                          <Briefcase className="h-5 w-5 text-primary" />
                          <span>{selectedProfile.occupation}</span>
                        </div>
                      )}
                      {selectedProfile.company && (
                        <div className="flex items-center gap-2 text-neutral-dark/80">
                          <Briefcase className="h-5 w-5 text-primary" />
                          <span>{selectedProfile.company}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedProfile.current_location && (
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-dark mb-2">Location</h3>
                      <div className="flex items-center gap-2 text-neutral-dark/80">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span>{selectedProfile.current_location}</span>
                      </div>
                    </div>
                  )}

                  {selectedProfile.bio && (
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-dark mb-2">Bio</h3>
                      <p className="text-neutral-dark/80 whitespace-pre-line">{selectedProfile.bio}</p>
                    </div>
                  )}

                  {selectedProfile.show_contact_info && (
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-dark mb-4">Contact Information</h3>
                      <div className="space-y-3">
                        {selectedProfile.phone && (
                          <a
                            href={`tel:${selectedProfile.phone}`}
                            className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                          >
                            <Phone className="h-5 w-5" />
                            <span>{selectedProfile.phone}</span>
                          </a>
                        )}
                        {selectedProfile.email && (
                          <a
                            href={`mailto:${selectedProfile.email}`}
                            className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                          >
                            <Mail className="h-5 w-5" />
                            <span>{selectedProfile.email}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-neutral-dark mb-4">Connect</h3>
                    <div className="flex flex-wrap gap-4">
                      {selectedProfile.linkedin_url && (
                        <a
                          href={selectedProfile.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                        >
                          <Linkedin className="h-5 w-5" />
                          <span>LinkedIn</span>
                        </a>
                      )}
                      {selectedProfile.show_contact_info && selectedProfile.instagram_url && (
                        <a
                          href={selectedProfile.instagram_url}
                          target="_blank"
                          rel=" noopener noreferrer"
                          className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                        >
                          <Instagram className="h-5 w-5" />
                          <span>Instagram</span>
                        </a>
                      )}
                      {selectedProfile.show_contact_info && selectedProfile.facebook_url && (
                        <a
                          href={selectedProfile.facebook_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                        >
                          <Facebook className="h-5 w-5" />
                          <span>Facebook</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}