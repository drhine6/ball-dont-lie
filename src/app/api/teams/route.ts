import { NextRequest, NextResponse } from 'next/server';
import { getAllTeams } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const teams = await getAllTeams();
    return NextResponse.json(teams);
  } catch (error) {
    console.error('Error getting teams:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
