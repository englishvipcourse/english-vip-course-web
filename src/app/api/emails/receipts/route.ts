import { Resend } from 'resend';
import React from 'react';
import { WaitlistEmail } from '@/emails/receipts';
import { Student } from '@/emails/student';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, mail, number } = await request.json();

    // Send the email via Resend API to the school
    const school = await resend.emails.send({
      from: 'contato@fluencylab.me',
      to: 'matheusmb77@outlook.com', // Your email
      subject: `${name} agendou uma aula`,
      react: React.createElement(WaitlistEmail, { name, number, mail }), // Pass the form data to the email template
    });

    // Send the email via Resend API to the student that filled the form
    const student = await resend.emails.send({
      from: 'contato@fluencylab.me',
      to: mail, // Your email
      subject: 'English Vip Course - Aula Agendada',
      react: React.createElement(Student, { name }), // Pass the form data to the email template
    });

    return new Response(JSON.stringify({ success: true, school, student }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error sending email via Resend:', error);

    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
