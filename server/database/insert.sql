USE cyber_gaming;

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
INSERT INTO `account` (`account_name`, `password`, `account_balance`, `account_status`, `customer_id`)
VALUES
('ngocrongonline', 'catdoinoisau', 177000, 'active', 1),
('giaitich2', 'vatly1', 2415000, 'active', 2),
('lanxinhgai', '05061999', 248000, 'active', 3),
('vuxuanduc', '0154258778', 303000, 'active', 4),
('haidilao', '01478963250', 0, 'active', 5),
('oneeye', 'triangle', 0, 'active', 6),
('erenyeager', 'attackontitan', 10000, 'active', 7),
('hitdat500cai', 'chay500km', 0, 'active', 8),
('quynhquanquai', '0984512475', 0, 'active', 9),
('sepoidungdideadlineemnua', 'chamkarmvsdeadline', 0, 'active', 10);

-- Insert values into the `staff` table
INSERT INTO `staff` (`firstname`, `lastname`, `CCCD`, `age`, `sex`, `type`, `bank_name`, `bank_credit_num`)
VALUES
('Cương', 'Đỗ', '064874562135', 19, 'Male', 'Accountant', 'OCB', '0452361584587456'),
('Danh', 'Mai', '062457835256', 20, 'Male', 'Maintenance', 'MB Bank', '014585552152154'),
('Long', 'Võ', '055421445554', 19, 'Male', 'Security', 'TP Bank', '52445544545454'),
('Phúc', 'Huỳnh', '024587654215', 20, 'Male', 'Cashier', 'Vietcombank', '014235687452'),
('Quân', 'Cao', '024785651258', 20, 'Male', 'Server', 'Vietinbank', '564645644646');

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
(500000, 1, 'Nạp tiềm cho tài khoản', 'Recharge', NULL),
(300000, 2, 'Nạp tiềm cho tài khoản', 'Recharge', NULL),
(400000, 3, 'Nạp tiền cho tài khoản', 'Recharge', NULL),
(600000, 4, 'Nạp tiền cho tài khoản', 'Recharge', NULL),
(10000, 1, 'Tiền thưởng giới thiệu', 'Recharge', NULL),
(10000, 4, 'Tiền thưởng giới thiệu', 'Recharge', NULL),
(10000, 3, 'Tiền thưởng giới thiệu', 'Recharge', NULL),
(10000, 7, 'Tiền thưởng giới thiệu', 'Recharge', NULL),
(333000, 1, 'Thanh toán hóa đơn', 'Payment', 1),
(58500, 2, 'Thanh toán hóa đơn', 'Payment', 2),
(162000, 3, 'Thanh toán hóa đơn', 'Payment', 3),
(297000, 4, 'Thanh toán hóa đơn', 'Payment', 4);


-- Insert values into the `invoice` table
INSERT INTO `invoice` (`payment_status`, `total_order_value`, `staff_id`, `customer_id`)
VALUES
('Paid', 333000, 4, 1),
('Paid', 58500, 4, 2),
('Paid', 162000, 4, 3),
('Paid', 297000, 4, 4);

INSERT INTO `invoice` (`payment_status`, `customer_id`)
VALUES
('Unpaid', 5),
('Paid', 5),
('Paid', 2),
('Paid', 3),
('Paid', 1),
('Paid', 6),
('Paid', 2),
('Paid', 3);

-- Insert values into the `invoice_product` table
INSERT INTO `invoice_product` (`invoice_id`, `product_id`, `price`, `quantity`)
VALUES
(1, 2, 30000, 1),
(1, 4, 30000, 2),
(1, 7, 10000, 1),
(2, 1, 15000, 1),
(2, 5, 30000, 3),
(2, 7, 20000, 2),
(3, 3, 50000, 2),
(3, 5, 10000, 1),
(3, 8, 40000, 2),
(4, 3, 50000, 2),
(4, 6, 30000, 3),
(4, 9, 50000, 1);

