import Image from 'next/image';
import { getTeamLogoUrlServer } from '@/lib/server-utils';

interface ServerTeamLogoProps {
  teamId?: string;
  size?: number;
  className?: string;
}

/**
 * Server component for displaying team logos with theme awareness
 * This does not require client-side JavaScript
 */
export async function ServerTeamLogo({
  teamId,
  size = 48,
  className = '',
}: ServerTeamLogoProps) {
  // Get the logo URL with theme awareness from cookies
  const logoUrl = await getTeamLogoUrlServer(teamId);

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
