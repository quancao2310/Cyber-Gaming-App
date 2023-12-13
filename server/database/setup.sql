-- Drop database if it already exists
DROP DATABASE IF EXISTS cyber_gaming;

-- Create and use the database
CREATE DATABASE cyber_gaming
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
USE cyber_gaming;

SET foreign_key_checks = 0;

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

CREATE TABLE `account` (
                    `id` INT PRIMARY KEY AUTO_INCREMENT,
                    `account_name` VARCHAR(60) UNIQUE NOT NULL,
                    `password` VARCHAR(255) NOT NULL,
                    `account_balance` INT NOT NULL DEFAULT 0,
                    `time_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    `last_login` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    `customer_id` INT NOT NULL,
                    FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
);

CREATE TABLE `staff` (
                    `id` INT PRIMARY KEY AUTO_INCREMENT,
                    `firstname` VARCHAR(60) NOT NULL,
                    `lastname` VARCHAR(60) NOT NULL,
                    `CCCD` VARCHAR(60) NOT NULL,
                    `age` INT,
                    `sex` ENUM ('Male', 'Female'),
                    `bank_name` VARCHAR(60),
                    `bank_credit_num` VARCHAR(60),
                    `start_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `staff_email` (
                    `staff_id` INT,
                    `email` VARCHAR(255),
                    FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`)
);

CREATE TABLE `staff_phone_number` (
                    `staff_id` INT,
                    `phone_number` VARCHAR(20),
                    FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`)
);

CREATE TABLE `accountant_staff` (
                    `staff_id` INT PRIMARY KEY,
                    `degree` VARCHAR(60),
                    FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`)
);

CREATE TABLE `maintenance_staff` (
                    `staff_id` INT PRIMARY KEY,
                    `degree` VARCHAR(60),
                    FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`)
);

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

CREATE TABLE `invoice` (
                    `id` INT PRIMARY KEY AUTO_INCREMENT,
                    `payment_method` ENUM ('Credit Card', 'Bank Transfer', 'Cash'),
                    -- `payment_status` VARCHAR(20),
                    `staff_id` INT,
                    `customer_id` INT,
                    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`),
                    FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
);

CREATE TABLE `invoice_product` (
                    `invoice_id` INT,
                    `product_id` INT,
                    `price` DOUBLE,
                    `quantity` INT DEFAULT 0,
                    PRIMARY KEY (`invoice_id`, `product_id`),
                    FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`),
                    FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
);

CREATE TABLE `product` (
                    `id` INT PRIMARY KEY AUTO_INCREMENT,
                    `description` VARCHAR(255),
                    `name` VARCHAR(60),
                    `category` VARCHAR(60),
                    `price` DOUBLE,
                    `item_sold` INT DEFAULT 0
);

CREATE TABLE `product_image` (
                    `product_id` INT,
                    `url` VARCHAR(255),
                    `title` VARCHAR(60),
                    FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
);

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

CREATE TABLE `room_invoice` (
                    `room_type` VARCHAR(20),
                    `room_order` INT,
                    `invoice_id` INT,
                    `status` VARCHAR(20),
                    `start_time` DATETIME,
                    `end_time` DATETIME,
                    PRIMARY KEY (`room_type`, `room_order`, `invoice_id`),
                    FOREIGN KEY (`room_type`, `room_order`) REFERENCES `room` (`room_type`, `room_order`),
                    FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`)
);

CREATE TABLE `slot` (
                    `room_type` VARCHAR(20),
                    `room_order` INT,
                    `slot_order` INT,
                    PRIMARY KEY (`room_type`, `room_order`, `slot_order`),
                    FOREIGN KEY (`room_type`, `room_order`) REFERENCES `room` (`room_type`, `room_order`)
);

CREATE TABLE `slot_invoice` (
                    `room_type` VARCHAR(20),
                    `room_order` INT,
                    `slot_order` INT,
                    `invoice_id` INT,
                    `status` VARCHAR(20),
                    `start_time` DATETIME,
                    `end_time` DATETIME,
                    PRIMARY KEY (`room_type`, `room_order`, `slot_order`, `invoice_id`),
                    FOREIGN KEY (`room_type`, `room_order`, `slot_order`) REFERENCES `slot` (`room_type`, `room_order`, `slot_order`),
                    FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`)
);

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

CREATE TABLE `discount_event` (
                    `id` INT PRIMARY KEY AUTO_INCREMENT,
                    `name` VARCHAR(60),
                    `start_date` DATE,
                    `end_date` DATE,
                    `discount_percent` INT
);

