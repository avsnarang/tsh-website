import React, { useState } from 'react';
import { Check, Calendar, MapPin, Clock, X } from 'lucide-react';
import Button from '../ui/Button';
import { Invite } from '../../types/invite';
import { supabase } from '../../lib/supabase';

interface InviteModalProps {
  invite: Invite;
  onClose: () => void;
  onRSVP: (status: 'attending' | 'not_attending' | 'maybe', guests: number, admissionNumber?: string) => void;
}

export default function InviteModal({ invite, onClose, onRSVP }: InviteModalProps) {
  const [status, setStatus] = useState<'attending' | 'not_attending' | 'maybe'>('attending');
  const [guests, setGuests] = useState(1);
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [admissionError, setAdmissionError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [studentName, setStudentName] = useState('');

  const verifyAdmissionNumber = async (number: string) => {
    try {
      setVerifying(true);
      setAdmissionError('');
      setVerified(false);
      setStudentName('');

      // Check if empty
      if (!number.trim()) {
        setAdmissionError('Please enter an admission number');
        return;
      }

      // Query the students table
      const { data, error } = await supabase
        .from('students')
        .select('full_name')
        .eq('admission_number', number.trim())
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setAdmissionError('Invalid admission number');
          return;
        }
        throw error;
      }

      if (!data) {
        setAdmissionError('Invalid admission number');
        return;
      }

      setStudentName(data.full_name);
      setVerified(true);
    } catch (error) {
      console.error('Error verifying admission number:', error);
      setAdmissionError('Failed to verify admission number');
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = () => {
    // Only require verification for 'attending' status
    if (status === 'attending' && invite.requiresAdmissionNumber && !verified) {
      setAdmissionError('Please verify the admission number first');
      return;
    }
    onRSVP(
      status, 
      guests, 
      status === 'attending' && invite.requiresAdmissionNumber ? admissionNumber : undefined
    );
  };

  return (
    <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Event Image Header */}
        <div className="relative h-48 overflow-hidden shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-neutral-dark/20 hover:bg-neutral-dark/40 rounded-full transition-colors z-10"
          >
            <X className="h-5 w-5 text-neutral-light" />
          </button>
          <img
            src={invite.coverImage}
            alt={invite.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl text-neutral-light mb-2 line-clamp-1">{invite.title}</h2>
            <div className="flex flex-wrap gap-4 text-neutral-light/90">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 shrink-0" />
                <span className="truncate">{invite.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                <span className="truncate">{invite.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="truncate">{invite.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-xl text-neutral-dark mb-4">Will you attend?</h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setStatus('attending')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  status === 'attending'
                    ? 'bg-primary text-neutral-light'
                    : 'bg-neutral-light text-neutral-dark hover:bg-primary/10'
                }`}
              >
                Yes, I'll be there
              </button>
              <button
                onClick={() => setStatus('not_attending')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  status === 'not_attending'
                    ? 'bg-primary text-neutral-light'
                    : 'bg-neutral-light text-neutral-dark hover:bg-primary/10'
                }`}
              >
                No, I can't make it
              </button>
            </div>
          </div>

          {status === 'attending' && invite.requiresAdmissionNumber && (
            <div className="mb-6">
              <h3 className="text-xl text-neutral-dark mb-4">Student Admission Number</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={admissionNumber}
                  onChange={(e) => {
                    setAdmissionNumber(e.target.value);
                    setVerified(false);
                    setAdmissionError('');
                    setStudentName('');
                  }}
                  placeholder="Enter student's admission number"
                  className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                    admissionError
                      ? 'border-red-400 focus:ring-red-200'
                      : verified
                      ? 'border-green-400 focus:ring-green-200'
                      : 'border-neutral-dark/20 focus:ring-primary'
                  }`}
                  required
                />
                <Button
                  onClick={() => verifyAdmissionNumber(admissionNumber)}
                  disabled={verifying || !admissionNumber || verified}
                >
                  {verifying ? 'Verifying...' : verified ? 'Verified' : 'Verify'}
                </Button>
              </div>
              {admissionError && (
                <p className="mt-2 text-sm text-red-600">{admissionError}</p>
              )}
              {verified && studentName && (
                <p className="mt-2 text-sm text-green-600">
                  Verified for student: {studentName}
                </p>
              )}
            </div>
          )}

          {status === 'attending' && (
            <div>
              <h3 className="text-xl text-neutral-dark mb-4">Number of Guests</h3>
              <div className="flex flex-wrap gap-4">
                {Array.from({ length: invite.maxGuestsPerRsvp }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setGuests(num)}
                    className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                      guests === num
                        ? 'border-primary bg-primary text-white'
                        : 'border-neutral-dark/20 text-neutral-dark hover:border-primary'
                    }`}
                  >
                    {num}
                    {guests === num && (
                      <Check className="absolute -top-2 -right-2 h-4 w-4 text-primary bg-white rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-8 border-t border-neutral-dark/10 shrink-0">
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={status === 'attending' && invite.requiresAdmissionNumber && !verified}
            >
              Confirm RSVP
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}