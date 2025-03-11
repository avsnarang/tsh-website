import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { google } from 'npm:googleapis';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { events } = await req.json();

    const auth = new google.auth.JWT({
      email: Deno.env.get('GOOGLE_SERVICE_ACCOUNT_EMAIL'),
      key: Deno.env.get('GOOGLE_PRIVATE_KEY'),
      scopes: ['https://www.googleapis.com/auth/calendar']
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const results = await Promise.all(
      events.map(async (event: any) => {
        try {
          const response = await calendar.events.insert({
            calendarId: Deno.env.get('GOOGLE_CALENDAR_ID'),
            requestBody: {
              summary: event.title,
              description: event.description,
              location: event.location,
              start: { dateTime: event.start },
              end: { dateTime: event.end }
            }
          });

          return {
            success: true,
            eventId: event.id,
            googleEventId: response.data.id
          };
        } catch (error) {
          return {
            success: false,
            eventId: event.id,
            error: error.message
          };
        }
      })
    );

    return new Response(
      JSON.stringify(results),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
