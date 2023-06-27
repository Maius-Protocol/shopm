import nodemailer from "nodemailer";

export interface MailInterface {
  from?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  text?: string;
  html: string;
  attachments?: any[];
}

export const sendEmail = async (
  requestId: string | number | string[],
  options: MailInterface
) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    logger: true,
  });

  let info = await transporter.sendMail({
    from: `${process.env.SMTP_SENDER || options.from}`,
    to: options.to,
    cc: options.cc,
    bcc: options.bcc,
    subject: options.subject,
    text: options.text,
    html: options.html,
    attachments: options.attachments,
  });

  return info;
};
