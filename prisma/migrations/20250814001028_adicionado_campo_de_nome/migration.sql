/*
  Warnings:

  - Added the required column `name` to the `credential` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_credential" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "categoryId" TEXT,
    CONSTRAINT "credential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "credential_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_credential" ("categoryId", "createdAt", "id", "notes", "password", "updatedAt", "url", "userId", "username") SELECT "categoryId", "createdAt", "id", "notes", "password", "updatedAt", "url", "userId", "username" FROM "credential";
DROP TABLE "credential";
ALTER TABLE "new_credential" RENAME TO "credential";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
