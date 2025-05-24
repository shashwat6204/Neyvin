import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { writeFile } from 'fs/promises';
import path from 'path';
import os from 'os';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const jobTitle = formData.get('jobTitle') as string;
    const jobId = formData.get('jobId') as string;
    const file = formData.get('resume') as File;

    // Validate the input
    if (!name || !email || !jobTitle || !jobId) {
      return NextResponse.json(
        { error: 'Please fill in all fields' },
        { status: 400 }
      );
    }

    let attachments = [];

    // Handle resume file if provided
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Save file to temp directory
      const tempDir = os.tmpdir();
      const filePath = path.join(tempDir, file.name);
      await writeFile(filePath, buffer);

      attachments.push({
        filename: file.name,
        path: filePath
      });
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Using the same email as other communications
      subject: `New Job Application: ${jobTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #2563eb;">New Job Application</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Position:</strong> ${jobTitle}</p>
            <p><strong>Job ID:</strong> ${jobId}</p>
            <p><strong>Applicant Name:</strong> ${name}</p>
            <p><strong>Applicant Email:</strong> ${email}</p>
            ${file ? `<p><strong>Resume:</strong> Attached (${file.name})</p>` : '<p><strong>Resume:</strong> Not provided</p>'}
          </div>
        </div>
      `,
      attachments
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Application submitted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Job application error:', error);
    return NextResponse.json(
      { error: 'Error submitting application. Please try again.' },
      { status: 500 }
    );
  }
} 