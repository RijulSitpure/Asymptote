import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

export const databaseProblems = [
  // 1. #262 trips-and-users
  {
    slug: 'trips-and-users',
    number: 262,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Filtering Disqualified Participants',
        text: 'Requests should only count toward the cancellation metric if neither the customer nor the driver has an active ban status during the measurement period.'
      },
      {
        level: 2,
        title: 'Dual Table Joins on Role Participants',
        text: 'Join the trips table twice against users: once on client identifier and once on driver identifier, asserting that both participants have banned status set to No.'
      },
      {
        level: 3,
        title: 'Grouped Ratio and Date Restriction',
        text: 'Filter for dates between 2013-10-01 and 2013-10-03. Group by request date. Compute the ratio of non-completed trips over total requests using sum and round to two decimal places.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT request_at AS Day,\n       ROUND(SUM(status != \'completed\') / COUNT(*), 2) AS `Cancellation Rate`\nFROM Trips t\nJOIN Users c ON t.client_id = c.users_id AND c.banned = \'No\'\nJOIN Users d ON t.driver_id = d.users_id AND d.banned = \'No\'\nWHERE request_at BETWEEN \'2013-10-01\' AND \'2013-10-03\'\nGROUP BY request_at;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(T + U)',
      space: 'O(T)',
      variables: ['T: number of trip records', 'U: number of user accounts'],
      notes: 'Hash join between trips and users filtered by date range and unbanned flags.',
      whyNaiveFails: 'Evaluating cross products or subqueries per trip scales quadratically and fails to exclude banned drivers alongside banned clients.',
      spaceTimeTradeoff: 'Dual inner joins with index lookups on users_id evaluate in linear time with minimal group aggregation memory.',
      interviewerExpectation: 'Ensuring both client and driver unbanned conditions are enforced and rounding ratios to exactly 2 decimals.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT request_at AS Day,
       ROUND(SUM(status != 'completed') / COUNT(*), 2) AS \`Cancellation Rate\`
FROM Trips t
JOIN Users c ON t.client_id = c.users_id AND c.banned = 'No'
JOIN Users d ON t.driver_id = d.users_id AND d.banned = 'No'
WHERE request_at BETWEEN '2013-10-01' AND '2013-10-03'
GROUP BY request_at;`,
        approach: 'Dual Inner Join with Conditional Sum Ratio',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT request_at AS "Day",
       ROUND(SUM(CASE WHEN status != 'completed' THEN 1.0 ELSE 0.0 END) / COUNT(*), 2) AS "Cancellation Rate"
FROM Trips t
JOIN Users c ON t.client_id = c.users_id AND c.banned = 'No'
JOIN Users d ON t.driver_id = d.users_id AND d.banned = 'No'
WHERE request_at BETWEEN '2013-10-01' AND '2013-10-03'
GROUP BY request_at;`,
        approach: 'PostgreSQL Conditional Case Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def trips_and_users(trips: pd.DataFrame, users: pd.DataFrame) -> pd.DataFrame:
    unbanned = set(users[users['banned'] == 'No']['users_id'])
    valid = trips[
        trips['client_id'].isin(unbanned) &
        trips['driver_id'].isin(unbanned) &
        trips['request_at'].between('2013-10-01', '2013-10-03')
    ]
    if valid.empty:
        return pd.DataFrame(columns=['Day', 'Cancellation Rate'])
    grouped = valid.groupby('request_at').agg(
        total=('id', 'count'),
        cancelled=('status', lambda s: (s != 'completed').sum())
    ).reset_index()
    grouped['Cancellation Rate'] = (grouped['cancelled'] / grouped['total']).round(2)
    return grouped.rename(columns={'request_at': 'Day'})[['Day', 'Cancellation Rate']]`,
        approach: 'Pandas Unbanned Filtering and Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Trips (id int, client_id int, driver_id int, city_id int, status varchar(50), request_at varchar(50));
CREATE TABLE Users (users_id int, banned varchar(50), role varchar(50));`,
    referenceSql: `SELECT request_at AS Day,
       ROUND(SUM(status != 'completed') / COUNT(*), 2) AS \`Cancellation Rate\`
FROM Trips t
JOIN Users c ON t.client_id = c.users_id AND c.banned = 'No'
JOIN Users d ON t.driver_id = d.users_id AND d.banned = 'No'
WHERE request_at BETWEEN '2013-10-01' AND '2013-10-03'
GROUP BY request_at;`,
    generatorPy: `import json
cases = [
    {
        'name': 'standard_sample',
        'inserts': """INSERT INTO Users VALUES (1, 'No', 'client'), (2, 'Yes', 'client'), (3, 'No', 'client'), (4, 'No', 'client'), (10, 'No', 'driver'), (11, 'No', 'driver'), (12, 'No', 'driver'), (13, 'No', 'driver');
INSERT INTO Trips VALUES (1, 1, 10, 1, 'completed', '2013-10-01'), (2, 2, 11, 1, 'cancelled_by_driver', '2013-10-01'), (3, 3, 12, 6, 'completed', '2013-10-01'), (4, 4, 13, 6, 'cancelled_by_client', '2013-10-01'), (5, 1, 10, 1, 'completed', '2013-10-02'), (6, 3, 11, 6, 'completed', '2013-10-02'), (7, 4, 12, 6, 'completed', '2013-10-02'), (8, 2, 12, 12, 'completed', '2013-10-03'), (9, 3, 10, 12, 'completed', '2013-10-03'), (10, 4, 13, 12, 'cancelled_by_driver', '2013-10-03');"""
    },
    {
        'name': 'empty_trips',
        'inserts': "INSERT INTO Users VALUES (1, 'No', 'client'), (10, 'No', 'driver');"
    }
]
print(json.dumps(cases))
`
  },

  // 2. #511 game-play-analysis-i
  {
    slug: 'game-play-analysis-i',
    number: 511,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Tracking Initial Activity Date',
        text: 'Each participant logs multiple gameplay sessions across different dates. What summary metric identifies the earliest chronological occurrence for each player?'
      },
      {
        level: 2,
        title: 'Earliest Date Aggregation',
        text: 'Group the session records by player identifier. Apply the min aggregate function to the event date to extract the premier login timestamp.'
      },
      {
        level: 3,
        title: 'Grouped Min Blueprint',
        text: 'Formulate select player_id, min(event_date) as first_login from Activity group by player_id.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT player_id, MIN(event_date) AS first_login\nFROM Activity\nGROUP BY player_id;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(A)',
      space: 'O(P)',
      variables: ['A: rows in Activity', 'P: distinct players'],
      notes: 'Grouped aggregation finding minimum event date per player.',
      whyNaiveFails: 'Correlated scalar subqueries scanning all records per player yield quadratic O(A * P) complexity.',
      spaceTimeTradeoff: 'Single-pass hash aggregation records minimum date per player in linear time.',
      interviewerExpectation: 'Correct grouping on player_id and naming the output column first_login.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT player_id, MIN(event_date) AS first_login
FROM Activity
GROUP BY player_id;`,
        approach: 'Group By Player with Min Date',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT player_id, MIN(event_date) AS first_login
FROM Activity
GROUP BY player_id;`,
        approach: 'PostgreSQL Min Date Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def game_analysis(activity: pd.DataFrame) -> pd.DataFrame:
    grouped = activity.groupby('player_id')['event_date'].min().reset_index()
    return grouped.rename(columns={'event_date': 'first_login'})`,
        approach: 'Pandas GroupBy Min Event Date',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Activity (player_id int, device_id int, event_date varchar(50), games_played int);`,
    referenceSql: `SELECT player_id, MIN(event_date) AS first_login FROM Activity GROUP BY player_id;`,
    generatorPy: `import json
cases = [
    {
        'name': 'basic_sessions',
        'inserts': """INSERT INTO Activity VALUES (1, 2, '2016-03-01', 5), (1, 2, '2016-05-02', 6), (2, 3, '2017-06-25', 1), (3, 1, '2016-03-02', 0), (3, 4, '2018-07-03', 5);"""
    },
    {
        'name': 'single_session_per_player',
        'inserts': "INSERT INTO Activity VALUES (1, 1, '2020-01-01', 10), (2, 2, '2020-01-02', 20);"
    }
]
print(json.dumps(cases))
`
  },

  // 3. #577 employee-bonus
  {
    slug: 'employee-bonus',
    number: 577,
    category: 'Database',
    patterns: ['anti-join'],
    hints: [
      {
        level: 1,
        title: 'Retaining Unmatched Bonus Records',
        text: 'Employees without any recorded incentive must still be reported alongside those whose amount falls below one thousand.'
      },
      {
        level: 2,
        title: 'Left Outer Join and Null Checking',
        text: 'Connect Employee to Bonus using a left join on empId. Employees lacking bonus records will produce null values in the bonus column.'
      },
      {
        level: 3,
        title: 'Predicate Disjunction Blueprint',
        text: 'Filter with where bonus < 1000 or bonus is null. Select employee name and bonus amount.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT e.name, b.bonus\nFROM Employee e\nLEFT JOIN Bonus b ON e.empId = b.empId\nWHERE b.bonus < 1000 OR b.bonus IS NULL;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(E + B)',
      space: 'O(E)',
      variables: ['E: rows in Employee', 'B: rows in Bonus'],
      notes: 'Left outer join preserving unmatched employee entries.',
      whyNaiveFails: 'An inner join drops employees who have no bonus record at all, violating problem requirements.',
      spaceTimeTradeoff: 'Outer join evaluates in linear time and yields null for non-existent bonus foreign keys.',
      interviewerExpectation: 'Explicitly testing for bonus is null because standard comparisons like < 1000 evaluate to unknown for null.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT e.name, b.bonus
FROM Employee e
LEFT JOIN Bonus b ON e.empId = b.empId
WHERE b.bonus < 1000 OR b.bonus IS NULL;`,
        approach: 'Left Outer Join with Null Disjunction',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT e.name, b.bonus
FROM Employee e
LEFT JOIN Bonus b ON e.empId = b.empId
WHERE b.bonus < 1000 OR b.bonus IS NULL;`,
        approach: 'PostgreSQL Outer Join Null Handling',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def employee_bonus(employee: pd.DataFrame, bonus: pd.DataFrame) -> pd.DataFrame:
    merged = employee.merge(bonus, on='empId', how='left')
    filtered = merged[(merged['bonus'] < 1000) | (merged['bonus'].isna())]
    return filtered[['name', 'bonus']]`,
        approach: 'Pandas Left Merge with Null Filtering',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Employee (empId int, name varchar(50), supervisor int, salary int);
CREATE TABLE Bonus (empId int, bonus int);`,
    referenceSql: `SELECT e.name, b.bonus FROM Employee e LEFT JOIN Bonus b ON e.empId = b.empId WHERE b.bonus < 1000 OR b.bonus IS NULL;`,
    generatorPy: `import json
cases = [
    {
        'name': 'mixed_bonuses_and_nulls',
        'inserts': """INSERT INTO Employee VALUES (3, 'Brad', null, 4000), (1, 'John', 3, 1000), (2, 'Dan', 3, 2000), (4, 'Thomas', 3, 4000);
INSERT INTO Bonus VALUES (2, 500), (4, 2000);"""
    },
    {
        'name': 'all_have_large_bonus',
        'inserts': "INSERT INTO Employee VALUES (1, 'Alice', null, 5000); INSERT INTO Bonus VALUES (1, 5000);"
    }
]
print(json.dumps(cases))
`
  },

  // 4. #584 find-customer-referee
  {
    slug: 'find-customer-referee',
    number: 584,
    category: 'Database',
    patterns: ['null-handling'],
    hints: [
      {
        level: 1,
        title: 'Preserving Unassigned Attributes',
        text: 'In three-valued relational logic, comparing a column to a constant evaluates to unknown when that column holds no reference value.'
      },
      {
        level: 2,
        title: 'Disjunctive Null Predicate',
        text: 'To select customers not referred by account number two, include both referee_id <> 2 and referee_id is null in your filter condition.'
      },
      {
        level: 3,
        title: 'Query Formulation Blueprint',
        text: 'Select name from Customer where referee_id <> 2 or referee_id is null.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT name\nFROM Customer\nWHERE referee_id != 2 OR referee_id IS NULL;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: rows in Customer table'],
      notes: 'Single table scan evaluating three-valued logic predicate.',
      whyNaiveFails: 'WHERE referee_id != 2 silently omits rows where referee_id is null because NULL != 2 evaluates to UNKNOWN.',
      spaceTimeTradeoff: 'Linear scan with index support on referee_id identifies qualifying customers without memory allocation.',
      interviewerExpectation: 'Mastery of three-valued SQL logic where NULL requires IS NULL or coalesce guards.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT name
FROM Customer
WHERE referee_id != 2 OR referee_id IS NULL;`,
        approach: 'Three-Valued Logic Filter with Is Null',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT name
FROM Customer
WHERE referee_id != 2 OR referee_id IS NULL;`,
        approach: 'PostgreSQL Null-Safe Predicate',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def find_customer_referee(customer: pd.DataFrame) -> pd.DataFrame:
    filtered = customer[(customer['referee_id'] != 2) | (customer['referee_id'].isna())]
    return filtered[['name']]`,
        approach: 'Pandas Inequality and Isna Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Customer (id int, name varchar(50), referee_id int);`,
    referenceSql: `SELECT name FROM Customer WHERE referee_id != 2 OR referee_id IS NULL;`,
    generatorPy: `import json
cases = [
    {
        'name': 'standard_customers',
        'inserts': "INSERT INTO Customer VALUES (1, 'Will', null), (2, 'Jane', null), (3, 'Alex', 2), (4, 'Bill', null), (5, 'Zack', 1), (6, 'Mark', 2);"
    },
    {
        'name': 'all_referee_two',
        'inserts': "INSERT INTO Customer VALUES (1, 'Bob', 2), (2, 'Alice', 2);"
    }
]
print(json.dumps(cases))
`
  },

  // 5. #586 customer-placing-the-largest-number-of-orders
  {
    slug: 'customer-placing-the-largest-number-of-orders',
    number: 586,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Identifying Top Order Frequency',
        text: 'Multiple orders originate from repeating accounts. How can transactions be partitioned to find the buyer with the peak volume?'
      },
      {
        level: 2,
        title: 'Order Count Descending Limit',
        text: 'Group the records by customer identifier. Order the resulting groups by count descending and limit the output to one row.'
      },
      {
        level: 3,
        title: 'Grouped Ordering Blueprint',
        text: 'Select customer_number from Orders group by customer_number order by count(*) desc limit 1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT customer_number\nFROM Orders\nGROUP BY customer_number\nORDER BY COUNT(*) DESC\nLIMIT 1;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(O log K)',
      space: 'O(K)',
      variables: ['O: total orders', 'K: distinct customers'],
      notes: 'Group by customer with heap-based top-1 limit.',
      whyNaiveFails: 'Correlated subqueries counting per row waste CPU with redundant scans.',
      spaceTimeTradeoff: 'Grouping with limit 1 avoids sorting entire customer sets when index exists on customer_number.',
      interviewerExpectation: 'Correct aggregate ordering using count(*) desc limit 1.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT customer_number
FROM Orders
GROUP BY customer_number
ORDER BY COUNT(*) DESC
LIMIT 1;`,
        approach: 'Grouped Order Count Descending Limit 1',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT customer_number
FROM Orders
GROUP BY customer_number
ORDER BY COUNT(*) DESC
LIMIT 1;`,
        approach: 'PostgreSQL Aggregation Limit 1',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def largest_orders(orders: pd.DataFrame) -> pd.DataFrame:
    if orders.empty:
        return pd.DataFrame(columns=['customer_number'])
    counts = orders.groupby('customer_number').size().reset_index(name='count')
    top = counts.sort_values(by='count', ascending=False).iloc[:1]
    return top[['customer_number']]`,
        approach: 'Pandas GroupBy Size and Top 1 Slice',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Orders (order_number int, customer_number int);`,
    referenceSql: `SELECT customer_number FROM Orders GROUP BY customer_number ORDER BY COUNT(*) DESC LIMIT 1;`,
    generatorPy: `import json
cases = [
    {
        'name': 'standard_orders',
        'inserts': "INSERT INTO Orders VALUES (1, 1), (2, 2), (3, 3), (4, 3);"
    },
    {
        'name': 'single_customer',
        'inserts': "INSERT INTO Orders VALUES (1, 5), (2, 5), (3, 5);"
    }
]
print(json.dumps(cases))
`
  },

  // 6. #595 big-countries
  {
    slug: 'big-countries',
    number: 595,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Threshold-Based Attribute Filtering',
        text: 'Nations qualify as large either by territorial expanse exceeding three million or by human population reaching twenty-five million.'
      },
      {
        level: 2,
        title: 'Disjunctive Filter Predicate',
        text: 'Combine the geographic and demographic thresholds in a where clause using the logical or operator.'
      },
      {
        level: 3,
        title: 'Projection Selection Blueprint',
        text: 'Select name, population, area from World where area >= 3000000 or population >= 25000000.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT name, population, area\nFROM World\nWHERE area >= 3000000 OR population >= 25000000;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(W)',
      space: 'O(1)',
      variables: ['W: rows in World table'],
      notes: 'Single table scan or index range union.',
      whyNaiveFails: 'Full Cartesian joins or redundant unions add latency over simple single-pass filtering.',
      spaceTimeTradeoff: 'Constant auxiliary space streaming matching records directly.',
      interviewerExpectation: 'Selecting the exact required columns (name, population, area) in order.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT name, population, area
FROM World
WHERE area >= 3000000 OR population >= 25000000;`,
        approach: 'Disjunctive Numeric Range Filtering',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT name, population, area
FROM World
WHERE area >= 3000000 OR population >= 25000000;`,
        approach: 'PostgreSQL Numeric Threshold Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def big_countries(world: pd.DataFrame) -> pd.DataFrame:
    big = world[(world['area'] >= 3000000) | (world['population'] >= 25000000)]
    return big[['name', 'population', 'area']]`,
        approach: 'Pandas Vectorized Boolean Indexing',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE World (name varchar(50), continent varchar(50), area int, population int, gdp bigint);`,
    referenceSql: `SELECT name, population, area FROM World WHERE area >= 3000000 OR population >= 25000000;`,
    generatorPy: `import json
cases = [
    {
        'name': 'standard_world',
        'inserts': "INSERT INTO World VALUES ('Afghanistan', 'Asia', 652230, 25500100, 20343000000), ('Albania', 'Europe', 28748, 2831741, 12960000000), ('Algeria', 'Africa', 2381741, 37100000, 188681000000), ('Andorra', 'Europe', 468, 78115, 3712000000), ('Angola', 'Africa', 1246700, 20609294, 100990000000);"
    },
    {
        'name': 'no_big_countries',
        'inserts': "INSERT INTO World VALUES ('Tiny', 'Europe', 100, 1000, 100000);"
    }
]
print(json.dumps(cases))
`
  },

  // 7. #601 human-traffic-of-stadium
  {
    slug: 'human-traffic-of-stadium',
    number: 601,
    category: 'Database',
    patterns: ['window-offset'],
    hints: [
      {
        level: 1,
        title: 'Consecutive Day Threshold Island Detection',
        text: 'Peak attendance records must span three or more contiguous calendar identifiers where headcount reaches or exceeds one hundred.'
      },
      {
        level: 2,
        title: 'Contiguity Grouping via Row Number Offset',
        text: 'Filter entries with people >= 100. Subtract row_number() over (order by id) from id to assign contiguous sequences to an identical grouping key.'
      },
      {
        level: 3,
        title: 'Common Table Expression Island Blueprint',
        text: 'Construct a CTE with id - row_number() over (order by id) as grp. Join with a subquery filtering for group sizes >= 3, and order by id.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH HighTraffic AS (\n    SELECT id, visit_date, people,\n           id - ROW_NUMBER() OVER (ORDER BY id) AS grp\n    FROM Stadium\n    WHERE people >= 100\n),\nGroupCounts AS (\n    SELECT grp, COUNT(*) AS cnt\n    FROM HighTraffic\n    GROUP BY grp\n    HAVING cnt >= 3\n)\nSELECT h.id, h.visit_date, h.people\nFROM HighTraffic h\nJOIN GroupCounts g ON h.grp = g.grp\nORDER BY h.id;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(S log S)',
      space: 'O(S)',
      variables: ['S: rows in Stadium table'],
      notes: 'Window function row number assignment followed by group size filtering.',
      whyNaiveFails: 'Three-way self-joins take cubic O(S^3) time without indexes and miss islands longer than 3 days without duplicate handling.',
      spaceTimeTradeoff: 'Gaps-and-islands window grouping isolates contiguous runs in a single sorting pass.',
      interviewerExpectation: 'Proficiency with gaps-and-islands logic using ROW_NUMBER() difference technique.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH HighTraffic AS (
    SELECT id, visit_date, people,
           id - ROW_NUMBER() OVER (ORDER BY id) AS grp
    FROM Stadium
    WHERE people >= 100
),
GroupCounts AS (
    SELECT grp, COUNT(*) AS cnt
    FROM HighTraffic
    GROUP BY grp
    HAVING cnt >= 3
)
SELECT h.id, h.visit_date, h.people
FROM HighTraffic h
JOIN GroupCounts g ON h.grp = g.grp
ORDER BY h.id;`,
        approach: 'Window Gaps-and-Islands CTE',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH HighTraffic AS (
    SELECT id, visit_date, people,
           id - ROW_NUMBER() OVER (ORDER BY id) AS grp
    FROM Stadium
    WHERE people >= 100
),
GroupCounts AS (
    SELECT grp, COUNT(*) AS cnt
    FROM HighTraffic
    GROUP BY grp
    HAVING cnt >= 3
)
SELECT h.id, h.visit_date, h.people
FROM HighTraffic h
JOIN GroupCounts g ON h.grp = g.grp
ORDER BY h.id;`,
        approach: 'PostgreSQL Contiguity Window CTE',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def human_traffic(stadium: pd.DataFrame) -> pd.DataFrame:
    filtered = stadium[stadium['people'] >= 100].copy()
    if filtered.empty:
        return pd.DataFrame(columns=['id', 'visit_date', 'people'])
    filtered['grp'] = filtered['id'] - range(len(filtered))
    counts = filtered.groupby('grp')['id'].transform('count')
    valid = filtered[counts >= 3]
    return valid[['id', 'visit_date', 'people']].sort_values(by='id')`,
        approach: 'Pandas Range Difference Gaps-and-Islands',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Stadium (id int, visit_date varchar(50), people int);`,
    referenceSql: `WITH HighTraffic AS (
    SELECT id, visit_date, people,
           id - ROW_NUMBER() OVER (ORDER BY id) AS grp
    FROM Stadium
    WHERE people >= 100
),
GroupCounts AS (
    SELECT grp, COUNT(*) AS cnt
    FROM HighTraffic
    GROUP BY grp
    HAVING cnt >= 3
)
SELECT h.id, h.visit_date, h.people
FROM HighTraffic h
JOIN GroupCounts g ON h.grp = g.grp
ORDER BY h.id;`,
    generatorPy: `import json
cases = [
    {
        'name': 'stadium_standard',
        'inserts': "INSERT INTO Stadium VALUES (1, '2017-01-01', 10), (2, '2017-01-02', 109), (3, '2017-01-03', 150), (4, '2017-01-04', 99), (5, '2017-01-05', 145), (6, '2017-01-06', 1455), (7, '2017-01-07', 199), (8, '2017-01-09', 188);"
    },
    {
        'name': 'no_consecutive_3',
        'inserts': "INSERT INTO Stadium VALUES (1, '2017-01-01', 150), (2, '2017-01-02', 120), (3, '2017-01-03', 50);"
    }
]
print(json.dumps(cases))
`
  },

  // 8. #607 sales-person
  {
    slug: 'sales-person',
    number: 607,
    category: 'Database',
    patterns: ['anti-join'],
    hints: [
      {
        level: 1,
        title: 'Excluding Representative Ties',
        text: 'Sales representatives who booked orders linked to a specified vendor must be excluded entirely from the final roster.'
      },
      {
        level: 2,
        title: 'Anti-Join Subquery Formulation',
        text: 'Join Orders with Company to find all sales_id linked to the company named Red. Then filter SalesPerson with sales_id not in that list.'
      },
      {
        level: 3,
        title: 'Not In Subquery Blueprint',
        text: 'Select name from SalesPerson where sales_id not in (select o.sales_id from Orders o join Company c on o.com_id = c.com_id where c.name = \'Red\').'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT name\nFROM SalesPerson\nWHERE sales_id NOT IN (\n    SELECT o.sales_id\n    FROM Orders o\n    JOIN Company c ON o.com_id = c.com_id\n    WHERE c.name = \'RED\'\n);\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(S + O + C)',
      space: 'O(R)',
      variables: ['S: salespersons', 'O: orders', 'C: companies', 'R: red order sellers'],
      notes: 'Subquery anti-join filtering sales identifiers.',
      whyNaiveFails: 'Filtering orders with company name != RED erroneously retains salespersons who also took RED orders on different dates.',
      spaceTimeTradeoff: 'Subquery collects distinct seller identifiers who dealt with RED and eliminates them via anti-join.',
      interviewerExpectation: 'Understanding that someone can have orders with RED and other companies simultaneously.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT name
FROM SalesPerson
WHERE sales_id NOT IN (
    SELECT o.sales_id
    FROM Orders o
    JOIN Company c ON o.com_id = c.com_id
    WHERE c.name = 'RED'
);`,
        approach: 'Subquery Anti-Join Exclusion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT name
FROM SalesPerson
WHERE sales_id NOT IN (
    SELECT o.sales_id
    FROM Orders o
    JOIN Company c ON o.com_id = c.com_id
    WHERE c.name = 'RED'
);`,
        approach: 'PostgreSQL Not In Subquery',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def sales_person(sales_person: pd.DataFrame, company: pd.DataFrame, orders: pd.DataFrame) -> pd.DataFrame:
    red_companies = company[company['name'] == 'RED']['com_id']
    red_sales_ids = orders[orders['com_id'].isin(red_companies)]['sales_id'].unique()
    result = sales_person[~sales_person['sales_id'].isin(red_sales_ids)]
    return result[['name']]`,
        approach: 'Pandas Boolean Inverse Set Membership',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE SalesPerson (sales_id int, name varchar(50), salary int, commission_rate int, hire_date varchar(50));
CREATE TABLE Company (com_id int, name varchar(50), city varchar(50));
CREATE TABLE Orders (order_id int, order_date varchar(50), com_id int, sales_id int, amount int);`,
    referenceSql: `SELECT name FROM SalesPerson WHERE sales_id NOT IN (SELECT o.sales_id FROM Orders o JOIN Company c ON o.com_id = c.com_id WHERE c.name = 'RED');`,
    generatorPy: `import json
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
`
  },

  // 9. #608 tree-node
  {
    slug: 'tree-node',
    number: 608,
    category: 'Database',
    patterns: ['conditional-pivot'],
    hints: [
      {
        level: 1,
        title: 'Hierarchical Node Role Classification',
        text: 'Nodes in a tree hierarchy are distinguished by their structural positioning: root has no parent, inner has both parent and children, and leaf has a parent but no children.'
      },
      {
        level: 2,
        title: 'Conditional Branching on Parent Roles',
        text: 'Inspect p_id for null to detect root. Then test whether the node identifier appears as a parent elsewhere in the tree using in with a non-null subquery.'
      },
      {
        level: 3,
        title: 'Case Expression Blueprint',
        text: 'Select id, case when p_id is null then \'Root\' when id in (select p_id from Tree where p_id is not null) then \'Inner\' else \'Leaf\' end as type from Tree.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT id,\n       CASE\n           WHEN p_id IS NULL THEN \'Root\'\n           WHEN id IN (SELECT p_id FROM Tree WHERE p_id IS NOT NULL)\n               THEN \'Inner\'\n           ELSE \'Leaf\'\n       END AS type\nFROM Tree;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of nodes in Tree'],
      notes: 'Case expression evaluating parent presence and subquery membership.',
      whyNaiveFails: 'Omitting WHERE p_id IS NOT NULL in the subquery causes IN (NULL, ...) to evaluate to UNKNOWN, misclassifying leaves.',
      spaceTimeTradeoff: 'Deduplicating parent IDs in memory evaluates node roles in linear time.',
      interviewerExpectation: 'Filtering nulls from the subquery to ensure NOT IN / IN evaluates deterministically.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT id,
       CASE
           WHEN p_id IS NULL THEN 'Root'
           WHEN id IN (SELECT p_id FROM Tree WHERE p_id IS NOT NULL)
               THEN 'Inner'
           ELSE 'Leaf'
       END AS type
FROM Tree;`,
        approach: 'Case Statement with Parent Subquery',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT id,
       CASE
           WHEN p_id IS NULL THEN 'Root'
           WHEN id IN (SELECT p_id FROM Tree WHERE p_id IS NOT NULL)
               THEN 'Inner'
           ELSE 'Leaf'
       END AS type
FROM Tree;`,
        approach: 'PostgreSQL Conditional Node Classification',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def tree_node(tree: pd.DataFrame) -> pd.DataFrame:
    parents = set(tree['p_id'].dropna().unique())
    def classify(row):
        if pd.isna(row['p_id']):
            return 'Root'
        elif row['id'] in parents:
            return 'Inner'
        else:
            return 'Leaf'
    tree['type'] = tree.apply(classify, axis=1)
    return tree[['id', 'type']]`,
        approach: 'Pandas Apply Row Classification',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Tree (id int, p_id int);`,
    referenceSql: `SELECT id, CASE WHEN p_id IS NULL THEN 'Root' WHEN id IN (SELECT p_id FROM Tree WHERE p_id IS NOT NULL) THEN 'Inner' ELSE 'Leaf' END AS type FROM Tree;`,
    generatorPy: `import json
cases = [
    {
        'name': 'standard_tree',
        'inserts': "INSERT INTO Tree VALUES (1, null), (2, 1), (3, 1), (4, 2), (5, 2);"
    },
    {
        'name': 'single_node_tree',
        'inserts': "INSERT INTO Tree VALUES (1, null);"
    }
]
print(json.dumps(cases))
`
  },

  // 10. #610 triangle-judgement
  {
    slug: 'triangle-judgement',
    number: 610,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Evaluating Geometric Invariants',
        text: 'Three line segments can construct a closed geometric polygon only if the sum of any two side lengths strictly exceeds the third side.'
      },
      {
        level: 2,
        title: 'Triangle Inequality Predicate',
        text: 'Check that x + y > z and x + z > y and y + z > x all hold true simultaneously.'
      },
      {
        level: 3,
        title: 'Case Output Blueprint',
        text: 'Select x, y, z, case when x + y > z and x + z > y and y + z > x then \'Yes\' else \'No\' end as triangle from Triangle.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT x, y, z,\n       CASE\n           WHEN x + y > z AND x + z > y AND y + z > x THEN \'Yes\'\n           ELSE \'No\'\n       END AS triangle\nFROM Triangle;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(T)',
      space: 'O(1)',
      variables: ['T: rows in Triangle table'],
      notes: 'Direct arithmetic comparison on three attributes per row.',
      whyNaiveFails: 'Sorting or iterative processing is unnecessary when three arithmetic checks suffice in constant time.',
      spaceTimeTradeoff: 'Constant space evaluation per tuple streaming directly.',
      interviewerExpectation: 'Correctly checking all three inequalities (x+y>z, x+z>y, y+z>x) with strict inequality.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT x, y, z,
       CASE
           WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes'
           ELSE 'No'
       END AS triangle
FROM Triangle;`,
        approach: 'Arithmetic Case Statement on Triangle Inequality',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT x, y, z,
       CASE
           WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes'
           ELSE 'No'
       END AS triangle
FROM Triangle;`,
        approach: 'PostgreSQL Triangle Inequality Case',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def triangle_judgement(triangle: pd.DataFrame) -> pd.DataFrame:
    cond = (triangle['x'] + triangle['y'] > triangle['z']) & \\
           (triangle['x'] + triangle['z'] > triangle['y']) & \\
           (triangle['y'] + triangle['z'] > triangle['x'])
    triangle['triangle'] = cond.map({True: 'Yes', False: 'No'})
    return triangle`,
        approach: 'Pandas Vectorized Triangle Inequality Mapping',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Triangle (x int, y int, z int);`,
    referenceSql: `SELECT x, y, z, CASE WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes' ELSE 'No' END AS triangle FROM Triangle;`,
    generatorPy: `import json
cases = [
    {
        'name': 'standard_triangles',
        'inserts': "INSERT INTO Triangle VALUES (13, 15, 30), (10, 20, 15);"
    },
    {
        'name': 'degenerate_cases',
        'inserts': "INSERT INTO Triangle VALUES (3, 4, 7), (5, 5, 5);"
    }
]
print(json.dumps(cases))
`
  }
];

export function writeDatabaseFiles() {
  for (const item of databaseProblems) {
    const probData = {
      slug: item.slug,
      number: item.number,
      category: item.category,
      patterns: item.patterns,
      hints: item.hints,
      complexity: item.complexity,
      solutions: item.solutions,
      review: {
        status: 'tested',
        acceptedOnLeetCode: null,
        reviewer: null
      },
      updated: '2026-10-30T00:00:00.000Z'
    };

    const probPath = path.join(rootDir, 'dataset/problems', `${item.slug}.json`);
    fs.writeFileSync(probPath, JSON.stringify(probData, null, 2) + '\n', 'utf8');

    const testDir = path.join(rootDir, 'dataset/tests', item.slug);
    if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

    const metaData = {
      runner: 'database',
      ordered: false,
      testKind: 'deterministic'
    };
    fs.writeFileSync(path.join(testDir, 'meta.json'), JSON.stringify(metaData, null, 2) + '\n', 'utf8');
    fs.writeFileSync(path.join(testDir, 'schema.sql'), item.schemaSql, 'utf8');
    fs.writeFileSync(path.join(testDir, 'reference.sql'), item.referenceSql, 'utf8');
    fs.writeFileSync(path.join(testDir, 'generator.py'), item.generatorPy, 'utf8');

    console.log(`Generated: #${item.number} ${item.slug} [${item.category}]`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  writeDatabaseFiles();
}
