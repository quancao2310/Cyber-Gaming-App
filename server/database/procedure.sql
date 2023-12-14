USE cyber_gaming;

-- Procedure 1
DROP PROCEDURE IF EXISTS comp_rented_time;
DELIMITER //
CREATE PROCEDURE comp_rented_time(
  IN deviceType VARCHAR(20),
  IN min_T FLOAT
)
BEGIN
  DROP TEMPORARY TABLE IF EXISTS computer_device;
  DROP TEMPORARY TABLE IF EXISTS slots_invoices;
  DROP TEMPORARY TABLE IF EXISTS rooms_invoices;
    
  -- Extract computer devices
  CREATE TEMPORARY TABLE IF NOT EXISTS computer_device AS (
    SELECT room_type, room_order, slot_order, device_order, name AS device_name, last_time_maintain
    FROM device
    WHERE type=deviceType
  );
    
  -- Calculate time for computers of slot_invoice
  CREATE TEMPORARY TABLE IF NOT EXISTS slots_invoices AS (
    SELECT CD.*, SUM(TIMESTAMPDIFF(SECOND, SI.start_time, SI.end_time))/3600 AS `total_time (h)`
    FROM computer_device CD
    INNER JOIN slot_invoice SI
    ON SI.room_type=CD.room_type AND SI.room_order=CD.room_order AND SI.slot_order=CD.slot_order
    WHERE SI.start_time > CD.last_time_maintain
    GROUP BY room_type, room_order, slot_order, device_order, device_name, last_time_maintain
    HAVING SUM(TIMESTAMPDIFF(SECOND, SI.start_time, SI.end_time))/3600 > min_T
  );
    
  -- Calculate time for computers of room_invoice
  CREATE TEMPORARY TABLE IF NOT EXISTS rooms_invoices (
    SELECT CD.*, SUM(TIMESTAMPDIFF(SECOND, RI.start_time, RI.end_time))/3600 AS `total_time (h)`
    FROM computer_device CD
    INNER JOIN room_invoice RI
    ON RI.room_type=CD.room_type AND RI.room_order=CD.room_order
    WHERE RI.start_time > CD.last_time_maintain
    GROUP BY room_type, room_order, slot_order, device_order, device_name, last_time_maintain
    HAVING SUM(TIMESTAMPDIFF(SECOND, RI.start_time, RI.end_time))/3600 > min_T
  );
    
  -- Combine two results
  SELECT * FROM slots_invoices
  UNION
  SELECT * FROM rooms_invoices
  ORDER BY `total_time (h)` DESC, room_type ASC, room_order ASC;
    
  DROP TEMPORARY TABLE IF EXISTS computer_device;
  DROP TEMPORARY TABLE IF EXISTS slots_invoices;
  DROP TEMPORARY TABLE IF EXISTS rooms_invoices;
END //
DELIMITER ;

-- Procedure 2
DROP PROCEDURE IF EXISTS find_transaction;
DELIMITER //
CREATE PROCEDURE find_transaction(
  IN customer_fname VARCHAR(60),
  IN customer_phone VARCHAR(20),
  IN time_start TIMESTAMP,
  IN time_end TIMESTAMP
)
BEGIN
  SELECT T.*, S.firstname, S.lastname
  FROM transaction T
  INNER JOIN invoice I ON T.invoice_id=I.id
  INNER JOIN staff S ON I.staff_id=S.id
  INNER JOIN account A ON T.account_id=A.id
  INNER JOIN customer C ON A.customer_id=C.id
  WHERE C.firstname = customer_fname AND C.phone_number = customer_phone AND T.created_at >= time_start AND T.created_at <= time_end;
END //
DELIMITER ;