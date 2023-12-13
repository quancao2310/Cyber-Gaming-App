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
                    `payment_status` VARCHAR(20),
                    `staff_id` INT,
                    `customer_id` INT,
                    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    `total_order_value` INT DEFAULT 0,
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
('Ngọc', 'Trần', 'ngoc.tran@gmail.com', '0978356723', 2005, 'Female', NULL),
('Minh', 'Nguyễn', 'sinhvienbachkhoa@gmail.com', '0945236728', 2004, 'Male', NULL),
('Lan', 'Lê', 'lanlexinhdep@gmail.com', '0372345632', 1999, 'Female', NULL),
('Đức', 'Vũ', 'ducvu@gmail.com', '0978765432', 1995, 'Male', 1),
('Hương', 'Phạm', 'doraemon@gmail.com', '09871245216', 2006, 'Female', NULL),
('Thành', 'Đỗ', 'thanhhotboy@gmail.com', '0909521478', 2000, 'Male', NULL),
('Mai', 'Ngô', 'gojousatoru@gmail.com', '0918765432', 2004, 'Female', 3),
('Hải', 'Lý', 'haigymmer@gmail.com', '0978546214', 2005, 'Male', NULL),
('Quỳnh', 'Bùi', 'quynhmarketing@gmail.com', '0925121245', 1995, 'Female', NULL),
('Tuấn', 'Nguyễn', 'tuanIT@gmail.com', '0937548648', 1994, 'Male', NULL);


-- Insert values into the `account` table
INSERT INTO `account` (`account_name`, `password`, `account_balance`, `customer_id`)
VALUES
('ngocrongonline', 'catdoinoisau', 3000009, 1),
('giaitich2', 'vatly1', 200, 2),
('lanxinhgai', '05061999', 70000, 3),
('vuxuanduc', '0154258778', 120000, 4),
('haidilao', '01478963250', 40000, 5),
('oneeye', 'triangle', 5000, 6),
('erenyeager', 'attackontitan', 10000, 7),
('hitdat500cai', 'chay500km', 50000, 8),
('quynhquanquai', '0984512475', 50000, 9),
('sepoidungdideadlineemnua', 'chamkarmvsdeadline', 50000, 10);

-- Insert values into the `staff` table
INSERT INTO `staff` (`firstname`, `lastname`, `CCCD`, `age`, `sex`, `bank_name`, `bank_credit_num`)
VALUES
('Cương', 'Đỗ', '064874562135', 19, 'Male', 'OCB', '0452361584587456'),
('Danh', 'Mai', '062457835256', 20, 'Male', 'MB Bank', '014585552152154'),
('Long', 'Võ', '055421445554', 19, 'Male', 'TP Bank', '52445544545454'),
('Phúc', 'Huỳnh', '024587654215', 20, 'Male', 'Vietcombank', '014235687452'),
('Quân', 'Cao', '024785651258', 20, 'Male', 'Vietinbank', '564645644646');

-- Insert values into the `staff_email` table
INSERT INTO `staff_email` (`staff_id`, `email`)
VALUES
(1, 'cuong.do@gmail.com'),
(2, 'danhmaihoang@gmail.com'),
(3, 'baolongvo@gmail.com'),
(4, 'phuchuynh@gmail.com'),
(4, 'phucchill@gmail.com'),
(5, 'quancmdhbk@gmail.com');

-- Insert values into the `staff_phone_number` table
INSERT INTO `staff_phone_number` (`staff_id`, `phone_number`)
VALUES
(1, '0945687542'),
(2, '0948562541'),
(3, '0925456784'),
(3, '0986214587'),
(4, '0925489517'),
(5, '0988742147');

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
INSERT INTO `invoice` (`payment_status`, `staff_id`, `customer_id`)
VALUES
('Paid', 1, 1),
('Unpaid', 2, 2),
('Paid', 3, 3),
('Paid', 4, 4),
('Paid', 1, 5),
('Paid', 1, 6),
('Paid', 1, 7),
('Paid', 1, 8);

