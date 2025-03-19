/*
  Warnings:

  - You are about to drop the column `homeLocation` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "homeLocation",
ADD COLUMN     "location" TEXT;

-- DropTable
DROP TABLE "Location";
