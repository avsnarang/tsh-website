import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: 'TSH Website <noreply@messages.tsh.edu.in>',
      to: ['info@tsh.edu.in'],
      replyTo: data.email,
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #00501B 0%, #003012 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0;">From The Scholars' Home Website</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e9ecef; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; color: #6c757d; width: 120px;">Name:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; color: #212529; font-weight: 500;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; color: #6c757d;">Email:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">
                  <a href="mailto:${data.email}" style="color: #00501B; text-decoration: none;">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; color: #6c757d;">Phone:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; color: #212529;">
                  ${data.phone ? `<a href="tel:${data.phone}" style="color: #00501B; text-decoration: none;">${data.phone}</a>` : 'Not provided'}
                </td>
              </tr>
            </table>
            
            <div style="margin-top: 24px;">
              <p style="color: #6c757d; margin: 0 0 8px 0; font-size: 14px;">Message:</p>
              <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #dee2e6;">
                <p style="margin: 0; color: #212529; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
              </div>
            </div>
          </div>
          
          <p style="color: #6c757d; font-size: 12px; text-align: center; margin-top: 20px;">
            This email was sent from the contact form on tsh.edu.in
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}

Message:
${data.message}

---
This email was sent from the contact form on tsh.edu.in
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

