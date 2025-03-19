/*
  Warnings:

  - You are about to drop the column `latitude` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "latitude",
DROP COLUMN "location",
DROP COLUMN "longitude",
ADD COLUMN     "locationId" TEXT;

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "round" TEXT NOT NULL,
    "dates" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);
