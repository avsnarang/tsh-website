import React from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';

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
          {/* Form fields here */}
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" onClick={onClose}>
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