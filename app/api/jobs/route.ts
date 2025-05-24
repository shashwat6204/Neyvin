import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  createdAt: string;
  isActive: boolean;
}

const jobsFilePath = path.join(process.cwd(), "data", "jobs.json");

async function readJobs(): Promise<Job[]> {
  try {
    const data = await fs.readFile(jobsFilePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeJobs(jobs: Job[]): Promise<void> {
  await fs.writeFile(jobsFilePath, JSON.stringify(jobs, null, 2), "utf-8");
}

export async function GET() {
  const jobs = await readJobs();
  return NextResponse.json(jobs);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (
      !data.title ||
      !data.department ||
      !data.location ||
      !data.type ||
      !data.experience ||
      !data.description
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const jobs = await readJobs();

    const newJob: Job = {
      id: jobs.length ? jobs[jobs.length - 1].id + 1 : 1,
      title: data.title,
      department: data.department,
      location: data.location,
      type: data.type,
      experience: data.experience,
      description: data.description,
      createdAt: new Date().toISOString(),
      isActive: true,
    };

    jobs.unshift(newJob);

    await writeJobs(jobs);

    return NextResponse.json(newJob, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return NextResponse.json({ error: "Missing job id" }, { status: 400 });
    }

    const id = Number(idParam);

    let jobs = await readJobs();

    jobs = jobs.filter((job) => job.id !== id);

    await writeJobs(jobs);

    return NextResponse.json({ message: "Job deleted" });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
