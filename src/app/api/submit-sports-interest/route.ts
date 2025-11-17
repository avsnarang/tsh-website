import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { createAdminSupabaseClient } from '@/lib/supabase-server';
import { getPostHogClient } from '@/lib/posthog-server';

interface SportsInterestData {
  sportName: string;
  sportId: string;
  admissionNumber: string;
  studentName: string;
  class: string;
  hasConsent: boolean;
}

const notion = new Client({
  auth: process.env.NOTION_TOKEN
});

export async function POST(request: NextRequest) {
  const posthog = getPostHogClient();

  try {
    const data: SportsInterestData = await request.json();
    const supabase = createAdminSupabaseClient();
    
    // Verify student first
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('*')
      .eq('admission_number', data.admissionNumber)
      .single();

    if (studentError || !student) {
      posthog.capture({
        distinctId: data.admissionNumber,
        event: 'api_error_occurred',
        properties: {
          error_type: 'student_not_found',
          admission_number: data.admissionNumber,
          sport_name: data.sportName,
        },
      });
      await posthog.shutdown();

      return NextResponse.json(
        {
          success: false,
          message: 'Student not found'
        },
        { status: 404 }
      );
    }

    // Submit to Notion
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_SPORTS_DATABASE_ID!
      },
      properties: {
        'Sport': {
          title: [{ text: { content: data.sportName } }]
        },
        'Sport ID': {
          rich_text: [{ text: { content: data.sportId } }]
        },
        'Admission Number': {
          rich_text: [{ text: { content: data.admissionNumber } }]
        },
        'Student Name': {
          rich_text: [{ text: { content: data.studentName } }]
        },
        'Class': {
          rich_text: [{ text: { content: data.class } }]
        },
        'Parental Consent': {
          checkbox: data.hasConsent
        },
        'Status': {
          select: { name: 'Pending Review' }
        }
      }
    });

    // Capture successful sports interest submission
    posthog.capture({
      distinctId: data.admissionNumber,
      event: 'sports_interest_submitted',
      properties: {
        sport_name: data.sportName,
        sport_id: data.sportId,
        student_class: data.class,
        has_consent: data.hasConsent,
      },
    });
    await posthog.shutdown();

    return NextResponse.json({
      success: true,
      message: 'Successfully submitted',
      data: response
    });
  } catch (error) {
    console.error('API Error:', error);

    // Capture API error
    posthog.capture({
      distinctId: 'unknown',
      event: 'api_error_occurred',
      properties: {
        error_type: 'submission_failed',
        error_message: error instanceof Error ? error.message : 'Unknown error',
      },
    });
    await posthog.shutdown();

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}

