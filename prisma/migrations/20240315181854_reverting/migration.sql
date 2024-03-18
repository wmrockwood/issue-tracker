/*
  Warnings:

  - You are about to drop the column `userName` on the `Issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_userName_fkey`;

-- AlterTable
ALTER TABLE `Issue` DROP COLUMN `userName`;
