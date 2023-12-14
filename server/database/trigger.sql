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

DELIMITER //

DROP TRIGGER IF EXISTS update_account_balance //

CREATE TRIGGER update_account_balance
AFTER INSERT ON transaction
FOR EACH ROW
BEGIN
    DECLARE total_amount INT;
    DECLARE current_balance INT;
    
    -- Calculate the total amount for the transaction
    SET total_amount = NEW.amount;
    
    -- Get the account balance
    SELECT account_balance INTO current_balance
    FROM account
    WHERE id = NEW.account_id;
    
    -- Update the account balance
    IF NEW.`status` = "Recharge" THEN
		UPDATE `account`
		SET account_balance = total_amount + current_balance
		WHERE id = NEW.account_id;
    ELSE
		IF current_balance - total_amount < 0 THEN
			SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Insufficient funds in the account';
		ELSE 
			UPDATE `account`
			SET account_balance = current_balance - total_amount
			WHERE id = NEW.account_id;
		END IF;
    END IF;
END;
//

DELIMITER ;