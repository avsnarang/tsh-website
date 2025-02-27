import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import { supabase } from '../../lib/supabase';
import { 
  ArrowLeft, Plus, Pencil, AlertTriangle, Calendar, MapPin, X, 
  Download, Ban, CheckCircle 
} from 'lucide-react';
import Button from '../../components/ui/Button';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  cover_image: string;
  max_capacity?: number;
  max_guests_per_rsvp: number;
  requires_admission_number: boolean;
  accepting_rsvps: boolean;
}

interface RSVP {
  id: string;
  user_id: string | null;
  status: 'attending' | 'not_attending' | 'maybe';
  guests: number;
  admission_number?: string;
  created_at: string;
  student_name?: string; // Joined from students table
  student_class?: string;
}

interface FormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  coverImage: string;
  maxCapacity?: number;
  maxGuestsPerRsvp: number;
  requiresAdmissionNumber: boolean;
}

export default function ManageEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEventForm, setShowEventForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    coverImage: '',
    maxCapacity: undefined,
    maxGuestsPerRsvp: 4,
    requiresAdmissionNumber: true
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const toggleRSVPStatus = async (eventId: string, currentStatus: boolean) => {
    try {
      setError('');
      
      const { error } = await supabase
        .from('events')
        .update({ accepting_rsvps: !currentStatus })
        .eq('id', eventId);

      if (error) throw error;

      setSuccess(`RSVPs ${!currentStatus ? 'enabled' : 'disabled'} successfully`);
      setTimeout(() => setSuccess(''), 3000);
      await fetchEvents();
    } catch (error) {
      console.error('Error toggling RSVP status:', error);
      setError('Failed to update RSVP status');
    }
  };

  const downloadRSVPs = async (eventId: string, eventTitle: string) => {
    try {
      setError('');

      // Fetch RSVPs with student data using the new function
      const { data: rsvps, error: rsvpError } = await supabase
        .rpc('get_event_rsvps', { event_id: eventId });

      if (rsvpError) throw rsvpError;

      if (!rsvps || rsvps.length === 0) {
        setError('No RSVPs found for this event');
        return;
      }

      // Create CSV content
      const headers = ['Admission Number', 'Student Name', 'Class', 'Number of Guests', 'RSVP Date'];
      const csvRows = [headers.join(',')];

      rsvps.forEach((rsvp: RSVP) => {
        const row = [
          rsvp.admission_number || 'N/A',
          rsvp.student_name || 'N/A',
          rsvp.student_class || 'N/A',
          rsvp.guests,
          new Date(rsvp.created_at).toLocaleDateString()
        ];
        csvRows.push(row.join(','));
      });

      // Create and download the file
      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${eventTitle.toLowerCase().replace(/\s+/g, '-')}-rsvps.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setSuccess('RSVPs downloaded successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error downloading RSVPs:', error);
      setError('Failed to download RSVPs');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');

      const eventData = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        cover_image: formData.coverImage,
        max_capacity: formData.maxCapacity,
        max_guests_per_rsvp: formData.maxGuestsPerRsvp,
        requires_admission_number: formData.requiresAdmissionNumber,
        accepting_rsvps: true // New events start with RSVPs enabled
      };

      if (editingEvent) {
        const { error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', editingEvent.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('events')
          .insert([eventData]);

        if (error) throw error;
      }

      setSuccess(editingEvent ? 'Event updated successfully' : 'Event created successfully');
      setTimeout(() => setSuccess(''), 3000);
      setShowEventForm(false);
      setEditingEvent(null);
      resetForm();
      await fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      setError('Failed to save event');
    }
  };

  const handleDelete = async (eventId: string) => {
    try {
      setError('');

      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      setSuccess('Event deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
      setShowDeleteConfirm(null);
      await fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Failed to delete event');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      coverImage: '',
      maxCapacity: undefined,
      maxGuestsPerRsvp: 4,
      requiresAdmissionNumber: true
    });
  };

  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Dashboard
            </Link>
            <Button
              onClick={() => setShowEventForm(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Add New Event
            </Button>
          </div>

          <h1 className="text-4xl text-neutral-dark mb-8">Manage Events</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="space-y-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white p-8 rounded-2xl shadow-lg"
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-6">
                    <div>
                      <h3 className="text-2xl text-neutral-dark font-semibold mb-3">
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-primary">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date} at {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <Button
                        onClick={() => downloadRSVPs(event.id, event.title)}
                        variant="download"
                        className="flex items-center gap-2 h-12"
                      >
                        <Download className="h-4 w-4" />
                        Download RSVPs
                      </Button>
                      <Button
                        onClick={() => toggleRSVPStatus(event.id, event.accepting_rsvps)}
                        variant={event.accepting_rsvps ? "delete" : "edit"}
                        className="flex items-center justify-center gap-2 h-12 w-48"
                      >
                        {event.accepting_rsvps ? (
                          <>
                            <Ban className="h-4 w-4" />
                            Stop RSVPs
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Enable RSVPs
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => {
                          setEditingEvent(event);
                          setFormData({
                            title: event.title,
                            description: event.description,
                            date: event.date,
                            time: event.time,
                            location: event.location,
                            coverImage: event.cover_image,
                            maxCapacity: event.max_capacity,
                            maxGuestsPerRsvp: event.max_guests_per_rsvp,
                            requiresAdmissionNumber: event.requires_admission_number
                          });
                          setShowEventForm(true);
                        }}
                        variant="edit"
                        className="flex items-center gap-2 h-12"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => setShowDeleteConfirm(event.id)}
                        variant="delete"
                        className="flex items-center gap-2 h-12"
                      >
                        <AlertTriangle className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-neutral-dark/80 mb-6">{event.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="bg-primary-light/10 px-4 py-2 rounded-full text-primary">
                      Max Guests per RSVP: {event.max_guests_per_rsvp}
                    </div>
                    {event.max_capacity && (
                      <div className="bg-primary-light/10 px-4 py-2 rounded-full text-primary">
                        Capacity: {event.max_capacity}
                      </div>
                    )}
                    <div className={`px-4 py-2 rounded-full ${
                      event.accepting_rsvps 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      RSVPs: {event.accepting_rsvps ? 'Accepting' : 'Closed'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>

      {/* Event Form Modal */}
      {showEventForm && (
        <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-neutral-dark">
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </h2>
              <button
                onClick={() => {
                  setShowEventForm(false);
                  setEditingEvent(null);
                  resetForm();
                }}
                className="p-2 hover:bg-neutral-dark/10 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-neutral-dark" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-neutral-dark mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-dark mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary h-32"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-neutral-dark mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-neutral-dark mb-2">Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-dark mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-dark mb-2">Cover Image URL</label>
                <input
                  type="url"
                  value={formData.coverImage}
                  onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-neutral-dark mb-2">Maximum Capacity (Optional)</label>
                  <input
                    type="number"
                    value={formData.maxCapacity || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      maxCapacity: e.target.value ? parseInt(e.target.value) : undefined
                    }))}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-neutral-dark mb-2">Maximum Guests per RSVP</label>
                  <input
                    type="number"
                    value={formData.maxGuestsPerRsvp}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      maxGuestsPerRsvp: Math.max(1, parseInt(e.target.value) || 1)
                    }))}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  variant="outline2"
                  onClick={() => {
                    setShowEventForm(false);
                    setEditingEvent(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            <div className="flex items-center gap-4 text-red-500 mb-6">
              <AlertTriangle className="h-8 w-8" />
              <h2 className="text-2xl font-semibold">Delete Event</h2>
            </div>
            <p className="text-neutral-dark/80 mb-8">
              Are you sure you want to delete this event? This action cannot be undone.
              All RSVPs will also be removed.
            </p>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline2"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </Button>
              <Button
                variant="delete"
                onClick={() => showDeleteConfirm && handleDelete(showDeleteConfirm)}
              >
                Delete Event
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}