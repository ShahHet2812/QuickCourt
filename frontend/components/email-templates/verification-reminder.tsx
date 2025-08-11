import type * as React from "react"

interface VerificationReminderProps {
  firstName: string
  verificationUrl: string
  hoursLeft: number
}

export const VerificationReminder: React.FC<VerificationReminderProps> = ({
  firstName,
  verificationUrl,
  hoursLeft,
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
      <h2 style={{ color: "#1e293b", marginBottom: "20px", fontSize: "28px" }}>Don't miss out, {firstName}!</h2>

      <p style={{ color: "#64748b", fontSize: "16px", lineHeight: "1.6", marginBottom: "20px" }}>
        You're almost there! You just need to verify your email address to complete your QuickCourt registration.
      </p>

      {/* Urgency Notice */}
      <div
        style={{
          backgroundColor: "#fef3c7",
          border: "1px solid #f59e0b",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <p style={{ color: "#92400e", fontSize: "16px", fontWeight: "600", marginBottom: "10px" }}>
          ⏰ Time is running out!
        </p>
        <p style={{ color: "#92400e", fontSize: "14px", margin: "0" }}>
          Your verification link will expire in {hoursLeft} hours. Verify now to secure your account.
        </p>
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
          }}
        >
          Verify My Email Now
        </a>
      </div>

      {/* Benefits Reminder */}
      <div style={{ marginBottom: "30px" }}>
        <h3 style={{ color: "#1e293b", fontSize: "18px", marginBottom: "15px" }}>Once verified, you'll be able to:</h3>
        <ul style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.6", paddingLeft: "20px" }}>
          <li>🏟️ Book premium sports venues instantly</li>
          <li>💰 Access exclusive member discounts</li>
          <li>📱 Manage bookings from your dashboard</li>
          <li>🔔 Receive booking confirmations and reminders</li>
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
        <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "10px" }}>Having trouble? We're here to help!</p>
        <p style={{ color: "#64748b", fontSize: "14px", margin: "0" }}>
          Email us at{" "}
          <a href="mailto:support@quickcourt.com" style={{ color: "#16a34a" }}>
            support@quickcourt.com
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
        This is a reminder email for your QuickCourt account verification.
      </p>
      <p style={{ color: "#64748b", fontSize: "12px", margin: "0" }}>© 2024 QuickCourt. All rights reserved.</p>
    </div>
  </div>
)

export default VerificationReminder
