import * as React from "react";

export interface EmailTemplateProps {
  name: string;
  contactNo: string;
  email?: string;
  city?: string;
  address?: string;
  message: string;
  gstNumber?: string;
  businessName?: string;
  submittedAt?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  contactNo,
  email,
  city,
  address,
  message,
  gstNumber,
  businessName,
  submittedAt,
}) => {
  const location = city || address || "Not Specified";
  const timestamp = submittedAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  return (
    <div
      style={{
        backgroundColor: "#f4f6f9",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        margin: "0",
        padding: "30px 15px",
        color: "#241C15",
      }}
    >
      <table
        align="center"
        border={0}
        cellPadding={0}
        cellSpacing={0}
        width="100%"
        style={{
          maxWidth: "600px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(20, 43, 84, 0.08)",
          border: "1px solid #e5cca0",
        }}
      >
        {/* Header Banner in Theme A Navy & Gold */}
        <tbody>
          <tr>
            <td
              style={{
                backgroundColor: "#142B54",
                padding: "28px 30px",
                textAlign: "center",
                borderBottom: "4px solid #C9982E",
              }}
            >
              <table align="center" border={0} cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    <td style={{ textAlign: "center" }}>
                      <h1
                        style={{
                          margin: "0",
                          color: "#FBF3E7",
                          fontSize: "24px",
                          fontWeight: "700",
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          fontFamily: "Georgia, serif",
                        }}
                      >
                        TAJA CHANACHUR
                      </h1>
                      <p
                        style={{
                          margin: "6px 0 0 0",
                          color: "#C9982E",
                          fontSize: "12px",
                          fontWeight: "600",
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                        }}
                      >
                        New Customer Query &amp; Feedback
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Quick Notice Tag */}
          <tr>
            <td style={{ padding: "20px 30px 10px 30px" }}>
              <div
                style={{
                  backgroundColor: "#FBF3E7",
                  border: "1px solid #C9982E",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  fontSize: "13px",
                  color: "#241C15",
                  lineHeight: "1.5",
                }}
              >
                <strong style={{ color: "#B91C1C" }}>Notice:</strong> A new consumer enquiry has been
                submitted via the official website (<code>tajachanachur.com</code>).
              </div>
            </td>
          </tr>

          {/* Customer Details Table */}
          <tr>
            <td style={{ padding: "10px 30px 20px 30px" }}>
              <h2
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#142B54",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  margin: "15px 0 10px 0",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "6px",
                }}
              >
                Customer Contact Details
              </h2>

              <table
                width="100%"
                border={0}
                cellPadding={0}
                cellSpacing={0}
                style={{
                  fontSize: "14px",
                  borderCollapse: "collapse",
                }}
              >
                <tbody>
                  {/* Customer Name */}
                  <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td
                      style={{
                        padding: "10px 0",
                        color: "#6e5d4e",
                        fontWeight: "600",
                        width: "35%",
                      }}
                    >
                      Customer Name:
                    </td>
                    <td style={{ padding: "10px 0", color: "#241C15", fontWeight: "700" }}>
                      {name}
                    </td>
                  </tr>

                  {/* Phone Number */}
                  <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td
                      style={{
                        padding: "10px 0",
                        color: "#6e5d4e",
                        fontWeight: "600",
                      }}
                    >
                      Phone Number:
                    </td>
                    <td style={{ padding: "10px 0" }}>
                      <a
                        href={`tel:${contactNo}`}
                        style={{
                          color: "#B91C1C",
                          fontWeight: "700",
                          textDecoration: "none",
                        }}
                      >
                        {contactNo}
                      </a>
                    </td>
                  </tr>

                  {/* Email (if available) */}
                  {email && (
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td
                        style={{
                          padding: "10px 0",
                          color: "#6e5d4e",
                          fontWeight: "600",
                        }}
                      >
                        Email Address:
                      </td>
                      <td style={{ padding: "10px 0" }}>
                        <a
                          href={`mailto:${email}`}
                          style={{
                            color: "#142B54",
                            textDecoration: "underline",
                          }}
                        >
                          {email}
                        </a>
                      </td>
                    </tr>
                  )}

                  {/* Location */}
                  <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td
                      style={{
                        padding: "10px 0",
                        color: "#6e5d4e",
                        fontWeight: "600",
                      }}
                    >
                      City / Location:
                    </td>
                    <td style={{ padding: "10px 0", color: "#241C15" }}>{location}</td>
                  </tr>

                  {/* Business Name (if provided) */}
                  {businessName && (
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td
                        style={{
                          padding: "10px 0",
                          color: "#6e5d4e",
                          fontWeight: "600",
                        }}
                      >
                        Business Name:
                      </td>
                      <td style={{ padding: "10px 0", color: "#241C15", fontWeight: "600" }}>
                        {businessName}
                      </td>
                    </tr>
                  )}

                  {/* GSTIN (if provided) */}
                  {gstNumber && (
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td
                        style={{
                          padding: "10px 0",
                          color: "#6e5d4e",
                          fontWeight: "600",
                        }}
                      >
                        GSTIN:
                      </td>
                      <td style={{ padding: "10px 0" }}>
                        <span
                          style={{
                            fontFamily: "monospace",
                            backgroundColor: "#f0f4f8",
                            padding: "3px 6px",
                            borderRadius: "4px",
                            border: "1px solid #d0dbe5",
                            color: "#142B54",
                            fontWeight: "700",
                          }}
                        >
                          {gstNumber}
                        </span>
                      </td>
                    </tr>
                  )}

                  {/* Received Time */}
                  <tr>
                    <td
                      style={{
                        padding: "10px 0",
                        color: "#6e5d4e",
                        fontWeight: "600",
                      }}
                    >
                      Received Time:
                    </td>
                    <td style={{ padding: "10px 0", color: "#777", fontSize: "12px" }}>
                      {timestamp} (IST)
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Customer Message Box */}
          <tr>
            <td style={{ padding: "0 30px 25px 30px" }}>
              <h2
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#142B54",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  margin: "0 0 10px 0",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "6px",
                }}
              >
                Customer Message &amp; Query
              </h2>

              <div
                style={{
                  backgroundColor: "#FBF3E7",
                  borderLeft: "4px solid #C9982E",
                  borderRadius: "4px 8px 8px 4px",
                  padding: "16px 20px",
                  fontSize: "15px",
                  lineHeight: "1.6",
                  color: "#241C15",
                  fontStyle: "italic",
                  whiteSpace: "pre-wrap",
                }}
              >
                &ldquo;{message}&rdquo;
              </div>
            </td>
          </tr>

          {/* Direct Action Buttons */}
          <tr>
            <td style={{ padding: "0 30px 30px 30px", textAlign: "center" }}>
              <table align="center" border={0} cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    <td style={{ paddingRight: "10px" }}>
                      <a
                        href={`tel:${contactNo}`}
                        style={{
                          backgroundColor: "#B91C1C",
                          color: "#ffffff",
                          textDecoration: "none",
                          padding: "12px 22px",
                          borderRadius: "30px",
                          fontWeight: "700",
                          fontSize: "13px",
                          letterSpacing: "0.5px",
                          display: "inline-block",
                        }}
                      >
                        📞 Call Customer
                      </a>
                    </td>
                    {email && (
                      <td>
                        <a
                          href={`mailto:${email}?subject=Re: Your Query to Taja Chanachur`}
                          style={{
                            backgroundColor: "#142B54",
                            color: "#FBF3E7",
                            textDecoration: "none",
                            padding: "12px 22px",
                            borderRadius: "30px",
                            fontWeight: "700",
                            fontSize: "13px",
                            letterSpacing: "0.5px",
                            display: "inline-block",
                            border: "1px solid #C9982E",
                          }}
                        >
                          ✉️ Reply via Email
                        </a>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Footer Credentials */}
          <tr>
            <td
              style={{
                backgroundColor: "#142B54",
                padding: "20px 30px",
                textAlign: "center",
                color: "#FBF3E7",
                fontSize: "12px",
                lineHeight: "1.6",
              }}
            >
              <p style={{ margin: "0", fontWeight: "700", color: "#C9982E" }}>
                R.R. Food Products • Raniganj, West Bengal
              </p>
              <p style={{ margin: "4px 0 0 0", color: "#efdec0", fontSize: "11px" }}>
                FSSAI Central/State Lic. No. 12821013000000 | Estd. 2009
              </p>
              <p style={{ margin: "8px 0 0 0", color: "#a0aec0", fontSize: "10px" }}>
                This is an automated notification from tajachanachur.com. Please do not reply directly to this noreply address.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};