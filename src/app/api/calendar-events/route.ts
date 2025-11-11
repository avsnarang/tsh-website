import { NextRequest, NextResponse } from 'next/server';
import { fetchCalendarEvents } from '@/lib/googleCalendar';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get query parameters
    const timeMin = searchParams.get('timeMin');
    const timeMax = searchParams.get('timeMax');
    const eventType = searchParams.get('eventType') || undefined;
    const branch = searchParams.get('branch') || undefined;
    const session = searchParams.get('session') || undefined;

    // Validate required parameters
    if (!timeMin || !timeMax) {
      return NextResponse.json(
        {
          success: false,
          message: 'timeMin and timeMax are required'
        },
        { status: 400 }
      );
    }

    // Fetch events from Google Calendar
    const events = await fetchCalendarEvents(
      new Date(timeMin),
      new Date(timeMax),
      {
        eventType,
        branch,
        session
      }
    );

    return NextResponse.json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error('Calendar API Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch calendar events'
      },
      { status: 500 }
    );
  }
}
