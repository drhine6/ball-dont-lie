import { games } from '@/data/games';
import { teams } from '@/data/teams';
import { Team, Game } from '@/types/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTeamLogo } from '@/hooks/useTeamLogo';
import { Input } from '../ui/input';
import { useState } from 'react';
export function GameTable() {
  const [search, setSearch] = useState('');
  const findTeam = (teamName: string): Team | undefined => {
    return teams.find((team) => team.name === teamName);
  };

  const filteredGames = games.filter((game) => {
    return (
      game.team1.toLowerCase().includes(search.toLowerCase()) ||
      game.team2.toLowerCase().includes(search.toLowerCase())
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
            const team1 = findTeam(game.team1);
            const team2 = findTeam(game.team2);
            if (!team1) {
              console.log('team not found', game);
              return null;
            }
            if (!team2) {
              console.log('team not found', game);
              return null;
            }
            return (
              <GameTableRow
                key={index}
                game={game}
                team1={team1}
                team2={team2}
                even={index % 2 === 0}
              />
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

function GameTableRow({
  game,
  team1,
  team2,
  even,
}: {
  game: Game;
  team1: Team;
  team2: Team;
  even: boolean;
}) {
  const team1Logo = useTeamLogo(team1.logoId);
  const team2Logo = useTeamLogo(team2.logoId);

  return (
    <TableRow className={even ? 'bg-bw' : 'bg-bg'}>
      <TableCell className="py-3 px-4">
        <div className="flex items-center space-x-2">
          <div className="flex flex-col items-center mr-3">
            <img
              src={team1Logo}
              alt={`${team1.name} logo`}
              className="w-8 h-8 object-contain"
            />
            <span className="text-xs text-gray-600">
              ({team1.seed})
            </span>
          </div>
          <div className="flex flex-col flex-grow">
            <div className="font-medium">{team1.name}</div>
            <div className="text-xs text-gray-500">{team1.brand}</div>
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
              alt={`${team2.name} logo`}
              className="w-8 h-8 object-contain"
            />
            <span className="text-xs text-gray-600">
              ({team2.seed})
            </span>
          </div>
          <div className="flex flex-col flex-grow">
            <div className="font-medium">{team2.name}</div>
            <div className="text-xs text-gray-500">{team2.brand}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className="py-3 px-4">
        <div className="flex flex-col">
          <span
            className={`font-medium ${
              team1.brand === 'Wilson' ? 'text-green-600' : ''
            }`}
          >
            {team1.brand}
          </span>
          <span className="text-xs my-1">vs</span>
          <span
            className={`font-medium ${
              team2.brand === 'Wilson' ? 'text-green-600' : ''
            }`}
          >
            {team2.brand}
          </span>
        </div>
      </TableCell>
      <TableCell
        className={`py-3 px-4 font-medium ${
          game.recommendation.includes('UNDER')
            ? 'text-blue-600'
            : game.recommendation.includes('OVER')
            ? 'text-green-600'
            : game.type === 'Upset Alert'
            ? 'text-red-600'
            : 'text-text'
        }`}
      >
        {game.recommendation}
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
          {game.type}
        </span>
      </TableCell>
    </TableRow>
  );
}
