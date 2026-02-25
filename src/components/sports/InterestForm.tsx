import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { submitSportsInterest } from '../../lib/notion';
import { X, Loader2, CheckCircle2, ArrowRight, User, GraduationCap } from 'lucide-react';

interface FormStep {
  id: string;
  question: string;
  type: 'text' | 'number' | 'select' | 'consent';
}

const FORM_STEPS: FormStep[] = [
  {
    id: 'admission',
    question: 'What is your admission number?',
    type: 'text'
  },
  {
    id: 'consent',
    question: 'Do you have parental consent to participate in this sport?',
    type: 'consent'
  }
];

export default function InterestForm({ sportId, sportName, onClose }: {
  sportId: string;
  sportName: string;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    admissionNumber: '',
    studentName: '',
    class: '',
    hasConsent: false
  });
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');


  const verifyAdmissionNumber = async () => {
    if (!formData.admissionNumber.trim()) {
      setError('Please enter your admission number');
      return false;
    }

    setVerifying(true);
    setError('');

    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('admission_number', formData.admissionNumber.trim())
        .single();

      if (error) {
        setError('Student not found. Please check your admission number.');
        return false;
      }

      setFormData(prev => ({
        ...prev,
        studentName: data.full_name,
        class: data.class
      }));
      setVerified(true);


      return true;
    } catch (error) {
      setError('An error occurred while verifying. Please try again.');
      return false;
    } finally {
      setVerifying(false);
    }
  };

  const handleNext = async () => {
    if (currentStep === 0) {
      const isValid = await verifyAdmissionNumber();
      if (!isValid) return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const submitToNotion = async () => {
    if (!formData.hasConsent) {
      setError('Parental consent is required to participate');
      return;
    }

    if (!verified || !formData.studentName || !formData.class) {
      setError('Please verify your admission number first');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await submitSportsInterest({
        sportId,
        sportName,
        admissionNumber: formData.admissionNumber.trim(),
        studentName: formData.studentName,
        class: formData.class,
        hasConsent: formData.hasConsent
      });


      setSuccess('Successfully registered for ' + sportName);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'Failed to submit interest form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-100">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 bg-green-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display text-neutral-dark">
                {sportName}
              </h2>
              <p className="text-sm text-neutral-600 mt-1">
                Sports Interest Registration
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/50 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-neutral-dark" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-100 rounded-lg">
              <p className="text-sm text-green-600 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                {success}
              </p>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {currentStep === 0 ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-dark">
                      Student Verification
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <GraduationCap className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type="text"
                        value={formData.admissionNumber}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, admissionNumber: e.target.value }));
                          setVerified(false);
                          setError('');
                        }}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                          error ? 'border-red-400' : verified ? 'border-green-400' : 'border-neutral-200'
                        } focus:outline-hidden focus:ring-2 ${
                          error ? 'focus:ring-red-100' : 'focus:ring-green-100'
                        }`}
                        placeholder="Enter your admission number"
                        disabled={verifying}
                      />
                      {verifying && (
                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 animate-spin" />
                      )}
                      {verified && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  {verified && (
                    <div className="p-4 bg-green-50 rounded-lg space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-green-500" />
                        <p className="text-sm font-medium text-neutral-dark">
                          Verified Student Details
                        </p>
                      </div>
                      <div className="pl-7 space-y-1">
                        <p className="text-sm text-neutral-600">
                          <span className="font-medium">Name:</span> {formData.studentName}
                        </p>
                        <p className="text-sm text-neutral-600">
                          <span className="font-medium">Class:</span> {formData.class}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="consent"
                        checked={formData.hasConsent}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, hasConsent: e.target.checked }));
                          setError('');
                        }}
                        className="h-5 w-5 rounded border-neutral-300 text-green-500 focus:ring-green-200"
                      />
                      <label htmlFor="consent" className="text-neutral-dark text-sm">
                        I confirm that I have parental consent to participate in <span className="font-medium">{sportName}</span>
                      </label>
                    </div>
                  </div>
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-200 bg-neutral-50">
          <div className="flex justify-between">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-6 py-2.5 text-neutral-dark hover:bg-neutral-100 rounded-lg transition-colors"
                disabled={submitting}
              >
                Back
              </button>
            )}
            <button
              onClick={currentStep === FORM_STEPS.length - 1 ? submitToNotion : handleNext}
              disabled={verifying || submitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
            >
              {(verifying || submitting) ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {currentStep === FORM_STEPS.length - 1 ? 'Submit' : 'Next'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}