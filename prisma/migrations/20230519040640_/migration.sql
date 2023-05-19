/*
  Warnings:

  - You are about to drop the column `inviterId` on the `Invitation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invitableId]` on the table `Invitation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invitedById` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invitableId` to the `Invitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inviterUserId` to the `Invitation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_inviterId_fkey";

-- DropIndex
DROP INDEX "Invitation_inviterId_key";

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "invitedById" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Invitation" DROP COLUMN "inviterId",
ADD COLUMN     "invitableId" UUID NOT NULL,
ADD COLUMN     "inviterUserId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Invitable" (
    "id" UUID NOT NULL,
    "profileType" VARCHAR(50) NOT NULL,
    "profileId" UUID NOT NULL,

    CONSTRAINT "Invitable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_invitableId_key" ON "Invitation"("invitableId");

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_invitableId_fkey" FOREIGN KEY ("invitableId") REFERENCES "Invitable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_inviterUserId_fkey" FOREIGN KEY ("inviterUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "Invitable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
