import { cookies } from 'next/headers';
import { getTeamLogoUrl } from './utils';
import { prisma } from './db';
import { Game, Team } from '@prisma/client';

/**
 * Helper function to safely get a cookie value from a Next.js server component
 */
export async function getCookieValue(
  name: string,
): Promise<string | undefined> {
  try {
    const cookiesList = await cookies();
    return cookiesList.get(name)?.value;
  } catch (error) {
    console.error(`Error getting cookie ${name}:`, error);
    return undefined;
  }
}

/**
 * Helper function to get a user's theme preference from database
 * Falls back to cookie if no user ID is provided or user not found
 */
export async function getUserThemePreference(
  userId?: string,
): Promise<'light' | 'dark'> {
  try {
    // If we have a userId, try to get theme from database first
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { theme: true },
      });

      if (user?.theme) {
        return user.theme as 'light' | 'dark';
      }
    }

    // Fall back to cookie
    const themeValue = await getCookieValue('theme');
    return themeValue === 'dark' ? 'dark' : 'light';
  } catch (error) {
    console.error('Error getting user theme preference:', error);
    return 'light'; // Default to light theme
  }
}

/**
 * Server-side function to get a team logo URL with theme awareness
 * Uses database or cookies to determine if dark mode is active
 */
export async function getTeamLogoUrlServer(
  teamId?: string,
  userId?: string,
): Promise<string> {
  // Try to get theme preference
  const theme = await getUserThemePreference(userId);

  // Determine if dark mode should be used
  const isDarkMode = theme === 'dark';

  return getTeamLogoUrl(teamId, isDarkMode);
}

type ExtendedGame = Game & {
  team1: Team;
  team2: Team;
};

export function createRecommendations(games: ExtendedGame[]) {
  return games.map((game) => {
    if (game.team1.brand === 'TBD' || game.team2.brand === 'TBD') {
      return {
        recommendation: 'TBD',
        gameId: game.id,
      };
    }
    if (
      game.team1.brand === 'Wilson' &&
      game.team2.brand === 'Wilson'
    ) {
      return {
        recommendation: 'OVER',
        gameId: game.id,
      };
    }
    if (
      game.team1.brand === 'Wilson' &&
      game.team2.brand !== 'Wilson'
    ) {
      return {
        recommendation: game.team1.name,
        gameId: game.id,
      };
    }
    if (
      game.team1.brand !== 'Wilson' &&
      game.team2.brand === 'Wilson'
    ) {
      return {
        recommendation: game.team2.name,
        gameId: game.id,
      };
    }
    if (
      game.team1.brand !== 'Wilson' &&
      game.team2.brand !== 'Wilson'
    ) {
      return {
        recommendation: 'UNDER',
        gameId: game.id,
      };
    }
    return {
      recommendation: 'Unknown',
      gameId: game.id,
    };
  });
}

export function countRecommendations(
  games: Game[],
  recommendations: {
    recommendation: string;
    gameId: string;
  }[],
): {
  underdogs: number;
  overs: number;
  unders: number;
  favorites: number;
} {
  let underdogs = 0;
  let overs = 0;
  let unders = 0;
  let favorites = 0;

  games.forEach((game) => {
    const betType = game.betType.toString();
    const recommendation = recommendations.find(
      (r) => r.gameId === game.id,
    )?.recommendation;

    if (betType === 'Upset_Alert') {
      underdogs++;
    } else if (betType === 'Favorite') {
      favorites++;
    } else if (recommendation?.includes('OVER')) {
      overs++;
    } else if (recommendation?.includes('UNDER')) {
      unders++;
    }
  });

  return {
    underdogs,
    overs,
    unders,
    favorites,
  };
}
