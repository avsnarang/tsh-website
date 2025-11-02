'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import { supabase } from '../../lib/supabase';
import {
  ArrowLeft, Plus, Pencil, AlertTriangle, Calendar, MapPin, X,
  Download, Ban, CheckCircle, Star, Trash2
} from 'lucide-react';
import Button from '../ui/Button';
import ScrollReveal from '../animations/ScrollReveal';
import TextReveal from '../animations/TextReveal';
import { motion } from 'framer-motion';

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

interface RsvpData {
  admission_number: string;
  student_name: string;
  student_class: string;
  guests: number;
  created_at: string;
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
    maxGuestsPerRsvp: 1,
    requiresAdmissionNumber: false
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

      const { data: rsvps, error: rsvpError } = await supabase
        .rpc('get_event_rsvps', { event_id: eventId });

      if (rsvpError) throw rsvpError;

      if (!rsvps || rsvps.length === 0) {
        setError('No RSVPs found for this event');
        return;
      }

      const headers = ['Admission Number', 'Student Name', 'Class', 'Number of Guests', 'RSVP Date'];
      const csvRows = [headers.join(',')];

      rsvps.forEach((rsvp: RsvpData) => {
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

  useEffect(() => {
    if (showEventForm) {
      // Prevent background scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scroll when modal is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to ensure scroll is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showEventForm]);

  useEffect(() => {
    if (showDeleteConfirm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showDeleteConfirm]);

  return (
    <div className="relative min-h-screen bg-neutral-light pt-32 pb-24">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
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
                  <Star className="h-4 w-4" />
                  <span className="font-semibold">Event Management</span>
                </motion.div>
              </div>
              
              <TextReveal>
                <h1 className="font-display text-4xl md:text-5xl text-neutral-dark mb-4">
                  Manage <span className="text-green">School Events</span>
                </h1>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-neutral-dark/70 text-lg max-w-2xl mx-auto">
                  Create and manage school events, track RSVPs, and handle event registrations
                </p>
              </TextReveal>
            </div>
          </ScrollReveal>

          {/* Add Event Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 flex justify-end"
          >
            <button
              onClick={() => setShowEventForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white rounded-xl hover:bg-green-dark transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add New Event</span>
            </button>
          </motion.div>

          {/* Messages */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl mb-8">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>{success}</span>
              </div>
            </div>
          )}

          {/* Events List */}
          <ScrollReveal>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green mx-auto" />
              </div>
            ) : (
              <div className="grid gap-6">
                {events.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-dark/10"
                  >
                    <div className="p-8">
                      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-6">
                        <div>
                          <h3 className="text-2xl font-display text-neutral-dark mb-3">
                            {event.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-neutral-dark/70">
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
                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            onClick={() => downloadRSVPs(event.id, event.title)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Download className="h-5 w-5" />
                          </button>
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
                            className="p-2 text-neutral-dark/70 hover:text-green rounded-lg transition-colors"
                          >
                            <Pencil className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(event.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-neutral-dark/70 mb-6">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="bg-green-light/10 px-4 py-2 rounded-full text-green">
                          Max Guests per RSVP: {event.max_guests_per_rsvp}
                        </div>
                        {event.max_capacity && (
                          <div className="bg-green-light/10 px-4 py-2 rounded-full text-green">
                            Capacity: {event.max_capacity}
                          </div>
                        )}
                        <Button
                          onClick={() => toggleRSVPStatus(event.id, event.accepting_rsvps)}
                          variant={event.accepting_rsvps ? 'edit' : 'delete'}
                          className="flex items-center gap-2"
                        >
                          {event.accepting_rsvps ? (
                            <Ban className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                          {event.accepting_rsvps ? 'Close RSVPs' : 'Open RSVPs'}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </ScrollReveal>

          {/* Event Form Modal */}
          {showEventForm && (
            <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-4xl"
              >
                <div className="p-8 max-h-[80vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-8 sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-display text-neutral-dark">
                      {editingEvent ? 'Edit Event' : 'Add New Event'}
                    </h2>
                    <button
                      onClick={() => {
                        setShowEventForm(false);
                        setEditingEvent(null);
                        resetForm();
                      }}
                      className="p-2 text-neutral-dark/70 hover:text-neutral-dark rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5" />
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
                        onClick={() => {
                          setShowEventForm(false);
                          setEditingEvent(null);
                          resetForm();
                        }}
                        variant="outline2"
                        className="px-6 py-2"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        variant="edit"
                        className="px-6 py-2"
                      >
                        {editingEvent ? 'Update Event' : 'Create Event'}
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
              >
                <h3 className="text-xl font-display text-neutral-dark mb-4">
                  Confirm Deletion
                </h3>
                <p className="text-neutral-dark/70 mb-8">
                  Are you sure you want to delete this event? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-4">
                  <Button
                    onClick={() => setShowDeleteConfirm(null)}
                    variant="outline2"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleDelete(showDeleteConfirm)}
                    variant="delete"
                  >
                    Delete Event
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
