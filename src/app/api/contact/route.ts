import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as z from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

// Match frontend schema, but English only since it's backend validation
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request body
    const validatedData = contactSchema.parse(body);

    const { name, email, message } = validatedData;

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Atonize Contact Form <onboarding@resend.dev>', // Required default for sandbox
      to: 'jovanivezic@gmail.com', // Replace with verified recipient or owner's email
      replyTo: email,
      subject: `New Project Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0b1120;">New Project Inquiry</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <h3 style="color: #666; font-size: 14px; text-transform: uppercase;">Message</h3>
          <p style="white-space: pre-wrap; line-height: 1.5;">${message}</p>
        </div>
      `,
    });

    if (data.error) {
      console.error('Resend Error:', data.error);
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
