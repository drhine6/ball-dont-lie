// Client-side utility functions
import { Team } from '@prisma/client';
import { Game } from '@prisma/client';
import { Location } from '@prisma/client';
import { point } from '@turf/helpers';
import { distance } from '@turf/distance';

// Get or create a unique ID for anonymous users
export function getAnonymousUserId(): string {
  if (typeof window === 'undefined') return '';

  // Try to get from localStorage
  let userId = localStorage.getItem('anonymousUserId');

  // If not found, create a new one
  if (!userId) {
    userId = generateUUID();
    localStorage.setItem('anonymousUserId', userId);
  }

  return userId;
}

// Generate a UUID v4 (simplified version)
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    },
  );
}

// Save theme preference via API
export async function saveThemePreference(
  userId: string,
  theme: 'light' | 'dark',
): Promise<boolean> {
  try {
    const response = await fetch('/api/theme', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, theme }),
    });

    if (!response.ok) {
      throw new Error(
        `API responded with status: ${response.status}`,
      );
    }

    return true;
  } catch (error) {
    console.error('Error saving theme via API:', error);
    return false;
  }
}

// Get theme preference from API
export async function getThemePreference(): Promise<
  'light' | 'dark'
> {
  try {
    const response = await fetch('/api/theme');

    if (!response.ok) {
      throw new Error(
        `API responded with status: ${response.status}`,
      );
    }

    const data = await response.json();
    return data.theme as 'light' | 'dark';
  } catch (error) {
    console.error('Error getting theme from API:', error);
    return 'light'; // Default to light theme if API fails
  }
}

type ExtendedGame = Game & {
  team1: Team;
  team2: Team;
  location: Location;
};

export function closerTeam({
  team1,
  team2,
  game,
}: {
  team1: Team;
  team2: Team;
  game: ExtendedGame;
}) {
  if (
    !team1.latitude ||
    !team1.longitude ||
    !team2.latitude ||
    !team2.longitude ||
    !game.locationId
  ) {
    return null;
  }
  const team1Point = point([team1.latitude, team1.longitude]);
  const team2Point = point([team2.latitude, team2.longitude]);
  const gamePoint = point([
    game.location.latitude,
    game.location.longitude,
  ]);

  const distanceToTeam1 = distance(team1Point, gamePoint, {
    units: 'miles',
  });
  const distanceToTeam2 = distance(team2Point, gamePoint, {
    units: 'miles',
  });

  return {
    distanceToTeam1,
    distanceToTeam2,
    closerTeam: distanceToTeam1 < distanceToTeam2 ? team1 : team2,
  };
}

/**
 * Predicts the winner of a game based on which team is closer to the game location
 * @param game The game with teams and location information
 * @returns An object with prediction details or null if prediction can't be made
 */
export function predictWinnerByLocation(game: ExtendedGame): {
  predictedWinner: Team;
  recommendation: string;
  confidenceScore: number;
  distanceDifference: number;
} | null {
  // First check if we can determine which team is closer
  const result = closerTeam({
    team1: game.team1,
    team2: game.team2,
    game,
  });

  if (!result) {
    return null; // Can't make a prediction (missing location data)
  }

  // Calculate the difference in distance as a percentage
  const totalDistance =
    result.distanceToTeam1 + result.distanceToTeam2;
  const distanceDifference = Math.abs(
    result.distanceToTeam1 - result.distanceToTeam2,
  );
  const confidenceScore = Math.min(
    Math.round((distanceDifference / totalDistance) * 100),
    100,
  );

  // Format distance values
  const roundedDistance = Math.round(distanceDifference);
  const farterTeam =
    result.distanceToTeam1 > result.distanceToTeam2
      ? game.team1.name
      : game.team2.name;

  // Generate a recommendation message with distance information
  let recommendation = '';
  if (roundedDistance < 20) {
    recommendation = `Neutral location (${farterTeam} travels ${roundedDistance} miles more)`;
  } else if (roundedDistance < 100) {
    recommendation = `Slight advantage for ${result.closerTeam.name} (${roundedDistance} miles closer)`;
  } else if (roundedDistance < 300) {
    recommendation = `Home advantage for ${result.closerTeam.name} (${roundedDistance} miles closer)`;
  } else {
    recommendation = `Strong home advantage for ${result.closerTeam.name} (${roundedDistance} miles closer)`;
  }

  return {
    predictedWinner: result.closerTeam,
    recommendation,
    confidenceScore,
    distanceDifference: roundedDistance,
  };
}
