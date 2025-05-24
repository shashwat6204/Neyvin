import nodemailer from "nodemailer";
import fs from "fs";

export async function sendCvEmail(filePath: string, filename: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,  // Gmail App Password (2FA enabled)
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Or your HR email here
    subject: "New CV Submission",
    text: "A candidate has submitted their CV.",
    attachments: [
      {
        filename,
        content: fs.createReadStream(filePath),
      },
    ],
  });
}
