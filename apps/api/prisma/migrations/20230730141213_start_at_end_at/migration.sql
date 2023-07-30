/*
  Warnings:

  - You are about to drop the column `endTime` on the `Period` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Period` table. All the data in the column will be lost.
  - Added the required column `endAt` to the `Period` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAt` to the `Period` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Period" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "endAt" INTEGER NOT NULL,
ADD COLUMN     "startAt" INTEGER NOT NULL;
