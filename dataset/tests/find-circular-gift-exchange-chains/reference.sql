WITH RECURSIVE Chains AS (
    SELECT 
        giver_id, 
        receiver_id, 
        gift_value, 
        giver_id AS start_id 
    FROM SecretSanta
    UNION ALL
    SELECT 
        s.giver_id, 
        s.receiver_id, 
        s.gift_value, 
        c.start_id 
    FROM SecretSanta s
    INNER JOIN Chains c 
        ON s.giver_id = c.receiver_id 
    WHERE s.giver_id != c.start_id
),
ChainSummary AS (
    SELECT 
        start_id, 
        COUNT(*) AS chain_length, 
        SUM(gift_value) AS total_gift_value 
    FROM Chains 
    GROUP BY start_id
),
UniqueChains AS (
    SELECT DISTINCT 
        chain_length, 
        total_gift_value 
    FROM ChainSummary
)
SELECT 
    RANK() OVER (ORDER BY chain_length DESC, total_gift_value DESC) AS chain_id, 
    chain_length, 
    total_gift_value 
FROM UniqueChains;
