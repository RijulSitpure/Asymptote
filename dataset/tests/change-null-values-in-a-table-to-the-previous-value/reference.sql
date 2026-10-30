WITH ranked AS (
    SELECT id, drink, ROW_NUMBER() OVER () as rn
    FROM CoffeeShop
),
grouped AS (
    SELECT id, drink, rn,
           COUNT(drink) OVER (ORDER BY rn ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as grp
    FROM ranked
)
SELECT id, FIRST_VALUE(drink) OVER (PARTITION BY grp ORDER BY rn) as drink
FROM grouped
ORDER BY rn;
