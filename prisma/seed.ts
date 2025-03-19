import { PrismaClient } from '@prisma/client';
import { teams as teamsData } from '../src/data/teams';
import { games as gamesData } from '../src/data/games';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // Clean up existing data
  await prisma.game.deleteMany();
  await prisma.team.deleteMany();

  // Insert teams
  const teamsMap = new Map();

  for (const team of teamsData) {
    const createdTeam = await prisma.team.create({
      data: {
        name: team.name,
        logoId: team.logoId,
        seed: team.seed,
        brand: team.brand,
        region: team.region as any,
      },
    });

    teamsMap.set(team.name, createdTeam.id);
    console.log(`Created team: ${team.name}`);
  }

  // Insert games
  for (const game of gamesData) {
    const team1Id = teamsMap.get(game.team1);
    const team2Id = teamsMap.get(game.team2);

    if (!team1Id || !team2Id) {
      console.warn(
        `Skipping game due to missing team reference: ${game.game}`,
      );
      continue;
    }

    await prisma.game.create({
      data: {
        gameTitle: game.game,
        region: game.region as any,
        balls: game.balls,
        recommendation: game.recommendation,
        betType: game.type.replace(' ', '_') as any,
        confidence: game.confidence as any,
        team1Id,
        team2Id,
      },
    });

    console.log(`Created game: ${game.game}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
