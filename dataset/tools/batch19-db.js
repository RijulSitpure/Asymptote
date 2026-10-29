import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Problem definitions for Batch 19 Database (16 problems: #1378 - #1495)
export const batch19Db = [
  // 1. #1378 replace-employee-id-with-the-unique-identifier
  {
    slug: 'replace-employee-id-with-the-unique-identifier',
    number: 1378,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Preserving All Base Employees',
        text: 'Every employee from Employees must appear in the result set even if they lack a unique identifier.'
      },
      {
        level: 2,
        title: 'Left Outer Join Link',
        text: 'left join EmployeeUNI on Employees.id = EmployeeUNI.id to retain null values where no unique identifier exists.'
      },
      {
        level: 3,
        title: 'Identifier Projection',
        text: 'select EmployeeUNI.unique_id, Employees.name from Employees left join EmployeeUNI on Employees.id = EmployeeUNI.id.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT eu.unique_id, e.name\nFROM Employees e\nLEFT JOIN EmployeeUNI eu ON e.id = eu.id;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(E + U)',
      space: 'O(E)',
      variables: ['E: records in Employees', 'U: records in EmployeeUNI'],
      notes: 'Hash join or index lookup on primary key id resolves in linear time proportional to table size.',
      whyNaiveFails: 'An inner join inadvertently discards employees who do not have an entry in EmployeeUNI.',
      spaceTimeTradeoff: 'Left join preserves all primary entity rows while emitting nulls for unmatched keys.',
      interviewerExpectation: 'Standard left join preserving left-table cardinality.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT eu.unique_id, e.name
FROM Employees e
LEFT JOIN EmployeeUNI eu ON e.id = eu.id;`,
        approach: 'Left Outer Join on Employee ID',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT eu.unique_id, e.name
FROM Employees e
LEFT JOIN EmployeeUNI eu ON e.id = eu.id;`,
        approach: 'PostgreSQL Left Join on Identifier',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def replace_employee_id(employees: pd.DataFrame, employee_uni: pd.DataFrame) -> pd.DataFrame:
    merged = pd.merge(employees, employee_uni, on='id', how='left')
    return merged[['unique_id', 'name']]`,
        approach: 'Pandas Left Merge',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Employees (id int, name varchar(20));
CREATE TABLE EmployeeUNI (id int, unique_id int);`,
    referenceSql: `SELECT eu.unique_id, e.name FROM Employees e LEFT JOIN EmployeeUNI eu ON e.id = eu.id;`,
    generatorPy: `cases = [
    {
        "Employees": [
            {"id": 1, "name": "Alice"},
            {"id": 7, "name": "Bob"},
            {"id": 11, "name": "Meir"},
            {"id": 90, "name": "Winston"},
            {"id": 3, "name": "Jonathan"}
        ],
        "EmployeeUNI": [
            {"id": 3, "unique_id": 1},
            {"id": 11, "unique_id": 2},
            {"id": 90, "unique_id": 3}
        ]
    }
]`
  },

  // 2. #1384 total-sales-amount-by-year
  {
    slug: 'total-sales-amount-by-year',
    number: 1384,
    category: 'Database',
    patterns: ['recursive-cte'],
    hints: [
      {
        level: 1,
        title: 'Static Calendar Year Series',
        text: 'Sales spans cover years 2018, 2019, and 2020. Construct or join against these three calendar years.'
      },
      {
        level: 2,
        title: 'Date Overlap Computation',
        text: 'The active sales duration in year Y is datediff(least(period_end, concat(Y, "-12-31")), greatest(period_start, concat(Y, "-01-01"))) + 1.'
      },
      {
        level: 3,
        title: 'Revenue Aggregation by Year',
        text: 'Multiply overlapping days by average_daily_revenue where period_start <= concat(Y, "-12-31") and period_end >= concat(Y, "-01-01").'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH RECURSIVE Years AS (\n    SELECT 2018 AS report_year\n    UNION ALL\n    SELECT report_year + 1 FROM Years WHERE report_year < 2020\n)\nSELECT p.product_id,\n       p.product_name,\n       CAST(y.report_year AS CHAR) AS report_year,\n       (DATEDIFF(\n           LEAST(s.period_end, DATE(CONCAT(y.report_year, \'-12-31\'))),\n           GREATEST(s.period_start, DATE(CONCAT(y.report_year, \'-01-01\')))\n       ) + 1) * s.average_daily_revenue AS total_amount\nFROM Sales s\nJOIN Product p ON s.product_id = p.product_id\nJOIN Years y ON s.period_start <= DATE(CONCAT(y.report_year, \'-12-31\'))\n            AND s.period_end >= DATE(CONCAT(y.report_year, \'-01-01\'))\nORDER BY p.product_id, report_year;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(S * Y)',
      space: 'O(S * Y)',
      variables: ['S: sales records', 'Y: number of calendar years (constant 3)'],
      notes: 'Joining sales intervals with a fixed 3-year recursive sequence executes in linear time proportional to S.',
      whyNaiveFails: 'Attempting to expand day-by-day generates millions of intermediate rows.',
      spaceTimeTradeoff: 'Interval clipping with LEAST and GREATEST computes overlap days in a single mathematical expression.',
      interviewerExpectation: 'Date boundary clipping using LEAST and GREATEST functions joined against distinct years.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH RECURSIVE Years AS (
    SELECT 2018 AS report_year
    UNION ALL
    SELECT report_year + 1 FROM Years WHERE report_year < 2020
)
SELECT p.product_id,
       p.product_name,
       CAST(y.report_year AS CHAR) AS report_year,
       (DATEDIFF(
           LEAST(s.period_end, DATE(CONCAT(y.report_year, '-12-31'))),
           GREATEST(s.period_start, DATE(CONCAT(y.report_year, '-01-01')))
       ) + 1) * s.average_daily_revenue AS total_amount
FROM Sales s
JOIN Product p ON s.product_id = p.product_id
JOIN Years y ON s.period_start <= DATE(CONCAT(y.report_year, '-12-31'))
            AND s.period_end >= DATE(CONCAT(y.report_year, '-01-01'))
ORDER BY p.product_id, report_year;`,
        approach: 'Recursive Year Sequence with Date Clamping',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH RECURSIVE Years AS (
    SELECT 2018 AS report_year
    UNION ALL
    SELECT report_year + 1 FROM Years WHERE report_year < 2020
)
SELECT p.product_id,
       p.product_name,
       CAST(y.report_year AS TEXT) AS report_year,
       ((LEAST(s.period_end, TO_DATE(CONCAT(y.report_year, '-12-31'), 'YYYY-MM-DD')) -
         GREATEST(s.period_start, TO_DATE(CONCAT(y.report_year, '-01-01'), 'YYYY-MM-DD'))) + 1) * s.average_daily_revenue AS total_amount
FROM Sales s
JOIN Product p ON s.product_id = p.product_id
JOIN Years y ON s.period_start <= TO_DATE(CONCAT(y.report_year, '-12-31'), 'YYYY-MM-DD')
            AND s.period_end >= TO_DATE(CONCAT(y.report_year, '-01-01'), 'YYYY-MM-DD')
ORDER BY p.product_id, report_year;`,
        approach: 'PostgreSQL Recursive CTE with Date Subtraction',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def total_sales_by_year(product: pd.DataFrame, sales: pd.DataFrame) -> pd.DataFrame:
    rows = []
    for _, s in sales.iterrows():
        p_start = pd.to_datetime(s['period_start'])
        p_end = pd.to_datetime(s['period_end'])
        rate = s['average_daily_revenue']
        pid = s['product_id']
        for year in [2018, 2019, 2020]:
            y_start = pd.to_datetime(f"{year}-01-01")
            y_end = pd.to_datetime(f"{year}-12-31")
            if p_start <= y_end and p_end >= y_start:
                start = max(p_start, y_start)
                end = min(p_end, y_end)
                days = (end - start).days + 1
                rows.append({'product_id': pid, 'report_year': str(year), 'total_amount': days * rate})
    if not rows:
        return pd.DataFrame(columns=['product_id', 'product_name', 'report_year', 'total_amount'])
    res = pd.DataFrame(rows)
    res = pd.merge(res, product, on='product_id')
    return res[['product_id', 'product_name', 'report_year', 'total_amount']].sort_values(by=['product_id', 'report_year'])`,
        approach: 'Pandas Date Clamping Overlap Calculation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Product (product_id int, product_name varchar(30));
CREATE TABLE Sales (product_id int, period_start date, period_end date, average_daily_revenue int);`,
    referenceSql: `WITH RECURSIVE Years AS (SELECT 2018 AS report_year UNION ALL SELECT report_year + 1 FROM Years WHERE report_year < 2020) SELECT p.product_id, p.product_name, CAST(y.report_year AS CHAR) AS report_year, (DATEDIFF(LEAST(s.period_end, DATE(CONCAT(y.report_year, '-12-31'))), GREATEST(s.period_start, DATE(CONCAT(y.report_year, '-01-01')))) + 1) * s.average_daily_revenue AS total_amount FROM Sales s JOIN Product p ON s.product_id = p.product_id JOIN Years y ON s.period_start <= DATE(CONCAT(y.report_year, '-12-31')) AND s.period_end >= DATE(CONCAT(y.report_year, '-01-01')) ORDER BY p.product_id, report_year;`,
    generatorPy: `cases = [
    {
        "Product": [
            {"product_id": 1, "product_name": "LC Phone "},
            {"product_id": 2, "product_name": "LC T-Shirt"},
            {"product_id": 3, "product_name": "LC Book"}
        ],
        "Sales": [
            {"product_id": 1, "period_start": "2019-01-25", "period_end": "2019-02-28", "average_daily_revenue": 100},
            {"product_id": 2, "period_start": "2018-12-01", "period_end": "2020-01-01", "average_daily_revenue": 10},
            {"product_id": 3, "period_start": "2019-12-01", "period_end": "2020-01-31", "average_daily_revenue": 1}
        ]
    }
]`
  },

  // 3. #1393 capital-gainloss
  {
    slug: 'capital-gainloss',
    number: 1393,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Signed Cash Flow Mapping',
        text: 'Buying a stock represents a cash outflow (negative price), while selling is a cash inflow (positive price).'
      },
      {
        level: 2,
        title: 'Conditional Summation',
        text: 'Use sum(case when operation = "Buy" then -price else price end) to compute net gain or loss per stock.'
      },
      {
        level: 3,
        title: 'Stock Grouping',
        text: 'group by stock_name to aggregate all buy and sell transactions across each asset.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT stock_name,\n       SUM(CASE WHEN operation = \'Buy\' THEN -price ELSE price END) AS capital_gain_loss\nFROM Stocks\nGROUP BY stock_name;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(S)',
      variables: ['N: records in Stocks', 'S: distinct stocks'],
      notes: 'Single group-by aggregation over stock_name hashes transactions in linear time.',
      whyNaiveFails: 'Separate queries or subqueries for buys and sells require extra table scans and complex joins.',
      spaceTimeTradeoff: 'CASE expression inside SUM computes the net balance in a single table pass.',
      interviewerExpectation: 'Conditional aggregation mapping operations to signed coefficients.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT stock_name,
       SUM(CASE WHEN operation = 'Buy' THEN -price ELSE price END) AS capital_gain_loss
FROM Stocks
GROUP BY stock_name;`,
        approach: 'Conditional Summation by Stock',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT stock_name,
       SUM(CASE WHEN operation = 'Buy' THEN -price ELSE price END) AS capital_gain_loss
FROM Stocks
GROUP BY stock_name;`,
        approach: 'PostgreSQL Conditional Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def capital_gainloss(stocks: pd.DataFrame) -> pd.DataFrame:
    stocks['signed_price'] = stocks.apply(lambda r: -r['price'] if r['operation'] == 'Buy' else r['price'], axis=1)
    res = stocks.groupby('stock_name')['signed_price'].sum().reset_index()
    res.rename(columns={'signed_price': 'capital_gain_loss'}, inplace=True)
    return res`,
        approach: 'Pandas Vectorized Signed Sum',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Stocks (stock_name varchar(15), operation varchar(5), operation_day int, price int);`,
    referenceSql: `SELECT stock_name, SUM(CASE WHEN operation = 'Buy' THEN -price ELSE price END) AS capital_gain_loss FROM Stocks GROUP BY stock_name;`,
    generatorPy: `cases = [
    {
        "Stocks": [
            {"stock_name": "Leetcode", "operation": "Buy", "operation_day": 1, "price": 1000},
            {"stock_name": "Corona Masks", "operation": "Buy", "operation_day": 2, "price": 10},
            {"stock_name": "Leetcode", "operation": "Sell", "operation_day": 5, "price": 9000},
            {"stock_name": "Handbags", "operation": "Buy", "operation_day": 17, "price": 30000},
            {"stock_name": "Corona Masks", "operation": "Sell", "operation_day": 3, "price": 1010},
            {"stock_name": "Corona Masks", "operation": "Buy", "operation_day": 4, "price": 1000},
            {"stock_name": "Corona Masks", "operation": "Sell", "operation_day": 5, "price": 500},
            {"stock_name": "Corona Masks", "operation": "Buy", "operation_day": 6, "price": 1000},
            {"stock_name": "Handbags", "operation": "Sell", "operation_day": 29, "price": 7000},
            {"stock_name": "Corona Masks", "operation": "Sell", "operation_day": 10, "price": 10000}
        ]
    }
]`
  },

  // 4. #1398 customers-who-bought-products-a-and-b-but-not-c
  {
    slug: 'customers-who-bought-products-a-and-b-but-not-c',
    number: 1398,
    category: 'Database',
    patterns: ['having-filter'],
    hints: [
      {
        level: 1,
        title: 'Customer Purchase Conditions',
        text: 'Identify customers who purchased product A, purchased product B, and never purchased product C.'
      },
      {
        level: 2,
        title: 'Group-Level Boolean Aggregation',
        text: 'Join Customers and Orders, then apply having sum(product_name = "A") > 0 and sum(product_name = "B") > 0 and sum(product_name = "C") = 0.'
      },
      {
        level: 3,
        title: 'Sorting Output',
        text: 'order by customer_id ascending as specified in the schema specification.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT c.customer_id, c.customer_name\nFROM Customers c\nJOIN Orders o ON c.customer_id = o.customer_id\nGROUP BY c.customer_id, c.customer_name\nHAVING SUM(o.product_name = \'A\') > 0\n   AND SUM(o.product_name = \'B\') > 0\n   AND SUM(o.product_name = \'C\') = 0\nORDER BY c.customer_id;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(C + O)',
      space: 'O(C)',
      variables: ['C: customer count', 'O: order count'],
      notes: 'Group-by aggregation over orders filtered by HAVING conditions resolves in linear time.',
      whyNaiveFails: 'Multiple IN and NOT IN subqueries cause repeated scans across the entire Orders table.',
      spaceTimeTradeoff: 'Evaluating boolean sums in HAVING processes all conditions in a single group-by pass.',
      interviewerExpectation: 'Single GROUP BY with boolean condition aggregation inside the HAVING clause.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT c.customer_id, c.customer_name
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
HAVING SUM(o.product_name = 'A') > 0
   AND SUM(o.product_name = 'B') > 0
   AND SUM(o.product_name = 'C') = 0
ORDER BY c.customer_id;`,
        approach: 'HAVING Boolean Sum Filtration',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT c.customer_id, c.customer_name
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
HAVING SUM(CASE WHEN o.product_name = 'A' THEN 1 ELSE 0 END) > 0
   AND SUM(CASE WHEN o.product_name = 'B' THEN 1 ELSE 0 END) > 0
   AND SUM(CASE WHEN o.product_name = 'C' THEN 1 ELSE 0 END) = 0
ORDER BY c.customer_id;`,
        approach: 'PostgreSQL CASE Sum in HAVING',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def find_customers(customers: pd.DataFrame, orders: pd.DataFrame) -> pd.DataFrame:
    grouped = orders.groupby('customer_id')['product_name'].agg(set).reset_index()
    valid_ids = grouped[grouped['product_name'].apply(lambda s: 'A' in s and 'B' in s and 'C' not in s)]['customer_id']
    res = customers[customers['customer_id'].isin(valid_ids)]
    return res[['customer_id', 'customer_name']].sort_values(by='customer_id')`,
        approach: 'Pandas Groupby Set Filtering',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Customers (customer_id int, customer_name varchar(30));
CREATE TABLE Orders (order_id int, customer_id int, product_name varchar(30));`,
    referenceSql: `SELECT c.customer_id, c.customer_name FROM Customers c JOIN Orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.customer_name HAVING SUM(o.product_name = 'A') > 0 AND SUM(o.product_name = 'B') > 0 AND SUM(o.product_name = 'C') = 0 ORDER BY c.customer_id;`,
    generatorPy: `cases = [
    {
        "Customers": [
            {"customer_id": 1, "customer_name": "Daniel"},
            {"customer_id": 2, "customer_name": "Diana"},
            {"customer_id": 3, "customer_name": "Elizabeth"},
            {"customer_id": 4, "customer_name": "Jhon"}
        ],
        "Orders": [
            {"order_id": 10, "customer_id": 1, "product_name": "A"},
            {"order_id": 20, "customer_id": 1, "product_name": "B"},
            {"order_id": 30, "customer_id": 1, "product_name": "D"},
            {"order_id": 40, "customer_id": 1, "product_name": "C"},
            {"order_id": 50, "customer_id": 2, "product_name": "A"},
            {"order_id": 60, "customer_id": 3, "product_name": "A"},
            {"order_id": 70, "customer_id": 3, "product_name": "B"},
            {"order_id": 80, "customer_id": 3, "product_name": "D"},
            {"order_id": 90, "customer_id": 4, "product_name": "C"}
        ]
    }
]`
  },

  // 5. #1407 top-travellers
  {
    slug: 'top-travellers',
    number: 1407,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Include All Users',
        text: 'Users who have taken zero rides must appear in the final table with a travelled distance of 0.'
      },
      {
        level: 2,
        title: 'Null Coalescing Sum',
        text: 'left join Rides on Users.id = Rides.user_id and apply ifnull(sum(distance), 0).'
      },
      {
        level: 3,
        title: 'Tie-Breaking Sort Order',
        text: 'order by travelled_distance desc, name asc.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT u.name,\n       IFNULL(SUM(r.distance), 0) AS travelled_distance\nFROM Users u\nLEFT JOIN Rides r ON u.id = r.user_id\nGROUP BY u.id, u.name\nORDER BY travelled_distance DESC, u.name ASC;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(U + R log U)',
      space: 'O(U)',
      variables: ['U: users count', 'R: rides count'],
      notes: 'Left join followed by grouping by user id runs in linear time, followed by sorting users.',
      whyNaiveFails: 'Inner join omits users without any rides instead of reporting 0 distance.',
      spaceTimeTradeoff: 'Grouping by unique user key guarantees accurate aggregation even with duplicate names.',
      interviewerExpectation: 'Left outer join with COALESCE or IFNULL handling zero rides and secondary name sorting.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT u.name,
       IFNULL(SUM(r.distance), 0) AS travelled_distance
FROM Users u
LEFT JOIN Rides r ON u.id = r.user_id
GROUP BY u.id, u.name
ORDER BY travelled_distance DESC, u.name ASC;`,
        approach: 'Left Join with IFNULL Distance Sum',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT u.name,
       COALESCE(SUM(r.distance), 0) AS travelled_distance
FROM Users u
LEFT JOIN Rides r ON u.id = r.user_id
GROUP BY u.id, u.name
ORDER BY travelled_distance DESC, u.name ASC;`,
        approach: 'PostgreSQL Left Join with COALESCE',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def top_travellers(users: pd.DataFrame, rides: pd.DataFrame) -> pd.DataFrame:
    merged = pd.merge(users, rides, left_on='id', right_on='user_id', how='left')
    res = merged.groupby(['id_x', 'name'])['distance'].sum().fillna(0).reset_index()
    res.rename(columns={'distance': 'travelled_distance'}, inplace=True)
    return res[['name', 'travelled_distance']].sort_values(by=['travelled_distance', 'name'], ascending=[False, True])`,
        approach: 'Pandas Left Merge and Fillna Sum',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Users (id int, name varchar(30));
CREATE TABLE Rides (id int, user_id int, distance int);`,
    referenceSql: `SELECT u.name, IFNULL(SUM(r.distance), 0) AS travelled_distance FROM Users u LEFT JOIN Rides r ON u.id = r.user_id GROUP BY u.id, u.name ORDER BY travelled_distance DESC, u.name ASC;`,
    generatorPy: `cases = [
    {
        "Users": [
            {"id": 1, "name": "Alice"},
            {"id": 2, "name": "Bob"},
            {"id": 3, "name": "Alex"},
            {"id": 4, "name": "Donald"},
            {"id": 7, "name": "Lee"},
            {"id": 13, "name": "Jonathan"},
            {"id": 19, "name": "Elvis"}
        ],
        "Rides": [
            {"id": 1, "user_id": 1, "distance": 120},
            {"id": 2, "user_id": 2, "distance": 317},
            {"id": 3, "user_id": 3, "distance": 222},
            {"id": 4, "user_id": 7, "distance": 100},
            {"id": 5, "user_id": 13, "distance": 312},
            {"id": 6, "user_id": 19, "distance": 50},
            {"id": 7, "user_id": 7, "distance": 120},
            {"id": 8, "user_id": 19, "distance": 400},
            {"id": 9, "user_id": 7, "distance": 230}
        ]
    }
]`
  },

  // 6. #1412 find-the-quiet-students-in-all-exams
  {
    slug: 'find-the-quiet-students-in-all-exams',
    number: 1412,
    category: 'Database',
    patterns: ['window-ranking'],
    hints: [
      {
        level: 1,
        title: 'Exam Extremes Identification',
        text: 'A student is loud in an exam if their score is the maximum or minimum for that exam.'
      },
      {
        level: 2,
        title: 'Window Ranking across Exams',
        text: 'Compute rank() over (partition by exam_id order by score asc) and desc to flag rank 1 students.'
      },
      {
        level: 3,
        title: 'Exclusion of Loud Students',
        text: 'Select distinct students who took at least one exam and whose student_id is not in the set of loud students.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH ExamRanks AS (\n    SELECT exam_id, student_id,\n           RANK() OVER (PARTITION BY exam_id ORDER BY score ASC) AS rk_low,\n           RANK() OVER (PARTITION BY exam_id ORDER BY score DESC) AS rk_high\n    FROM Exam\n),\nLoudStudents AS (\n    SELECT DISTINCT student_id\n    FROM ExamRanks\n    WHERE rk_low = 1 OR rk_high = 1\n)\nSELECT DISTINCT s.student_id, s.student_name\nFROM Student s\nJOIN Exam e ON s.student_id = e.student_id\nWHERE s.student_id NOT IN (SELECT student_id FROM LoudStudents)\nORDER BY s.student_id;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(E log E + S)',
      space: 'O(E)',
      variables: ['E: exam records', 'S: student records'],
      notes: 'Window ranking groups scores per exam in O(E log E) time followed by set exclusion.',
      whyNaiveFails: 'Correlated subqueries per student and exam cause repeated max and min evaluations across all exams.',
      spaceTimeTradeoff: 'Computing ascending and descending ranks simultaneously identifies both extremes in a single CTE pass.',
      interviewerExpectation: 'Window ranking partitioned by exam excluding loud performers from active exam participants.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH ExamRanks AS (
    SELECT exam_id, student_id,
           RANK() OVER (PARTITION BY exam_id ORDER BY score ASC) AS rk_low,
           RANK() OVER (PARTITION BY exam_id ORDER BY score DESC) AS rk_high
    FROM Exam
),
LoudStudents AS (
    SELECT DISTINCT student_id
    FROM ExamRanks
    WHERE rk_low = 1 OR rk_high = 1
)
SELECT DISTINCT s.student_id, s.student_name
FROM Student s
JOIN Exam e ON s.student_id = e.student_id
WHERE s.student_id NOT IN (SELECT student_id FROM LoudStudents)
ORDER BY s.student_id;`,
        approach: 'Bidirectional Window Ranking and Loud Exclusion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH ExamRanks AS (
    SELECT exam_id, student_id,
           RANK() OVER (PARTITION BY exam_id ORDER BY score ASC) AS rk_low,
           RANK() OVER (PARTITION BY exam_id ORDER BY score DESC) AS rk_high
    FROM Exam
),
LoudStudents AS (
    SELECT DISTINCT student_id
    FROM ExamRanks
    WHERE rk_low = 1 OR rk_high = 1
)
SELECT DISTINCT s.student_id, s.student_name
FROM Student s
JOIN Exam e ON s.student_id = e.student_id
WHERE s.student_id NOT IN (SELECT student_id FROM LoudStudents)
ORDER BY s.student_id;`,
        approach: 'PostgreSQL Window Ranking Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def find_quiet_students(student: pd.DataFrame, exam: pd.DataFrame) -> pd.DataFrame:
    if exam.empty:
        return pd.DataFrame(columns=['student_id', 'student_name'])
    exam['min_score'] = exam.groupby('exam_id')['score'].transform('min')
    exam['max_score'] = exam.groupby('exam_id')['score'].transform('max')
    loud_ids = set(exam[(exam['score'] == exam['min_score']) | (exam['score'] == exam['max_score'])]['student_id'])
    active_ids = set(exam['student_id'])
    quiet_ids = active_ids - loud_ids
    res = student[student['student_id'].isin(quiet_ids)]
    return res[['student_id', 'student_name']].sort_values(by='student_id')`,
        approach: 'Pandas Transform Min/Max Exclusion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Student (student_id int, student_name varchar(30));
CREATE TABLE Exam (exam_id int, student_id int, score int);`,
    referenceSql: `WITH ExamRanks AS (SELECT exam_id, student_id, RANK() OVER (PARTITION BY exam_id ORDER BY score ASC) AS rk_low, RANK() OVER (PARTITION BY exam_id ORDER BY score DESC) AS rk_high FROM Exam), LoudStudents AS (SELECT DISTINCT student_id FROM ExamRanks WHERE rk_low = 1 OR rk_high = 1) SELECT DISTINCT s.student_id, s.student_name FROM Student s JOIN Exam e ON s.student_id = e.student_id WHERE s.student_id NOT IN (SELECT student_id FROM LoudStudents) ORDER BY s.student_id;`,
    generatorPy: `cases = [
    {
        "Student": [
            {"student_id": 1, "student_name": "Daniel"},
            {"student_id": 2, "student_name": "Jade"},
            {"student_id": 3, "student_name": "Stella"},
            {"student_id": 4, "student_name": "Jonathan"},
            {"student_id": 5, "student_name": "Will"}
        ],
        "Exam": [
            {"exam_id": 10, "student_id": 1, "score": 70},
            {"exam_id": 10, "student_id": 2, "score": 80},
            {"exam_id": 10, "student_id": 3, "score": 90},
            {"exam_id": 20, "student_id": 1, "score": 80},
            {"exam_id": 30, "student_id": 1, "score": 70},
            {"exam_id": 30, "student_id": 3, "score": 80},
            {"exam_id": 30, "student_id": 4, "score": 90},
            {"exam_id": 40, "student_id": 1, "score": 60},
            {"exam_id": 40, "student_id": 2, "score": 70},
            {"exam_id": 40, "student_id": 4, "score": 80}
        ]
    }
]`
  },

  // 7. #1421 npv-queries
  {
    slug: 'npv-queries',
    number: 1421,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Composite Key Left Join',
        text: 'Join Queries and npv table on both id and year columns.'
      },
      {
        level: 2,
        title: 'Missing Value Defaulting',
        text: 'Queries with no matching entry in npv table must return an npv value of 0.'
      },
      {
        level: 3,
        title: 'Null Handling Function',
        text: 'select q.id, q.year, ifnull(n.npv, 0) as npv from Queries q left join npv n on q.id = n.id and q.year = n.year.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT q.id, q.year, IFNULL(n.npv, 0) AS npv\nFROM Queries q\nLEFT JOIN NPV n ON q.id = n.id AND q.year = n.year;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(Q + N)',
      space: 'O(Q)',
      variables: ['Q: query records count', 'N: records in NPV table'],
      notes: 'Composite hash join matches (id, year) in linear time.',
      whyNaiveFails: 'Inner join omits queries that have no historical NPV record.',
      spaceTimeTradeoff: 'Left join preserves all query records with zero as default.',
      interviewerExpectation: 'Multi-column left outer join paired with IFNULL or COALESCE.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT q.id, q.year, IFNULL(n.npv, 0) AS npv
FROM Queries q
LEFT JOIN NPV n ON q.id = n.id AND q.year = n.year;`,
        approach: 'Composite Left Join with IFNULL',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT q.id, q.year, COALESCE(n.npv, 0) AS npv
FROM Queries q
LEFT JOIN NPV n ON q.id = n.id AND q.year = n.year;`,
        approach: 'PostgreSQL Composite Left Join with COALESCE',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def npv_queries(npv: pd.DataFrame, queries: pd.DataFrame) -> pd.DataFrame:
    merged = pd.merge(queries, npv, on=['id', 'year'], how='left')
    merged['npv'] = merged['npv'].fillna(0).astype(int)
    return merged[['id', 'year', 'npv']]`,
        approach: 'Pandas Multi-Column Left Merge and Fillna',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE NPV (id int, year int, npv int);
CREATE TABLE Queries (id int, year int);`,
    referenceSql: `SELECT q.id, q.year, IFNULL(n.npv, 0) AS npv FROM Queries q LEFT JOIN NPV n ON q.id = n.id AND q.year = n.year;`,
    generatorPy: `cases = [
    {
        "NPV": [
            {"id": 1, "year": 2018, "npv": 100},
            {"id": 7, "year": 2020, "npv": 30},
            {"id": 13, "year": 2019, "npv": 40},
            {"id": 1, "year": 2019, "npv": 113},
            {"id": 2, "year": 2008, "npv": 121},
            {"id": 3, "year": 2009, "npv": 12},
            {"id": 11, "year": 2020, "npv": 99},
            {"id": 7, "year": 2019, "npv": 0}
        ],
        "Queries": [
            {"id": 1, "year": 2019},
            {"id": 2, "year": 2008},
            {"id": 3, "year": 2009},
            {"id": 7, "year": 2018},
            {"id": 7, "year": 2019},
            {"id": 7, "year": 2020},
            {"id": 13, "year": 2019}
        ]
    }
]`
  },

  // 8. #1435 create-a-session-bar-chart
  {
    slug: 'create-a-session-bar-chart',
    number: 1435,
    category: 'Database',
    patterns: ['conditional-pivot'],
    hints: [
      {
        level: 1,
        title: 'Complete Bin Listing',
        text: 'All 4 bins: "[0-5>", "[5-10>", "[10-15>", and "15 or more" must appear even when count is 0.'
      },
      {
        level: 2,
        title: 'Duration Conversion',
        text: 'Calculate duration in minutes using duration / 60.'
      },
      {
        level: 3,
        title: 'Bin Union or Conditional Aggregation',
        text: 'Union the four static bins and left join session duration counts matching each range.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT \'[0-5>\' AS bin, SUM(duration / 60 < 5) AS total FROM Sessions\nUNION\nSELECT \'[5-10>\' AS bin, SUM(duration / 60 >= 5 AND duration / 60 < 10) AS total FROM Sessions\nUNION\nSELECT \'[10-15>\' AS bin, SUM(duration / 60 >= 10 AND duration / 60 < 15) AS total FROM Sessions\nUNION\nSELECT \'15 or more\' AS bin, SUM(duration / 60 >= 15) AS total FROM Sessions;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: records in Sessions table'],
      notes: 'Scanning the Sessions table 4 times or in a single union pass executes in linear time with 4 constant output rows.',
      whyNaiveFails: 'Grouping by a calculated CASE statement omits empty bins where no sessions fall into that bracket.',
      spaceTimeTradeoff: 'Unioning predefined literal bins guarantees output completeness regardless of data distribution.',
      interviewerExpectation: 'Ensuring non-existent bins are represented with 0 counts using UNION of literals.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT '[0-5>' AS bin, SUM(duration / 60 < 5) AS total FROM Sessions
UNION
SELECT '[5-10>' AS bin, SUM(duration / 60 >= 5 AND duration / 60 < 10) AS total FROM Sessions
UNION
SELECT '[10-15>' AS bin, SUM(duration / 60 >= 10 AND duration / 60 < 15) AS total FROM Sessions
UNION
SELECT '15 or more' AS bin, SUM(duration / 60 >= 15) AS total FROM Sessions;`,
        approach: 'Static Bin Union with Boolean Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT '[0-5>' AS bin, COALESCE(SUM(CASE WHEN duration / 60.0 < 5 THEN 1 ELSE 0 END), 0) AS total FROM Sessions
UNION ALL
SELECT '[5-10>' AS bin, COALESCE(SUM(CASE WHEN duration / 60.0 >= 5 AND duration / 60.0 < 10 THEN 1 ELSE 0 END), 0) AS total FROM Sessions
UNION ALL
SELECT '[10-15>' AS bin, COALESCE(SUM(CASE WHEN duration / 60.0 >= 10 AND duration / 60.0 < 15 THEN 1 ELSE 0 END), 0) AS total FROM Sessions
UNION ALL
SELECT '15 or more' AS bin, COALESCE(SUM(CASE WHEN duration / 60.0 >= 15 THEN 1 ELSE 0 END), 0) AS total FROM Sessions;`,
        approach: 'PostgreSQL Union of Bin Aggregations',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def create_bar_chart(sessions: pd.DataFrame) -> pd.DataFrame:
    b1 = ((sessions['duration'] / 60) < 5).sum()
    b2 = (((sessions['duration'] / 60) >= 5) & ((sessions['duration'] / 60) < 10)).sum()
    b3 = (((sessions['duration'] / 60) >= 10) & ((sessions['duration'] / 60) < 15)).sum()
    b4 = ((sessions['duration'] / 60) >= 15).sum()
    return pd.DataFrame([
        {'bin': '[0-5>', 'total': b1},
        {'bin': '[5-10>', 'total': b2},
        {'bin': '[10-15>', 'total': b3},
        {'bin': '15 or more', 'total': b4}
    ])`,
        approach: 'Pandas Vectorized Boolean Sum per Bin',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Sessions (session_id int, duration int);`,
    referenceSql: `SELECT '[0-5>' AS bin, SUM(duration / 60 < 5) AS total FROM Sessions UNION SELECT '[5-10>' AS bin, SUM(duration / 60 >= 5 AND duration / 60 < 10) AS total FROM Sessions UNION SELECT '[10-15>' AS bin, SUM(duration / 60 >= 10 AND duration / 60 < 15) AS total FROM Sessions UNION SELECT '15 or more' AS bin, SUM(duration / 60 >= 15) AS total FROM Sessions;`,
    generatorPy: `cases = [
    {
        "Sessions": [
            {"session_id": 1, "duration": 30},
            {"session_id": 2, "duration": 199},
            {"session_id": 3, "duration": 299},
            {"session_id": 4, "duration": 580},
            {"session_id": 5, "duration": 1000}
        ]
    }
]`
  },

  // 9. #1440 evaluate-boolean-expression
  {
    slug: 'evaluate-boolean-expression',
    number: 1440,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Two-Variable Join Resolution',
        text: 'Join Expressions twice with Variables: once for left_operand and once for right_operand.'
      },
      {
        level: 2,
        title: 'Conditional Operator Evaluation',
        text: 'Use a conditional case expression inspecting operator against ">", "<", and "=".'
      },
      {
        level: 3,
        title: 'Output Literal Generation',
        text: 'Return "true" when the condition holds and "false" otherwise.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT e.left_operand, e.operator, e.right_operand,\n       CASE\n           WHEN e.operator = \'>\' AND v1.value > v2.value THEN \'true\'\n           WHEN e.operator = \'<\' AND v1.value < v2.value THEN \'true\'\n           WHEN e.operator = \'=\' AND v1.value = v2.value THEN \'true\'\n           ELSE \'false\'\n       END AS value\nFROM Expressions e\nJOIN Variables v1 ON e.left_operand = v1.name\nJOIN Variables v2 ON e.right_operand = v2.name;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(E)',
      space: 'O(E)',
      variables: ['E: number of expressions'],
      notes: 'Joining variables via hash lookup and evaluating CASE condition executes in linear time.',
      whyNaiveFails: 'Correlated scalar subqueries for each operand require repetitive index lookups.',
      spaceTimeTradeoff: 'Dual joins resolve operand values in a single tabular scan.',
      interviewerExpectation: 'Self-aliased joins mapping operands paired with exhaustive CASE evaluation.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT e.left_operand, e.operator, e.right_operand,
       CASE
           WHEN e.operator = '>' AND v1.value > v2.value THEN 'true'
           WHEN e.operator = '<' AND v1.value < v2.value THEN 'true'
           WHEN e.operator = '=' AND v1.value = v2.value THEN 'true'
           ELSE 'false'
       END AS value
FROM Expressions e
JOIN Variables v1 ON e.left_operand = v1.name
JOIN Variables v2 ON e.right_operand = v2.name;`,
        approach: 'Dual Variable Join with Evaluated CASE',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT e.left_operand, e.operator, e.right_operand,
       CASE
           WHEN e.operator = '>' AND v1.value > v2.value THEN 'true'
           WHEN e.operator = '<' AND v1.value < v2.value THEN 'true'
           WHEN e.operator = '=' AND v1.value = v2.value THEN 'true'
           ELSE 'false'
       END AS value
FROM Expressions e
JOIN Variables v1 ON e.left_operand = v1.name
JOIN Variables v2 ON e.right_operand = v2.name;`,
        approach: 'PostgreSQL Dual Variable Join and CASE Expression',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def eval_expression(variables: pd.DataFrame, expressions: pd.DataFrame) -> pd.DataFrame:
    m1 = pd.merge(expressions, variables, left_on='left_operand', right_on='name', how='left')
    m2 = pd.merge(m1, variables, left_on='right_operand', right_on='name', how='left', suffixes=('_l', '_r'))
    def evaluate(row):
        op = row['operator']
        vl = row['value_l']
        vr = row['value_r']
        if op == '>' and vl > vr: return 'true'
        if op == '<' and vl < vr: return 'true'
        if op == '=' and vl == vr: return 'true'
        return 'false'
    m2['value'] = m2.apply(evaluate, axis=1)
    return m2[['left_operand', 'operator', 'right_operand', 'value']]`,
        approach: 'Pandas Dual Merge and Rowwise Comparison',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Variables (name varchar(3), value int);
CREATE TABLE Expressions (left_operand varchar(3), operator varchar(1), right_operand varchar(3));`,
    referenceSql: `SELECT e.left_operand, e.operator, e.right_operand, CASE WHEN e.operator = '>' AND v1.value > v2.value THEN 'true' WHEN e.operator = '<' AND v1.value < v2.value THEN 'true' WHEN e.operator = '=' AND v1.value = v2.value THEN 'true' ELSE 'false' END AS value FROM Expressions e JOIN Variables v1 ON e.left_operand = v1.name JOIN Variables v2 ON e.right_operand = v2.name;`,
    generatorPy: `cases = [
    {
        "Variables": [
            {"name": "x", "value": 66},
            {"name": "y", "value": 77}
        ],
        "Expressions": [
            {"left_operand": "x", "operator": ">", "right_operand": "y"},
            {"left_operand": "x", "operator": "<", "right_operand": "y"},
            {"left_operand": "x", "operator": "=", "right_operand": "y"},
            {"left_operand": "y", "operator": ">", "right_operand": "x"},
            {"left_operand": "y", "operator": "<", "right_operand": "x"},
            {"left_operand": "x", "operator": "=", "right_operand": "x"}
        ]
    }
]`
  },

  // 10. #1445 apples-oranges
  {
    slug: 'apples-oranges',
    number: 1445,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Fruit Difference Sign Convention',
        text: 'The problem requires apples sold minus oranges sold for each sale date.'
      },
      {
        level: 2,
        title: 'Conditional Summation by Date',
        text: 'Calculate sum(case when fruit = "apples" then sold_num else -sold_num end) grouped by sale_date.'
      },
      {
        level: 3,
        title: 'Chronological Output Sort',
        text: 'order by sale_date to present results sequentially.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT sale_date,\n       SUM(CASE WHEN fruit = \'apples\' THEN sold_num ELSE -sold_num END) AS diff\nFROM Sales\nGROUP BY sale_date\nORDER BY sale_date;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log D)',
      space: 'O(D)',
      variables: ['N: total sales records', 'D: distinct sale dates'],
      notes: 'Group-by aggregation over sale_date takes linear time followed by sorting distinct dates.',
      whyNaiveFails: 'Self-joining Sales on sale_date with fruit equality requires two table passes and handles missing fruit types awkwardly.',
      spaceTimeTradeoff: 'Signed CASE summation groups all fruits for a date in a single table pass.',
      interviewerExpectation: 'Conditional aggregation mapping categories to positive and negative values.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT sale_date,
       SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END) AS diff
FROM Sales
GROUP BY sale_date
ORDER BY sale_date;`,
        approach: 'Signed Difference Group Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT sale_date,
       SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END) AS diff
FROM Sales
GROUP BY sale_date
ORDER BY sale_date;`,
        approach: 'PostgreSQL Conditional Aggregation Difference',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def apples_oranges(sales: pd.DataFrame) -> pd.DataFrame:
    sales['signed_sold'] = sales.apply(lambda r: r['sold_num'] if r['fruit'] == 'apples' else -r['sold_num'], axis=1)
    res = sales.groupby('sale_date')['signed_sold'].sum().reset_index()
    res.rename(columns={'signed_sold': 'diff'}, inplace=True)
    return res.sort_values(by='sale_date')`,
        approach: 'Pandas Signed Sum per Sale Date',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Sales (sale_date date, fruit varchar(10), sold_num int);`,
    referenceSql: `SELECT sale_date, SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END) AS diff FROM Sales GROUP BY sale_date ORDER BY sale_date;`,
    generatorPy: `cases = [
    {
        "Sales": [
            {"sale_date": "2020-05-01", "fruit": "apples", "sold_num": 10},
            {"sale_date": "2020-05-01", "fruit": "oranges", "sold_num": 8},
            {"sale_date": "2020-05-02", "fruit": "apples", "sold_num": 15},
            {"sale_date": "2020-05-02", "fruit": "oranges", "sold_num": 15},
            {"sale_date": "2020-05-03", "fruit": "apples", "sold_num": 20},
            {"sale_date": "2020-05-03", "fruit": "oranges", "sold_num": 0},
            {"sale_date": "2020-05-04", "fruit": "apples", "sold_num": 15},
            {"sale_date": "2020-05-04", "fruit": "oranges", "sold_num": 16}
        ]
    }
]`
  },

  // 11. #1454 active-users
  {
    slug: 'active-users',
    number: 1454,
    category: 'Database',
    patterns: ['gaps-and-islands'],
    hints: [
      {
        level: 1,
        title: 'Distinct User Login Days',
        text: 'A user may log in multiple times in a single day. Deduplicate to distinct (id, login_date) pairs first.'
      },
      {
        level: 2,
        title: 'Gaps and Islands Date Delta',
        text: 'date_sub(login_date, interval dense_rank() over (partition by id order by login_date) day) yields a constant island date for consecutive sequences.'
      },
      {
        level: 3,
        title: 'Minimum Streak Threshold',
        text: 'Group by id and the constant island date having count(*) >= 5 to filter active users.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH DistinctLogins AS (\n    SELECT DISTINCT id, login_date\n    FROM Logins\n),\nRankedLogins AS (\n    SELECT id, login_date,\n           DATE_SUB(login_date, INTERVAL DENSE_RANK() OVER (PARTITION BY id ORDER BY login_date) DAY) AS grp\n    FROM DistinctLogins\n),\nActiveUserIDs AS (\n    SELECT id\n    FROM RankedLogins\n    GROUP BY id, grp\n    HAVING COUNT(*) >= 5\n)\nSELECT DISTINCT a.id, a.name\nFROM Accounts a\nJOIN ActiveUserIDs au ON a.id = au.id\nORDER BY a.id;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(L log L)',
      space: 'O(L)',
      variables: ['L: number of logins'],
      notes: 'Window ranking and date subtraction group contiguous days in linear-logarithmic time.',
      whyNaiveFails: 'Five-way self-joins across consecutive dates scale poorly and fail to generalize cleanly.',
      spaceTimeTradeoff: 'DENSE_RANK() date offset groups arbitrary streak lengths in a single pass.',
      interviewerExpectation: 'Classic gaps-and-islands pattern subtracting rank offsets from dates.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH DistinctLogins AS (
    SELECT DISTINCT id, login_date
    FROM Logins
),
RankedLogins AS (
    SELECT id, login_date,
           DATE_SUB(login_date, INTERVAL DENSE_RANK() OVER (PARTITION BY id ORDER BY login_date) DAY) AS grp
    FROM DistinctLogins
),
ActiveUserIDs AS (
    SELECT id
    FROM RankedLogins
    GROUP BY id, grp
    HAVING COUNT(*) >= 5
)
SELECT DISTINCT a.id, a.name
FROM Accounts a
JOIN ActiveUserIDs au ON a.id = au.id
ORDER BY a.id;`,
        approach: 'DENSE_RANK Date Offset Gaps and Islands',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH DistinctLogins AS (
    SELECT DISTINCT id, login_date
    FROM Logins
),
RankedLogins AS (
    SELECT id, login_date,
           login_date - CAST(DENSE_RANK() OVER (PARTITION BY id ORDER BY login_date) || ' days' AS INTERVAL) AS grp
    FROM DistinctLogins
),
ActiveUserIDs AS (
    SELECT id
    FROM RankedLogins
    GROUP BY id, grp
    HAVING COUNT(*) >= 5
)
SELECT DISTINCT a.id, a.name
FROM Accounts a
JOIN ActiveUserIDs au ON a.id = au.id
ORDER BY a.id;`,
        approach: 'PostgreSQL Interval Offset Gaps and Islands',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def active_users(accounts: pd.DataFrame, logins: pd.DataFrame) -> pd.DataFrame:
    dl = logins[['id', 'login_date']].drop_duplicates()
    dl['login_date'] = pd.to_datetime(dl['login_date'])
    dl = dl.sort_values(by=['id', 'login_date']).reset_index(drop=True)
    dl['rn'] = dl.groupby('id').cumcount()
    dl['grp'] = dl['login_date'] - pd.to_timedelta(dl['rn'], unit='D')
    counts = dl.groupby(['id', 'grp']).size().reset_index(name='streak')
    active_ids = set(counts[counts['streak'] >= 5]['id'])
    res = accounts[accounts['id'].isin(active_ids)].drop_duplicates()
    return res[['id', 'name']].sort_values(by='id')`,
        approach: 'Pandas Timedelta Cumcount Island Grouping',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Accounts (id int, name varchar(30));
CREATE TABLE Logins (id int, login_date date);`,
    referenceSql: `WITH DistinctLogins AS (SELECT DISTINCT id, login_date FROM Logins), RankedLogins AS (SELECT id, login_date, DATE_SUB(login_date, INTERVAL DENSE_RANK() OVER (PARTITION BY id ORDER BY login_date) DAY) AS grp FROM DistinctLogins), ActiveUserIDs AS (SELECT id FROM RankedLogins GROUP BY id, grp HAVING COUNT(*) >= 5) SELECT DISTINCT a.id, a.name FROM Accounts a JOIN ActiveUserIDs au ON a.id = au.id ORDER BY a.id;`,
    generatorPy: `cases = [
    {
        "Accounts": [
            {"id": 1, "name": "Winston"},
            {"id": 7, "name": "Jonathan"}
        ],
        "Logins": [
            {"id": 7, "login_date": "2020-05-30"},
            {"id": 1, "login_date": "2020-05-30"},
            {"id": 7, "login_date": "2020-05-31"},
            {"id": 7, "login_date": "2020-06-01"},
            {"id": 7, "login_date": "2020-06-02"},
            {"id": 7, "login_date": "2020-06-02"},
            {"id": 7, "login_date": "2020-06-03"},
            {"id": 1, "login_date": "2020-06-07"},
            {"id": 7, "login_date": "2020-06-10"}
        ]
    }
]`
  },

  // 12. #1459 rectangles-area
  {
    slug: 'rectangles-area',
    number: 1459,
    category: 'Database',
    patterns: ['self-join'],
    hints: [
      {
        level: 1,
        title: 'Strict ID Ordering to Avoid Duplicates',
        text: 'Join Points p1 with Points p2 on p1.id < p2.id to ensure each unordered point pair is examined exactly once.'
      },
      {
        level: 2,
        title: 'Non-Degenerate Rectangle Filter',
        text: 'A valid rectangle requires p1.x_value <> p2.x_value and p1.y_value <> p2.y_value.'
      },
      {
        level: 3,
        title: 'Area Computation and Ordering',
        text: 'Compute abs(p1.x_value - p2.x_value) * abs(p1.y_value - p2.y_value) as area, ordered by area desc, p1 asc, p2 asc.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT p1.id AS p1, p2.id AS p2,\n       ABS(p1.x_value - p2.x_value) * ABS(p1.y_value - p2.y_value) AS area\nFROM Points p1\nJOIN Points p2 ON p1.id < p2.id\n              AND p1.x_value != p2.x_value\n              AND p1.y_value != p2.y_value\nORDER BY area DESC, p1 ASC, p2 ASC;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N^2)',
      space: 'O(N^2)',
      variables: ['N: number of points in Points table'],
      notes: 'Testing all unordered pairs of points executes in quadratic time with secondary sorting.',
      whyNaiveFails: 'Full Cartesian product without id ordering creates symmetric duplicates and zero-area pairs.',
      spaceTimeTradeoff: 'Condition p1.id < p2.id halves pair comparisons and guarantees unique representation.',
      interviewerExpectation: 'Self-join with triangle condition p1.id < p2.id and non-zero dimension predicates.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT p1.id AS p1, p2.id AS p2,
       ABS(p1.x_value - p2.x_value) * ABS(p1.y_value - p2.y_value) AS area
FROM Points p1
JOIN Points p2 ON p1.id < p2.id
              AND p1.x_value != p2.x_value
              AND p1.y_value != p2.y_value
ORDER BY area DESC, p1 ASC, p2 ASC;`,
        approach: 'Self-Join with Triangular ID Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT p1.id AS p1, p2.id AS p2,
       ABS(p1.x_value - p2.x_value) * ABS(p1.y_value - p2.y_value) AS area
FROM Points p1
JOIN Points p2 ON p1.id < p2.id
              AND p1.x_value != p2.x_value
              AND p1.y_value != p2.y_value
ORDER BY area DESC, p1 ASC, p2 ASC;`,
        approach: 'PostgreSQL Self-Join Area Calculation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def rectangles_area(points: pd.DataFrame) -> pd.DataFrame:
    merged = pd.merge(points, points, how='cross', suffixes=('_1', '_2'))
    filtered = merged[(merged['id_1'] < merged['id_2']) &
                      (merged['x_value_1'] != merged['x_value_2']) &
                      (merged['y_value_1'] != merged['y_value_2'])].copy()
    filtered['area'] = (filtered['x_value_1'] - filtered['x_value_2']).abs() * (filtered['y_value_1'] - filtered['y_value_2']).abs()
    filtered.rename(columns={'id_1': 'p1', 'id_2': 'p2'}, inplace=True)
    return filtered[['p1', 'p2', 'area']].sort_values(by=['area', 'p1', 'p2'], ascending=[False, True, True])`,
        approach: 'Pandas Cross Join and Diagonal Filtration',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Points (id int, x_value int, y_value int);`,
    referenceSql: `SELECT p1.id AS p1, p2.id AS p2, ABS(p1.x_value - p2.x_value) * ABS(p1.y_value - p2.y_value) AS area FROM Points p1 JOIN Points p2 ON p1.id < p2.id AND p1.x_value != p2.x_value AND p1.y_value != p2.y_value ORDER BY area DESC, p1 ASC, p2 ASC;`,
    generatorPy: `cases = [
    {
        "Points": [
            {"id": 1, "x_value": 2, "y_value": 7},
            {"id": 2, "x_value": 4, "y_value": 8},
            {"id": 3, "x_value": 2, "y_value": 10}
        ]
    }
]`
  },

  // 13. #1468 calculate-salaries
  {
    slug: 'calculate-salaries',
    number: 1468,
    category: 'Database',
    patterns: ['window-ranking'],
    hints: [
      {
        level: 1,
        title: 'Company Max Salary Partition',
        text: 'Compute max(salary) over (partition by company_id) to establish the tax tier for each company.'
      },
      {
        level: 2,
        title: 'Tiered Tax Calculation',
        text: 'If max salary < 1000 tax is 0%; if between 1000 and 10000 tax is 24%; if > 10000 tax is 49%.'
      },
      {
        level: 3,
        title: 'Rounding Net Salary',
        text: 'Compute round(salary * (1 - tax_rate)) as the post-tax salary for each employee.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH CompanyMax AS (\n    SELECT company_id, employee_id, employee_name, salary,\n           MAX(salary) OVER (PARTITION BY company_id) AS max_sal\n    FROM Salaries\n)\nSELECT company_id, employee_id, employee_name,\n       ROUND(salary * (1 - CASE\n           WHEN max_sal < 1000 THEN 0.00\n           WHEN max_sal <= 10000 THEN 0.24\n           ELSE 0.49\n       END)) AS salary\nFROM CompanyMax;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of employee records in Salaries'],
      notes: 'Window aggregation partitions employees by company_id in linear time followed by scalar math.',
      whyNaiveFails: 'Correlated subqueries to find company max salary repeat table scans for every individual employee.',
      spaceTimeTradeoff: 'Window MAX computes company ceilings without reducing row cardinality.',
      interviewerExpectation: 'Window function MAX() OVER (PARTITION BY company_id) combined with CASE tax arithmetic.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH CompanyMax AS (
    SELECT company_id, employee_id, employee_name, salary,
           MAX(salary) OVER (PARTITION BY company_id) AS max_sal
    FROM Salaries
)
SELECT company_id, employee_id, employee_name,
       ROUND(salary * (1 - CASE
           WHEN max_sal < 1000 THEN 0.00
           WHEN max_sal <= 10000 THEN 0.24
           ELSE 0.49
       END)) AS salary
FROM CompanyMax;`,
        approach: 'Window MAX Partition with Tiered Tax Rounding',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH CompanyMax AS (
    SELECT company_id, employee_id, employee_name, salary,
           MAX(salary) OVER (PARTITION BY company_id) AS max_sal
    FROM Salaries
)
SELECT company_id, employee_id, employee_name,
       ROUND(salary * (1 - CASE
           WHEN max_sal < 1000 THEN 0.00
           WHEN max_sal <= 10000 THEN 0.24
           ELSE 0.49
       END)) AS salary
FROM CompanyMax;`,
        approach: 'PostgreSQL Window Function Salary Tax Adjustment',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def calculate_salaries(salaries: pd.DataFrame) -> pd.DataFrame:
    salaries['max_sal'] = salaries.groupby('company_id')['salary'].transform('max')
    def get_tax(max_s):
        if max_s < 1000: return 0.0
        if max_s <= 10000: return 0.24
        return 0.49
    salaries['tax'] = salaries['max_sal'].apply(get_tax)
    salaries['salary'] = (salaries['salary'] * (1 - salaries['tax'])).round()
    return salaries[['company_id', 'employee_id', 'employee_name', 'salary']]`,
        approach: 'Pandas Transform Max and Round',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Salaries (company_id int, employee_id int, employee_name varchar(30), salary int);`,
    referenceSql: `WITH CompanyMax AS (SELECT company_id, employee_id, employee_name, salary, MAX(salary) OVER (PARTITION BY company_id) AS max_sal FROM Salaries) SELECT company_id, employee_id, employee_name, ROUND(salary * (1 - CASE WHEN max_sal < 1000 THEN 0.00 WHEN max_sal <= 10000 THEN 0.24 ELSE 0.49 END)) AS salary FROM CompanyMax;`,
    generatorPy: `cases = [
    {
        "Salaries": [
            {"company_id": 1, "employee_id": 1, "employee_name": "Tony", "salary": 2000},
            {"company_id": 1, "employee_id": 2, "employee_name": "Pronub", "salary": 21300},
            {"company_id": 1, "employee_id": 3, "employee_name": "Tyrone", "salary": 7000},
            {"company_id": 2, "employee_id": 1, "employee_name": "Pam", "salary": 300},
            {"company_id": 2, "employee_id": 7, "employee_name": "Bassem", "salary": 450},
            {"company_id": 2, "employee_id": 9, "employee_name": "Hermione", "salary": 700},
            {"company_id": 3, "employee_id": 7, "employee_name": "Bocaben", "salary": 100},
            {"company_id": 3, "employee_id": 2, "employee_name": "Ognjen", "salary": 2200},
            {"company_id": 3, "employee_id": 13, "employee_name": "Nyancat", "salary": 3300},
            {"company_id": 3, "employee_id": 15, "employee_name": "Morninngcat", "salary": 7777}
        ]
    }
]`
  },

  // 14. #1479 sales-by-day-of-the-week
  {
    slug: 'sales-by-day-of-the-week',
    number: 1479,
    category: 'Database',
    patterns: ['conditional-pivot'],
    hints: [
      {
        level: 1,
        title: 'Include All Item Categories',
        text: 'Every item category from Items must appear in the final report even if it experienced zero orders.'
      },
      {
        level: 2,
        title: 'Day of Week Extraction',
        text: 'dayname(order_date) or dayofweek(order_date) classifies each order into Monday through Sunday.'
      },
      {
        level: 3,
        title: 'Pivot Aggregation by Category',
        text: 'Use sum(case when dayname(order_date) = "Monday" then quantity else 0 end) for each of the 7 days.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT i.item_category AS CATEGORY,\n       IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 2 THEN o.quantity ELSE 0 END), 0) AS MONDAY,\n       IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 3 THEN o.quantity ELSE 0 END), 0) AS TUESDAY,\n       IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 4 THEN o.quantity ELSE 0 END), 0) AS WEDNESDAY,\n       IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 5 THEN o.quantity ELSE 0 END), 0) AS THURSDAY,\n       IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 6 THEN o.quantity ELSE 0 END), 0) AS FRIDAY,\n       IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 7 THEN o.quantity ELSE 0 END), 0) AS SATURDAY,\n       IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 1 THEN o.quantity ELSE 0 END), 0) AS SUNDAY\nFROM Items i\nLEFT JOIN Orders o ON i.item_id = o.item_id\nGROUP BY i.item_category\nORDER BY CATEGORY;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(I + O)',
      space: 'O(C)',
      variables: ['I: items count', 'O: orders count', 'C: distinct categories'],
      notes: 'Left join followed by grouping by item_category processes all day columns in a single table pass.',
      whyNaiveFails: 'Multiple separate queries for each weekday joined together require seven separate table scans.',
      spaceTimeTradeoff: 'Conditional SUM aggregation flattens 7 days of sales into a single report row per category.',
      interviewerExpectation: 'Left outer join preserving empty categories and conditional pivot aggregation across weekdays.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT i.item_category AS CATEGORY,
       IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 2 THEN o.quantity ELSE 0 END), 0) AS MONDAY,
       IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 3 THEN o.quantity ELSE 0 END), 0) AS TUESDAY,
       IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 4 THEN o.quantity ELSE 0 END), 0) AS WEDNESDAY,
       IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 5 THEN o.quantity ELSE 0 END), 0) AS THURSDAY,
       IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 6 THEN o.quantity ELSE 0 END), 0) AS FRIDAY,
       IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 7 THEN o.quantity ELSE 0 END), 0) AS SATURDAY,
       IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 1 THEN o.quantity ELSE 0 END), 0) AS SUNDAY
FROM Items i
LEFT JOIN Orders o ON i.item_id = o.item_id
GROUP BY i.item_category
ORDER BY CATEGORY;`,
        approach: 'Left Join with Conditional Day-of-Week Pivot',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT i.item_category AS CATEGORY,
       COALESCE(SUM(CASE WHEN EXTRACT(DOW FROM o.order_date) = 1 THEN o.quantity ELSE 0 END), 0) AS MONDAY,
       COALESCE(SUM(CASE WHEN EXTRACT(DOW FROM o.order_date) = 2 THEN o.quantity ELSE 0 END), 0) AS TUESDAY,
       COALESCE(SUM(CASE WHEN EXTRACT(DOW FROM o.order_date) = 3 THEN o.quantity ELSE 0 END), 0) AS WEDNESDAY,
       COALESCE(SUM(CASE WHEN EXTRACT(DOW FROM o.order_date) = 4 THEN o.quantity ELSE 0 END), 0) AS THURSDAY,
       COALESCE(SUM(CASE WHEN EXTRACT(DOW FROM o.order_date) = 5 THEN o.quantity ELSE 0 END), 0) AS FRIDAY,
       COALESCE(SUM(CASE WHEN EXTRACT(DOW FROM o.order_date) = 6 THEN o.quantity ELSE 0 END), 0) AS SATURDAY,
       COALESCE(SUM(CASE WHEN EXTRACT(DOW FROM o.order_date) = 0 THEN o.quantity ELSE 0 END), 0) AS SUNDAY
FROM Items i
LEFT JOIN Orders o ON i.item_id = o.item_id
GROUP BY i.item_category
ORDER BY CATEGORY;`,
        approach: 'PostgreSQL EXTRACT DOW Conditional Summation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def sales_by_day(orders: pd.DataFrame, items: pd.DataFrame) -> pd.DataFrame:
    cats = sorted(items['item_category'].unique())
    merged = pd.merge(items, orders, on='item_id', how='left')
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    merged['day_name'] = pd.to_datetime(merged['order_date']).dt.day_name()
    records = []
    for cat in cats:
        sub = merged[merged['item_category'] == cat]
        rec = {'CATEGORY': cat}
        for d in days:
            qty = sub[sub['day_name'] == d]['quantity'].sum()
            rec[d.upper()] = 0 if pd.isna(qty) else int(qty)
        records.append(rec)
    return pd.DataFrame(records)`,
        approach: 'Pandas Category Pivot and Day Name Grouping',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Orders (order_id int, customer_id int, order_date date, item_id varchar(10), quantity int);
CREATE TABLE Items (item_id varchar(10), item_name varchar(30), item_category varchar(30));`,
    referenceSql: `SELECT i.item_category AS CATEGORY, IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 2 THEN o.quantity ELSE 0 END), 0) AS MONDAY, IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 3 THEN o.quantity ELSE 0 END), 0) AS TUESDAY, IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 4 THEN o.quantity ELSE 0 END), 0) AS WEDNESDAY, IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 5 THEN o.quantity ELSE 0 END), 0) AS THURSDAY, IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 6 THEN o.quantity ELSE 0 END), 0) AS FRIDAY, IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 7 THEN o.quantity ELSE 0 END), 0) AS SATURDAY, IFNULL(SUM(CASE WHEN DAYOFWEEK(o.order_date) = 1 THEN o.quantity ELSE 0 END), 0) AS SUNDAY FROM Items i LEFT JOIN Orders o ON i.item_id = o.item_id GROUP BY i.item_category ORDER BY CATEGORY;`,
    generatorPy: `cases = [
    {
        "Orders": [
            {"order_id": 1, "customer_id": 1, "order_date": "2020-06-01", "item_id": "1", "quantity": 10},
            {"order_id": 2, "customer_id": 1, "order_date": "2020-06-08", "item_id": "2", "quantity": 10},
            {"order_id": 3, "customer_id": 2, "order_date": "2020-06-02", "item_id": "1", "quantity": 5},
            {"order_id": 4, "customer_id": 3, "order_date": "2020-06-03", "item_id": "3", "quantity": 5},
            {"order_id": 5, "customer_id": 4, "order_date": "2020-06-04", "item_id": "4", "quantity": 1},
            {"order_id": 6, "customer_id": 4, "order_date": "2020-06-05", "item_id": "5", "quantity": 5},
            {"order_id": 7, "customer_id": 5, "order_date": "2020-06-05", "item_id": "1", "quantity": 10},
            {"order_id": 8, "customer_id": 5, "order_date": "2020-06-14", "item_id": "4", "quantity": 5},
            {"order_id": 9, "customer_id": 5, "order_date": "2020-06-21", "item_id": "3", "quantity": 5}
        ],
        "Items": [
            {"item_id": "1", "item_name": "LC Alg. Book", "item_category": "Book"},
            {"item_id": "2", "item_name": "LC DB. Book", "item_category": "Book"},
            {"item_id": "3", "item_name": "LC Smth. Book", "item_category": "Book"},
            {"item_id": "4", "item_name": "LC Phone", "item_category": "Phone"},
            {"item_id": "5", "item_name": "LC T-Shirt", "item_category": "T-shirt"}
        ]
    }
]`
  },

  // 15. #1484 group-sold-products-by-the-date
  {
    slug: 'group-sold-products-by-the-date',
    number: 1484,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Distinct Product Aggregation',
        text: 'A product may appear multiple times on the same date. Deduplicate products per sell_date.'
      },
      {
        level: 2,
        title: 'String Concatenation Aggregate',
        text: 'group_concat(distinct product order by product separator ",") in MySQL concatenates names alphabetically.'
      },
      {
        level: 3,
        title: 'Distinct Count Calculation',
        text: 'count(distinct product) as num_sold provides the unique product tally per date.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT sell_date,\n       COUNT(DISTINCT product) AS num_sold,\n       GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR \',\') AS products\nFROM Activities\nGROUP BY sell_date\nORDER BY sell_date;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log P)',
      space: 'O(N)',
      variables: ['N: records in Activities', 'P: distinct products per date'],
      notes: 'Group-by aggregation sorts distinct product names per date in linear-logarithmic time.',
      whyNaiveFails: 'Without DISTINCT in GROUP_CONCAT, duplicate sales produce redundant repetitive lists.',
      spaceTimeTradeoff: 'In-engine string concatenation assembles CSV output directly without application-level overhead.',
      interviewerExpectation: 'GROUP_CONCAT with DISTINCT and ORDER BY sorting inside the aggregate function.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT sell_date,
       COUNT(DISTINCT product) AS num_sold,
       GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',') AS products
FROM Activities
GROUP BY sell_date
ORDER BY sell_date;`,
        approach: 'GROUP_CONCAT with Distinct Product Sort',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT sell_date,
       COUNT(DISTINCT product) AS num_sold,
       STRING_AGG(DISTINCT product, ',' ORDER BY product) AS products
FROM Activities
GROUP BY sell_date
ORDER BY sell_date;`,
        approach: 'PostgreSQL STRING_AGG Distinct',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def categorize_products(activities: pd.DataFrame) -> pd.DataFrame:
    grouped = activities.groupby('sell_date')['product'].agg(
        num_sold=lambda s: len(set(s)),
        products=lambda s: ','.join(sorted(set(s)))
    ).reset_index()
    return grouped.sort_values(by='sell_date')`,
        approach: 'Pandas Groupby Agg with Sorted Set Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Activities (sell_date date, product varchar(20));`,
    referenceSql: `SELECT sell_date, COUNT(DISTINCT product) AS num_sold, GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',') AS products FROM Activities GROUP BY sell_date ORDER BY sell_date;`,
    generatorPy: `cases = [
    {
        "Activities": [
            {"sell_date": "2020-05-30", "product": "Headphones"},
            {"sell_date": "2020-06-01", "product": "Pencil"},
            {"sell_date": "2020-06-02", "product": "Mask"},
            {"sell_date": "2020-05-30", "product": "Basketball"},
            {"sell_date": "2020-06-01", "product": "Bible"},
            {"sell_date": "2020-06-02", "product": "Mask"},
            {"sell_date": "2020-05-30", "product": "T-Shirt"}
        ]
    }
]`
  },

  // 16. #1495 friendly-movies-streamed-last-month
  {
    slug: 'friendly-movies-streamed-last-month',
    number: 1495,
    category: 'Database',
    patterns: ['date-time'],
    hints: [
      {
        level: 1,
        title: 'June 2020 Date Range',
        text: 'The reporting timeframe covers June 2020: program_date between "2020-06-01" and "2020-06-30".'
      },
      {
        level: 2,
        title: 'Child-Friendly Movie Criteria',
        text: 'Join TVProgram and Content on content_id, filtering for Kids_content = "Y" and content_type = "Movies".'
      },
      {
        level: 3,
        title: 'Distinct Movie Title Output',
        text: 'Apply select distinct title to eliminate duplicate airings of the same movie.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT DISTINCT c.title\nFROM TVProgram t\nJOIN Content c ON t.content_id = c.content_id\nWHERE c.Kids_content = \'Y\'\n  AND c.content_type = \'Movies\'\n  AND t.program_date >= \'2020-06-01\'\n  AND t.program_date < \'2020-07-01\';\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(T + C)',
      space: 'O(M)',
      variables: ['T: program records', 'C: content items', 'M: distinct movie titles'],
      notes: 'Inner join filtered on indexed dates and category predicates executes in linear time.',
      whyNaiveFails: 'Scanning dates with string conversions or year/month functions prevents index usage.',
      spaceTimeTradeoff: 'Half-open date range [2020-06-01, 2020-07-01) leverages B-tree indexes efficiently.',
      interviewerExpectation: 'Distinct selection over equijoin with index-friendly date interval filtering.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT DISTINCT c.title
FROM TVProgram t
JOIN Content c ON t.content_id = c.content_id
WHERE c.Kids_content = 'Y'
  AND c.content_type = 'Movies'
  AND t.program_date >= '2020-06-01'
  AND t.program_date < '2020-07-01';`,
        approach: 'Equijoin with Half-Open Date Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT DISTINCT c.title
FROM TVProgram t
JOIN Content c ON t.content_id = c.content_id
WHERE c.Kids_content = 'Y'
  AND c.content_type = 'Movies'
  AND t.program_date >= '2020-06-01'
  AND t.program_date < '2020-07-01';`,
        approach: 'PostgreSQL Filtered Inner Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def friendly_movies(tv_program: pd.DataFrame, content: pd.DataFrame) -> pd.DataFrame:
    tv_program['program_date'] = pd.to_datetime(tv_program['program_date'])
    june = tv_program[(tv_program['program_date'] >= '2020-06-01') & (tv_program['program_date'] < '2020-07-01')]
    merged = pd.merge(june, content, on='content_id')
    filtered = merged[(merged['Kids_content'] == 'Y') & (merged['content_type'] == 'Movies')]
    return filtered[['title']].drop_duplicates()`,
        approach: 'Pandas Datetime Mask and Merge',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE TVProgram (program_date date, content_id int, channel varchar(30));
CREATE TABLE Content (content_id int, title varchar(30), Kids_content varchar(1), content_type varchar(30));`,
    referenceSql: `SELECT DISTINCT c.title FROM TVProgram t JOIN Content c ON t.content_id = c.content_id WHERE c.Kids_content = 'Y' AND c.content_type = 'Movies' AND t.program_date >= '2020-06-01' AND t.program_date < '2020-07-01';`,
    generatorPy: `cases = [
    {
        "TVProgram": [
            {"program_date": "2020-06-10", "content_id": 1, "channel": "LC-Channel"},
            {"program_date": "2020-05-11", "content_id": 2, "channel": "LC-Channel"},
            {"program_date": "2020-06-18", "content_id": 3, "channel": "Disney Ch"},
            {"program_date": "2020-07-15", "content_id": 4, "channel": "Disney Ch"},
            {"program_date": "2020-06-18", "content_id": 4, "channel": "Disney Ch"},
            {"program_date": "2020-07-15", "content_id": 5, "channel": "Disney Ch"}
        ],
        "Content": [
            {"content_id": 1, "title": "Leetcode Movie", "Kids_content": "Y", "content_type": "Movies"},
            {"content_id": 2, "title": "Alg. for Kids", "Kids_content": "Y", "content_type": "Series"},
            {"content_id": 3, "title": "Database Movie", "Kids_content": "n", "content_type": "Movies"},
            {"content_id": 4, "title": "Aladdin", "Kids_content": "Y", "content_type": "Movies"},
            {"content_id": 5, "title": "Cinderella", "Kids_content": "Y", "content_type": "Movies"}
        ]
    }
]`
  }
];
