-- CreateTable
CREATE TABLE `DailyLookInside` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NULL,
    `month` VARCHAR(191) NULL,
    `week` VARCHAR(191) NULL,
    `dayOfWeek` INTEGER NULL,
    `lookInside` TEXT NULL,

    UNIQUE INDEX `DailyLookInside_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DailyLookInside` ADD CONSTRAINT `DailyLookInside_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
