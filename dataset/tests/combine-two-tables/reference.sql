SELECT p.firstName, p.lastName,
       (SELECT a.city FROM Address a WHERE a.personId = p.personId LIMIT 1) AS city,
       (SELECT a.state FROM Address a WHERE a.personId = p.personId LIMIT 1) AS state
FROM Person p;
