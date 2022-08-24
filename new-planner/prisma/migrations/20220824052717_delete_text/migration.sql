-- AlterTable
ALTER TABLE `DailyLookInside` MODIFY `lookInsideFri` VARCHAR(191) NULL,
    MODIFY `lookInsideMon` VARCHAR(191) NULL,
    MODIFY `lookInsideSat` VARCHAR(191) NULL,
    MODIFY `lookInsideSun` VARCHAR(191) NULL,
    MODIFY `lookInsideThu` VARCHAR(191) NULL,
    MODIFY `lookInsideTue` VARCHAR(191) NULL,
    MODIFY `lookInsideWed` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `WeeklyAnalysis` MODIFY `coreMission` VARCHAR(191) NULL,
    MODIFY `lookInside` VARCHAR(191) NULL,
    MODIFY `mainFocus` VARCHAR(191) NULL,
    MODIFY `lifeCoreMission` VARCHAR(191) NULL,
    MODIFY `lifeLookInside` VARCHAR(191) NULL,
    MODIFY `lifeMainFocus` VARCHAR(191) NULL;
