'use client';

import React from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';

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

interface FormData {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  cover_image: string;
  max_capacity: string;
  max_guests_per_rsvp: string;
  requires_admission_number: boolean;
  accepting_rsvps: boolean;
}

interface EventFormModalProps {
  editingEvent: Event | null;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function EventFormModal({
  editingEvent,
  onClose,
  onSubmit,
  formData,
  setFormData
}: EventFormModalProps) {
  return (
    <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-neutral-dark">
            {editingEvent ? 'Edit Event' : 'Add New Event'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-dark/10 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-neutral-dark" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
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
            <label className="block text-neutral-dark mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary h-32"
              required
            />
          </div>

          <div>
            <label className="block text-neutral-dark mb-2">Cover Image URL</label>
            <input
              type="url"
              value={formData.cover_image}
              onChange={(e) => setFormData(prev => ({ ...prev, cover_image: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-neutral-dark mb-2">Maximum Capacity</label>
              <input
                type="number"
                value={formData.max_capacity}
                onChange={(e) => setFormData(prev => ({ ...prev, max_capacity: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                min="0"
              />
            </div>
            <div>
              <label className="block text-neutral-dark mb-2">Max Guests per RSVP</label>
              <input
                type="number"
                value={formData.max_guests_per_rsvp}
                onChange={(e) => setFormData(prev => ({ ...prev, max_guests_per_rsvp: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                min="1"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="requires_admission"
                checked={formData.requires_admission_number}
                onChange={(e) => setFormData(prev => ({ ...prev, requires_admission_number: e.target.checked }))}
                className="rounded border-neutral-dark/20"
              />
              <label htmlFor="requires_admission" className="text-neutral-dark">
                Requires Admission Number
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="accepting_rsvps"
                checked={formData.accepting_rsvps}
                onChange={(e) => setFormData(prev => ({ ...prev, accepting_rsvps: e.target.checked }))}
                className="rounded border-neutral-dark/20"
              />
              <label htmlFor="accepting_rsvps" className="text-neutral-dark">
                Accepting RSVPs
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit">
              {editingEvent ? 'Update Event' : 'Create Event'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
