import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import { supabase } from '../../lib/supabase';
import { 
  ArrowLeft, Plus, Pencil, AlertTriangle, Calendar, MapPin, X, 
  Upload, Download, Ban, CheckCircle 
} from 'lucide-react';
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
  accepting_rsvps: boolean;
  rsvp_count?: number;
}

interface RSVP {
  id: string;
  event_id: string;
  user_id: string | null;
  status: 'attending' | 'not_attending' | 'maybe';
  guests: number;
  admission_number?: string;
  created_at: string;
  student_name?: string;
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

interface StudentUploadData {
  admission_number: string;
  full_name: string;
  class_name: string;
}

export default function AdminEvents() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showEventForm, setShowEventForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showStudentUpload, setShowStudentUpload] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
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
    requiresAdmissionNumber: true
  });

  useEffect(() => {
    if (!user) {
      return;
    }
    fetchEvents();
  }, [user]);

  const fetchEvents = async () => {
    try {
      setError('');
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          rsvps: rsvps(count)
        `)
        .order('date', { ascending: false });

      if (error) throw error;

      const eventsWithCount = data?.map(event => ({
        ...event,
        rsvp_count: event.rsvps?.[0]?.count || 0
      }));

      setEvents(eventsWithCount || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleStudentUpload = async (file: File) => {
    try {
      setUploadError('');
      setUploadSuccess('');

      const text = await file.text();
      const rows = text.split('\n');
      
      // Validate CSV structure
      const headers = rows[0].toLowerCase().split(',');
      const requiredHeaders = ['admission_number', 'full_name', 'class'];
      const hasRequiredHeaders = requiredHeaders.every(h => 
        headers.some(header => header.trim() === h)
      );

      if (!hasRequiredHeaders) {
        throw new Error('CSV must contain admission_number, full_name, and class columns');
      }

      const students: StudentUploadData[] = rows.slice(1)
        .map(row => {
          const values = row.split(',').map(cell => cell.trim());
          return {
            admission_number: values[headers.indexOf('admission_number')],
            full_name: values[headers.indexOf('full_name')],
            class_name: values[headers.indexOf('class')]
          };
        })
        .filter(student => 
          student.admission_number && 
          student.full_name && 
          student.class_name
        );

      if (students.length === 0) {
        throw new Error('No valid student records found in CSV');
      }

      const { error } = await supabase
        .from('students')
        .upsert(
          students.map(student => ({
            admission_number: student.admission_number,
            full_name: student.full_name,
            class: student.class_name
          })),
          { 
            onConflict: 'admission_number',
            ignoreDuplicates: false 
          }
        );

      if (error) throw error;

      setUploadSuccess(`Successfully uploaded ${students.length} student records`);
      setTimeout(() => {
        setShowStudentUpload(false);
        setUploadSuccess('');
      }, 2000);
    } catch (error: any) {
      console.error('Error uploading students:', error);
      setUploadError(error.message || 'Failed to upload student data');
    }
  };

  const handleRSVPDownload = async (eventId: string, eventTitle: string) => {
    try {
      setError('');

      const { data: rsvps, error: rsvpError } = await supabase
        .rpc('get_event_rsvps', { event_id: eventId });

      if (rsvpError) throw rsvpError;

      if (!rsvps?.length) {
        setError('No RSVPs found for this event');
        return;
      }

      const headers = ['Admission Number', 'Student Name', 'Class', 'Guests', 'Status', 'RSVP Date'];
      const csvRows = [headers.join(',')];

      rsvps.forEach((rsvp: RSVP) => {
        const row = [
          rsvp.admission_number || 'N/A',
          rsvp.student_name || 'N/A',
          rsvp.student_class || 'N/A',
          rsvp.guests,
          rsvp.status,
          new Date(rsvp.created_at).toLocaleDateString()
        ];
        csvRows.push(row.join(','));
      });

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
          {/* Header */}
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

          {/* Success/Error Messages */}
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

          {/* Events List */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
            <div className="space-y-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl shadow-md p-6"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                        {event.title}
                      </h3>
                      <div className="space-y-2 text-neutral-dark/80">
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
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => handleRSVPDownload(event.id, event.title)}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download RSVPs ({event.rsvp_count})
                      </Button>
                      <Button
                        onClick={() => toggleRSVPStatus(event.id, event.accepting_rsvps)}
                        variant={event.accepting_rsvps ? "warning" : "success"}
                        className="flex items-center gap-2"
                      >
                        {event.accepting_rsvps ? (
                          <>
                            <Ban className="h-4 w-4" />
                            Disable RSVPs
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
                          setShowEventForm(true);
                        }}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => setShowDeleteConfirm(event.id)}
                        variant="danger"
                        className="flex items-center gap-2"
                      >
                        <AlertTriangle className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>

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
                <li>Class</li>
              </ul>

              <div className="mt-6">
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => e.target.files?.[0] && handleStudentUpload(e.target.files[0])}
                  className="block w-full text-sm text-neutral-dark
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary file:text-white
                    hover:file:bg-primary-dark
                    transition-colors"
                />
              </div>

              <Button
                variant="outline"
                onClick={downloadSampleCSV}
                className="w-full mt-4"
              >
                Download Sample CSV
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Event Form Modal */}
      {showEventForm && (
        <EventFormModal
          editingEvent={editingEvent}
          onClose={() => {
            setShowEventForm(false);
            setEditingEvent(null);
            resetForm();
          }}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <DeleteConfirmModal
          onClose={() => setShowDeleteConfirm(null)}
          onConfirm={() => showDeleteConfirm && handleDelete(showDeleteConfirm)}
        />
      )}
    </div>
  );
}
