const nodemailer = require('nodemailer');

// A self-contained function to generate the styled HTML for the email
const createStyledEmailHtml = ({ firstName, verificationCode }) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #0f172a; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">QuickCourt</h1>
      </div>
      <div style="padding: 40px 30px; background-color: white;">
        <h2 style="color: #1e293b; margin-bottom: 20px; font-size: 28px;">Welcome to QuickCourt, ${firstName}!</h2>
        <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
          Thank you for signing up! Please use the following verification code to complete your registration.
        </p>
        <div style="background-color: #f8fafc; border: 2px dashed #16a34a; border-radius: 8px; padding: 30px; text-align: center; margin-bottom: 30px;">
          <p style="color: #1e293b; font-size: 16px; margin-bottom: 15px; font-weight: 600;">Your verification code is:</p>
          <div style="font-size: 32px; font-weight: bold; color: #16a34a; letter-spacing: 8px; font-family: monospace;">
            ${verificationCode}
          </div>
        </div>
        <p style="color: #64748b; font-size: 14px; text-align: center;">This code will expire in 10 minutes.</p>
      </div>
      <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} QuickCourt. All rights reserved.</p>
      </div>
    </div>
  `;
};

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailHtml = createStyledEmailHtml({
    firstName: options.firstName || 'User',
    verificationCode: options.verificationCode,
  });

  const message = {
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: emailHtml,
  };

  await transporter.sendMail(message);
};

module.exports = sendEmail;