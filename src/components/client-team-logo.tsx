'use client';

import Image from 'next/image';
import { useTeamLogo } from '@/hooks/useTeamLogo';

interface ClientTeamLogoProps {
  teamId?: string;
  size?: number;
  className?: string;
}

/**
 * Client component for displaying team logos with theme awareness
 * This uses the theme context to automatically adjust based on dark/light mode
 */
export function ClientTeamLogo({
  teamId,
  size = 48,
  className = '',
}: ClientTeamLogoProps) {
  // Get the logo URL with theme awareness
  const logoUrl = useTeamLogo(teamId);

  return (
    <Image
      src={logoUrl}
      alt={`Team ${teamId || 'Unknown'} Logo`}
      width={size}
      height={size}
      className={className}
    />
  );
}
