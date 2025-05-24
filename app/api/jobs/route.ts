import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

const dataFilePath = path.join(process.cwd(), 'data', 'jobs.json');
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Helper function to read jobs
async function readJobs() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

// Helper function to write jobs
async function writeJobs(jobs) {
  // Ensure the directory exists
  await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
  await fs.writeFile(dataFilePath, JSON.stringify(jobs, null, 2));
}

// Helper function to verify admin token
function verifyToken() {
  const token = cookies().get('admin_token')?.value;
  if (!token) {
    throw new Error('Unauthorized');
  }
  try {
    verify(token, JWT_SECRET);
    return true;
  } catch {
    throw new Error('Unauthorized');
  }
}

// GET /api/jobs - Get all jobs
export async function GET() {
  try {
    const jobs = await readJobs();
    // Sort by createdAt in descending order
    jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

// POST /api/jobs - Create a new job (Admin only)
export async function POST(request: Request) {
  try {
    // Verify admin token
    verifyToken();

    const body = await request.json();
    const jobs = await readJobs();
    
    const newJob = {
      id: jobs.length > 0 ? Math.max(...jobs.map(job => job.id)) + 1 : 1,
      title: body.title,
      department: body.department,
      location: body.location,
      type: body.type,
      experience: body.experience,
      description: body.description,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    jobs.push(newJob);
    await writeJobs(jobs);

    return NextResponse.json(newJob);
  } catch (error) {
    console.error('Error creating job:', error);
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}

// DELETE /api/jobs - Delete a job by ID (Admin only)
export async function DELETE(request: Request) {
  try {
    // Verify admin token
    verifyToken();

    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '');

    if (!id) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    const jobs = await readJobs();
    const jobIndex = jobs.findIndex(job => job.id === id);

    if (jobIndex === -1) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    jobs.splice(jobIndex, 1);
    await writeJobs(jobs);

    return NextResponse.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    );
  }
} 