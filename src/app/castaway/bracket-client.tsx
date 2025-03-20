'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Team } from '@prisma/client';
import { useTeamLogo } from '@/hooks/useTeamLogo';

// Define props for the client component
interface BracketClientProps {
  regionTeams: {
    [key: string]: Team[];
  };
  finalFourTeams: Team[];
}

// Team display component
const TeamSlot: React.FC<{
  team: Team | null;
  isWinner?: boolean;
}> = ({ team, isWinner = false }) => {
  const logoUrl = useTeamLogo(team?.logoId || undefined);

  return (
    <div
      className={`flex items-center p-2 border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 rounded-sm text-sm ${
        isWinner ? 'bg-gray-100 dark:bg-gray-700 font-bold' : ''
      }`}
    >
      {team && (
        <>
          <img
            src={logoUrl}
            alt={`${team.name} logo`}
            className="w-6 h-6 mr-2 object-contain"
          />
          <span className="font-medium">{team.name}</span>
          {team.seed && (
            <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
              #{team.seed}
            </span>
          )}
        </>
      )}
      {!team && <span className="text-gray-400">TBD</span>}
    </div>
  );
};

// Matchup component
const Matchup: React.FC<{
  topTeam: Team | null;
  bottomTeam: Team | null;
  round: number;
  matchupIndex: number;
}> = ({ topTeam, bottomTeam, round, matchupIndex }) => {
  return (
    <div className="flex flex-col">
      <TeamSlot team={topTeam} isWinner={round !== 1} />
      <TeamSlot team={bottomTeam} />
    </div>
  );
};

// Bracket column component
const BracketColumn: React.FC<{
  teams: (Team | null)[][];
  round: number;
  region?: string;
  position?: string;
}> = ({ teams, round, region, position }) => {
  const getColumnTitle = () => {
    if (round === 1) return 'First Round';
    if (round === 2) return 'Second Round';
    if (round === 3) return 'Sweet 16';
    if (round === 4) return 'Elite 8';
    if (round === 5) return 'Final Four';
    if (round === 6) return 'Championship';
    if (round === 7) return 'Champion';
    return '';
  };

  return (
    <div
      className={`flex flex-col ${
        round > 4 ? 'justify-center' : ''
      } space-y-4 min-w-[170px]`}
    >
      {round <= 4 && (
        <div className="text-xs font-bold bg-gray-100 dark:bg-gray-700 mb-2 p-1 text-center rounded">
          {getColumnTitle()}
        </div>
      )}

      {round > 4 && round <= 6 && (
        <div className="text-xs font-bold bg-gray-100 dark:bg-gray-700 mb-2 p-1 text-center rounded">
          {getColumnTitle()}
        </div>
      )}

      {teams.map((teamPair, idx) => (
        <Matchup
          key={idx}
          topTeam={teamPair[0]}
          bottomTeam={teamPair[1]}
          round={round}
          matchupIndex={idx}
        />
      ))}

      {round === 7 && (
        <div className="flex flex-col items-center">
          <div className="text-xs font-bold bg-gray-100 dark:bg-gray-700 mb-2 p-1 text-center rounded w-full">
            {getColumnTitle()}
          </div>
          <TeamSlot team={teams[0][0]} isWinner={true} />
        </div>
      )}
    </div>
  );
};

