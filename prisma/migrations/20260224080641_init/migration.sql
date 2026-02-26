/*
  Warnings:

  - The values [SUPER_ADMIN,CHURCH_ADMIN,ANNOUNCEMENT] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `message` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `joinedAt` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Visitor` table. All the data in the column will be lost.
  - Added the required column `content` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Finance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Finance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Visitor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Visitor` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "FinanceType" AS ENUM ('INCOME', 'EXPENSE');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'FINANCE', 'MEMBER');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "message",
ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Finance" ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" "FinanceType" NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "fullName",
DROP COLUMN "joinedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "status" "MemberStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "fullName",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "followUp" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT;
