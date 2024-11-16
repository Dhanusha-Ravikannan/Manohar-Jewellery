/*
  Warnings:

  - You are about to alter the column `barcode_weight` on the `product_info` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `product_info` MODIFY `barcode_weight` DOUBLE NULL;
