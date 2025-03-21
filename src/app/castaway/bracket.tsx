'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Team, Game, Location } from '@prisma/client';
import { useTeamLogo } from '@/hooks/useTeamLogo';
import { predictWinnerByLocation } from '@/lib/client-utils';
import { MapPin } from 'lucide-react';

// Define props for the client component
interface BracketClientProps {
  regionTeams: {
    [key: string]: Team[];
  };
  regionGames: {
    [key: string]: (Game & {
      team1: Team;
      team2: Team;
      location?: Location;
    })[];
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
  recommendation?: string;
  predictedWinner?: Team | null;
}> = ({
  topTeam,
  bottomTeam,
  round,
  recommendation,
  predictedWinner,
}) => {
  // Extract distance from recommendation if available
  const distanceMatch = recommendation?.match(
    /(\d+) miles (closer|more)/,
  );
  const distance = distanceMatch ? parseInt(distanceMatch[1]) : 0;

  // Determine color based on distance advantage
  const getDistanceColor = () => {
    if (distance >= 300) return 'text-green-600 dark:text-green-400';
    if (distance >= 100) return 'text-blue-600 dark:text-blue-400';
    if (distance >= 20) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  // Determine which team is the winner
  const topTeamIsWinner =
    round === 1
      ? false // First round has no winner yet
      : predictedWinner &&
        topTeam &&
        predictedWinner.id === topTeam.id
      ? true
      : !predictedWinner
      ? true
      : false; // Default to top team if no prediction

  const bottomTeamIsWinner =
    round === 1
      ? false // First round has no winner yet
      : predictedWinner &&
        bottomTeam &&
        predictedWinner.id === bottomTeam.id
      ? true
      : false;

  return (
    <div className="flex flex-col my-auto mb-1">
      <TeamSlot team={topTeam} isWinner={topTeamIsWinner} />
      <TeamSlot team={bottomTeam} isWinner={bottomTeamIsWinner} />
      {recommendation && (
        <div
          className={`text-xs font-medium ${getDistanceColor()} p-1 flex gap-1 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700`}
        >
          <MapPin className="w-3 h-3 my-auto shrink-0" />
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
};

// Bracket column component
const BracketColumn: React.FC<{
  matchups: {
    topTeam: Team | null;
    bottomTeam: Team | null;
    recommendation?: string;
    predictedWinner?: Team | null;
  }[];
  round: number;
  region?: string;
  position?: string;
}> = ({ matchups, round }) => {
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
    <div className="flex flex-col justify-center space-y-4 min-w-[170px]">
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

      {matchups.map((matchup, idx) => (
        <Matchup
          key={idx}
          topTeam={matchup.topTeam}
          bottomTeam={matchup.bottomTeam}
          round={round}
          recommendation={matchup.recommendation}
          predictedWinner={matchup.predictedWinner}
        />
      ))}

      {round === 7 && matchups.length > 0 && (
        <div className="flex flex-col items-center">
          <div className="text-xs font-bold bg-gray-100 dark:bg-gray-700 mb-2 p-1 text-center rounded w-full">
            {getColumnTitle()}
          </div>
          <TeamSlot team={matchups[0].topTeam} isWinner={true} />
        </div>
      )}
    </div>
  );
};

const Bracket: React.FC<BracketClientProps> = ({
  regionGames,
  finalFourTeams,
}) => {
  // Group games by round within each region
  const getGamesByRound = (region: string) => {
    const games = regionGames[region] || [];
    const rounds: {
      [round: number]: {
        topTeam: Team | null;
        bottomTeam: Team | null;
        recommendation?: string;
        predictedWinner?: Team | null;
      }[];
    } = {
      1: [], // First round
      2: [], // Second round
      3: [], // Sweet 16
      4: [], // Elite 8
    };

    // Process games into rounds
    // We'll assign rounds based on team seeds or other game properties
    games.forEach((game) => {
      // Default to first round
      let round = 1;

      // For now, as a simple placeholder implementation,
      // assign rounds based on team seeds for demonstration purposes
      // In a real application, you'd have a proper round field in your database
      if (game.team1?.seed && game.team2?.seed) {
        // First round games often pair high seeds with low seeds (1 vs 16, 2 vs 15, etc.)
        const seedSum = game.team1.seed + game.team2.seed;
        if (seedSum >= 16) {
          round = 1; // First round (e.g., 1 vs 16, 2 vs 15, etc.)
        } else if (seedSum >= 9) {
          round = 2; // Second round
        } else if (seedSum >= 5) {
          round = 3; // Sweet 16
        } else {
          round = 4; // Elite 8
        }
      }

      if (round >= 1 && round <= 4) {
        // Ensure higher seed (lower number) is always the topTeam
        let topTeam = game.team1;
        let bottomTeam = game.team2;

        if (
          game.team1?.seed &&
          game.team2?.seed &&
          game.team1.seed > game.team2.seed
        ) {
          // Swap if team2 has a higher seed (lower number)
          topTeam = game.team2;
          bottomTeam = game.team1;
        }

        // Get location-based prediction if we have location data
        let recommendation: string | undefined = undefined;
        let predictedWinner: Team | null = null;
        if (
          game.location &&
          game.locationId &&
          topTeam &&
          bottomTeam
        ) {
          // Create an ExtendedGame object with the required properties
          const extendedGame = {
            ...game,
            team1: topTeam,
            team2: bottomTeam,
            location: game.location,
          };

          const prediction = predictWinnerByLocation(extendedGame);

          if (prediction) {
            recommendation = prediction.recommendation;
            predictedWinner = prediction.predictedWinner;
          }
        }

        rounds[round].push({
          topTeam,
          bottomTeam,
          recommendation,
          predictedWinner,
        });
      }
    });

    // Organize first round matchups in the standard NCAA tournament pattern
    if (rounds[1].length > 0) {
      // First, create a map to organize matchups by seed
      const seedMatchups: {
        [key: number]: {
          topTeam: Team | null;
          bottomTeam: Team | null;
          recommendation?: string;
          predictedWinner?: Team | null;
        };
      } = {};

      rounds[1].forEach((matchup) => {
        const topSeed = matchup.topTeam?.seed || 0;
        const bottomSeed = matchup.bottomTeam?.seed || 0;

        // Determine which seed should be used as the key based on NCAA pattern
        // In NCAA, matchups are 1v16, 8v9, 5v12, 4v13, 6v11, 3v14, 7v10, 2v15
        let seedKey = Math.min(topSeed, bottomSeed);

        // If the lower seed is already a key, use the other seed
        if (seedMatchups[seedKey]) {
          seedKey = Math.max(topSeed, bottomSeed);
        }

        // Store the matchup with the seed as the key
        seedMatchups[seedKey] = matchup;
      });

      // Clear the current rounds[1] array
      rounds[1] = [];

      // Arrange matchups in the standard NCAA pattern
      // 1 vs 16
      if (seedMatchups[1]) rounds[1].push(seedMatchups[1]);
      // 8 vs 9
      if (seedMatchups[8]) rounds[1].push(seedMatchups[8]);
      // 5 vs 12
      if (seedMatchups[5]) rounds[1].push(seedMatchups[5]);
      // 4 vs 13
      if (seedMatchups[4]) rounds[1].push(seedMatchups[4]);
      // 6 vs 11
      if (seedMatchups[6]) rounds[1].push(seedMatchups[6]);
      // 3 vs 14
      if (seedMatchups[3]) rounds[1].push(seedMatchups[3]);
      // 7 vs 10
      if (seedMatchups[7]) rounds[1].push(seedMatchups[7]);
      // 2 vs 15
      if (seedMatchups[2]) rounds[1].push(seedMatchups[2]);
    }

    // Location names for later rounds
    const regionLocations = {
      East: 'Prudential Center, Newark, NJ',
      West: 'Chase Center, San Francisco, CA',
      South: 'State Farm Arena, Atlanta, GA',
      Midwest: 'Lucas Oil Stadium, Indianapolis, IN',
    };

    // If we don't have actual data for later rounds, create placeholders
    // with winners from previous rounds (or leave empty)
    for (let r = 2; r <= 4; r++) {
      if (rounds[r].length === 0 && rounds[r - 1].length > 0) {
        // Create matchups for this round based on previous round winners
        const prevRoundMatchups = rounds[r - 1];

        for (let i = 0; i < prevRoundMatchups.length; i += 2) {
          if (i < prevRoundMatchups.length - 1) {
            // Get teams for this matchup - use predictedWinner if available
            const team1 =
              prevRoundMatchups[i].predictedWinner ||
              prevRoundMatchups[i].topTeam;
            const team2 =
              prevRoundMatchups[i + 1].predictedWinner ||
              prevRoundMatchups[i + 1].topTeam;

            if (team1 && team2) {
              // Create a fake location for this matchup
              const locationObj = {
                id: `${region}-round-${r}`,
                venue:
                  regionLocations[
                    region as keyof typeof regionLocations
                  ] || `${region} Regional Arena`,
                round:
                  r === 2
                    ? 'Second Round'
                    : r === 3
                    ? 'Sweet 16'
                    : 'Elite Eight',
                dates: 'March 2025',
                createdAt: new Date(),
                updatedAt: new Date(),
                latitude: 0, // Will be updated below
                longitude: 0, // Will be updated below
              };

              // Set location coordinates based on region
              if (region === 'East') {
                locationObj.latitude = 40.7338; // Newark, NJ
                locationObj.longitude = -74.1657;
              } else if (region === 'West') {
                locationObj.latitude = 37.768; // San Francisco, CA
                locationObj.longitude = -122.3877;
              } else if (region === 'South') {
                locationObj.latitude = 33.7573; // Atlanta, GA
                locationObj.longitude = -84.3963;
              } else if (region === 'Midwest') {
                locationObj.latitude = 39.7638; // Indianapolis, IN
                locationObj.longitude = -86.1639;
              }

              // Create a fake game object with these teams
              const fakeGame = {
                id: `${region}-game-${r}-${i / 2}`,
                team1: team1,
                team2: team2,
                team1Id: team1.id,
                team2Id: team2.id,
                locationId: locationObj.id,
                location: locationObj,
                // Other required game properties
                betType: 'Favorite' as any,
                confidence: 'High' as any,
                createdAt: new Date(),
                updatedAt: new Date(),
              };

              // Generate recommendation based on proximity
              let recommendation: string | undefined = undefined;
              let predictedWinner: Team | null = null;

              // Use predictWinnerByLocation to determine the winner
              const prediction = predictWinnerByLocation(
                fakeGame as any,
              );
              if (prediction) {
                recommendation = prediction.recommendation;
                predictedWinner = prediction.predictedWinner;
              }

              // Add the matchup to this round
              rounds[r].push({
                topTeam: team1,
                bottomTeam: team2,
                recommendation,
                predictedWinner,
              });
            }
          }
        }
      }
    }

    return rounds;
  };

  // Final Four location - San Antonio, TX
  const finalFourLocation = {
    id: 'final-four-location',
    venue: 'Alamodome, San Antonio, Texas',
    round: 'Final Four',
    dates: 'April 5 and 7, 2025',
    createdAt: new Date(),
    updatedAt: new Date(),
    latitude: 29.4169, // San Antonio, TX
    longitude: -98.4758,
  };

  // Create Final Four matchups
  const getFinalFourMatchups = () => {
    const result = [];

    // South vs East winner
    if (finalFourTeams.length >= 2) {
      const southTeam = getRegionWinner('South');
      const eastTeam = getRegionWinner('East');

      if (southTeam && eastTeam) {
        const fakeGame = {
          id: 'final-four-game-1',
          team1: southTeam,
          team2: eastTeam,
          team1Id: southTeam.id,
          team2Id: eastTeam.id,
          locationId: finalFourLocation.id,
          location: finalFourLocation,
          betType: 'Favorite' as any,
          confidence: 'High' as any,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        let recommendation: string | undefined = undefined;
        let predictedWinner: Team | null = null;

        const prediction = predictWinnerByLocation(fakeGame as any);
        if (prediction) {
          recommendation = prediction.recommendation;
          predictedWinner = prediction.predictedWinner;
        }

        result.push({
          topTeam: southTeam,
          bottomTeam: eastTeam,
          recommendation,
          predictedWinner,
        });
      }
    }

    // West vs Midwest winner
    if (finalFourTeams.length >= 4) {
      const westTeam = getRegionWinner('West');
      const midwestTeam = getRegionWinner('Midwest');

      if (westTeam && midwestTeam) {
        const fakeGame = {
          id: 'final-four-game-2',
          team1: westTeam,
          team2: midwestTeam,
          team1Id: westTeam.id,
          team2Id: midwestTeam.id,
          locationId: finalFourLocation.id,
          location: finalFourLocation,
          betType: 'Favorite' as any,
          confidence: 'High' as any,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        let recommendation: string | undefined = undefined;
        let predictedWinner: Team | null = null;

        const prediction = predictWinnerByLocation(fakeGame as any);
        if (prediction) {
          recommendation = prediction.recommendation;
          predictedWinner = prediction.predictedWinner;
        }

        result.push({
          topTeam: westTeam,
          bottomTeam: midwestTeam,
          recommendation,
          predictedWinner,
        });
      }
    }

    return result;
  };

  // Helper function to get the winner from a region
  const getRegionWinner = (region: string): Team | null => {
    // Get the Elite 8 matchups for this region
    const eliteEight = getGamesByRound(region)[4];

    // If we have matchups, return the predicted winner of the first one
    if (eliteEight && eliteEight.length > 0) {
      return eliteEight[0].predictedWinner || eliteEight[0].topTeam;
    }

    // Fallback to the finalist from the provided finalFourTeams array
    const regionIndex = ['South', 'East', 'West', 'Midwest'].indexOf(
      region,
    );
    if (regionIndex >= 0 && regionIndex < finalFourTeams.length) {
      return finalFourTeams[regionIndex];
    }

    return null;
  };

  // Create Championship matchup
  const getChampionshipMatchup = () => {
    const finalFour = getFinalFourMatchups();

    if (finalFour.length >= 2) {
      const team1 =
        finalFour[0].predictedWinner || finalFour[0].topTeam;
      const team2 =
        finalFour[1].predictedWinner || finalFour[1].topTeam;

      if (team1 && team2) {
        const fakeGame = {
          id: 'championship-game',
          team1: team1,
          team2: team2,
          team1Id: team1.id,
          team2Id: team2.id,
          locationId: finalFourLocation.id,
          location: finalFourLocation,
          betType: 'Favorite' as any,
          confidence: 'High' as any,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        let recommendation: string | undefined = undefined;
        let predictedWinner: Team | null = null;

        const prediction = predictWinnerByLocation(fakeGame as any);
        if (prediction) {
          recommendation = prediction.recommendation;
          predictedWinner = prediction.predictedWinner;
        }

        return [
          {
            topTeam: team1,
            bottomTeam: team2,
            recommendation,
            predictedWinner,
          },
        ];
      }
    }

    return [];
  };

  // Create Champion
  const getChampion = () => {
    const championship = getChampionshipMatchup();
    if (championship.length > 0) {
      const champion =
        championship[0].predictedWinner || championship[0].topTeam;
      return [
        {
          topTeam: champion,
          bottomTeam: null,
        },
      ];
    }
    return [];
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

      <div className="flex flex-col items-center">
        {/* 2x2 grid for the four regions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 w-full">
          {/* South Region - Top Left */}
          <div className="region-container">
            <h2 className="text-lg font-bold mb-2 sticky left-0">
              South Region
            </h2>
            <div className="flex space-x-8 overflow-x-auto pb-4">
              {/* First Round */}
              <BracketColumn
                matchups={getGamesByRound('South')[1]}
                round={1}
                region="South"
                position="left"
              />

              {/* Second Round */}
              <BracketColumn
                matchups={getGamesByRound('South')[2]}
                round={2}
                region="South"
                position="left"
              />

              {/* Sweet 16 */}
              <BracketColumn
                matchups={getGamesByRound('South')[3]}
                round={3}
                region="South"
                position="left"
              />

              {/* Elite 8 */}
              <BracketColumn
                matchups={getGamesByRound('South')[4]}
                round={4}
                region="South"
                position="left"
              />
            </div>
          </div>

          {/* East Region - Top Right */}
          <div className="region-container">
            <h2 className="text-lg font-bold mb-2 sticky left-0">
              East Region
            </h2>
            <div className="flex flex-row-reverse space-x-8 space-x-reverse overflow-x-auto pb-4">
              {/* First Round */}
              <BracketColumn
                matchups={getGamesByRound('East')[1]}
                round={1}
                region="East"
                position="right"
              />

              {/* Second Round */}
              <BracketColumn
                matchups={getGamesByRound('East')[2]}
                round={2}
                region="East"
                position="right"
              />

              {/* Sweet 16 */}
              <BracketColumn
                matchups={getGamesByRound('East')[3]}
                round={3}
                region="East"
                position="right"
              />

              {/* Elite 8 */}
              <BracketColumn
                matchups={getGamesByRound('East')[4]}
                round={4}
                region="East"
                position="right"
              />
            </div>
          </div>

          {/* West Region - Bottom Left */}
          <div className="region-container">
            <h2 className="text-lg font-bold mb-2 sticky left-0">
              West Region
            </h2>
            <div className="flex space-x-8 overflow-x-auto pb-4">
              {/* First Round */}
              <BracketColumn
                matchups={getGamesByRound('West')[1]}
                round={1}
                region="West"
                position="left"
              />

              {/* Second Round */}
              <BracketColumn
                matchups={getGamesByRound('West')[2]}
                round={2}
                region="West"
                position="left"
              />

              {/* Sweet 16 */}
              <BracketColumn
                matchups={getGamesByRound('West')[3]}
                round={3}
                region="West"
                position="left"
              />

              {/* Elite 8 */}
              <BracketColumn
                matchups={getGamesByRound('West')[4]}
                round={4}
                region="West"
                position="left"
              />
            </div>
          </div>

          {/* Midwest Region - Bottom Right */}
          <div className="region-container">
            <h2 className="text-lg font-bold mb-2 sticky left-0">
              Midwest Region
            </h2>
            <div className="flex flex-row-reverse space-x-8 space-x-reverse overflow-x-auto pb-4">
              {/* First Round */}
              <BracketColumn
                matchups={getGamesByRound('Midwest')[1]}
                round={1}
                region="Midwest"
                position="right"
              />

              {/* Second Round */}
              <BracketColumn
                matchups={getGamesByRound('Midwest')[2]}
                round={2}
                region="Midwest"
                position="right"
              />

              {/* Sweet 16 */}
              <BracketColumn
                matchups={getGamesByRound('Midwest')[3]}
                round={3}
                region="Midwest"
                position="right"
              />

              {/* Elite 8 */}
              <BracketColumn
                matchups={getGamesByRound('Midwest')[4]}
                round={4}
                region="Midwest"
                position="right"
              />
            </div>
          </div>
        </div>

        {/* Final Four Section at the bottom */}
        <div className="flex flex-col justify-center space-y-4 mt-8">
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

          <div className="flex space-x-12 justify-center">
            {/* Final Four */}
            <BracketColumn
              matchups={getFinalFourMatchups()}
              round={5}
            />

            {/* Championship */}
            <BracketColumn
              matchups={getChampionshipMatchup()}
              round={6}
            />

            {/* Champion */}
            <BracketColumn matchups={getChampion()} round={7} />
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
  );
};

export default Bracket;
