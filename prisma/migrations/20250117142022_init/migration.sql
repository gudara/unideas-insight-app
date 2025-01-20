-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "contactPersonName" VARCHAR(100) NOT NULL,
    "contactNumber" VARCHAR(20),
    "contactEmail" VARCHAR(50),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
