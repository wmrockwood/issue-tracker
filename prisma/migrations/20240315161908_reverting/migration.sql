-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_assignedToUserId_fkey`;

-- DropIndex
DROP INDEX `User_name_key` ON `User`;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
