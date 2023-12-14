USE cyber_gaming;

-- Procedure 1
DROP PROCEDURE IF EXISTS device_rented_time;
DELIMITER //
CREATE PROCEDURE device_rented_time(
  IN deviceType VARCHAR(20),
  IN min_T FLOAT
)
BEGIN
  DROP TEMPORARY TABLE IF EXISTS selected_device;
  DROP TEMPORARY TABLE IF EXISTS slots_invoices;
  DROP TEMPORARY TABLE IF EXISTS rooms_invoices;
    
  -- Extract selected devices
  CREATE TEMPORARY TABLE IF NOT EXISTS selected_device AS (
    SELECT room_type, room_order, slot_order, device_order, name AS device_name, start_date, expire_time, last_time_maintain
    FROM device
    WHERE type=deviceType
  );
    
  -- Calculate time for computers of slot_invoice
  CREATE TEMPORARY TABLE IF NOT EXISTS slots_invoices AS (
    SELECT CD.*, SUM(TIMESTAMPDIFF(SECOND, SI.start_time, SI.end_time))/3600 AS `total_time (h)`
    FROM selected_device CD
    INNER JOIN slot_invoice SI
    ON SI.room_type=CD.room_type AND SI.room_order=CD.room_order AND SI.slot_order=CD.slot_order
    WHERE SI.start_time > CD.last_time_maintain
    GROUP BY room_type, room_order, slot_order, device_order, device_name, start_date, expire_time, last_time_maintain
    HAVING SUM(TIMESTAMPDIFF(SECOND, SI.start_time, SI.end_time))/3600 > min_T
  );
    
  -- Calculate time for computers of room_invoice
  CREATE TEMPORARY TABLE IF NOT EXISTS rooms_invoices (
    SELECT CD.*, SUM(TIMESTAMPDIFF(SECOND, RI.start_time, RI.end_time))/3600 AS `total_time (h)`
    FROM selected_device CD
    INNER JOIN room_invoice RI
    ON RI.room_type=CD.room_type AND RI.room_order=CD.room_order
    WHERE RI.start_time > CD.last_time_maintain
    GROUP BY room_type, room_order, slot_order, device_order, device_name, start_date, expire_time, last_time_maintain
    HAVING SUM(TIMESTAMPDIFF(SECOND, RI.start_time, RI.end_time))/3600 > min_T
  );
    
  -- Combine two results
  SELECT * FROM slots_invoices
  UNION
  SELECT * FROM rooms_invoices
  ORDER BY `total_time (h)` DESC, room_type ASC, room_order ASC;
    
  DROP TEMPORARY TABLE IF EXISTS selected_device;
  DROP TEMPORARY TABLE IF EXISTS slots_invoices;
  DROP TEMPORARY TABLE IF EXISTS rooms_invoices;
END //
DELIMITER ;

-- Procedure 2
DROP PROCEDURE IF EXISTS find_invoice;
DELIMITER //
CREATE PROCEDURE find_invoice(
  IN customer_fname VARCHAR(60),
  IN customer_phone VARCHAR(20),
  IN time_start TIMESTAMP,
  IN time_end TIMESTAMP
)
BEGIN
  SELECT I.*, S.firstname AS staff_firstname, S.lastname AS staff_lastname, C.firstname AS customer_firstname, C.lastname AS customer_lastname
  FROM invoice I
  INNER JOIN staff S ON I.staff_id=S.id
  INNER JOIN customer C ON I.customer_id=C.id
  WHERE 
    (customer_fname='' OR POSITION(customer_fname IN C.firstname) > 0) AND
    (customer_phone='' OR POSITION(customer_phone IN C.phone_number) > 0) AND
    I.created_at >= time_start AND I.created_at <= time_end;
END //
DELIMITER ;