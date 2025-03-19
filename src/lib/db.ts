import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
// Use PrismaClient as a singleton to prevent too many connections
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// User theme-related functions
export async function getUserTheme(
  userId: string,
): Promise<string | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { theme: true },
    });
    return user?.theme || null;
  } catch (error) {
    console.error('Error getting user theme:', error);
    return null;
  }
}

export async function setUserTheme(
  userId: string,
  theme: 'light' | 'dark',
): Promise<boolean> {
  try {
    await prisma.user.upsert({
      where: { id: userId },
      update: { theme },
      create: { id: userId, theme },
    });
    return true;
  } catch (error) {
    console.error('Error setting user theme:', error);
    return false;
  }
}

// Create or get anonymous user (for users without login)
export async function getOrCreateAnonymousUser(
  anonymousId: string,
): Promise<string> {
  try {
    const user = await prisma.user.upsert({
      where: { id: anonymousId },
      update: {},
      create: { id: anonymousId },
    });
    return user.id;
  } catch (error) {
    console.error('Error creating anonymous user:', error);
    return anonymousId; // Return the ID anyway, we'll try again next time
  }
}

// Team related functions
export async function getAllTeams() {
  return prisma.team.findMany();
}

export async function getTeamById(id: string) {
  return prisma.team.findUnique({
    where: { id },
  });
}

export async function getTeamByName(name: string) {
  return prisma.team.findUnique({
    where: { name },
  });
}

// Game related functions
export async function getAllGames() {
  return prisma.game.findMany({
    include: {
      team1: true,
      team2: true,
    },
  });
}

export async function getGameById(id: string) {
  return prisma.game.findUnique({
    where: { id },
    include: {
      team1: true,
      team2: true,
    },
  });
}

export async function getGamesByRegion(region: string) {
  return prisma.game.findMany({
    where: { region: region as any },
    include: {
      team1: true,
      team2: true,
    },
  });
}
