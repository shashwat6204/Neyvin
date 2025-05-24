import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'jobs.json');

export const runtime = 'nodejs';

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

// Helper function to read jobs from JSON file
async function readJobs(): Promise<Job[]> {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data) as Job[];
  } catch (error) {
    return [];
  }
}

// GET /api/jobs/[id] - Get a single job by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const jobs = await readJobs();
    const job = jobs.find(j => j.id === parseInt(params.id));

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job' },
      { status: 500 }
    );
  }
}

// DELETE /api/jobs/[id] - Delete a job by ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const jobs = await readJobs();
    const jobIndex = jobs.findIndex(j => j.id === parseInt(params.id));

    if (jobIndex === -1) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    jobs.splice(jobIndex, 1);
    await fs.writeFile(dataFilePath, JSON.stringify(jobs, null, 2));

    return NextResponse.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}
