import { games } from '@/data/games';
import { teams } from '@/data/teams';
import { getTeamLogoUrl } from '@/lib/utils';
import { Region, TeamInfo } from '@/types/types';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export function GameTable({ region }: { region: Region }) {
  const regionGames = games.filter((game) => game.region === region);

  const findTeam = (teamName: string): TeamInfo | undefined => {
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
          const team1Data = findTeam(game.team1);
          const team2Data = findTeam(game.team2);
          return (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            >
              <td className="py-3 px-4">
                <div className="flex items-center space-x-2">
                  <div className="flex flex-col items-center mr-3">
                    <img
                      src={getTeamLogoUrl(team1Data?.logoId)}
                      alt={`${team1Data?.name} logo`}
                      className="w-8 h-8 object-contain"
                    />
                    <span className="text-xs text-gray-600">
                      ({team1Data?.seed})
                    </span>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <div className="font-medium">
                      {team1Data?.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {team1Data?.brand}
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
                      src={getTeamLogoUrl(team2Data?.logoId)}
                      alt={`${team2Data?.name} logo`}
                      className="w-8 h-8 object-contain"
                    />
                    <span className="text-xs text-gray-600">
                      ({team2Data?.seed})
                    </span>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <div className="font-medium">
                      {team2Data?.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {team2Data?.brand}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex flex-col">
                  <span
                    className={`font-medium ${
                      team1Data?.brand === 'Wilson'
                        ? 'text-green-600'
                        : ''
                    }`}
                  >
                    {team1Data?.brand}
                  </span>
                  <span className="text-xs my-1">vs</span>
                  <span
                    className={`font-medium ${
                      team2Data?.brand === 'Wilson'
                        ? 'text-green-600'
                        : ''
                    }`}
                  >
                    {team2Data?.brand}
                  </span>
                </div>
              </td>
              <td
                className={`py-3 px-4 font-medium ${
                  game.recommendation.includes('UNDER')
                    ? 'text-blue-600'
                    : game.recommendation.includes('OVER')
                    ? 'text-green-600'
                    : game.type === 'Upset Alert'
                    ? 'text-red-600'
                    : 'text-black'
                }`}
              >
                {game.recommendation}
              </td>
              <td className="py-3 px-4">
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
              </td>
            </tr>
          );
        })}
      </TableBody>
    </Table>
  );
}
