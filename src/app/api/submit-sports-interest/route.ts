import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { createAdminSupabaseClient } from '@/lib/supabase-server';

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

    return NextResponse.json({
      success: true,
      message: 'Successfully submitted',
      data: response
    });
  } catch (error) {
    console.error('API Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}

