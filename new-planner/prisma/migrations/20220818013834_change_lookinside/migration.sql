/*
  Warnings:

  - A unique constraint covering the columns `[year,month,week,userId]` on the table `DailyLookInside` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `DailyLookInside_year_month_week_key` ON `DailyLookInside`;

-- CreateIndex
CREATE UNIQUE INDEX `DailyLookInside_year_month_week_userId_key` ON `DailyLookInside`(`year`, `month`, `week`, `userId`);
