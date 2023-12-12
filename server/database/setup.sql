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
                               FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`)
);

CREATE TABLE `invoice` (
                           `id` INT PRIMARY KEY AUTO_INCREMENT,
                           `discount_event_id` INT,
                           `payment_method` ENUM ('Account_Wallet', 'Credit_Card', 'Bank_Transfer', 'Cash'),
                           `staff_id` INT,
                           `customer_id` INT,
                           `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`),
                           FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
);

CREATE TABLE `invoice_product` (
                                `invoice_id` INT,
                                `product_id` INT,
                                `price` DOUBLE(10,2),
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
                           `price` DOUBLE(10, 2),
                           `item_sold` INT DEFAULT 0
);

CREATE TABLE `product_image` (
                                 `product_id` INT,
                                 `url` VARCHAR(255),
                                 `title` VARCHAR(60),
                                 FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
);

CREATE TABLE `room` (
                        `room_order` INT,
                        `room_type` VARCHAR(20),
                        `description` VARCHAR(255),
                        `unit_price` DOUBLE(10,2),
                        `available_slot_quantity` INT,
                        `room_status` VARCHAR(20),
                        `rent_price` DOUBLE(10,2),
                        PRIMARY KEY (`room_order`, `room_type`)
);

CREATE TABLE `room_invoice` (
                                `room_order` INT,
                                `room_type` VARCHAR(20),
                                `invoice_id` INT,
                                `status` VARCHAR(20),
                                `start_time` DATE,
                                `end_time` DATE,
                                PRIMARY KEY (`room_order`, `room_type`, `invoice_id`),
                                FOREIGN KEY (`room_order`, `room_type`) REFERENCES `room` (`room_order`, `room_type`),
                                FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`)
);

CREATE TABLE `slot` (
                        `room_order` INT,
                        `room_type` VARCHAR(20),
                        `slot_order` INT,
                        PRIMARY KEY (`room_order`, `room_type`, `slot_order`),
                        FOREIGN KEY (`room_order`, `room_type`) REFERENCES `room` (`room_order`, `room_type`)
);

CREATE TABLE `slot_invoice` (
                                `room_order` INT,
                                `room_type` VARCHAR(20),
                                `slot_order` INT,
                                `invoice_id` INT,
                                `status` VARCHAR(20),
                                `start_time` DATE,
                                `end_time` DATE,
                                PRIMARY KEY (`room_order`, `room_type`, `slot_order`, `invoice_id`),
                                FOREIGN KEY (`room_order`, `room_type`, `slot_order`) REFERENCES `slot` (`room_order`, `room_type`, `slot_order`),
                                FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`)
);

CREATE TABLE `device` (
                          `room_order` INT,
                          `room_type` VARCHAR(20),
                          `slot_order` INT,
                          `device_order` INT,
                          `name` VARCHAR(20),
                          `type` VARCHAR(20),
                          `start_date` DATE,
                          `last_time_maintain` DATE,
                          `expire_time` DATE,
                          PRIMARY KEY (`room_order`, `room_type`, `slot_order`, `device_order`),
                          FOREIGN KEY (`room_order`, `room_type`, `slot_order`) REFERENCES `slot` (`room_order`, `room_type`, `slot_order`)
);

CREATE TABLE `maintain_staff_device` (
                                         `staff_id` INT,
                                         `room_order` INT,
                                         `room_type` VARCHAR(20),
                                         `slot_order` INT,
                                         `device_order` INT,
                                         `time` DATE,
                                         PRIMARY KEY (`staff_id`, `room_order`, `room_type`, `slot_order`, `device_order`),
                                         FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`),
                                         FOREIGN KEY (`room_order`, `room_type`, `slot_order`, `device_order`) REFERENCES `device` (`room_order`, `room_type`, `slot_order`, `device_order`)
);

