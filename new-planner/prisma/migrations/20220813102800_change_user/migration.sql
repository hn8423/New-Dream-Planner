/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_userId_fkey`;

-- AlterTable
ALTER TABLE `Account` ADD COLUMN `oauth_token` VARCHAR(191) NULL,
    ADD COLUMN `oauth_token_secret` VARCHAR(191) NULL,
    MODIFY `provider` VARCHAR(191) NULL,
    MODIFY `providerAccountId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Session`;

-- CreateIndex
CREATE UNIQUE INDEX `Account_userId_key` ON `Account`(`userId`);
