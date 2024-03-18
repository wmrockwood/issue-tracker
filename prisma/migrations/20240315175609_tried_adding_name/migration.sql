/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `reporterId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_name_key` ON `User`(`name`);

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_reporterId_fkey` FOREIGN KEY (`reporterId`) REFERENCES `User`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;
