-- CreateTable
CREATE TABLE "userAuth" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "userName" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "userAuth_userName_key" ON "userAuth"("userName");
