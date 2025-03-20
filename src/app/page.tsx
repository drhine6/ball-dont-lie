import React from 'react';
import { GameTable } from '@/components/game-table';
import { Hero } from '@/components/hero';
import { Overview } from '@/components/overview';
import { getAllGames } from '@/lib/db';
import { Stats } from '@/components/stats';
import {
  countRecommendations,
  createRecommendations,
} from '@/lib/server-utils';
import { Game, Team } from '@prisma/client';

// Define the type for games with team relations
type ExtendedGame = Game & {
  team1: Team;
  team2: Team;
};

export default async function Dashboard() {
  const games = await getAllGames();
  const recommendations = createRecommendations(
    games as ExtendedGame[],
  );
  const stats = countRecommendations(games, recommendations);
  return (
    <div className="py-24 px-4 lg:px-20 max-w-6xl mx-auto font-[Space_Grotesk] space-y-4">
      <Hero />
      <div className="text-center">
        <h1 className="text-6xl font-bold text-main mb-2 text-shadow-neo">
          The Wilson Theory
        </h1>
      </div>
      <Overview />
      <Stats stats={stats} />
      <GameTable
        initialGames={games as ExtendedGame[]}
        recommendations={recommendations}
      />
    </div>
  );
}
