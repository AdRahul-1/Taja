import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { Resend } from "resend";

const DistributorInquirySchema = z.object({
  businessName: z.string().min(3, "Business Name must be at least 3 characters."),
  contactPerson: z.string().min(3, "Contact Person name is required."),
  contactNo: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Contact number must be a valid 10-digit Indian mobile number."),
  email: z.string().email("Invalid email address.").optional().or(z.literal("")),
  gstNumber: z
    .string()
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Invalid Indian GSTIN format (e.g. 19ABCDE1234F1Z5)."
    ),
  state: z.string().min(2, "State/Territory is required."),
  city: z.string().min(2, "City/District is required."),
  volumeTier: z.enum([
    "TIER_1_50_CASES",
    "TIER_2_200_CASES",
    "TIER_3_SUPER_STOCKIST",
  ]),
  notes: z.string().optional().or(z.literal("")),
  // Honeypot field for bot detection
  _hp_company_url: z.string().optional(),
  // Client submission start timestamp for bot detection
  _submission_start: z.number().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);

    // 1. Rate Limiting Check (Max 5 requests per 15 min per IP)
    const rateLimit = await checkRateLimit(clientIp, {
      maxRequests: 5,
      windowMs: 15 * 60 * 1000,
    });

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "Too many distributor inquiries from this network. Please try again in a few minutes or call our desk directly.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Honeypot check (Bots fill hidden fields)
    if (body._hp_company_url && body._hp_company_url.trim().length > 0) {
      // Silently accept to trap bot without alerting
      return NextResponse.json({ success: true, message: "Inquiry recorded." });
    }

    // 3. Timing check (Submissions faster than 2.0 seconds are automated bots)
    if (body._submission_start && Date.now() - Number(body._submission_start) < 2000) {
      return NextResponse.json({ success: true, message: "Inquiry recorded." });
    }

    // 4. Zod Schema Validation
    const parsed = DistributorInquirySchema.safeParse(body);
    if (!parsed.success) {
      const errorMsg = parsed.error.issues[0]?.message || "Invalid input data.";
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const data = parsed.data;

    // 5. Send Notification via Resend (or fallback log)
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.MAIL_TO || "info@tajachanachur.com";

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: "Taja Distributor Desk <noreply@tajachanachur.com>",
        to: [recipientEmail],
        subject: `[B2B LEAD] New Distributor Enquiry: ${data.businessName} (${data.state})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #C9982E; background: #FBF3E7; color: #241C15;">
            <h2 style="color: #142B54; border-bottom: 2px solid #C9982E; padding-bottom: 8px;">Taja Chanachur — Distributor / Bulk Inquiry</h2>
            <p><strong>Business Name:</strong> ${data.businessName}</p>
            <p><strong>GSTIN:</strong> <span style="font-family: monospace; background: #fff; padding: 2px 6px; border: 1px solid #ccc;">${data.gstNumber}</span></p>
            <p><strong>Contact Person:</strong> ${data.contactPerson}</p>
            <p><strong>Contact Phone:</strong> <a href="tel:${data.contactNo}">${data.contactNo}</a></p>
            <p><strong>Email:</strong> ${data.email || "N/A"}</p>
            <p><strong>Location:</strong> ${data.city}, ${data.state}</p>
            <p><strong>Anticipated Volume Tier:</strong> ${data.volumeTier}</p>
            <p><strong>Additional Notes:</strong> ${data.notes || "None provided"}</p>
            <hr style="border: 0; border-top: 1px solid #C9982E; margin: 20px 0;" />
            <p style="font-size: 11px; color: #666;">Source IP: ${clientIp} | Timestamp: ${new Date().toISOString()}</p>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Your distributor enquiry has been successfully registered. Our sales desk will contact you within 24 hours.",
    });
  } catch (error) {
    console.error("Distributor inquiry API error:", error);
    return NextResponse.json(
      { error: "Internal error processing distributor enquiry. Please contact support." },
      { status: 500 }
    );
  }
}
