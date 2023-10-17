-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BarbecueParticipants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "barbecueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL DEFAULT 0,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "BarbecueParticipants_barbecueId_fkey" FOREIGN KEY ("barbecueId") REFERENCES "Barbecues" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BarbecueParticipants" ("amount", "barbecueId", "id", "name") SELECT "amount", "barbecueId", "id", "name" FROM "BarbecueParticipants";
DROP TABLE "BarbecueParticipants";
ALTER TABLE "new_BarbecueParticipants" RENAME TO "BarbecueParticipants";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
