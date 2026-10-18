import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');

const PROBLEMS = [
  // 1. rank-scores (#178, Database)
  {
    slug: 'rank-scores',
    number: 178,
    category: 'Database',
    patterns: ['window-ranking'],
    hints: [
      {
        level: 1,
        title: 'Ranking Without Numeric Gaps',
        text: 'Standard competition ranking skips subsequent numbers when ties occur. How can each distinct numerical score receive consecutive rank integers ordered from highest to lowest without leaving any gaps?'
      },
      {
        level: 2,
        title: 'Dense Window Ranking Invariant',
        text: 'A dense ranking function assigns identical ranking positions to tied values while incrementing by exactly one for the next distinct score in the partition.'
      },
      {
        level: 3,
        title: 'Dense Rank Window Specification',
        text: 'Apply the dense ranking window function ordered by score in descending order over the entire table. Assign the column alias rank with identifier delimiters if required by the dialect.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT score, DENSE_RANK() OVER (ORDER BY score DESC) AS `rank`\nFROM Scores;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: total score rows in Scores table'],
      notes: 'Single pass window sort and dense rank assignment across score values.',
      whyNaiveFails: 'Correlated subqueries counting distinct higher scores per row take O(N^2) time, choking on large score tables.',
      spaceTimeTradeoff: 'Window ranking sorts records in O(N log N) time and evaluates rank increments in a single pass using O(N) memory.',
      interviewerExpectation: 'Using DENSE_RANK() instead of RANK() or ROW_NUMBER(), properly aliasing rank using backticks or identifier quotes.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: 'SELECT score, DENSE_RANK() OVER (ORDER BY score DESC) AS `rank`\nFROM Scores;',
        approach: 'Window Dense Rank Function',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'postgresql',
        code: 'SELECT score, DENSE_RANK() OVER (ORDER BY score DESC) AS "rank"\nFROM Scores;',
        approach: 'PostgreSQL Quoted Identifier Dense Rank',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'pythondata',
        code: "import pandas as pd\n\ndef order_scores(scores: pd.DataFrame) -> pd.DataFrame:\n    if scores.empty:\n        return pd.DataFrame(columns=['score', 'rank'])\n    scores['rank'] = scores['score'].rank(method='dense', ascending=False)\n    return scores[['score', 'rank']].sort_values(by='score', ascending=False).reset_index(drop=True)",
        approach: 'Pandas Dense Rank by Score Descending',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ],
    review: { status: 'tested', acceptedOnLeetCode: null, reviewer: null },
    updated: '2026-10-18T00:00:00.000Z'
  },

  // 2. consecutive-numbers (#180, Database)
  {
    slug: 'consecutive-numbers',
    number: 180,
    category: 'Database',
    patterns: ['window-offset'],
    hints: [
      {
        level: 1,
        title: 'Sequential Row Triplet Matching',
        text: 'The table records numbers logged in sequential identifier order. How can you inspect the immediately preceding and succeeding values around each row to identify numbers repeated across at least three continuous occurrences?'
      },
      {
        level: 2,
        title: 'Window Offset Invariant',
        text: 'In an unbroken sequence of three identical numbers ordered by identifier, looking backward one row and forward one row yields the exact same value as the current record.'
      },
      {
        level: 3,
        title: 'Lead and Lag Filtering Procedure',
        text: 'Use window offset functions over sequential identifier order to retrieve the prior value and next value. Wrap in a subquery and select unique numbers where current matches both neighboring values.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT DISTINCT num AS ConsecutiveNums\nFROM (\n    SELECT num,\n           LAG(num, 1) OVER (ORDER BY id) AS prev_num,\n           LEAD(num, 1) OVER (ORDER BY id) AS next_num\n    FROM Logs\n) t\nWHERE num = prev_num AND num = next_num;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: total records in Logs table'],
      notes: 'Window lead and lag offsets over sorted identifier order with distinct result filtering.',
      whyNaiveFails: 'Three-way self-joins (Logs l1 JOIN Logs l2 JOIN Logs l3) assume strictly continuous integer identifiers without gaps and perform quadratic tuple comparisons.',
      spaceTimeTradeoff: 'Window offsets evaluate consecutive rows in O(N log N) sorting time and O(N) memory without Cartesian explosion.',
      interviewerExpectation: 'Handling identifier gaps correctly by sorting or windowing; removing duplicate matches with DISTINCT.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: 'SELECT DISTINCT num AS ConsecutiveNums\nFROM (\n    SELECT num,\n           LAG(num, 1) OVER (ORDER BY id) AS prev_num,\n           LEAD(num, 1) OVER (ORDER BY id) AS next_num\n    FROM Logs\n) t\nWHERE num = prev_num AND num = next_num;',
        approach: 'Window Lead and Lag Functions',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'postgresql',
        code: 'SELECT DISTINCT num AS ConsecutiveNums\nFROM (\n    SELECT num,\n           LAG(num, 1) OVER (ORDER BY id) AS prev_num,\n           LEAD(num, 1) OVER (ORDER BY id) AS next_num\n    FROM Logs\n) t\nWHERE num = prev_num AND num = next_num;',
        approach: 'PostgreSQL Window Offset Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'pythondata',
        code: "import pandas as pd\n\ndef consecutive_numbers(logs: pd.DataFrame) -> pd.DataFrame:\n    if len(logs) < 3:\n        return pd.DataFrame(columns=['ConsecutiveNums'])\n    logs = logs.sort_values(by='id').reset_index(drop=True)\n    logs['prev'] = logs['num'].shift(1)\n    logs['next'] = logs['num'].shift(-1)\n    match = logs[(logs['num'] == logs['prev']) & (logs['num'] == logs['next'])]\n    return pd.DataFrame({'ConsecutiveNums': match['num'].drop_duplicates()})",
        approach: 'Pandas Shift Lead Lag Matching',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ],
    review: { status: 'tested', acceptedOnLeetCode: null, reviewer: null },
    updated: '2026-10-18T00:00:00.000Z'
  },

  // 3. employees-earning-more-than-their-managers (#181, Database)
  {
    slug: 'employees-earning-more-than-their-managers',
    number: 181,
    category: 'Database',
    patterns: ['self-join'],
    hints: [
      {
        level: 1,
        title: 'Comparing Records Within the Same Table',
        text: 'Both workers and their supervisors reside in the same employee table. How can you connect each worker record with the corresponding supervisor record using the supervisory foreign key?'
      },
      {
        level: 2,
        title: 'Self-Join Relationship Invariant',
        text: 'A self-join treats the same table as two separate entities: one representing workers and the other representing supervisors, connected by manager identifier matching primary identifier.'
      },
      {
        level: 3,
        title: 'Inner Self-Join Filtering Procedure',
        text: 'Perform an inner join of Employee to itself on worker manager identifier equals supervisor identifier. Filter for records where worker compensation exceeds supervisor compensation, and select the worker name.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT e.name AS Employee\nFROM Employee e\nJOIN Employee m ON e.managerId = m.id\nWHERE e.salary > m.salary;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: total rows in Employee table'],
      notes: 'Equi-join on primary key index with salary predicate filter.',
      whyNaiveFails: 'Correlated scalar subqueries inside a SELECT or WHERE clause execute once per row, resulting in O(N^2) evaluation without index caching.',
      spaceTimeTradeoff: 'An inner self-join on indexed id requires O(N) time with O(1) extra space or O(N) hash join memory.',
      interviewerExpectation: 'Clear aliasing of worker versus supervisor tables; recognizing inner join excludes employees without managers.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: 'SELECT e.name AS Employee\nFROM Employee e\nJOIN Employee m ON e.managerId = m.id\nWHERE e.salary > m.salary;',
        approach: 'Self-Join on Manager Identifier',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'postgresql',
        code: 'SELECT e.name AS Employee\nFROM Employee e\nJOIN Employee m ON e.managerId = m.id\nWHERE e.salary > m.salary;',
        approach: 'PostgreSQL Self-Join on Primary Key',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'pythondata',
        code: "import pandas as pd\n\ndef find_employees(employee: pd.DataFrame) -> pd.DataFrame:\n    merged = employee.merge(employee, left_on='managerId', right_on='id', suffixes=('_emp', '_mgr'))\n    res = merged[merged['salary_emp'] > merged['salary_mgr']]\n    return res[['name_emp']].rename(columns={'name_emp': 'Employee'})",
        approach: 'Pandas Self-Merge on Manager Identifier',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ],
    review: { status: 'tested', acceptedOnLeetCode: null, reviewer: null },
    updated: '2026-10-18T00:00:00.000Z'
  },

  // 4. duplicate-emails (#182, Database)
  {
    slug: 'duplicate-emails',
    number: 182,
    category: 'Database',
    patterns: ['having-filter'],
    hints: [
      {
        level: 1,
        title: 'Aggregating by Value Occurrence',
        text: 'Some email entries appear multiple times while others are unique. How can you group identical string values together and filter for only those groups that appear with a frequency greater than one?'
      },
      {
        level: 2,
        title: 'Grouped Count Invariant',
        text: 'Grouping by a field combines identical values into singular buckets. Filtering aggregated group sizes requires a post-aggregation filter condition rather than a row-level filter.'
      },
      {
        level: 3,
        title: 'Group By with Having Filter Procedure',
        text: 'Group the Person records by email. Apply a having clause specifying that the count of records in each email bucket exceeds one, and project the email attribute.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT email AS Email\nFROM Person\nGROUP BY email\nHAVING COUNT(email) > 1;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(U)',
      variables: ['N: total rows in Person', 'U: unique email addresses'],
      notes: 'Single pass hash or index grouping with having count filter.',
      whyNaiveFails: 'Cross joins or correlated subqueries checking for another record with the same email take O(N^2) time.',
      spaceTimeTradeoff: 'Group by with having processes all rows in O(N) time with O(U) auxiliary space for group counts.',
      interviewerExpectation: 'Distinguishing between where and having clauses; understanding post-aggregation filter semantics.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: 'SELECT email AS Email\nFROM Person\nGROUP BY email\nHAVING COUNT(email) > 1;',
        approach: 'Aggregation with Having Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'postgresql',
        code: 'SELECT email AS Email\nFROM Person\nGROUP BY email\nHAVING COUNT(email) > 1;',
        approach: 'PostgreSQL Group By Having Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'pythondata',
        code: "import pandas as pd\n\ndef duplicate_emails(person: pd.DataFrame) -> pd.DataFrame:\n    dup = person[person.duplicated(subset=['email'])]\n    return pd.DataFrame({'Email': dup['email'].drop_duplicates()})",
        approach: 'Pandas Duplicated Mask Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ],
    review: { status: 'tested', acceptedOnLeetCode: null, reviewer: null },
    updated: '2026-10-18T00:00:00.000Z'
  },

  // 5. customers-who-never-order (#183, Database)
  {
    slug: 'customers-who-never-order',
    number: 183,
    category: 'Database',
    patterns: ['anti-join'],
    hints: [
      {
        level: 1,
        title: 'Detecting Missing Foreign References',
        text: 'Every purchase references a customer identifier in the orders table. How can you inspect all registered users and identify those who have zero corresponding foreign key records in the purchases table?'
      },
      {
        level: 2,
        title: 'Anti-Join Null Invariant',
        text: 'A left outer join retains all primary table records. Rows without a match in the secondary table populate secondary columns with null, allowing an anti-join filter.'
      },
      {
        level: 3,
        title: 'Left Join Null Filter Procedure',
        text: 'Perform a left join from Customers to Orders on customer identifier. In the where clause, filter for records where the joined order identifier is null, and select the customer name.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT c.name AS Customers\nFROM Customers c\nLEFT JOIN Orders o ON c.id = o.customerId\nWHERE o.customerId IS NULL;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(C + O_cnt)',
      space: 'O(C)',
      variables: ['C: total Customers rows', 'O_cnt: total Orders rows'],
      notes: 'Single pass outer hash or index join with null foreign key filter.',
      whyNaiveFails: 'Using NOT IN with a subquery fails catastrophically or produces null if any order customerId contains a NULL value in SQL.',
      spaceTimeTradeoff: 'A left outer join with IS NULL filter streams in O(C + O_cnt) time and requires O(C) memory for hash matching.',
      interviewerExpectation: 'Knowing the pitfall of NOT IN with NULLs; preferring LEFT JOIN / IS NULL or NOT EXISTS for robustness.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: 'SELECT c.name AS Customers\nFROM Customers c\nLEFT JOIN Orders o ON c.id = o.customerId\nWHERE o.customerId IS NULL;',
        approach: 'Left Outer Join Anti-Join Pattern',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'postgresql',
        code: 'SELECT c.name AS Customers\nFROM Customers c\nLEFT JOIN Orders o ON c.id = o.customerId\nWHERE o.customerId IS NULL;',
        approach: 'PostgreSQL Outer Anti-Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'pythondata',
        code: "import pandas as pd\n\ndef find_customers(customers: pd.DataFrame, orders: pd.DataFrame) -> pd.DataFrame:\n    merged = customers.merge(orders, left_on='id', right_on='customerId', how='left')\n    no_orders = merged[merged['customerId'].isna()]\n    return no_orders[['name']].rename(columns={'name': 'Customers'})",
        approach: 'Pandas Left Merge with Null Filtering',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ],
    review: { status: 'tested', acceptedOnLeetCode: null, reviewer: null },
    updated: '2026-10-18T00:00:00.000Z'
  },

  // 6. department-top-three-salaries (#185, Database)
  {
    slug: 'department-top-three-salaries',
    number: 185,
    category: 'Database',
    patterns: ['window-ranking'],
    hints: [
      {
        level: 1,
        title: 'Partitioned Multi-Level High Earners',
        text: 'Each organizational division has multiple earners and potentially tied salaries. How can you rank compensation independently within each division so that up to three distinct top amounts are included?'
      },
      {
        level: 2,
        title: 'Partitioned Dense Rank Invariant',
        text: 'Dense ranking partitioned by department identifier orders salaries within each group independently, ensuring tied earners share rank without consuming subsequent rank slots.'
      },
      {
        level: 3,
        title: 'Partitioned Window Join Procedure',
        text: 'In a subquery, compute dense rank partitioned by department identifier ordered by salary descending. Join with Department on department identifier and filter where rank is at most three.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT d.name AS Department, e.name AS Employee, e.salary AS Salary\nFROM (\n    SELECT name, salary, departmentId,\n           DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) AS rnk\n    FROM Employee\n) e\nJOIN Department d ON e.departmentId = d.id\nWHERE e.rnk <= 3;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: total employees across all departments'],
      notes: 'Partitioned window dense rank with inner join to Department table.',
      whyNaiveFails: 'Correlated self-joins counting distinct higher salaries take O(N^2) time, which times out on departments with thousands of employees.',
      spaceTimeTradeoff: 'Window partitioning sorts each department group in O(N log N) overall time and O(N) memory.',
      interviewerExpectation: 'Using DENSE_RANK() with PARTITION BY; joining with department table to present department name.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: 'SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary\nFROM (\n    SELECT name, salary, departmentId,\n           DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) AS rnk\n    FROM Employee\n) e\nJOIN Department d ON e.departmentId = d.id\nWHERE e.rnk <= 3;',
        approach: 'Partitioned Dense Window Rank',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'postgresql',
        code: 'SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary\nFROM (\n    SELECT name, salary, departmentId,\n           DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) AS rnk\n    FROM Employee\n) e\nJOIN Department d ON e.departmentId = d.id\nWHERE e.rnk <= 3;',
        approach: 'PostgreSQL Partitioned Window Rank',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'pythondata',
        code: "import pandas as pd\n\ndef top_three_salaries(employee: pd.DataFrame, department: pd.DataFrame) -> pd.DataFrame:\n    if employee.empty or department.empty:\n        return pd.DataFrame(columns=['Department', 'Employee', 'Salary'])\n    merged = employee.merge(department, left_on='departmentId', right_on='id', suffixes=('', '_dept'))\n    merged['rnk'] = merged.groupby('departmentId')['salary'].rank(method='dense', ascending=False)\n    top3 = merged[merged['rnk'] <= 3]\n    return top3[['name_dept', 'name', 'salary']].rename(columns={'name_dept': 'Department', 'name': 'Employee', 'salary': 'Salary'})",
        approach: 'Pandas Groupby Dense Rank Top Three',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ],
    review: { status: 'tested', acceptedOnLeetCode: null, reviewer: null },
    updated: '2026-10-18T00:00:00.000Z'
  },

  // 7. managers-with-at-least-5-direct-reports (#570, Database)
  {
    slug: 'managers-with-at-least-5-direct-reports',
    number: 570,
    category: 'Database',
    patterns: ['having-filter'],
    hints: [
      {
        level: 1,
        title: 'Threshold Reporting Relationship Count',
        text: 'Workers cite their supervisor by manager identifier. How can you aggregate the number of times each supervisor identifier is referenced and filter for those supervising at least five individuals?'
      },
      {
        level: 2,
        title: 'Aggregation Threshold Invariant',
        text: 'Grouping worker records by manager identifier aggregates direct report tallies. Managers having at least five reports qualify when joined back to their primary identifier.'
      },
      {
        level: 3,
        title: 'Self-Join Grouping Procedure',
        text: 'Join Employee worker records to Employee manager records on worker manager identifier equals manager identifier. Group by manager identifier and name, applying having count of workers at least five.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT m.name\nFROM Employee e\nJOIN Employee m ON e.managerId = m.id\nGROUP BY m.id, m.name\nHAVING COUNT(e.id) >= 5;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(M)',
      variables: ['N: total employees', 'M: unique managers'],
      notes: 'Equi-join on manager identifier with aggregation threshold filter.',
      whyNaiveFails: 'Correlated subqueries scanning the entire table for report counts per person scale quadratically as O(N^2).',
      spaceTimeTradeoff: 'Group by with having clause aggregates in single pass O(N) time with O(M) hash map storage.',
      interviewerExpectation: 'Correctly grouping by manager identity to avoid name collisions; applying having count threshold.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: 'SELECT m.name\nFROM Employee e\nJOIN Employee m ON e.managerId = m.id\nGROUP BY m.id, m.name\nHAVING COUNT(e.id) >= 5;',
        approach: 'Join Aggregation with Having Threshold',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'postgresql',
        code: 'SELECT m.name\nFROM Employee e\nJOIN Employee m ON e.managerId = m.id\nGROUP BY m.id, m.name\nHAVING COUNT(e.id) >= 5;',
        approach: 'PostgreSQL Join Having Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'pythondata',
        code: "import pandas as pd\n\ndef find_managers(employee: pd.DataFrame) -> pd.DataFrame:\n    counts = employee.groupby('managerId').size().reset_index(name='report_count')\n    eligible = counts[counts['report_count'] >= 5]\n    res = eligible.merge(employee, left_on='managerId', right_on='id')\n    return res[['name']]",
        approach: 'Pandas Groupby Size Merge Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ],
    review: { status: 'tested', acceptedOnLeetCode: null, reviewer: null },
    updated: '2026-10-18T00:00:00.000Z'
  },

  // 8. classes-more-than-5-students (#596, Database)
  {
    slug: 'classes-more-than-5-students',
    number: 596,
    category: 'Database',
    patterns: ['having-filter'],
    hints: [
      {
        level: 1,
        title: 'Class Enrollment Aggregation',
        text: 'The table records student enrollments across distinct courses. How can you group enrollment records by academic course and filter for courses that contain at least five enrolled students?'
      },
      {
        level: 2,
        title: 'Course Size Invariant',
        text: 'Grouping by course name consolidates student enrollments into singular course aggregates whose size can be filtered with a post-aggregation clause.'
      },
      {
        level: 3,
        title: 'Group By Course Having Procedure',
        text: 'Group the Courses records by class name. Filter using a having clause where count of student is at least five, and select the class column.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT class\nFROM Courses\nGROUP BY class\nHAVING COUNT(student) >= 5;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(C)',
      variables: ['N: total enrollment pairs', 'C: unique classes'],
      notes: 'Single pass group by aggregation with having count filter.',
      whyNaiveFails: 'Scanning all student rows repeatedly for each distinct class takes O(C * N) time.',
      spaceTimeTradeoff: 'Group by with having aggregates courses in O(N) time with O(C) memory for course buckets.',
      interviewerExpectation: 'Properly grouping by class; filtering with having count >= 5.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: 'SELECT class\nFROM Courses\nGROUP BY class\nHAVING COUNT(student) >= 5;',
        approach: 'Group By Having Student Threshold',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'postgresql',
        code: 'SELECT class\nFROM Courses\nGROUP BY class\nHAVING COUNT(student) >= 5;',
        approach: 'PostgreSQL Class Enrollment Having Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'pythondata',
        code: "import pandas as pd\n\ndef find_classes(courses: pd.DataFrame) -> pd.DataFrame:\n    counts = courses.groupby('class').size().reset_index(name='count')\n    return counts[counts['count'] >= 5][['class']]",
        approach: 'Pandas Groupby Size Threshold Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ],
    review: { status: 'tested', acceptedOnLeetCode: null, reviewer: null },
    updated: '2026-10-18T00:00:00.000Z'
  },

  // 9. select-data (#2880, pandas)
  {
    slug: 'select-data',
    number: 2880,
    category: 'pandas',
    patterns: ['filter-select'],
    hints: [
      {
        level: 1,
        title: 'Targeted Record Column Selection',
        text: 'A student roster stores multiple attributes across many rows. How can you isolate the exact student matching a target numerical identifier and extract only their name and age columns?'
      },
      {
        level: 2,
        title: 'Boolean Indexing Invariant',
        text: 'Filtering rows using a boolean comparison mask isolates records where the predicate holds true, followed by column subset projection.'
      },
      {
        level: 3,
        title: 'Mask and Projection Procedure',
        text: 'Construct a boolean mask comparing student identifier column to one hundred and one. Index the DataFrame with the mask and project the name and age column list.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport pandas as pd\n\ndef selectData(students: pd.DataFrame) -> pd.DataFrame:\n    return students[students[\'student_id\'] == 101][[\'name\', \'age\']]\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: total student rows'],
      notes: 'Vectorized boolean filtering and column subset projection.',
      whyNaiveFails: 'Row-by-row iteration with iterrows() incurs Python overhead and takes orders of magnitude longer than vectorized indexing.',
      spaceTimeTradeoff: 'Boolean vector indexing creates a lightweight view or filtered copy in O(N) time with minimal auxiliary memory.',
      interviewerExpectation: 'Idiomatic boolean indexing and column projection in pandas; clean return DataFrame.'
    },
    solutions: [
      {
        lang: 'pythondata',
        code: "import pandas as pd\n\ndef selectData(students: pd.DataFrame) -> pd.DataFrame:\n    return students[students['student_id'] == 101][['name', 'age']]",
        approach: 'Vectorized Boolean Mask and Projection',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ],
    review: { status: 'tested', acceptedOnLeetCode: null, reviewer: null },
    updated: '2026-10-18T00:00:00.000Z'
  },

  // 10. create-a-new-column (#2881, pandas)
  {
    slug: 'create-a-new-column',
    number: 2881,
    category: 'pandas',
    patterns: ['vectorize-apply'],
    hints: [
      {
        level: 1,
        title: 'Deriving a New Column from Existing Attributes',
        text: 'Employee compensation is stored in a salary attribute. How can you calculate a doubled compensation amount for every row and attach the result as a new column labeled bonus?'
      },
      {
        level: 2,
        title: 'Vectorized Arithmetic Assignment Invariant',
        text: 'Arithmetic operations on pandas Series operate element-wise in C without Python loop overhead, allowing direct assignment to new column names.'
      },
      {
        level: 3,
        title: 'Vectorized Column Creation Procedure',
        text: 'Assign a new bonus column on the DataFrame set to the salary column multiplied by two. Return the updated DataFrame.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport pandas as pd\n\ndef createBonusColumn(employees: pd.DataFrame) -> pd.DataFrame:\n    employees[\'bonus\'] = employees[\'salary\'] * 2\n    return employees\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: total employee rows'],
      notes: 'Vectorized column multiplication and assignment in contiguous memory.',
      whyNaiveFails: 'Using apply() with a lambda or iterating with a loop introduces heavy interpreter overhead compared to vectorized Series arithmetic.',
      spaceTimeTradeoff: 'Direct vectorized column assignment scales linearly in O(N) time and allocates an O(N) Series.',
      interviewerExpectation: 'Using vectorized multiplication rather than apply(lambda x: x * 2).'
    },
    solutions: [
      {
        lang: 'pythondata',
        code: "import pandas as pd\n\ndef createBonusColumn(employees: pd.DataFrame) -> pd.DataFrame:\n    employees['bonus'] = employees['salary'] * 2\n    return employees",
        approach: 'Vectorized Column Multiplication',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ],
    review: { status: 'tested', acceptedOnLeetCode: null, reviewer: null },
    updated: '2026-10-18T00:00:00.000Z'
  },

  // 11. modify-columns (#2884, pandas)
  {
    slug: 'modify-columns',
    number: 2884,
    category: 'pandas',
    patterns: ['vectorize-apply'],
    hints: [
      {
        level: 1,
        title: 'In-Place Column Value Transformation',
        text: 'Existing employee salary values need to be updated to twice their current magnitude. How can you modify the column values directly using vectorized calculations?'
      },
      {
        level: 2,
        title: 'Column Overwrite Invariant',
        text: 'Assigning a transformed Series back to an existing column key overwrites the data in-place without altering the remaining table structure.'
      },
      {
        level: 3,
        title: 'Vectorized Overwrite Procedure',
        text: 'Multiply the salary column Series by two and reassign the result to the salary column of the employees DataFrame. Return the modified DataFrame.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport pandas as pd\n\ndef modifySalaryColumn(employees: pd.DataFrame) -> pd.DataFrame:\n    employees[\'salary\'] = employees[\'salary\'] * 2\n    return employees\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: total rows in DataFrame'],
      notes: 'In-place vectorized column transformation.',
      whyNaiveFails: 'Iterating over rows to update values individually triggers chained indexing warnings and degrades execution speed.',
      spaceTimeTradeoff: 'In-place column multiplication executes in O(N) time with O(1) auxiliary memory beyond the overwritten column.',
      interviewerExpectation: 'Reassigning directly to df[col] with vectorized multiplication; avoiding chained assignment.'
    },
    solutions: [
      {
        lang: 'pythondata',
        code: "import pandas as pd\n\ndef modifySalaryColumn(employees: pd.DataFrame) -> pd.DataFrame:\n    employees['salary'] = employees['salary'] * 2\n    return employees",
        approach: 'In-Place Vectorized Column Modification',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ],
    review: { status: 'tested', acceptedOnLeetCode: null, reviewer: null },
    updated: '2026-10-18T00:00:00.000Z'
  },

  // 12. fill-missing-data (#2887, pandas)
  {
    slug: 'fill-missing-data',
    number: 2887,
    category: 'pandas',
    patterns: ['cleaning-nulls-duplicates'],
    hints: [
      {
        level: 1,
        title: 'Null Value Imputation',
        text: 'Certain inventory records have missing numerical quantities represented as null. How can you substitute missing values in a specific attribute with zero while keeping all other values unchanged?'
      },
      {
        level: 2,
        title: 'Null Imputation Invariant',
        text: 'Imputing missing values with a designated default preserves the total row count and replaces null tokens without mutating valid non-null entries.'
      },
      {
        level: 3,
        title: 'Fillna Application Procedure',
        text: 'Invoke the fillna method on the quantity Series passing zero as the replacement argument. Reassign the result to the quantity column and return the DataFrame.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport pandas as pd\n\ndef fillMissingValues(products: pd.DataFrame) -> pd.DataFrame:\n    products[\'quantity\'] = products[\'quantity\'].fillna(0)\n    return products\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: total product rows'],
      notes: 'Single pass vectorized null imputation on targeted Series.',
      whyNaiveFails: 'Manual iteration checking for NaN values is slow and prone to type mismatch errors with floating point NaN representations.',
      spaceTimeTradeoff: 'Series.fillna(0) scans contiguous column memory in O(N) time with O(1) auxiliary space.',
      interviewerExpectation: 'Targeting only the specified column rather than calling fillna on the entire DataFrame.'
    },
    solutions: [
      {
        lang: 'pythondata',
        code: "import pandas as pd\n\ndef fillMissingValues(products: pd.DataFrame) -> pd.DataFrame:\n    products['quantity'] = products['quantity'].fillna(0)\n    return products",
        approach: 'Series Null Value Imputation with fillna',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ],
    review: { status: 'tested', acceptedOnLeetCode: null, reviewer: null },
    updated: '2026-10-18T00:00:00.000Z'
  },

  // 13. function-composition (#2629, JavaScript)
  {
    slug: 'function-composition',
    number: 2629,
    category: 'JavaScript',
    patterns: ['higher-order-functions'],
    hints: [
      {
        level: 1,
        title: 'Sequential Function Pipeline Execution',
        text: 'A series of mathematical functions must be evaluated in right-to-left order, feeding the output of each function as input to the next. How can an array of functions be collapsed into a single composed function?'
      },
      {
        level: 2,
        title: 'Right-to-Left Reduction Invariant',
        text: 'Function composition evaluates the rightmost function first and folds the result through successive functions toward the leftmost index.'
      },
      {
        level: 3,
        title: 'ReduceRight Composition Procedure',
        text: 'Return a function accepting input x. Within it, call reduceRight on the functions array starting with accumulator x, updating accumulator with the result of calling each function.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Function[]} functions\n * @return {Function}\n */\nvar compose = function(functions) {\n    return function(x) {\n        return functions.reduceRight((acc, fn) => fn(acc), x);\n    };\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: number of functions in composition array'],
      notes: 'Linear pipeline execution from right to left using reduceRight.',
      whyNaiveFails: 'Evaluating from left-to-right violates mathematical function composition f(g(x)), producing wrong results when operations are non-commutative.',
      spaceTimeTradeoff: 'Iterative reduction requires O(N) evaluation time and O(1) auxiliary memory beyond the returned closure.',
      interviewerExpectation: 'Understanding reduceRight semantics; handling empty function array by returning the identity function x.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: '/**\n * @param {Function[]} functions\n * @return {Function}\n */\nvar compose = function(functions) {\n    return function(x) {\n        return functions.reduceRight((acc, fn) => fn(acc), x);\n    };\n};',
        approach: 'Right-to-Left Reducer Pipeline',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'typescript',
        code: 'type F = (x: number) => number;\n\nfunction compose(functions: F[]): F {\n    return function(x: number): number {\n        return functions.reduceRight((acc, fn) => fn(acc), x);\n    };\n}',
        approach: 'TypeScript Higher-Order Reducer Composition',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ],
    review: { status: 'tested', acceptedOnLeetCode: null, reviewer: null },
    updated: '2026-10-18T00:00:00.000Z'
  },

  // 14. filter-elements-from-array (#2634, JavaScript)
  {
    slug: 'filter-elements-from-array',
    number: 2634,
    category: 'JavaScript',
    patterns: ['array-prototype-methods'],
    hints: [
      {
        level: 1,
        title: 'Conditional Element Retention',
        text: 'Each element in an array must be tested against a predicate function without using built-in library filter methods. How can you examine every item alongside its index and collect only qualifying values?'
      },
      {
        level: 2,
        title: 'Predicate Truthiness Invariant',
        text: 'The predicate function evaluates both item value and index position. Only elements for which the predicate returns a truthy evaluation must be retained in sequential order.'
      },
      {
        level: 3,
        title: 'Iterative Push Procedure',
        text: 'Initialize an empty result array. Iterate through the input array by index, calling the callback with element and index. If the return value is truthy, push the element into result.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {number[]} arr\n * @param {Function} fn\n * @return {number[]}\n */\nvar filter = function(arr, fn) {\n    const res = [];\n    for (let i = 0; i < arr.length; ++i) {\n        if (fn(arr[i], i)) {\n            res.push(arr[i]);\n        }\n    }\n    return res;\n};\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: length of input array'],
      notes: 'Single pass iterative predicate evaluation collecting truthy matches.',
      whyNaiveFails: 'Using strict equality check === true fails on truthy non-boolean values (e.g. non-zero numbers, strings, objects). Built-in Array.prototype.filter is forbidden by problem constraints.',
      spaceTimeTradeoff: 'Iterative loop performs N predicate checks in O(N) time and allocates up to O(N) space for filtered elements.',
      interviewerExpectation: 'Passing both element and index (arr[i], i) to the callback; handling truthy rather than strictly boolean returns.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: '/**\n * @param {number[]} arr\n * @param {Function} fn\n * @return {number[]}\n */\nvar filter = function(arr, fn) {\n    const res = [];\n    for (let i = 0; i < arr.length; ++i) {\n        if (fn(arr[i], i)) {\n            res.push(arr[i]);\n        }\n    }\n    return res;\n};',
        approach: 'Iterative Truthiness Array Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'typescript',
        code: 'type Fn = (n: number, i: number) => any;\n\nfunction filter(arr: number[], fn: Fn): number[] {\n    const res: number[] = [];\n    for (let i = 0; i < arr.length; ++i) {\n        if (fn(arr[i], i)) {\n            res.push(arr[i]);\n        }\n    }\n    return res;\n}',
        approach: 'TypeScript Predicate Array Filtering',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ],
    review: { status: 'tested', acceptedOnLeetCode: null, reviewer: null },
    updated: '2026-10-18T00:00:00.000Z'
  },

  // 15. memoize (#2623, JavaScript)
  {
    slug: 'memoize',
    number: 2623,
    category: 'JavaScript',
    patterns: ['closures'],
    hints: [
      {
        level: 1,
        title: 'Function Call Deduplication',
        text: 'A pure function may be invoked repeatedly with identical inputs. How can you intercept function calls and return previously computed values so the underlying logic runs only once per unique input combination?'
      },
      {
        level: 2,
        title: 'Closure Cache Invariant',
        text: 'Enclosing a persistent lookup structure inside a wrapper function allows previous input-output pairs to persist across invocations.'
      },
      {
        level: 3,
        title: 'Key Serialization and Cache Lookup Procedure',
        text: 'Instantiate a cache inside the outer function. Inside the returned wrapper, serialize argument values into a string key. Check cache presence: return cached value if present, else evaluate, store, and return.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```javascript\n/**\n * @param {Function} fn\n * @return {Function}\n */\nfunction memoize(fn) {\n    const cache = new Map();\n    return function(...args) {\n        const key = JSON.stringify(args);\n        if (cache.has(key)) {\n            return cache.get(key);\n        }\n        const res = fn(...args);\n        cache.set(key, res);\n        return res;\n    };\n}\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) amortized',
      space: 'O(U)',
      variables: ['U: unique argument tuples seen during execution'],
      notes: 'O(1) amortized lookup per call using serialized argument cache in Map closure.',
      whyNaiveFails: 'Evaluating expensive functions repeatedly without caching wastes computation on duplicate calls, causing timeouts.',
      spaceTimeTradeoff: 'Trade O(U) cache memory for instant O(1) amortized returns on subsequent calls with previously seen argument tuples.',
      interviewerExpectation: 'Creating a closure around a Map; correctly serializing variable-length arguments; preserving return values.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: '/**\n * @param {Function} fn\n * @return {Function}\n */\nfunction memoize(fn) {\n    const cache = new Map();\n    return function(...args) {\n        const key = JSON.stringify(args);\n        if (cache.has(key)) {\n            return cache.get(key);\n        }\n        const res = fn(...args);\n        cache.set(key, res);\n        return res;\n    };\n}',
        approach: 'Closure Map Argument Serialization Cache',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'typescript',
        code: 'type Fn = (...params: number[]) => number;\n\nfunction memoize(fn: Fn): Fn {\n    const cache = new Map<string, number>();\n    return function(...args: number[]): number {\n        const key = JSON.stringify(args);\n        if (cache.has(key)) {\n            return cache.get(key)!;\n        }\n        const res = fn(...args);\n        cache.set(key, res);\n        return res;\n    };\n}',
        approach: 'TypeScript Memoization Closure',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ],
    review: { status: 'tested', acceptedOnLeetCode: null, reviewer: null },
    updated: '2026-10-18T00:00:00.000Z'
  }
];

function main() {
  const problemsDir = path.join(rootDir, 'dataset', 'problems');
  if (!fs.existsSync(problemsDir)) {
    fs.mkdirSync(problemsDir, { recursive: true });
  }

  for (const prob of PROBLEMS) {
    const filePath = path.join(problemsDir, `${prob.slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(prob, null, 2) + '\n', 'utf8');
    console.log(`✓ Wrote ${filePath}`);
  }

  console.log(`\nSuccessfully wrote ${PROBLEMS.length} problem JSON files for Batch 5.`);
}

main();
