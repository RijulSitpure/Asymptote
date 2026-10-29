import json
cases = [
    {
        'name': 'standard_sales',
        'inserts': """INSERT INTO SalesPerson VALUES (1, 'John', 100000, 6, '4/1/2006'), (2, 'Amy', 12000, 5, '5/1/2010'), (3, 'Mark', 65000, 12, '12/25/2008'), (4, 'Pam', 25000, 25, '1/1/2005'), (5, 'Alex', 5000, 10, '2/3/2007');
INSERT INTO Company VALUES (1, 'RED', 'Boston'), (2, 'ORANGE', 'New York'), (3, 'YELLOW', 'Chicago'), (4, 'GREEN', 'Austin');
INSERT INTO Orders VALUES (1, '1/1/2014', 3, 1, 10000), (2, '2/1/2014', 4, 5, 5000), (3, '3/1/2014', 1, 1, 50000), (4, '4/1/2014', 1, 4, 25000);"""
    },
    {
        'name': 'no_red_orders',
        'inserts': """INSERT INTO SalesPerson VALUES (1, 'Alice', 10000, 5, '1/1/2020');
INSERT INTO Company VALUES (1, 'BLUE', 'City');
INSERT INTO Orders VALUES (1, '1/1/2020', 1, 1, 100);"""
    }
]
print(json.dumps(cases))
