-- AlterTable
ALTER TABLE `DailyLookInside` MODIFY `lookInsideFri` TEXT NULL,
    MODIFY `lookInsideMon` TEXT NULL,
    MODIFY `lookInsideSat` TEXT NULL,
    MODIFY `lookInsideSun` TEXT NULL,
    MODIFY `lookInsideThu` TEXT NULL,
    MODIFY `lookInsideTue` TEXT NULL,
    MODIFY `lookInsideWed` TEXT NULL;

-- AlterTable
ALTER TABLE `WeeklyAnalysis` MODIFY `coreMission` TEXT NULL,
    MODIFY `lookInside` TEXT NULL,
    MODIFY `mainFocus` TEXT NULL,
    MODIFY `lifeCoreMission` TEXT NULL,
    MODIFY `lifeLookInside` TEXT NULL,
    MODIFY `lifeMainFocus` TEXT NULL;
