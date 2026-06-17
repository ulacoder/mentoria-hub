import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

function readDB() {
  if (!fs.existsSync(dbPath)) return { opportunities: [] };
  return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
}

function writeDB(data: any) {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// GET all opportunities
export async function GET() {
  try {
    const db = readDB();
    return NextResponse.json(db.opportunities || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch opportunities' }, { status: 500 });
  }
}

// POST create opportunity
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDB();

    const newOpportunity = {
      id: `opp_${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString()
    };

    if (!db.opportunities) db.opportunities = [];
    db.opportunities.push(newOpportunity);
    writeDB(db);

    return NextResponse.json(newOpportunity);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create opportunity' }, { status: 500 });
  }
}

// PUT update opportunity
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Opportunity ID required' }, { status: 400 });
    }

    const db = readDB();
    const index = db.opportunities.findIndex((o: any) => o.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 });
    }

    db.opportunities[index] = { ...db.opportunities[index], ...updates, updatedAt: new Date().toISOString() };
    writeDB(db);

    return NextResponse.json(db.opportunities[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update opportunity' }, { status: 500 });
  }
}

// DELETE opportunity
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Opportunity ID required' }, { status: 400 });
    }

    const db = readDB();
    db.opportunities = db.opportunities.filter((o: any) => o.id !== id);
    writeDB(db);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete opportunity' }, { status: 500 });
  }
}
