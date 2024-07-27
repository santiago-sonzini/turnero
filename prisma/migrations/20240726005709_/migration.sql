/*
  Warnings:

  - You are about to drop the column `hour` on the `ServiceAvailability` table. All the data in the column will be lost.
  - You are about to drop the column `minutes` on the `ServiceAvailability` table. All the data in the column will be lost.
  - The `dayOfWeek` column on the `ServiceAvailability` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[serviceId,dayOfWeek]` on the table `ServiceAvailability` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ServiceAvailability_serviceId_dayOfWeek_hour_key";

-- AlterTable
ALTER TABLE "ServiceAvailability" DROP COLUMN "hour",
DROP COLUMN "minutes",
ADD COLUMN     "endHour" TEXT NOT NULL DEFAULT '21:00',
ADD COLUMN     "startHour" TEXT NOT NULL DEFAULT '16:00',
DROP COLUMN "dayOfWeek",
ADD COLUMN     "dayOfWeek" INTEGER[];

-- CreateIndex
CREATE UNIQUE INDEX "ServiceAvailability_serviceId_dayOfWeek_key" ON "ServiceAvailability"("serviceId", "dayOfWeek");
