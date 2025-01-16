-- CreateEnum
CREATE TYPE "Industry" AS ENUM ('ECOMMERCE', 'RESTAURANT');

-- AlterTable
ALTER TABLE "Website" ADD COLUMN     "industry" "Industry" NOT NULL DEFAULT 'ECOMMERCE';
