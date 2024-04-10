import nodemailer from 'nodemailer'
import Env from "./env";

export const transporter = nodemailer.createTransport({
  host: Env.SMTP_HOST,
  port: Number(Env.SMTP_PORT),
  secure: false,
  auth: {
    user: Env.SMTP_USER,
    pass: Env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: Env.EMAIL_FROM,
      to: to,
      subject: subject,
      html: html,
    });
    return info ? info.messageId : null;
  } catch (error) {
    console.error('Error sending email:', error);
    return null;
  }
};