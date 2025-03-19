/*
  Warnings:

  - You are about to drop the column `location` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "location",
ADD COLUMN     "homeLocation" TEXT;
