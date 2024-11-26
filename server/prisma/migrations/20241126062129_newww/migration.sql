-- DropForeignKey
ALTER TABLE `bill_items` DROP FOREIGN KEY `bill_items_bill_number_fkey`;

-- DropForeignKey
ALTER TABLE `bill_items` DROP FOREIGN KEY `bill_items_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `product_info` DROP FOREIGN KEY `product_info_lot_id_fkey`;

-- AddForeignKey
ALTER TABLE `bill_items` ADD CONSTRAINT `bill_items_bill_number_fkey` FOREIGN KEY (`bill_number`) REFERENCES `bills`(`bill_number`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bill_items` ADD CONSTRAINT `bill_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product_info`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_info` ADD CONSTRAINT `product_info_lot_id_fkey` FOREIGN KEY (`lot_id`) REFERENCES `lot_info`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
