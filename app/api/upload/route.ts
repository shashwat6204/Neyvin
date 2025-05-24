import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { writeFile } from "fs/promises";
import path from "path";
import os from "os";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, file.name);

    await writeFile(filePath, buffer);

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New CV Submission",
      text: "A new CV has been submitted.",
      attachments: [
        {
          filename: file.name,
          path: filePath,
        },
      ],
    });

    return NextResponse.json({ message: "CV sent successfully!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to upload and send CV." }, { status: 500 });
  }
}
