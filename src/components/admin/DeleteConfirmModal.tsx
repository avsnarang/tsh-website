import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';

interface DeleteConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  onClose,
  onConfirm
}: DeleteConfirmModalProps) {
  return (
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
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete Event
          </Button>
        </div>
      </div>
    </div>
  );
}