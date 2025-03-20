'use client';

import { useState } from 'react';
import { Game, Team, BetType } from '@prisma/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTeamLogo } from '@/hooks/useTeamLogo';
import { Input } from './ui/input';

// Define the extended Game type that includes the relations
type ExtendedGame = Game & {
  team1: Team;
  team2: Team;
  type?: string;
};

interface GameTableClientProps {
  initialGames: ExtendedGame[];
  recommendations: {
    recommendation: string;
    gameId: string;
  }[];
}

export function GameTable({
  initialGames,
  recommendations,
}: GameTableClientProps) {
  const [search, setSearch] = useState('');

  // Filter games based on search
  const filteredGames = initialGames.filter((game) => {
    return (
      game.team1.name.toLowerCase().includes(search.toLowerCase()) ||
      game.team2.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <Input
        className="bg-bw"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by team..."
      />
      {filteredGames.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No games match your search
        </div>
      ) : (
        <Table className="min-w-full">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="py-3 px-4 text-left">
                Matchup
              </TableHead>
              <TableHead className="py-3 px-4 text-left">
                Basketballs
              </TableHead>
              <TableHead className="py-3 px-4 text-left">
                Recommendation
              </TableHead>
              <TableHead className="py-3 px-4 text-left">
                Type
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {filteredGames.map((game, index) => {
              const recommendation = recommendations.find(
                (r) => r.gameId === game.id,
              );
              return (
                <GameTableRow
                  key={game.id}
                  game={game}
                  recommendation={recommendation?.recommendation}
                  even={index % 2 === 0}
                />
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
}

function GameTableRow({
  game,
  recommendation,
  even,
}: {
  game: ExtendedGame;
  recommendation: string | undefined;
  even: boolean;
}) {
  const team1Logo = useTeamLogo(game.team1.logoId || undefined);
  const team2Logo = useTeamLogo(game.team2.logoId || undefined);

  return (
    <TableRow className={even ? 'bg-bw' : 'bg-bg'}>
      <TableCell className="py-3 px-4">
        <div className="flex items-center space-x-2">
          <div className="flex flex-col items-center mr-3">
            <img
              src={team1Logo}
              alt={`${game.team1.name} logo`}
              className="w-8 h-8 object-contain"
            />
            <span className="text-xs text-gray-600">
              ({game.team1.seed})
            </span>
          </div>
          <div className="flex flex-col flex-grow">
            <div className="font-medium">{game.team1.name}</div>
            <div className="text-xs text-gray-500">
              {game.team1.brand}
            </div>
          </div>
        </div>
        <div className="flex items-center my-2">
          <div className="border-t border-gray-300 flex-grow mr-2"></div>
          <span className="text-xs font-medium">VS</span>
          <div className="border-t border-gray-300 flex-grow ml-2"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex flex-col items-center mr-3">
            <img
              src={team2Logo}
              alt={`${game.team2.name} logo`}
              className="w-8 h-8 object-contain"
            />
            <span className="text-xs text-gray-600">
              ({game.team2.seed})
            </span>
          </div>
          <div className="flex flex-col flex-grow">
            <div className="font-medium">{game.team2.name}</div>
            <div className="text-xs text-gray-500">
              {game.team2.brand}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="py-3 px-4">
        <div className="flex flex-col">
          <span
            className={`font-medium ${
              game.team1.brand === 'Wilson' ? 'text-green-600' : ''
            }`}
          >
            {game.team1.brand}
          </span>
          <span className="text-xs my-1">vs</span>
          <span
            className={`font-medium ${
              game.team2.brand === 'Wilson' ? 'text-green-600' : ''
            }`}
          >
            {game.team2.brand}
          </span>
        </div>
      </TableCell>
      <TableCell
        className={`py-3 px-4 font-medium ${
          recommendation?.includes('UNDER')
            ? 'text-blue-600'
            : recommendation?.includes('OVER')
            ? 'text-green-600'
            : recommendation?.includes('Upset Alert')
            ? 'text-red-600'
            : 'text-text'
        }`}
      >
        {recommendation}
      </TableCell>
      <TableCell className="py-3 px-4">
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            game.type === 'Upset Alert'
              ? 'bg-red-100 text-red-800'
              : game.type === 'Favorite'
              ? 'bg-purple-100 text-purple-800'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          {game.betType.replace('_', ' ')}
        </span>
      </TableCell>
    </TableRow>
  );
}
