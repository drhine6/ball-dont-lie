import React from 'react';
import { getAllTeams, getAllGames } from '@/lib/db';
import { Team, Game } from '@prisma/client';
import Bracket from './bracket';
import { createRecommendations } from '@/lib/server-utils';

// Types for our bracket data structure
type RegionTeams = {
  [key: string]: Team[];
};

type RegionGames = {
  [key: string]: (Game & { team1: Team; team2: Team })[];
};

type FinalFourTeams = Team[];

// Server component to fetch data
export default async function BracketPage() {
  // Fetch all teams and games from the database
  const allTeams = await getAllTeams();
  const allGames = await getAllGames();

  // Group teams by region
  const regionTeams: RegionTeams = {
    South: [],
    East: [],
    West: [],
    Midwest: [],
  };

  // Group games by region
  const regionGames: RegionGames = {
    South: [],
    East: [],
    West: [],
    Midwest: [],
  };

  // Assign teams to their regions
  allTeams.forEach((team) => {
    const region = team.region;
    if (region && region in regionTeams) {
      regionTeams[region].push(team);
    }
  });

  // Assign games to their regions based on team1's region
  // This assumes all games within a region have team1 from that region
  allGames.forEach((game) => {
    const region = game.team1?.region;
    if (region && region in regionGames) {
      regionGames[region].push(
        game as Game & { team1: Team; team2: Team },
      );
    }
  });

  console.log(regionGames);

  // For Final Four, we need to identify games marked as "Final Four" or the highest round games
  // This is an approximation - ideally we would have a round field in the Game model
  const finalFourTeams: FinalFourTeams = [];

  // Select a team from each region for the Final Four based on your data structure
  // This is placeholder logic - replace with actual logic based on your database
  Object.keys(regionTeams).forEach((region) => {
    if (regionTeams[region].length > 0) {
      // For now, just use the top seeded team from each region
      finalFourTeams.push(
        regionTeams[region].find((team) => team.seed === 1) ||
          regionTeams[region][0],
      );
    }
  });

  return (
    <div className="min-h-screen bg-bg text-text">
      <Bracket
        regionTeams={regionTeams}
        regionGames={regionGames}
        finalFourTeams={finalFourTeams}
      />
    </div>
  );
}