-- Insert values into the `product` table
INSERT INTO `product` (`description`, `name`, `category`, `price`, `item_sold`)
VALUES
('Mỳ tôm hai trứng', 'Mỳ tôm', 'Thức ăn', 15000, 1),
('Cơm tấm sườn bì chả', 'Cơm tấm', 'Thức ăn', 30000, 1),
('Mỳ xào thịt bò rau muống', 'Mỳ xào', 'Thức ăn', 25000, 4),
('Redbull ngon hết xảy', 'Redbull', 'Đồ uống', 15000, 2),
('Sting ngon hết xảy', 'Sting', 'Đồ uống', 10000, 4),
('Pepsi ngon hết xảy', 'Pepsi', 'Đồ uống', 10000, 3),
('Thẻ nạp tiền tài khoản Garena mệnh giá 10000đ', 'Thẻ Garena 10000đ', 'Thẻ nạp', 10000, 3),
('Thẻ nạp tiền tài khoản Garena mệnh giá 20000đ', 'Thẻ Garena 20000đ', 'Thẻ nạp', 20000, 2),
('Thẻ nạp tiền tài khoản Garena mệnh giá 50000đ', 'Thẻ Garena 50000đ', 'Thẻ nạp', 50000, 1);

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
(4, 'https://mycloud.com/products/douong/redbull/2.jpg', 'Redbull 2'),
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
('Smoking', 1, 'Phòng hút thuốc 1', 10000, 5, NULL, NULL),
('Couple', 1, 'Phòng đôi 1', NULL, NULL, 'Available', 100000),
('Couple', 2, 'Phòng đôi 2', NULL, NULL, 'Available', 100000),
('Comp', 1, 'Phòng thi đấu 1', NULL, NULL, 'Available', 200000),
('Comp', 2, 'Phòng thi đấu 2', NULL, NULL, 'Available', 200000);

-- Insert values into the `room_invoice` table
INSERT INTO `room_invoice` (`room_type`, `room_order`, `invoice_id`, `start_time`, `end_time`)
VALUES
('Couple', 1, 1, '2023-12-14 20:00:00', '2023-12-14 23:00:00');

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
('Normal', 1, 1, 3, '2023-12-14 07:00:00', '2023-12-14 17:00:00'),
('Special', 2, 2, 4, '2023-12-14 08:00:00', '2023-12-14 18:00:00');

