-- CreateTable
CREATE TABLE "deck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "meta" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "meta" TEXT NOT NULL,
    "deckId" TEXT,
    CONSTRAINT "card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
