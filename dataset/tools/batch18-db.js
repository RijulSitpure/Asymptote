export const batch18Db = [
  // 1. #1264 page-recommendations
  {
    slug: 'page-recommendations',
    number: 1264,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Friendship Graph Direct Neighborhood',
        text: 'Retrieve user 1 friends by checking friendship connections in either user1_id or user2_id directions.'
      },
      {
        level: 2,
        title: 'Distinct Recommended Pages Union',
        text: 'join the retrieved friends list with the likes table and filter out pages user 1 already likes.'
      },
      {
        level: 3,
        title: 'Page Recommendations Blueprint',
        text: 'select distinct page_id as recommended_page from Likes where user_id in (select user2_id from Friendship where user1_id = 1 union select user1_id from Friendship where user2_id = 1) and page_id not in (select page_id from Likes where user_id = 1).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT DISTINCT page_id AS recommended_page\nFROM Likes\nWHERE user_id IN (\n    SELECT user2_id FROM Friendship WHERE user1_id = 1\n    UNION\n    SELECT user1_id FROM Friendship WHERE user2_id = 1\n)\nAND page_id NOT IN (\n    SELECT page_id FROM Likes WHERE user_id = 1\n);\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(F + L)',
      space: 'O(F + L)',
      variables: ['F: number of friendship records', 'L: number of likes records'],
      notes: 'Filtering by user 1 friends and anti-joining against user 1 likes runs in linear time using indices.',
      whyNaiveFails: 'Failing to union bidirectional friendship records misses friends logged in reverse order.',
      spaceTimeTradeoff: 'Union of friend ids into an in-memory hash set avoids complex outer joins.',
      interviewerExpectation: 'Bidirectional friendship handling and exclusion of already-liked pages.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT DISTINCT page_id AS recommended_page
FROM Likes
WHERE user_id IN (
    SELECT user2_id FROM Friendship WHERE user1_id = 1
    UNION
    SELECT user1_id FROM Friendship WHERE user2_id = 1
)
AND page_id NOT IN (
    SELECT page_id FROM Likes WHERE user_id = 1
);`,
        approach: 'Bidirectional Friendship Filter and Anti-Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT DISTINCT page_id AS recommended_page
FROM Likes
WHERE user_id IN (
    SELECT user2_id FROM Friendship WHERE user1_id = 1
    UNION
    SELECT user1_id FROM Friendship WHERE user2_id = 1
)
AND page_id NOT IN (
    SELECT page_id FROM Likes WHERE user_id = 1
);`,
        approach: 'PostgreSQL Subquery Filter with Set Exclusion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def page_recommendations(friendship: pd.DataFrame, likes: pd.DataFrame) -> pd.DataFrame:
    f1 = friendship[friendship['user1_id'] == 1]['user2_id']
    f2 = friendship[friendship['user2_id'] == 1]['user1_id']
    friends = set(f1).union(set(f2))
    user1_likes = set(likes[likes['user_id'] == 1]['page_id'])
    rec = likes[likes['user_id'].isin(friends) & (~likes['page_id'].isin(user1_likes))]
    res = rec[['page_id']].drop_duplicates().rename(columns={'page_id': 'recommended_page'})
    return res`,
        approach: 'Pandas Set Union and Boolean Filtering',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Friendship (user1_id int, user2_id int);
CREATE TABLE Likes (user_id int, page_id int);`,
    referenceSql: `SELECT DISTINCT page_id AS recommended_page FROM Likes WHERE user_id IN (SELECT user2_id FROM Friendship WHERE user1_id = 1 UNION SELECT user1_id FROM Friendship WHERE user2_id = 1) AND page_id NOT IN (SELECT page_id FROM Likes WHERE user_id = 1);`,
    generatorPy: `import json
cases = [
    {
        "Friendship": [
            {"user1_id": 1, "user2_id": 2},
            {"user1_id": 1, "user2_id": 3},
            {"user1_id": 1, "user2_id": 4},
            {"user1_id": 2, "user2_id": 3},
            {"user1_id": 6, "user2_id": 1}
        ],
        "Likes": [
            {"user_id": 1, "page_id": 88},
            {"user_id": 2, "page_id": 23},
            {"user_id": 3, "page_id": 24},
            {"user_id": 4, "page_id": 56},
            {"user_id": 5, "page_id": 11},
            {"user_id": 6, "page_id": 33},
            {"user_id": 2, "page_id": 77},
            {"user_id": 3, "page_id": 77},
            {"user_id": 6, "page_id": 88}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 2. #1270 all-people-report-to-the-given-manager
  {
    slug: 'all-people-report-to-the-given-manager',
    number: 1270,
    category: 'Database',
    patterns: ['recursive-cte'],
    hints: [
      {
        level: 1,
        title: 'Manager Hierarchy Traversal',
        text: 'Find all employees who report directly or indirectly within three management levels to the head of the company.'
      },
      {
        level: 2,
        title: 'Self-Join or Recursive CTE',
        text: 'Join the employee hierarchy three times, or use a recursive CTE starting from manager_id = 1.'
      },
      {
        level: 3,
        title: 'Three Level Hierarchy Blueprint',
        text: 'with recursive Subordinates as (select employee_id from Employees where manager_id = 1 and employee_id <> 1 union all select e.employee_id from Employees e join Subordinates s on e.manager_id = s.employee_id) select employee_id from Subordinates.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH RECURSIVE Hierarchy AS (\n    SELECT employee_id, 1 AS level\n    FROM Employees\n    WHERE manager_id = 1 AND employee_id != 1\n    UNION ALL\n    SELECT e.employee_id, h.level + 1\n    FROM Employees e\n    JOIN Hierarchy h ON e.manager_id = h.employee_id\n    WHERE h.level < 3\n)\nSELECT employee_id\nFROM Hierarchy;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of employee records'],
      notes: 'Recursive expansion descends at most 3 levels, visiting each subordinate employee once.',
      whyNaiveFails: 'Single join only captures direct reports and omits employees reporting through intermediaries.',
      spaceTimeTradeoff: 'Recursive CTE avoids hardcoding multiple nested self-joins.',
      interviewerExpectation: 'Use of recursive CTE or 3-level self-join excluding the head manager.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH RECURSIVE Hierarchy AS (
    SELECT employee_id, 1 AS level
    FROM Employees
    WHERE manager_id = 1 AND employee_id != 1
    UNION ALL
    SELECT e.employee_id, h.level + 1
    FROM Employees e
    JOIN Hierarchy h ON e.manager_id = h.employee_id
    WHERE h.level < 3
)
SELECT employee_id
FROM Hierarchy;`,
        approach: 'Recursive CTE Depth-Bounded Tree Walk',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH RECURSIVE Hierarchy AS (
    SELECT employee_id, 1 AS level
    FROM Employees
    WHERE manager_id = 1 AND employee_id != 1
    UNION ALL
    SELECT e.employee_id, h.level + 1
    FROM Employees e
    JOIN Hierarchy h ON e.manager_id = h.employee_id
    WHERE h.level < 3
)
SELECT employee_id
FROM Hierarchy;`,
        approach: 'PostgreSQL Recursive CTE Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def find_reporting_people(employees: pd.DataFrame) -> pd.DataFrame:
    direct = employees[(employees['manager_id'] == 1) & (employees['employee_id'] != 1)]['employee_id'].tolist()
    all_reports = set(direct)
    curr = direct
    for _ in range(2):
        nxt = employees[employees['manager_id'].isin(curr)]['employee_id'].tolist()
        all_reports.update(nxt)
        curr = nxt
    return pd.DataFrame({'employee_id': list(all_reports)})`,
        approach: 'Pandas Iterative Level Breadth Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Employees (employee_id int, employee_name varchar(50), manager_id int);`,
    referenceSql: `WITH RECURSIVE Hierarchy AS (SELECT employee_id, 1 AS level FROM Employees WHERE manager_id = 1 AND employee_id != 1 UNION ALL SELECT e.employee_id, h.level + 1 FROM Employees e JOIN Hierarchy h ON e.manager_id = h.employee_id WHERE h.level < 3) SELECT employee_id FROM Hierarchy;`,
    generatorPy: `import json
cases = [
    {
        "Employees": [
            {"employee_id": 1, "employee_name": "Boss", "manager_id": 1},
            {"employee_id": 3, "employee_name": "Alice", "manager_id": 3},
            {"employee_id": 2, "employee_name": "Bob", "manager_id": 1},
            {"employee_id": 4, "employee_name": "Daniel", "manager_id": 2},
            {"employee_id": 7, "employee_name": "Luis", "manager_id": 4},
            {"employee_id": 8, "employee_name": "John", "manager_id": 3},
            {"employee_id": 9, "employee_name": "Angela", "manager_id": 8},
            {"employee_id": 77, "employee_name": "Robert", "manager_id": 1}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 3. #1280 students-and-examinations
  {
    slug: 'students-and-examinations',
    number: 1280,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Cartesian Product of Students and Subjects',
        text: 'Every student must be paired with every subject, even if they attended zero examinations for that subject.'
      },
      {
        level: 2,
        title: 'Cross Join with Left Join Counting',
        text: 'cross join Students with Subjects, then left join with Examinations to count exam attendance.'
      },
      {
        level: 3,
        title: 'Students and Examinations Blueprint',
        text: 'select s.student_id, s.student_name, sub.subject_name, count(e.subject_name) as attended_exams from Students s cross join Subjects sub left join Examinations e on s.student_id = e.student_id and sub.subject_name = e.subject_name group by s.student_id, s.student_name, sub.subject_name order by s.student_id, sub.subject_name.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT s.student_id, s.student_name, sub.subject_name, COUNT(e.subject_name) AS attended_exams\nFROM Students s\nCROSS JOIN Subjects sub\nLEFT JOIN Examinations e ON s.student_id = e.student_id AND sub.subject_name = e.subject_name\nGROUP BY s.student_id, s.student_name, sub.subject_name\nORDER BY s.student_id, sub.subject_name;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(S * B + E)',
      space: 'O(S * B)',
      variables: ['S: number of students', 'B: number of subjects', 'E: number of exam logs'],
      notes: 'Cross join constructs S * B base rows, joined with E attendance records.',
      whyNaiveFails: 'Simple inner join on Examinations omits students who took zero exams for a subject.',
      spaceTimeTradeoff: 'Cross join guarantees complete dimensional grid prior to left aggregation.',
      interviewerExpectation: 'Use of cross join with left join and count on joined column to preserve zero counts.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT s.student_id, s.student_name, sub.subject_name, COUNT(e.subject_name) AS attended_exams
FROM Students s
CROSS JOIN Subjects sub
LEFT JOIN Examinations e ON s.student_id = e.student_id AND sub.subject_name = e.subject_name
GROUP BY s.student_id, s.student_name, sub.subject_name
ORDER BY s.student_id, sub.subject_name;`,
        approach: 'Cross Join Dimension Grid with Left Join Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT s.student_id, s.student_name, sub.subject_name, COUNT(e.subject_name) AS attended_exams
FROM Students s
CROSS JOIN Subjects sub
LEFT JOIN Examinations e ON s.student_id = e.student_id AND sub.subject_name = e.subject_name
GROUP BY s.student_id, s.student_name, sub.subject_name
ORDER BY s.student_id, sub.subject_name;`,
        approach: 'PostgreSQL Cross Join Left Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def students_and_examinations(students: pd.DataFrame, subjects: pd.DataFrame, examinations: pd.DataFrame) -> pd.DataFrame:
    grid = students.merge(subjects, how='cross')
    exam_counts = examinations.groupby(['student_id', 'subject_name']).size().reset_index(name='attended_exams')
    res = grid.merge(exam_counts, on=['student_id', 'subject_name'], how='left')
    res['attended_exams'] = res['attended_exams'].fillna(0).astype(int)
    return res.sort_values(by=['student_id', 'subject_name'])`,
        approach: 'Pandas Cross Merge and Left Join Fillna',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Students (student_id int, student_name varchar(50));
CREATE TABLE Subjects (subject_name varchar(50));
CREATE TABLE Examinations (student_id int, subject_name varchar(50));`,
    referenceSql: `SELECT s.student_id, s.student_name, sub.subject_name, COUNT(e.subject_name) AS attended_exams FROM Students s CROSS JOIN Subjects sub LEFT JOIN Examinations e ON s.student_id = e.student_id AND sub.subject_name = e.subject_name GROUP BY s.student_id, s.student_name, sub.subject_name ORDER BY s.student_id, sub.subject_name;`,
    generatorPy: `import json
cases = [
    {
        "Students": [
            {"student_id": 1, "student_name": "Alice"},
            {"student_id": 2, "student_name": "Bob"},
            {"student_id": 13, "student_name": "John"},
            {"student_id": 6, "student_name": "Alex"}
        ],
        "Subjects": [
            {"subject_name": "Math"},
            {"subject_name": "Physics"},
            {"subject_name": "Programming"}
        ],
        "Examinations": [
            {"student_id": 1, "subject_name": "Math"},
            {"student_id": 1, "subject_name": "Physics"},
            {"student_id": 1, "subject_name": "Programming"},
            {"student_id": 2, "subject_name": "Programming"},
            {"student_id": 1, "subject_name": "Physics"},
            {"student_id": 1, "subject_name": "Math"},
            {"student_id": 13, "subject_name": "Math"},
            {"student_id": 13, "subject_name": "Programming"},
            {"student_id": 13, "subject_name": "Physics"},
            {"student_id": 2, "subject_name": "Math"},
            {"student_id": 1, "subject_name": "Math"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 4. #1285 find-the-start-and-end-number-of-continuous-ranges
  {
    slug: 'find-the-start-and-end-number-of-continuous-ranges',
    number: 1285,
    category: 'Database',
    patterns: ['gaps-and-islands'],
    hints: [
      {
        level: 1,
        title: 'Consecutive Value Grouping via Row Offset',
        text: 'A sequence of consecutive numbers has a constant difference between each log_id and its row number.'
      },
      {
        level: 2,
        title: 'Window Function Island Partition',
        text: 'Calculate log_id - row_number() over (order by log_id) to assign a uniform group identifier to every continuous sequence.'
      },
      {
        level: 3,
        title: 'Continuous Ranges Blueprint',
        text: 'with NumberedLogs as (select log_id, log_id - row_number() over (order by log_id) as grp from Logs) select min(log_id) as start_id, max(log_id) as end_id from NumberedLogs group by grp order by start_id.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH NumberedLogs AS (\n    SELECT log_id, log_id - ROW_NUMBER() OVER (ORDER BY log_id) AS grp\n    FROM Logs\n)\nSELECT MIN(log_id) AS start_id, MAX(log_id) AS end_id\nFROM NumberedLogs\nGROUP BY grp\nORDER BY start_id;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: number of records in Logs table'],
      notes: 'Window ranking and grouping by constant delta executes in linear-logarithmic time.',
      whyNaiveFails: 'Self-joins across gaps require quadratic comparisons to connect endpoints.',
      spaceTimeTradeoff: 'Row number subtraction forms island groups in a single scan.',
      interviewerExpectation: 'Classic gaps-and-islands pattern using ROW_NUMBER() difference.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH NumberedLogs AS (
    SELECT log_id, log_id - ROW_NUMBER() OVER (ORDER BY log_id) AS grp
    FROM Logs
)
SELECT MIN(log_id) AS start_id, MAX(log_id) AS end_id
FROM NumberedLogs
GROUP BY grp
ORDER BY start_id;`,
        approach: 'Row Number Delta Gaps and Islands',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH NumberedLogs AS (
    SELECT log_id, log_id - ROW_NUMBER() OVER (ORDER BY log_id) AS grp
    FROM Logs
)
SELECT MIN(log_id) AS start_id, MAX(log_id) AS end_id
FROM NumberedLogs
GROUP BY grp
ORDER BY start_id;`,
        approach: 'PostgreSQL Window Function Island Partition',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def find_continuous_ranges(logs: pd.DataFrame) -> pd.DataFrame:
    if logs.empty:
        return pd.DataFrame(columns=['start_id', 'end_id'])
    logs = logs.sort_values(by='log_id').reset_index(drop=True)
    logs['grp'] = logs['log_id'] - logs.index
    res = logs.groupby('grp').agg(start_id=('log_id', 'min'), end_id=('log_id', 'max')).reset_index()
    return res[['start_id', 'end_id']].sort_values(by='start_id')`,
        approach: 'Pandas Index Subtraction Island Grouping',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Logs (log_id int);`,
    referenceSql: `WITH NumberedLogs AS (SELECT log_id, log_id - ROW_NUMBER() OVER (ORDER BY log_id) AS grp FROM Logs) SELECT MIN(log_id) AS start_id, MAX(log_id) AS end_id FROM NumberedLogs GROUP BY grp ORDER BY start_id;`,
    generatorPy: `import json
cases = [
    {
        "Logs": [
            {"log_id": 1},
            {"log_id": 2},
            {"log_id": 3},
            {"log_id": 7},
            {"log_id": 8},
            {"log_id": 10}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 5. #1294 weather-type-in-each-country
  {
    slug: 'weather-type-in-each-country',
    number: 1294,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Monthly Weather Average Classification',
        text: 'Filter weather observations to November 2019, calculate average weather_state per country, and categorize using conditional logic.'
      },
      {
        level: 2,
        title: 'Case When Weather Thresholds',
        text: 'Assign Cold when average <= 15, Hot when average >= 25, and Warm otherwise.'
      },
      {
        level: 3,
        title: 'Weather Classification Blueprint',
        text: 'select c.country_name, case when avg(w.weather_state) <= 15 then "Cold" when avg(w.weather_state) >= 25 then "Hot" else "Warm" end as weather_type from Countries c join Weather w on c.country_id = w.country_id where w.day between "2019-11-01" and "2019-11-30" group by c.country_id, c.country_name.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT c.country_name,\n       CASE \n           WHEN AVG(w.weather_state) <= 15 THEN \'Cold\'\n           WHEN AVG(w.weather_state) >= 25 THEN \'Hot\'\n           ELSE \'Warm\'\n       END AS weather_type\nFROM Countries c\nJOIN Weather w ON c.country_id = w.country_id\nWHERE w.day BETWEEN \'2019-11-01\' AND \'2019-11-30\'\nGROUP BY c.country_id, c.country_name;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(W + C)',
      space: 'O(C)',
      variables: ['W: weather records in November 2019', 'C: number of countries'],
      notes: 'Filtering by November date range and grouping country ids takes linear time.',
      whyNaiveFails: 'Evaluating weather outside November 2019 corrupts the monthly average temperature.',
      spaceTimeTradeoff: 'Inner join only categorizes countries with recorded November observations.',
      interviewerExpectation: 'Date range filtering and conditional CASE statement on aggregate AVG.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT c.country_name,
       CASE 
           WHEN AVG(w.weather_state) <= 15 THEN 'Cold'
           WHEN AVG(w.weather_state) >= 25 THEN 'Hot'
           ELSE 'Warm'
       END AS weather_type
FROM Countries c
JOIN Weather w ON c.country_id = w.country_id
WHERE w.day BETWEEN '2019-11-01' AND '2019-11-30'
GROUP BY c.country_id, c.country_name;`,
        approach: 'Date Range Join with Conditional Case Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT c.country_name,
       CASE 
           WHEN AVG(w.weather_state) <= 15 THEN 'Cold'
           WHEN AVG(w.weather_state) >= 25 THEN 'Hot'
           ELSE 'Warm'
       END AS weather_type
FROM Countries c
JOIN Weather w ON c.country_id = w.country_id
WHERE w.day BETWEEN '2019-11-01' AND '2019-11-30'
GROUP BY c.country_id, c.country_name;`,
        approach: 'PostgreSQL Conditional Case Average',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def weather_type(countries: pd.DataFrame, weather: pd.DataFrame) -> pd.DataFrame:
    nov = weather[weather['day'].astype(str).str.startswith('2019-11')]
    if nov.empty:
        return pd.DataFrame(columns=['country_name', 'weather_type'])
    merged = nov.merge(countries, on='country_id')
    grouped = merged.groupby('country_name')['weather_state'].mean().reset_index()
    def classify(avg):
        if avg <= 15: return 'Cold'
        if avg >= 25: return 'Hot'
        return 'Warm'
    grouped['weather_type'] = grouped['weather_state'].apply(classify)
    return grouped[['country_name', 'weather_type']]`,
        approach: 'Pandas Date Filtering and Mean Classification',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Countries (country_id int, country_name varchar(50));
CREATE TABLE Weather (country_id int, weather_state int, day date);`,
    referenceSql: `SELECT c.country_name, CASE WHEN AVG(w.weather_state) <= 15 THEN 'Cold' WHEN AVG(w.weather_state) >= 25 THEN 'Hot' ELSE 'Warm' END AS weather_type FROM Countries c JOIN Weather w ON c.country_id = w.country_id WHERE w.day BETWEEN '2019-11-01' AND '2019-11-30' GROUP BY c.country_id, c.country_name;`,
    generatorPy: `import json
cases = [
    {
        "Countries": [
            {"country_id": 2, "country_name": "USA"},
            {"country_id": 3, "country_name": "Australia"},
            {"country_id": 7, "country_name": "Peru"},
            {"country_id": 5, "country_name": "China"},
            {"country_id": 8, "country_name": "Morocco"},
            {"country_id": 9, "country_name": "Spain"}
        ],
        "Weather": [
            {"country_id": 2, "weather_state": 15, "day": "2019-11-01"},
            {"country_id": 2, "weather_state": 12, "day": "2019-10-28"},
            {"country_id": 2, "weather_state": 12, "day": "2019-10-27"},
            {"country_id": 3, "weather_state": -2, "day": "2019-11-10"},
            {"country_id": 3, "weather_state": 0, "day": "2019-11-11"},
            {"country_id": 3, "weather_state": 3, "day": "2019-11-12"},
            {"country_id": 5, "weather_state": 16, "day": "2019-11-07"},
            {"country_id": 5, "weather_state": 18, "day": "2019-11-09"},
            {"country_id": 5, "weather_state": 21, "day": "2019-11-23"},
            {"country_id": 7, "weather_state": 25, "day": "2019-11-28"},
            {"country_id": 7, "weather_state": 22, "day": "2019-12-01"},
            {"country_id": 7, "weather_state": 20, "day": "2019-12-02"},
            {"country_id": 8, "weather_state": 25, "day": "2019-11-05"},
            {"country_id": 8, "weather_state": 27, "day": "2019-11-15"},
            {"country_id": 8, "weather_state": 31, "day": "2019-11-25"},
            {"country_id": 9, "weather_state": 7, "day": "2019-10-23"},
            {"country_id": 9, "weather_state": 35, "day": "2019-12-23"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 6. #1303 find-the-team-size
  {
    slug: 'find-the-team-size',
    number: 1303,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Team Member Tally Window Function',
        text: 'Each employee belongs to a team. The team size is the total count of employees sharing that team_id.'
      },
      {
        level: 2,
        title: 'Partition By Team Identifier',
        text: 'Use count(*) over (partition by team_id) to calculate the team size for every employee without collapsing rows.'
      },
      {
        level: 3,
        title: 'Team Size Blueprint',
        text: 'select employee_id, count(*) over (partition by team_id) as team_size from Employee.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT employee_id, COUNT(*) OVER (PARTITION BY team_id) AS team_size\nFROM Employee;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of employees'],
      notes: 'Window partition counts execute in a single linear pass using an internal hash partition.',
      whyNaiveFails: 'Standard GROUP BY collapses all team members into a single row, losing individual employee_id records.',
      spaceTimeTradeoff: 'Window function avoids self-joining employee table back to a grouped team count subquery.',
      interviewerExpectation: 'Use of COUNT(*) OVER (PARTITION BY team_id).'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT employee_id, COUNT(*) OVER (PARTITION BY team_id) AS team_size
FROM Employee;`,
        approach: 'Window Count Partition by Team ID',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT employee_id, COUNT(*) OVER (PARTITION BY team_id) AS team_size
FROM Employee;`,
        approach: 'PostgreSQL Analytic Partition Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def team_size(employee: pd.DataFrame) -> pd.DataFrame:
    employee['team_size'] = employee.groupby('team_id')['employee_id'].transform('count')
    return employee[['employee_id', 'team_size']]`,
        approach: 'Pandas Transform Count by Team',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Employee (employee_id int, team_id int);`,
    referenceSql: `SELECT employee_id, COUNT(*) OVER (PARTITION BY team_id) AS team_size FROM Employee;`,
    generatorPy: `import json
cases = [
    {
        "Employee": [
            {"employee_id": 1, "team_id": 8},
            {"employee_id": 2, "team_id": 8},
            {"employee_id": 3, "team_id": 8},
            {"employee_id": 4, "team_id": 7},
            {"employee_id": 5, "team_id": 9},
            {"employee_id": 6, "team_id": 9}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 7. #1308 running-total-for-different-genders
  {
    slug: 'running-total-for-different-genders',
    number: 1308,
    category: 'Database',
    patterns: ['running-total'],
    hints: [
      {
        level: 1,
        title: 'Partitioned Cumulative Score Calculation',
        text: 'Calculate the running total of match scores partitioned by gender and ordered chronologically by day.'
      },
      {
        level: 2,
        title: 'Sum Window Frame Specification',
        text: 'Use sum(score_points) over (partition by gender order by day) to compute the running sum.'
      },
      {
        level: 3,
        title: 'Running Total Blueprint',
        text: 'select gender, day, sum(score_points) over (partition by gender order by day) as total_points from Scores order by gender, day.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT gender, day, \n       SUM(score_points) OVER (PARTITION BY gender ORDER BY day) AS total_points\nFROM Scores\nORDER BY gender, day;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: number of scores records'],
      notes: 'Sorting by gender and day allows rolling prefix accumulation in linear-logarithmic time.',
      whyNaiveFails: 'Correlated self-joins comparing days quadratic in row count cause major performance slowdowns.',
      spaceTimeTradeoff: 'Window summation accumulates prefix totals without auxiliary table allocation.',
      interviewerExpectation: 'Use of SUM() OVER (PARTITION BY ... ORDER BY ...).'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT gender, day, 
       SUM(score_points) OVER (PARTITION BY gender ORDER BY day) AS total_points
FROM Scores
ORDER BY gender, day;`,
        approach: 'Cumulative Window Sum Partitioned by Gender',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT gender, day, 
       SUM(score_points) OVER (PARTITION BY gender ORDER BY day) AS total_points
FROM Scores
ORDER BY gender, day;`,
        approach: 'PostgreSQL Cumulative Window Sum',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def running_total_for_different_genders(scores: pd.DataFrame) -> pd.DataFrame:
    scores = scores.sort_values(by=['gender', 'day'])
    scores['total_points'] = scores.groupby('gender')['score_points'].cumsum()
    return scores[['gender', 'day', 'total_points']]`,
        approach: 'Pandas Groupby Cumsum by Gender',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Scores (player_name varchar(50), gender varchar(10), day date, score_points int);`,
    referenceSql: `SELECT gender, day, SUM(score_points) OVER (PARTITION BY gender ORDER BY day) AS total_points FROM Scores ORDER BY gender, day;`,
    generatorPy: `import json
cases = [
    {
        "Scores": [
            {"player_name": "Aron", "gender": "F", "day": "2020-01-01", "score_points": 17},
            {"player_name": "Alice", "gender": "F", "day": "2020-01-07", "score_points": 23},
            {"player_name": "Bajrang", "gender": "M", "day": "2020-01-07", "score_points": 7},
            {"player_name": "Khali", "gender": "M", "day": "2019-12-25", "score_points": 11},
            {"player_name": "Slaman", "gender": "M", "day": "2019-12-30", "score_points": 13},
            {"player_name": "Joe", "gender": "M", "day": "2019-12-31", "score_points": 3},
            {"player_name": "Jose", "gender": "M", "day": "2019-12-18", "score_points": 2},
            {"player_name": "Priya", "gender": "F", "day": "2019-12-31", "score_points": 18},
            {"player_name": "Priyanka", "gender": "F", "day": "2019-12-30", "score_points": 17}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 8. #1321 restaurant-growth
  {
    slug: 'restaurant-growth',
    number: 1321,
    category: 'Database',
    patterns: ['window-offset'],
    hints: [
      {
        level: 1,
        title: 'Daily Aggregation Before Moving Window',
        text: 'Multiple customer transactions occur on the same day. First aggregate daily revenue amounts before calculating 7-day rolling metrics.'
      },
      {
        level: 2,
        title: '7-Day Rolling Window Frame',
        text: 'Use sum(amount) over (order by visited_on rows between 6 preceding and current row) on daily totals.'
      },
      {
        level: 3,
        title: 'Warmup Period Filter Blueprint',
        text: 'Filter results where row_number() over (order by visited_on) >= 7 to exclude the initial 6 warmup days.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH Daily AS (\n    SELECT visited_on, SUM(amount) AS daily_amount\n    FROM Customer\n    GROUP BY visited_on\n),\nRolling AS (\n    SELECT visited_on,\n           SUM(daily_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS amount,\n           ROUND(AVG(daily_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS average_amount,\n           ROW_NUMBER() OVER (ORDER BY visited_on) AS rn\n    FROM Daily\n)\nSELECT visited_on, amount, average_amount\nFROM Rolling\nWHERE rn >= 7\nORDER BY visited_on;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(D log D)',
      space: 'O(D)',
      variables: ['D: number of distinct days in Customer records'],
      notes: 'Daily aggregation followed by rolling 7-day window function operates in linear-logarithmic time.',
      whyNaiveFails: 'Applying rolling windows directly on raw records averages individual transactions rather than daily totals.',
      spaceTimeTradeoff: 'Daily CTE intermediate table collapses duplicate transactions for clean sliding window math.',
      interviewerExpectation: 'Pre-aggregation to daily level followed by 6 preceding window frame and warmup filter.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH Daily AS (
    SELECT visited_on, SUM(amount) AS daily_amount
    FROM Customer
    GROUP BY visited_on
),
Rolling AS (
    SELECT visited_on,
           SUM(daily_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS amount,
           ROUND(AVG(daily_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS average_amount,
           ROW_NUMBER() OVER (ORDER BY visited_on) AS rn
    FROM Daily
)
SELECT visited_on, amount, average_amount
FROM Rolling
WHERE rn >= 7
ORDER BY visited_on;`,
        approach: 'Daily Aggregation with 7-Day Window Sum and Average',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH Daily AS (
    SELECT visited_on, SUM(amount) AS daily_amount
    FROM Customer
    GROUP BY visited_on
),
Rolling AS (
    SELECT visited_on,
           SUM(daily_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS amount,
           ROUND(AVG(daily_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS average_amount,
           ROW_NUMBER() OVER (ORDER BY visited_on) AS rn
    FROM Daily
)
SELECT visited_on, amount, average_amount
FROM Rolling
WHERE rn >= 7
ORDER BY visited_on;`,
        approach: 'PostgreSQL Daily Rolling Window',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def restaurant_growth(customer: pd.DataFrame) -> pd.DataFrame:
    daily = customer.groupby('visited_on')['amount'].sum().reset_index()
    daily = daily.sort_values(by='visited_on').reset_index(drop=True)
    if len(daily) < 7:
        return pd.DataFrame(columns=['visited_on', 'amount', 'average_amount'])
    daily['amount'] = daily['amount'].rolling(window=7).sum()
    daily['average_amount'] = (daily['amount'] / 7.0).round(2)
    res = daily.dropna().copy()
    return res[['visited_on', 'amount', 'average_amount']]`,
        approach: 'Pandas Daily Groupby and Rolling Window',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Customer (customer_id int, name varchar(50), visited_on date, amount int);`,
    referenceSql: `WITH Daily AS (SELECT visited_on, SUM(amount) AS daily_amount FROM Customer GROUP BY visited_on), Rolling AS (SELECT visited_on, SUM(daily_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS amount, ROUND(AVG(daily_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS average_amount, ROW_NUMBER() OVER (ORDER BY visited_on) AS rn FROM Daily) SELECT visited_on, amount, average_amount FROM Rolling WHERE rn >= 7 ORDER BY visited_on;`,
    generatorPy: `import json
cases = [
    {
        "Customer": [
            {"customer_id": 1, "name": "Jhon", "visited_on": "2019-01-01", "amount": 100},
            {"customer_id": 2, "name": "Daniel", "visited_on": "2019-01-02", "amount": 110},
            {"customer_id": 3, "name": "Jade", "visited_on": "2019-01-03", "amount": 120},
            {"customer_id": 4, "name": "Khaled", "visited_on": "2019-01-04", "amount": 130},
            {"customer_id": 5, "name": "Winston", "visited_on": "2019-01-05", "amount": 110},
            {"customer_id": 6, "name": "Elvis", "visited_on": "2019-01-06", "amount": 140},
            {"customer_id": 7, "name": "Anna", "visited_on": "2019-01-07", "amount": 150},
            {"customer_id": 8, "name": "Maria", "visited_on": "2019-01-08", "amount": 80},
            {"customer_id": 9, "name": "Jaze", "visited_on": "2019-01-09", "amount": 110},
            {"customer_id": 1, "name": "Jhon", "visited_on": "2019-01-10", "amount": 130},
            {"customer_id": 3, "name": "Jade", "visited_on": "2019-01-10", "amount": 150}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 9. #1322 ads-performance
  {
    slug: 'ads-performance',
    number: 1322,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Click-Through Rate Ratio Metric',
        text: 'The click-through rate is defined as clicks / (clicks + views) * 100. If clicks and views sum to zero, the rate equals 0.'
      },
      {
        level: 2,
        title: 'Conditional Sum with Null If Safe Division',
        text: 'Use sum(action = "Clicked") / nullif(sum(action in ("Clicked", "Viewed")), 0) to avoid divide-by-zero errors.'
      },
      {
        level: 3,
        title: 'Ads Performance Blueprint',
        text: 'select ad_id, round(ifnull(sum(action = "Clicked") / sum(action in ("Clicked", "Viewed")) * 100, 0), 2) as ctr from Ads group by ad_id order by ctr desc, ad_id asc.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT ad_id,\n       ROUND(IFNULL(SUM(action = \'Clicked\') / SUM(action IN (\'Clicked\', \'Viewed\')) * 100, 0), 2) AS ctr\nFROM Ads\nGROUP BY ad_id\nORDER BY ctr DESC, ad_id ASC;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(A log A)',
      space: 'O(A)',
      variables: ['A: number of distinct ads'],
      notes: 'Group aggregation and sorting by CTR and ad_id runs in linear-logarithmic time.',
      whyNaiveFails: 'Simple division without null handling raises divide-by-zero errors when ads only have Ignored actions.',
      spaceTimeTradeoff: 'IFNULL wrapper prevents runtime division exceptions in constant time.',
      interviewerExpectation: 'Handling of zero clicks/views and compound sorting (ctr desc, ad_id asc).'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT ad_id,
       ROUND(IFNULL(SUM(action = 'Clicked') / SUM(action IN ('Clicked', 'Viewed')) * 100, 0), 2) AS ctr
FROM Ads
GROUP BY ad_id
ORDER BY ctr DESC, ad_id ASC;`,
        approach: 'Conditional Sum Aggregation with Divide-by-Zero Guard',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT ad_id,
       ROUND(COALESCE(SUM(CASE WHEN action = 'Clicked' THEN 1.0 ELSE 0.0 END) / NULLIF(SUM(CASE WHEN action IN ('Clicked', 'Viewed') THEN 1.0 ELSE 0.0 END), 0) * 100, 0), 2) AS ctr
FROM Ads
GROUP BY ad_id
ORDER BY ctr DESC, ad_id ASC;`,
        approach: 'PostgreSQL Coalesce with Nullif Safe Division',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def ads_performance(ads: pd.DataFrame) -> pd.DataFrame:
    grouped = ads.groupby('ad_id')
    res = []
    for ad_id, g in grouped:
        clicks = (g['action'] == 'Clicked').sum()
        views = (g['action'] == 'Viewed').sum()
        denom = clicks + views
        ctr = round((clicks / denom) * 100.0, 2) if denom > 0 else 0.0
        res.append({'ad_id': ad_id, 'ctr': ctr})
    df = pd.DataFrame(res)
    if df.empty:
        return pd.DataFrame(columns=['ad_id', 'ctr'])
    return df.sort_values(by=['ctr', 'ad_id'], ascending=[False, True])`,
        approach: 'Pandas Groupby Ratio Evaluation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Ads (ad_id int, user_id int, action varchar(20));`,
    referenceSql: `SELECT ad_id, ROUND(IFNULL(SUM(action = 'Clicked') / SUM(action IN ('Clicked', 'Viewed')) * 100, 0), 2) AS ctr FROM Ads GROUP BY ad_id ORDER BY ctr DESC, ad_id ASC;`,
    generatorPy: `import json
cases = [
    {
        "Ads": [
            {"ad_id": 1, "user_id": 1, "action": "Clicked"},
            {"ad_id": 2, "user_id": 2, "action": "Clicked"},
            {"ad_id": 3, "user_id": 3, "action": "Viewed"},
            {"ad_id": 5, "user_id": 5, "action": "Ignored"},
            {"ad_id": 1, "user_id": 7, "action": "Ignored"},
            {"ad_id": 2, "user_id": 7, "action": "Viewed"},
            {"ad_id": 3, "user_id": 5, "action": "Clicked"},
            {"ad_id": 1, "user_id": 4, "action": "Viewed"},
            {"ad_id": 2, "user_id": 11, "action": "Viewed"},
            {"ad_id": 1, "user_id": 2, "action": "Clicked"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 10. #1327 list-the-products-ordered-in-a-period
  {
    slug: 'list-the-products-ordered-in-a-period',
    number: 1327,
    category: 'Database',
    patterns: ['date-time'],
    hints: [
      {
        level: 1,
        title: 'Monthly Order Aggregation Filtering',
        text: 'Filter orders placed in February 2020, sum units by product, and retain products with total units >= 100.'
      },
      {
        level: 2,
        title: 'Having Filter on Summed Units',
        text: 'join Products with Orders, filter on order_date between 2020-02-01 and 2020-02-29, and use having sum(unit) >= 100.'
      },
      {
        level: 3,
        title: 'Product Orders Blueprint',
        text: 'select p.product_name, sum(o.unit) as unit from Products p join Orders o on p.product_id = o.product_id where o.order_date between "2020-02-01" and "2020-02-29" group by p.product_id, p.product_name having sum(o.unit) >= 100.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT p.product_name, SUM(o.unit) AS unit\nFROM Products p\nJOIN Orders o ON p.product_id = o.product_id\nWHERE o.order_date BETWEEN \'2020-02-01\' AND \'2020-02-29\'\nGROUP BY p.product_id, p.product_name\nHAVING SUM(o.unit) >= 100;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(O + P)',
      space: 'O(P)',
      variables: ['O: orders in February 2020', 'P: number of products'],
      notes: 'Date filtering followed by group aggregation runs in linear time relative to monthly orders.',
      whyNaiveFails: 'Grouping without date restrictions tallies units across the entire order history.',
      spaceTimeTradeoff: 'HAVING clause prunes low-volume products prior to output materialization.',
      interviewerExpectation: 'Date filtering for February 2020 leap year and HAVING sum >= 100.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT p.product_name, SUM(o.unit) AS unit
FROM Products p
JOIN Orders o ON p.product_id = o.product_id
WHERE o.order_date BETWEEN '2020-02-01' AND '2020-02-29'
GROUP BY p.product_id, p.product_name
HAVING SUM(o.unit) >= 100;`,
        approach: 'Date Range Join with Having Aggregate Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT p.product_name, SUM(o.unit) AS unit
FROM Products p
JOIN Orders o ON p.product_id = o.product_id
WHERE o.order_date BETWEEN '2020-02-01' AND '2020-02-29'
GROUP BY p.product_id, p.product_name
HAVING SUM(o.unit) >= 100;`,
        approach: 'PostgreSQL Date Filter with Having Clause',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def list_products(products: pd.DataFrame, orders: pd.DataFrame) -> pd.DataFrame:
    feb = orders[orders['order_date'].astype(str).str.startswith('2020-02')]
    merged = feb.merge(products, on='product_id')
    grouped = merged.groupby(['product_name'])['unit'].sum().reset_index()
    return grouped[grouped['unit'] >= 100]`,
        approach: 'Pandas Date String Filter and Groupby Sum',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Products (product_id int, product_name varchar(50), product_category varchar(50));
CREATE TABLE Orders (product_id int, order_date date, unit int);`,
    referenceSql: `SELECT p.product_name, SUM(o.unit) AS unit FROM Products p JOIN Orders o ON p.product_id = o.product_id WHERE o.order_date BETWEEN '2020-02-01' AND '2020-02-29' GROUP BY p.product_id, p.product_name HAVING SUM(o.unit) >= 100;`,
    generatorPy: `import json
cases = [
    {
        "Products": [
            {"product_id": 1, "product_name": "Leetcode Solutions", "product_category": "Book"},
            {"product_id": 2, "product_name": "Jewels of Stringology", "product_category": "Book"},
            {"product_id": 3, "product_name": "HP", "product_category": "Laptop"},
            {"product_id": 4, "product_name": "Lenovo", "product_category": "Laptop"},
            {"product_id": 5, "product_name": "Leetcode Kit", "product_category": "T-shirt"}
        ],
        "Orders": [
            {"product_id": 1, "order_date": "2020-02-05", "unit": 60},
            {"product_id": 1, "order_date": "2020-02-10", "unit": 70},
            {"product_id": 2, "order_date": "2020-01-18", "unit": 30},
            {"product_id": 2, "order_date": "2020-02-11", "unit": 80},
            {"product_id": 3, "order_date": "2020-02-17", "unit": 2},
            {"product_id": 3, "order_date": "2020-02-24", "unit": 3},
            {"product_id": 4, "order_date": "2020-03-01", "unit": 20},
            {"product_id": 4, "order_date": "2020-03-04", "unit": 30},
            {"product_id": 4, "order_date": "2020-03-04", "unit": 60},
            {"product_id": 5, "order_date": "2020-02-25", "unit": 50},
            {"product_id": 5, "order_date": "2020-02-27", "unit": 50},
            {"product_id": 5, "order_date": "2020-03-01", "unit": 50}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 11. #1336 number-of-transactions-per-visit
  {
    slug: 'number-of-transactions-per-visit',
    number: 1336,
    category: 'Database',
    patterns: ['recursive-cte'],
    hints: [
      {
        level: 1,
        title: 'Zero Fill Frequency Sequence Generation',
        text: 'Count transactions per user visit, and use a recursive CTE to produce continuous transaction counts from 0 up to max transactions.'
      },
      {
        level: 2,
        title: 'Left Join Visits with Transactions',
        text: 'Left join Visits with Transactions on user_id and visit_date to determine count of transactions completed on each visit.'
      },
      {
        level: 3,
        title: 'Recursive Sequence Join Blueprint',
        text: 'with recursive Numbers as (select 0 as n union all select n + 1 from Numbers where n < (select max(cnt) from VisitTxns)) join Numbers with VisitTxns counts.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH RECURSIVE VisitTxns AS (\n    SELECT v.user_id, v.visit_date, COUNT(t.transaction_date) AS txn_count\n    FROM Visits v\n    LEFT JOIN Transactions t ON v.user_id = t.user_id AND v.visit_date = t.transaction_date\n    GROUP BY v.user_id, v.visit_date\n),\nMaxVal AS (\n    SELECT IFNULL(MAX(txn_count), 0) AS max_n FROM VisitTxns\n),\nNumbers AS (\n    SELECT 0 AS n\n    UNION ALL\n    SELECT n + 1 FROM Numbers, MaxVal WHERE n < max_n\n)\nSELECT num.n AS transactions_count, COUNT(vt.user_id) AS visits_count\nFROM Numbers num\nLEFT JOIN VisitTxns vt ON num.n = vt.txn_count\nGROUP BY num.n\nORDER BY num.n;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(V + T + M)',
      space: 'O(V + M)',
      variables: ['V: number of visits', 'T: number of transactions', 'M: max transactions per visit'],
      notes: 'Recursive CTE generates integer range [0..M] followed by grouping on visit transaction counts.',
      whyNaiveFails: 'Grouping directly on visits omits intermediate transaction count frequencies with zero occurrences.',
      spaceTimeTradeoff: 'Recursive generator guarantees gap-free integer continuum without hardcoding table literals.',
      interviewerExpectation: 'Recursive CTE sequence generation and left join with visit transactions.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH RECURSIVE VisitTxns AS (
    SELECT v.user_id, v.visit_date, COUNT(t.transaction_date) AS txn_count
    FROM Visits v
    LEFT JOIN Transactions t ON v.user_id = t.user_id AND v.visit_date = t.transaction_date
    GROUP BY v.user_id, v.visit_date
),
MaxVal AS (
    SELECT IFNULL(MAX(txn_count), 0) AS max_n FROM VisitTxns
),
Numbers AS (
    SELECT 0 AS n
    UNION ALL
    SELECT n + 1 FROM Numbers, MaxVal WHERE n < max_n
)
SELECT num.n AS transactions_count, COUNT(vt.user_id) AS visits_count
FROM Numbers num
LEFT JOIN VisitTxns vt ON num.n = vt.txn_count
GROUP BY num.n
ORDER BY num.n;`,
        approach: 'Recursive CTE Number Sequence with Left Join Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH RECURSIVE VisitTxns AS (
    SELECT v.user_id, v.visit_date, COUNT(t.transaction_date) AS txn_count
    FROM Visits v
    LEFT JOIN Transactions t ON v.user_id = t.user_id AND v.visit_date = t.transaction_date
    GROUP BY v.user_id, v.visit_date
),
MaxVal AS (
    SELECT COALESCE(MAX(txn_count), 0) AS max_n FROM VisitTxns
),
Numbers AS (
    SELECT 0 AS n
    UNION ALL
    SELECT n + 1 FROM Numbers, MaxVal WHERE n < max_n
)
SELECT num.n AS transactions_count, COUNT(vt.user_id) AS visits_count
FROM Numbers num
LEFT JOIN VisitTxns vt ON num.n = vt.txn_count
GROUP BY num.n
ORDER BY num.n;`,
        approach: 'PostgreSQL Recursive CTE with Full Range Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def draw_chart(visits: pd.DataFrame, transactions: pd.DataFrame) -> pd.DataFrame:
    txns = transactions.groupby(['user_id', 'transaction_date']).size().reset_index(name='txn_count')
    merged = visits.merge(txns, left_on=['user_id', 'visit_date'], right_on=['user_id', 'transaction_date'], how='left')
    merged['txn_count'] = merged['txn_count'].fillna(0).astype(int)
    counts = merged.groupby('txn_count').size().to_dict()
    max_txn = merged['txn_count'].max() if not merged.empty else 0
    res = []
    for n in range(max_txn + 1):
        res.append({'transactions_count': n, 'visits_count': counts.get(n, 0)})
    return pd.DataFrame(res)`,
        approach: 'Pandas Full Integer Range Generator and Count Mapping',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Visits (user_id int, visit_date date);
CREATE TABLE Transactions (user_id int, transaction_date date, amount int);`,
    referenceSql: `WITH RECURSIVE VisitTxns AS (SELECT v.user_id, v.visit_date, COUNT(t.transaction_date) AS txn_count FROM Visits v LEFT JOIN Transactions t ON v.user_id = t.user_id AND v.visit_date = t.transaction_date GROUP BY v.user_id, v.visit_date), MaxVal AS (SELECT IFNULL(MAX(txn_count), 0) AS max_n FROM VisitTxns), Numbers AS (SELECT 0 AS n UNION ALL SELECT n + 1 FROM Numbers, MaxVal WHERE n < max_n) SELECT num.n AS transactions_count, COUNT(vt.user_id) AS visits_count FROM Numbers num LEFT JOIN VisitTxns vt ON num.n = vt.txn_count GROUP BY num.n ORDER BY num.n;`,
    generatorPy: `import json
cases = [
    {
        "Visits": [
            {"user_id": 1, "visit_date": "2020-01-01"},
            {"user_id": 2, "visit_date": "2020-01-02"},
            {"user_id": 12, "visit_date": "2020-01-01"},
            {"user_id": 19, "visit_date": "2020-01-03"},
            {"user_id": 1, "visit_date": "2020-01-02"},
            {"user_id": 2, "visit_date": "2020-01-03"},
            {"user_id": 1, "visit_date": "2020-01-04"},
            {"user_id": 7, "visit_date": "2020-01-11"},
            {"user_id": 9, "visit_date": "2020-01-25"},
            {"user_id": 8, "visit_date": "2020-01-28"}
        ],
        "Transactions": [
            {"user_id": 1, "transaction_date": "2020-01-02", "amount": 120},
            {"user_id": 2, "transaction_date": "2020-01-03", "amount": 22},
            {"user_id": 7, "transaction_date": "2020-01-11", "amount": 232},
            {"user_id": 1, "transaction_date": "2020-01-04", "amount": 7},
            {"user_id": 9, "transaction_date": "2020-01-25", "amount": 33},
            {"user_id": 9, "transaction_date": "2020-01-25", "amount": 66},
            {"user_id": 8, "transaction_date": "2020-01-28", "amount": 1},
            {"user_id": 9, "transaction_date": "2020-01-25", "amount": 99}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 12. #1341 movie-rating
  {
    slug: 'movie-rating',
    number: 1341,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Two Distinct Metric Queries with Union All',
        text: 'The problem requires finding the user who rated the most movies, and the movie with the highest average rating in February 2020.'
      },
      {
        level: 2,
        title: 'Tie-Breaking via Lexicographical Order',
        text: 'Sort first by metric descending (count or avg rating), and break ties by name alphabetically in ascending order.'
      },
      {
        level: 3,
        title: 'Union All Limit Blueprint',
        text: '(select u.name as results from Users u join MovieRating mr on u.user_id = mr.user_id group by u.user_id, u.name order by count(*) desc, u.name asc limit 1) union all (select m.title as results from Movies m join MovieRating mr on m.movie_id = mr.movie_id where mr.created_at between "2020-02-01" and "2020-02-29" group by m.movie_id, m.title order by avg(mr.rating) desc, m.title asc limit 1).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\n(SELECT u.name AS results\n FROM Users u\n JOIN MovieRating mr ON u.user_id = mr.user_id\n GROUP BY u.user_id, u.name\n ORDER BY COUNT(*) DESC, u.name ASC\n LIMIT 1)\nUNION ALL\n(SELECT m.title AS results\n FROM Movies m\n JOIN MovieRating mr ON m.movie_id = mr.movie_id\n WHERE mr.created_at BETWEEN \'2020-02-01\' AND \'2020-02-29\'\n GROUP BY m.movie_id, m.title\n ORDER BY AVG(mr.rating) DESC, m.title ASC\n LIMIT 1);\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(R log R)',
      space: 'O(U + M)',
      variables: ['R: movie ratings records', 'U: users', 'M: movies'],
      notes: 'Two independent group aggregations with top-1 limits united into a 2-row result set.',
      whyNaiveFails: 'Using simple UNION instead of UNION ALL deduplicates if the top user and movie have identical names.',
      spaceTimeTradeoff: 'Parenthesized sub-queries with LIMIT 1 execute the two independent rankings concurrently.',
      interviewerExpectation: 'Use of UNION ALL and separate group aggregations with tie-breaking.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `(SELECT u.name AS results
 FROM Users u
 JOIN MovieRating mr ON u.user_id = mr.user_id
 GROUP BY u.user_id, u.name
 ORDER BY COUNT(*) DESC, u.name ASC
 LIMIT 1)
UNION ALL
(SELECT m.title AS results
 FROM Movies m
 JOIN MovieRating mr ON m.movie_id = mr.movie_id
 WHERE mr.created_at BETWEEN '2020-02-01' AND '2020-02-29'
 GROUP BY m.movie_id, m.title
 ORDER BY AVG(mr.rating) DESC, m.title ASC
 LIMIT 1);`,
        approach: 'Dual Subquery Ranking with Union All',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `(SELECT u.name AS results
 FROM Users u
 JOIN MovieRating mr ON u.user_id = mr.user_id
 GROUP BY u.user_id, u.name
 ORDER BY COUNT(*) DESC, u.name ASC
 LIMIT 1)
UNION ALL
(SELECT m.title AS results
 FROM Movies m
 JOIN MovieRating mr ON m.movie_id = mr.movie_id
 WHERE mr.created_at BETWEEN '2020-02-01' AND '2020-02-29'
 GROUP BY m.movie_id, m.title
 ORDER BY AVG(mr.rating) DESC, m.title ASC
 LIMIT 1);`,
        approach: 'PostgreSQL Dual Branch Union All',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def movie_rating(movies: pd.DataFrame, users: pd.DataFrame, movie_rating: pd.DataFrame) -> pd.DataFrame:
    # 1. Top user
    u_counts = movie_rating.groupby('user_id').size().reset_index(name='cnt')
    u_merged = u_counts.merge(users, on='user_id')
    u_sorted = u_merged.sort_values(by=['cnt', 'name'], ascending=[False, True])
    top_user = u_sorted.iloc[0]['name']

    # 2. Top movie in Feb 2020
    feb = movie_rating[movie_rating['created_at'].astype(str).str.startswith('2020-02')]
    m_avg = feb.groupby('movie_id')['rating'].mean().reset_index()
    m_merged = m_avg.merge(movies, on='movie_id')
    m_sorted = m_merged.sort_values(by=['rating', 'title'], ascending=[False, True])
    top_movie = m_sorted.iloc[0]['title']

    return pd.DataFrame({'results': [top_user, top_movie]})`,
        approach: 'Pandas Independent Metric Sorts and Concatenation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Movies (movie_id int, title varchar(50));
CREATE TABLE Users (user_id int, name varchar(50));
CREATE TABLE MovieRating (movie_id int, user_id int, rating int, created_at date);`,
    referenceSql: `(SELECT u.name AS results FROM Users u JOIN MovieRating mr ON u.user_id = mr.user_id GROUP BY u.user_id, u.name ORDER BY COUNT(*) DESC, u.name ASC LIMIT 1) UNION ALL (SELECT m.title AS results FROM Movies m JOIN MovieRating mr ON m.movie_id = mr.movie_id WHERE mr.created_at BETWEEN '2020-02-01' AND '2020-02-29' GROUP BY m.movie_id, m.title ORDER BY AVG(mr.rating) DESC, m.title ASC LIMIT 1);`,
    generatorPy: `import json
cases = [
    {
        "Movies": [
            {"movie_id": 1, "title": "Avengers"},
            {"movie_id": 2, "title": "Frozen 2"},
            {"movie_id": 3, "title": "Joker"}
        ],
        "Users": [
            {"user_id": 1, "name": "Daniel"},
            {"user_id": 2, "name": "Monica"},
            {"user_id": 3, "name": "Maria"},
            {"user_id": 4, "name": "James"}
        ],
        "MovieRating": [
            {"movie_id": 1, "user_id": 1, "rating": 3, "created_at": "2020-01-12"},
            {"movie_id": 1, "user_id": 2, "rating": 4, "created_at": "2020-02-11"},
            {"movie_id": 1, "user_id": 3, "rating": 2, "created_at": "2020-02-12"},
            {"movie_id": 1, "user_id": 4, "rating": 1, "created_at": "2020-01-01"},
            {"movie_id": 2, "user_id": 1, "rating": 5, "created_at": "2020-02-17"},
            {"movie_id": 2, "user_id": 2, "rating": 2, "created_at": "2020-02-01"},
            {"movie_id": 2, "user_id": 3, "rating": 2, "created_at": "2020-03-01"},
            {"movie_id": 3, "user_id": 1, "rating": 3, "created_at": "2020-02-22"},
            {"movie_id": 3, "user_id": 2, "rating": 4, "created_at": "2020-02-25"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 13. #1350 students-with-invalid-departments
  {
    slug: 'students-with-invalid-departments',
    number: 1350,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Unenrolled Student Anti-Join',
        text: 'Identify students whose department_id does not correspond to any valid department in Departments.'
      },
      {
        level: 2,
        title: 'Left Join Null Filter or Not In',
        text: 'left join Students with Departments on department_id and filter where Departments.id is null.'
      },
      {
        level: 3,
        title: 'Invalid Departments Blueprint',
        text: 'select s.id, s.name from Students s left join Departments d on s.department_id = d.id where d.id is null.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT s.id, s.name\nFROM Students s\nLEFT JOIN Departments d ON s.department_id = d.id\nWHERE d.id IS NULL;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(S + D)',
      space: 'O(S)',
      variables: ['S: number of students', 'D: number of departments'],
      notes: 'Hash anti-join scans departments to filter students with missing department links.',
      whyNaiveFails: 'Full quadratic Cartesian joins scale poorly compared to direct anti-joins.',
      spaceTimeTradeoff: 'Left join IS NULL pattern avoids NOT IN nullability hazards.',
      interviewerExpectation: 'Left anti-join or NOT EXISTS subquery.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT s.id, s.name
FROM Students s
LEFT JOIN Departments d ON s.department_id = d.id
WHERE d.id IS NULL;`,
        approach: 'Left Anti-Join on Missing Department ID',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT s.id, s.name
FROM Students s
LEFT JOIN Departments d ON s.department_id = d.id
WHERE d.id IS NULL;`,
        approach: 'PostgreSQL Left Join Null Check',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def find_students(departments: pd.DataFrame, students: pd.DataFrame) -> pd.DataFrame:
    valid_depts = set(departments['id'])
    invalid = students[~students['department_id'].isin(valid_depts)]
    return invalid[['id', 'name']]`,
        approach: 'Pandas Set Membership Anti-Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Departments (id int, name varchar(50));
CREATE TABLE Students (id int, name varchar(50), department_id int);`,
    referenceSql: `SELECT s.id, s.name FROM Students s LEFT JOIN Departments d ON s.department_id = d.id WHERE d.id IS NULL;`,
    generatorPy: `import json
cases = [
    {
        "Departments": [
            {"id": 1, "name": "Electrical Engineering"},
            {"id": 7, "name": "Computer Engineering"},
            {"id": 13, "name": "Business Administration"}
        ],
        "Students": [
            {"id": 23, "name": "Alice", "department_id": 1},
            {"id": 1, "name": "Bob", "department_id": 7},
            {"id": 5, "name": "Jennifer", "department_id": 13},
            {"id": 2, "name": "John", "department_id": 14},
            {"id": 4, "name": "Jasmine", "department_id": 77},
            {"id": 3, "name": "Steve", "department_id": 74},
            {"id": 6, "name": "Luis", "department_id": 1},
            {"id": 8, "name": "Jonathan", "department_id": 7},
            {"id": 7, "name": "Daiana", "department_id": 33},
            {"id": 11, "name": "Madelynn", "department_id": 27}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 14. #1355 activity-participants
  {
    slug: 'activity-participants',
    number: 1355,
    category: 'Database',
    patterns: ['having-filter'],
    hints: [
      {
        level: 1,
        title: 'Extrema Participant Frequency Exclusion',
        text: 'Find all activities whose participant counts are neither the maximum nor the minimum participant count across all activities.'
      },
      {
        level: 2,
        title: 'Having Filter with Subquery Min and Max',
        text: 'group by activity and filter having count(*) > min_participants and count(*) < max_participants.'
      },
      {
        level: 3,
        title: 'Activity Participants Blueprint',
        text: 'with ActivityCounts as (select activity, count(*) as cnt from Friends group by activity) select activity from ActivityCounts where cnt > (select min(cnt) from ActivityCounts) and cnt < (select max(cnt) from ActivityCounts).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH ActivityCounts AS (\n    SELECT activity, COUNT(*) AS cnt\n    FROM Friends\n    GROUP BY activity\n)\nSELECT activity\nFROM ActivityCounts\nWHERE cnt > (SELECT MIN(cnt) FROM ActivityCounts)\n  AND cnt < (SELECT MAX(cnt) FROM ActivityCounts);\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(F + A)',
      space: 'O(A)',
      variables: ['F: number of friends', 'A: number of activities'],
      notes: 'Group aggregation followed by subquery scalar min/max comparison runs in linear time.',
      whyNaiveFails: 'Hardcoding static count thresholds fails when all activities have identical participant numbers.',
      spaceTimeTradeoff: 'CTE caches activity frequencies to compute dynamic min and max cleanly.',
      interviewerExpectation: 'Exclusion of both global minimum and maximum frequencies using aggregate subqueries.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH ActivityCounts AS (
    SELECT activity, COUNT(*) AS cnt
    FROM Friends
    GROUP BY activity
)
SELECT activity
FROM ActivityCounts
WHERE cnt > (SELECT MIN(cnt) FROM ActivityCounts)
  AND cnt < (SELECT MAX(cnt) FROM ActivityCounts);`,
        approach: 'CTE Activity Frequency Count with Extrema Exclusion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH ActivityCounts AS (
    SELECT activity, COUNT(*) AS cnt
    FROM Friends
    GROUP BY activity
)
SELECT activity
FROM ActivityCounts
WHERE cnt > (SELECT MIN(cnt) FROM ActivityCounts)
  AND cnt < (SELECT MAX(cnt) FROM ActivityCounts);`,
        approach: 'PostgreSQL CTE Extrema Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def activity_participants(friends: pd.DataFrame, activities: pd.DataFrame) -> pd.DataFrame:
    counts = friends.groupby('activity').size().reset_index(name='cnt')
    if counts.empty:
        return pd.DataFrame(columns=['activity'])
    min_c = counts['cnt'].min()
    max_c = counts['cnt'].max()
    res = counts[(counts['cnt'] > min_c) & (counts['cnt'] < max_c)]
    return res[['activity']]`,
        approach: 'Pandas Size Groupby with Min/Max Exclusions',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Friends (id int, name varchar(50), activity varchar(50));
CREATE TABLE Activities (id int, name varchar(50));`,
    referenceSql: `WITH ActivityCounts AS (SELECT activity, COUNT(*) AS cnt FROM Friends GROUP BY activity) SELECT activity FROM ActivityCounts WHERE cnt > (SELECT MIN(cnt) FROM ActivityCounts) AND cnt < (SELECT MAX(cnt) FROM ActivityCounts);`,
    generatorPy: `import json
cases = [
    {
        "Friends": [
            {"id": 1, "name": "Jonathan D.", "activity": "Eating"},
            {"id": 2, "name": "Jade W.", "activity": "Singing"},
            {"id": 3, "name": "Victor J.", "activity": "Singing"},
            {"id": 4, "name": "Elvis Q.", "activity": "Eating"},
            {"id": 5, "name": "Daniel A.", "activity": "Eating"},
            {"id": 6, "name": "Bob B.", "activity": "Horse Riding"}
        ],
        "Activities": [
            {"id": 1, "name": "Eating"},
            {"id": 2, "name": "Singing"},
            {"id": 3, "name": "Horse Riding"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 15. #1364 number-of-trusted-contacts-of-a-customer
  {
    slug: 'number-of-trusted-contacts-of-a-customer',
    number: 1364,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Invoice Customer Contact Metrics',
        text: 'For each invoice, report invoice_id, customer_name, price, total contacts, and trusted contacts who are also customers.'
      },
      {
        level: 2,
        title: 'Left Join Contacts and Customers',
        text: 'left join Invoices with Customers, Contacts, and again Customers on contact email to identify trusted contacts.'
      },
      {
        level: 3,
        title: 'Trusted Contacts Aggregation Blueprint',
        text: 'select inv.invoice_id, c.customer_name, inv.price, count(con.user_id) as contacts_cnt, count(cust_con.customer_id) as trusted_contacts_cnt from Invoices inv join Customers c on inv.user_id = c.customer_id left join Contacts con on inv.user_id = con.user_id left join Customers cust_con on con.contact_email = cust_con.email group by inv.invoice_id, c.customer_name, inv.price order by inv.invoice_id.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT inv.invoice_id, \n       c.customer_name, \n       inv.price, \n       COUNT(con.user_id) AS contacts_cnt, \n       COUNT(cust_con.customer_id) AS trusted_contacts_cnt\nFROM Invoices inv\nJOIN Customers c ON inv.user_id = c.customer_id\nLEFT JOIN Contacts con ON inv.user_id = con.user_id\nLEFT JOIN Customers cust_con ON con.contact_email = cust_con.email\nGROUP BY inv.invoice_id, c.customer_name, inv.price\nORDER BY inv.invoice_id;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(I + C + N)',
      space: 'O(I)',
      variables: ['I: number of invoices', 'C: number of contacts', 'N: number of customers'],
      notes: 'Equi-joins and group aggregation order invoice summaries in linear time.',
      whyNaiveFails: 'Inner joining contacts drops invoices for customers with zero contacts recorded.',
      spaceTimeTradeoff: 'Dual left join on customer email counts contacts and trusted contacts in one pass.',
      interviewerExpectation: 'Use of LEFT JOIN to preserve invoices with zero contacts and COUNT on matched customer_id.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT inv.invoice_id, 
       c.customer_name, 
       inv.price, 
       COUNT(con.user_id) AS contacts_cnt, 
       COUNT(cust_con.customer_id) AS trusted_contacts_cnt
FROM Invoices inv
JOIN Customers c ON inv.user_id = c.customer_id
LEFT JOIN Contacts con ON inv.user_id = con.user_id
LEFT JOIN Customers cust_con ON con.contact_email = cust_con.email
GROUP BY inv.invoice_id, c.customer_name, inv.price
ORDER BY inv.invoice_id;`,
        approach: 'Multi-Table Left Join with Contact Email Verification',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT inv.invoice_id, 
       c.customer_name, 
       inv.price, 
       COUNT(con.user_id) AS contacts_cnt, 
       COUNT(cust_con.customer_id) AS trusted_contacts_cnt
FROM Invoices inv
JOIN Customers c ON inv.user_id = c.customer_id
LEFT JOIN Contacts con ON inv.user_id = con.user_id
LEFT JOIN Customers cust_con ON con.contact_email = cust_con.email
GROUP BY inv.invoice_id, c.customer_name, inv.price
ORDER BY inv.invoice_id;`,
        approach: 'PostgreSQL Left Join Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def count_visited_nodes(customers: pd.DataFrame, contacts: pd.DataFrame, invoices: pd.DataFrame) -> pd.DataFrame:
    cust_emails = set(customers['email'])
    res = []
    cust_map = dict(zip(customers['customer_id'], customers['customer_name']))
    for _, inv in invoices.iterrows():
        uid = inv['user_id']
        c_name = cust_map.get(uid, '')
        user_contacts = contacts[contacts['user_id'] == uid]
        contacts_cnt = len(user_contacts)
        trusted_cnt = user_contacts['contact_email'].isin(cust_emails).sum()
        res.append({
            'invoice_id': inv['invoice_id'],
            'customer_name': c_name,
            'price': inv['price'],
            'contacts_cnt': contacts_cnt,
            'trusted_contacts_cnt': trusted_cnt
        })
    df = pd.DataFrame(res)
    return df.sort_values(by='invoice_id') if not df.empty else df`,
        approach: 'Pandas Iterative Invoice Summary with Email Set Lookup',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Customers (customer_id int, customer_name varchar(50), email varchar(50));
CREATE TABLE Contacts (user_id int, contact_name varchar(50), contact_email varchar(50));
CREATE TABLE Invoices (invoice_id int, price int, user_id int);`,
    referenceSql: `SELECT inv.invoice_id, c.customer_name, inv.price, COUNT(con.user_id) AS contacts_cnt, COUNT(cust_con.customer_id) AS trusted_contacts_cnt FROM Invoices inv JOIN Customers c ON inv.user_id = c.customer_id LEFT JOIN Contacts con ON inv.user_id = con.user_id LEFT JOIN Customers cust_con ON con.contact_email = cust_con.email GROUP BY inv.invoice_id, c.customer_name, inv.price ORDER BY inv.invoice_id;`,
    generatorPy: `import json
cases = [
    {
        "Customers": [
            {"customer_id": 1, "customer_name": "Alice", "email": "alice@leetcode.com"},
            {"customer_id": 2, "customer_name": "Bob", "email": "bob@leetcode.com"},
            {"customer_id": 13, "customer_name": "John", "email": "john@leetcode.com"},
            {"customer_id": 6, "customer_name": "Alex", "email": "alex@leetcode.com"}
        ],
        "Contacts": [
            {"user_id": 1, "contact_name": "Bob", "contact_email": "bob@leetcode.com"},
            {"user_id": 1, "contact_name": "John", "contact_email": "john@leetcode.com"},
            {"user_id": 1, "contact_name": "Jal", "contact_email": "jal@leetcode.com"},
            {"user_id": 2, "contact_name": "Omar", "contact_email": "omar@leetcode.com"},
            {"user_id": 2, "contact_name": "Meir", "contact_email": "meir@leetcode.com"},
            {"user_id": 6, "contact_name": "Alice", "contact_email": "alice@leetcode.com"}
        ],
        "Invoices": [
            {"invoice_id": 77, "price": 100, "user_id": 1},
            {"invoice_id": 88, "price": 200, "user_id": 1},
            {"invoice_id": 99, "price": 300, "user_id": 2},
            {"invoice_id": 66, "price": 400, "user_id": 2},
            {"invoice_id": 55, "price": 500, "user_id": 13},
            {"invoice_id": 44, "price": 600, "user_id": 6}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 16. #1369 get-the-second-most-recent-activity
  {
    slug: 'get-the-second-most-recent-activity',
    number: 1369,
    category: 'Database',
    patterns: ['window-ranking'],
    hints: [
      {
        level: 1,
        title: 'Second Most Recent or Singular Activity Fallback',
        text: 'Retrieve the second most recent activity for each user. If a user has only one activity record, return that single activity.'
      },
      {
        level: 2,
        title: 'Window Ranking and Total Count Partition',
        text: 'Use row_number() over (partition by username order by endDate desc) and count(*) over (partition by username).'
      },
      {
        level: 3,
        title: 'Second Recent Activity Blueprint',
        text: 'with Ranked as (select username, activity, startDate, endDate, row_number() over (partition by username order by endDate desc) as rn, count(*) over (partition by username) as total from UserActivity) select username, activity, startDate, endDate from Ranked where rn = 2 or total = 1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH Ranked AS (\n    SELECT username, activity, startDate, endDate,\n           ROW_NUMBER() OVER (PARTITION BY username ORDER BY endDate DESC) AS rn,\n           COUNT(*) OVER (PARTITION BY username) AS total\n    FROM UserActivity\n)\nSELECT username, activity, startDate, endDate\nFROM Ranked\nWHERE rn = 2 OR total = 1;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(U log U)',
      space: 'O(U)',
      variables: ['U: number of records in UserActivity table'],
      notes: 'Window ranking and total count partition by user executes in linear-logarithmic time.',
      whyNaiveFails: 'Simple limit offset 1 fails when users with a single activity should retain their solitary record.',
      spaceTimeTradeoff: 'Dual analytic functions evaluate rank and total count in a single window partition pass.',
      interviewerExpectation: 'Use of ROW_NUMBER() with COUNT(*) partition fallback (rn = 2 OR total = 1).'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH Ranked AS (
    SELECT username, activity, startDate, endDate,
           ROW_NUMBER() OVER (PARTITION BY username ORDER BY endDate DESC) AS rn,
           COUNT(*) OVER (PARTITION BY username) AS total
    FROM UserActivity
)
SELECT username, activity, startDate, endDate
FROM Ranked
WHERE rn = 2 OR total = 1;`,
        approach: 'Window Ranking with Single Activity Fallback',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH Ranked AS (
    SELECT username, activity, startDate, endDate,
           ROW_NUMBER() OVER (PARTITION BY username ORDER BY endDate DESC) AS rn,
           COUNT(*) OVER (PARTITION BY username) AS total
    FROM UserActivity
)
SELECT username, activity, startDate, endDate
FROM Ranked
WHERE rn = 2 OR total = 1;`,
        approach: 'PostgreSQL Window Rank and Partition Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def second_most_recent_activity(user_activity: pd.DataFrame) -> pd.DataFrame:
    user_activity = user_activity.sort_values(by=['username', 'endDate'], ascending=[True, False])
    user_activity['rn'] = user_activity.groupby('username').cumcount() + 1
    user_activity['total'] = user_activity.groupby('username')['endDate'].transform('count')
    res = user_activity[(user_activity['rn'] == 2) | (user_activity['total'] == 1)]
    return res[['username', 'activity', 'startDate', 'endDate']]`,
        approach: 'Pandas Cumcount and Transform Count Fallback',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE UserActivity (username varchar(50), activity varchar(50), startDate date, endDate date);`,
    referenceSql: `WITH Ranked AS (SELECT username, activity, startDate, endDate, ROW_NUMBER() OVER (PARTITION BY username ORDER BY endDate DESC) AS rn, COUNT(*) OVER (PARTITION BY username) AS total FROM UserActivity) SELECT username, activity, startDate, endDate FROM Ranked WHERE rn = 2 OR total = 1;`,
    generatorPy: `import json
cases = [
    {
        "UserActivity": [
            {"username": "Alice", "activity": "Travel", "startDate": "2020-02-12", "endDate": "2020-02-20"},
            {"username": "Alice", "activity": "Dancing", "startDate": "2020-02-21", "endDate": "2020-02-23"},
            {"username": "Alice", "activity": "Travel", "startDate": "2020-02-24", "endDate": "2020-02-28"},
            {"username": "Bob", "activity": "Travel", "startDate": "2020-02-11", "endDate": "2020-02-18"}
        ]
    }
]
print(json.dumps(cases))
`
  }
];