-- Insert values into the `device` table
INSERT INTO `device` (`room_type`, `room_order`, `slot_order`, `device_order`, `name`, `type`, `start_date`, `last_time_maintain`, `expire_time`)
VALUES
-- Slot 1 --- Phòng 1
('Normal', 1, 1, 1, 'Máy tính 1 - P1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 1, 2, 'Màn hình 1 - P1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 1, 3, 'Bàn phím 1 - P1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 1, 4, 'Chuột 1 - P1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 1, 5, 'Tai nghe 1 - P1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 2 --- Phòng 1
('Normal', 1, 2, 1, 'Máy tính 2 - P1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 2, 2, 'Màn hình 2 - P1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 2, 3, 'Bàn phím 2 - P1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 2, 4, 'Chuột 2 - P1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 2, 5, 'Tai nghe 2 - P1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 3 --- Phòng 1
('Normal', 1, 3, 1, 'Máy tính 3 - P1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 3, 2, 'Màn hình 3 - P1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 3, 3, 'Bàn phím 3 - P1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 3, 4, 'Chuột 3 - P1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 3, 5, 'Tai nghe 3 - P1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 4 --- Phòng 1
('Normal', 1, 4, 1, 'Máy tính 4 - P1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 4, 2, 'Màn hình 4 - P1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 4, 3, 'Bàn phím 4 - P1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 4, 4, 'Chuột 4 - P1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 4, 5, 'Tai nghe 4 - P1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 5 --- Phòng 1
('Normal', 1, 5, 1, 'Máy tính 5 - P1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 5, 2, 'Màn hình 5 - P1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 5, 3, 'Bàn phím 5 - P1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 5, 4, 'Chuột 5 - P1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 1, 5, 5, 'Tai nghe 5 - P1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 1 --- Phòng 2
('Normal', 2, 1, 1, 'Máy tính 1 - P2', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 2, 1, 2, 'Màn hình 1 - P2', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 2, 1, 3, 'Bàn phím 1 - P2', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 2, 1, 4, 'Chuột 1 - P2', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 2, 1, 5, 'Tai nghe 1 - P2', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 2 --- Phòng 2
('Normal', 2, 2, 1, 'Máy tính 2 - P2', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 2, 2, 2, 'Màn hình 2 - P2', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 2, 2, 3, 'Bàn phím 2 - P2', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 2, 2, 4, 'Chuột 2 - P2', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 2, 2, 5, 'Tai nghe 2 - P2', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 3 --- Phòng 2
('Normal', 2, 3, 1, 'Máy tính 3 - P2', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 2, 3, 2, 'Màn hình 3 - P2', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 2, 3, 3, 'Bàn phím 3 - P2', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 2, 3, 4, 'Chuột 3 - P2', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 2, 3, 5, 'Tai nghe 3 - P2', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 4 --- Phòng 2
('Normal', 2, 4, 1, 'Máy tính 4 - P2', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 2, 4, 2, 'Màn hình 4 - P2', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 2, 4, 3, 'Bàn phím 4 - P2', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 2, 4, 4, 'Chuột 4 - P2', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 2, 4, 5, 'Tai nghe 4 - P2', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 5 --- Phòng 2
('Normal', 2, 5, 1, 'Máy tính 5 - P2', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 2, 5, 2, 'Màn hình 5 - P2', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 2, 5, 3, 'Bàn phím 5 - P2', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 2, 5, 4, 'Chuột 5 - P2', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Normal', 2, 5, 5, 'Tai nghe 5 - P2', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 1 --- Phòng Đặc biệt 1
('Special', 1, 1, 1, 'Máy tính 1 - Đặc biệt 1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Special', 1, 1, 2, 'Màn hình 1 - Đặc biệt 1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Special', 1, 1, 3, 'Bàn phím 1 - Đặc biệt 1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Special', 1, 1, 4, 'Chuột 1 - Đặc biệt 1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Special', 1, 1, 5, 'Tai nghe 1 - Đặc biệt 1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 2 --- Phòng Đặc biệt 1
('Special', 1, 2, 1, 'Máy tính 2 - Đặc biệt 1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Special', 1, 2, 2, 'Màn hình 2 - Đặc biệt 1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Special', 1, 2, 3, 'Bàn phím 2 - Đặc biệt 1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Special', 1, 2, 4, 'Chuột 2 - Đặc biệt 1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Special', 1, 2, 5, 'Tai nghe 2 - Đặc biệt 1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 3 --- Phòng Đặc biệt 1
('Special', 1, 3, 1, 'Máy tính 3 - Đặc biệt 1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Special', 1, 3, 2, 'Màn hình 3 - Đặc biệt 1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Special', 1, 3, 3, 'Bàn phím 3 - Đặc biệt 1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Special', 1, 3, 4, 'Chuột 3 - Đặc biệt 1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Special', 1, 3, 5, 'Tai nghe 3 - Đặc biệt 1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 4 --- Phòng Đặc biệt 1
('Special', 1, 4, 1, 'Máy tính 4 - Đặc biệt 1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Special', 1, 4, 2, 'Màn hình 4 - Đặc biệt 1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Special', 1, 4, 3, 'Bàn phím 4 - Đặc biệt 1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Special', 1, 4, 4, 'Chuột 4 - Đặc biệt 1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Special', 1, 4, 5, 'Tai nghe 4 - Đặc biệt 1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 5 --- Phòng Đặc biệt 1
('Special', 1, 5, 1, 'Máy tính 5 - Đặc biệt 1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Special', 1, 5, 2, 'Màn hình 5 - Đặc biệt 1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Special', 1, 5, 3, 'Bàn phím 5 - Đặc biệt 1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Special', 1, 5, 4, 'Chuột 5 - Đặc biệt 1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Special', 1, 5, 5, 'Tai nghe 5 - Đặc biệt 1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 1 --- Phòng Hút thuốc 1
('Smoking', 1, 1, 1, 'Máy tính 1 - Hút thuốc 1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Smoking', 1, 1, 2, 'Màn hình 1 - Hút thuốc 1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Smoking', 1, 1, 3, 'Bàn phím 1 - Hút thuốc 1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Smoking', 1, 1, 4, 'Chuột 1 - Hút thuốc 1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Smoking', 1, 1, 5, 'Tai nghe 1 - Hút thuốc 1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 2 --- Phòng Hút thuốc 1
('Smoking', 1, 2, 1, 'Máy tính 2 - Hút thuốc 1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Smoking', 1, 2, 2, 'Màn hình 2 - Hút thuốc 1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Smoking', 1, 2, 3, 'Bàn phím 2 - Hút thuốc 1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Smoking', 1, 2, 4, 'Chuột 2 - Hút thuốc 1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Smoking', 1, 2, 5, 'Tai nghe 2 - Hút thuốc 1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 3 --- Phòng Hút thuốc 1
('Smoking', 1, 3, 1, 'Máy tính 3 - Hút thuốc 1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Smoking', 1, 3, 2, 'Màn hình 3 - Hút thuốc 1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Smoking', 1, 3, 3, 'Bàn phím 3 - Hút thuốc 1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Smoking', 1, 3, 4, 'Chuột 3 - Hút thuốc 1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Smoking', 1, 3, 5, 'Tai nghe 3 - Hút thuốc 1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 4 --- Phòng Hút thuốc 1
('Smoking', 1, 4, 1, 'Máy tính 4 - Hút thuốc 1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Smoking', 1, 4, 2, 'Màn hình 4 - Hút thuốc 1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Smoking', 1, 4, 3, 'Bàn phím 4 - Hút thuốc 1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Smoking', 1, 4, 4, 'Chuột 4 - Hút thuốc 1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Smoking', 1, 4, 5, 'Tai nghe 4 - Hút thuốc 1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 5 --- Phòng Hút thuốc 1
('Smoking', 1, 5, 1, 'Máy tính 5 - Hút thuốc 1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Smoking', 1, 5, 2, 'Màn hình 5 - Hút thuốc 1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Smoking', 1, 5, 3, 'Bàn phím 5 - Hút thuốc 1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Smoking', 1, 5, 4, 'Chuột 5 - Hút thuốc 1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Smoking', 1, 5, 5, 'Tai nghe 5 - Hút thuốc 1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 1 --- Phòng đôi 1
('Couple', 1, 1, 1, 'Máy tính 1 - Phòng đôi 1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Couple', 1, 1, 2, 'Màn hình 1 - Phòng đôi 1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Couple', 1, 1, 3, 'Bàn phím 1 - Phòng đôi 1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Couple', 1, 1, 4, 'Chuột 1 - Phòng đôi 1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Couple', 1, 1, 5, 'Tai nghe 1 - Phòng đôi 1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 2 --- Phòng đôi 1
('Couple', 1, 2, 1, 'Máy tính 2 - Phòng đôi 1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Couple', 1, 2, 2, 'Màn hình 2 - Phòng đôi 1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Couple', 1, 2, 3, 'Bàn phím 2 - Phòng đôi 1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Couple', 1, 2, 4, 'Chuột 2 - Phòng đôi 1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Couple', 1, 2, 5, 'Tai nghe 2 - Phòng đôi 1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 1 --- Phòng đôi 2
('Couple', 2, 1, 1, 'Máy tính 1 - Phòng đôi 2', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Couple', 2, 1, 2, 'Màn hình 1 - Phòng đôi 2', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Couple', 2, 1, 3, 'Bàn phím 1 - Phòng đôi 2', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Couple', 2, 1, 4, 'Chuột 1 - Phòng đôi 2', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Couple', 2, 1, 5, 'Tai nghe 1 - Phòng đôi 2', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 2 --- Phòng đôi 2
('Couple', 2, 2, 1, 'Máy tính 2 - Phòng đôi 2', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Couple', 2, 2, 2, 'Màn hình 2 - Phòng đôi 2', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Couple', 2, 2, 3, 'Bàn phím 2 - Phòng đôi 2', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Couple', 2, 2, 4, 'Chuột 2 - Phòng đôi 2', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Couple', 2, 2, 5, 'Tai nghe 2 - Phòng đôi 2', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 1 --- Phòng Thi đấu 1
('Comp', 1, 1, 1, 'Máy tính 1 - Thi đấu 1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 1, 1, 2, 'Màn hình 1 - Thi đấu 1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 1, 1, 3, 'Bàn phím 1 - Thi đấu 1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 1, 1, 4, 'Chuột 1 - Thi đấu 1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 1, 1, 5, 'Tai nghe 1 - Thi đấu 1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 2 --- Phòng Thi đấu 1
('Comp', 1, 2, 1, 'Máy tính 2 - Thi đấu 1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 1, 2, 2, 'Màn hình 2 - Thi đấu 1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 1, 2, 3, 'Bàn phím 2 - Thi đấu 1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 1, 2, 4, 'Chuột 2 - Thi đấu 1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 1, 2, 5, 'Tai nghe 2 - Thi đấu 1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 3 --- Phòng Thi đấu 1
('Comp', 1, 3, 1, 'Máy tính 3 - Thi đấu 1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 1, 3, 2, 'Màn hình 3 - Thi đấu 1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 1, 3, 3, 'Bàn phím 3 - Thi đấu 1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 1, 3, 4, 'Chuột 3 - Thi đấu 1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 1, 3, 5, 'Tai nghe 3 - Thi đấu 1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 4 --- Phòng Thi đấu 1
('Comp', 1, 4, 1, 'Máy tính 4 - Thi đấu 1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 1, 4, 2, 'Màn hình 4 - Thi đấu 1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 1, 4, 3, 'Bàn phím 4 - Thi đấu 1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 1, 4, 4, 'Chuột 4 - Thi đấu 1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 1, 4, 5, 'Tai nghe 4 - Thi đấu 1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 5 --- Phòng Thi đấu 1
('Comp', 1, 5, 1, 'Máy tính 5 - Thi đấu 1', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 1, 5, 2, 'Màn hình 5 - Thi đấu 1', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 1, 5, 3, 'Bàn phím 5 - Thi đấu 1', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 1, 5, 4, 'Chuột 5 - Thi đấu 1', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 1, 5, 5, 'Tai nghe 5 - Thi đấu 1', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 1 --- Phòng Thi đấu 2
('Comp', 2, 1, 1, 'Máy tính 1 - Thi đấu 2', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 2, 1, 2, 'Màn hình 1 - Thi đấu 2', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 2, 1, 3, 'Bàn phím 1 - Thi đấu 2', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 2, 1, 4, 'Chuột 1 - Thi đấu 2', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 2, 1, 5, 'Tai nghe 1 - Thi đấu 2', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 2 --- Phòng Thi đấu 2
('Comp', 2, 2, 1, 'Máy tính 2 - Thi đấu 2', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 2, 2, 2, 'Màn hình 2 - Thi đấu 2', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 2, 2, 3, 'Bàn phím 2 - Thi đấu 2', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 2, 2, 4, 'Chuột 2 - Thi đấu 2', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 2, 2, 5, 'Tai nghe 2 - Thi đấu 2', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 3 --- Phòng Thi đấu 2
('Comp', 2, 3, 1, 'Máy tính 3 - Thi đấu 2', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 2, 3, 2, 'Màn hình 3 - Thi đấu 2', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 2, 3, 3, 'Bàn phím 3 - Thi đấu 2', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 2, 3, 4, 'Chuột 3 - Thi đấu 2', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 2, 3, 5, 'Tai nghe 3 - Thi đấu 2', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 4 --- Phòng Thi đấu 2
('Comp', 2, 4, 1, 'Máy tính 4 - Thi đấu 2', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 2, 4, 2, 'Màn hình 4 - Thi đấu 2', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 2, 4, 3, 'Bàn phím 4 - Thi đấu 2', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 2, 4, 4, 'Chuột 4 - Thi đấu 2', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 2, 4, 5, 'Tai nghe 4 - Thi đấu 2', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01'),
-- Slot 5 --- Phòng Thi đấu 2
('Comp', 2, 5, 1, 'Máy tính 5 - Thi đấu 2', 'computer', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 2, 5, 2, 'Màn hình 5 - Thi đấu 2', 'monitor', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 2, 5, 3, 'Bàn phím 5 - Thi đấu 2', 'keyboard', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 2, 5, 4, 'Chuột 5 - Thi đấu 2', 'mouse', '2023-01-01', '2023-05-01', '2026-01-01'),
('Comp', 2, 5, 5, 'Tai nghe 5 - Thi đấu 2', 'headphone', '2023-01-01', '2023-05-01', '2026-01-01');

-- Insert values into the `maintain_staff_device` table
INSERT INTO `maintain_staff_device` (`staff_id`, `room_type`, `room_order`, `slot_order`, `device_order`, `time`)
VALUES
(5, 'Normal', 1, 1, 1, '2023-05-01'),
(5, 'Normal', 1, 1, 2, '2023-05-01'),
(5, 'Normal', 1, 1, 3, '2023-05-01'),
(5, 'Normal', 1, 1, 4, '2023-05-01'),
(5, 'Normal', 1, 1, 5, '2023-05-01'),
(5, 'Normal', 1, 2, 1, '2023-05-01'),
(5, 'Normal', 1, 2, 2, '2023-05-01'),
(5, 'Normal', 1, 2, 3, '2023-05-01'),
(5, 'Normal', 1, 2, 4, '2023-05-01'),
(5, 'Normal', 1, 2, 5, '2023-05-01'),
(5, 'Normal', 1, 3, 1, '2023-05-01'),
(5, 'Normal', 1, 3, 2, '2023-05-01'),
(5, 'Normal', 1, 3, 3, '2023-05-01'),
(5, 'Normal', 1, 3, 4, '2023-05-01'),
(5, 'Normal', 1, 3, 5, '2023-05-01'),
(5, 'Normal', 1, 4, 1, '2023-05-01'),
(5, 'Normal', 1, 4, 2, '2023-05-01'),
(5, 'Normal', 1, 4, 3, '2023-05-01'),
(5, 'Normal', 1, 4, 4, '2023-05-01'),
(5, 'Normal', 1, 4, 5, '2023-05-01'),
(5, 'Normal', 1, 5, 1, '2023-05-01'),
(5, 'Normal', 1, 5, 2, '2023-05-01'),
(5, 'Normal', 1, 5, 3, '2023-05-01'),
(5, 'Normal', 1, 5, 4, '2023-05-01'),
(5, 'Normal', 1, 5, 5, '2023-05-01'),
(5, 'Normal', 2, 1, 1, '2023-05-01'),
(5, 'Normal', 2, 1, 2, '2023-05-01'),
(5, 'Normal', 2, 1, 3, '2023-05-01'),
(5, 'Normal', 2, 1, 4, '2023-05-01'),
(5, 'Normal', 2, 1, 5, '2023-05-01'),
(5, 'Normal', 2, 2, 1, '2023-05-01'),
(5, 'Normal', 2, 2, 2, '2023-05-01'),
(5, 'Normal', 2, 2, 3, '2023-05-01'),
(5, 'Normal', 2, 2, 4, '2023-05-01'),
(5, 'Normal', 2, 2, 5, '2023-05-01'),
(5, 'Normal', 2, 3, 1, '2023-05-01'),
(5, 'Normal', 2, 3, 2, '2023-05-01'),
(5, 'Normal', 2, 3, 3, '2023-05-01'),
(5, 'Normal', 2, 3, 4, '2023-05-01'),
(5, 'Normal', 2, 3, 5, '2023-05-01'),
(5, 'Normal', 2, 4, 1, '2023-05-01'),
(5, 'Normal', 2, 4, 2, '2023-05-01'),
(5, 'Normal', 2, 4, 3, '2023-05-01'),
(5, 'Normal', 2, 4, 4, '2023-05-01'),
(5, 'Normal', 2, 4, 5, '2023-05-01'),
(5, 'Normal', 2, 5, 1, '2023-05-01'),
(5, 'Normal', 2, 5, 2, '2023-05-01'),
(5, 'Normal', 2, 5, 3, '2023-05-01'),
(5, 'Normal', 2, 5, 4, '2023-05-01'),
(5, 'Normal', 2, 5, 5, '2023-05-01'),
(5, 'Comp', 1, 1, 1, '2023-05-01'),
(5, 'Comp', 1, 1, 2, '2023-05-01'),
(5, 'Comp', 1, 1, 3, '2023-05-01'),
(5, 'Comp', 1, 1, 4, '2023-05-01'),
(5, 'Comp', 1, 1, 5, '2023-05-01'),
(5, 'Comp', 1, 2, 1, '2023-05-01'),
(5, 'Comp', 1, 2, 2, '2023-05-01'),
(5, 'Comp', 1, 2, 3, '2023-05-01'),
(5, 'Comp', 1, 2, 4, '2023-05-01'),
(5, 'Comp', 1, 2, 5, '2023-05-01'),
(5, 'Comp', 1, 3, 1, '2023-05-01'),
(5, 'Comp', 1, 3, 2, '2023-05-01'),
(5, 'Comp', 1, 3, 3, '2023-05-01'),
(5, 'Comp', 1, 3, 4, '2023-05-01'),
(5, 'Comp', 1, 3, 5, '2023-05-01'),
(5, 'Comp', 1, 4, 1, '2023-05-01'),
(5, 'Comp', 1, 4, 2, '2023-05-01'),
(5, 'Comp', 1, 4, 3, '2023-05-01'),
(5, 'Comp', 1, 4, 4, '2023-05-01'),
(5, 'Comp', 1, 4, 5, '2023-05-01'),
(5, 'Comp', 1, 5, 1, '2023-05-01'),
(5, 'Comp', 1, 5, 2, '2023-05-01'),
(5, 'Comp', 1, 5, 3, '2023-05-01'),
(5, 'Comp', 1, 5, 4, '2023-05-01'),
(5, 'Comp', 1, 5, 5, '2023-05-01'),
(5, 'Comp', 2, 1, 1, '2023-05-01'),
(5, 'Comp', 2, 1, 2, '2023-05-01'),
(5, 'Comp', 2, 1, 3, '2023-05-01'),
(5, 'Comp', 2, 1, 4, '2023-05-01'),
(5, 'Comp', 2, 1, 5, '2023-05-01'),
(5, 'Comp', 2, 2, 1, '2023-05-01'),
(5, 'Comp', 2, 2, 2, '2023-05-01'),
(5, 'Comp', 2, 2, 3, '2023-05-01'),
(5, 'Comp', 2, 2, 4, '2023-05-01'),
(5, 'Comp', 2, 2, 5, '2023-05-01'),
(5, 'Comp', 2, 3, 1, '2023-05-01'),
(5, 'Comp', 2, 3, 2, '2023-05-01'),
(5, 'Comp', 2, 3, 3, '2023-05-01'),
(5, 'Comp', 2, 3, 4, '2023-05-01'),
(5, 'Comp', 2, 3, 5, '2023-05-01'),
(5, 'Comp', 2, 4, 1, '2023-05-01'),
(5, 'Comp', 2, 4, 2, '2023-05-01'),
(5, 'Comp', 2, 4, 3, '2023-05-01'),
(5, 'Comp', 2, 4, 4, '2023-05-01'),
(5, 'Comp', 2, 4, 5, '2023-05-01'),
(5, 'Comp', 2, 5, 1, '2023-05-01'),
(5, 'Comp', 2, 5, 2, '2023-05-01'),
(5, 'Comp', 2, 5, 3, '2023-05-01'),
(5, 'Comp', 2, 5, 4, '2023-05-01'),
(5, 'Comp', 2, 5, 5, '2023-05-01'),
(5, 'Special', 1, 1, 1, '2023-05-01'),
(5, 'Special', 1, 1, 2, '2023-05-01'),
(5, 'Special', 1, 1, 3, '2023-05-01'),
(5, 'Special', 1, 1, 4, '2023-05-01'),
(5, 'Special', 1, 1, 5, '2023-05-01'),
(5, 'Special', 1, 2, 1, '2023-05-01'),
(5, 'Special', 1, 2, 2, '2023-05-01'),
(5, 'Special', 1, 2, 3, '2023-05-01'),
(5, 'Special', 1, 2, 4, '2023-05-01'),
(5, 'Special', 1, 2, 5, '2023-05-01'),
(5, 'Special', 1, 3, 1, '2023-05-01'),
(5, 'Special', 1, 3, 2, '2023-05-01'),
(5, 'Special', 1, 3, 3, '2023-05-01'),
(5, 'Special', 1, 3, 4, '2023-05-01'),
(5, 'Special', 1, 3, 5, '2023-05-01'),
(5, 'Special', 1, 4, 1, '2023-05-01'),
(5, 'Special', 1, 4, 2, '2023-05-01'),
(5, 'Special', 1, 4, 3, '2023-05-01'),
(5, 'Special', 1, 4, 4, '2023-05-01'),
(5, 'Special', 1, 4, 5, '2023-05-01'),
(5, 'Special', 1, 5, 1, '2023-05-01'),
(5, 'Special', 1, 5, 2, '2023-05-01'),
(5, 'Special', 1, 5, 3, '2023-05-01'),
(5, 'Special', 1, 5, 4, '2023-05-01'),
(5, 'Special', 1, 5, 5, '2023-05-01'),
(5, 'Smoking', 1, 1, 1, '2023-05-01'),
(5, 'Smoking', 1, 1, 2, '2023-05-01'),
(5, 'Smoking', 1, 1, 3, '2023-05-01'),
(5, 'Smoking', 1, 1, 4, '2023-05-01'),
(5, 'Smoking', 1, 1, 5, '2023-05-01'),
(5, 'Smoking', 1, 2, 1, '2023-05-01'),
(5, 'Smoking', 1, 2, 2, '2023-05-01'),
(5, 'Smoking', 1, 2, 3, '2023-05-01'),
(5, 'Smoking', 1, 2, 4, '2023-05-01'),
(5, 'Smoking', 1, 2, 5, '2023-05-01'),
(5, 'Smoking', 1, 3, 1, '2023-05-01'),
(5, 'Smoking', 1, 3, 2, '2023-05-01'),
(5, 'Smoking', 1, 3, 3, '2023-05-01'),
(5, 'Smoking', 1, 3, 4, '2023-05-01'),
(5, 'Smoking', 1, 3, 5, '2023-05-01'),
(5, 'Smoking', 1, 4, 1, '2023-05-01'),
(5, 'Smoking', 1, 4, 2, '2023-05-01'),
(5, 'Smoking', 1, 4, 3, '2023-05-01'),
(5, 'Smoking', 1, 4, 4, '2023-05-01'),
(5, 'Smoking', 1, 4, 5, '2023-05-01'),
(5, 'Smoking', 1, 5, 1, '2023-05-01'),
(5, 'Smoking', 1, 5, 2, '2023-05-01'),
(5, 'Smoking', 1, 5, 3, '2023-05-01'),
(5, 'Smoking', 1, 5, 4, '2023-05-01'),
(5, 'Smoking', 1, 5, 5, '2023-05-01'),
(5, 'Couple', 1, 1, 1, '2023-05-01'),
(5, 'Couple', 1, 1, 2, '2023-05-01'),
(5, 'Couple', 1, 1, 3, '2023-05-01'),
(5, 'Couple', 1, 1, 4, '2023-05-01'),
(5, 'Couple', 1, 1, 5, '2023-05-01'),
(5, 'Couple', 1, 2, 1, '2023-05-01'),
(5, 'Couple', 1, 2, 2, '2023-05-01'),
(5, 'Couple', 1, 2, 3, '2023-05-01'),
(5, 'Couple', 1, 2, 4, '2023-05-01'),
(5, 'Couple', 1, 2, 5, '2023-05-01'),
(5, 'Couple', 2, 1, 1, '2023-05-01'),
(5, 'Couple', 2, 1, 2, '2023-05-01'),
(5, 'Couple', 2, 1, 3, '2023-05-01'),
(5, 'Couple', 2, 1, 4, '2023-05-01'),
(5, 'Couple', 2, 1, 5, '2023-05-01'),
(5, 'Couple', 2, 2, 1, '2023-05-01'),
(5, 'Couple', 2, 2, 2, '2023-05-01'),
(5, 'Couple', 2, 2, 3, '2023-05-01'),
(5, 'Couple', 2, 2, 4, '2023-05-01'),
(5, 'Couple', 2, 2, 5, '2023-05-01');


-- Insert values into the `discount_event` table
INSERT INTO `discount_event` (`name`, `start_date`, `end_date`, `discount_percent`)
VALUES
('Giảm giá mừng khai trương', '2023-01-01 00:00:00', '2023-01-10 00:00:00', 10),
('Giảm giá cuối năm', '2023-12-01 00:00:00', '2023-12-16 00:00:00', 10);

-- Insert values into the `invoice_discount` table
INSERT INTO `invoice_discount` (`invoice_id`, `discount_id`)
VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1);

SET foreign_key_checks = 1;