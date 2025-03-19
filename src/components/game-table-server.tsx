import { getAllGames, getAllTeams } from '@/lib/db';
import { GameTableClient } from './game-table-client';

export async function GameTableServer() {
  // Fetch data directly on the server
  const games = await getAllGames();
  const teams = await getAllTeams();

  // The getAllGames function already includes team1 and team2 relations
  // We just need to add the 'type' and 'game' fields for compatibility
  const formattedGames = games.map((game) => ({
    ...game,
    type: game.betType.toString().replace('_', ' '),
    game: game.gameTitle,
  }));

  // Return the client component with the data
  return (
    <GameTableClient
      initialGames={formattedGames}
      initialTeams={teams}
    />
  );
}
