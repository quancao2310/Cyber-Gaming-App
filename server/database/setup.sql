-- Drop database if it already exists
DROP DATABASE IF EXISTS cyber_gaming;

-- Create and use the database
CREATE DATABASE cyber_gaming
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
USE cyber_gaming;

SET foreign_key_checks = 0;

DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
                    `id` INT PRIMARY KEY AUTO_INCREMENT,
                    `firstname` VARCHAR(60) NOT NULL,
                    `lastname` VARCHAR(60) NOT NULL,
                    `email` VARCHAR(255),
                    `phone_number` VARCHAR(20),
                    `year_of_birth` INT,
                    `sex` ENUM ('Male', 'Female'),
                    `customer_id_introduce` INT,
                    INDEX (`email`),
                    INDEX (`phone_number`)
);

DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
                    `id` INT PRIMARY KEY AUTO_INCREMENT,
                    `account_name` VARCHAR(60) UNIQUE NOT NULL,
                    `password` VARCHAR(255) NOT NULL,
                    `account_balance` INT NOT NULL DEFAULT 0,
                    `account_status` ENUM('active', 'disabled'),
                    `time_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    `last_login` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    `customer_id` INT NOT NULL,
                    FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
);

DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff` (
                    `id` INT PRIMARY KEY AUTO_INCREMENT,
                    `firstname` VARCHAR(60) NOT NULL,
                    `lastname` VARCHAR(60) NOT NULL,
                    `CCCD` VARCHAR(60) NOT NULL,
                    `age` INT,
                    `sex` ENUM ('Male', 'Female'),
                    `type` ENUM ('Accountant', 'Maintain'),
                    `type` ENUM('Accountant', 'Maintenance', 'Security', 'Cashier', 'Server'),
                    `bank_name` VARCHAR(60),
                    `bank_credit_num` VARCHAR(60),
                    `start_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `staff_email`;
CREATE TABLE `staff_email` (
                    `staff_id` INT,
                    `email` VARCHAR(255),
                    FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`)
);

DROP TABLE IF EXISTS `staff_phone_number`;
CREATE TABLE `staff_phone_number` (
                    `staff_id` INT,
                    `phone_number` VARCHAR(20),
                    FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`)
);

DROP TABLE IF EXISTS `accountant_staff`;
CREATE TABLE `accountant_staff` (
                    `staff_id` INT PRIMARY KEY,
                    `degree` VARCHAR(60),
                    FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`)
);

DROP TABLE IF EXISTS `maintenance_staff`;
CREATE TABLE `maintenance_staff` (
                    `staff_id` INT PRIMARY KEY,
                    `degree` VARCHAR(60),
                    FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`)
);

DROP TABLE IF EXISTS `transaction`;
CREATE TABLE `transaction` (
                    `id` INT PRIMARY KEY AUTO_INCREMENT,
                    `amount` INT NOT NULL DEFAULT 0,
                    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    `account_id` INT,
                    `content` VARCHAR(60),
                    `status` ENUM ('Recharge', 'Payment'),
                    `invoice_id` INT,
                    FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
                    FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`),
							      CONSTRAINT chk_payment_invoice_id CHECK (status = 'Payment' OR (status = 'Recharge' AND invoice_id IS NULL))
);

DROP TABLE IF EXISTS `invoice`;
CREATE TABLE `invoice` (
                    `id` INT PRIMARY KEY AUTO_INCREMENT,
                    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    `payment_status` VARCHAR(20),
                    `total_order_value` INT DEFAULT 0,
                    `staff_id` INT,
                    `customer_id` INT,
                    FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`),
                    FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
);

DROP TABLE IF EXISTS `invoice_product`;
CREATE TABLE `invoice_product` (
                    `invoice_id` INT,
                    `product_id` INT,
                    `price` DOUBLE,
                    `quantity` INT DEFAULT 0,
                    PRIMARY KEY (`invoice_id`, `product_id`),
                    FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`),
                    FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
);

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
                    `id` INT PRIMARY KEY AUTO_INCREMENT,
                    `description` VARCHAR(255),
                    `name` VARCHAR(60),
                    `category` VARCHAR(60),
                    `price` DOUBLE,
                    `item_sold` INT DEFAULT 0
);

