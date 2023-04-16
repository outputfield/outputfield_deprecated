/*
  Warnings:

  - Changed the type of `status` on the `ApplicationStatus` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `Link` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ApplicationStatus" DROP COLUMN "status",
ADD COLUMN     "status" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "type",
ADD COLUMN     "type" VARCHAR(50) NOT NULL;

-- DropEnum
DROP TYPE "AppStatus";

-- DropEnum
DROP TYPE "LinkType";

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationStatus_applicationId_status_key" ON "ApplicationStatus"("applicationId", "status");
