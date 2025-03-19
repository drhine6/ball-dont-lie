'use client';

import { useState, useEffect } from 'react';
import { Game, Team } from '@prisma/client';

type GameWithTeams = Game & {
  team1: Team;
  team2: Team;
};

export function useGamesAndTeams() {
  const [games, setGames] = useState<GameWithTeams[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch all teams
        const teamsResponse = await fetch('/api/teams');
        if (!teamsResponse.ok) {
          throw new Error(
            `Error fetching teams: ${teamsResponse.statusText}`,
          );
        }
        const teamsData = await teamsResponse.json();
        console.log('teamsData', teamsData);
        setTeams(teamsData);
        // Fetch games with team data included
        const gamesResponse = await fetch('/api/games');
        if (!gamesResponse.ok) {
          throw new Error(
            `Error fetching games: ${gamesResponse.statusText}`,
          );
        }
        const gamesData = await gamesResponse.json();
        const gamesWithTeams = gamesData.map((game: Game) => ({
          ...game,
          team1: teamsData.find(
            (team: Team) => team.id === game.team1Id,
          ),
          team2: teamsData.find(
            (team: Team) => team.id === game.team2Id,
          ),
        }));
        console.log('gamesData', gamesWithTeams);
        setGames(gamesWithTeams);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(
          err instanceof Error ? err.message : 'Unknown error',
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { games, teams, loading, error };
}
