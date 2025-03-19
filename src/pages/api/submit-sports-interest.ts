import { Router, RequestHandler } from 'express';
import { Client } from '@notionhq/client';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';

interface SportsInterestData {
  sportName: string;
  sportId: string;
  admissionNumber: string;
  studentName: string;
  class: string;
  hasConsent: boolean;
}

const router = Router();

// Configure CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'your-production-domain.com' 
    : 'http://localhost:5173',
  credentials: true
};

router.use(cors(corsOptions));

// Verify environment variables
if (!process.env.SUPABASE_URL) throw new Error('SUPABASE_URL is required');
if (!process.env.SUPABASE_SERVICE_KEY) throw new Error('SUPABASE_SERVICE_KEY is required');
if (!process.env.NOTION_TOKEN) throw new Error('NOTION_TOKEN is required');
if (!process.env.NOTION_SPORTS_DATABASE_ID) throw new Error('NOTION_SPORTS_DATABASE_ID is required');

const notion = new Client({
  auth: process.env.NOTION_TOKEN
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const handleSportsInterest: RequestHandler<{}, any, SportsInterestData> = async (req, res) => {
  try {
    const data = req.body;
    
    // Verify student first
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('*')
      .eq('admission_number', data.admissionNumber)
      .single();

    if (studentError || !student) {
      res.status(404).json({
        success: false,
        message: 'Student not found'
      });
      return;
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

    res.json({
      success: true,
      message: 'Successfully submitted',
      data: response
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

router.post('/', handleSportsInterest);

export default router;
