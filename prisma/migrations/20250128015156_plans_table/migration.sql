/*
  Warnings:

  - You are about to drop the column `plan` on the `Subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "plan";

-- DropEnum
DROP TYPE "Plan";

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "features" TEXT[],
    "subscriptionId" TEXT NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plan_subscriptionId_key" ON "Plan"("subscriptionId");

-- CreateIndex
CREATE INDEX "Plan_subscriptionId_idx" ON "Plan"("subscriptionId");
