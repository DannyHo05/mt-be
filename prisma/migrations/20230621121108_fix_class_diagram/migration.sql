/*
  Warnings:

  - You are about to drop the `GroupApp` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `groupId` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "group" DROP CONSTRAINT "group_group_app_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_groupId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_group_app_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "groupId" SET NOT NULL;

-- DropTable
DROP TABLE "GroupApp";

-- CreateTable
CREATE TABLE "group_apps" (
    "id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "group_apps_id_key" ON "group_apps"("id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_group_app_id_fkey" FOREIGN KEY ("group_app_id") REFERENCES "group_apps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_group_app_id_fkey" FOREIGN KEY ("group_app_id") REFERENCES "group_apps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
