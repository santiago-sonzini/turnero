/*
  Warnings:

  - Added the required column `timesPerHour` to the `ServiceAvailability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceAvailability" ADD COLUMN     "timesPerHour" INTEGER NOT NULL;
