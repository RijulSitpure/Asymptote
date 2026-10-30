import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Problem definitions for Batch 20 Database (10 problems: #1501 - #1571)
export const batch20Db = [
  // 1. #1501 countries-you-can-safely-invest-in
  {
    slug: 'countries-you-can-safely-invest-in',
    number: 1501,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Bidirectional Call Durations',
        text: 'Every telecommunication call associates its duration with both the caller and the callee.'
      },
      {
        level: 2,
        title: 'Unpivoting Call Records',
        text: 'combine caller_id with callee_id using union all to attribute each duration to both participants.'
      },
      {
        level: 3,
        title: 'Comparing Country Average Against Global Average',
        text: 'join the unpivoted calls with Person and Country on the three-digit country code prefix. filter in having where average duration exceeds the global average duration.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT c.name AS country\nFROM Person p\nJOIN Country c ON SUBSTRING(p.phone_number, 1, 3) = c.country_code\nJOIN (\n    SELECT caller_id AS person_id, duration FROM Calls\n    UNION ALL\n    SELECT callee_id AS person_id, duration FROM Calls\n) call_records ON p.id = call_records.person_id\nGROUP BY c.name\nHAVING AVG(call_records.duration) > (SELECT AVG(duration) FROM Calls);\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(C + P)',
      space: 'O(C + P)',
      variables: ['C: rows in Calls', 'P: rows in Person'],
      notes: 'Unpivots 2C call participant records and performs indexed hash joins across person and country entries.',
      whyNaiveFails: 'Associating calls only with the caller ignores the bidirectional nature of call durations.',
      spaceTimeTradeoff: 'Union all avoids duplicate removal overhead while preserving both participant endpoints.',
      interviewerExpectation: 'Unpivoting bidirectional phone call records and evaluating group averages against a scalar subquery.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT c.name AS country
FROM Person p
JOIN Country c ON SUBSTRING(p.phone_number, 1, 3) = c.country_code
JOIN (
    SELECT caller_id AS person_id, duration FROM Calls
    UNION ALL
    SELECT callee_id AS person_id, duration FROM Calls
) call_records ON p.id = call_records.person_id
GROUP BY c.name
HAVING AVG(call_records.duration) > (SELECT AVG(duration) FROM Calls);`,
        approach: 'Unpivoting Call Participants with Substring Country Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT c.name AS country
FROM Person p
JOIN Country c ON SUBSTRING(p.phone_number FROM 1 FOR 3) = c.country_code
JOIN (
    SELECT caller_id AS person_id, duration FROM Calls
    UNION ALL
    SELECT callee_id AS person_id, duration FROM Calls
) call_records ON p.id = call_records.person_id
GROUP BY c.name
HAVING AVG(call_records.duration) > (SELECT AVG(duration) FROM Calls);`,
        approach: 'PostgreSQL Substring and Union All Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def find_safe_countries(person: pd.DataFrame, country: pd.DataFrame, calls: pd.DataFrame) -> pd.DataFrame:
    if calls.empty:
        return pd.DataFrame({'country': []})
    global_avg = calls['duration'].mean()
    c1 = calls[['caller_id', 'duration']].rename(columns={'caller_id': 'person_id'})
    c2 = calls[['callee_id', 'duration']].rename(columns={'callee_id': 'person_id'})
    all_calls = pd.concat([c1, c2], ignore_index=True)
    person['country_code'] = person['phone_number'].str.slice(0, 3)
    merged = all_calls.merge(person, left_on='person_id', right_on='id')
    merged = merged.merge(country, on='country_code')
    country_avg = merged.groupby('name_y')['duration'].mean().reset_index()
    res = country_avg[country_avg['duration'] > global_avg]
    return res[['name_y']].rename(columns={'name_y': 'country'})`,
        approach: 'Pandas Concat and Double Merge Groupby',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Person (id int, name varchar(15), phone_number varchar(11));
CREATE TABLE Country (name varchar(15), country_code varchar(3));
CREATE TABLE Calls (caller_id int, callee_id int, duration int);`,
    referenceSql: `SELECT c.name AS country FROM Person p JOIN Country c ON SUBSTRING(p.phone_number, 1, 3) = c.country_code JOIN (SELECT caller_id AS person_id, duration FROM Calls UNION ALL SELECT callee_id AS person_id, duration FROM Calls) call_records ON p.id = call_records.person_id GROUP BY c.name HAVING AVG(call_records.duration) > (SELECT AVG(duration) FROM Calls);`,
    generatorPy: `cases = [
    {
        "Person": [
            {"id": 3, "name": "Ahmet", "phone_number": "003-8888888"},
            {"id": 11, "name": "Yosef", "phone_number": "004-9999999"},
            {"id": 1, "name": "Rachel", "phone_number": "001-1234567"},
            {"id": 2, "name": "Monika", "phone_number": "001-7654321"},
            {"id": 7, "name": "Phileas", "phone_number": "002-1234567"}
        ],
        "Country": [
            {"name": "USA", "country_code": "001"},
            {"name": "Peru", "country_code": "002"},
            {"name": "Turkey", "country_code": "003"},
            {"name": "Israel", "country_code": "004"}
        ],
        "Calls": [
            {"caller_id": 1, "callee_id": 2, "duration": 59},
            {"caller_id": 3, "callee_id": 11, "duration": 102},
            {"caller_id": 11, "callee_id": 7, "duration": 330},
            {"caller_id": 7, "callee_id": 3, "duration": 100}
        ]
    }
]`
  },

  // 2. #1511 customer-order-frequency
  {
    slug: 'customer-order-frequency',
    number: 1511,
    category: 'Database',
    patterns: ['having-filter'],
    hints: [
      {
        level: 1,
        title: 'Joining Orders with Products and Customers',
        text: 'Join Orders with Product to compute the spent revenue for each purchased quantity, and link with Customers.'
      },
      {
        level: 2,
        title: 'Conditional Monthly Spending Aggregation',
        text: 'use conditional case statements inside sum to aggregate spend separately for June 2020 and July 2020.'
      },
      {
        level: 3,
        title: 'Filtering Customer Cohorts',
        text: 'group by customer_id and name. filter in having where both June spend is at least 100 and July spend is at least 100.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT c.customer_id, c.name\nFROM Customers c\nJOIN Orders o ON c.customer_id = o.customer_id\nJOIN Product p ON o.product_id = p.product_id\nGROUP BY c.customer_id, c.name\nHAVING SUM(CASE WHEN o.order_date >= \'2020-06-01\' AND o.order_date <= \'2020-06-30\' THEN o.quantity * p.price ELSE 0 END) >= 100\n   AND SUM(CASE WHEN o.order_date >= \'2020-07-01\' AND o.order_date <= \'2020-07-31\' THEN o.quantity * p.price ELSE 0 END) >= 100;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(O + C + P)',
      space: 'O(C)',
      variables: ['O: number of orders', 'C: customers', 'P: products'],
      notes: 'Single pass join and group by aggregation over orders evaluating conditional sums.',
      whyNaiveFails: 'Separate queries for June and July require subquery joins or intersections when conditional aggregation resolves in one pass.',
      spaceTimeTradeoff: 'Conditional summation inside having avoids materializing intermediate tables.',
      interviewerExpectation: 'Conditional summation inside having clause over calendar intervals.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT c.customer_id, c.name
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
JOIN Product p ON o.product_id = p.product_id
GROUP BY c.customer_id, c.name
HAVING SUM(CASE WHEN o.order_date >= '2020-06-01' AND o.order_date <= '2020-06-30' THEN o.quantity * p.price ELSE 0 END) >= 100
   AND SUM(CASE WHEN o.order_date >= '2020-07-01' AND o.order_date <= '2020-07-31' THEN o.quantity * p.price ELSE 0 END) >= 100;`,
        approach: 'Conditional Summation in Having Clause',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT c.customer_id, c.name
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
JOIN Product p ON o.product_id = p.product_id
GROUP BY c.customer_id, c.name
HAVING SUM(CASE WHEN o.order_date >= '2020-06-01' AND o.order_date <= '2020-06-30' THEN o.quantity * p.price ELSE 0 END) >= 100
   AND SUM(CASE WHEN o.order_date >= '2020-07-01' AND o.order_date <= '2020-07-31' THEN o.quantity * p.price ELSE 0 END) >= 100;`,
        approach: 'PostgreSQL Conditional Having Aggregate',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def customer_order_frequency(customers: pd.DataFrame, product: pd.DataFrame, orders: pd.DataFrame) -> pd.DataFrame:
    df = orders.merge(product, on='product_id').merge(customers, on='customer_id')
    df['spend'] = df['quantity'] * df['price']
    df['order_date'] = df['order_date'].astype(str)
    june = df[df['order_date'].str.startswith('2020-06')].groupby(['customer_id', 'name'])['spend'].sum().reset_index()
    june_qualified = june[june['spend'] >= 100]['customer_id']
    july = df[df['order_date'].str.startswith('2020-07')].groupby(['customer_id', 'name'])['spend'].sum().reset_index()
    july_qualified = july[july['spend'] >= 100]['customer_id']
    common = set(june_qualified).intersection(set(july_qualified))
    res = customers[customers['customer_id'].isin(common)][['customer_id', 'name']]
    return res`,
        approach: 'Pandas Multi-month Intersection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Customers (customer_id int, name varchar(30), country varchar(30));
CREATE TABLE Product (product_id int, description varchar(255), price int);
CREATE TABLE Orders (order_id int, customer_id int, product_id int, order_date date, quantity int);`,
    referenceSql: `SELECT c.customer_id, c.name FROM Customers c JOIN Orders o ON c.customer_id = o.customer_id JOIN Product p ON o.product_id = p.product_id GROUP BY c.customer_id, c.name HAVING SUM(CASE WHEN o.order_date >= '2020-06-01' AND o.order_date <= '2020-06-30' THEN o.quantity * p.price ELSE 0 END) >= 100 AND SUM(CASE WHEN o.order_date >= '2020-07-01' AND o.order_date <= '2020-07-31' THEN o.quantity * p.price ELSE 0 END) >= 100;`,
    generatorPy: `cases = [
    {
        "Customers": [
            {"customer_id": 1, "name": "Winston", "country": "USA"},
            {"customer_id": 2, "name": "Jonathan", "country": "Peru"},
            {"customer_id": 3, "name": "Moustafa", "country": "Egypt"}
        ],
        "Product": [
            {"product_id": 10, "description": "LC Phone", "price": 300},
            {"product_id": 20, "description": "LC T-Shirt", "price": 10},
            {"product_id": 30, "description": "LC Book", "price": 45}
        ],
        "Orders": [
            {"order_id": 1, "customer_id": 1, "product_id": 10, "order_date": "2020-06-10", "quantity": 1},
            {"order_id": 2, "customer_id": 1, "product_id": 20, "order_date": "2020-07-01", "quantity": 10},
            {"order_id": 3, "customer_id": 2, "product_id": 20, "order_date": "2020-07-08", "quantity": 2},
            {"order_id": 4, "customer_id": 2, "product_id": 30, "order_date": "2020-06-05", "quantity": 1},
            {"order_id": 5, "customer_id": 3, "product_id": 30, "order_date": "2020-06-10", "quantity": 2},
            {"order_id": 6, "customer_id": 3, "product_id": 10, "order_date": "2020-07-15", "quantity": 2}
        ]
    }
]`
  },

  // 3. #1517 find-users-with-valid-e-mails
  {
    slug: 'find-users-with-valid-e-mails',
    number: 1517,
    category: 'Database',
    patterns: ['string-handling'],
    hints: [
      {
        level: 1,
        title: 'Prefix and Domain Specifications',
        text: 'A valid email prefix must start with a letter and contain only alphanumeric characters, underscores, periods, and hyphens.'
      },
      {
        level: 2,
        title: 'Anchoring Domain Ending',
        text: 'The exact domain suffix must be @leetcode.com anchored to the end of the string.'
      },
      {
        level: 3,
        title: 'Regular Expression Construction',
        text: 'filter using regexp with pattern ^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT user_id, name, mail\nFROM Users\nWHERE mail REGEXP \'^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$\';\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(U)',
      space: 'O(1)',
      variables: ['U: number of users'],
      notes: 'Executes regular expression matching across each email string in linear time.',
      whyNaiveFails: 'Simple string search like contains fails to validate starting character type or illegal special characters.',
      spaceTimeTradeoff: 'Regex engine compilation incurs slight constant overhead but guarantees strict pattern compliance.',
      interviewerExpectation: 'Regular expression matching anchoring start, character class, and literal dot domain suffix.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT user_id, name, mail
FROM Users
WHERE mail REGEXP '^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$';`,
        approach: 'POSIX Regular Expression Match',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT user_id, name, mail
FROM Users
WHERE mail ~ '^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$';`,
        approach: 'PostgreSQL Tilde Regex Operator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def valid_emails(users: pd.DataFrame) -> pd.DataFrame:
    pattern = r'^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode\.com$'
    valid = users['mail'].str.match(pattern).fillna(False)
    return users[valid]`,
        approach: 'Pandas Regex Series Match',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Users (user_id int, name varchar(30), mail varchar(50));`,
    referenceSql: `SELECT user_id, name, mail FROM Users WHERE mail REGEXP '^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$';`,
    generatorPy: `cases = [
    {
        "Users": [
            {"user_id": 1, "name": "Winston", "mail": "winston@leetcode.com"},
            {"user_id": 2, "name": "Jonathan", "mail": "jonathanisgreat"},
            {"user_id": 3, "name": "Annabelle", "mail": "bella-@leetcode.com"},
            {"user_id": 4, "name": "Sally", "mail": "sally.come@leetcode.com"},
            {"user_id": 5, "name": "Marwan", "mail": "quarz#2020@leetcode.com"},
            {"user_id": 6, "name": "David", "mail": "david69@gmail.com"},
            {"user_id": 7, "name": "Shapiro", "mail": ".shapiro@leetcode.com"}
        ]
    }
]`
  },

  // 4. #1527 patients-with-a-condition
  {
    slug: 'patients-with-a-condition',
    number: 1527,
    category: 'Database',
    patterns: ['string-handling'],
    hints: [
      {
        level: 1,
        title: 'Space-Delimited Condition Codes',
        text: 'Conditions string contains codes separated by spaces where target codes begin with DIAB1.'
      },
      {
        level: 2,
        title: 'Boundary Pattern Cases',
        text: 'A code may appear at the very start of the string or preceded by a space character.'
      },
      {
        level: 3,
        title: 'Combining Like Conditions',
        text: 'filter using where conditions like "DIAB1%" or conditions like "% DIAB1%".'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT patient_id, patient_name, conditions\nFROM Patients\nWHERE conditions LIKE \'DIAB1%\' OR conditions LIKE \'% DIAB1%\';\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(P)',
      space: 'O(1)',
      variables: ['P: number of patient records'],
      notes: 'Full table scan checking substring matches for each record.',
      whyNaiveFails: 'Searching for "%DIAB1%" without leading space matches false positives like SADIAB100.',
      spaceTimeTradeoff: 'Dual like clauses provide optimal portability without requiring regex engine overhead.',
      interviewerExpectation: 'Handling prefix and word boundaries correctly without matching internal substrings.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT patient_id, patient_name, conditions
FROM Patients
WHERE conditions LIKE 'DIAB1%' OR conditions LIKE '% DIAB1%';`,
        approach: 'Dual Like Clause for Word Boundaries',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT patient_id, patient_name, conditions
FROM Patients
WHERE conditions LIKE 'DIAB1%' OR conditions LIKE '% DIAB1%';`,
        approach: 'PostgreSQL Dual Like Word Match',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def find_patients(patients: pd.DataFrame) -> pd.DataFrame:
    cond = patients['conditions'].fillna('')
    mask = cond.str.startswith('DIAB1') | cond.str.contains(r' DIAB1', regex=False)
    return patients[mask]`,
        approach: 'Pandas Substring Masking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Patients (patient_id int, patient_name varchar(30), conditions varchar(100));`,
    referenceSql: `SELECT patient_id, patient_name, conditions FROM Patients WHERE conditions LIKE 'DIAB1%' OR conditions LIKE '% DIAB1%';`,
    generatorPy: `cases = [
    {
        "Patients": [
            {"patient_id": 1, "patient_name": "Daniel", "conditions": "YFEV COUGH"},
            {"patient_id": 2, "patient_name": "Alice", "conditions": ""},
            {"patient_id": 3, "patient_name": "Bob", "conditions": "DIAB100 MYOP"},
            {"patient_id": 4, "patient_name": "George", "conditions": "ACNE DIAB100"},
            {"patient_id": 5, "patient_name": "Alain", "conditions": "COUGH SADIAB100"}
        ]
    }
]`
  },

  // 5. #1532 the-most-recent-three-orders
  {
    slug: 'the-most-recent-three-orders',
    number: 1532,
    category: 'Database',
    patterns: ['window-ranking'],
    hints: [
      {
        level: 1,
        title: 'Partitioning Orders per Customer',
        text: 'Assign consecutive ranks to orders for each customer sorted by order_date in descending order.'
      },
      {
        level: 2,
        title: 'Applying Row Number Window Function',
        text: 'use row_number() over (partition by customer_id order by order_date desc) to number orders.'
      },
      {
        level: 3,
        title: 'Filtering Top Three and Sorting Output',
        text: 'filter in cte or outer query where rank is at most 3. order by customer name asc, customer_id asc, and order_date desc.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH RankedOrders AS (\n    SELECT o.order_id,\n           o.order_date,\n           o.customer_id,\n           c.name AS customer_name,\n           ROW_NUMBER() OVER (PARTITION BY o.customer_id ORDER BY o.order_date DESC) AS rn\n    FROM Orders o\n    JOIN Customers c ON o.customer_id = c.customer_id\n)\nSELECT customer_name, customer_id, order_id, order_date\nFROM RankedOrders\nWHERE rn <= 3\nORDER BY customer_name ASC, customer_id ASC, order_date DESC;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(O log O)',
      space: 'O(O)',
      variables: ['O: number of orders'],
      notes: 'Partitions orders by customer and sorts each partition chronologically.',
      whyNaiveFails: 'Correlated subquery limit approaches scale quadratically with order volume.',
      spaceTimeTradeoff: 'Window ranking computes exact row ordinals in a single partitioned sort step.',
      interviewerExpectation: 'Row number window function partitioned by customer with secondary multi-column sorting.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH RankedOrders AS (
    SELECT o.order_id,
           o.order_date,
           o.customer_id,
           c.name AS customer_name,
           ROW_NUMBER() OVER (PARTITION BY o.customer_id ORDER BY o.order_date DESC) AS rn
    FROM Orders o
    JOIN Customers c ON o.customer_id = c.customer_id
)
SELECT customer_name, customer_id, order_id, order_date
FROM RankedOrders
WHERE rn <= 3
ORDER BY customer_name ASC, customer_id ASC, order_date DESC;`,
        approach: 'Row Number Window Function in CTE',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH RankedOrders AS (
    SELECT o.order_id,
           o.order_date,
           o.customer_id,
           c.name AS customer_name,
           ROW_NUMBER() OVER (PARTITION BY o.customer_id ORDER BY o.order_date DESC) AS rn
    FROM Orders o
    JOIN Customers c ON o.customer_id = c.customer_id
)
SELECT customer_name, customer_id, order_id, order_date
FROM RankedOrders
WHERE rn <= 3
ORDER BY customer_name ASC, customer_id ASC, order_date DESC;`,
        approach: 'PostgreSQL Partitioned Row Number CTE',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def top_three_orders(customers: pd.DataFrame, orders: pd.DataFrame) -> pd.DataFrame:
    merged = orders.merge(customers, on='customer_id')
    merged = merged.rename(columns={'name': 'customer_name'})
    merged = merged.sort_values(by=['customer_id', 'order_date'], ascending=[True, False])
    merged['rn'] = merged.groupby('customer_id').cumcount() + 1
    res = merged[merged['rn'] <= 3]
    res = res.sort_values(by=['customer_name', 'customer_id', 'order_date'], ascending=[True, True, False])
    return res[['customer_name', 'customer_id', 'order_id', 'order_date']]`,
        approach: 'Pandas Cumcount Ranking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Customers (customer_id int, name varchar(10));
CREATE TABLE Orders (order_id int, order_date date, customer_id int, cost int);`,
    referenceSql: `WITH RankedOrders AS (SELECT o.order_id, o.order_date, o.customer_id, c.name AS customer_name, ROW_NUMBER() OVER (PARTITION BY o.customer_id ORDER BY o.order_date DESC) AS rn FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id) SELECT customer_name, customer_id, order_id, order_date FROM RankedOrders WHERE rn <= 3 ORDER BY customer_name ASC, customer_id ASC, order_date DESC;`,
    generatorPy: `cases = [
    {
        "Customers": [
            {"customer_id": 1, "name": "Winston"},
            {"customer_id": 2, "name": "Jonathan"},
            {"customer_id": 3, "name": "Annabelle"},
            {"customer_id": 4, "name": "Marwan"},
            {"customer_id": 5, "name": "Khaled"}
        ],
        "Orders": [
            {"order_id": 1, "order_date": "2020-07-31", "customer_id": 1, "cost": 30},
            {"order_id": 2, "order_date": "2020-07-30", "customer_id": 2, "cost": 40},
            {"order_id": 3, "order_date": "2020-07-31", "customer_id": 3, "cost": 20},
            {"order_id": 4, "order_date": "2020-07-29", "customer_id": 4, "cost": 100},
            {"order_id": 5, "order_date": "2020-06-10", "customer_id": 1, "cost": 1010},
            {"order_id": 6, "order_date": "2020-08-01", "customer_id": 2, "cost": 510},
            {"order_id": 7, "order_date": "2020-08-01", "customer_id": 1, "cost": 111},
            {"order_id": 8, "order_date": "2020-08-03", "customer_id": 1, "cost": 99},
            {"order_id": 9, "order_date": "2020-08-07", "customer_id": 2, "cost": 32},
            {"order_id": 10, "order_date": "2020-07-15", "customer_id": 1, "cost": 99}
        ]
    }
]`
  },

  // 6. #1543 fix-product-name-format
  {
    slug: 'fix-product-name-format',
    number: 1543,
    category: 'Database',
    patterns: ['string-handling'],
    hints: [
      {
        level: 1,
        title: 'Trimming Whitespace and Normalizing Case',
        text: 'Trim both leading and trailing whitespace and convert the product name to lowercase.'
      },
      {
        level: 2,
        title: 'Extracting Year and Month Date Format',
        text: 'format the sale date to year-month format using date_format or string slicing.'
      },
      {
        level: 3,
        title: 'Group Aggregation by Cleaned Attributes',
        text: 'group by the cleaned product name and month format, counting occurrences with count(*).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT LOWER(TRIM(product_name)) AS product_name,\n       DATE_FORMAT(sale_date, \'%Y-%m\') AS sale_date,\n       COUNT(*) AS total\nFROM Sales\nGROUP BY LOWER(TRIM(product_name)), DATE_FORMAT(sale_date, \'%Y-%m\')\nORDER BY product_name ASC, sale_date ASC;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(S log S)',
      space: 'O(S)',
      variables: ['S: number of sales rows'],
      notes: 'Cleans string attributes and groups sales rows by normalized product and year-month.',
      whyNaiveFails: 'Grouping on raw product names fails to consolidate entries differing only by casing or trailing padding.',
      spaceTimeTradeoff: 'Deterministic normalization enables grouping across noisy text records.',
      interviewerExpectation: 'String trimming, lowercasing, and date formatting grouped with sorting.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT LOWER(TRIM(product_name)) AS product_name,
       DATE_FORMAT(sale_date, '%Y-%m') AS sale_date,
       COUNT(*) AS total
FROM Sales
GROUP BY LOWER(TRIM(product_name)), DATE_FORMAT(sale_date, '%Y-%m')
ORDER BY product_name ASC, sale_date ASC;`,
        approach: 'String Cleaning and Date Formatting Group By',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT LOWER(TRIM(product_name)) AS product_name,
       TO_CHAR(sale_date, 'YYYY-MM') AS sale_date,
       COUNT(*) AS total
FROM Sales
GROUP BY LOWER(TRIM(product_name)), TO_CHAR(sale_date, 'YYYY-MM')
ORDER BY product_name ASC, sale_date ASC;`,
        approach: 'PostgreSQL To Char Date Format and Lower Trim',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def fix_name_format(sales: pd.DataFrame) -> pd.DataFrame:
    if sales.empty:
        return pd.DataFrame({'product_name': [], 'sale_date': [], 'total': []})
    sales['product_name'] = sales['product_name'].astype(str).str.strip().str.lower()
    sales['sale_date'] = sales['sale_date'].astype(str).str.slice(0, 7)
    res = sales.groupby(['product_name', 'sale_date']).size().reset_index(name='total')
    return res.sort_values(by=['product_name', 'sale_date'])`,
        approach: 'Pandas Strip Lower and Substring Grouping',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Sales (sale_id int, product_name varchar(30), sale_date date);`,
    referenceSql: `SELECT LOWER(TRIM(product_name)) AS product_name, DATE_FORMAT(sale_date, '%Y-%m') AS sale_date, COUNT(*) AS total FROM Sales GROUP BY LOWER(TRIM(product_name)), DATE_FORMAT(sale_date, '%Y-%m') ORDER BY product_name ASC, sale_date ASC;`,
    generatorPy: `cases = [
    {
        "Sales": [
            {"sale_id": 1, "product_name": "LCPHONE", "sale_date": "2000-01-16"},
            {"sale_id": 2, "product_name": "LCPhone", "sale_date": "2000-01-17"},
            {"sale_id": 3, "product_name": "LcPhOnE", "sale_date": "2000-02-18"},
            {"sale_id": 4, "product_name": "LCKeyCHAiN", "sale_date": "2000-02-19"},
            {"sale_id": 5, "product_name": "LCKeyChain", "sale_date": "2000-02-28"},
            {"sale_id": 6, "product_name": "Matryoshka", "sale_date": "2000-03-31"}
        ]
    }
]`
  },

  // 7. #1549 the-most-recent-orders-for-each-product
  {
    slug: 'the-most-recent-orders-for-each-product',
    number: 1549,
    category: 'Database',
    patterns: ['window-ranking'],
    hints: [
      {
        level: 1,
        title: 'Preserving Ties on Latest Dates',
        text: 'Multiple orders can occur on the same latest date for a single product. Rank must preserve all tied orders.'
      },
      {
        level: 2,
        title: 'Partitioning by Product ID',
        text: 'use rank() over (partition by product_id order by order_date desc) to assign rank 1 to all orders on the maximum date.'
      },
      {
        level: 3,
        title: 'Joining Products and Ordering Output',
        text: 'join with Products to include product_name. filter for rank = 1 and order by product_name, product_id, and order_id.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH RankedOrders AS (\n    SELECT p.product_name,\n           p.product_id,\n           o.order_id,\n           o.order_date,\n           RANK() OVER (PARTITION BY o.product_id ORDER BY o.order_date DESC) AS rnk\n    FROM Orders o\n    JOIN Products p ON o.product_id = p.product_id\n)\nSELECT product_name, product_id, order_id, order_date\nFROM RankedOrders\nWHERE rnk = 1\nORDER BY product_name ASC, product_id ASC, order_id ASC;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(O log O)',
      space: 'O(O)',
      variables: ['O: number of orders'],
      notes: 'Computes ranks across partitions of products and filters top tier entries with tie handling.',
      whyNaiveFails: 'Row number breaks ties arbitrarily, returning only one order rather than all orders from the latest date.',
      spaceTimeTradeoff: 'Rank window function handles simultaneous orders on the same day without subqueries.',
      interviewerExpectation: 'Use of rank() over row_number() to retain all tied entries on the most recent date.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH RankedOrders AS (
    SELECT p.product_name,
           p.product_id,
           o.order_id,
           o.order_date,
           RANK() OVER (PARTITION BY o.product_id ORDER BY o.order_date DESC) AS rnk
    FROM Orders o
    JOIN Products p ON o.product_id = p.product_id
)
SELECT product_name, product_id, order_id, order_date
FROM RankedOrders
WHERE rnk = 1
ORDER BY product_name ASC, product_id ASC, order_id ASC;`,
        approach: 'Rank Window Function with Partition by Product',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH RankedOrders AS (
    SELECT p.product_name,
           p.product_id,
           o.order_id,
           o.order_date,
           RANK() OVER (PARTITION BY o.product_id ORDER BY o.order_date DESC) AS rnk
    FROM Orders o
    JOIN Products p ON o.product_id = p.product_id
)
SELECT product_name, product_id, order_id, order_date
FROM RankedOrders
WHERE rnk = 1
ORDER BY product_name ASC, product_id ASC, order_id ASC;`,
        approach: 'PostgreSQL Partitioned Rank CTE',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def most_recent_orders(customers: pd.DataFrame, orders: pd.DataFrame, products: pd.DataFrame) -> pd.DataFrame:
    df = orders.merge(products, on='product_id')
    if df.empty:
        return pd.DataFrame({'product_name': [], 'product_id': [], 'order_id': [], 'order_date': []})
    df['rnk'] = df.groupby('product_id')['order_date'].rank(method='dense', ascending=False)
    res = df[df['rnk'] == 1].sort_values(by=['product_name', 'product_id', 'order_id'])
    return res[['product_name', 'product_id', 'order_id', 'order_date']]`,
        approach: 'Pandas Dense Rank by Product',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Customers (customer_id int, name varchar(10));
CREATE TABLE Orders (order_id int, order_date date, customer_id int, product_id int);
CREATE TABLE Products (product_id int, product_name varchar(20), price int);`,
    referenceSql: `WITH RankedOrders AS (SELECT p.product_name, p.product_id, o.order_id, o.order_date, RANK() OVER (PARTITION BY o.product_id ORDER BY o.order_date DESC) AS rnk FROM Orders o JOIN Products p ON o.product_id = p.product_id) SELECT product_name, product_id, order_id, order_date FROM RankedOrders WHERE rnk = 1 ORDER BY product_name ASC, product_id ASC, order_id ASC;`,
    generatorPy: `cases = [
    {
        "Customers": [
            {"customer_id": 1, "name": "Winston"},
            {"customer_id": 2, "name": "Jonathan"}
        ],
        "Orders": [
            {"order_id": 1, "order_date": "2020-07-31", "customer_id": 1, "product_id": 1},
            {"order_id": 2, "order_date": "2020-07-30", "customer_id": 2, "product_id": 2},
            {"order_id": 3, "order_date": "2020-08-29", "customer_id": 3, "product_id": 3},
            {"order_id": 4, "order_date": "2020-07-29", "customer_id": 4, "product_id": 1},
            {"order_id": 5, "order_date": "2020-06-10", "customer_id": 1, "product_id": 2},
            {"order_id": 6, "order_date": "2020-08-01", "customer_id": 2, "product_id": 1},
            {"order_id": 7, "order_date": "2020-08-01", "customer_id": 1, "product_id": 1}
        ],
        "Products": [
            {"product_id": 1, "product_name": "keyboard", "price": 120},
            {"product_id": 2, "product_name": "mouse", "price": 80},
            {"product_id": 3, "product_name": "screen", "price": 600}
        ]
    }
]`
  },

  // 8. #1555 bank-account-summary
  {
    slug: 'bank-account-summary',
    number: 1555,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Distinguishing Cash Inflows and Outflows',
        text: 'A user spends money when appearing as paid_by and receives money when appearing as paid_to.'
      },
      {
        level: 2,
        title: 'Aggregating Transactions Separately',
        text: 'aggregate total debits grouped by paid_by and total credits grouped by paid_to in separate subqueries or CTEs.'
      },
      {
        level: 3,
        title: 'Net Credit Balance and Breach Check',
        text: 'join users with the aggregated flows using left join, treating nulls as 0. check if net credit is strictly negative.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT u.user_id,\n       u.user_name,\n       u.credit - IFNULL(outflow.total_out, 0) + IFNULL(inflow.total_in, 0) AS credit,\n       CASE\n           WHEN u.credit - IFNULL(outflow.total_out, 0) + IFNULL(inflow.total_in, 0) < 0 THEN \'Yes\'\n           ELSE \'No\'\n       END AS credit_limit_breached\nFROM Users u\nLEFT JOIN (\n    SELECT paid_by, SUM(amount) AS total_out\n    FROM Transactions\n    GROUP BY paid_by\n) outflow ON u.user_id = outflow.paid_by\nLEFT JOIN (\n    SELECT paid_to, SUM(amount) AS total_in\n    FROM Transactions\n    GROUP BY paid_to\n) inflow ON u.user_id = inflow.paid_to;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(U + T)',
      space: 'O(U)',
      variables: ['U: number of users', 'T: transactions'],
      notes: 'Computes sum of inflows and outflows across transactions and joins with user profiles.',
      whyNaiveFails: 'Joining transactions directly on both fields in a single join multiplies rows and produces incorrect balances.',
      spaceTimeTradeoff: 'Independent pre-aggregations by sender and receiver prevent cross-product multiplication.',
      interviewerExpectation: 'Pre-aggregating inflows and outflows separately before joining with users table.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT u.user_id,
       u.user_name,
       u.credit - IFNULL(outflow.total_out, 0) + IFNULL(inflow.total_in, 0) AS credit,
       CASE
           WHEN u.credit - IFNULL(outflow.total_out, 0) + IFNULL(inflow.total_in, 0) < 0 THEN 'Yes'
           ELSE 'No'
       END AS credit_limit_breached
FROM Users u
LEFT JOIN (
    SELECT paid_by, SUM(amount) AS total_out
    FROM Transactions
    GROUP BY paid_by
) outflow ON u.user_id = outflow.paid_by
LEFT JOIN (
    SELECT paid_to, SUM(amount) AS total_in
    FROM Transactions
    GROUP BY paid_to
) inflow ON u.user_id = inflow.paid_to;`,
        approach: 'Left Join Pre-aggregated Cash Inflow and Outflow',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT u.user_id,
       u.user_name,
       u.credit - COALESCE(outflow.total_out, 0) + COALESCE(inflow.total_in, 0) AS credit,
       CASE
           WHEN u.credit - COALESCE(outflow.total_out, 0) + COALESCE(inflow.total_in, 0) < 0 THEN 'Yes'
           ELSE 'No'
       END AS credit_limit_breached
FROM Users u
LEFT JOIN (
    SELECT paid_by, SUM(amount) AS total_out
    FROM Transactions
    GROUP BY paid_by
) outflow ON u.user_id = outflow.paid_by
LEFT JOIN (
    SELECT paid_to, SUM(amount) AS total_in
    FROM Transactions
    GROUP BY paid_to
) inflow ON u.user_id = inflow.paid_to;`,
        approach: 'PostgreSQL Coalesce Inflow and Outflow Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def bank_account_summary(users: pd.DataFrame, transactions: pd.DataFrame) -> pd.DataFrame:
    spent = transactions.groupby('paid_by')['amount'].sum().reset_index().rename(columns={'paid_by': 'user_id', 'amount': 'out'})
    rcvd = transactions.groupby('paid_to')['amount'].sum().reset_index().rename(columns={'paid_to': 'user_id', 'amount': 'in'})
    df = users.merge(spent, on='user_id', how='left').merge(rcvd, on='user_id', how='left')
    df['out'] = df['out'].fillna(0)
    df['in'] = df['in'].fillna(0)
    df['credit'] = df['credit'] - df['out'] + df['in']
    df['credit_limit_breached'] = df['credit'].apply(lambda c: 'Yes' if c < 0 else 'No')
    return df[['user_id', 'user_name', 'credit', 'credit_limit_breached']]`,
        approach: 'Pandas Multi-merge Inflow/Outflow Balance',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Users (user_id int, user_name varchar(20), credit int);
CREATE TABLE Transactions (trans_id int, paid_by int, paid_to int, amount int, trans_date date);`,
    referenceSql: `SELECT u.user_id, u.user_name, u.credit - IFNULL(outflow.total_out, 0) + IFNULL(inflow.total_in, 0) AS credit, CASE WHEN u.credit - IFNULL(outflow.total_out, 0) + IFNULL(inflow.total_in, 0) < 0 THEN 'Yes' ELSE 'No' END AS credit_limit_breached FROM Users u LEFT JOIN (SELECT paid_by, SUM(amount) AS total_out FROM Transactions GROUP BY paid_by) outflow ON u.user_id = outflow.paid_by LEFT JOIN (SELECT paid_to, SUM(amount) AS total_in FROM Transactions GROUP BY paid_to) inflow ON u.user_id = inflow.paid_to;`,
    generatorPy: `cases = [
    {
        "Users": [
            {"user_id": 1, "user_name": "Moustafa", "credit": 100},
            {"user_id": 2, "user_name": "Jonathan", "credit": 200},
            {"user_id": 3, "user_name": "Winston", "credit": 10000},
            {"user_id": 4, "user_name": "Luis", "credit": 800}
        ],
        "Transactions": [
            {"trans_id": 1, "paid_by": 1, "paid_to": 3, "amount": 400, "trans_date": "2020-08-01"},
            {"trans_id": 2, "paid_by": 3, "paid_to": 2, "amount": 500, "trans_date": "2020-08-03"},
            {"trans_id": 3, "paid_by": 2, "paid_to": 1, "amount": 200, "trans_date": "2020-08-08"}
        ]
    }
]`
  },

  // 9. #1565 unique-orders-and-customers-per-month
  {
    slug: 'unique-orders-and-customers-per-month',
    number: 1565,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Filtering Orders by Invoice Threshold',
        text: 'Only orders with invoice strictly greater than 20 should be counted.'
      },
      {
        level: 2,
        title: 'Extracting Year-Month Format',
        text: 'format the order_date to year-month format using date_format.'
      },
      {
        level: 3,
        title: 'Counting Distinct Entities',
        text: 'group by the formatted month and calculate count(distinct order_id) and count(distinct customer_id).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT DATE_FORMAT(order_date, \'%Y-%m\') AS month,\n       COUNT(DISTINCT order_id) AS order_count,\n       COUNT(DISTINCT customer_id) AS customer_count\nFROM Orders\nWHERE invoice > 20\nGROUP BY DATE_FORMAT(order_date, \'%Y-%m\');\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(O log O)',
      space: 'O(O)',
      variables: ['O: number of orders'],
      notes: 'Filters rows on invoice value and performs group aggregation with distinct tracking.',
      whyNaiveFails: 'Counting without distinct counts duplicate orders or duplicate customers within the same month.',
      spaceTimeTradeoff: 'Distinct hash sets track unique entities per calendar bucket.',
      interviewerExpectation: 'Distinct counts over date formatted grouping with predicate filtering.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT DATE_FORMAT(order_date, '%Y-%m') AS month,
       COUNT(DISTINCT order_id) AS order_count,
       COUNT(DISTINCT customer_id) AS customer_count
FROM Orders
WHERE invoice > 20
GROUP BY DATE_FORMAT(order_date, '%Y-%m');`,
        approach: 'Date Formatting and Distinct Group Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT TO_CHAR(order_date, 'YYYY-MM') AS month,
       COUNT(DISTINCT order_id) AS order_count,
       COUNT(DISTINCT customer_id) AS customer_count
FROM Orders
WHERE invoice > 20
GROUP BY TO_CHAR(order_date, 'YYYY-MM');`,
        approach: 'PostgreSQL To Char Distinct Counts',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def unique_orders_and_customers(orders: pd.DataFrame) -> pd.DataFrame:
    filtered = orders[orders['invoice'] > 20].copy()
    if filtered.empty:
        return pd.DataFrame({'month': [], 'order_count': [], 'customer_count': []})
    filtered['month'] = filtered['order_date'].astype(str).str.slice(0, 7)
    res = filtered.groupby('month').agg(
        order_count=('order_id', 'nunique'),
        customer_count=('customer_id', 'nunique')
    ).reset_index()
    return res`,
        approach: 'Pandas Substring Slicing and Nunique Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Orders (order_id int, order_date date, customer_id int, invoice int);`,
    referenceSql: `SELECT DATE_FORMAT(order_date, '%Y-%m') AS month, COUNT(DISTINCT order_id) AS order_count, COUNT(DISTINCT customer_id) AS customer_count FROM Orders WHERE invoice > 20 GROUP BY DATE_FORMAT(order_date, '%Y-%m');`,
    generatorPy: `cases = [
    {
        "Orders": [
            {"order_id": 1, "order_date": "2020-09-15", "customer_id": 1, "invoice": 30},
            {"order_id": 2, "order_date": "2020-09-17", "customer_id": 2, "invoice": 90},
            {"order_id": 3, "order_date": "2020-10-06", "customer_id": 3, "invoice": 20},
            {"order_id": 4, "order_date": "2020-10-21", "customer_id": 3, "invoice": 102},
            {"order_id": 5, "order_date": "2020-10-16", "customer_id": 1, "invoice": 40},
            {"order_id": 6, "order_date": "2020-10-19", "customer_id": 1, "invoice": 5}
        ]
    }
]`
  },

  // 10. #1571 warehouse-manager
  {
    slug: 'warehouse-manager',
    number: 1571,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Computing Unit Volume',
        text: 'The volume of a single product unit is calculated by multiplying Width, Length, and Height.'
      },
      {
        level: 2,
        title: 'Joining Warehouses with Products',
        text: 'join Warehouse with Products on product_id to associate inventory count with dimensions.'
      },
      {
        level: 3,
        title: 'Aggregating Total Warehouse Footprint',
        text: 'group by warehouse name and calculate sum(units * Width * Length * Height) as volume.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT w.name AS warehouse_name,\n       SUM(w.units * p.Width * p.Length * p.Height) AS volume\nFROM Warehouse w\nJOIN Products p ON w.product_id = p.product_id\nGROUP BY w.name;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(W + P)',
      space: 'O(W)',
      variables: ['W: inventory rows in Warehouse', 'P: product entries'],
      notes: 'Executes hash join between warehouse inventories and product specifications before summing volumes.',
      whyNaiveFails: 'Neglecting to multiply unit counts by 3-dimensional volume yields product counts instead of physical cubic footprint.',
      spaceTimeTradeoff: 'Direct product dimension arithmetic computes volumetric aggregates in a single aggregation step.',
      interviewerExpectation: 'Join and volumetric arithmetic expression inside sum aggregate grouped by warehouse.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT w.name AS warehouse_name,
       SUM(w.units * p.Width * p.Length * p.Height) AS volume
FROM Warehouse w
JOIN Products p ON w.product_id = p.product_id
GROUP BY w.name;`,
        approach: 'Joined Dimension Arithmetic Group By',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT w.name AS warehouse_name,
       SUM(w.units * p.Width * p.Length * p.Height) AS volume
FROM Warehouse w
JOIN Products p ON w.product_id = p.product_id
GROUP BY w.name;`,
        approach: 'PostgreSQL Dimension Product Sum',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def warehouse_manager(warehouse: pd.DataFrame, products: pd.DataFrame) -> pd.DataFrame:
    df = warehouse.merge(products, on='product_id')
    df['vol'] = df['units'] * df['Width'] * df['Length'] * df['Height']
    res = df.groupby('name')['vol'].sum().reset_index()
    return res.rename(columns={'name': 'warehouse_name', 'vol': 'volume'})`,
        approach: 'Pandas Merge and Volumetric Sum',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Warehouse (name varchar(50), product_id int, units int);
CREATE TABLE Products (product_id int, product_name varchar(50), Width int, Length int, Height int);`,
    referenceSql: `SELECT w.name AS warehouse_name, SUM(w.units * p.Width * p.Length * p.Height) AS volume FROM Warehouse w JOIN Products p ON w.product_id = p.product_id GROUP BY w.name;`,
    generatorPy: `cases = [
    {
        "Warehouse": [
            {"name": "LCHouse1", "product_id": 1, "units": 1},
            {"name": "LCHouse1", "product_id": 2, "units": 10},
            {"name": "LCHouse1", "product_id": 3, "units": 5},
            {"name": "LCHouse2", "product_id": 1, "units": 2},
            {"name": "LCHouse2", "product_id": 2, "units": 2},
            {"name": "LCHouse3", "product_id": 1, "units": 1}
        ],
        "Products": [
            {"product_id": 1, "product_name": "LC-TV", "Width": 5, "Length": 50, "Height": 40},
            {"product_id": 2, "product_name": "LC-KeyChain", "Width": 5, "Length": 5, "Height": 5},
            {"product_id": 3, "product_name": "LC-Phone", "Width": 2, "Length": 10, "Height": 10}
        ]
    }
]`
  }
];
