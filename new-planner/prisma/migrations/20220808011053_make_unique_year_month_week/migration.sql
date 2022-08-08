/*
  Warnings:

  - A unique constraint covering the columns `[year,month,week]` on the table `WeeklyAnalysis` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `WeeklyAnalysis_year_month_week_key` ON `WeeklyAnalysis`(`year`, `month`, `week`);