DROP TABLE IF EXISTS `product_image`;
CREATE TABLE `product_image` (
                    `product_id` INT,
                    `url` VARCHAR(255),
                    `title` VARCHAR(60),
                    FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
);

DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
                    `room_type` VARCHAR(20),
                    `room_order` INT,
                    `description` VARCHAR(255),
                    `unit_price` INT,
                    `available_slot_quantity` INT,
                    `room_status` VARCHAR(20),
                    `rent_price` INT,
                    PRIMARY KEY (`room_type`, `room_order`)
);

DROP TABLE IF EXISTS `room_invoice`;
CREATE TABLE `room_invoice` (
                    `room_type` VARCHAR(20),
                    `room_order` INT,
                    `invoice_id` INT,
                    `start_time` DATETIME,
                    `end_time` DATETIME,
                    PRIMARY KEY (`room_type`, `room_order`, `invoice_id`),
                    FOREIGN KEY (`room_type`, `room_order`) REFERENCES `room` (`room_type`, `room_order`),
                    FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`)
);

DROP TABLE IF EXISTS `slot`;
CREATE TABLE `slot` (
                    `room_type` VARCHAR(20),
                    `room_order` INT,
                    `slot_order` INT,
                    PRIMARY KEY (`room_type`, `room_order`, `slot_order`),
                    FOREIGN KEY (`room_type`, `room_order`) REFERENCES `room` (`room_type`, `room_order`)
);

DROP TABLE IF EXISTS `slot_invoice`;
CREATE TABLE `slot_invoice` (
                    `room_type` VARCHAR(20),
                    `room_order` INT,
                    `slot_order` INT,
                    `invoice_id` INT,
                    `start_time` DATETIME,
                    `end_time` DATETIME,
                    PRIMARY KEY (`room_type`, `room_order`, `slot_order`, `invoice_id`),
                    FOREIGN KEY (`room_type`, `room_order`, `slot_order`) REFERENCES `slot` (`room_type`, `room_order`, `slot_order`),
                    FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`)
);

DROP TABLE IF EXISTS `device`;
CREATE TABLE `device` (
                    `room_type` VARCHAR(20),
                    `room_order` INT,
                    `slot_order` INT,
                    `device_order` INT,
                    `name` VARCHAR(40),
                    `type` VARCHAR(20),
                    `start_date` DATE,
                    `last_time_maintain` DATE,
                    `expire_time` DATE,
                    PRIMARY KEY (`room_type`, `room_order`, `slot_order`, `device_order`),
                    FOREIGN KEY (`room_type`, `room_order`, `slot_order`) REFERENCES `slot` (`room_type`, `room_order`, `slot_order`)
);

DROP TABLE IF EXISTS `maintain_staff_device`;
CREATE TABLE `maintain_staff_device` (
                    `staff_id` INT,
                    `room_type` VARCHAR(20),
                    `room_order` INT,
                    `slot_order` INT,
                    `device_order` INT,
                    `time` DATE,
                    PRIMARY KEY (`staff_id`, `room_type`, `room_order`, `slot_order`, `device_order`),
                    FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`),
                    FOREIGN KEY (`room_type`, `room_order`, `slot_order`, `device_order`) REFERENCES `device` (`room_type`, `room_order`, `slot_order`, `device_order`)
);

DROP TABLE IF EXISTS `discount_event`;
CREATE TABLE `discount_event` (
                    `id` INT PRIMARY KEY AUTO_INCREMENT,
                    `name` VARCHAR(60),
                    `start_date` DATE,
                    `end_date` DATE,
                    `discount_percent` INT
);

DROP TABLE IF EXISTS `invoice_discount`;
CREATE TABLE `invoice_discount` (
                    `invoice_id` INT,
                    `discount_id` INT,
                    PRIMARY KEY (`invoice_id`, `discount_id`),
                    FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`),
                    FOREIGN KEY (`discount_id`) REFERENCES `discount_event` (`id`)
);

SET foreign_key_checks = 1;