import { cookies } from 'next/headers';
import { getTeamLogoUrl } from './utils';
import { prisma } from './db';

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
