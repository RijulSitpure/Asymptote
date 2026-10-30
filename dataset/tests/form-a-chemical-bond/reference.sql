SELECT 
    m.symbol AS metal, 
    n.symbol AS nonmetal
FROM Elements AS m
JOIN Elements AS n 
  ON m.type = 'Metal' AND n.type = 'Nonmetal';
