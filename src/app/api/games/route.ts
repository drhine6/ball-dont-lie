import { NextRequest, NextResponse } from 'next/server';
import { getAllGames } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const games = await getAllGames();

    // Map database games to the format expected by the frontend
    const mappedGames = games.map((game) => ({
      ...game,
      // Convert betType back to the format expected by frontend
      type: game.betType.toString().replace('_', ' '),
      // Add these fields to match the old interface
      team1: game.team1,
      team2: game.team2,
    }));

    return NextResponse.json(mappedGames);
  } catch (error) {
    console.error('Error getting games:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