INSERT INTO `invoice` (`payment_status`, `customer_id`)
VALUES
('Unpaid', 2),
('Paid', 6),
('Paid', 7),
('Paid', 1),
('Paid', 5),
('Paid', 2),
('Paid', 7),
('Paid', 1);

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
('Mỳ tôm hai trứng', 'Mỳ tôm', 'Thức ăn', 15000, 25),
('Cơm tấm sườn bì chả', 'Cơm tấm', 'Thức ăn', 30000, 10),
('Mỳ xào thịt bò rau muống', 'Mỳ xào', 'Thức ăn', 25000, 17),
('Redbull ngon hết xảy', 'Redbull', 'Đồ uống', 15000, 25),
('Sting ngon hết xảy', 'Sting', 'Đồ uống', 10000, 41),
('Pepsi ngon hết xảy', 'Pepsi', 'Đồ uống', 10000, 30),
('Thẻ nạp tiền tài khoản Garena mệnh giá 10000đ', 'Thẻ Garena 10000đ', 'Thẻ nạp', 10000, 15),
('Thẻ nạp tiền tài khoản Garena mệnh giá 20000đ', 'Thẻ Garena 20000đ', 'Thẻ nạp', 20000, 10),
('Thẻ nạp tiền tài khoản Garena mệnh giá 50000đ', 'Thẻ Garena 50000đ', 'Thẻ nạp', 50000, 7);

-- Insert values into the `product_image` table
INSERT INTO `product_image` (`product_id`, `url`, `title`)
VALUES
(1, 'https://mycloud.com/products/thucan/mytom/1.jpg', 'Mỳ tôm 1'),
(1, 'https://mycloud.com/products/thucan/mytom/2.jpg', 'Mỳ tôm 2'),
(2, 'https://mycloud.com/products/thucan/comtam/1.jpg', 'Cơm tấm 1'),
(2, 'https://mycloud.com/products/thucan/comtam/2.jpg', 'Cơm tấm 2'),
(2, 'https://mycloud.com/products/thucan/comtam/3.jpg', 'Cơm tấm 3'),
(3, 'https://mycloud.com/products/thucan/myxao/1.jpg', 'Mỳ xào 1'),
(3, 'https://mycloud.com/products/thucan/myxao/1.jpg', 'Mỳ xào 2'),
(4, 'https://mycloud.com/products/douong/redbull/1.jpg', 'Redbull 1'),
(5, 'https://mycloud.com/products/douong/sting/1.jpg', 'Sting 1'),
(6, 'https://mycloud.com/products/douong/pepsi/1.jpg', 'Pepsi 1'),
(7, 'https://mycloud.com/products/thenap/thegarena/10000/1.jpg', 'Thẻ Garena 10000 1'),
(8, 'https://mycloud.com/products/thenap/thegarena/20000/1.jpg', 'Thẻ Garena 20000 1'),
(9, 'https://mycloud.com/products/thenap/thegarena/50000/1.jpg', 'Thẻ Garena 50000 1');


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
INSERT INTO `room_invoice` (`room_type`, `room_order`, `invoice_id`, `start_time`, `end_time`)
VALUES
('Couple', 1, 5, '2023-02-01 10:00:00', '2023-02-01 23:00:00'),
('Couple', 2, 6, '2023-02-02 10:00:00', '2023-02-02 23:00:00'),
('Comp', 3, 7, '2023-03-01 00:00:00', '2023-03-03 00:00:00'),
('Comp', 4, 8, '2023-04-01 00:00:00', '2023-04-05 00:00:00');

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
INSERT INTO `slot_invoice` (`room_type`, `room_order`, `slot_order`, `invoice_id`, `start_time`, `end_time`)
VALUES
('Normal', 1, 1, 1, '2023-02-01 07:00:00', '2023-02-01 18:00:00'),
('Normal', 1, 4, 2, '2023-02-01 08:00:00', '2023-02-01 18:00:00'),
('Special', 1, 3, 3, '2023-03-01 09:00:00', '2023-03-01 18:00:00'),
('Smoking', 1, 2, 4, '2023-04-01 10:00:00', '2023-04-01 18:00:00');

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
('Giảm giá mừng khai trương', '2023-01-01', '2023-01-15', 10),
('Discount Event 2', '2023-02-01', '2023-02-09', 15),
('Discount Event 3', '2023-03-01', '2023-03-04', 20),
('Discount Event 4', '2023-04-01', '2023-04-02', 15);

-- Insert values into the `invoice_discount` table
INSERT INTO `invoice_discount` (`invoice_id`, `discount_id`)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

SET foreign_key_checks = 1;