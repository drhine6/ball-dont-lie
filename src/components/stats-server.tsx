import { getAllGames } from '@/lib/db';
import { StatsClient } from './stats-client';

export async function StatsServer() {
  // Fetch data directly on the server
  const games = await getAllGames();

  // Calculate stats from database data
  const stats = countRecommendations(games);

  return <StatsClient stats={stats} />;
}

function countRecommendations(games: any[]): {
  underdogs: number;
  overs: number;
  unders: number;
  favorites: number;
} {
  let underdogs = 0;
  let overs = 0;
  let unders = 0;
  let favorites = 0;

  games.forEach((game) => {
    const betType = game.betType.toString();
    const recommendation = game.recommendation;

    if (betType === 'Upset_Alert') {
      underdogs++;
    } else if (betType === 'Favorite') {
      favorites++;
    } else if (recommendation.includes('OVER')) {
      overs++;
    } else if (recommendation.includes('UNDER')) {
      unders++;
    }
  });

  return {
    underdogs,
    overs,
    unders,
    favorites,
  };
}
