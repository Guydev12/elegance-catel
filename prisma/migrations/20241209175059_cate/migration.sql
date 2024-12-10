-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bildboard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "categoryId" TEXT,
    CONSTRAINT "Bildboard_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Bildboard" ("categoryId", "id", "image", "text") SELECT "categoryId", "id", "image", "text" FROM "Bildboard";
DROP TABLE "Bildboard";
ALTER TABLE "new_Bildboard" RENAME TO "Bildboard";
CREATE UNIQUE INDEX "Bildboard_categoryId_key" ON "Bildboard"("categoryId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
