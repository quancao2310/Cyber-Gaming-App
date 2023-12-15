USE cyber_gaming;

/*Please use root account*/
SET GLOBAL log_bin_trust_function_creators = 1;

DROP FUNCTION IF EXISTS calculateTotalIncome;
DROP FUNCTION IF EXISTS calculateInvoiceTotalMoney;

DELIMITER //

CREATE FUNCTION calculateInvoiceTotalMoney(invoice_id INT) RETURNS DOUBLE 
BEGIN 
    DECLARE total_money DOUBLE;

    SELECT
        SUM(ip.quantity * p.price) INTO total_money
    FROM
        invoice_product ip
        JOIN product p ON ip.product_id = p.id
    WHERE
        ip.invoice_id = invoice_id;

    RETURN total_money;
END //

DELIMITER ;

DELIMITER //

CREATE FUNCTION calculateTotalIncome(start_date DATE, end_date DATE) RETURNS DOUBLE 
BEGIN 
    DECLARE total_income DOUBLE;

    SELECT COALESCE(SUM(ip.quantity * p.price), 0) INTO total_income
    FROM invoice_product ip
    JOIN product p ON ip.product_id = p.id
    JOIN invoice i ON ip.invoice_id = i.id
    WHERE
        IFNULL(i.created_at >= start_date, TRUE) AND
        IFNULL(i.created_at <= end_date, TRUE);

    -- Check if total_income is NULL and set it to 0
    IF total_income IS NULL THEN
        SET total_income = 0;
    END IF;

    RETURN total_income;
END //

DELIMITER ;