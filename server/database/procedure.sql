USE cyber_gaming;
DROP PROCEDURE IF EXISTS comp_rented_time;

DELIMITER //

CREATE PROCEDURE comp_rented_time(
	IN deviceType VARCHAR(20),
	IN min_T FLOAT
)
BEGIN
	CREATE TEMPORARY TABLE IF NOT EXISTS slots_hours AS (
		WITH ComputerDevice AS (
			SELECT room_type, room_order, slot_order, device_order, name AS device_name, last_time_maintain
			FROM device
			WHERE type=deviceType
		)
		SELECT CD.room_type, CD.room_order, CD.slot_order, CD.device_order, CD.device_name, CD.last_time_maintain, SUM(TIMESTAMPDIFF(SECOND, SI.start_time, SI.end_time))/3600 AS `total_time (h)`
		FROM
			 ComputerDevice CD
		INNER JOIN slot_invoice SI
		ON CD.room_type=SI.room_type AND CD.room_order=SI.room_order AND CD.slot_order=SI.slot_order
		WHERE SI.start_time > CD.last_time_maintain
		GROUP BY room_type, room_order, slot_order, device_order
		-- HAVING SUM(TIMESTAMPDIFF(SECOND, SI.start_time, SI.end_time))/3600 > min_T
		ORDER BY room_type ASC, room_order ASC, `total_time (h)` DESC
    );
    SELECT * FROM slots_hours;
    DROP TEMPORARY TABLE IF EXISTS slots_hours;
END //

DELIMITER ;

-- CREATE PROCEDURE staffs_add_money_for_customer
-- 	@customer_name VARCHAR(50)
-- AS
-- BEGIN
-- 	SELECT S.staff_id, S.staff_name
-- 	FROM GiaoDichNapTien NT
-- 	INNER JOIN DonHang DH ON NT.order_id=DH.order_id
-- 	INNER JOIN ThuNgan TN ON DH.staff_id=TN.staff_id
-- 	INNER JOIN Staff S ON TN.staff_id=S.staff_id
-- 	INNER JOIN Account A ON NT.acc_id=A.acc_id
-- 	INNER JOIN Customer C ON A.customer_id=C.customer_id
-- 	WHERE C.customer_name = @customer_name
-- END