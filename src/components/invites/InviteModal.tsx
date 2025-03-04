import { useState } from 'react';
import { Check, Calendar, MapPin, Clock, X, User, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import { Invite } from '../../types/invite';
import { supabase } from '../../lib/supabase';

interface InviteModalProps {
  invite: Invite;
  onClose: () => void;
  onRSVP: (status: 'attending' | 'not_attending' | 'maybe', guests: number, admissionNumber?: string) => void;
}

export default function InviteModal({ invite, onClose, onRSVP }: InviteModalProps) {
  const [status, setStatus] = useState<'attending' | 'not_attending' | 'maybe'>(
    invite.userRsvp?.status || 'attending'
  );
  const [guests, setGuests] = useState(invite.userRsvp?.guests || 1);
  const [admissionNumber, setAdmissionNumber] = useState(invite.userRsvp?.admission_number || '');
  const [admissionError, setAdmissionError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [existingRsvp, setExistingRsvp] = useState<{
    status: 'attending' | 'not_attending';
    guests: number;
  } | null>(null);

  const verifyAdmissionNumber = async (number: string) => {
    try {
      setVerifying(true);
      setAdmissionError('');
      setVerified(false);
      setStudentName('');
      setExistingRsvp(null);

      // Check if admission number is empty
      if (!number.trim()) {
        setAdmissionError('Please enter an admission number');
        return;
      }

      // First verify if the admission number exists
      const { data: student, error: studentError } = await supabase
        .from('students')
        .select('full_name')
        .eq('admission_number', number.trim())
        .single();

      if (studentError) {
        if (studentError.code === 'PGRST116') {
          setAdmissionError('Invalid admission number');
          return;
        }
        throw studentError;
      }

      // Then check if this admission number already has an RSVP
      const { data: rsvp, error: rsvpError } = await supabase
        .from('event_rsvps')
        .select('status, guests')
        .eq('event_id', invite.id)
        .eq('admission_number', number.trim())
        .maybeSingle();

      if (rsvpError) throw rsvpError;

      setStudentName(student.full_name);
      setVerified(true);

      if (rsvp) {
        setExistingRsvp(rsvp as { status: 'attending' | 'not_attending'; guests: number });
        setStatus(rsvp.status as 'attending' | 'not_attending');
        if (rsvp.status === 'attending') {
          setGuests(rsvp.guests);
        }
      }
    } catch (error) {
      console.error('Error verifying admission number:', error);
      setAdmissionError('Failed to verify admission number');
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = () => {
    if (!admissionNumber || !verified) {
      setAdmissionError('Please verify the admission number first');
      return;
    }

    onRSVP(status, status === 'attending' ? guests : 1, admissionNumber);
  };

  return (
    <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Event Header */}
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
          {/* Student Verification Section */}
          <div className="mb-6">
            <h3 className="text-xl text-neutral-dark mb-4">Student Verification</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={admissionNumber}
                onChange={(e) => {
                  setAdmissionNumber(e.target.value);
                  setVerified(false);
                  setAdmissionError('');
                  setStudentName('');
                  setExistingRsvp(null);
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
              <div className="mt-4 p-4 bg-primary/5 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <User className="h-5 w-5 text-primary" />
                  <span className="text-neutral-dark font-medium">{studentName}</span>
                </div>
                {existingRsvp && (
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <p>
                      You've already RSVP'd as{' '}
                      <span className={`font-semibold ${
                        existingRsvp.status === 'attending' 
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}>
                        {existingRsvp.status === 'attending' 
                          ? `attending with ${existingRsvp.guests} ${existingRsvp.guests === 1 ? 'guest' : 'guests'}`
                          : 'not attending'
                        }
                      </span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {verified && (
            <>
              <div className="mb-6">
                <h3 className="text-xl text-neutral-dark mb-4">
                  {existingRsvp ? 'Update RSVP Status' : 'Will you attend?'}
                </h3>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setStatus('attending')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      status === 'attending'
                        ? 'bg-green text-white'
                        : 'bg-neutral-light text-neutral-dark hover:bg-green-50'
                    }`}
                  >
                    Yes, I'll be there
                  </button>
                  <button
                    onClick={() => setStatus('not_attending')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      status === 'not_attending'
                        ? 'bg-red-600 text-white'
                        : 'bg-neutral-light text-neutral-dark hover:bg-red-50'
                    }`}
                  >
                    No, I can't make it
                  </button>
                </div>
              </div>

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
                            ? 'border-green bg-green text-white'
                            : 'border-neutral-dark/20 text-neutral-dark hover:border-green-600'
                        }`}
                      >
                        {num}
                        {guests === num && (
                          <Check className="absolute -top-2 -right-2 h-4 w-4 text-green-600 bg-white rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
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
              disabled={!verified}
            >
              {existingRsvp ? 'Update RSVP' : 'Confirm RSVP'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}