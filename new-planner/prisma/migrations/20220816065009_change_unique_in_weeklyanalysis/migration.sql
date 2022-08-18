/*
  Warnings:

  - A unique constraint covering the columns `[year,month,week,userId]` on the table `WeeklyAnalysis` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `WeeklyAnalysis_year_month_week_key` ON `WeeklyAnalysis`;

-- CreateIndex
CREATE UNIQUE INDEX `WeeklyAnalysis_year_month_week_userId_key` ON `WeeklyAnalysis`(`year`, `month`, `week`, `userId`);
