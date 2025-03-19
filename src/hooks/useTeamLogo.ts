'use client';

import { useTheme } from '@/context/theme-context';
import { getTeamLogoUrl } from '@/lib/utils';

/**
 * A hook that returns a team logo URL with the correct theme (light/dark)
 * based on the current theme context
 */
export function useTeamLogo(teamId?: string) {
  const { isDarkMode } = useTheme();
  return getTeamLogoUrl(teamId, isDarkMode);
}
