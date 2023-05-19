-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_invitedById_fkey";

-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_invitableId_fkey";

-- AlterTable
ALTER TABLE "Artist" ALTER COLUMN "invitedById" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Invitation" ALTER COLUMN "invitableId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_invitableId_fkey" FOREIGN KEY ("invitableId") REFERENCES "Invitable"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "Invitable"("id") ON DELETE SET NULL ON UPDATE CASCADE;
