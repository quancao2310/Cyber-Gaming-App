USE cyber_gaming;

SET
    GLOBAL log_bin_trust_function_creators = 1;

DROP FUNCTION IF EXISTS calculateInvoiceTotalMoney;
DELIMITER / /
CREATE FUNCTION calculateInvoiceTotalMoney(invoice_id INT) RETURNS DOUBLE BEGIN DECLARE total_money DOUBLE;

SELECT
    SUM(ip.quantity * p.price) INTO total_money
FROM
    invoice_product ip
        JOIN product p ON ip.product_id = p.id
WHERE
        ip.invoice_id = invoice_id;

RETURN total_money;

END
/ / DELIMITER ;