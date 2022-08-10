/*
  Warnings:

  - A unique constraint covering the columns `[year,month,week]` on the table `DailyLookInside` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `DailyLookInside_year_month_week_key` ON `DailyLookInside`(`year`, `month`, `week`);
