-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('ELECTRONICS', 'FURNITURE', 'HOME_APPLIANCES', 'SPORTING_GOODS', 'OUTDOOR', 'TOYS');

-- CreateEnum
CREATE TYPE "PricingType" AS ENUM ('DAY', 'HOUR', 'MONTH');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "categories" "CategoryType"[],
    "buyPrice" DOUBLE PRECISION,
    "price" DOUBLE PRECISION,
    "pricingType" "PricingType",
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
