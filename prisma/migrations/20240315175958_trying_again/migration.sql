/*
  Warnings:

  - You are about to drop the column `reporterId` on the `Issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_reporterId_fkey`;

-- AlterTable
ALTER TABLE `Issue` DROP COLUMN `reporterId`,
    ADD COLUMN `userName` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_userName_fkey` FOREIGN KEY (`userName`) REFERENCES `User`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;
