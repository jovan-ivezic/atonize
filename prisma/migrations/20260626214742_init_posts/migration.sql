-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "category" TEXT NOT NULL,
    "icon" TEXT,
    "excerpt" TEXT,
    "series" TEXT,
    "seriesOrder" INTEGER,
    "translationKey" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_locale_key" ON "Post"("slug", "locale");
