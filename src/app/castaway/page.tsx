import React from 'react';
import { getAllTeams } from '@/lib/db';
import { Team } from '@prisma/client';
import BracketClient from './bracket-client';

// Types for our bracket data structure
type RegionTeams = {
  [key: string]: Team[];
};

type FinalFourTeams = Team[];

// Server component to fetch data
export default async function BracketPage() {
  // Fetch all teams from the database
  const allTeams = await getAllTeams();

  // Group teams by region
  const regionTeams: RegionTeams = {
    South: [],
    East: [],
    West: [],
    Midwest: [],
  };

  // Assign teams to their regions (using region field from Team model)
  allTeams.forEach((team) => {
    const region = team.region;
    if (region && region in regionTeams) {
      regionTeams[region].push(team);
    }
  });

  // Sort teams within each region by seed
  Object.keys(regionTeams).forEach((region) => {
    regionTeams[region].sort((a, b) => (a.seed || 0) - (b.seed || 0));
  });

  // For Final Four, we could either:
  // 1. Have a separate table for "advancing teams"
  // 2. Hardcode the final four teams for demo purposes
  // Since we don't know the exact data model, we'll use option 2 for now

  // Pick some teams for the Final Four (one from each region)
  const finalFourTeams: FinalFourTeams = [];

  Object.keys(regionTeams).forEach((region) => {
    if (regionTeams[region].length > 0) {
      // Pick the first team from each region (usually the highest seed)
      finalFourTeams.push(regionTeams[region][0]);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <BracketClient
        regionTeams={regionTeams}
        finalFourTeams={finalFourTeams}
      />
    </div>
  );
}
