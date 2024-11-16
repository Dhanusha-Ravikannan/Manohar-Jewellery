/*
  Warnings:

  - Added the required column `lot_id` to the `product_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bill_items` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `bills` ADD COLUMN `bill_name` VARCHAR(191) NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `product_info` ADD COLUMN `barcode_weight` VARCHAR(191) NULL,
    ADD COLUMN `lot_id` INTEGER NOT NULL,
    ADD COLUMN `product_type` ENUM('hold', 'active', 'sold') NOT NULL DEFAULT 'active',
    MODIFY `before_weight` DOUBLE NULL,
    MODIFY `after_weight` DOUBLE NULL,
    MODIFY `difference` DOUBLE NULL,
    MODIFY `adjustment` DOUBLE NULL,
    MODIFY `final_weight` DOUBLE NULL,
    MODIFY `product_number` VARCHAR(191) NULL,
    MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `lot_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lot_name` VARCHAR(191) NOT NULL,
    `bulk_weight_before` DOUBLE NULL,
    `bulk_after_weight` DOUBLE NULL,
    `adjustment_percent` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lot_process` ENUM('completed', 'not_completed') NOT NULL DEFAULT 'not_completed',

    UNIQUE INDEX `lot_info_lot_name_key`(`lot_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_info` ADD CONSTRAINT `product_info_lot_id_fkey` FOREIGN KEY (`lot_id`) REFERENCES `lot_info`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
