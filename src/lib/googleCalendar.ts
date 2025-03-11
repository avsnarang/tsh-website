import { google, calendar_v3 } from 'googleapis';
import { GOOGLE_CALENDAR_CONFIG } from '../config/googleServiceAccount';
import { supabase } from './supabase';
import { GaxiosPromise } from 'gaxios';

// Initialize the Google Calendar API client
const auth = new google.auth.JWT({
  email: GOOGLE_CALENDAR_CONFIG.SERVICE_ACCOUNT_EMAIL,
  key: GOOGLE_CALENDAR_CONFIG.PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/calendar']
});

// Type assertion to help TypeScript understand the API
const calendar = google.calendar({ version: 'v3', auth });
type CalendarEventsResource = {
  update: (params: calendar_v3.Params$Resource$Events$Update) => GaxiosPromise<calendar_v3.Schema$Event>;
  insert: (params: calendar_v3.Params$Resource$Events$Insert) => GaxiosPromise<calendar_v3.Schema$Event>;
  list: (params: calendar_v3.Params$Resource$Events$List) => GaxiosPromise<calendar_v3.Schema$Events>;
};
const typedCalendar = { events: calendar.events as unknown as CalendarEventsResource };

export interface CalendarEvent {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  description: string | null | undefined;
  location: string | null | undefined;
  event_type: string;
  branch: string;
  session: string;
  google_event_id?: string;
  synced_with_google?: boolean;
}

export async function* syncEventsWithGoogle(events: AsyncIterable<CalendarEvent>) {
  for await (const event of events) {
    try {
      let googleEvent: calendar_v3.Schema$Event;
      
      if (event.google_event_id) {
        // Update existing Google Calendar event
        const response = await typedCalendar.events.update({
          calendarId: GOOGLE_CALENDAR_CONFIG.CALENDAR_ID,
          eventId: event.google_event_id,
          requestBody: {
            summary: event.title,
            description: event.description || undefined,
            location: event.location || undefined,
            start: { dateTime: event.start_date },
            end: { dateTime: event.end_date },
            extendedProperties: {
              private: {
                eventType: event.event_type,
                branch: event.branch,
                session: event.session
              }
            }
          }
        });
        googleEvent = response.data;
      } else {
        // Create new Google Calendar event
        const response = await typedCalendar.events.insert({
          calendarId: GOOGLE_CALENDAR_CONFIG.CALENDAR_ID,
          requestBody: {
            summary: event.title,
            description: event.description || undefined,
            location: event.location || undefined,
            start: { dateTime: event.start_date },
            end: { dateTime: event.end_date },
            extendedProperties: {
              private: {
                eventType: event.event_type,
                branch: event.branch,
                session: event.session
              }
            }
          }
        });
        googleEvent = response.data;

        // Update local event with Google Calendar ID
        await supabase
          .from('calendar_events')
          .update({
            google_event_id: googleEvent.id,
            synced_with_google: true
          })
          .eq('id', event.id);
      }
      yield googleEvent;
    } catch (error) {
      console.error(`Error syncing event ${event.id}:`, error);
      throw error;
    }
  }
}

export async function fetchCalendarEvents(
  timeMin: Date,
  timeMax: Date,
  filters: {
    eventType?: string;
    branch?: string;
    session?: string;
  }
): Promise<CalendarEvent[]> {
  try {
    const response = await typedCalendar.events.list({
      calendarId: GOOGLE_CALENDAR_CONFIG.CALENDAR_ID,
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items?.map(event => ({
      id: event.id!,
      title: event.summary!,
      start_date: event.start?.dateTime || event.start?.date!,
      end_date: event.end?.dateTime || event.end?.date!,
      description: event.description || undefined,
      location: event.location || undefined,
      event_type: event.extendedProperties?.private?.eventType || 'All Events',
      branch: event.extendedProperties?.private?.branch || 'All Campuses',
      session: event.extendedProperties?.private?.session || '',
      synced_with_google: true,
      google_event_id: event.id || undefined
    })) || [];
    
    return events.filter((event): event is typeof event & { synced_with_google: true } => {
      if (filters.eventType && filters.eventType !== 'All Events' && 
          event.event_type !== filters.eventType) return false;
      if (filters.branch && filters.branch !== 'All Campuses' && 
          event.branch !== filters.branch) return false;
      if (filters.session && event.session !== filters.session) return false;
      return true;
    });

  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw error;
  }
}
