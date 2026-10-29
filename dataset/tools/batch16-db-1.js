export const batch16Db1 = [
  // 1. #603 consecutive-available-seats
  {
    slug: 'consecutive-available-seats',
    number: 603,
    category: 'Database',
    patterns: ['window-offset'],
    hints: [
      {
        level: 1,
        title: 'Adjacent Available Seat Verification',
        text: 'Identify seats that are available and situated adjacent to another available seat on either side.'
      },
      {
        level: 2,
        title: 'Self-Join or Window Boundary Offset',
        text: 'Join the table with itself on consecutive identifier differences of one, filtering records where both seats are free.'
      },
      {
        level: 3,
        title: 'Consecutive Seats Blueprint',
        text: 'select distinct a.seat_id from Cinema a join Cinema b on abs(a.seat_id - b.seat_id) = 1 where a.free = 1 and b.free = 1 order by a.seat_id asc.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT DISTINCT a.seat_id\nFROM Cinema a\nJOIN Cinema b ON ABS(a.seat_id - b.seat_id) = 1\nWHERE a.free = 1 AND b.free = 1\nORDER BY a.seat_id ASC;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: number of records in Cinema table'],
      notes: 'Equi-join on adjacent seat distance and sorting distinct seats executes in linear-logarithmic time.',
      whyNaiveFails: 'Scanning all combinations without adjacency predicates creates full quadratic row scans.',
      spaceTimeTradeoff: 'Self-join on absolute difference 1 avoids complex multi-row grouping.',
      interviewerExpectation: 'Use of ABS difference or LEAD/LAG window functions to check neighboring seats.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT DISTINCT a.seat_id
FROM Cinema a
JOIN Cinema b ON ABS(a.seat_id - b.seat_id) = 1
WHERE a.free = 1 AND b.free = 1
ORDER BY a.seat_id ASC;`,
        approach: 'Self Join on Adjacent Seat Identifiers',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT DISTINCT a.seat_id
FROM Cinema a
JOIN Cinema b ON ABS(a.seat_id - b.seat_id) = 1
WHERE a.free = 1 AND b.free = 1
ORDER BY a.seat_id ASC;`,
        approach: 'PostgreSQL Distance Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def consecutive_available_seats(cinema: pd.DataFrame) -> pd.DataFrame:
    df = cinema.sort_values(by='seat_id')
    free = df['free'] == 1
    prev_free = free.shift(1, fill_value=False)
    next_free = free.shift(-1, fill_value=False)
    res = df[free & (prev_free | next_free)]
    return res[['seat_id']]`,
        approach: 'Pandas Shift Boolean Masking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Cinema (seat_id int, free int);`,
    referenceSql: `SELECT DISTINCT a.seat_id FROM Cinema a JOIN Cinema b ON ABS(a.seat_id - b.seat_id) = 1 WHERE a.free = 1 AND b.free = 1 ORDER BY a.seat_id ASC;`,
    generatorPy: `import json
cases = [
    {
        "Cinema": [
            {"seat_id": 1, "free": 1},
            {"seat_id": 2, "free": 0},
            {"seat_id": 3, "free": 1},
            {"seat_id": 4, "free": 1},
            {"seat_id": 5, "free": 1}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 2. #612 shortest-distance-in-a-plane
  {
    slug: 'shortest-distance-in-a-plane',
    number: 612,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Euclidean Planar Coordinate Pair Distance',
        text: 'Compute planar distance between distinct coordinate points and return the minimum rounded to two decimal places.'
      },
      {
        level: 2,
        title: 'Non-Identical Point Self-Join',
        text: 'Join table with itself on points having distinct coordinates to prevent zero distance self-comparison, then apply the Euclidean metric.'
      },
      {
        level: 3,
        title: 'Shortest Distance Blueprint',
        text: 'select round(min(sqrt(power(p1.x - p2.x, 2) + power(p1.y - p2.y, 2))), 2) as shortest from Point2D p1 join Point2D p2 on (p1.x <> p2.x or p1.y <> p2.y).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT ROUND(MIN(SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2))), 2) AS shortest\nFROM Point2D p1\nJOIN Point2D p2 ON (p1.x <> p2.x OR p1.y <> p2.y);\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N^2)',
      space: 'O(1)',
      variables: ['N: number of coordinate points in Point2D'],
      notes: 'Evaluating pairwise Euclidean combinations across distinct point tuples takes quadratic time.',
      whyNaiveFails: 'Joining without distinct coordinate inequality evaluates zero-distance self pairs.',
      spaceTimeTradeoff: 'Scalar min aggregation collapses quadratic combinations into a single float metric.',
      interviewerExpectation: 'Use of SQRT and POW mathematical functions with proper inequality join filter.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT ROUND(MIN(SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2))), 2) AS shortest
FROM Point2D p1
JOIN Point2D p2 ON (p1.x <> p2.x OR p1.y <> p2.y);`,
        approach: 'Pairwise Self-Join Euclidean Distance',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT ROUND(MIN(SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2)))::numeric, 2)::double precision AS shortest
FROM Point2D p1
JOIN Point2D p2 ON (p1.x <> p2.x OR p1.y <> p2.y);`,
        approach: 'PostgreSQL Euclidean Distance Minima',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd
import numpy as np

def shortest_distance(point2_d: pd.DataFrame) -> pd.DataFrame:
    df = point2_d.copy()
    pts = df[['x', 'y']].values
    if len(pts) < 2:
        return pd.DataFrame({'shortest': [None]})
    min_dist = float('inf')
    for i in range(len(pts)):
        for j in range(i + 1, len(pts)):
            d = np.sqrt((pts[i][0] - pts[j][0])**2 + (pts[i][1] - pts[j][1])**2)
            if d < min_dist:
                min_dist = d
    return pd.DataFrame({'shortest': [round(float(min_dist), 2)]})`,
        approach: 'Pairwise Euclidean Distance Minimum Computation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Point2D (x int, y int);`,
    referenceSql: `SELECT ROUND(MIN(SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2))), 2) AS shortest FROM Point2D p1 JOIN Point2D p2 ON (p1.x <> p2.x OR p1.y <> p2.y);`,
    generatorPy: `import json
cases = [
    {
        "Point2D": [
            {"x": -1, "y": -1},
            {"x": 0, "y": 0},
            {"x": -1, "y": -2}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 3. #613 shortest-distance-in-a-line
  {
    slug: 'shortest-distance-in-a-line',
    number: 613,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'One-Dimensional Point Absolute Delta Minima',
        text: 'Compute the absolute difference between all pairs of distinct point locations and take the minimum.'
      },
      {
        level: 2,
        title: 'Distinct Point Pair Inequality Join',
        text: 'Join table with itself on p1.x < p2.x to compare each unique pair of points exactly once, then take min(p2.x - p1.x).'
      },
      {
        level: 3,
        title: 'Shortest Distance Blueprint',
        text: 'select min(p2.x - p1.x) as shortest from Point p1 join Point p2 on p1.x < p2.x.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT MIN(p2.x - p1.x) AS shortest\nFROM Point p1\nJOIN Point p2 ON p1.x < p2.x;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N^2)',
      space: 'O(1)',
      variables: ['N: number of points in Point table'],
      notes: 'Pairwise inequality join evaluates all unordered pairs in quadratic time.',
      whyNaiveFails: 'Self joining on equality produces zero distance trivial matches.',
      spaceTimeTradeoff: 'Ordering condition p1.x < p2.x avoids computing absolute value and cuts comparison pairs in half.',
      interviewerExpectation: 'Use of inequality join p1.x < p2.x to avoid redundant calculations.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT MIN(p2.x - p1.x) AS shortest
FROM Point p1
JOIN Point p2 ON p1.x < p2.x;`,
        approach: 'Strict Inequality Pairwise Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT MIN(p2.x - p1.x) AS shortest
FROM Point p1
JOIN Point p2 ON p1.x < p2.x;`,
        approach: 'PostgreSQL Inequality Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def shortest_distance(point: pd.DataFrame) -> pd.DataFrame:
    sorted_pts = point['x'].sort_values()
    diffs = sorted_pts.diff().dropna()
    min_diff = diffs.min() if not diffs.empty else None
    return pd.DataFrame({'shortest': [min_diff]})`,
        approach: 'Pandas Sort and Adjacent Difference Minima',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Point (x int);`,
    referenceSql: `SELECT MIN(p2.x - p1.x) AS shortest FROM Point p1 JOIN Point p2 ON p1.x < p2.x;`,
    generatorPy: `import json
cases = [
    {
        "Point": [
            {"x": -1},
            {"x": 0},
            {"x": 2}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 4. #614 second-degree-follower
  {
    slug: 'second-degree-follower',
    number: 614,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Two-Tier Social Network Association',
        text: 'A user is a second-degree follower if they follow at least one person and also possess at least one follower themselves.'
      },
      {
        level: 2,
        title: 'Group Count with Subquery Membership',
        text: 'Group by followee to count their incoming followers, filtering for users who also appear in the follower column.'
      },
      {
        level: 3,
        title: 'Second Degree Blueprint',
        text: 'select followee as follower, count(distinct follower) as num from Follow where followee in (select follower from Follow) group by followee order by follower asc.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT followee AS follower, COUNT(DISTINCT follower) AS num\nFROM Follow\nWHERE followee IN (SELECT follower FROM Follow)\nGROUP BY followee\nORDER BY follower ASC;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: number of records in Follow table'],
      notes: 'Subquery lookup and grouped aggregation executes in linear-logarithmic time.',
      whyNaiveFails: 'Cartesian self-joins generate redundant cross-product rows before grouping.',
      spaceTimeTradeoff: 'Semi-join membership IN isolates qualifying users without row duplication.',
      interviewerExpectation: 'Correctly identifying that the user must appear in both follower and followee roles.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT followee AS follower, COUNT(DISTINCT follower) AS num
FROM Follow
WHERE followee IN (SELECT follower FROM Follow)
GROUP BY followee
ORDER BY follower ASC;`,
        approach: 'Subquery Membership Filter with Group Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT followee AS follower, COUNT(DISTINCT follower) AS num
FROM Follow
WHERE followee IN (SELECT follower FROM Follow)
GROUP BY followee
ORDER BY follower ASC;`,
        approach: 'PostgreSQL Distinct Follower Group Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def second_degree_follower(follow: pd.DataFrame) -> pd.DataFrame:
    followers_set = set(follow['follower'])
    filtered = follow[follow['followee'].isin(followers_set)]
    res = filtered.groupby('followee')['follower'].nunique().reset_index()
    res.columns = ['follower', 'num']
    return res.sort_values(by='follower')`,
        approach: 'Pandas Set Membership and Grouped Nunique',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Follow (followee varchar(255), follower varchar(255));`,
    referenceSql: `SELECT followee AS follower, COUNT(DISTINCT follower) AS num FROM Follow WHERE followee IN (SELECT follower FROM Follow) GROUP BY followee ORDER BY follower ASC;`,
    generatorPy: `import json
cases = [
    {
        "Follow": [
            {"followee": "Alice", "follower": "Bob"},
            {"followee": "Bob", "follower": "Cena"},
            {"followee": "Bob", "follower": "Dan"},
            {"followee": "Bob", "follower": "Alice"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 5. #615 average-salary-departments-vs-company
  {
    slug: 'average-salary-departments-vs-company',
    number: 615,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Monthly Department vs Company Mean Benchmark',
        text: 'Compare average department compensation against overall company average compensation for each pay month.'
      },
      {
        level: 2,
        title: 'Dual Window and Department Mean Comparison',
        text: 'Format pay_date to year-month strings. Compute monthly department average and overall monthly company average, then label department as higher, lower, or same.'
      },
      {
        level: 3,
        title: 'Comparison Blueprint',
        text: 'With Dept as (select date_format(pay_date, "%Y-%m") as pay_month, department_id, avg(amount) as dept_avg from Salary s join Employee e on s.employee_id = e.employee_id group by pay_month, department_id), Comp as (select date_format(pay_date, "%Y-%m") as pay_month, avg(amount) as comp_avg from Salary group by pay_month) select d.pay_month, d.department_id, case when d.dept_avg > c.comp_avg then "higher" when d.dept_avg < c.comp_avg then "lower" else "same" end as comparison from Dept d join Comp c on d.pay_month = c.pay_month order by d.pay_month desc, d.department_id asc.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH DeptAvg AS (\n    SELECT \n        DATE_FORMAT(s.pay_date, \'%Y-%m\') AS pay_month,\n        e.department_id,\n        AVG(s.amount) AS dept_avg\n    FROM Salary s\n    JOIN Employee e ON s.employee_id = e.employee_id\n    GROUP BY pay_month, e.department_id\n),\nCompAvg AS (\n    SELECT \n        DATE_FORMAT(pay_date, \'%Y-%m\') AS pay_month,\n        AVG(amount) AS comp_avg\n    FROM Salary\n    GROUP BY pay_month\n)\nSELECT \n    d.pay_month,\n    d.department_id,\n    CASE \n        WHEN d.dept_avg > c.comp_avg THEN \'higher\'\n        WHEN d.dept_avg < c.comp_avg THEN \'lower\'\n        ELSE \'same\'\n    END AS comparison\nFROM DeptAvg d\nJOIN CompAvg c ON d.pay_month = c.pay_month\nORDER BY d.pay_month DESC, d.department_id ASC;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: number of salary records'],
      notes: 'Grouped monthly averages and join execution scale in linear-logarithmic time.',
      whyNaiveFails: 'Row-by-row correlated subqueries compute whole-table averages repeatedly for each department.',
      spaceTimeTradeoff: 'Pre-aggregating monthly company averages avoids redundant scans.',
      interviewerExpectation: 'Use of DATE_FORMAT for monthly normalization and CASE expression comparisons.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH DeptAvg AS (
    SELECT 
        DATE_FORMAT(s.pay_date, '%Y-%m') AS pay_month,
        e.department_id,
        AVG(s.amount) AS dept_avg
    FROM Salary s
    JOIN Employee e ON s.employee_id = e.employee_id
    GROUP BY pay_month, e.department_id
),
CompAvg AS (
    SELECT 
        DATE_FORMAT(pay_date, '%Y-%m') AS pay_month,
        AVG(amount) AS comp_avg
    FROM Salary
    GROUP BY pay_month
)
SELECT 
    d.pay_month,
    d.department_id,
    CASE 
        WHEN d.dept_avg > c.comp_avg THEN 'higher'
        WHEN d.dept_avg < c.comp_avg THEN 'lower'
        ELSE 'same'
    END AS comparison
FROM DeptAvg d
JOIN CompAvg c ON d.pay_month = c.pay_month
ORDER BY d.pay_month DESC, d.department_id ASC;`,
        approach: 'Precomputed Department and Company Monthly Average Comparison',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH DeptAvg AS (
    SELECT 
        TO_CHAR(s.pay_date, 'YYYY-MM') AS pay_month,
        e.department_id,
        AVG(s.amount) AS dept_avg
    FROM Salary s
    JOIN Employee e ON s.employee_id = e.employee_id
    GROUP BY pay_month, e.department_id
),
CompAvg AS (
    SELECT 
        TO_CHAR(pay_date, 'YYYY-MM') AS pay_month,
        AVG(amount) AS comp_avg
    FROM Salary
    GROUP BY pay_month
)
SELECT 
    d.pay_month,
    d.department_id,
    CASE 
        WHEN d.dept_avg > c.comp_avg THEN 'higher'
        WHEN d.dept_avg < c.comp_avg THEN 'lower'
        ELSE 'same'
    END AS comparison
FROM DeptAvg d
JOIN CompAvg c ON d.pay_month = c.pay_month
ORDER BY d.pay_month DESC, d.department_id ASC;`,
        approach: 'PostgreSQL TO_CHAR Monthly Benchmark Comparison',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def average_salary_departments_vs_company(salary: pd.DataFrame, employee: pd.DataFrame) -> pd.DataFrame:
    df = salary.merge(employee, on='employee_id')
    df['pay_month'] = pd.to_datetime(df['pay_date']).dt.strftime('%Y-%m')
    
    comp_avg = df.groupby('pay_month')['amount'].mean().to_dict()
    dept_avg = df.groupby(['pay_month', 'department_id'])['amount'].mean().reset_index()
    
    dept_avg['comp_avg'] = dept_avg['pay_month'].map(comp_avg)
    dept_avg['comparison'] = 'same'
    dept_avg.loc[dept_avg['amount'] > dept_avg['comp_avg'], 'comparison'] = 'higher'
    dept_avg.loc[dept_avg['amount'] < dept_avg['comp_avg'], 'comparison'] = 'lower'
    
    res = dept_avg[['pay_month', 'department_id', 'comparison']]
    return res.sort_values(by=['pay_month', 'department_id'], ascending=[False, True])`,
        approach: 'Pandas Monthly Mean Mapping and Vectorized Labeling',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Salary (id int, employee_id int, amount int, pay_date date);\nCREATE TABLE Employee (employee_id int, department_id int);`,
    referenceSql: `WITH DeptAvg AS (SELECT DATE_FORMAT(s.pay_date, '%Y-%m') AS pay_month, e.department_id, AVG(s.amount) AS dept_avg FROM Salary s JOIN Employee e ON s.employee_id = e.employee_id GROUP BY pay_month, e.department_id), CompAvg AS (SELECT DATE_FORMAT(pay_date, '%Y-%m') AS pay_month, AVG(amount) AS comp_avg FROM Salary GROUP BY pay_month) SELECT d.pay_month, d.department_id, CASE WHEN d.dept_avg > c.comp_avg THEN 'higher' WHEN d.dept_avg < c.comp_avg THEN 'lower' ELSE 'same' END AS comparison FROM DeptAvg d JOIN CompAvg c ON d.pay_month = c.pay_month ORDER BY d.pay_month DESC, d.department_id ASC;`,
    generatorPy: `import json
cases = [
    {
        "Salary": [
            {"id": 1, "employee_id": 1, "amount": 9000, "pay_date": "2017-03-31"},
            {"id": 2, "employee_id": 2, "amount": 6000, "pay_date": "2017-03-31"},
            {"id": 3, "employee_id": 3, "amount": 10000, "pay_date": "2017-03-31"},
            {"id": 4, "employee_id": 1, "amount": 7000, "pay_date": "2017-02-28"},
            {"id": 5, "employee_id": 2, "amount": 6000, "pay_date": "2017-02-28"},
            {"id": 6, "employee_id": 3, "amount": 8000, "pay_date": "2017-02-28"}
        ],
        "Employee": [
            {"employee_id": 1, "department_id": 1},
            {"employee_id": 2, "department_id": 2},
            {"employee_id": 3, "department_id": 2}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 6. #618 students-report-by-geography
  {
    slug: 'students-report-by-geography',
    number: 618,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Geographical Continent Pivot Table',
        text: 'Pivot alphabetical student names from rows into three columns (America, Asia, Europe) aligned by index rank.'
      },
      {
        level: 2,
        title: 'Row Number Partitioning and Conditional Aggregation',
        text: 'Assign row_number ordered by student name within each continent. Then group by row number and use conditional max statements.'
      },
      {
        level: 3,
        title: 'Pivot Blueprint',
        text: 'With Ranked as (select name, continent, row_number() over(partition by continent order by name) as rn from Student) select max(case when continent = "America" then name end) as America, max(case when continent = "Asia" then name end) as Asia, max(case when continent = "Europe" then name end) as Europe from Ranked group by rn.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH Ranked AS (\n    SELECT \n        name,\n        continent,\n        ROW_NUMBER() OVER(PARTITION BY continent ORDER BY name) AS rn\n    FROM Student\n)\nSELECT \n    MAX(CASE WHEN continent = \'America\' THEN name END) AS America,\n    MAX(CASE WHEN continent = \'Asia\' THEN name END) AS Asia,\n    MAX(CASE WHEN continent = \'Europe\' THEN name END) AS Europe\nFROM Ranked\nGROUP BY rn;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: number of student rows'],
      notes: 'Window ranking and conditional grouping pivot names in linear-logarithmic time.',
      whyNaiveFails: 'Full outer joining separate continent subqueries creates verbose and fragile join chains.',
      spaceTimeTradeoff: 'Partitioned row ranking groups disparate categories in a single pivot pass.',
      interviewerExpectation: 'Use of ROW_NUMBER() OVER(PARTITION BY continent) and MAX(CASE WHEN) pivot pattern.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH Ranked AS (
    SELECT 
        name,
        continent,
        ROW_NUMBER() OVER(PARTITION BY continent ORDER BY name) AS rn
    FROM Student
)
SELECT 
    MAX(CASE WHEN continent = 'America' THEN name END) AS America,
    MAX(CASE WHEN continent = 'Asia' THEN name END) AS Asia,
    MAX(CASE WHEN continent = 'Europe' THEN name END) AS Europe
FROM Ranked
GROUP BY rn;`,
        approach: 'Window Row Ranking and Conditional Max Pivot',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH Ranked AS (
    SELECT 
        name,
        continent,
        ROW_NUMBER() OVER(PARTITION BY continent ORDER BY name) AS rn
    FROM Student
)
SELECT 
    MAX(CASE WHEN continent = 'America' THEN name END) AS "America",
    MAX(CASE WHEN continent = 'Asia' THEN name END) AS "Asia",
    MAX(CASE WHEN continent = 'Europe' THEN name END) AS "Europe"
FROM Ranked
GROUP BY rn;`,
        approach: 'PostgreSQL Partitioned Row Pivot',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def geography_report(student: pd.DataFrame) -> pd.DataFrame:
    df = student.sort_values(by=['continent', 'name'])
    df['rn'] = df.groupby('continent').cumcount()
    pivoted = df.pivot(index='rn', columns='continent', values='name')
    for col in ['America', 'Asia', 'Europe']:
        if col not in pivoted.columns:
            pivoted[col] = None
    res = pivoted[['America', 'Asia', 'Europe']]
    return res.reset_index(drop=True)`,
        approach: 'Pandas Cumcount Index Pivot Table',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Student (name varchar(255), continent varchar(255));`,
    referenceSql: `WITH Ranked AS (SELECT name, continent, ROW_NUMBER() OVER(PARTITION BY continent ORDER BY name) AS rn FROM Student) SELECT MAX(CASE WHEN continent = 'America' THEN name END) AS America, MAX(CASE WHEN continent = 'Asia' THEN name END) AS Asia, MAX(CASE WHEN continent = 'Europe' THEN name END) AS Europe FROM Ranked GROUP BY rn;`,
    generatorPy: `import json
cases = [
    {
        "Student": [
            {"name": "Jack", "continent": "America"},
            {"name": "Pascal", "continent": "Europe"},
            {"name": "Xi", "continent": "Asia"},
            {"name": "Jane", "continent": "America"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 7. #619 biggest-single-number
  {
    slug: 'biggest-single-number',
    number: 619,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Single Occurrence Maximum Selection',
        text: 'Locate the largest number that appears exactly once in the table, returning NULL if no unique numbers exist.'
      },
      {
        level: 2,
        title: 'Group By Count Filter and Max Wrap',
        text: 'Group numbers having count(*) = 1 in a subquery, then select the maximum over the resulting set.'
      },
      {
        level: 3,
        title: 'Single Number Blueprint',
        text: 'select max(num) as num from (select num from MyNumbers group by num having count(*) = 1) as t.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT MAX(num) AS num\nFROM (\n    SELECT num\n    FROM MyNumbers\n    GROUP BY num\n    HAVING COUNT(*) = 1\n) AS UniqueNumbers;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: number of records in MyNumbers'],
      notes: 'Grouped frequency aggregation and outer max evaluation runs in linear-logarithmic time.',
      whyNaiveFails: 'Ordering by num DESC LIMIT 1 fails to return NULL when the unique set is empty.',
      spaceTimeTradeoff: 'Wrapping in MAX() automatically yields NULL when the filtered subquery produces no rows.',
      interviewerExpectation: 'Use of outer MAX() wrapper to guarantee NULL return on empty result sets.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT MAX(num) AS num
FROM (
    SELECT num
    FROM MyNumbers
    GROUP BY num
    HAVING COUNT(*) = 1
) AS UniqueNumbers;`,
        approach: 'Outer MAX Wrapper over Group By Having Subquery',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT MAX(num) AS num
FROM (
    SELECT num
    FROM MyNumbers
    GROUP BY num
    HAVING COUNT(*) = 1
) AS UniqueNumbers;`,
        approach: 'PostgreSQL Outer Max Over Unique Numbers',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def biggest_single_number(my_numbers: pd.DataFrame) -> pd.DataFrame:
    counts = my_numbers['num'].value_counts()
    unique = counts[counts == 1].index
    val = unique.max() if len(unique) > 0 else None
    return pd.DataFrame({'num': [val]})`,
        approach: 'Pandas Value Counts Unique Masking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE MyNumbers (num int);`,
    referenceSql: `SELECT MAX(num) AS num FROM (SELECT num FROM MyNumbers GROUP BY num HAVING COUNT(*) = 1) AS UniqueNumbers;`,
    generatorPy: `import json
cases = [
    {
        "MyNumbers": [
            {"num": 8},
            {"num": 8},
            {"num": 3},
            {"num": 3},
            {"num": 1},
            {"num": 4},
            {"num": 5},
            {"num": 6}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 8. #620 not-boring-movies
  {
    slug: 'not-boring-movies',
    number: 620,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Odd Identifier and Non-Boring Description Filter',
        text: 'Filter movie titles with odd-numbered identifiers and descriptions not equal to "boring", ordered by rating.'
      },
      {
        level: 2,
        title: 'Modulo Condition and Rating Sorting',
        text: 'Apply id % 2 = 1 and description <> "boring" in the where clause, sorting the resulting rows by rating in descending order.'
      },
      {
        level: 3,
        title: 'Movie Query Blueprint',
        text: 'select id, movie, description, rating from cinema where id % 2 = 1 and description <> "boring" order by rating desc.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT id, movie, description, rating\nFROM cinema\nWHERE id % 2 = 1 \n  AND description <> \'boring\'\nORDER BY rating DESC;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(1)',
      variables: ['N: number of records in cinema table'],
      notes: 'Filtering evaluates in linear time; sorting by rating takes linear-logarithmic time.',
      whyNaiveFails: 'Case sensitive inequality can fail without exact string matching.',
      spaceTimeTradeoff: 'In-place filter executes directly without auxiliary memory structures.',
      interviewerExpectation: 'Use of modulo operator id % 2 = 1 and string inequality operator <>.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT id, movie, description, rating
FROM cinema
WHERE id % 2 = 1 
  AND description <> 'boring'
ORDER BY rating DESC;`,
        approach: 'Modulo Parity Filter with Rating Sort',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT id, movie, description, rating
FROM cinema
WHERE id % 2 = 1 
  AND description <> 'boring'
ORDER BY rating DESC;`,
        approach: 'PostgreSQL Modulo Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def not_boring_movies(cinema: pd.DataFrame) -> pd.DataFrame:
    mask = (cinema['id'] % 2 == 1) & (cinema['description'] != 'boring')
    filtered = cinema[mask]
    return filtered.sort_values(by='rating', ascending=False)`,
        approach: 'Pandas Vectorized Boolean Masking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE cinema (id int, movie varchar(255), description varchar(255), rating float);`,
    referenceSql: `SELECT id, movie, description, rating FROM cinema WHERE id % 2 = 1 AND description <> 'boring' ORDER BY rating DESC;`,
    generatorPy: `import json
cases = [
    {
        "cinema": [
            {"id": 1, "movie": "War", "description": "great 3D", "rating": 8.9},
            {"id": 2, "movie": "Science", "description": "fiction", "rating": 8.5},
            {"id": 3, "movie": "irish", "description": "boring", "rating": 6.2},
            {"id": 4, "movie": "Ice song", "description": "Fantacy", "rating": 8.6},
            {"id": 5, "movie": "House card", "description": "Interesting", "rating": 9.1}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 9. #626 exchange-seats
  {
    slug: 'exchange-seats',
    number: 626,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Consecutive Pair Seat Swap Logic',
        text: 'Exchange the seat numbers of adjacent student pairs (1 with 2, 3 with 4), leaving the last student unchanged if the total count is odd.'
      },
      {
        level: 2,
        title: 'Case Conditional Identifier Projection',
        text: 'For odd identifiers: if equal to max(id), keep id; otherwise increment by 1. For even identifiers: decrement by 1. Order by new id.'
      },
      {
        level: 3,
        title: 'Seat Exchange Blueprint',
        text: 'select case when id % 2 = 1 and id = (select count(*) from Seat) then id when id % 2 = 1 then id + 1 else id - 1 end as id, student from Seat order by id asc.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT \n    CASE \n        WHEN id % 2 = 1 AND id = (SELECT COUNT(*) FROM Seat) THEN id\n        WHEN id % 2 = 1 THEN id + 1\n        ELSE id - 1\n    END AS id,\n    student\nFROM Seat\nORDER BY id ASC;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(1)',
      variables: ['N: number of records in Seat table'],
      notes: 'Constant CASE expression computation followed by sorting by exchanged id takes linear-logarithmic time.',
      whyNaiveFails: 'Full outer self joins create complicated NULL-handling for odd terminal seats.',
      spaceTimeTradeoff: 'Mathematical identifier transformation projects new IDs in-place without joins.',
      interviewerExpectation: 'Use of CASE statement handling the odd trailing seat boundary condition.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT 
    CASE 
        WHEN id % 2 = 1 AND id = (SELECT COUNT(*) FROM Seat) THEN id
        WHEN id % 2 = 1 THEN id + 1
        ELSE id - 1
    END AS id,
    student
FROM Seat
ORDER BY id ASC;`,
        approach: 'Case Expression Identifier Swapping',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT 
    CASE 
        WHEN id % 2 = 1 AND id = (SELECT COUNT(*) FROM Seat) THEN id
        WHEN id % 2 = 1 THEN id + 1
        ELSE id - 1
    END AS id,
    student
FROM Seat
ORDER BY id ASC;`,
        approach: 'PostgreSQL Conditional Parity Seat Swap',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def exchange_seats(seat: pd.DataFrame) -> pd.DataFrame:
    n = len(seat)
    df = seat.copy()
    for i in range(0, n - 1, 2):
        temp = df.loc[i, 'student']
        df.loc[i, 'student'] = df.loc[i + 1, 'student']
        df.loc[i + 1, 'student'] = temp
    return df`,
        approach: 'In-Place Adjacent Student Swapping',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Seat (id int, student varchar(255));`,
    referenceSql: `SELECT CASE WHEN id % 2 = 1 AND id = (SELECT COUNT(*) FROM Seat) THEN id WHEN id % 2 = 1 THEN id + 1 ELSE id - 1 END AS id, student FROM Seat ORDER BY id ASC;`,
    generatorPy: `import json
cases = [
    {
        "Seat": [
            {"id": 1, "student": "Abbot"},
            {"id": 2, "student": "Doris"},
            {"id": 3, "student": "Emerson"},
            {"id": 4, "student": "Green"},
            {"id": 5, "student": "Jeames"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 10. #627 swap-sex-of-employees
  {
    slug: 'swap-sex-of-employees',
    number: 627,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Single-Pass Attribute Inversion',
        text: 'Invert every value of the sex attribute from m to f and vice versa without temporary intermediary tables.'
      },
      {
        level: 2,
        title: 'Case Conditional Toggle Expression',
        text: 'Use a case expression returning f when sex = "m" and returning m otherwise within an update or select projection.'
      },
      {
        level: 3,
        title: 'Swap Attribute Blueprint',
        text: 'update Salary set sex = case when sex = "m" then "f" else "m" end.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nUPDATE Salary\nSET sex = CASE WHEN sex = \'m\' THEN \'f\' ELSE \'m\' END;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: number of records in Salary table'],
      notes: 'Direct in-place field mutation runs in linear scan time without extra table memory.',
      whyNaiveFails: 'Two sequential updates without a temporary placeholder convert all values to the same sex.',
      spaceTimeTradeoff: 'Single evaluation CASE avoids multi-pass state corruption.',
      interviewerExpectation: 'Writing a single update statement with CASE or IF toggle without intermediate tables.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `UPDATE Salary
SET sex = CASE WHEN sex = 'm' THEN 'f' ELSE 'm' END;`,
        approach: 'Single In-Place Conditional Case Update',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `UPDATE Salary
SET sex = CASE WHEN sex = 'm' THEN 'f' ELSE 'm' END;`,
        approach: 'PostgreSQL In-Place CASE Mutation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def swap_salary(salary: pd.DataFrame) -> pd.DataFrame:
    salary['sex'] = salary['sex'].apply(lambda x: 'f' if x == 'm' else 'm')
    return salary`,
        approach: 'Pandas Apply Lambda Parity Toggle',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Salary (id int, name varchar(255), sex char(1), salary int);`,
    referenceSql: `UPDATE Salary SET sex = CASE WHEN sex = 'm' THEN 'f' ELSE 'm' END; SELECT id, name, sex, salary FROM Salary ORDER BY id;`,
    generatorPy: `import json
cases = [
    {
        "Salary": [
            {"id": 1, "name": "A", "sex": "m", "salary": 2500},
            {"id": 2, "name": "B", "sex": "f", "salary": 1500},
            {"id": 3, "name": "C", "sex": "m", "salary": 5500},
            {"id": 4, "name": "D", "sex": "f", "salary": 500}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 11. #1045 customers-who-bought-all-products
  {
    slug: 'customers-who-bought-all-products',
    number: 1045,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Catalog Universality Verification',
        text: 'Identify customers whose distinct purchased product count equals the total number of products in the product catalog.'
      },
      {
        level: 2,
        title: 'Grouped Distinct Count Having Filter',
        text: 'Group transactions by customer_id and compare count(distinct product_key) against a scalar subquery of total products.'
      },
      {
        level: 3,
        title: 'All Products Blueprint',
        text: 'select customer_id from Customer group by customer_id having count(distinct product_key) = (select count(*) from Product).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT customer_id\nFROM Customer\nGROUP BY customer_id\nHAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product);\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(C + P)',
      space: 'O(C)',
      variables: ['C: rows in Customer table', 'P: rows in Product table'],
      notes: 'Grouped distinct aggregation and single catalog count query run in linear time.',
      whyNaiveFails: 'Joining customer with every product row creates a Cartesian comparison explosion.',
      spaceTimeTradeoff: 'Integer count equality check validates relational division in minimal memory.',
      interviewerExpectation: 'Use of HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product).'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT customer_id
FROM Customer
GROUP BY customer_id
HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product);`,
        approach: 'Relational Division via Group Having Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT customer_id
FROM Customer
GROUP BY customer_id
HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product);`,
        approach: 'PostgreSQL Relational Division Having Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def find_customers(customer: pd.DataFrame, product: pd.DataFrame) -> pd.DataFrame:
    total_prods = len(product)
    grouped = customer.groupby('customer_id')['product_key'].nunique().reset_index()
    res = grouped[grouped['product_key'] == total_prods]
    return res[['customer_id']]`,
        approach: 'Pandas Nunique Grouping Relational Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Customer (customer_id int, product_key int);\nCREATE TABLE Product (product_key int);`,
    referenceSql: `SELECT customer_id FROM Customer GROUP BY customer_id HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product);`,
    generatorPy: `import json
cases = [
    {
        "Customer": [
            {"customer_id": 1, "product_key": 5},
            {"customer_id": 2, "product_key": 6},
            {"customer_id": 3, "product_key": 5},
            {"customer_id": 3, "product_key": 6},
            {"customer_id": 1, "product_key": 6}
        ],
        "Product": [
            {"product_key": 5},
            {"product_key": 6}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 12. #1050 actors-and-directors-who-cooperated-at-least-three-times
  {
    slug: 'actors-and-directors-who-cooperated-at-least-three-times',
    number: 1050,
    category: 'Database',
    patterns: ['date-time'],
    hints: [
      {
        level: 1,
        title: 'Composite Pair Collaboration Frequency',
        text: 'Count collaborative events between actor and director pairs, returning pairs with three or more joint appearances.'
      },
      {
        level: 2,
        title: 'Composite Group By with Having Condition',
        text: 'Group records by both actor_id and director_id, filtering groups with count(*) >= 3.'
      },
      {
        level: 3,
        title: 'Collaboration Blueprint',
        text: 'select actor_id, director_id from ActorDirector group by actor_id, director_id having count(*) >= 3.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT actor_id, director_id\nFROM ActorDirector\nGROUP BY actor_id, director_id\nHAVING COUNT(*) >= 3;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of records in ActorDirector table'],
      notes: 'Grouped aggregation across composite actor-director keys executes in linear scan time.',
      whyNaiveFails: 'Grouping only by actor misses director relationships; self-joins multiply rows needlessly.',
      spaceTimeTradeoff: 'Hash aggregation maintains running frequency counts with minimal memory overhead.',
      interviewerExpectation: 'Use of composite GROUP BY (actor_id, director_id) with HAVING COUNT(*) >= 3.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT actor_id, director_id
FROM ActorDirector
GROUP BY actor_id, director_id
HAVING COUNT(*) >= 3;`,
        approach: 'Composite Key Group By Having Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT actor_id, director_id
FROM ActorDirector
GROUP BY actor_id, director_id
HAVING COUNT(*) >= 3;`,
        approach: 'PostgreSQL Composite Group Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def actors_and_directors(actor_director: pd.DataFrame) -> pd.DataFrame:
    counts = actor_director.groupby(['actor_id', 'director_id']).size().reset_index(name='count')
    res = counts[counts['count'] >= 3]
    return res[['actor_id', 'director_id']]`,
        approach: 'Pandas Groupby Size Threshold Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE ActorDirector (actor_id int, director_id int, timestamp int);`,
    referenceSql: `SELECT actor_id, director_id FROM ActorDirector GROUP BY actor_id, director_id HAVING COUNT(*) >= 3;`,
    generatorPy: `import json
cases = [
    {
        "ActorDirector": [
            {"actor_id": 1, "director_id": 1, "timestamp": 0},
            {"actor_id": 1, "director_id": 1, "timestamp": 1},
            {"actor_id": 1, "director_id": 1, "timestamp": 2},
            {"actor_id": 1, "director_id": 2, "timestamp": 3},
            {"actor_id": 1, "director_id": 2, "timestamp": 4},
            {"actor_id": 2, "director_id": 1, "timestamp": 5},
            {"actor_id": 2, "director_id": 1, "timestamp": 6}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 13. #1068 product-sales-analysis-i
  {
    slug: 'product-sales-analysis-i',
    number: 1068,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Transaction Product Name Resolution',
        text: 'Retrieve product name, transaction year, and transaction price for each recorded sale by joining with the product catalog.'
      },
      {
        level: 2,
        title: 'Inner Equi-Join on Product Identifier',
        text: 'Join Sales with Product on product_id and project product_name, year, and price.'
      },
      {
        level: 3,
        title: 'Sales Analysis Blueprint',
        text: 'select p.product_name, s.year, s.price from Sales s join Product p on s.product_id = p.product_id.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT p.product_name, s.year, s.price\nFROM Sales s\nJOIN Product p ON s.product_id = p.product_id;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(S + P)',
      space: 'O(1)',
      variables: ['S: number of records in Sales', 'P: number of records in Product'],
      notes: 'Hash join on indexed product_id executes in linear scan time.',
      whyNaiveFails: 'Selecting product_name without joining the Product table is invalid schema syntax.',
      spaceTimeTradeoff: 'Inner join projects matching names without allocating intermediate tables.',
      interviewerExpectation: 'Use of clean INNER JOIN on product_id.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT p.product_name, s.year, s.price
FROM Sales s
JOIN Product p ON s.product_id = p.product_id;`,
        approach: 'Inner Join on Product Identifier',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT p.product_name, s.year, s.price
FROM Sales s
JOIN Product p ON s.product_id = p.product_id;`,
        approach: 'PostgreSQL Equi-Join Projection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def sales_analysis(sales: pd.DataFrame, product: pd.DataFrame) -> pd.DataFrame:
    merged = sales.merge(product, on='product_id')
    return merged[['product_name', 'year', 'price']]`,
        approach: 'Pandas Merge and Column Projection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Sales (sale_id int, product_id int, year int, quantity int, price int);\nCREATE TABLE Product (product_id int, product_name varchar(255));`,
    referenceSql: `SELECT p.product_name, s.year, s.price FROM Sales s JOIN Product p ON s.product_id = p.product_id;`,
    generatorPy: `import json
cases = [
    {
        "Sales": [
            {"sale_id": 1, "product_id": 100, "year": 2008, "quantity": 10, "price": 5000},
            {"sale_id": 2, "product_id": 100, "year": 2009, "quantity": 12, "price": 5000},
            {"sale_id": 7, "product_id": 200, "year": 2011, "quantity": 15, "price": 9000}
        ],
        "Product": [
            {"product_id": 100, "product_name": "Nokia"},
            {"product_id": 200, "product_name": "Apple"},
            {"product_id": 300, "product_name": "Samsung"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 14. #1069 product-sales-analysis-ii
  {
    slug: 'product-sales-analysis-ii',
    number: 1069,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Product Total Quantity Aggregation',
        text: 'Group sales records by product identifier and sum all quantities sold across all recorded transactions.'
      },
      {
        level: 2,
        title: 'Group By Product and Sum Quantity',
        text: 'Group by product_id and apply sum(quantity) alias total_quantity.'
      },
      {
        level: 3,
        title: 'Total Quantity Blueprint',
        text: 'select product_id, sum(quantity) as total_quantity from Sales group by product_id.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT product_id, SUM(quantity) AS total_quantity\nFROM Sales\nGROUP BY product_id;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(S)',
      space: 'O(U)',
      variables: ['S: number of records in Sales', 'U: unique products sold'],
      notes: 'Single table hash aggregation computes quantity sums in linear scan time.',
      whyNaiveFails: 'Joining the Product table adds unnecessary join overhead when all needed attributes are in Sales.',
      spaceTimeTradeoff: 'Group by directly on Sales table avoids auxiliary memory.',
      interviewerExpectation: 'Recognizing that product_id and quantity are both present in the Sales table.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT product_id, SUM(quantity) AS total_quantity
FROM Sales
GROUP BY product_id;`,
        approach: 'Single-Table Grouped Quantity Sum',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT product_id, SUM(quantity) AS total_quantity
FROM Sales
GROUP BY product_id;`,
        approach: 'PostgreSQL Group By Sum',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def sales_analysis(sales: pd.DataFrame, product: pd.DataFrame) -> pd.DataFrame:
    grouped = sales.groupby('product_id')['quantity'].sum().reset_index()
    grouped.columns = ['product_id', 'total_quantity']
    return grouped`,
        approach: 'Pandas Groupby Sum Quantity',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Sales (sale_id int, product_id int, year int, quantity int, price int);`,
    referenceSql: `SELECT product_id, SUM(quantity) AS total_quantity FROM Sales GROUP BY product_id;`,
    generatorPy: `import json
cases = [
    {
        "Sales": [
            {"sale_id": 1, "product_id": 100, "year": 2008, "quantity": 10, "price": 5000},
            {"sale_id": 2, "product_id": 100, "year": 2009, "quantity": 12, "price": 5000},
            {"sale_id": 7, "product_id": 200, "year": 2011, "quantity": 15, "price": 9000}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 15. #1070 product-sales-analysis-iii
  {
    slug: 'product-sales-analysis-iii',
    number: 1070,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Initial Product Sale Year Identification',
        text: 'Retrieve product identifier, first year sold, quantity, and price for the earliest recorded sales year of each product.'
      },
      {
        level: 2,
        title: 'Composite Subquery Matching Earliest Year',
        text: 'Filter Sales matching (product_id, year) in a subquery that groups Sales by product_id and finds min(year).'
      },
      {
        level: 3,
        title: 'First Year Sales Blueprint',
        text: 'select product_id, year as first_year, quantity, price from Sales where (product_id, year) in (select product_id, min(year) from Sales group by product_id).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT product_id, year AS first_year, quantity, price\nFROM Sales\nWHERE (product_id, year) IN (\n    SELECT product_id, MIN(year)\n    FROM Sales\n    GROUP BY product_id\n);\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(S log S)',
      space: 'O(S)',
      variables: ['S: number of records in Sales table'],
      notes: 'Subquery aggregation and tuple filtering execute in linear-logarithmic time.',
      whyNaiveFails: 'Grouping directly by product_id and selecting quantity returns arbitrary rows in standard SQL.',
      spaceTimeTradeoff: 'Subquery tuple matching isolates exact matching transactions per product.',
      interviewerExpectation: 'Use of composite tuple subquery IN (SELECT product_id, MIN(year)) or DENSE_RANK().'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT product_id, year AS first_year, quantity, price
FROM Sales
WHERE (product_id, year) IN (
    SELECT product_id, MIN(year)
    FROM Sales
    GROUP BY product_id
);`,
        approach: 'Composite Tuple Subquery Filtering',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT product_id, year AS first_year, quantity, price
FROM Sales
WHERE (product_id, year) IN (
    SELECT product_id, MIN(year)
    FROM Sales
    GROUP BY product_id
);`,
        approach: 'PostgreSQL Earliest Year Tuple Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def sales_analysis(sales: pd.DataFrame, product: pd.DataFrame) -> pd.DataFrame:
    min_years = sales.groupby('product_id')['year'].transform('min')
    first_sales = sales[sales['year'] == min_years].copy()
    first_sales = first_sales.rename(columns={'year': 'first_year'})
    return first_sales[['product_id', 'first_year', 'quantity', 'price']]`,
        approach: 'Pandas Groupby Transform Min Year Mask',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Sales (sale_id int, product_id int, year int, quantity int, price int);`,
    referenceSql: `SELECT product_id, year AS first_year, quantity, price FROM Sales WHERE (product_id, year) IN (SELECT product_id, MIN(year) FROM Sales GROUP BY product_id);`,
    generatorPy: `import json
cases = [
    {
        "Sales": [
            {"sale_id": 1, "product_id": 100, "year": 2008, "quantity": 10, "price": 5000},
            {"sale_id": 2, "product_id": 100, "year": 2009, "quantity": 12, "price": 5000},
            {"sale_id": 7, "product_id": 200, "year": 2011, "quantity": 15, "price": 9000}
        ]
    }
]
print(json.dumps(cases))
`
  }
];