CREATE TABLE `invoice_discount` (
                    `invoice_id` INT,
                    `discount_id` INT,
                    PRIMARY KEY (`invoice_id`, `discount_id`),
                    FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`),
                    FOREIGN KEY (`discount_id`) REFERENCES `discount_event` (`id`)
);

SET foreign_key_checks = 1;

-- Disable foreign key checks for the insert operation
SET foreign_key_checks = 0;

-- Insert values into the `customer` table
INSERT INTO `customer` (`firstname`, `lastname`, `email`, `phone_number`, `year_of_birth`, `sex`, `customer_id_introduce`)
VALUES
('John', 'Doe', 'john.doe@example.com', '1234567890', 1990, 'Male', NULL),
('Jane', 'Doe', 'jane.doe@example.com', '9876543210', 1995, 'Female', 1),
('Alice', 'Johnson', 'alice.johnson@example.com', '555-1234', 1992, 'Female', 1),
('Bob', 'Smith', 'bob.smith@example.com', '555-5678', 1985, 'Male', 2),
('Charlie', 'Williams', 'charlie.williams@example.com', '555-9876', 1998, 'Male', 3),
('Bill', 'Cipher', 'bill.cipher@example.com', '555-8765', 1990, 'Male', NULL),
('Bill', 'Doors', 'bill.doors@example.com', '555-8567', 1991, 'Male', NULL),
('Billy', 'Bonka', 'billy.bonka@example.com', '555-8965', 1992, 'Male', NULL);

-- Insert values into the `account` table
INSERT INTO `account` (`account_name`, `password`, `account_balance`, `customer_id`)
VALUES
('john_account', 'password123', 1000, 1),
('jane_account', 'securepass', 1500, 2),
('alice_account', 'alicepass', 800, 3),
('bob_account', 'bobpass', 1200, 4),
('charlie_account', 'charliepass', 500, 5),
('oneeye', 'triangle', 50000, 6),
('billicon', 'billpass', 50000, 7),
('billy_account', 'billypass', 50000, 8);

-- Insert values into the `staff` table
INSERT INTO `staff` (`firstname`, `lastname`, `CCCD`, `age`, `sex`, `bank_name`, `bank_credit_num`)
VALUES
('Cương', 'Đỗ', 'CCCD123456', 19, 'Male', 'BankA', '1234-5678-9101'),
('Danh', 'Mai', 'CCCD789012', 20, 'Male', 'BankB', '2345-6789-1011'),
('Long', 'Võ', 'CCCD555555', 19, 'Male', 'BankC', '5555-5555-5555'),
('Phúc', 'Huỳnh', 'CCCD666666', 20, 'Male', 'BankD', '6666-6666-6666'),
('Quân', 'Cao', 'CCCD777777', 20, 'Male', 'BankE', '7777-7777-7777');

-- Insert values into the `staff_email` table
INSERT INTO `staff_email` (`staff_id`, `email`)
VALUES
(1, 'cuong.do@example.com'),
(2, 'danh.mai@example.com'),
(3, 'baolong.vo@example.com'),
(4, 'phuc.huynh@example.com'),
(4, 'huynh.phuc@example.com'),
(5, 'quan.cao@example.com');

-- Insert values into the `staff_phone_number` table
INSERT INTO `staff_phone_number` (`staff_id`, `phone_number`)
VALUES
(1, '0912345678'),
(2, '0987654321'),
(3, '0911223344'),
(3, '0111111111'),
(4, '0912345678'),
(5, '0988765432');

-- Insert values into the `accountant_staff` table
INSERT INTO `accountant_staff` (`staff_id`, `degree`)
VALUES
(1, 'Accountant Degree of UEH');

-- Insert values into the `maintenance_staff` table
INSERT INTO `maintenance_staff` (`staff_id`, `degree`)
VALUES
(2, 'Maintenance Degree of BKU');

-- Insert values into the `transaction` table
INSERT INTO `transaction` (`amount`, `account_id`, `content`, `status`, `invoice_id`)
VALUES
(50, 1, 'Transaction 1 Content', 'Recharge', NULL),
(30, 1, 'Transaction 2 Content', 'Payment', 1),
(40, 2, 'Transaction 3 Content', 'Recharge', NULL),
(25, 2, 'Transaction 4 Content', 'Payment', 3);

-- Insert values into the `invoice` table
INSERT INTO `invoice` (`payment_method`, `staff_id`, `customer_id`)
VALUES
('Credit Card', 1, 1),
('Cash', 2, 2),
('Cash', 3, 3),
('Cash', 4, 4),
('Credit Card', 1, 5),
('Credit Card', 1, 6),
('Credit Card', 1, 7),
('Credit Card', 1, 8);

-- Insert values into the `invoice_product` table
INSERT INTO `invoice_product` (`invoice_id`, `product_id`, `price`, `quantity`)
VALUES
(2, 1, 20.5, 2),
(2, 2, 30.0, 1),
(4, 3, 25.0, 3),
(4, 4, 35.0, 1);

-- Insert values into the `product` table
INSERT INTO `product` (`description`, `name`, `category`, `price`, `item_sold`)
VALUES
('Product 1 Description', 'Product 1', 'Category A', 20.5, 50),
('Product 2 Description', 'Product 2', 'Category B', 30.0, 30),
('Product 3 Description', 'Product 3', 'Category A', 25.0, 40),
('Product 4 Description', 'Product 4', 'Category B', 35.0, 20);

-- Insert values into the `product_image` table
INSERT INTO `product_image` (`product_id`, `url`, `title`)
VALUES
(1, 'image_url_1', 'Image 1'),
(2, 'image_url_2', 'Image 2'),
(3, 'image_url_3', 'Image 3'),
(4, 'image_url_4', 'Image 4');

-- Insert values into the `room` table
INSERT INTO `room` (`room_type`, `room_order`, `description`, `unit_price`, `available_slot_quantity`, `room_status`, `rent_price`)
VALUES
('Normal', 1, 'Phòng thường 1', 8000, 5, NULL, NULL),
('Normal', 2, 'Phòng thường 2', 8000, 5, NULL, NULL),
('Special', 1, 'Phòng đặc biệt 1', 20000, 5, NULL, NULL),
('Smoking', 1, 'Phòng hút thuốc 1', 5000, 5, NULL, NULL),
('Couple', 1, 'Phòng đôi 1', NULL, NULL, 'Available', 100000),
('Couple', 2, 'Phòng đôi 2', NULL, NULL, 'Available', 100000),
('Comp', 1, 'Phòng thi đấu 1', NULL, NULL, 'Available', 200000),
('Comp', 2, 'Phòng thi đấu 2', NULL, NULL, 'Available', 200000);

-- Insert values into the `room_invoice` table
INSERT INTO `room_invoice` (`room_type`, `room_order`, `invoice_id`, `status`, `start_time`, `end_time`)
VALUES
('Couple', 1, 5, 'Paid', '2023-02-01 10:00:00', '2023-02-01 23:00:00'),
('Couple', 2, 6, 'Paid', '2023-02-02 10:00:00', '2023-02-02 23:00:00'),
('Comp', 3, 7, 'Paid', '2023-03-01 00:00:00', '2023-03-03 00:00:00'),
('Comp', 4, 8, 'Paid', '2023-04-01 00:00:00', '2023-04-05 00:00:00');

-- Insert values into the `slot` table
INSERT INTO `slot` (`room_type`, `room_order`, `slot_order`)
VALUES
('Normal', 1, 1), ('Normal', 1, 2), ('Normal', 1, 3), ('Normal', 1, 4), ('Normal', 1, 5),
('Normal', 2, 1), ('Normal', 2, 2), ('Normal', 2, 3), ('Normal', 2, 4), ('Normal', 2, 5),
('Special', 1, 1), ('Special', 1, 2), ('Special', 1, 3), ('Special', 1, 4), ('Special', 1, 5),
('Smoking', 1, 1), ('Smoking', 1, 2), ('Smoking', 1, 3), ('Smoking', 1, 4), ('Smoking', 1, 5),
('Couple', 1, 1), ('Couple', 1, 2),
('Couple', 2, 1), ('Couple', 2, 2),
('Comp', 1, 1), ('Comp', 1, 2), ('Comp', 1, 3), ('Comp', 1, 4), ('Comp', 1, 5),
('Comp', 2, 1), ('Comp', 2, 2), ('Comp', 2, 3), ('Comp', 2, 4), ('Comp', 2, 5);

-- Insert values into the `slot_invoice` table
INSERT INTO `slot_invoice` (`room_type`, `room_order`, `slot_order`, `invoice_id`, `status`, `start_time`, `end_time`)
VALUES
('Normal', 1, 1, 1, 'Paid', '2023-02-01 07:00:00', '2023-02-01 18:00:00'),
('Normal', 1, 4, 2, 'Paid', '2023-02-01 08:00:00', '2023-02-01 18:00:00'),
('Special', 1, 3, 3, 'Paid', '2023-03-01 09:00:00', '2023-03-01 18:00:00'),
('Smoking', 1, 2, 4, 'Paid', '2023-04-01 10:00:00', '2023-04-01 18:00:00');

-- Insert values into the `device` table
INSERT INTO `device` (`room_type`, `room_order`, `slot_order`, `device_order`, `name`, `type`, `start_date`, `last_time_maintain`, `expire_time`)
VALUES
('Normal', 1, 1, 1, 'Máy tính 1 - P1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 1, 2, 'Tai nghe 1 - P1', 'headphone', '2023-01-01', '2023-01-01', '2026-01-01'),
('Normal', 1, 1, 3, 'Bàn phím 1 - P1', 'keyboard', '2023-01-01', '2023-01-01', '2026-01-01'),
('Normal', 1, 2, 1, 'Máy tính 2 - P1', 'computer', '2023-01-01', '2023-05-02', '2026-01-01'),
('Normal', 1, 3, 1, 'Máy tính 3 - P1', 'computer', '2023-01-01', '2023-05-03', '2026-01-01'),
('Normal', 1, 4, 1, 'Máy tính 4 - P1', 'computer', '2023-01-01', '2023-05-04', '2026-01-01'),
('Normal', 1, 5, 1, 'Máy tính 5 - P1', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Normal', 2, 1, 1, 'Máy tính 1 - P2', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Normal', 2, 2, 1, 'Máy tính 2 - P2', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Normal', 2, 3, 1, 'Máy tính 3 - P2', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Normal', 2, 4, 1, 'Máy tính 4 - P2', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Normal', 2, 5, 1, 'Máy tính 5 - P2', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Special', 1, 1, 1, 'Máy tính 1 - Đặc biệt 1', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Special', 1, 2, 1, 'Máy tính 2 - Đặc biệt 1', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Special', 1, 3, 1, 'Máy tính 3 - Đặc biệt 1', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Special', 1, 4, 1, 'Máy tính 4 - Đặc biệt 1', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Special', 1, 5, 1, 'Máy tính 5 - Đặc biệt 1', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Smoking', 1, 1, 1, 'Máy tính 1 - Hút Thuốc 1', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Smoking', 1, 2, 1, 'Máy tính 2 - Hút Thuốc 1', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Smoking', 1, 3, 1, 'Máy tính 3 - Hút Thuốc 1', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Smoking', 1, 4, 1, 'Máy tính 4 - Hút Thuốc 1', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Smoking', 1, 5, 1, 'Máy tính 5 - Hút Thuốc 1', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Couple', 1, 1, 1, 'Máy tính 1 - Đôi 1', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Couple', 1, 2, 1, 'Máy tính 2 - Đôi 1', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Couple', 2, 1, 1, 'Máy tính 1 - Đôi 2', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Couple', 2, 2, 1, 'Máy tính 2 - Đôi 2', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Comp', 1, 1, 1, 'Máy tính 1 - Thi đấu 1', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Comp', 1, 2, 1, 'Máy tính 2 - Thi đấu 1', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Comp', 1, 3, 1, 'Máy tính 3 - Thi đấu 1', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Comp', 1, 4, 1, 'Máy tính 4 - Thi đấu 1', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Comp', 1, 5, 1, 'Máy tính 5 - Thi đấu 1', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Comp', 2, 1, 1, 'Máy tính 1 - Thi đấu 2', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Comp', 2, 2, 1, 'Máy tính 2 - Thi đấu 2', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Comp', 2, 3, 1, 'Máy tính 3 - Thi đấu 2', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Comp', 2, 4, 1, 'Máy tính 4 - Thi đấu 2', 'computer', '2023-01-01', '2023-01-01', '2026-01-01'),
('Comp', 2, 5, 1, 'Máy tính 5 - Thi đấu 2', 'computer', '2023-01-01', '2023-01-01', '2026-01-01');

-- Insert values into the `maintain_staff_device` table
INSERT INTO `maintain_staff_device` (`staff_id`, `room_type`, `room_order`, `slot_order`, `device_order`, `time`)
VALUES
(5, 'Normal', 1, 1, 1, '2023-05-01'),
(5, 'Normal', 1, 2, 1, '2023-05-02'),
(5, 'Normal', 1, 3, 1, '2023-05-03'),
(5, 'Normal', 1, 4, 1, '2023-05-04');

-- Insert values into the `discount_event` table
INSERT INTO `discount_event` (`name`, `start_date`, `end_date`, `discount_percent`)
VALUES
('Discount Event 1', '2023-01-01', '2023-01-15', 10),
('Discount Event 2', '2023-02-01', '2023-02-28', 15),
('Discount Event 3', '2023-03-01', '2023-03-15', 20),
('Discount Event 4', '2023-04-01', '2023-04-30', 15);

-- Insert values into the `invoice_discount` table
INSERT INTO `invoice_discount` (`invoice_id`, `discount_id`)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

SET foreign_key_checks = 1;