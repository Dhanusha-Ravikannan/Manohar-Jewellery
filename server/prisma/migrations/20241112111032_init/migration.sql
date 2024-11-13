/*
  Warnings:

  - A unique constraint covering the columns `[product_number]` on the table `product_info` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `product_info_product_number_key` ON `product_info`(`product_number`);
