import type * as React from "react"

interface VerificationEmailProps {
  firstName: string
  verificationCode: string
  verificationUrl: string
}

export const VerificationEmail: React.FC<VerificationEmailProps> = ({
  firstName,
  verificationCode,
  verificationUrl,
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
    {/* Header */}
    <div
      style={{
        backgroundColor: "#0f172a",
        padding: "20px",
        textAlign: "center" as const,
        borderRadius: "8px 8px 0 0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#16a34a",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Q
        </div>
        <h1 style={{ color: "white", margin: "0", fontSize: "24px" }}>QuickCourt</h1>
      </div>
    </div>

    {/* Main Content */}
    <div
      style={{
        backgroundColor: "white",
        padding: "40px 30px",
        borderRadius: "0 0 8px 8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ color: "#1e293b", marginBottom: "20px", fontSize: "28px" }}>Welcome to QuickCourt, {firstName}!</h2>

      <p style={{ color: "#64748b", fontSize: "16px", lineHeight: "1.6", marginBottom: "30px" }}>
        Thank you for signing up! To complete your registration and start booking amazing sports venues, please verify
        your email address.
      </p>

      {/* Verification Code Box */}
      <div
        style={{
          backgroundColor: "#f8fafc",
          border: "2px dashed #16a34a",
          borderRadius: "8px",
          padding: "30px",
          textAlign: "center" as const,
          marginBottom: "30px",
        }}
      >
        <p style={{ color: "#1e293b", fontSize: "16px", marginBottom: "15px", fontWeight: "600" }}>
          Your verification code is:
        </p>
        <div
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#16a34a",
            letterSpacing: "8px",
            fontFamily: "monospace",
            marginBottom: "15px",
          }}
        >
          {verificationCode}
        </div>
        <p style={{ color: "#64748b", fontSize: "14px", margin: "0" }}>This code will expire in 5 minutes</p>
      </div>

      {/* CTA Button */}
      <div style={{ textAlign: "center" as const, marginBottom: "30px" }}>
        <a
          href={verificationUrl}
          style={{
            backgroundColor: "#16a34a",
            color: "white",
            padding: "15px 30px",
            textDecoration: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            display: "inline-block",
            transition: "background-color 0.2s",
          }}
        >
          Verify Email Address
        </a>
      </div>

      {/* Alternative Instructions */}
      <div
        style={{
          backgroundColor: "#f1f5f9",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <p style={{ color: "#1e293b", fontSize: "14px", fontWeight: "600", marginBottom: "10px" }}>
          Can't click the button?
        </p>
        <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.5", margin: "0" }}>
          Copy and paste this link into your browser: <br />
          <a href={verificationUrl} style={{ color: "#16a34a", wordBreak: "break-all" }}>
            {verificationUrl}
          </a>
        </p>
      </div>

      {/* What's Next */}
      <div style={{ marginBottom: "30px" }}>
        <h3 style={{ color: "#1e293b", fontSize: "18px", marginBottom: "15px" }}>What's next?</h3>
        <ul style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.6", paddingLeft: "20px" }}>
          <li>Complete your profile setup</li>
          <li>Browse thousands of sports venues</li>
          <li>Book your favorite courts instantly</li>
          <li>Manage all your bookings in one place</li>
        </ul>
      </div>

      {/* Help Section */}
      <div
        style={{
          borderTop: "1px solid #e2e8f0",
          paddingTop: "20px",
          textAlign: "center" as const,
        }}
      >
        <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "10px" }}>Need help? We're here for you!</p>
        <p style={{ color: "#64748b", fontSize: "14px", margin: "0" }}>
          Contact us at{" "}
          <a href="mailto:support@quickcourt.com" style={{ color: "#16a34a" }}>
            support@quickcourt.com
          </a>{" "}
          or visit our{" "}
          <a href="https://quickcourt.com/help" style={{ color: "#16a34a" }}>
            Help Center
          </a>
        </p>
      </div>
    </div>

    {/* Footer */}
    <div
      style={{
        backgroundColor: "#f8fafc",
        padding: "20px",
        textAlign: "center" as const,
        borderRadius: "0 0 8px 8px",
      }}
    >
      <p style={{ color: "#64748b", fontSize: "12px", margin: "0 0 10px 0" }}>
        This email was sent to you because you signed up for QuickCourt.
      </p>
      <p style={{ color: "#64748b", fontSize: "12px", margin: "0" }}>© 2024 QuickCourt. All rights reserved.</p>
    </div>
  </div>
)

export default VerificationEmail
