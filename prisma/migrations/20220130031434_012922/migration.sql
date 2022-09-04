-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_artistID_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- DropForeignKey
ALTER TABLE "Work" DROP CONSTRAINT "Work_artistID_fkey";

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_artistID_fkey" FOREIGN KEY ("artistID") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_artistID_fkey" FOREIGN KEY ("artistID") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Artist.email_unique" RENAME TO "Artist_email_key";

-- RenameIndex
ALTER INDEX "Artist.handle_unique" RENAME TO "Artist_handle_key";

-- RenameIndex
ALTER INDEX "Artist.name_unique" RENAME TO "Artist_name_key";

-- RenameIndex
ALTER INDEX "Token.emailToken_unique" RENAME TO "Token_emailToken_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "User.name_unique" RENAME TO "User_name_key";
