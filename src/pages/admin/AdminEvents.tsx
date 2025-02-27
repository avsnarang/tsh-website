import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../components/ui/Container';
import { supabase, checkSupabaseConnection } from '../../lib/supabase';
import { ArrowLeft, Plus, Pencil, AlertTriangle, Calendar, MapPin, X, Upload, Download } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

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
  rsvp_count?: number;
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
  const navigate = useNavigate();
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEventForm, setShowEventForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showStudentUpload, setShowStudentUpload] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    coverImage: '',
    maxCapacity: undefined,
    maxGuestsPerRsvp: 4,
    requiresAdmissionNumber: false
  });

  useEffect(() => {
    // Check authentication
    if (!user) {
      navigate('/management/login');
      return;
    }

    // Check if user is management
    const checkManagementAccess = async () => {
      try {
        const { data, error } = await supabase
          .from('management_users')
          .select('id')
          .eq('id', user.id)
          .single();

        if (error || !data) {
          navigate('/management/login');
          return;
        }

        // If access is verified, fetch events
        fetchEvents();
      } catch (error) {
        console.error('Error checking management access:', error);
        navigate('/management/login');
      }
    };

    checkManagementAccess();
  }, [user, navigate]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');

      // Check Supabase connection first
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        setError('Database connection error. Please try again later.');
        return;
      }

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events. Please try refreshing the page.');
    } finally {
      setLoading(false);
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
        requires_admission_number: formData.requiresAdmissionNumber
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

      await fetchEvents();
      setShowEventForm(false);
      setEditingEvent(null);
      resetForm();
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
      requiresAdmissionNumber: false
    });
  };

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadError('');
      setUploadSuccess('');

      // Read the CSV file
      const text = await file.text();
      const rows = text.split('\n');
      
      // Skip header row and filter out empty rows
      const students = rows.slice(1)
        .map(row => {
          const [admission_number, full_name, class_name] = row.split(',').map(cell => cell.trim());
          return { admission_number, full_name, class: class_name };
        })
        .filter(student => student.admission_number && student.full_name);

      // Insert students into database
      const { error } = await supabase
        .from('students')
        .upsert(students, { 
          onConflict: 'admission_number',
          ignoreDuplicates: false 
        });

      if (error) throw error;

      setUploadSuccess(`Successfully uploaded ${students.length} student records`);
      setTimeout(() => setShowStudentUpload(false), 2000);
    } catch (error) {
      console.error('Error uploading students:', error);
      setUploadError('Failed to upload student data. Please check the CSV format.');
    }
  };

  const downloadSampleCSV = () => {
    const csvContent = "admission_number,full_name,class\nA12345,John Doe,10A\nB67890,Jane Smith,11B";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_students.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowStudentUpload(true)}
                className="flex items-center gap-2"
              >
                <Upload className="h-5 w-5" />
                Upload Student Data
              </Button>
              <Button
                onClick={() => setShowEventForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Add New Event
              </Button>
            </div>
          </div>

          <div className="bg-primary-light/10 p-6 rounded-2xl mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl text-neutral-dark font-semibold">Student Data Management</h2>
                <p className="text-neutral-dark/80">Upload and manage student admission numbers</p>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={downloadSampleCSV}
                  className="flex items-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  Download Sample CSV
                </Button>
                <Button
                  onClick={() => setShowStudentUpload(true)}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-5 w-5" />
                  Upload Student Data
                </Button>
              </div>
            </div>
          </div>

          <h1 className="text-4xl text-neutral-dark mb-8">Manage Events</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="space-y-6">
              {events.map(event => (
                <div
                  key={event.id}
                  className="bg-white p-6 rounded-2xl shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl text-neutral-dark font-semibold">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-4 text-primary mt-2">
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
                    <div className="flex items-center gap-2">
                      <button
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
                        className="p-2 bg-primary-light/20 text-primary rounded-lg hover:bg-primary-light/40 transition-colors"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(event.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <AlertTriangle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-neutral-dark/80 mb-4">{event.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="bg-primary-light/10 px-3 py-1 rounded-full text-primary">
                      Max Guests per RSVP: {event.max_guests_per_rsvp}
                    </div>
                    {event.max_capacity && (
                      <div className="bg-primary-light/10 px-3 py-1 rounded-full text-primary">
                        Capacity: {event.max_capacity}
                      </div>
                    )}
                    {event.requires_admission_number && (
                      <div className="bg-primary-light/10 px-3 py-1 rounded-full text-primary">
                        Requires Admission Number
                      </div>
                    )}
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

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="requiresAdmissionNumber"
                  checked={formData.requiresAdmissionNumber}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    requiresAdmissionNumber: e.target.checked
                  }))}
                  className="rounded border-neutral-dark/20 text-primary focus:ring-primary"
                />
                <label htmlFor="requiresAdmissionNumber" className="text-neutral-dark">
                  Require student admission number for RSVP
                </label>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  variant="outline"
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
                variant="outline"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </Button>
              <button
                onClick={() => showDeleteConfirm && handleDelete(showDeleteConfirm)}
                className="px-6 py-2 bg-red-500 text-neutral-light rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Upload Modal */}
      {showStudentUpload && (
        <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-neutral-dark">
                Upload Student Data
              </h2>
              <button
                onClick={() => setShowStudentUpload(false)}
                className="p-2 hover:bg-neutral-dark/10 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-neutral-dark" />
              </button>
            </div>

            {uploadError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {uploadError}
              </div>
            )}

            {uploadSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {uploadSuccess}
              </div>
            )}

            <div className="space-y-4">
              <p className="text-neutral-dark/80">
                Upload a CSV file with the following columns:
              </p>
              <ul className="list-disc list-inside text-neutral-dark/80">
                <li>Admission Number</li>
                <li>Full Name</li>
                <li>Class (optional)</li>
              </ul>
              <p className="text-neutral-dark/80">
                The first row should contain column headers.
              </p>

              <div className="mt-6">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="block w-full text-sm text-neutral-dark
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary file:text-neutral-light
                    hover:file:bg-primary-dark
                    file:cursor-pointer cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}