CREATE TABLE `discount_event` (
                                  `id` INT PRIMARY KEY,
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

-- Disable foreign key checks for the insert operation
SET foreign_key_checks = 0;

-- Insert values into the `customer` table
INSERT INTO `customer` (`firstname`, `lastname`, `email`, `phone_number`, `year_of_birth`, `sex`, `customer_id_introduce`)
VALUES
('John', 'Doe', 'john.doe@example.com', '1234567890', 1990, 'Male', NULL),
('Jane', 'Doe', 'jane.doe@example.com', '9876543210', 1995, 'Female', 1),
('Alice', 'Johnson', 'alice.johnson@example.com', '555-1234', 1992, 'Female', 1),
('Bob', 'Smith', 'bob.smith@example.com', '555-5678', 1985, 'Male', 2),
('Charlie', 'Williams', 'charlie.williams@example.com', '555-9876', 1998, 'Male', 3);

-- Insert values into the `account` table
INSERT INTO `account` (`account_name`, `password`, `account_balance`, `customer_id`)
VALUES
('john_account', 'password123', 1000, 1),
('jane_account', 'securepass', 1500, 2),
('alice_account', 'alicepass', 800, 3),
('bob_account', 'bobpass', 1200, 4),
('charlie_account', 'charliepass', 500, 5);

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
(5, 'quan.cao@example.com');

-- Insert values into the `staff_phone_number` table
INSERT INTO `staff_phone_number` (`staff_id`, `phone_number`)
VALUES
(1, '0912345678'),
(2, '0987654321'),
(3, '0911223344'),
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
(40, 2, 'Transaction 3 Content', 'Recharge', 3),
(25, 2, 'Transaction 4 Content', 'Payment', NULL);

-- Insert values into the `invoice` table
INSERT INTO `invoice` (`discount_event_id`, `payment_method`, `staff_id`, `customer_id`)
VALUES
(1, 'Credit_Card', 1, 1),
(2, 'Account_Wallet', 2, 2),
(3, 'Cash', 3, 3),
(4, 'Account_Wallet', 4, 4);

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
INSERT INTO `room` (`room_order`, `room_type`, `description`, `unit_price`, `available_slot_quantity`, `room_status`, `rent_price`)
VALUES
(1, 'Single', 'Single Room Description', 50.0, 5, 'Available', 100.0),
(2, 'Double', 'Double Room Description', 80.0, 3, 'Booked', 150.0),
(3, 'Suite', 'Suite Room Description', 100.0, 2, 'Available', 200.0),
(4, 'Deluxe', 'Deluxe Room Description', 120.0, 3, 'Available', 250.0);

-- Insert values into the `room_invoice` table
INSERT INTO `room_invoice` (`room_order`, `room_type`, `invoice_id`, `status`, `start_time`, `end_time`)
VALUES
(1, 'Single', 1, 'Booked', '2023-01-01', '2023-01-03'),
(2, 'Double', 2, 'Check-in', '2023-02-01', '2023-02-05'),
(3, 'Suite', 3, 'Available', '2023-03-01', '2023-03-03'),
(4, 'Deluxe', 4, 'Available', '2023-04-01', '2023-04-05');

-- Insert values into the `slot` table
INSERT INTO `slot` (`room_order`, `room_type`, `slot_order`)
VALUES
(1, 'Single', 1),
(2, 'Double', 1),
(3, 'Suite', 1),
(4, 'Deluxe', 1);

-- Insert values into the `slot_invoice` table
INSERT INTO `slot_invoice` (`room_order`, `room_type`, `slot_order`, `invoice_id`, `status`, `start_time`, `end_time`)
VALUES
(1, 'Single', 1, 1, 'Reserved', '2023-01-01', '2023-01-03'),
(2, 'Double', 1, 2, 'Occupied', '2023-02-01', '2023-02-05'),
(3, 'Suite', 1, 3, 'Booked', '2023-03-01', '2023-03-03'),
(4, 'Deluxe', 1, 4, 'Booked', '2023-04-01', '2023-04-05');

-- Insert values into the `device` table
INSERT INTO `device` (`room_order`, `room_type`, `slot_order`, `device_order`, `name`, `type`, `start_date`, `last_time_maintain`, `expire_time`)
VALUES
(1, 'Single', 1, 1, 'Device 1', 'Type A', '2023-01-01', '2023-01-02', '2023-01-10'),
(2, 'Double', 1, 1, 'Device 2', 'Type B', '2023-01-01', '2023-02-02', '2023-02-10'),
(3, 'Suite', 1, 1, 'Device 3', 'Type C', '2023-03-01', '2023-03-02', '2023-03-10'),
(4, 'Deluxe', 1, 1, 'Device 4', 'Type D', '2023-04-01', '2023-04-02', '2023-04-10');

-- Insert values into the `maintain_staff_device` table
INSERT INTO `maintain_staff_device` (`staff_id`, `room_order`, `room_type`, `slot_order`, `device_order`, `time`)
VALUES
(2, 1, 'Single', 1, 1, '2023-01-02'),
(2, 2, 'Double', 1, 1, '2023-02-02'),
(2, 3, 'Suite', 1, 1, '2023-03-02'),
(2, 4, 'Deluxe', 1, 1, '2023-04-02');

-- Insert values into the `discount_event` table
INSERT INTO `discount_event` (`id`, `name`, `start_date`, `end_date`, `discount_percent`)
VALUES
(1, 'Discount Event 1', '2023-01-01', '2023-01-15', 10),
(2, 'Discount Event 2', '2023-02-01', '2023-02-28', 15),
(3, 'Discount Event 3', '2023-03-01', '2023-03-15', 20),
(4, 'Discount Event 4', '2023-04-01', '2023-04-30', 15);

-- Insert values into the `invoice_discount` table
INSERT INTO `invoice_discount` (`invoice_id`, `discount_id`)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

SET foreign_key_checks = 1;

