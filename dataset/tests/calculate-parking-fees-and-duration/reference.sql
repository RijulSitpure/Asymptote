WITH CarTotals AS (
    SELECT 
        car_id,
        SUM(fee_paid) AS total_fee_paid,
        SUM(TIMESTAMPDIFF(MINUTE, entry_time, exit_time)) AS total_duration
    FROM ParkingTransactions
    GROUP BY car_id
),
LotTotals AS (
    SELECT 
        car_id,
        lot_id,
        SUM(TIMESTAMPDIFF(MINUTE, entry_time, exit_time)) AS lot_duration,
        ROW_NUMBER() OVER (
            PARTITION BY car_id 
            ORDER BY SUM(TIMESTAMPDIFF(MINUTE, entry_time, exit_time)) DESC, lot_id ASC
        ) AS rnk
    FROM ParkingTransactions
    GROUP BY car_id, lot_id
)
SELECT 
    c.car_id,
    c.total_fee_paid,
    ROUND(c.total_fee_paid * 60.0 / c.total_duration, 2) AS avg_hourly_fee,
    l.lot_id AS most_time_lot
FROM CarTotals c
JOIN LotTotals l 
  ON c.car_id = l.car_id AND l.rnk = 1
ORDER BY c.car_id ASC;
