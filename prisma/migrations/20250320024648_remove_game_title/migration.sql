/*
  Warnings:

  - You are about to drop the column `balls` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `gameTitle` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "balls",
DROP COLUMN "gameTitle",
DROP COLUMN "region";
