import { NextRequest } from 'next/server';
import { EmailTemplate } from '@/email/EmailTemplate';
import { Resend } from 'resend';

export async function POST(req:Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body=await req.json();

    const { data, error } = await resend.emails.send({
      from: 'RR Food Products <noreply@rrfoodproducts.com>',
      to: [process.env.MAIL_TO as string],
      subject: 'Hello world',
      react: EmailTemplate({...body}),
    });
    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}