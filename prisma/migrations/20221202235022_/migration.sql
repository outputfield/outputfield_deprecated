/*
  Warnings:

  - You are about to drop the column `referrerId` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Link` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_referrerId_fkey";

-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_userId_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_artistID_fkey";

-- DropForeignKey
ALTER TABLE "Work" DROP CONSTRAINT "Work_artistID_fkey";

-- DropIndex
DROP INDEX "Artist_referrerId_key";

-- DropIndex
DROP INDEX "User_name_key";

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "referrerId";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "link",
DROP COLUMN "type",
ADD COLUMN     "label" TEXT DEFAULT E'',
ADD COLUMN     "url" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nominatorId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_nominatorId_fkey" FOREIGN KEY ("nominatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_artistID_fkey" FOREIGN KEY ("artistID") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_artistID_fkey" FOREIGN KEY ("artistID") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