const Bracket: React.FC<BracketClientProps> = ({
  regionTeams,
  finalFourTeams,
}) => {
  const regions = Object.keys(regionTeams);

  // Mock advancing teams through rounds
  const getAdvancingTeams = (
    teams: (Team | null)[][],
    round: number,
  ): (Team | null)[][] => {
    if (round === 1) return teams;

    const previousRoundTeams = getAdvancingTeams(teams, round - 1);
    const advancingTeams: (Team | null)[][] = [];

    for (let i = 0; i < previousRoundTeams.length; i += 2) {
      if (i < previousRoundTeams.length) {
        // Choose winners (alternating for mock purposes)
        const winner =
          i % 4 === 0 || i % 4 === 3
            ? previousRoundTeams[i][0]
            : previousRoundTeams[i][1];
        advancingTeams.push([winner, null]);
      }
    }

    return advancingTeams;
  };

  // Prepare first round matchups
  const prepareFirstRound = (region: string): (Team | null)[][] => {
    const teams = regionTeams[region] || [];
    const matchups: (Team | null)[][] = [];

    // Create matchups with standard tournament seeding: 1 vs 16, 8 vs 9, etc.
    // Create pairs (assuming teams are sorted by seed)
    for (let i = 0; i < Math.min(teams.length, 16); i += 2) {
      // Get top seed team
      const topTeam = teams[i] || null;
      // Get matching bottom seed team
      const bottomTeam = teams[i + 1] || null;

      matchups.push([topTeam, bottomTeam]);
    }

    // If we don't have enough teams, fill with null
    while (matchups.length < 8) {
      matchups.push([null, null]);
    }

    return matchups;
  };

  return (
    <div className="py-8 px-4 md:py-16 md:px-8 max-w-full overflow-x-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          NCAA Tournament Bracket
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          March Madness 2025
        </p>
      </motion.div>

      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <div className="flex w-full overflow-x-auto pb-8 space-x-12">
            <div className="flex flex-col space-y-8">
              {regions.map((region) => (
                <div key={region} className="flex flex-col">
                  <h2 className="text-lg font-bold mb-2 sticky left-0">
                    {region} Region
                  </h2>
                  <div className="flex space-x-8">
                    {/* First Round */}
                    <BracketColumn
                      teams={prepareFirstRound(region)}
                      round={1}
                      region={region}
                      position="left"
                    />

                    {/* Second Round */}
                    <BracketColumn
                      teams={getAdvancingTeams(
                        prepareFirstRound(region),
                        2,
                      )}
                      round={2}
                      region={region}
                      position="left"
                    />

                    {/* Sweet 16 */}
                    <BracketColumn
                      teams={getAdvancingTeams(
                        prepareFirstRound(region),
                        3,
                      )}
                      round={3}
                      region={region}
                      position="left"
                    />

                    {/* Elite 8 */}
                    <BracketColumn
                      teams={getAdvancingTeams(
                        prepareFirstRound(region),
                        4,
                      )}
                      round={4}
                      region={region}
                      position="left"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center space-y-4">
              <div className="flex flex-col items-center mb-8">
                <img
                  src="/final-four-logo.png"
                  alt="Final Four Logo"
                  className="w-24 h-24 mb-4"
                  onError={(
                    e: React.SyntheticEvent<HTMLImageElement>,
                  ) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23f0f0f0' stroke='%23ddd' stroke-width='2'/%3E%3Ctext x='50' y='55' font-family='Arial' font-size='12' text-anchor='middle' fill='%23666'%3EFinal Four%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>

              {/* Final Four - pairing the regions */}
              <BracketColumn
                teams={[
                  [
                    finalFourTeams[0] || null,
                    finalFourTeams[1] || null,
                  ],
                  [
                    finalFourTeams[2] || null,
                    finalFourTeams[3] || null,
                  ],
                ]}
                round={5}
              />

              {/* Championship */}
              <BracketColumn
                teams={[
                  [
                    finalFourTeams[0] || null,
                    finalFourTeams[2] || null,
                  ],
                ]}
                round={6}
              />

              {/* Champion */}
              <BracketColumn
                teams={[[finalFourTeams[0] || null]]}
                round={7}
              />
            </div>
          </div>

          <div className="flex space-x-4 mt-12">
            <div className="flex items-center space-x-2">
              <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
              <span className="text-sm">East</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="text-sm">West</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-sm">South</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="text-sm">Midwest</span>
            </div>
          </div>

          <div className="flex gap-4 mt-6 justify-center">
            <div className="flex items-center">
              <div className="bg-gray-200 dark:bg-gray-700 rounded p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
              </div>
              <span className="ml-2 text-sm">Print</span>
            </div>

            <div className="flex items-center">
              <div className="bg-gray-200 dark:bg-gray-700 rounded p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </div>
              <span className="ml-2 text-sm">Share</span>
            </div>

            <div className="flex items-center">
              <div className="bg-gray-200 dark:bg-gray-700 rounded p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </svg>
              </div>
              <span className="ml-2 text-sm">Save</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bracket;
