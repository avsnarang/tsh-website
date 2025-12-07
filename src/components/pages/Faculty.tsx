'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { 
  BookOpen, 
  Clock, 
  GraduationCap, 
  User,
  Star,
  Search
} from 'lucide-react';
import Container from '@/components/ui/Container';
import ScrollReveal from '@/components/animations/ScrollReveal';
import type { Teacher } from '@/types/teacher';
import { seoConfig } from '@/config/seoConfig';

const CLASS_LEVELS = {
  ALL: 'all',
  NTT: 'NTT',
  PRT: 'PRT',
  TGT: 'TGT',
  PGT: 'PGT'
} as const;

const CLASS_LEVEL_LABELS = {
  [CLASS_LEVELS.ALL]: 'All Classes',
  [CLASS_LEVELS.NTT]: 'Pre-Primary (NTT)',
  [CLASS_LEVELS.PRT]: 'Primary (PRT)',
  [CLASS_LEVELS.TGT]: 'Secondary (TGT)',
  [CLASS_LEVELS.PGT]: 'Senior Secondary (PGT)'
} as const;

export default function Faculty() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedClassLevel, setSelectedClassLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { data, error } = await supabase
          .from('teachers')
          .select('*')
          .eq('is_visible', true)
          .order('subject')
          .order('full_name');

        if (error) throw error;
        setTeachers(data || []);
      } catch (err) {
        console.error('Error fetching teachers:', err);
        setError('Failed to load faculty information');
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const subjects = ['all', ...new Set(teachers.map(t => t.subject))];
  
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSubject = selectedSubject === 'all' || teacher.subject === selectedSubject;
    const matchesClassLevel = selectedClassLevel === 'all' || teacher.class_level === selectedClassLevel;
    const matchesSearch = searchQuery === '' || 
      teacher.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesClassLevel && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Hero Section with Background Pattern */}
      <div className="relative pt-44 sm:pt-48 pb-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[#f8fafc]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 2% 50%, rgba(166, 212, 180, 0.9) 0%, transparent 35%),
              radial-gradient(circle at 98% 20%, rgba(166, 212, 180, 0.9) 0%, transparent 35%),
              radial-gradient(circle at 50% 90%, rgba(255, 162, 86, 0.7) 0%, transparent 35%)
            `,
          }} />
          <div className="absolute inset-0 opacity-[0.07]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23374151' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 20px',
          }} />
          {/* Add fade out effect at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-light to-transparent" />
        </div>

        <Container className="relative z-20 mt-10 lg:mt-4 md:mt-6 sm:mt-8">
          <ScrollReveal>
            <div className="text-center mb-8">
              <span className="inline-block px-6 py-2 bg-green-light/20 text-green rounded-full text-sm font-medium mb-6">
                <Star className="h-4 w-4 inline-block mr-2" />
                Our Faculty
              </span>
              <h1 className="text-5xl md:text-6xl font-display text-neutral-dark mb-4">
                Meet Our <span className="text-green">Expert</span> Educators
              </h1>
              <p className="text-neutral-dark/70 text-xl max-w-2xl mx-auto mb-12">
                Dedicated professionals shaping tomorrow's leaders through excellence in education
              </p>
            </div>
          </ScrollReveal>

          {/* Search and Filters Section - Moved inside the hero section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search Input */}
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search by name or subject..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 pl-10 rounded-lg border border-neutral-dark/10 
                        focus:ring-2 focus:ring-green/20 focus:border-green bg-white
                        text-neutral-dark placeholder:text-neutral-dark/50"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green" />
                  </div>

                  {/* Class Level Dropdown */}
                  <div className="min-w-[180px]">
                    <select
                      value={selectedClassLevel}
                      onChange={(e) => setSelectedClassLevel(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-neutral-dark/10 
                        focus:ring-2 focus:ring-green/20 focus:border-green
                        text-neutral-dark bg-white"
                    >
                      {Object.entries(CLASS_LEVEL_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subject Filter */}
                  <div className="min-w-[180px]">
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-neutral-dark/10 
                        focus:ring-2 focus:ring-orange/20 focus:border-orange
                        text-neutral-dark bg-white"
                    >
                      <option value="all">All Subjects</option>
                      {subjects.filter(subject => subject !== 'all').map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Active Filters Display */}
                {(selectedClassLevel !== 'all' || selectedSubject !== 'all' || searchQuery) && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {selectedClassLevel !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-light/20 text-green text-sm">
                        {CLASS_LEVEL_LABELS[selectedClassLevel as keyof typeof CLASS_LEVEL_LABELS]}
                        <button
                          onClick={() => setSelectedClassLevel('all')}
                          className="hover:text-green-dark"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {selectedSubject !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-light/20 text-orange text-sm">
                        {selectedSubject}
                        <button
                          onClick={() => setSelectedSubject('all')}
                          className="hover:text-orange-dark"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {searchQuery && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-dark/10 text-neutral-dark text-sm">
                        Search: {searchQuery}
                        <button
                          onClick={() => setSearchQuery('')}
                          className="hover:text-neutral-dark/70"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Results count */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center text-neutral-dark/70 mb-8"
      >
        <p>
          Showing {filteredTeachers.length} {filteredTeachers.length === 1 ? 'teacher' : 'teachers'}
          {selectedSubject !== 'all' && ` in ${selectedSubject}`}
          {selectedClassLevel !== 'all' && ` for ${CLASS_LEVEL_LABELS[selectedClassLevel as keyof typeof CLASS_LEVEL_LABELS]}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </motion.div>

      {/* Faculty Grid - now outside the hero section */}
      <div className="bg-neutral-light">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
            {filteredTeachers.map((teacher, index) => (
              <ScrollReveal key={teacher.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="relative group h-full"
                >
                  {/* Card background effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-light/10 via-primary-light/5 to-transparent rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-green-light/30 to-primary-light/30 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                  
                  {/* Main card */}
                  <div className="relative bg-white rounded-3xl p-8 shadow-xl h-full flex flex-col">
                    <div className="flex items-center gap-5 mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-green-light to-primary flex-shrink-0 shadow-lg"
                      >
                        {teacher.profile_picture_url ? (
                          <img
                            src={teacher.profile_picture_url}
                            alt={teacher.full_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-display text-neutral-dark">
                          {teacher.full_name}
                        </h3>
                        <p className="text-primary font-medium">
                          {teacher.designation}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-sm text-neutral-dark/70">
                          {teacher.subject}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <GraduationCap className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-sm text-neutral-dark/70">
                          {teacher.qualifications.join(', ')}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Clock className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-sm text-neutral-dark/70">
                          {teacher.experience_years} years of experience
                        </p>
                      </div>
                    </div>

                    {teacher.bio && (
                      <p className="text-sm text-neutral-dark/70 line-clamp-3 mt-auto">
                        {teacher.bio}
                      </p>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
