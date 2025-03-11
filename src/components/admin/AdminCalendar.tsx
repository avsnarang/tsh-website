import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import Container from "../ui/Container";
import Button from "../ui/Button";
import ButtonGroup from '../ui/ButtonGroup';
import { 
  Plus, RotateCw, AlertTriangle, Grid, List, 
  ArrowLeft, Calendar, Search, CheckCircle
} from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import type { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { calendarApi } from '../../api/calendarApi';
import EventModal from './EventModal';
import { motion, AnimatePresence } from 'framer-motion';
import "../../styles/calendar.css";

interface CalendarEvent {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  description?: string;
  location?: string;
  event_type: string;
  branch: string;
  session: string;
  is_public: boolean;
  synced_with_google: boolean;
  google_event_id?: string;
  is_all_day: boolean;
}

export default function AdminCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleDateSelect = ({ startStr, endStr }: DateSelectArg) => {
    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      title: 'New Event',
      start_time: `${startStr}T00:00:00+05:30`,
      end_time: `${endStr}T23:59:59+05:30`,
      event_type: 'academic',
      branch: 'All Campuses',
      session: '2023-24',
      is_public: false,
      synced_with_google: false,
      is_all_day: true
    };
    
    setSelectedEvent(newEvent);
    setShowEventModal(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = events.find(e => e.id === clickInfo.event.id);
    if (event) {
      setSelectedEvent(event);
      setShowEventModal(true);
    }
  };

  const handleSyncWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const unsyncedEvents = events.filter(event => !event.synced_with_google);
      if (!unsyncedEvents.length) {
        setSuccess('All events are synchronized');
        return;
      }

      await calendarApi.syncEvents(unsyncedEvents);
      await fetchEvents();
      setSuccess('Events synchronized with Google Calendar');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sync failed');
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error: supabaseError } = await supabase
        .from('calendar_events')
        .select('*')
        .order('start_time');

      if (supabaseError) throw supabaseError;
      setEvents(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEvent = async (eventData: CalendarEvent) => {
    try {
      setError(null);
      await fetchEvents();
      setSelectedEvent(eventData);
      setShowEventModal(false);
      setSuccess('Event saved successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save event');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      <Container className="py-8">
        {/* Header Section */}
        <div className="mb-8">
          <Link 
            to="/admin/dashboard"
            className="inline-flex items-center text-neutral-dark/60 hover:text-neutral-dark mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-between"
          >
            <div>
              <motion.div
                className="inline-flex items-center px-4 py-2 rounded-full bg-blue-light/20 text-blue mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm font-semibold">CALENDAR MANAGEMENT</span>
              </motion.div>

              <h1 className="text-4xl font-display text-neutral-dark">
                School Calendar
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleSyncWithGoogle} disabled={loading}>
                <RotateCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Sync with Google</span>
              </Button>
              <Button onClick={() => setShowEventModal(true)}>
                <Plus className="h-4 w-4" />
                <span>Add Event</span>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ButtonGroup>
                <Button
                  variant={view === 'calendar' ? 'primary' : 'outline'}
                  onClick={() => setView('calendar')}
                >
                  <Grid className="h-4 w-4" />
                  <span>Grid View</span>
                </Button>
                <Button
                  variant={view === 'list' ? 'primary' : 'outline'}
                  onClick={() => setView('list')}
                >
                  <List className="h-4 w-4" />
                  <span>List View</span>
                </Button>
              </ButtonGroup>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-dark/50" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-full border border-neutral-dark/10 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2"
            >
              <AlertTriangle className="h-5 w-5" />
              <span>{error}</span>
            </motion.div>
          )}

          {success && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2"
            >
              <CheckCircle className="h-5 w-5" />
              <span>{success}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Calendar */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
            initialView={view === 'calendar' ? 'dayGridMonth' : 'listMonth'}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: ''
            }}
            selectable
            editable
            events={events.map(event => ({
              id: event.id,
              title: event.title,
              start: event.start_time,
              end: event.end_time,
              allDay: event.is_all_day,
              className: `${event.is_public ? 'bg-green' : 'bg-orange'} ${event.synced_with_google ? 'border-blue' : ''}`
            }))}
            select={handleDateSelect}
            eventClick={handleEventClick}
          />
        </div>

        {/* Event Modal */}
        <AnimatePresence>
          {showEventModal && selectedEvent && (
            <EventModal
              event={selectedEvent}
              onClose={() => setShowEventModal(false)}
              onSave={handleSaveEvent}
              onDelete={async (eventId: string) => {
                try {
                  const { error } = await supabase
                    .from('calendar_events')
                    .delete()
                    .eq('id', eventId);
                  
                  if (error) throw error;
                  
                  await fetchEvents();
                  setShowEventModal(false);
                  setSuccess('Event deleted successfully');
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'Failed to delete event');
                }
              }}
            />
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}
