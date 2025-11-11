'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/ui/Container';
import { Calendar as CalendarIcon, List, Grid, MapPin, Filter, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
interface CalendarEvent {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  description: string | null | undefined;
  location: string | null | undefined;
  event_type: string;
  branch: string;
  session: string;
  google_event_id?: string;
  synced_with_google?: boolean;
}

type ViewType = 'month' | 'schedule';
type Session = '2025-26' | '2026-27' | '2027-28';

const EVENT_TYPES = [
  'All Events',
  'Academic',
  'Sports',
  'Cultural',
  'Examination',
  'Holiday',
  'Co-curricular'
];

const SESSIONS: Session[] = ['2025-26', '2026-27', '2027-28'];

export default function Calendar() {
  const [view, setView] = useState<ViewType>('month');
  const [selectedEventType, setSelectedEventType] = useState('All Events');
  const [selectedSession, setSelectedSession] = useState<Session>('2025-26');
  const [selectedBranch, setSelectedBranch] = useState('All Campuses');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        // Calculate time range (1 year before and after current date)
        const timeMin = new Date();
        timeMin.setFullYear(timeMin.getFullYear() - 1);
        const timeMax = new Date();
        timeMax.setFullYear(timeMax.getFullYear() + 1);

        // Build query parameters
        const params = new URLSearchParams({
          timeMin: timeMin.toISOString(),
          timeMax: timeMax.toISOString(),
        });

        if (selectedEventType && selectedEventType !== 'All Events') {
          params.append('eventType', selectedEventType);
        }
        if (selectedBranch && selectedBranch !== 'All Campuses') {
          params.append('branch', selectedBranch);
        }
        if (selectedSession) {
          params.append('session', selectedSession);
        }

        // Fetch from API route
        const response = await fetch(`/api/calendar-events?${params.toString()}`);

        if (!response.ok) {
          throw new Error('Failed to fetch calendar events');
        }

        const result = await response.json();

        if (result.success) {
          setEvents(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch calendar events');
        }
      } catch (err) {
        setError('Failed to load calendar events. Please try again later.');
        console.error('Calendar error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [selectedEventType, selectedBranch, selectedSession]);


  return (
    <div className="min-h-screen bg-neutral-light pt-32 pb-24">
      {/* Header Section */}
      <Container>
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full mb-8"
            >
              <CalendarIcon className="h-4 w-4" />
              <span className="font-semibold">School Calendar</span>
            </motion.div>
            <TextReveal>
              <h1 className="font-display text-5xl md:text-7xl text-neutral-dark mb-6">
                Academic <span className="text-green">Calendar</span>
              </h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-xl text-neutral-dark/70 max-w-2xl mx-auto">
                Stay updated with all school events, activities, and important dates throughout the academic year.
              </p>
            </TextReveal>
          </div>
        </ScrollReveal>

        {/* Filters Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl z-0" />
            <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green rounded-2xl z-0" />
            
            <div className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Event Type Filter */}
                <div className="relative">
                  <select
                    value={selectedEventType}
                    onChange={(e) => setSelectedEventType(e.target.value)}
                    className="w-full appearance-none px-6 py-4 pl-12 rounded-xl border-2 border-neutral-dark/10 
                      bg-white cursor-pointer focus:ring-2 focus:ring-green/20 focus:border-green
                      text-neutral-dark placeholder:text-neutral-dark/50 transition-all duration-300 hover:border-green"
                  >
                    {EVENT_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green" />
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-dark/50" />
                </div>

                {/* Session Filter */}
                <div className="relative">
                  <select
                    value={selectedSession}
                    onChange={(e) => setSelectedSession(e.target.value as Session)}
                    className="w-full appearance-none px-6 py-4 pl-12 rounded-xl border-2 border-neutral-dark/10 
                      bg-white cursor-pointer focus:ring-2 focus:ring-green/20 focus:border-green
                      text-neutral-dark placeholder:text-neutral-dark/50 transition-all duration-300 hover:border-green"
                  >
                    {SESSIONS.map(session => (
                      <option key={session} value={session}>Session {session}</option>
                    ))}
                  </select>
                  <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green" />
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-dark/50" />
                </div>

                {/* Branch Filter */}
                <div className="relative">
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full appearance-none px-6 py-4 pl-12 rounded-xl border-2 border-neutral-dark/10 
                      bg-white cursor-pointer focus:ring-2 focus:ring-green/20 focus:border-green
                      text-neutral-dark placeholder:text-neutral-dark/50 transition-all duration-300 hover:border-green"
                  >
                    <option value="All Campuses">All Campuses</option>
                    <option value="Main Campus">Main Campus</option>
                    <option value="City Campus">City Campus</option>
                    <option value="North Campus">North Campus</option>
                  </select>
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green" />
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-dark/50" />
                </div>

                {/* View Toggle */}
                <div className="relative">
                  <button
                    onClick={() => setView(view === 'month' ? 'schedule' : 'month')}
                    className="w-full px-6 py-4 rounded-xl border-2 border-neutral-dark/10 
                      bg-white hover:border-green transition-all duration-300
                      flex items-center justify-center gap-2 text-neutral-dark"
                  >
                    {view === 'month' ? (
                      <>
                        <Grid className="h-5 w-5" />
                        <span>Month View</span>
                      </>
                    ) : (
                      <>
                        <List className="h-5 w-5" />
                        <span>Schedule View</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Calendar Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {loading ? (
            <div className="flex items-center justify-center h-[800px]">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-[800px] text-red-500">
              {error}
            </div>
          ) : (
            <FullCalendar
              plugins={[dayGridPlugin, listPlugin]}
              initialView={view === 'month' ? 'dayGridMonth' : 'listMonth'}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: ''
              }}
              events={events}
              height="800px"
              eventClassNames="rounded-lg"
              eventDisplay="block"
              eventTimeFormat={{
                hour: '2-digit',
                minute: '2-digit',
                meridiem: true
              }}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
