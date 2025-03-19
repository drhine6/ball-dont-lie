-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_team1Id_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_team2Id_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "location" TEXT;
