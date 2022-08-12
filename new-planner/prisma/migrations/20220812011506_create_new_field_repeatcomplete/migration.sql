/*
  Warnings:

  - You are about to drop the column `isRepeatComplte` on the `Schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Schedule` DROP COLUMN `isRepeatComplte`,
    ADD COLUMN `isRepeatComplete` VARCHAR(191) NULL;
