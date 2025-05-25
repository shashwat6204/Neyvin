import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
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

    const { data: created, error } = await supabase
      .from("jobs")
      .insert([
        {
          title: data.title,
          department: data.department,
          location: data.location,
          type: data.type,
          experience: data.experience,
          description: data.description,
          is_active: true,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
