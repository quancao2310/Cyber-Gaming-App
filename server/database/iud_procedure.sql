USE cyber_gaming;

DROP PROCEDURE IF EXISTS InsertIntoAccount;
DELIMITER $$
CREATE PROCEDURE InsertIntoAccount
	(IN p_account_name VARCHAR(60),
    IN p_password VARCHAR(60),
    IN p_account_status ENUM('active', 'disabled'),
    IN p_customer_id INT)
BEGIN

    DECLARE customerExists INT;
    SELECT COUNT(*) INTO customerExists FROM customer WHERE id = p_customer_id;

    IF (customerExists = 0) THEN
        SET @r = 'Không tìm thấy khách hàng tương ứng để tạo tài khoản.';
        SIGNAL SQLSTATE '45001' SET message_text = @r;
    END IF;

    INSERT INTO `account` (`account_name`, `password`, `account_status`, `customer_id`)
    VALUES (`p_account_name`, `p_password`, `p_account_status`, `p_customer_id`);
    COMMIT;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS UpdateAccount;
DELIMITER $$
CREATE PROCEDURE UpdateAccount
	(IN p_account_name VARCHAR(60),
    IN p_password VARCHAR(60),
    IN p_account_status ENUM('active', 'disabled'),
    IN p_account_balance INT)
BEGIN
    IF (p_account_name IS NULL) THEN
        SET @r = 'Vui lòng nhập tên tài khoản cần cập nhật.';
        SIGNAL SQLSTATE '45001' SET message_text = @r;
    END IF;

    IF (p_account_name NOT IN (SELECT account_name FROM account)) THEN
        SET @r = 'Không tìm thấy tên tài khoản trong hệ thống.';
        SIGNAL SQLSTATE '45001' SET message_text = @r;
    END IF;

    IF (p_password IS NULL) THEN
        SET p_password = `password`;
    END IF;

    IF (p_account_status IS NULL) THEN
        SET p_account_status = account_status;
    END IF;

    IF (p_account_balance IS NULL) THEN
        SET p_account_balance = account_balance;
    END IF;

    UPDATE account
    SET 
        password = p_password,
        account_status = p_account_status,
        account_balance = p_account_balance
    WHERE account_name = p_account_name;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS DeleteAccount;
DELIMITER $$
CREATE PROCEDURE DeleteAccount
	(IN p_account_name VARCHAR(60))
BEGIN
    IF (p_account_name IS NULL) THEN
        SET @r = 'Vui lòng nhập tên tài khoản cần xóa.';
        SIGNAL SQLSTATE '45001' SET message_text = @r;
    END IF;

    IF (p_account_name NOT IN (SELECT account_name FROM account)) THEN
        SET @r = 'Không tìm thấy tên tài khoản trong hệ thống.';
        SIGNAL SQLSTATE '45001' SET message_text = @r;
    END IF;

    IF (p_account_name IN (SELECT account_name FROM account WHERE account_status = "active")) THEN
        SET @r = 'Tài khoản này đang hoạt động. Không thể xóa.';
        SIGNAL SQLSTATE '45001' SET message_text = @r;
    END IF;

    DELETE FROM account
    WHERE account_name = p_account_name AND account_status = "disabled";
END $$
DELIMITER ;