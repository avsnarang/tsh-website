interface SportsInterestData {
  sportId: string;
  sportName: string;
  admissionNumber: string;
  studentName: string;
  class: string;
  hasConsent: boolean;
}

interface SubmissionResponse {
  message: string;
  success: boolean;
  data?: any;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

export async function submitSportsInterest(data: SportsInterestData): Promise<SubmissionResponse> {
  try {
    const response = await fetch(`${API_URL}/api/submit-sports-interest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include' // Add this for cookies if needed
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit');
    }

    return await response.json();
  } catch (error: any) {
    console.error('Error submitting to Notion:', error);
    throw new Error(error.message || 'Failed to submit to Notion');
  }
}