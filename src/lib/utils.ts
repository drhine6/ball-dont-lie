import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addSpaces(name: string) {
  return name.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export function transformToSlug(input: string): string {
  return input.toLowerCase().replace(/\s+/g, '-');
}

export function transformToName(input: string): string {
  return input
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function transformToPascalCase(input: string): string {
  return input
    .split(/\s+/)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join('');
}

export const getTeamLogoUrl = (id?: string, isDarkMode?: boolean) => {
  const location = isDarkMode ? '500-dark' : '500';
  if (!id) {
    return isDarkMode ? '/basketball-dark.svg' : '/basketball.svg';
  }
  return `https://a.espncdn.com/i/teamlogos/ncaa/${location}/${id}.png`;
};
