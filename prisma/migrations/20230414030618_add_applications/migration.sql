/*
  Warnings:

  - The primary key for the `Artist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Artist` table. All the data in the column will be lost.
  - You are about to alter the column `pronouns` on the `Artist` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `location` on the `Artist` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `iconColor` on the `Artist` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - The primary key for the `Link` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `artistID` on the `Link` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nominatorId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Work` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,handle]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url,artistId]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[applicationId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,applicationId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `id` on the `Artist` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `pronouns` on table `Artist` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `userId` on the `Artist` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `artistId` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Link` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `title` on table `Link` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AppStatus" AS ENUM ('PENDING_REVIEW', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "LinkType" AS ENUM ('WORK', 'OTHER');

-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_userId_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_artistID_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_nominatorId_fkey";

-- DropForeignKey
ALTER TABLE "Work" DROP CONSTRAINT "Work_artistID_fkey";

-- AlterTable
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_pkey",
DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "title" DROP DEFAULT,
ALTER COLUMN "pronouns" SET NOT NULL,
ALTER COLUMN "pronouns" DROP DEFAULT,
ALTER COLUMN "pronouns" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "bio" DROP DEFAULT,
ALTER COLUMN "location" DROP DEFAULT,
ALTER COLUMN "location" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "iconColor" DROP DEFAULT,
ALTER COLUMN "iconColor" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "handle" SET DATA TYPE TEXT,
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
ADD CONSTRAINT "Artist_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Link" DROP CONSTRAINT "Link_pkey",
DROP COLUMN "artistID",
ADD COLUMN     "artistId" UUID NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type" "LinkType" NOT NULL DEFAULT E'OTHER',
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "title" DROP DEFAULT,
ALTER COLUMN "url" DROP DEFAULT,
ADD CONSTRAINT "Link_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "created_at",
DROP COLUMN "nominatorId",
DROP COLUMN "password",
ADD COLUMN     "applicationId" UUID,
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Work";

-- CreateTable
CREATE TABLE "Application" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "statement" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "requiredLink" TEXT NOT NULL,
    "link2" TEXT NOT NULL,
    "link3" TEXT NOT NULL,
    "invitationId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationStatus" (
    "id" UUID NOT NULL,
    "applicationId" UUID NOT NULL,
    "status" "AppStatus" NOT NULL DEFAULT E'PENDING_REVIEW',

    CONSTRAINT "ApplicationStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inviterId" UUID NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_email_invitationId_key" ON "Application"("email", "invitationId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationStatus_applicationId_status_key" ON "ApplicationStatus"("applicationId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_inviterId_key" ON "Invitation"("inviterId");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_userId_key" ON "Artist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_userId_handle_key" ON "Artist"("userId", "handle");

-- CreateIndex
CREATE UNIQUE INDEX "Link_url_artistId_key" ON "Link"("url", "artistId");

-- CreateIndex
CREATE UNIQUE INDEX "User_applicationId_key" ON "User"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_applicationId_key" ON "User"("email", "applicationId");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationStatus" ADD CONSTRAINT "ApplicationStatus_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
