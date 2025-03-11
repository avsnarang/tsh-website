import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import NotionDropdown from '../ui/NotionDropdown';
import { Building } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  description?: string;
  location?: string;
  event_type: string;
  branch: string;
  session: string;
  is_public: boolean;
  synced_with_google: boolean;
  google_event_id?: string;
  is_all_day: boolean;
}

interface EventModalProps {
  event: CalendarEvent | null;
  onClose: () => void;
  onSave: (eventData: any) => Promise<void>;
  onDelete: (eventId: string) => void;
}

interface EventTypeOption {
  value: string;
  label: string;
}

const branchOptions = [
  { value: 'All Campuses', label: 'All Campuses', icon: <Building className="h-4 w-4 text-green-500" /> },
  { value: 'TSH, Paonta Sahib', label: 'TSH, Paonta Sahib', icon: <Building className="h-4 w-4 text-blue-500" /> },
  { value: 'TSH, Juniors', label: 'TSH, Juniors', icon: <Building className="h-4 w-4 text-purple-500" /> },
  { value: 'TSH, Majra', label: 'TSH, Majra', icon: <Building className="h-4 w-4 text-orange-500" /> },
];

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export default function EventModal({ event, onClose, onSave, onDelete }: EventModalProps) {
  const [eventTypeOptions, setEventTypeOptions] = useState<EventTypeOption[]>([]);
  const [sessionOptions, setSessionOptions] = useState<EventTypeOption[]>([
    { value: '2023-24', label: '2023-24' },
    { value: '2024-25', label: '2024-25' },
    { value: '2025-26', label: '2025-26' }
  ]);

  useEffect(() => {
    const fetchEventTypes = async () => {
      // Log the query attempt
      console.log('Fetching event types...');
      
      const { data, error } = await supabase
        .from('event_types')
        .select('*');
      
      if (error) {
        console.error('Error fetching event types:', error);
        return;
      }

      // Log the retrieved data
      console.log('Retrieved event types:', data);

      setEventTypeOptions(data.map(type => ({
        value: type.value,
        label: type.label
      })));

      // If no event type is selected, set the first available one as default
      if (!formData.event_type && data.length > 0) {
        setFormData(prev => ({ ...prev, event_type: data[0].value }));
      }
    };

    fetchEventTypes();
  }, []);

  const handleAddEventType = async (label: string) => {
    try {
      const newValue = label.toLowerCase().replace(/\s+/g, '-');
      const newOption = {
        value: newValue,
        label: label,
        icon_type: 'tag' // Default icon type
      };

      // Save to Supabase
      const { error } = await supabase
        .from('event_types')
        .insert([newOption]);

      if (error) throw error;

      // Update local state
      setEventTypeOptions(prev => [...prev, {
        value: newValue,
        label: label
      }]);
      setFormData(prev => ({ ...prev, event_type: newValue }));
    } catch (err) {
      console.error('Error saving new event type:', err);
      alert(`Failed to add event type: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleAddSession = async (label: string) => {
    try {
      // Validate session format (YYYY-YY)
      const sessionRegex = /^20\d{2}-\d{2}$/;
      if (!sessionRegex.test(label)) {
        throw new Error('Session must be in format YYYY-YY (e.g., 2025-26)');
      }

      const newOption = {
        value: label,
        label: label
      };

      // Save to Supabase
      const { error } = await supabase
        .from('academic_sessions')
        .insert([newOption]);

      if (error) throw error;

      // Update local state
      setSessionOptions(prev => [...prev, newOption]);
      setFormData(prev => ({ ...prev, session: label }));
    } catch (err) {
      console.error('Error saving new session:', err);
      // You might want to show this error to the user
      alert((err as Error).message || 'Failed to add new session');
    }
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0],
    start_time: '09:00',
    end_time: '17:00',
    is_all_day: false,
    location: '',
    event_type: 'academic',
    branch: 'All Campuses',
    session: '2023-24',
    is_public: false
  });

  useEffect(() => {
    if (event) {
      const startDate = new Date(event.start_time);
      const endDate = new Date(event.end_time);
      
      // Use the is_all_day property from the event directly instead of calculating it
      const isAllDay = event.is_all_day;

      setFormData({
        title: event.title,
        description: event.description || '',
        is_all_day: isAllDay,
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
        start_time: isAllDay ? '09:00' : `${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}`,
        end_time: isAllDay ? '17:00' : `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`,
        location: event.location || '',
        event_type: event.event_type,
        branch: event.branch,
        session: event.session,
        is_public: event.is_public
      });
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Construct event data with UTC dates
      const eventData = {
        title: formData.title.trim(),
        description: (formData.description || '').trim(),
        start_time: formData.is_all_day 
          ? `${formData.start_date}T00:00:00Z`  // Midnight UTC for all-day events
          : `${formData.start_date}T${formData.start_time}:00Z`,
        end_time: formData.is_all_day 
          ? `${formData.end_date}T23:59:59Z`    // End of day UTC for all-day events
          : `${formData.end_date}T${formData.end_time}:00Z`,
        location: (formData.location || '').trim(),
        event_type: formData.event_type,
        branch: formData.branch,
        session: formData.session,
        is_public: Boolean(formData.is_public),
        synced_with_google: false,
        is_all_day: formData.is_all_day  // Add this field to track all-day status
      };

      console.log('Attempting to save event data:', eventData);

      const { data, error: supabaseError } = await supabase
        .from('calendar_events')
        .insert([eventData])
        .select()
        .single();

      if (supabaseError) {
        console.error('Supabase error details:', supabaseError);
        throw new Error(`Database error: ${supabaseError.message}`);
      }

      console.log('Successfully saved event:', data);
      await onSave(data);
      onClose();
      
    } catch (err) {
      console.error('Error details:', err);
      alert(`Failed to save event: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-neutral-dark">
            {event ? 'Edit Event' : 'Add New Event'}
          </h2>
          <div className="flex gap-2">
            {event && (
              <button
                onClick={() => onDelete(event.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
              >
                Delete
              </button>
            )}
            <button onClick={onClose} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-dark/10"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-dark/10 h-32"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_all_day"
                  checked={formData.is_all_day}
                  onChange={(e) => setFormData({ ...formData, is_all_day: e.target.checked })}
                  className="rounded border-neutral-dark/10"
                />
                <label htmlFor="is_all_day" className="text-sm text-neutral-dark">
                  All Day Event
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-dark mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border-2 border-neutral-dark/10"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-dark mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border-2 border-neutral-dark/10"
                    required
                  />
                </div>

                {!formData.is_all_day && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark mb-2">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={formData.start_time}
                        onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border-2 border-neutral-dark/10"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-dark mb-2">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={formData.end_time}
                        onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border-2 border-neutral-dark/10"
                        required
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-2 border-neutral-dark/10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                Event Type
              </label>
              <NotionDropdown
                value={formData.event_type}
                onChange={(value) => setFormData({ ...formData, event_type: value })}
                options={eventTypeOptions}
                placeholder="Select event type"
                allowAdditions={true}
                onAddOption={handleAddEventType}
                searchable={true}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                Branch
              </label>
              <NotionDropdown
                value={formData.branch}
                onChange={(value) => setFormData({ ...formData, branch: value })}
                options={branchOptions}
                placeholder="Select branch"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-dark mb-2">
                Session
              </label>
              <NotionDropdown
                value={formData.session}
                onChange={(value) => setFormData({ ...formData, session: value })}
                options={sessionOptions}
                placeholder="Select session"
                allowAdditions={true}
                onAddOption={handleAddSession}
                searchable={true}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_public}
                onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })}
                className="rounded border-neutral-dark/10"
              />
              <label className="text-sm text-neutral-dark">
                Make this event public
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl border-2 border-neutral-dark/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-green text-white"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
