/*
  Warnings:

  - You are about to drop the column `subscriptionId` on the `Plan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[planId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Plan_subscriptionId_idx";

-- DropIndex
DROP INDEX "Plan_subscriptionId_key";

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "subscriptionId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "planId" TEXT;

-- CreateIndex
CREATE INDEX "Plan_name_idx" ON "Plan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_planId_key" ON "Subscription"("planId");
