import { games } from '@/data/games';
import { teams } from '@/data/teams';
import { Region, Team } from '@/types/types';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { GameTableRow } from './row';

export function GameTable({ region }: { region: Region }) {
  const regionGames = games.filter((game) => game.region === region);

  const findTeam = (teamName: string): Team | undefined => {
    return teams.find((team) => team.name === teamName);
  };

  return (
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
          <TableHead className="py-3 px-4 text-left">Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y divide-gray-200">
        {regionGames.map((game, index) => {
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
  );
}
