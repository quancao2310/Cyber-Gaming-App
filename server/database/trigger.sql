USE cyber_gaming;
DELIMITER //

DROP TRIGGER IF EXISTS calculate_order_value //
CREATE TRIGGER calculate_order_value
AFTER INSERT ON invoice_product
FOR EACH ROW
BEGIN
    DECLARE total_value DOUBLE;
    DECLARE invoice_id_temp INT;
    
    SET invoice_id_temp = NEW.invoice_id;
    SET total_value = 0;
    
    SELECT SUM(price * quantity) INTO total_value
    FROM invoice_product
    WHERE invoice_id = invoice_id_temp;
    
    UPDATE invoice
    SET total_order_value = total_value
    WHERE id = invoice_id_temp;
END;
//

DELIMITER ;

USE cyber_gaming;
DELIMITER //

DROP TRIGGER IF EXISTS check_product_quantity_limit //

CREATE TRIGGER check_product_quantity_limit
BEFORE INSERT ON invoice_product
FOR EACH ROW
BEGIN
    DECLARE current_quantity INT;
    
    SET current_quantity = NEW.quantity;
    
    IF current_quantity > 100 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Exceeded maximum product quantity allowed';
    END IF;
END;
//

DELIMITER ;

USE cyber_gaming;
DELIMITER //

DROP TRIGGER IF EXISTS update_account_balance //

CREATE TRIGGER update_account_balance
AFTER INSERT ON transaction
FOR EACH ROW
BEGIN
    DECLARE total_amount INT;
    DECLARE current_balance INT;
    DECLARE invoice_total_value INT;
    DECLARE room_rent_price INT;
    
    -- Get the total value of products in the invoice
    SELECT SUM(ip.price * ip.quantity) INTO invoice_total_value
    FROM invoice_product ip
    WHERE ip.invoice_id = NEW.invoice_id;
    
    -- Get the room rent price for the invoice
    SELECT rent_price INTO room_rent_price
    FROM room_invoice ri
    JOIN room r ON ri.room_type = r.room_type AND ri.room_order = r.room_order
    WHERE ri.invoice_id = NEW.invoice_id;
    
    -- Calculate the total amount for the transaction
    SET total_amount = COALESCE(invoice_total_value, 0) + COALESCE(room_rent_price, 0);
    
    -- Get the account balance
    SELECT account_balance INTO current_balance
    FROM account
    WHERE id = NEW.account_id;
    
    -- Update the account balance
    IF current_balance - total_amount < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient funds in the account';
    ELSE
        UPDATE account
        SET account_balance = current_balance - total_amount
        WHERE id = NEW.account_id;
    END IF;
END;
//

DELIMITER ;