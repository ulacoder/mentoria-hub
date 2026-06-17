import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

// Ensure data directory exists
function ensureDataDir() {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Read database
function readDB() {
  ensureDataDir();
  if (!fs.existsSync(dbPath)) {
    const initialData = {
      users: [
        {
          id: 'mentor_001',
          name: 'Ментор',
          email: 'mentor@mentoria.kz',
          password: 'mentor123',
          role: 'mentor',
          grade: '—',
          interests: ['Образование', 'Менторство'],
          coins: 500,
          rank: 0,
          mbti: 'ENFJ',
          mbtiAnalysis: 'ENFJ - прирожденный лидер и ментор. Отлично понимает людей и умеет мотивировать.'
        },
        {
          id: 'admin_001',
          name: 'Администратор',
          email: 'admin@mentoria.kz',
          password: 'admin123',
          role: 'admin',
          grade: '—',
          interests: ['Администрирование'],
          coins: 1000,
          rank: 0
        }
      ],
      courses: [],
      opportunities: []
    };
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
  }
  return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
}

// Write database
function writeDB(data: any) {
  ensureDataDir();
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// GET all users
export async function GET() {
  try {
    const db = readDB();
    return NextResponse.json(db.users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST create user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDB();

    const newUser = {
      id: `user_${Date.now()}`,
      ...body,
      coins: body.coins || 100,
      rank: body.rank || 0,
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    writeDB(db);

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

// DELETE user
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const db = readDB();
    db.users = db.users.filter((u: any) => u.id !== id);
    writeDB(db);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
