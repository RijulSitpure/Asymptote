WITH UserCategories AS (
    SELECT DISTINCT 
        p.user_id, 
        i.category
    FROM ProductPurchases p
    JOIN ProductInfo i 
      ON p.product_id = i.product_id
),
CategoryPairs AS (
    SELECT 
        uc1.user_id,
        uc1.category AS category1,
        uc2.category AS category2
    FROM UserCategories uc1
    JOIN UserCategories uc2 
      ON uc1.user_id = uc2.user_id 
     AND uc1.category < uc2.category
),
PairCustomerCounts AS (
    SELECT 
        category1, 
        category2, 
        COUNT(DISTINCT user_id) AS customer_count
    FROM CategoryPairs
    GROUP BY category1, category2
)
SELECT 
    category1, 
    category2, 
    customer_count
FROM PairCustomerCounts
WHERE customer_count >= 3
ORDER BY customer_count DESC, 
         category1 ASC, 
         category2 ASC;
