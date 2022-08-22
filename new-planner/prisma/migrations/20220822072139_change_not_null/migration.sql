/*
  Warnings:

  - Made the column `year` on table `WeeklyAnalysis` required. This step will fail if there are existing NULL values in that column.
  - Made the column `month` on table `WeeklyAnalysis` required. This step will fail if there are existing NULL values in that column.
  - Made the column `week` on table `WeeklyAnalysis` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `WeeklyAnalysis` DROP FOREIGN KEY `WeeklyAnalysis_userId_fkey`;

-- AlterTable
ALTER TABLE `WeeklyAnalysis` MODIFY `year` VARCHAR(191) NOT NULL,
    MODIFY `month` VARCHAR(191) NOT NULL,
    MODIFY `week` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `WeeklyAnalysis` ADD CONSTRAINT `WeeklyAnalysis_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
