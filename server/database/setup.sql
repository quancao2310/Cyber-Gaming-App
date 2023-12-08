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
                               `status` ENUM ('Pending', 'Completed'),
                               `invoice_id` INT,
                               FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
                               FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`)
);

CREATE TABLE `invoice` (
                           `id` INT PRIMARY KEY AUTO_INCREMENT,
                           `discount_event_id` INT,
                           `payment_method` ENUM ('Credit_Card', 'Bank_Transfer', 'Cash'),
                           `staff_id` INT,
                           `customer_id` INT,
                           `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`),
                           FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
);

CREATE TABLE `cart_product` (
                                `id` INT PRIMARY KEY AUTO_INCREMENT,
                                `invoice_id` INT,
                                `product_id` INT,
                                `price` DOUBLE(10,2),
                                `quantity` INT DEFAULT 0,
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



SET foreign_key_checks = 1;
