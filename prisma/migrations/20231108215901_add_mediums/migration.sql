/*
  Warnings:

  - You are about to drop the column `mediums` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `mediumsOfInterest` on the `Artist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "mediums",
DROP COLUMN "mediumsOfInterest";

-- CreateTable
CREATE TABLE "Medium" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Medium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediumsOnArtist" (
    "artistId" UUID NOT NULL,
    "mediumName" TEXT NOT NULL,

    CONSTRAINT "MediumsOnArtist_pkey" PRIMARY KEY ("artistId","mediumName")
);

-- CreateTable
CREATE TABLE "MediumsOfInterestOnArtist" (
    "artistId" UUID NOT NULL,
    "mediumName" TEXT NOT NULL,

    CONSTRAINT "MediumsOfInterestOnArtist_pkey" PRIMARY KEY ("artistId","mediumName")
);

-- CreateIndex
CREATE UNIQUE INDEX "Medium_name_key" ON "Medium"("name");

-- AddForeignKey
ALTER TABLE "MediumsOnArtist" ADD CONSTRAINT "MediumsOnArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediumsOnArtist" ADD CONSTRAINT "MediumsOnArtist_mediumName_fkey" FOREIGN KEY ("mediumName") REFERENCES "Medium"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediumsOfInterestOnArtist" ADD CONSTRAINT "MediumsOfInterestOnArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediumsOfInterestOnArtist" ADD CONSTRAINT "MediumsOfInterestOnArtist_mediumName_fkey" FOREIGN KEY ("mediumName") REFERENCES "Medium"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
