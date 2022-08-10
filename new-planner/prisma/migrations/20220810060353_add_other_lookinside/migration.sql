/*
  Warnings:

  - You are about to drop the column `dayOfWeek` on the `DailyLookInside` table. All the data in the column will be lost.
  - You are about to drop the column `lookInside` on the `DailyLookInside` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `DailyLookInside` DROP COLUMN `dayOfWeek`,
    DROP COLUMN `lookInside`,
    ADD COLUMN `lookInsideFri` TEXT NULL,
    ADD COLUMN `lookInsideMon` TEXT NULL,
    ADD COLUMN `lookInsideSat` TEXT NULL,
    ADD COLUMN `lookInsideSun` TEXT NULL,
    ADD COLUMN `lookInsideThu` TEXT NULL,
    ADD COLUMN `lookInsideTue` TEXT NULL,
    ADD COLUMN `lookInsideWed` TEXT NULL;
