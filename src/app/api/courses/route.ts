import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

function readDB() {
  if (!fs.existsSync(dbPath)) return { courses: [] };
  return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
}

function writeDB(data: any) {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// GET all courses
export async function GET() {
  try {
    const db = readDB();
    return NextResponse.json(db.courses || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

// POST create course
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDB();

    const newCourse = {
      id: `course_${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString()
    };

    if (!db.courses) db.courses = [];
    db.courses.push(newCourse);
    writeDB(db);

    return NextResponse.json(newCourse);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}

// PUT update course
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Course ID required' }, { status: 400 });
    }

    const db = readDB();
    const index = db.courses.findIndex((c: any) => c.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    db.courses[index] = { ...db.courses[index], ...updates, updatedAt: new Date().toISOString() };
    writeDB(db);

    return NextResponse.json(db.courses[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
  }
}

// DELETE course
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Course ID required' }, { status: 400 });
    }

    const db = readDB();
    db.courses = db.courses.filter((c: any) => c.id !== id);
    writeDB(db);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
