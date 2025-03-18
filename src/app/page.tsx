'use client';
import React, { useState } from 'react';
import { TeamInfo, Region, GameData } from '@/types/types';
import { teams } from '@/data/teams';
import { games, regions } from '@/data/games';
// Define types for our data

const BettingDashboard: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<Region>('South');
  const [darkMode, setDarkMode] = useState(false);

  const getTeamLogoUrl = (id?: string) => {
    const location = darkMode ? '500-dark' : '500';
    if (!id) return '/basketball.svg';
    return `https://a.espncdn.com/i/teamlogos/ncaa/${location}/${id}.png`;
  };

  // Find team by name from the teams array
  const findTeam = (teamName: string): TeamInfo | undefined => {
    return teams.find((team) => team.name === teamName);
  };

  // Get games for the active region
  const getRegionGames = (region: Region): GameData[] => {
    return games.filter((game) => game.region === region);
  };

  // Count recommendations by type for stats display
  const countRecommendations = (): {
    underdogs: number;
    overs: number;
    unders: number;
  } => {
    let underdogs = 0;
    let overs = 0;
    let unders = 0;

    games.forEach((game) => {
      if (game.type === 'Upset Alert') underdogs++;
      if (game.recommendation === 'OVER') overs++;
      if (game.recommendation.includes('UNDER')) unders++;
    });

    return { underdogs, overs, unders };
  };

  const stats = countRecommendations();

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">
          March Madness Ball Advantage Betting Dashboard
        </h1>
        <p className="text-gray-600">
          Recommendations based on the ball advantage theory
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-md w-48">
            <div className="text-4xl font-bold text-red-600">
              {stats.underdogs}
            </div>
            <div className="text-sm text-gray-600">Underdog Bets</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md w-48">
            <div className="text-4xl font-bold text-green-600">
              {stats.overs}
            </div>
            <div className="text-sm text-gray-600">OVER Bets</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md w-48">
            <div className="text-4xl font-bold text-blue-600">
              {stats.unders}
            </div>
            <div className="text-sm text-gray-600">UNDER Bets</div>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 mb-6">
        {regions.map((region: Region) => (
          <button
            key={region}
            className={`px-4 py-2 rounded-lg ${
              activeRegion === region
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border border-blue-600'
            }`}
            onClick={() => setActiveRegion(region)}
          >
            {region} Region
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Matchup</th>
              <th className="py-3 px-4 text-left">Basketballs</th>
              <th className="py-3 px-4 text-left">Recommendation</th>
              <th className="py-3 px-4 text-left">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {getRegionGames(activeRegion).map((game, index) => {
              const team1Data = findTeam(game.team1);
              const team2Data = findTeam(game.team2);

              return (
                <tr
                  key={index}
                  className={
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }
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
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-blue-800 mb-3">
          Ball Advantage Betting Rules
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            If both teams use Wilson basketballs: Bet the{' '}
            <span className="font-medium text-green-600">OVER</span>
          </li>
          <li>
            If neither team uses Wilson basketballs: Bet the{' '}
            <span className="font-medium text-blue-600">UNDER</span>
          </li>
          <li>
            If only one team uses Wilson basketballs: Bet on the{' '}
            <span className="font-medium">team that uses Wilson</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BettingDashboard;
