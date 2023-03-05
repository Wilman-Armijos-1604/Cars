-- CreateTable
CREATE TABLE `Auto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `marca` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `conPlaca` BOOLEAN NOT NULL,
    `precio` DECIMAL(65, 30) NOT NULL,
    `cantidadStock` INTEGER NOT NULL,
    `fechaIngreso` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
