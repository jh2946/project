-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_deck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta" TEXT NOT NULL
);
INSERT INTO "new_deck" ("id", "meta") SELECT "id", "meta" FROM "deck";
DROP TABLE "deck";
ALTER TABLE "new_deck" RENAME TO "deck";
CREATE TABLE "new_card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta" TEXT NOT NULL,
    "deckId" TEXT,
    CONSTRAINT "card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_card" ("deckId", "id", "meta") SELECT "deckId", "id", "meta" FROM "card";
DROP TABLE "card";
ALTER TABLE "new_card" RENAME TO "card";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
