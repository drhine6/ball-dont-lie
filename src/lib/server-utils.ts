import { cookies } from 'next/headers';
import { getTeamLogoUrl } from './utils';

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
 * Server-side function to get a team logo URL with theme awareness
 * Uses cookies to determine if dark mode is active
 */
export async function getTeamLogoUrlServer(
  teamId?: string,
): Promise<string> {
  // Try to get theme from cookies
  const themeValue = await getCookieValue('theme');

  // Determine if dark mode should be used
  const isDarkMode = themeValue === 'dark';

  return getTeamLogoUrl(teamId, isDarkMode);
}
