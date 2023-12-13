USE cyber_gaming;

/*Please use root account*/
SET
    GLOBAL log_bin_trust_function_creators = 1;

DELIMITER / / CREATE PROCEDURE getProductSalesStats(
    IN start_date DATE,
    IN end_date DATE
) BEGIN
SELECT
    ip.product_id,
    p.name AS product_name,
    SUM(ip.quantity) AS quantity_sold,
    SUM(ip.quantity * p.price) AS total_money
FROM
    invoice_product ip
    JOIN product p ON ip.product_id = p.id
    JOIN invoice i ON ip.invoice_id = i.id
WHERE
    i.created_at BETWEEN start_date
    AND end_date
GROUP BY
    ip.product_id;

END / / DELIMITER;

CALL getProductSalesStats('2023-12-13', '2023-12-14');

DELIMITER / / CREATE FUNCTION calculateInvoiceTotalMoney(invoice_id INT) RETURNS DOUBLE BEGIN DECLARE total_money DOUBLE;

SELECT
    SUM(ip.quantity * p.price) INTO total_money
FROM
    invoice_product ip
    JOIN product p ON ip.product_id = p.id
WHERE
    ip.invoice_id = invoice_id;

RETURN total_money;

END / / DELIMITER;

SELECT
    calculateInvoiceTotalMoney(2) AS total_money;

DELIMITER / / CREATE FUNCTION calculateProductTotalQuantitySold(IN product_id INT) RETURNS INT BEGIN DECLARE total_quantity_sold INT;

SELECT
    SUM(ip.quantity) INTO total_quantity_sold
FROM
    invoice_product ip
WHERE
    ip.product_id = product_id;

RETURN total_quantity_sold;

END / / DELIMITER;

SELECT
    calculateProductTotalQuantitySold(YourProductID) AS total_quantity_sold;