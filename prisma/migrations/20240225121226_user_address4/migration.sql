/*
  Warnings:

  - You are about to drop the column `apellido` on the `UserAddress` table. All the data in the column will be lost.
  - Added the required column `apellidos` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "apellido",
ADD COLUMN     "apellidos" TEXT NOT NULL;
