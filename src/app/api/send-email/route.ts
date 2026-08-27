import { NextRequest, NextResponse } from "next/server";
import * as React from "react";
import { EmailTemplate } from "@/email/EmailTemplate";
import { Resend } from "resend";
import { getClientIp, checkRateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);

    // Basic rate limit check for consumer feedback
    const rateLimit = await checkRateLimit(clientIp, {
      maxRequests: 10,
      windowMs: 15 * 60 * 1000,
    });

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();

    if (!body.name || !body.contactNo || !body.message) {
      return NextResponse.json(
        { error: "Name, contact number, and message are required fields." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.MAIL_TO || "info@tajachanachur.com";
    const senderEmail = process.env.MAIL_FROM || "Taja Chanachur Desk <noreply@rrfoodproducts.com>";

    const location = body.city || body.address || "Website";
    const subject = `[Taja Query] New Message from ${body.name} (${location})`;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const emailElement = React.createElement(EmailTemplate, {
        name: body.name,
        contactNo: body.contactNo,
        email: body.email,
        city: body.city,
        address: body.address,
        message: body.message,
        gstNumber: body.gstNumber,
        businessName: body.businessName,
        submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      });

      const { data, error } = await resend.emails.send({
        from: senderEmail,
        to: [recipientEmail],
        subject: subject,
        react: emailElement as React.ReactElement,
      });

      if (error) {
        console.error("Resend send email error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, data });
    }

    // In development or when API key is pending, acknowledge successfully
    return NextResponse.json({
      success: true,
      message: "Query logged (dev mode).",
    });
  } catch (error: any) {
    console.error("Send email route exception:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}