export const batch17Db = [
  // 1. #1097 game-play-analysis-v
  {
    slug: 'game-play-analysis-v',
    number: 1097,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Player Installation and Day One Retention',
        text: 'Determine the earliest installation date for each player, then check if they logged activity exactly one day later.'
      },
      {
        level: 2,
        title: 'Install Date Aggregation with Next-Day Outer Join',
        text: 'Group activity by player to find min event date. Left join with activity matching player identifier and event date plus one day.'
      },
      {
        level: 3,
        title: 'Retention Calculation Blueprint',
        text: 'with Installs as (select player_id, min(event_date) as install_dt from Activity group by player_id) select i.install_dt, count(i.player_id) as installs, round(count(a.player_id) / count(i.player_id), 2) as Day1_retention from Installs i left join Activity a on i.player_id = a.player_id and a.event_date = date_add(i.install_dt, interval 1 day) group by i.install_dt.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH Installs AS (\n    SELECT player_id, MIN(event_date) AS install_dt\n    FROM Activity\n    GROUP BY player_id\n)\nSELECT i.install_dt,\n       COUNT(i.player_id) AS installs,\n       ROUND(COUNT(a.player_id) / COUNT(i.player_id), 2) AS Day1_retention\nFROM Installs i\nLEFT JOIN Activity a\n  ON i.player_id = a.player_id\n AND a.event_date = DATE_ADD(i.install_dt, INTERVAL 1 DAY)\nGROUP BY i.install_dt;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(A log A)',
      space: 'O(A)',
      variables: ['A: number of activity logs'],
      notes: 'Grouped min aggregation followed by next-day equi-join runs in linear-logarithmic time.',
      whyNaiveFails: 'Correlated scalar queries checking day-one logins per player incur quadratic scans across activity records.',
      spaceTimeTradeoff: 'Common table expression precomputes installation cohorts, enabling single-pass join filtering.',
      interviewerExpectation: 'Use of DATE_ADD for exact single-day offset and LEFT JOIN to preserve zero retention cohorts.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH Installs AS (
    SELECT player_id, MIN(event_date) AS install_dt
    FROM Activity
    GROUP BY player_id
)
SELECT i.install_dt,
       COUNT(i.player_id) AS installs,
       ROUND(COUNT(a.player_id) / COUNT(i.player_id), 2) AS Day1_retention
FROM Installs i
LEFT JOIN Activity a
  ON i.player_id = a.player_id
 AND a.event_date = DATE_ADD(i.install_dt, INTERVAL 1 DAY)
GROUP BY i.install_dt;`,
        approach: 'Installation CTE with Next-Day Left Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH Installs AS (
    SELECT player_id, MIN(event_date) AS install_dt
    FROM Activity
    GROUP BY player_id
)
SELECT i.install_dt,
       COUNT(i.player_id) AS installs,
       ROUND(COUNT(a.player_id)::numeric / COUNT(i.player_id), 2) AS "Day1_retention"
FROM Installs i
LEFT JOIN Activity a
  ON i.player_id = a.player_id
 AND a.event_date = i.install_dt + INTERVAL '1 day'
GROUP BY i.install_dt;`,
        approach: 'PostgreSQL Interval Offset with Numeric Cast',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def gameplay_analysis(activity: pd.DataFrame) -> pd.DataFrame:
    installs = activity.groupby('player_id')['event_date'].min().reset_index()
    installs.rename(columns={'event_date': 'install_dt'}, inplace=True)
    activity['next_day'] = activity['event_date'] - pd.Timedelta(days=1)
    merged = installs.merge(activity, left_on=['player_id', 'install_dt'], right_on=['player_id', 'next_day'], how='left')
    res = merged.groupby('install_dt').agg(
        installs=('player_id', 'nunique'),
        retained=('event_date', 'count')
    ).reset_index()
    res['Day1_retention'] = (res['retained'] / res['installs']).round(2)
    return res[['install_dt', 'installs', 'Day1_retention']]`,
        approach: 'Pandas Groupby Minimum and Offset Merge',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Activity (player_id int, device_id int, event_date date, games_played int);`,
    referenceSql: `WITH Installs AS (SELECT player_id, MIN(event_date) AS install_dt FROM Activity GROUP BY player_id) SELECT i.install_dt, COUNT(i.player_id) AS installs, ROUND(COUNT(a.player_id) / COUNT(i.player_id), 2) AS Day1_retention FROM Installs i LEFT JOIN Activity a ON i.player_id = a.player_id AND a.event_date = DATE_ADD(i.install_dt, INTERVAL 1 DAY) GROUP BY i.install_dt;`,
    generatorPy: `import json
cases = [
    {
        "Activity": [
            {"player_id": 1, "device_id": 2, "event_date": "2016-03-01", "games_played": 5},
            {"player_id": 1, "device_id": 2, "event_date": "2016-03-02", "games_played": 6},
            {"player_id": 2, "device_id": 3, "event_date": "2017-06-25", "games_played": 1},
            {"player_id": 3, "device_id": 1, "event_date": "2016-03-01", "games_played": 0},
            {"player_id": 3, "device_id": 4, "event_date": "2016-07-03", "games_played": 5}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 2. #1098 unpopular-books
  {
    slug: 'unpopular-books',
    number: 1098,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Annual Sales and Publication Window Filter',
        text: 'Filter books available at least one month before 2019-06-23, then identify those with fewer than ten copies sold in the past year.'
      },
      {
        level: 2,
        title: 'Left Join with Date-Bounded Quantity Sum',
        text: 'Left join books with orders dispatched between 2018-06-23 and 2019-06-23, grouping to test if total quantity is under ten.'
      },
      {
        level: 3,
        title: 'Unpopular Books Blueprint',
        text: 'select b.book_id, b.name from Books b left join Orders o on b.book_id = o.book_id and o.dispatch_date between "2018-06-23" and "2019-06-23" where b.available_from <= "2019-05-23" group by b.book_id, b.name having coalesce(sum(o.quantity), 0) < 10.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT b.book_id, b.name\nFROM Books b\nLEFT JOIN Orders o\n  ON b.book_id = o.book_id\n AND o.dispatch_date BETWEEN \'2018-06-23\' AND \'2019-06-23\'\nWHERE b.available_from <= \'2019-05-23\'\nGROUP BY b.book_id, b.name\nHAVING IFNULL(SUM(o.quantity), 0) < 10;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(B + O)',
      space: 'O(B)',
      variables: ['B: number of book titles', 'O: number of orders placed'],
      notes: 'Filtering on availability followed by hash-based left join aggregation runs in linear time.',
      whyNaiveFails: 'Inner join ignores books with zero sales over the target year, misidentifying them as popular.',
      spaceTimeTradeoff: 'Condition in ON clause maintains books with zero sales without full outer table scans.',
      interviewerExpectation: 'Correctly handling zero-sales books via LEFT JOIN and COALESCE / IFNULL.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT b.book_id, b.name
FROM Books b
LEFT JOIN Orders o
  ON b.book_id = o.book_id
 AND o.dispatch_date BETWEEN '2018-06-23' AND '2019-06-23'
WHERE b.available_from <= '2019-05-23'
GROUP BY b.book_id, b.name
HAVING IFNULL(SUM(o.quantity), 0) < 10;`,
        approach: 'Left Join with Date-Restricted Quantity Threshold',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT b.book_id, b.name
FROM Books b
LEFT JOIN Orders o
  ON b.book_id = o.book_id
 AND o.dispatch_date BETWEEN '2018-06-23' AND '2019-06-23'
WHERE b.available_from <= '2019-05-23'
GROUP BY b.book_id, b.name
HAVING COALESCE(SUM(o.quantity), 0) < 10;`,
        approach: 'PostgreSQL Coalesce Having Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def unpopular_books(books: pd.DataFrame, orders: pd.DataFrame) -> pd.DataFrame:
    valid_books = books[books['available_from'] <= '2019-05-23']
    annual_orders = orders[(orders['dispatch_date'] >= '2018-06-23') & (orders['dispatch_date'] <= '2019-06-23')]
    sales = annual_orders.groupby('book_id')['quantity'].sum().reset_index()
    merged = valid_books.merge(sales, on='book_id', how='left')
    merged['quantity'] = merged['quantity'].fillna(0)
    res = merged[merged['quantity'] < 10]
    return res[['book_id', 'name']]`,
        approach: 'Pandas Left Merge with Zero Quantity Fill',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Books (book_id int, name varchar(50), available_from date);
CREATE TABLE Orders (order_id int, book_id int, quantity int, dispatch_date date);`,
    referenceSql: `SELECT b.book_id, b.name FROM Books b LEFT JOIN Orders o ON b.book_id = o.book_id AND o.dispatch_date BETWEEN '2018-06-23' AND '2019-06-23' WHERE b.available_from <= '2019-05-23' GROUP BY b.book_id, b.name HAVING IFNULL(SUM(o.quantity), 0) < 10;`,
    generatorPy: `import json
cases = [
    {
        "Books": [
            {"book_id": 1, "name": "Kalila And Demna", "available_from": "2010-01-01"},
            {"book_id": 2, "name": "28 Letters", "available_from": "2012-05-12"},
            {"book_id": 3, "name": "The Hobbit", "available_from": "2019-06-10"},
            {"book_id": 4, "name": "13 Reasons Why", "available_from": "2019-06-01"},
            {"book_id": 5, "name": "The Hunger Games", "available_from": "2008-09-21"}
        ],
        "Orders": [
            {"order_id": 1, "book_id": 1, "quantity": 2, "dispatch_date": "2018-07-26"},
            {"order_id": 2, "book_id": 1, "quantity": 1, "dispatch_date": "2018-11-05"},
            {"order_id": 3, "book_id": 3, "quantity": 8, "dispatch_date": "2019-06-11"},
            {"order_id": 4, "book_id": 4, "quantity": 10, "dispatch_date": "2019-06-05"},
            {"order_id": 5, "book_id": 5, "quantity": 9, "dispatch_date": "2019-02-02"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 3. #1107 new-users-daily-count
  {
    slug: 'new-users-daily-count',
    number: 1107,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Initial Login Date Grouping',
        text: 'Identify each user first login date, then count how many users had their initial login on each date in the ninety-day window.'
      },
      {
        level: 2,
        title: 'Earliest Date Subquery with Range Filter',
        text: 'Group activity by user for login actions to find minimum dates. Filter dates within ninety days up to 2019-06-30 and count users.'
      },
      {
        level: 3,
        title: 'Daily New Users Blueprint',
        text: 'select login_date, count(user_id) as user_count from (select user_id, min(activity_date) as login_date from Traffic where activity = "login" group by user_id) t where login_date between "2019-04-01" and "2019-06-30" group by login_date.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT login_date, COUNT(user_id) AS user_count\nFROM (\n    SELECT user_id, MIN(activity_date) AS login_date\n    FROM Traffic\n    WHERE activity = \'login\'\n    GROUP BY user_id\n) t\nWHERE login_date BETWEEN \'2019-04-01\' AND \'2019-06-30\'\nGROUP BY login_date;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(T log T)',
      space: 'O(U)',
      variables: ['T: number of traffic log entries', 'U: number of distinct users'],
      notes: 'Filtering on login activity, aggregating minimum date per user, and grouping by date runs in linear-logarithmic time.',
      whyNaiveFails: 'Counting raw login events on each day counts returning users instead of strictly first-time new users.',
      spaceTimeTradeoff: 'Nested subquery reduces raw events down to one record per distinct user before window aggregation.',
      interviewerExpectation: 'Use of MIN(activity_date) per user and DATEDIFF or BETWEEN for the 90-day window.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT login_date, COUNT(user_id) AS user_count
FROM (
    SELECT user_id, MIN(activity_date) AS login_date
    FROM Traffic
    WHERE activity = 'login'
    GROUP BY user_id
) t
WHERE login_date BETWEEN '2019-04-01' AND '2019-06-30'
GROUP BY login_date;`,
        approach: 'Subquery Earliest Login with Date Window Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT login_date, COUNT(user_id) AS user_count
FROM (
    SELECT user_id, MIN(activity_date) AS login_date
    FROM Traffic
    WHERE activity = 'login'
    GROUP BY user_id
) t
WHERE login_date BETWEEN '2019-04-01' AND '2019-06-30'
GROUP BY login_date;`,
        approach: 'PostgreSQL Subquery Date Window Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def new_users_daily_count(traffic: pd.DataFrame) -> pd.DataFrame:
    logins = traffic[traffic['activity'] == 'login']
    first_logins = logins.groupby('user_id')['activity_date'].min().reset_index()
    first_logins.rename(columns={'activity_date': 'login_date'}, inplace=True)
    valid = first_logins[(first_logins['login_date'] >= '2019-04-01') & (first_logins['login_date'] <= '2019-06-30')]
    res = valid.groupby('login_date')['user_id'].count().reset_index()
    return res.rename(columns={'user_id': 'user_count'})`,
        approach: 'Pandas Groupby Minimum Login and Window Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Traffic (user_id int, activity varchar(20), activity_date date);`,
    referenceSql: `SELECT login_date, COUNT(user_id) AS user_count FROM (SELECT user_id, MIN(activity_date) AS login_date FROM Traffic WHERE activity = 'login' GROUP BY user_id) t WHERE login_date BETWEEN '2019-04-01' AND '2019-06-30' GROUP BY login_date;`,
    generatorPy: `import json
cases = [
    {
        "Traffic": [
            {"user_id": 1, "activity": "login", "activity_date": "2019-05-01"},
            {"user_id": 1, "activity": "homepage", "activity_date": "2019-05-01"},
            {"user_id": 1, "activity": "logout", "activity_date": "2019-05-01"},
            {"user_id": 2, "activity": "login", "activity_date": "2019-06-21"},
            {"user_id": 2, "activity": "logout", "activity_date": "2019-06-21"},
            {"user_id": 3, "activity": "login", "activity_date": "2019-01-01"},
            {"user_id": 3, "activity": "jobs", "activity_date": "2019-01-01"},
            {"user_id": 3, "activity": "logout", "activity_date": "2019-01-01"},
            {"user_id": 4, "activity": "login", "activity_date": "2019-06-21"},
            {"user_id": 5, "activity": "login", "activity_date": "2019-03-01"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 4. #1112 highest-grade-for-each-student
  {
    slug: 'highest-grade-for-each-student',
    number: 1112,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Partitioned Grade Ranking with Course Tie-Breaker',
        text: 'Identify the top grade for each student, selecting the smaller course identifier in case of grade ties.'
      },
      {
        level: 2,
        title: 'Row Number Window Ordering',
        text: 'Assign row numbers partitioned by student identifier, ordered descending by grade and ascending by course identifier.'
      },
      {
        level: 3,
        title: 'Highest Grade Query Blueprint',
        text: 'with Ranked as (select student_id, course_id, grade, row_number() over (partition by student_id order by grade desc, course_id asc) as rn from Enrollments) select student_id, course_id, grade from Ranked where rn = 1 order by student_id asc.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH Ranked AS (\n    SELECT student_id, course_id, grade,\n           ROW_NUMBER() OVER (\n               PARTITION BY student_id\n               ORDER BY grade DESC, course_id ASC\n           ) AS rn\n    FROM Enrollments\n)\nSELECT student_id, course_id, grade\nFROM Ranked\nWHERE rn = 1\nORDER BY student_id ASC;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(E log E)',
      space: 'O(E)',
      variables: ['E: number of enrollment records'],
      notes: 'Window sorting partitioned by student executes in linear-logarithmic time.',
      whyNaiveFails: 'Group by with max grade fails to isolate the corresponding course identifier deterministically in standard SQL.',
      spaceTimeTradeoff: 'Window ranking computes ranks in a single pass without re-joining the base table on composite keys.',
      interviewerExpectation: 'Use of ROW_NUMBER() with secondary ordering by course_id to resolve ties.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH Ranked AS (\n    SELECT student_id, course_id, grade,\n           ROW_NUMBER() OVER (\n               PARTITION BY student_id\n               ORDER BY grade DESC, course_id ASC\n           ) AS rn\n    FROM Enrollments\n)\nSELECT student_id, course_id, grade\nFROM Ranked\nWHERE rn = 1\nORDER BY student_id ASC;`,
        approach: 'Window Row Number with Deterministic Tie Breaking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH Ranked AS (\n    SELECT student_id, course_id, grade,\n           ROW_NUMBER() OVER (\n               PARTITION BY student_id\n               ORDER BY grade DESC, course_id ASC\n           ) AS rn\n    FROM Enrollments\n)\nSELECT student_id, course_id, grade\nFROM Ranked\nWHERE rn = 1\nORDER BY student_id ASC;`,
        approach: 'PostgreSQL Partitioned Window Row Number',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def highest_grade(enrollments: pd.DataFrame) -> pd.DataFrame:
    sorted_df = enrollments.sort_values(by=['student_id', 'grade', 'course_id'], ascending=[True, False, True])
    res = sorted_df.drop_duplicates(subset=['student_id'], keep='first')
    return res.sort_values(by='student_id')`,
        approach: 'Pandas Multi-Column Sort and Deduplicated Keep First',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Enrollments (student_id int, course_id int, grade int);`,
    referenceSql: `WITH Ranked AS (SELECT student_id, course_id, grade, ROW_NUMBER() OVER (PARTITION BY student_id ORDER BY grade DESC, course_id ASC) AS rn FROM Enrollments) SELECT student_id, course_id, grade FROM Ranked WHERE rn = 1 ORDER BY student_id ASC;`,
    generatorPy: `import json
cases = [
    {
        "Enrollments": [
            {"student_id": 2, "course_id": 2, "grade": 95},
            {"student_id": 2, "course_id": 3, "grade": 95},
            {"student_id": 1, "course_id": 1, "grade": 90},
            {"student_id": 1, "course_id": 2, "grade": 99},
            {"student_id": 3, "course_id": 1, "grade": 80},
            {"student_id": 3, "course_id": 2, "grade": 75},
            {"student_id": 3, "course_id": 3, "grade": 82}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 5. #1113 reported-posts
  {
    slug: 'reported-posts',
    number: 1113,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Report Reason Post Deduplication',
        text: 'Count unique posts flagged for each reason on the target date 2019-07-04.'
      },
      {
        level: 2,
        title: 'Filtering on Action Type and Date',
        text: 'Filter actions where date is 2019-07-04 and action equals report, then group by the extra reason field.'
      },
      {
        level: 3,
        title: 'Reported Posts Blueprint',
        text: 'select extra as report_reason, count(distinct post_id) as report_count from Actions where action_date = "2019-07-04" and action = "report" and extra is not null group by extra.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT extra AS report_reason,\n       COUNT(DISTINCT post_id) AS report_count\nFROM Actions\nWHERE action_date = \'2019-07-04\'\n  AND action = \'report\'\n  AND extra IS NOT NULL\nGROUP BY extra;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(A)',
      space: 'O(R)',
      variables: ['A: number of action records', 'R: number of unique report reasons'],
      notes: 'Filtering on date and action followed by hash aggregation on reasons executes in linear time.',
      whyNaiveFails: 'Failing to deduplicate posts counts multiple reports of the same post by different users.',
      spaceTimeTradeoff: 'Grouped distinct counts evaluate unique post coverage with minimal auxiliary space.',
      interviewerExpectation: 'Use of COUNT(DISTINCT post_id) and filtering for action = report on target date.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT extra AS report_reason,
       COUNT(DISTINCT post_id) AS report_count
FROM Actions
WHERE action_date = '2019-07-04'
  AND action = 'report'
  AND extra IS NOT NULL
GROUP BY extra;`,
        approach: 'Filter on Date and Report Action with Distinct Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT extra AS report_reason,
       COUNT(DISTINCT post_id) AS report_count
FROM Actions
WHERE action_date = '2019-07-04'
  AND action = 'report'
  AND extra IS NOT NULL
GROUP BY extra;`,
        approach: 'PostgreSQL Action Reason Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def reported_posts(actions: pd.DataFrame) -> pd.DataFrame:
    filtered = actions[(actions['action_date'] == '2019-07-04') & (actions['action'] == 'report') & (actions['extra'].notnull())]
    res = filtered.groupby('extra')['post_id'].nunique().reset_index()
    return res.rename(columns={'extra': 'report_reason', 'post_id': 'report_count'})`,
        approach: 'Pandas Mask with Nunique Reason Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Actions (user_id int, post_id int, action_date date, action varchar(20), extra varchar(20));`,
    referenceSql: `SELECT extra AS report_reason, COUNT(DISTINCT post_id) AS report_count FROM Actions WHERE action_date = '2019-07-04' AND action = 'report' AND extra IS NOT NULL GROUP BY extra;`,
    generatorPy: `import json
cases = [
    {
        "Actions": [
            {"user_id": 1, "post_id": 1, "action_date": "2019-07-01", "action": "view", "extra": None},
            {"user_id": 1, "post_id": 1, "action_date": "2019-07-01", "action": "like", "extra": None},
            {"user_id": 1, "post_id": 1, "action_date": "2019-07-01", "action": "share", "extra": None},
            {"user_id": 2, "post_id": 4, "action_date": "2019-07-04", "action": "view", "extra": None},
            {"user_id": 2, "post_id": 4, "action_date": "2019-07-04", "action": "report", "extra": "spam"},
            {"user_id": 3, "post_id": 4, "action_date": "2019-07-04", "action": "report", "extra": "spam"},
            {"user_id": 4, "post_id": 3, "action_date": "2019-07-02", "action": "view", "extra": None},
            {"user_id": 4, "post_id": 3, "action_date": "2019-07-02", "action": "report", "extra": "spam"},
            {"user_id": 5, "post_id": 2, "action_date": "2019-07-04", "action": "view", "extra": None},
            {"user_id": 5, "post_id": 2, "action_date": "2019-07-04", "action": "report", "extra": "racism"},
            {"user_id": 5, "post_id": 5, "action_date": "2019-07-04", "action": "view", "extra": None},
            {"user_id": 5, "post_id": 5, "action_date": "2019-07-04", "action": "report", "extra": "racism"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 6. #1126 active-businesses
  {
    slug: 'active-businesses',
    number: 1126,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Event Threshold Comparison',
        text: 'A business is active if it records more than one event type whose frequency exceeds the overall average for that event.'
      },
      {
        level: 2,
        title: 'Event Average CTE with Having Count',
        text: 'Compute the average occurrences per event type across all businesses. Join back and group by business identifier with having count > 1.'
      },
      {
        level: 3,
        title: 'Active Businesses Blueprint',
        text: 'with AvgEvents as (select event_type, avg(occurences) as avg_occ from Events group by event_type) select e.business_id from Events e join AvgEvents a on e.event_type = a.event_type where e.occurences > a.avg_occ group by e.business_id having count(e.event_type) > 1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH AvgEvents AS (\n    SELECT event_type, AVG(occurences) AS avg_occ\n    FROM Events\n    GROUP BY event_type\n)\nSELECT e.business_id\nFROM Events e\nJOIN AvgEvents a ON e.event_type = a.event_type\nWHERE e.occurences > a.avg_occ\nGROUP BY e.business_id\nHAVING COUNT(e.event_type) > 1;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(E log E)',
      space: 'O(E)',
      variables: ['E: number of event records'],
      notes: 'Grouped average per event type followed by hash equi-join runs in linear-logarithmic time.',
      whyNaiveFails: 'Correlated scalar subqueries scanning the entire events table per row result in quadratic complexity.',
      spaceTimeTradeoff: 'Precomputing event type averages in a CTE enables direct inner join comparison.',
      interviewerExpectation: 'Use of CTE or window AVG(occurences) OVER(PARTITION BY event_type) with HAVING COUNT > 1.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH AvgEvents AS (
    SELECT event_type, AVG(occurences) AS avg_occ
    FROM Events
    GROUP BY event_type
)
SELECT e.business_id
FROM Events e
JOIN AvgEvents a ON e.event_type = a.event_type
WHERE e.occurences > a.avg_occ
GROUP BY e.business_id
HAVING COUNT(e.event_type) > 1;`,
        approach: 'Event Mean CTE Join with Grouped Frequency Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH AvgEvents AS (
    SELECT event_type, AVG(occurences) AS avg_occ
    FROM Events
    GROUP BY event_type
)
SELECT e.business_id
FROM Events e
JOIN AvgEvents a ON e.event_type = a.event_type
WHERE e.occurences > a.avg_occ
GROUP BY e.business_id
HAVING COUNT(e.event_type) > 1;`,
        approach: 'PostgreSQL Event Average Join and Having Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def active_businesses(events: pd.DataFrame) -> pd.DataFrame:
    avg_occ = events.groupby('event_type')['occurences'].transform('mean')
    above_avg = events[events['occurences'] > avg_occ]
    counts = above_avg.groupby('business_id')['event_type'].count().reset_index()
    res = counts[counts['event_type'] > 1]
    return res[['business_id']]`,
        approach: 'Pandas Transform Mean and Filter with Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Events (business_id int, event_type varchar(20), occurences int);`,
    referenceSql: `WITH AvgEvents AS (SELECT event_type, AVG(occurences) AS avg_occ FROM Events GROUP BY event_type) SELECT e.business_id FROM Events e JOIN AvgEvents a ON e.event_type = a.event_type WHERE e.occurences > a.avg_occ GROUP BY e.business_id HAVING COUNT(e.event_type) > 1;`,
    generatorPy: `import json
cases = [
    {
        "Events": [
            {"business_id": 1, "event_type": "reviews", "occurences": 7},
            {"business_id": 3, "event_type": "reviews", "occurences": 3},
            {"business_id": 1, "event_type": "ads", "occurences": 11},
            {"business_id": 2, "event_type": "ads", "occurences": 7},
            {"business_id": 3, "event_type": "ads", "occurences": 6},
            {"business_id": 1, "event_type": "page views", "occurences": 3},
            {"business_id": 2, "event_type": "page views", "occurences": 12}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 7. #1127 user-purchase-platform
  {
    slug: 'user-purchase-platform',
    number: 1127,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Platform Classification Matrix',
        text: 'A user active on both mobile and desktop on the same date belongs to the both platform category.'
      },
      {
        level: 2,
        title: 'Cartesian Date-Platform Grid Union',
        text: 'Generate all combinations of spend_date with desktop, mobile, and both, then left join user daily platform classifications.'
      },
      {
        level: 3,
        title: 'Purchase Platform Blueprint',
        text: 'Determine per-user daily platform (mobile, desktop, both). Generate date-platform grid from distinct dates and platforms. Left join and aggregate total amount and user count.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH UserDaily AS (\n    SELECT spend_date, user_id,\n           CASE \n               WHEN COUNT(DISTINCT platform) = 2 THEN \'both\'\n               ELSE MAX(platform)\n           END AS platform,\n           SUM(amount) AS total_amount\n    FROM Spending\n    GROUP BY spend_date, user_id\n),\nDates AS (\n    SELECT DISTINCT spend_date FROM Spending\n),\nPlatforms AS (\n    SELECT \'desktop\' AS platform UNION ALL\n    SELECT \'mobile\' UNION ALL\n    SELECT \'both\'\n),\nGrid AS (\n    SELECT d.spend_date, p.platform\n    FROM Dates d\n    CROSS JOIN Platforms p\n)\nSELECT g.spend_date, g.platform,\n       IFNULL(SUM(u.total_amount), 0) AS total_amount,\n       COUNT(u.user_id) AS total_users\nFROM Grid g\nLEFT JOIN UserDaily u\n  ON g.spend_date = u.spend_date\n AND g.platform = u.platform\nGROUP BY g.spend_date, g.platform;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(S log S)',
      space: 'O(D * 3)',
      variables: ['S: number of spending records', 'D: distinct spend dates'],
      notes: 'User daily grouping followed by cross join grid left aggregation runs in linear-logarithmic time.',
      whyNaiveFails: 'Omitting missing platforms on dates with 0 activity drops mandatory zero-filled rows from the final report.',
      spaceTimeTradeoff: 'Cross join grid guarantees all three platform categories are emitted for every active calendar date.',
      interviewerExpectation: 'Use of CROSS JOIN date-platform grid and COUNT(DISTINCT platform) = 2 conditional classification.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH UserDaily AS (
    SELECT spend_date, user_id,
           CASE 
               WHEN COUNT(DISTINCT platform) = 2 THEN 'both'
               ELSE MAX(platform)
           END AS platform,
           SUM(amount) AS total_amount
    FROM Spending
    GROUP BY spend_date, user_id
),
Dates AS (
    SELECT DISTINCT spend_date FROM Spending
),
Platforms AS (
    SELECT 'desktop' AS platform UNION ALL
    SELECT 'mobile' UNION ALL
    SELECT 'both'
),
Grid AS (
    SELECT d.spend_date, p.platform
    FROM Dates d
    CROSS JOIN Platforms p
)
SELECT g.spend_date, g.platform,
       IFNULL(SUM(u.total_amount), 0) AS total_amount,
       COUNT(u.user_id) AS total_users
FROM Grid g
LEFT JOIN UserDaily u
  ON g.spend_date = u.spend_date
 AND g.platform = u.platform
GROUP BY g.spend_date, g.platform;`,
        approach: 'Cross Join Grid with User Daily Platform Classification',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH UserDaily AS (
    SELECT spend_date, user_id,
           CASE 
               WHEN COUNT(DISTINCT platform) = 2 THEN 'both'
               ELSE MAX(platform)
           END AS platform,
           SUM(amount) AS total_amount
    FROM Spending
    GROUP BY spend_date, user_id
),
Dates AS (
    SELECT DISTINCT spend_date FROM Spending
),
Platforms AS (
    SELECT 'desktop' AS platform UNION ALL
    SELECT 'mobile' UNION ALL
    SELECT 'both'
),
Grid AS (
    SELECT d.spend_date, p.platform
    FROM Dates d
    CROSS JOIN Platforms p
)
SELECT g.spend_date, g.platform,
       COALESCE(SUM(u.total_amount), 0) AS total_amount,
       COUNT(u.user_id) AS total_users
FROM Grid g
LEFT JOIN UserDaily u
  ON g.spend_date = u.spend_date
 AND g.platform = u.platform
GROUP BY g.spend_date, g.platform;`,
        approach: 'PostgreSQL Cross Join Grid with Coalesce Sum',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def user_purchase_platform(spending: pd.DataFrame) -> pd.DataFrame:
    grouped = spending.groupby(['spend_date', 'user_id']).agg(
        platforms=('platform', set),
        amount=('amount', 'sum')
    ).reset_index()
    def get_plat(p_set):
        return 'both' if len(p_set) == 2 else list(p_set)[0]
    grouped['platform'] = grouped['platforms'].apply(get_plat)
    agg_user = grouped.groupby(['spend_date', 'platform']).agg(
        total_amount=('amount', 'sum'),
        total_users=('user_id', 'count')
    ).reset_index()

    dates = spending['spend_date'].unique()
    grid = []
    for d in dates:
        for p in ['desktop', 'mobile', 'both']:
            grid.append({'spend_date': d, 'platform': p})
    grid_df = pd.DataFrame(grid)
    res = grid_df.merge(agg_user, on=['spend_date', 'platform'], how='left')
    res['total_amount'] = res['total_amount'].fillna(0).astype(int)
    res['total_users'] = res['total_users'].fillna(0).astype(int)
    return res`,
        approach: 'Pandas Cross Product Grid with Aggregated Left Merge',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Spending (user_id int, spend_date date, platform varchar(10), amount int);`,
    referenceSql: `WITH UserDaily AS (SELECT spend_date, user_id, CASE WHEN COUNT(DISTINCT platform) = 2 THEN 'both' ELSE MAX(platform) END AS platform, SUM(amount) AS total_amount FROM Spending GROUP BY spend_date, user_id), Dates AS (SELECT DISTINCT spend_date FROM Spending), Platforms AS (SELECT 'desktop' AS platform UNION ALL SELECT 'mobile' UNION ALL SELECT 'both'), Grid AS (SELECT d.spend_date, p.platform FROM Dates d CROSS JOIN Platforms p) SELECT g.spend_date, g.platform, IFNULL(SUM(u.total_amount), 0) AS total_amount, COUNT(u.user_id) AS total_users FROM Grid g LEFT JOIN UserDaily u ON g.spend_date = u.spend_date AND g.platform = u.platform GROUP BY g.spend_date, g.platform;`,
    generatorPy: `import json
cases = [
    {
        "Spending": [
            {"user_id": 1, "spend_date": "2019-07-01", "platform": "mobile", "amount": 100},
            {"user_id": 1, "spend_date": "2019-07-01", "platform": "desktop", "amount": 100},
            {"user_id": 2, "spend_date": "2019-07-01", "platform": "mobile", "amount": 100},
            {"user_id": 2, "spend_date": "2019-07-02", "platform": "mobile", "amount": 100},
            {"user_id": 3, "spend_date": "2019-07-01", "platform": "desktop", "amount": 100},
            {"user_id": 3, "spend_date": "2019-07-02", "platform": "desktop", "amount": 100}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 8. #1132 reported-posts-ii
  {
    slug: 'reported-posts-ii',
    number: 1132,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Daily Spam Removal Rate Average',
        text: 'Calculate the percentage of spam-reported posts that were removed on each day, then take the average of these daily rates.'
      },
      {
        level: 2,
        title: 'Daily Ratio CTE with Distinct Counting',
        text: 'Group actions with extra equal to spam by action date, computing count of distinct removed posts divided by reported posts.'
      },
      {
        level: 3,
        title: 'Reported Posts Removal Blueprint',
        text: 'with DailySpam as (select a.action_date, count(distinct r.post_id) / count(distinct a.post_id) as removal_rate from Actions a left join Removals r on a.post_id = r.post_id where a.extra = "spam" group by a.action_date) select round(avg(removal_rate) * 100, 2) as average_daily_percent from DailySpam.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH DailySpam AS (\n    SELECT a.action_date,\n           COUNT(DISTINCT r.post_id) / COUNT(DISTINCT a.post_id) AS removal_rate\n    FROM Actions a\n    LEFT JOIN Removals r ON a.post_id = r.post_id\n    WHERE a.extra = \'spam\'\n    GROUP BY a.action_date\n)\nSELECT ROUND(AVG(removal_rate) * 100, 2) AS average_daily_percent\nFROM DailySpam;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(A + R)',
      space: 'O(D)',
      variables: ['A: number of action records', 'R: number of removal logs', 'D: distinct action dates'],
      notes: 'Grouped distinct counts per day followed by average percentage rounding executes in linear time.',
      whyNaiveFails: 'Averaging across all individual posts directly yields global removal percentage rather than the average of daily rates.',
      spaceTimeTradeoff: 'Daily aggregation CTE reduces rows down to one record per date before outer average calculation.',
      interviewerExpectation: 'Computing daily percentage first in a CTE before taking the overall average.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH DailySpam AS (
    SELECT a.action_date,
           COUNT(DISTINCT r.post_id) / COUNT(DISTINCT a.post_id) AS removal_rate
    FROM Actions a
    LEFT JOIN Removals r ON a.post_id = r.post_id
    WHERE a.extra = 'spam'
    GROUP BY a.action_date
)
SELECT ROUND(AVG(removal_rate) * 100, 2) AS average_daily_percent
FROM DailySpam;`,
        approach: 'Daily Removal Ratio CTE with Outer Mean Rounding',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH DailySpam AS (
    SELECT a.action_date,
           COUNT(DISTINCT r.post_id)::numeric / COUNT(DISTINCT a.post_id) AS removal_rate
    FROM Actions a
    LEFT JOIN Removals r ON a.post_id = r.post_id
    WHERE a.extra = 'spam'
    GROUP BY a.action_date
)
SELECT ROUND(AVG(removal_rate) * 100, 2) AS average_daily_percent
FROM DailySpam;`,
        approach: 'PostgreSQL Numeric Cast Daily Ratio Average',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def reported_posts(actions: pd.DataFrame, removals: pd.DataFrame) -> pd.DataFrame:
    spam = actions[actions['extra'] == 'spam']
    merged = spam.merge(removals, on='post_id', how='left')
    daily = merged.groupby('action_date').agg(
        reported=('post_id', 'nunique'),
        removed=('remove_date', lambda x: x.dropna().nunique())
    ).reset_index()
    daily['rate'] = daily['removed'] / daily['reported']
    ans = round(daily['rate'].mean() * 100, 2)
    return pd.DataFrame({'average_daily_percent': [ans]})`,
        approach: 'Pandas Daily Ratio Aggregation with Mean Calculation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Actions (user_id int, post_id int, action_date date, action varchar(20), extra varchar(20));
CREATE TABLE Removals (post_id int, remove_date date);`,
    referenceSql: `WITH DailySpam AS (SELECT a.action_date, COUNT(DISTINCT r.post_id) / COUNT(DISTINCT a.post_id) AS removal_rate FROM Actions a LEFT JOIN Removals r ON a.post_id = r.post_id WHERE a.extra = 'spam' GROUP BY a.action_date) SELECT ROUND(AVG(removal_rate) * 100, 2) AS average_daily_percent FROM DailySpam;`,
    generatorPy: `import json
cases = [
    {
        "Actions": [
            {"user_id": 1, "post_id": 1, "action_date": "2019-07-01", "action": "share", "extra": "spam"},
            {"user_id": 2, "post_id": 2, "action_date": "2019-07-04", "action": "report", "extra": "spam"},
            {"user_id": 3, "post_id": 4, "action_date": "2019-07-04", "action": "report", "extra": "spam"}
        ],
        "Removals": [
            {"post_id": 2, "remove_date": "2019-07-20"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 9. #1159 market-analysis-ii
  {
    slug: 'market-analysis-ii',
    number: 1159,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Second Sale Favorite Brand Verification',
        text: 'Determine whether the brand of the second chronologically sold item matches the seller registered favorite brand.'
      },
      {
        level: 2,
        title: 'Row Number Partitioned by Seller',
        text: 'Rank sales per seller ordered by order date. Left join users to rank-two sales and check brand equivalence.'
      },
      {
        level: 3,
        title: 'Second Item Query Blueprint',
        text: 'with Ranked as (select seller_id, item_id, row_number() over (partition by seller_id order by order_date) as rn from Orders) select u.user_id as seller_id, case when i.item_brand = u.favorite_brand then "yes" else "no" end as 2nd_item_fav_brand from Users u left join Ranked r on u.user_id = r.seller_id and r.rn = 2 left join Items i on r.item_id = i.item_id.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH Ranked AS (\n    SELECT seller_id, item_id,\n           ROW_NUMBER() OVER (\n               PARTITION BY seller_id\n               ORDER BY order_date ASC\n           ) AS rn\n    FROM Orders\n)\nSELECT u.user_id AS seller_id,\n       CASE \n           WHEN i.item_brand = u.favorite_brand THEN \'yes\'\n           ELSE \'no\'\n       END AS 2nd_item_fav_brand\nFROM Users u\nLEFT JOIN Ranked r\n  ON u.user_id = r.seller_id\n AND r.rn = 2\nLEFT JOIN Items i\n  ON r.item_id = i.item_id;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(O log O + U)',
      space: 'O(O + U)',
      variables: ['O: number of order records', 'U: number of registered users'],
      notes: 'Window ranking orders by seller and outer joining users runs in linear-logarithmic time.',
      whyNaiveFails: 'Inner joining orders discards users with fewer than two sales, who must be reported as no.',
      spaceTimeTradeoff: 'Left joining users against rank-two order subset cleanly evaluates absence as no.',
      interviewerExpectation: 'Use of ROW_NUMBER() OVER(PARTITION BY seller_id ORDER BY order_date) and LEFT JOIN.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH Ranked AS (\n    SELECT seller_id, item_id,\n           ROW_NUMBER() OVER (\n               PARTITION BY seller_id\n               ORDER BY order_date ASC\n           ) AS rn\n    FROM Orders\n)\nSELECT u.user_id AS seller_id,\n       CASE \n           WHEN i.item_brand = u.favorite_brand THEN 'yes'\n           ELSE 'no'\n       END AS 2nd_item_fav_brand\nFROM Users u\nLEFT JOIN Ranked r\n  ON u.user_id = r.seller_id\n AND r.rn = 2\nLEFT JOIN Items i\n  ON r.item_id = i.item_id;`,
        approach: 'Ranked Order CTE with Multi-Table Left Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH Ranked AS (\n    SELECT seller_id, item_id,\n           ROW_NUMBER() OVER (\n               PARTITION BY seller_id\n               ORDER BY order_date ASC\n           ) AS rn\n    FROM Orders\n)\nSELECT u.user_id AS seller_id,\n       CASE \n           WHEN i.item_brand = u.favorite_brand THEN 'yes'\n           ELSE 'no'\n       END AS "2nd_item_fav_brand"\nFROM Users u\nLEFT JOIN Ranked r\n  ON u.user_id = r.seller_id\n AND r.rn = 2\nLEFT JOIN Items i\n  ON r.item_id = i.item_id;`,
        approach: 'PostgreSQL Quoted Column Name Window Left Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def market_analysis(users: pd.DataFrame, orders: pd.DataFrame, items: pd.DataFrame) -> pd.DataFrame:
    orders_sorted = orders.sort_values(by=['seller_id', 'order_date'])
    orders_sorted['rn'] = orders_sorted.groupby('seller_id').cumcount() + 1
    second_orders = orders_sorted[orders_sorted['rn'] == 2]
    second_items = second_orders.merge(items, on='item_id', how='left')
    merged = users.merge(second_items, left_on='user_id', right_on='seller_id', how='left')
    merged['2nd_item_fav_brand'] = merged.apply(
        lambda r: 'yes' if r['favorite_brand'] == r['item_brand'] else 'no', axis=1
    )
    merged.rename(columns={'user_id': 'seller_id'}, inplace=True)
    return merged[['seller_id', '2nd_item_fav_brand']]`,
        approach: 'Pandas Cumcount Rank and Conditional Column Lambda',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Users (user_id int, join_date date, favorite_brand varchar(10));
CREATE TABLE Orders (order_id int, order_date date, item_id int, buyer_id int, seller_id int);
CREATE TABLE Items (item_id int, item_brand varchar(10));`,
    referenceSql: `WITH Ranked AS (SELECT seller_id, item_id, ROW_NUMBER() OVER (PARTITION BY seller_id ORDER BY order_date ASC) AS rn FROM Orders) SELECT u.user_id AS seller_id, CASE WHEN i.item_brand = u.favorite_brand THEN 'yes' ELSE 'no' END AS 2nd_item_fav_brand FROM Users u LEFT JOIN Ranked r ON u.user_id = r.seller_id AND r.rn = 2 LEFT JOIN Items i ON r.item_id = i.item_id;`,
    generatorPy: `import json
cases = [
    {
        "Users": [
            {"user_id": 1, "join_date": "2019-01-01", "favorite_brand": "Lenovo"},
            {"user_id": 2, "join_date": "2019-02-09", "favorite_brand": "Samsung"},
            {"user_id": 3, "join_date": "2019-01-19", "favorite_brand": "LG"},
            {"user_id": 4, "join_date": "2019-05-21", "favorite_brand": "HP"}
        ],
        "Orders": [
            {"order_id": 1, "order_date": "2019-08-01", "item_id": 4, "buyer_id": 1, "seller_id": 2},
            {"order_id": 2, "order_date": "2019-08-02", "item_id": 2, "buyer_id": 1, "seller_id": 3},
            {"order_id": 3, "order_date": "2019-08-03", "item_id": 3, "buyer_id": 2, "seller_id": 3},
            {"order_id": 4, "order_date": "2019-08-04", "item_id": 1, "buyer_id": 4, "seller_id": 2}
        ],
        "Items": [
            {"item_id": 1, "item_brand": "Samsung"},
            {"item_id": 2, "item_brand": "Lenovo"},
            {"item_id": 3, "item_brand": "LG"},
            {"item_id": 4, "item_brand": "HP"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 10. #1193 monthly-transactions-i
  {
    slug: 'monthly-transactions-i',
    number: 1193,
    category: 'Database',
    patterns: ['date-time'],
    hints: [
      {
        level: 1,
        title: 'Monthly Country Aggregation Metrics',
        text: 'Group transactions by calendar month and country, reporting total counts, approved counts, total amounts, and approved amounts.'
      },
      {
        level: 2,
        title: 'Conditional Sum over State Column',
        text: 'Format trans_date to year-month. Use conditional sum to calculate approved transaction count and approved total amount.'
      },
      {
        level: 3,
        title: 'Monthly Transactions Query Blueprint',
        text: 'select date_format(trans_date, "%Y-%m") as month, country, count(id) as trans_count, sum(case when state = "approved" then 1 else 0 end) as approved_count, sum(amount) as trans_total_amount, sum(case when state = "approved" then amount else 0 end) as approved_total_amount from Transactions group by month, country.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT DATE_FORMAT(trans_date, \'%Y-%m\') AS month,\n       country,\n       COUNT(id) AS trans_count,\n       SUM(CASE WHEN state = \'approved\' THEN 1 ELSE 0 END) AS approved_count,\n       SUM(amount) AS trans_total_amount,\n       SUM(CASE WHEN state = \'approved\' THEN amount ELSE 0 END) AS approved_total_amount\nFROM Transactions\nGROUP BY month, country;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(T)',
      space: 'O(M * C)',
      variables: ['T: number of transactions', 'M: distinct months', 'C: distinct countries'],
      notes: 'Single group-by pass evaluating conditional sums runs in linear time.',
      whyNaiveFails: 'Separate queries for total and approved metrics require multi-table outer joins and repeated scans.',
      spaceTimeTradeoff: 'Conditional case expressions aggregate multiple metrics in a single grouped traversal.',
      interviewerExpectation: 'Use of DATE_FORMAT for year-month string and conditional SUM(CASE WHEN state = approved).'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT DATE_FORMAT(trans_date, '%Y-%m') AS month,
       country,
       COUNT(id) AS trans_count,
       SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END) AS approved_count,
       SUM(amount) AS trans_total_amount,
       SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount
FROM Transactions
GROUP BY month, country;`,
        approach: 'Single-Pass Grouped Conditional Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT TO_CHAR(trans_date, 'YYYY-MM') AS month,
       country,
       COUNT(id) AS trans_count,
       SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END) AS approved_count,
       SUM(amount) AS trans_total_amount,
       SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount
FROM Transactions
GROUP BY TO_CHAR(trans_date, 'YYYY-MM'), country;`,
        approach: 'PostgreSQL To_Char Date Format and Conditional Sum',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def monthly_transactions(transactions: pd.DataFrame) -> pd.DataFrame:
    transactions['month'] = transactions['trans_date'].astype(str).str.slice(0, 7)
    transactions['approved_cnt'] = (transactions['state'] == 'approved').astype(int)
    transactions['approved_amt'] = transactions.apply(lambda r: r['amount'] if r['state'] == 'approved' else 0, axis=1)
    res = transactions.groupby(['month', 'country'], dropna=False).agg(
        trans_count=('id', 'count'),
        approved_count=('approved_cnt', 'sum'),
        trans_total_amount=('amount', 'sum'),
        approved_total_amount=('approved_amt', 'sum')
    ).reset_index()
    return res`,
        approach: 'Pandas String Slice and Grouped Multi-Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Transactions (id int, country varchar(10), state varchar(10), amount int, trans_date date);`,
    referenceSql: `SELECT DATE_FORMAT(trans_date, '%Y-%m') AS month, country, COUNT(id) AS trans_count, SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END) AS approved_count, SUM(amount) AS trans_total_amount, SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount FROM Transactions GROUP BY month, country;`,
    generatorPy: `import json
cases = [
    {
        "Transactions": [
            {"id": 121, "country": "US", "state": "approved", "amount": 1000, "trans_date": "2018-12-18"},
            {"id": 122, "country": "US", "state": "declined", "amount": 2000, "trans_date": "2018-12-19"},
            {"id": 123, "country": "US", "state": "approved", "amount": 2000, "trans_date": "2019-01-01"},
            {"id": 124, "country": "DE", "state": "approved", "amount": 2000, "trans_date": "2019-01-07"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 11. #1194 tournament-winners
  {
    slug: 'tournament-winners',
    number: 1194,
    category: 'Database',
    patterns: ['string-handling'],
    hints: [
      {
        level: 1,
        title: 'Player Score Accumulation across Matches',
        text: 'A player earns points whether participating as the first player or second player in a match.'
      },
      {
        level: 2,
        title: 'Score Union Stack with Group Ranking',
        text: 'Vertically stack first and second player match scores using union all. Rank players within each group ordered by points descending and player identifier ascending.'
      },
      {
        level: 3,
        title: 'Tournament Winner Blueprint',
        text: 'with TotalScores as (select player_id, sum(score) as score from (select first_player as player_id, first_score as score from Matches union all select second_player as player_id, second_score as score from Matches) s group by player_id), Ranked as (select p.group_id, p.player_id, row_number() over (partition by p.group_id order by coalesce(t.score, 0) desc, p.player_id asc) as rn from Players p left join TotalScores t on p.player_id = t.player_id) select group_id, player_id from Ranked where rn = 1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH TotalScores AS (\n    SELECT player_id, SUM(score) AS score\n    FROM (\n        SELECT first_player AS player_id, first_score AS score FROM Matches\n        UNION ALL\n        SELECT second_player AS player_id, second_score AS score FROM Matches\n    ) s\n    GROUP BY player_id\n),\nRanked AS (\n    SELECT p.group_id, p.player_id,\n           ROW_NUMBER() OVER (\n               PARTITION BY p.group_id\n               ORDER BY COALESCE(t.score, 0) DESC, p.player_id ASC\n           ) AS rn\n    FROM Players p\n    LEFT JOIN TotalScores t ON p.player_id = t.player_id\n)\nSELECT group_id, player_id\nFROM Ranked\nWHERE rn = 1;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(M + P log P)',
      space: 'O(M + P)',
      variables: ['M: number of matches played', 'P: number of registered players'],
      notes: 'Stacking match scores and computing partitioned row ranking executes in linear-logarithmic time.',
      whyNaiveFails: 'Evaluating only first player scores misses points earned by the same athlete when competing as guest.',
      spaceTimeTradeoff: 'Union all unrolls dual match roles into a unified scoring stream prior to window ranking.',
      interviewerExpectation: 'Use of UNION ALL to combine host and guest roles, and ROW_NUMBER() with player_id tie breaker.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH TotalScores AS (
    SELECT player_id, SUM(score) AS score
    FROM (
        SELECT first_player AS player_id, first_score AS score FROM Matches
        UNION ALL
        SELECT second_player AS player_id, second_score AS score FROM Matches
    ) s
    GROUP BY player_id
),
Ranked AS (
    SELECT p.group_id, p.player_id,
           ROW_NUMBER() OVER (
               PARTITION BY p.group_id
               ORDER BY COALESCE(t.score, 0) DESC, p.player_id ASC
           ) AS rn
    FROM Players p
    LEFT JOIN TotalScores t ON p.player_id = t.player_id
)
SELECT group_id, player_id
FROM Ranked
WHERE rn = 1;`,
        approach: 'Union All Score Stacking with Partitioned Row Number',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH TotalScores AS (
    SELECT player_id, SUM(score) AS score
    FROM (
        SELECT first_player AS player_id, first_score AS score FROM Matches
        UNION ALL
        SELECT second_player AS player_id, second_score AS score FROM Matches
    ) s
    GROUP BY player_id
),
Ranked AS (
    SELECT p.group_id, p.player_id,
           ROW_NUMBER() OVER (
               PARTITION BY p.group_id
               ORDER BY COALESCE(t.score, 0) DESC, p.player_id ASC
           ) AS rn
    FROM Players p
    LEFT JOIN TotalScores t ON p.player_id = t.player_id
)
SELECT group_id, player_id
FROM Ranked
WHERE rn = 1;`,
        approach: 'PostgreSQL Score Union All Window Ranking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def tournament_winners(players: pd.DataFrame, matches: pd.DataFrame) -> pd.DataFrame:
    m1 = matches[['first_player', 'first_score']].rename(columns={'first_player': 'player_id', 'first_score': 'score'})
    m2 = matches[['second_player', 'second_score']].rename(columns={'second_player': 'player_id', 'second_score': 'score'})
    scores = pd.concat([m1, m2]).groupby('player_id')['score'].sum().reset_index()
    merged = players.merge(scores, on='player_id', how='left')
    merged['score'] = merged['score'].fillna(0)
    sorted_df = merged.sort_values(by=['group_id', 'score', 'player_id'], ascending=[True, False, True])
    res = sorted_df.drop_duplicates(subset=['group_id'], keep='first')
    return res[['group_id', 'player_id']]`,
        approach: 'Pandas Concat Scores and Group Partition Sort',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Players (player_id int, group_id int);
CREATE TABLE Matches (match_id int, first_player int, second_player int, first_score int, second_score int);`,
    referenceSql: `WITH TotalScores AS (SELECT player_id, SUM(score) AS score FROM (SELECT first_player AS player_id, first_score AS score FROM Matches UNION ALL SELECT second_player AS player_id, second_score AS score FROM Matches) s GROUP BY player_id), Ranked AS (SELECT p.group_id, p.player_id, ROW_NUMBER() OVER (PARTITION BY p.group_id ORDER BY COALESCE(t.score, 0) DESC, p.player_id ASC) AS rn FROM Players p LEFT JOIN TotalScores t ON p.player_id = t.player_id) SELECT group_id, player_id FROM Ranked WHERE rn = 1;`,
    generatorPy: `import json
cases = [
    {
        "Players": [
            {"player_id": 15, "group_id": 1},
            {"player_id": 25, "group_id": 1},
            {"player_id": 30, "group_id": 1},
            {"player_id": 45, "group_id": 1},
            {"player_id": 10, "group_id": 2},
            {"player_id": 35, "group_id": 2},
            {"player_id": 50, "group_id": 2},
            {"player_id": 20, "group_id": 3},
            {"player_id": 40, "group_id": 3}
        ],
        "Matches": [
            {"match_id": 1, "first_player": 15, "second_player": 45, "first_score": 3, "second_score": 0},
            {"match_id": 2, "first_player": 30, "second_player": 25, "first_score": 1, "second_score": 2},
            {"match_id": 3, "first_player": 30, "second_player": 15, "first_score": 2, "second_score": 0},
            {"match_id": 4, "first_player": 40, "second_player": 20, "first_score": 5, "second_score": 2},
            {"match_id": 5, "first_player": 35, "second_player": 50, "first_score": 1, "second_score": 1}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 12. #1204 last-person-to-fit-in-the-bus
  {
    slug: 'last-person-to-fit-in-the-bus',
    number: 1204,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Running Weight Ceiling Identification',
        text: 'Calculate the running cumulative weight of passengers boarding by turn, finding the final passenger whose running total does not exceed 1000.'
      },
      {
        level: 2,
        title: 'Window Running Sum with Limit',
        text: 'Compute sum of weight over turn in ascending order. Filter records where running weight <= 1000, sort descending by running weight, and limit to one.'
      },
      {
        level: 3,
        title: 'Last Person Query Blueprint',
        text: 'with CumulativeQueue as (select person_name, sum(weight) over (order by turn asc) as total_weight from Queue) select person_name from CumulativeQueue where total_weight <= 1000 order by total_weight desc limit 1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH CumulativeQueue AS (\n    SELECT person_name,\n           SUM(weight) OVER (ORDER BY turn ASC) AS total_weight\n    FROM Queue\n)\nSELECT person_name\nFROM CumulativeQueue\nWHERE total_weight <= 1000\nORDER BY total_weight DESC\nLIMIT 1;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(Q log Q)',
      space: 'O(Q)',
      variables: ['Q: number of passengers in queue'],
      notes: 'Window running total ordered by turn and limit-one filtering runs in linear-logarithmic time.',
      whyNaiveFails: 'Self-joins comparing cumulative turns create quadratic comparisons across long queues.',
      spaceTimeTradeoff: 'Window running sum evaluates prefix totals in a single pass over sorted turns.',
      interviewerExpectation: 'Use of SUM(weight) OVER(ORDER BY turn ASC) filtered by <= 1000 and LIMIT 1.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH CumulativeQueue AS (
    SELECT person_name,
           SUM(weight) OVER (ORDER BY turn ASC) AS total_weight
    FROM Queue
)
SELECT person_name
FROM CumulativeQueue
WHERE total_weight <= 1000
ORDER BY total_weight DESC
LIMIT 1;`,
        approach: 'Window Running Sum with Ceiling Filter and Limit One',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH CumulativeQueue AS (
    SELECT person_name,
           SUM(weight) OVER (ORDER BY turn ASC) AS total_weight
    FROM Queue
)
SELECT person_name
FROM CumulativeQueue
WHERE total_weight <= 1000
ORDER BY total_weight DESC
LIMIT 1;`,
        approach: 'PostgreSQL Running Total with Descending Limit One',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def last_passenger(queue: pd.DataFrame) -> pd.DataFrame:
    queue = queue.sort_values(by='turn')
    queue['total_weight'] = queue['weight'].cumsum()
    valid = queue[queue['total_weight'] <= 1000]
    last = valid.iloc[[-1]]
    return last[['person_name']]`,
        approach: 'Pandas Cumsum Filter and Tail Selection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Queue (person_id int, person_name varchar(30), weight int, turn int);`,
    referenceSql: `WITH CumulativeQueue AS (SELECT person_name, SUM(weight) OVER (ORDER BY turn ASC) AS total_weight FROM Queue) SELECT person_name FROM CumulativeQueue WHERE total_weight <= 1000 ORDER BY total_weight DESC LIMIT 1;`,
    generatorPy: `import json
cases = [
    {
        "Queue": [
            {"person_id": 5, "person_name": "Alice", "weight": 250, "turn": 1},
            {"person_id": 4, "person_name": "Bob", "weight": 175, "turn": 5},
            {"person_id": 3, "person_name": "Alex", "weight": 350, "turn": 2},
            {"person_id": 6, "person_name": "John", "weight": 400, "turn": 3},
            {"person_id": 1, "person_name": "Winston", "weight": 500, "turn": 6},
            {"person_id": 2, "person_name": "Marie", "weight": 200, "turn": 4}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 13. #1205 monthly-transactions-ii
  {
    slug: 'monthly-transactions-ii',
    number: 1205,
    category: 'Database',
    patterns: ['date-time'],
    hints: [
      {
        level: 1,
        title: 'Approved Transactions and Chargebacks Union',
        text: 'Unify approved transaction events and chargeback events into a single timeline keyed by event month and transaction country.'
      },
      {
        level: 2,
        title: 'Dual Event Tagging with Conditional Sums',
        text: 'Select approved transactions and join chargebacks to transactions to retrieve their country. Tag event types, then group by month and country.'
      },
      {
        level: 3,
        title: 'Monthly Chargebacks Blueprint',
        text: 'Union approved events with chargeback events. Group by month and country, aggregating approved count/amount and chargeback count/amount.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH Unified AS (\n    SELECT \n        DATE_FORMAT(trans_date, \'%Y-%m\') AS month,\n        country,\n        amount,\n        \'approved\' AS type\n    FROM Transactions\n    WHERE state = \'approved\'\n    UNION ALL\n    SELECT \n        DATE_FORMAT(c.trans_date, \'%Y-%m\') AS month,\n        t.country,\n        t.amount,\n        \'chargeback\' AS type\n    FROM Chargebacks c\n    JOIN Transactions t ON c.trans_id = t.id\n)\nSELECT \n    month,\n    country,\n    SUM(CASE WHEN type = \'approved\' THEN 1 ELSE 0 END) AS approved_count,\n    SUM(CASE WHEN type = \'approved\' THEN amount ELSE 0 END) AS approved_amount,\n    SUM(CASE WHEN type = \'chargeback\' THEN 1 ELSE 0 END) AS chargeback_count,\n    SUM(CASE WHEN type = \'chargeback\' THEN amount ELSE 0 END) AS chargeback_amount\nFROM Unified\nGROUP BY month, country;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(T + C)',
      space: 'O(T + C)',
      variables: ['T: number of transactions', 'C: number of chargeback entries'],
      notes: 'Union of tagged approved and chargeback records followed by two-key grouping runs in linear time.',
      whyNaiveFails: 'Separate outer joins on date strings easily produce Cartesian duplicate rows when multiple transactions share a date.',
      spaceTimeTradeoff: 'Union all normalizes distinct event streams into a single homogeneous pipeline before aggregation.',
      interviewerExpectation: 'Use of UNION ALL to normalize approved and chargeback streams and conditional SUM aggregations.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH Unified AS (
    SELECT 
        DATE_FORMAT(trans_date, '%Y-%m') AS month,
        country,
        amount,
        'approved' AS type
    FROM Transactions
    WHERE state = 'approved'
    UNION ALL
    SELECT 
        DATE_FORMAT(c.trans_date, '%Y-%m') AS month,
        t.country,
        t.amount,
        'chargeback' AS type
    FROM Chargebacks c
    JOIN Transactions t ON c.trans_id = t.id
)
SELECT 
    month,
    country,
    SUM(CASE WHEN type = 'approved' THEN 1 ELSE 0 END) AS approved_count,
    SUM(CASE WHEN type = 'approved' THEN amount ELSE 0 END) AS approved_amount,
    SUM(CASE WHEN type = 'chargeback' THEN 1 ELSE 0 END) AS chargeback_count,
    SUM(CASE WHEN type = 'chargeback' THEN amount ELSE 0 END) AS chargeback_amount
FROM Unified
GROUP BY month, country;`,
        approach: 'Union All Event Stream with Grouped Conditional Aggregates',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH Unified AS (
    SELECT 
        TO_CHAR(trans_date, 'YYYY-MM') AS month,
        country,
        amount,
        'approved' AS type
    FROM Transactions
    WHERE state = 'approved'
    UNION ALL
    SELECT 
        TO_CHAR(c.trans_date, 'YYYY-MM') AS month,
        t.country,
        t.amount,
        'chargeback' AS type
    FROM Chargebacks c
    JOIN Transactions t ON c.trans_id = t.id
)
SELECT 
    month,
    country,
    SUM(CASE WHEN type = 'approved' THEN 1 ELSE 0 END) AS approved_count,
    SUM(CASE WHEN type = 'approved' THEN amount ELSE 0 END) AS approved_amount,
    SUM(CASE WHEN type = 'chargeback' THEN 1 ELSE 0 END) AS chargeback_count,
    SUM(CASE WHEN type = 'chargeback' THEN amount ELSE 0 END) AS chargeback_amount
FROM Unified
GROUP BY month, country;`,
        approach: 'PostgreSQL Unified Stream To_Char Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def monthly_transactions(transactions: pd.DataFrame, chargebacks: pd.DataFrame) -> pd.DataFrame:
    app = transactions[transactions['state'] == 'approved'].copy()
    app['month'] = app['trans_date'].astype(str).str.slice(0, 7)
    app['type'] = 'approved'
    app_stream = app[['month', 'country', 'amount', 'type']]

    cb = chargebacks.merge(transactions, left_on='trans_id', right_on='id')
    cb['month'] = cb['trans_date_x'].astype(str).str.slice(0, 7)
    cb['type'] = 'chargeback'
    cb_stream = cb[['month', 'country', 'amount', 'type']]

    unified = pd.concat([app_stream, cb_stream])
    res = unified.groupby(['month', 'country']).agg(
        approved_count=('type', lambda x: (x == 'approved').sum()),
        approved_amount=('amount', lambda x: x[unified.loc[x.index, 'type'] == 'approved'].sum()),
        chargeback_count=('type', lambda x: (x == 'chargeback').sum()),
        chargeback_amount=('amount', lambda x: x[unified.loc[x.index, 'type'] == 'chargeback'].sum())
    ).reset_index()
    return res`,
        approach: 'Pandas Concat Event Streams with Conditional Reductions',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Transactions (id int, country varchar(10), state varchar(10), amount int, trans_date date);
CREATE TABLE Chargebacks (trans_id int, trans_date date);`,
    referenceSql: `WITH Unified AS (SELECT DATE_FORMAT(trans_date, '%Y-%m') AS month, country, amount, 'approved' AS type FROM Transactions WHERE state = 'approved' UNION ALL SELECT DATE_FORMAT(c.trans_date, '%Y-%m') AS month, t.country, t.amount, 'chargeback' AS type FROM Chargebacks c JOIN Transactions t ON c.trans_id = t.id) SELECT month, country, SUM(CASE WHEN type = 'approved' THEN 1 ELSE 0 END) AS approved_count, SUM(CASE WHEN type = 'approved' THEN amount ELSE 0 END) AS approved_amount, SUM(CASE WHEN type = 'chargeback' THEN 1 ELSE 0 END) AS chargeback_count, SUM(CASE WHEN type = 'chargeback' THEN amount ELSE 0 END) AS chargeback_amount FROM Unified GROUP BY month, country;`,
    generatorPy: `import json
cases = [
    {
        "Transactions": [
            {"id": 101, "country": "US", "state": "approved", "amount": 1000, "trans_date": "2019-05-18"},
            {"id": 102, "country": "US", "state": "declined", "amount": 2000, "trans_date": "2019-05-19"},
            {"id": 103, "country": "US", "state": "approved", "amount": 3000, "trans_date": "2019-06-10"}
        ],
        "Chargebacks": [
            {"trans_id": 102, "trans_date": "2019-05-29"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 14. #1211 queries-quality-and-percentage
  {
    slug: 'queries-quality-and-percentage',
    number: 1211,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Search Query Rating and Quality Metrics',
        text: 'Quality is the average ratio of rating divided by position. Poor query percentage is the share of ratings strictly below three.'
      },
      {
        level: 2,
        title: 'Grouped Mean Calculation with Null Filter',
        text: 'Filter out null query names. Group by query name and compute the mean rating-to-position ratio and percentage with rating < 3.'
      },
      {
        level: 3,
        title: 'Queries Quality Query Blueprint',
        text: 'select query_name, round(avg(rating / position), 2) as quality, round(avg(case when rating < 3 then 1 else 0 end) * 100, 2) as poor_query_percentage from Queries where query_name is not null group by query_name.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT query_name,\n       ROUND(AVG(rating / position), 2) AS quality,\n       ROUND(AVG(CASE WHEN rating < 3 THEN 1 ELSE 0 END) * 100, 2) AS poor_query_percentage\nFROM Queries\nWHERE query_name IS NOT NULL\nGROUP BY query_name;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(Q)',
      space: 'O(N)',
      variables: ['Q: number of queries', 'N: distinct query names'],
      notes: 'Single group-by pass evaluating arithmetic ratios runs in linear time.',
      whyNaiveFails: 'Failing to filter null query names can violate result table constraints.',
      spaceTimeTradeoff: 'Direct average on boolean case expression avoids separate filtered counting queries.',
      interviewerExpectation: 'Use of ROUND(AVG(...), 2) and conditional CASE expression for percentage calculation.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT query_name,
       ROUND(AVG(rating / position), 2) AS quality,
       ROUND(AVG(CASE WHEN rating < 3 THEN 1 ELSE 0 END) * 100, 2) AS poor_query_percentage
FROM Queries
WHERE query_name IS NOT NULL
GROUP BY query_name;`,
        approach: 'Grouped Quality Ratio and Conditional Percentage Rounding',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT query_name,
       ROUND(AVG(rating::numeric / position), 2) AS quality,
       ROUND(AVG(CASE WHEN rating < 3 THEN 100.0 ELSE 0.0 END), 2) AS poor_query_percentage
FROM Queries
WHERE query_name IS NOT NULL
GROUP BY query_name;`,
        approach: 'PostgreSQL Numeric Cast Quality and Rate Average',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def queries_quality_and_percentage(queries: pd.DataFrame) -> pd.DataFrame:
    valid = queries[queries['query_name'].notnull()].copy()
    valid['ratio'] = valid['rating'] / valid['position'] + 1e-12
    valid['poor'] = (valid['rating'] < 3).astype(int) * 100.0
    res = valid.groupby('query_name').agg(
        quality=('ratio', lambda x: round(x.mean(), 2)),
        poor_query_percentage=('poor', lambda x: round(x.mean(), 2))
    ).reset_index()
    return res`,
        approach: 'Pandas Ratio Transformation and Mean Rounding',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Queries (query_name varchar(30), result varchar(50), position int, rating int);`,
    referenceSql: `SELECT query_name, ROUND(AVG(rating / position), 2) AS quality, ROUND(AVG(CASE WHEN rating < 3 THEN 1 ELSE 0 END) * 100, 2) AS poor_query_percentage FROM Queries WHERE query_name IS NOT NULL GROUP BY query_name;`,
    generatorPy: `import json
cases = [
    {
        "Queries": [
            {"query_name": "Dog", "result": "Golden Retriever", "position": 1, "rating": 5},
            {"query_name": "Dog", "result": "German Shepherd", "position": 2, "rating": 5},
            {"query_name": "Dog", "result": "Mule", "position": 200, "rating": 1},
            {"query_name": "Cat", "result": "Shirazi", "position": 5, "rating": 2},
            {"query_name": "Cat", "result": "Siamese", "position": 3, "rating": 3},
            {"query_name": "Cat", "result": "Sphynx", "position": 7, "rating": 4}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 15. #1212 team-scores-in-football-tournament
  {
    slug: 'team-scores-in-football-tournament',
    number: 1212,
    category: 'Database',
    patterns: ['string-handling'],
    hints: [
      {
        level: 1,
        title: 'Match Outcome Point System',
        text: 'A team earns 3 points for a win, 1 point for a tie, and 0 for a loss, whether playing at home or away.'
      },
      {
        level: 2,
        title: 'Team Points Union and Left Join',
        text: 'Generate point events for host and guest teams separately. Left join teams to points to preserve teams with 0 points.'
      },
      {
        level: 3,
        title: 'Team Scores Blueprint',
        text: 'with MatchPoints as (select host_team as team_id, case when host_goals > guest_goals then 3 when host_goals = guest_goals then 1 else 0 end as points from Matches union all select guest_team as team_id, case when guest_goals > host_goals then 3 when guest_goals = host_goals then 1 else 0 end as points from Matches) select t.team_id, t.team_name, coalesce(sum(m.points), 0) as num_points from Teams t left join MatchPoints m on t.team_id = m.team_id group by t.team_id, t.team_name order by num_points desc, t.team_id asc.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH MatchPoints AS (\n    SELECT host_team AS team_id,\n           CASE \n               WHEN host_goals > guest_goals THEN 3\n               WHEN host_goals = guest_goals THEN 1\n               ELSE 0\n           END AS points\n    FROM Matches\n    UNION ALL\n    SELECT guest_team AS team_id,\n           CASE \n               WHEN guest_goals > host_goals THEN 3\n               WHEN guest_goals = host_goals THEN 1\n               ELSE 0\n           END AS points\n    FROM Matches\n)\nSELECT t.team_id, t.team_name,\n       COALESCE(SUM(m.points), 0) AS num_points\nFROM Teams t\nLEFT JOIN MatchPoints m ON t.team_id = m.team_id\nGROUP BY t.team_id, t.team_name\nORDER BY num_points DESC, t.team_id ASC;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(M + T log T)',
      space: 'O(M + T)',
      variables: ['M: number of matches played', 'T: number of tournament teams'],
      notes: 'Stacking host/guest points and sorting grouped teams runs in linear-logarithmic time.',
      whyNaiveFails: 'Inner joining drops teams that never played a match or scored zero points.',
      spaceTimeTradeoff: 'Union all normalizes home and away perspectives into an indexable point stream.',
      interviewerExpectation: 'Use of UNION ALL, LEFT JOIN to preserve 0-point teams, and ORDER BY num_points DESC, team_id ASC.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH MatchPoints AS (
    SELECT host_team AS team_id,
           CASE 
               WHEN host_goals > guest_goals THEN 3
               WHEN host_goals = guest_goals THEN 1
               ELSE 0
           END AS points
    FROM Matches
    UNION ALL
    SELECT guest_team AS team_id,
           CASE 
               WHEN guest_goals > host_goals THEN 3
               WHEN guest_goals = host_goals THEN 1
               ELSE 0
           END AS points
    FROM Matches
)
SELECT t.team_id, t.team_name,
       COALESCE(SUM(m.points), 0) AS num_points
FROM Teams t
LEFT JOIN MatchPoints m ON t.team_id = m.team_id
GROUP BY t.team_id, t.team_name
ORDER BY num_points DESC, t.team_id ASC;`,
        approach: 'Union All Points Projection with Teams Left Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH MatchPoints AS (
    SELECT host_team AS team_id,
           CASE 
               WHEN host_goals > guest_goals THEN 3
               WHEN host_goals = guest_goals THEN 1
               ELSE 0
           END AS points
    FROM Matches
    UNION ALL
    SELECT guest_team AS team_id,
           CASE 
               WHEN guest_goals > host_goals THEN 3
               WHEN guest_goals = host_goals THEN 1
               ELSE 0
           END AS points
    FROM Matches
)
SELECT t.team_id, t.team_name,
       COALESCE(SUM(m.points), 0) AS num_points
FROM Teams t
LEFT JOIN MatchPoints m ON t.team_id = m.team_id
GROUP BY t.team_id, t.team_name
ORDER BY num_points DESC, t.team_id ASC;`,
        approach: 'PostgreSQL Match Points Union Left Join Sort',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def team_scores(teams: pd.DataFrame, matches: pd.DataFrame) -> pd.DataFrame:
    p1 = []
    p2 = []
    for _, row in matches.iterrows():
        if row['host_goals'] > row['guest_goals']:
            p1.append({'team_id': row['host_team'], 'points': 3})
            p2.append({'team_id': row['guest_team'], 'points': 0})
        elif row['host_goals'] == row['guest_goals']:
            p1.append({'team_id': row['host_team'], 'points': 1})
            p2.append({'team_id': row['guest_team'], 'points': 1})
        else:
            p1.append({'team_id': row['host_team'], 'points': 0})
            p2.append({'team_id': row['guest_team'], 'points': 3})
    all_points = pd.DataFrame(p1 + p2)
    scores = all_points.groupby('team_id')['points'].sum().reset_index() if not all_points.empty else pd.DataFrame(columns=['team_id', 'points'])
    merged = teams.merge(scores, on='team_id', how='left')
    merged['num_points'] = merged['points'].fillna(0).astype(int)
    return merged.sort_values(by=['num_points', 'team_id'], ascending=[False, True])[['team_id', 'team_name', 'num_points']]`,
        approach: 'Pandas Row Point Evaluation and Outer Merge Sort',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Teams (team_id int, team_name varchar(30));
CREATE TABLE Matches (match_id int, host_team int, guest_team int, host_goals int, guest_goals int);`,
    referenceSql: `WITH MatchPoints AS (SELECT host_team AS team_id, CASE WHEN host_goals > guest_goals THEN 3 WHEN host_goals = guest_goals THEN 1 ELSE 0 END AS points FROM Matches UNION ALL SELECT guest_team AS team_id, CASE WHEN guest_goals > host_goals THEN 3 WHEN guest_goals = host_goals THEN 1 ELSE 0 END AS points FROM Matches) SELECT t.team_id, t.team_name, COALESCE(SUM(m.points), 0) AS num_points FROM Teams t LEFT JOIN MatchPoints m ON t.team_id = m.team_id GROUP BY t.team_id, t.team_name ORDER BY num_points DESC, t.team_id ASC;`,
    generatorPy: `import json
cases = [
    {
        "Teams": [
            {"team_id": 10, "team_name": "FC Barcelona"},
            {"team_id": 20, "team_name": "New England Revolution"},
            {"team_id": 30, "team_name": "Real Madrid"},
            {"team_id": 40, "team_name": "Liverpool"},
            {"team_id": 50, "team_name": "Chelsea"}
        ],
        "Matches": [
            {"match_id": 1, "host_team": 10, "guest_team": 20, "host_goals": 3, "guest_goals": 0},
            {"match_id": 2, "host_team": 30, "guest_team": 10, "host_goals": 2, "guest_goals": 2},
            {"match_id": 3, "host_team": 10, "guest_team": 50, "host_goals": 5, "guest_goals": 1},
            {"match_id": 4, "host_team": 20, "guest_team": 30, "host_goals": 1, "guest_goals": 0},
            {"match_id": 5, "host_team": 50, "guest_team": 30, "host_goals": 1, "guest_goals": 0}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 16. #1225 report-contiguous-dates
  {
    slug: 'report-contiguous-dates',
    number: 1225,
    category: 'Database',
    patterns: ['date-time'],
    hints: [
      {
        level: 1,
        title: 'Consecutive Day Island Grouping',
        text: 'Group consecutive calendar days of identical system states within 2019 into intervals of start and end dates.'
      },
      {
        level: 2,
        title: 'Gaps and Islands Row Number Difference',
        text: 'Union failed and succeeded events for 2019. Subtract a contiguous row number from the event date to form invariant island keys.'
      },
      {
        level: 3,
        title: 'Contiguous Dates Blueprint',
        text: 'with AllEvents as (select fail_date as dt, "failed" as state from Failed where fail_date between "2019-01-01" and "2019-12-31" union all select success_date as dt, "succeeded" as state from Succeeded where success_date between "2019-01-01" and "2019-12-31"), Ranked as (select state, dt, date_sub(dt, interval row_number() over (partition by state order by dt) day) as grp from AllEvents) select state as period_state, min(dt) as start_date, max(dt) as end_date from Ranked group by state, grp order by start_date asc.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH AllEvents AS (\n    SELECT fail_date AS dt, \'failed\' AS state\n    FROM Failed\n    WHERE fail_date BETWEEN \'2019-01-01\' AND \'2019-12-31\'\n    UNION ALL\n    SELECT success_date AS dt, \'succeeded\' AS state\n    FROM Succeeded\n    WHERE success_date BETWEEN \'2019-01-01\' AND \'2019-12-31\'\n),\nRanked AS (\n    SELECT state, dt,\n           DATE_SUB(dt, INTERVAL ROW_NUMBER() OVER (PARTITION BY state ORDER BY dt) DAY) AS grp\n    FROM AllEvents\n)\nSELECT state AS period_state,\n       MIN(dt) AS start_date,\n       MAX(dt) AS end_date\nFROM Ranked\nGROUP BY state, grp\nORDER BY start_date ASC;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: number of calendar event days in 2019'],
      notes: 'Gaps and islands partition sorting by state and date executes in linear-logarithmic time.',
      whyNaiveFails: 'Checking adjacent dates with recursive self-joins creates high combinatorial scanning overhead.',
      spaceTimeTradeoff: 'The date minus row-number difference forms an invariant cluster key in a single window pass.',
      interviewerExpectation: 'Classic gaps-and-islands pattern using DATE_SUB(dt, INTERVAL ROW_NUMBER() DAY).'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH AllEvents AS (
    SELECT fail_date AS dt, 'failed' AS state
    FROM Failed
    WHERE fail_date BETWEEN '2019-01-01' AND '2019-12-31'
    UNION ALL
    SELECT success_date AS dt, 'succeeded' AS state
    FROM Succeeded
    WHERE success_date BETWEEN '2019-01-01' AND '2019-12-31'
),
Ranked AS (
    SELECT state, dt,
           DATE_SUB(dt, INTERVAL ROW_NUMBER() OVER (PARTITION BY state ORDER BY dt) DAY) AS grp
    FROM AllEvents
)
SELECT state AS period_state,
       MIN(dt) AS start_date,
       MAX(dt) AS end_date
FROM Ranked
GROUP BY state, grp
ORDER BY start_date ASC;`,
        approach: 'Gaps and Islands Date Minus Row Number Clustering',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH AllEvents AS (
    SELECT fail_date AS dt, 'failed' AS state
    FROM Failed
    WHERE fail_date BETWEEN '2019-01-01' AND '2019-12-31'
    UNION ALL
    SELECT success_date AS dt, 'succeeded' AS state
    FROM Succeeded
    WHERE success_date BETWEEN '2019-01-01' AND '2019-12-31'
),
Ranked AS (
    SELECT state, dt,
           dt - (ROW_NUMBER() OVER (PARTITION BY state ORDER BY dt)) * INTERVAL '1 day' AS grp
    FROM AllEvents
)
SELECT state AS period_state,
       MIN(dt) AS start_date,
       MAX(dt) AS end_date
FROM Ranked
GROUP BY state, grp
ORDER BY start_date ASC;`,
        approach: 'PostgreSQL Date Difference Island Grouping',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def report_contiguous_dates(failed: pd.DataFrame, succeeded: pd.DataFrame) -> pd.DataFrame:
    f = failed[(failed['fail_date'] >= '2019-01-01') & (failed['fail_date'] <= '2019-12-31')].rename(columns={'fail_date': 'date'})
    f['state'] = 'failed'
    s = succeeded[(succeeded['success_date'] >= '2019-01-01') & (succeeded['success_date'] <= '2019-12-31')].rename(columns={'success_date': 'date'})
    s['state'] = 'succeeded'
    df = pd.concat([f, s]).sort_values(by='date').reset_index(drop=True)
    df['date'] = pd.to_datetime(df['date'])
    df['grp'] = (df['state'] != df['state'].shift(1)).cumsum()
    res = df.groupby(['grp', 'state']).agg(
        start_date=('date', 'min'),
        end_date=('date', 'max')
    ).reset_index()
    res['start_date'] = res['start_date'].dt.strftime('%Y-%m-%d')
    res['end_date'] = res['end_date'].dt.strftime('%Y-%m-%d')
    res.rename(columns={'state': 'period_state'}, inplace=True)
    return res.sort_values(by='start_date')[['period_state', 'start_date', 'end_date']]`,
        approach: 'Pandas Consecutive State Shift Cumsum Grouping',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Failed (fail_date date);
CREATE TABLE Succeeded (success_date date);`,
    referenceSql: `WITH AllEvents AS (SELECT fail_date AS dt, 'failed' AS state FROM Failed WHERE fail_date BETWEEN '2019-01-01' AND '2019-12-31' UNION ALL SELECT success_date AS dt, 'succeeded' AS state FROM Succeeded WHERE success_date BETWEEN '2019-01-01' AND '2019-12-31'), Ranked AS (SELECT state, dt, DATE_SUB(dt, INTERVAL ROW_NUMBER() OVER (PARTITION BY state ORDER BY dt) DAY) AS grp FROM AllEvents) SELECT state AS period_state, MIN(dt) AS start_date, MAX(dt) AS end_date FROM Ranked GROUP BY state, grp ORDER BY start_date ASC;`,
    generatorPy: `import json
cases = [
    {
        "Failed": [
            {"fail_date": "2018-12-28"},
            {"fail_date": "2018-12-29"},
            {"fail_date": "2019-01-04"},
            {"fail_date": "2019-01-05"}
        ],
        "Succeeded": [
            {"success_date": "2018-12-30"},
            {"success_date": "2018-12-31"},
            {"success_date": "2019-01-01"},
            {"success_date": "2019-01-02"},
            {"success_date": "2019-01-03"},
            {"success_date": "2019-01-06"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 17. #1241 number-of-comments-per-post
  {
    slug: 'number-of-comments-per-post',
    number: 1241,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Post Identifier Isolation and Comment Count',
        text: 'Posts are submissions where parent_id is null. Comments correspond to distinct submissions referencing that post as parent.'
      },
      {
        level: 2,
        title: 'Distinct Post Universe with Left Join',
        text: 'Extract distinct sub_id where parent_id is null. Left join with submissions on sub_id equals parent_id, counting distinct comment identifiers.'
      },
      {
        level: 3,
        title: 'Comments Count Blueprint',
        text: 'select p.sub_id as post_id, count(distinct c.sub_id) as number_of_comments from (select distinct sub_id from Submissions where parent_id is null) p left join Submissions c on p.sub_id = c.parent_id group by p.sub_id order by post_id asc.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT p.sub_id AS post_id,\n       COUNT(DISTINCT c.sub_id) AS number_of_comments\nFROM (\n    SELECT DISTINCT sub_id\n    FROM Submissions\n    WHERE parent_id IS NULL\n) p\nLEFT JOIN Submissions c\n  ON p.sub_id = c.parent_id\nGROUP BY p.sub_id\nORDER BY post_id ASC;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(S log S)',
      space: 'O(P)',
      variables: ['S: number of submissions', 'P: distinct root posts'],
      notes: 'Filtering on null parents followed by left join on parent_id and distinct count runs in linear-logarithmic time.',
      whyNaiveFails: 'Omitting distinct keyword overcounts repeated submissions with identical comment identifiers.',
      spaceTimeTradeoff: 'Pre-filtering root posts preserves post rows that received zero comments.',
      interviewerExpectation: 'Use of LEFT JOIN to retain 0-comment posts and COUNT(DISTINCT c.sub_id).'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT p.sub_id AS post_id,
       COUNT(DISTINCT c.sub_id) AS number_of_comments
FROM (
    SELECT DISTINCT sub_id
    FROM Submissions
    WHERE parent_id IS NULL
) p
LEFT JOIN Submissions c
  ON p.sub_id = c.parent_id
GROUP BY p.sub_id
ORDER BY post_id ASC;`,
        approach: 'Distinct Root Posts Left Join with Comment Deduplication',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT p.sub_id AS post_id,
       COUNT(DISTINCT c.sub_id) AS number_of_comments
FROM (
    SELECT DISTINCT sub_id
    FROM Submissions
    WHERE parent_id IS NULL
) p
LEFT JOIN Submissions c
  ON p.sub_id = c.parent_id
GROUP BY p.sub_id
ORDER BY post_id ASC;`,
        approach: 'PostgreSQL Root Post Left Join Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def count_comments(submissions: pd.DataFrame) -> pd.DataFrame:
    posts = submissions[submissions['parent_id'].isnull()][['sub_id']].drop_duplicates().rename(columns={'sub_id': 'post_id'})
    comments = submissions[submissions['parent_id'].notnull()][['sub_id', 'parent_id']].drop_duplicates()
    comment_counts = comments.groupby('parent_id')['sub_id'].count().reset_index().rename(columns={'parent_id': 'post_id', 'sub_id': 'number_of_comments'})
    res = posts.merge(comment_counts, on='post_id', how='left')
    res['number_of_comments'] = res['number_of_comments'].fillna(0).astype(int)
    return res.sort_values(by='post_id')`,
        approach: 'Pandas Submissions Split and Deduplicated Left Merge',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Submissions (sub_id int, parent_id int);`,
    referenceSql: `SELECT p.sub_id AS post_id, COUNT(DISTINCT c.sub_id) AS number_of_comments FROM (SELECT DISTINCT sub_id FROM Submissions WHERE parent_id IS NULL) p LEFT JOIN Submissions c ON p.sub_id = c.parent_id GROUP BY p.sub_id ORDER BY post_id ASC;`,
    generatorPy: `import json
cases = [
    {
        "Submissions": [
            {"sub_id": 1, "parent_id": None},
            {"sub_id": 2, "parent_id": None},
            {"sub_id": 1, "parent_id": None},
            {"sub_id": 12, "parent_id": 1},
            {"sub_id": 3, "parent_id": 1},
            {"sub_id": 5, "parent_id": 2},
            {"sub_id": 3, "parent_id": 1},
            {"sub_id": 4, "parent_id": 1},
            {"sub_id": 9, "parent_id": 1},
            {"sub_id": 10, "parent_id": 2},
            {"sub_id": 6, "parent_id": 7}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 18. #1251 average-selling-price
  {
    slug: 'average-selling-price',
    number: 1251,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Time-Interval Weighted Unit Pricing',
        text: 'Join sales to the corresponding price active during the purchase date interval, dividing total revenue by total units.'
      },
      {
        level: 2,
        title: 'Between Date Equi-Join with Fallback',
        text: 'Left join prices with units sold where purchase date falls between start and end dates. Coalesce results to zero if no units were sold.'
      },
      {
        level: 3,
        title: 'Average Selling Price Blueprint',
        text: 'select p.product_id, ifnull(round(sum(p.price * u.units) / sum(u.units), 2), 0) as average_price from Prices p left join UnitsSold u on p.product_id = u.product_id and u.purchase_date between p.start_date and p.end_date group by p.product_id.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT p.product_id,\n       IFNULL(ROUND(SUM(p.price * u.units) / SUM(u.units), 2), 0) AS average_price\nFROM Prices p\nLEFT JOIN UnitsSold u\n  ON p.product_id = u.product_id\n AND u.purchase_date BETWEEN p.start_date AND p.end_date\nGROUP BY p.product_id;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(P + U)',
      space: 'O(N)',
      variables: ['P: number of price intervals', 'U: number of sales transactions', 'N: distinct products'],
      notes: 'Interval join and grouped weighted sum executes linearly relative to input table sizes.',
      whyNaiveFails: 'Inner joining drops products that have defined price intervals but recorded zero sales.',
      spaceTimeTradeoff: 'Interval predicate within join condition filters transactions without quadratic row scans.',
      interviewerExpectation: 'Use of IFNULL / COALESCE to handle products with zero units sold and ROUND(..., 2).'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT p.product_id,
       IFNULL(ROUND(SUM(p.price * u.units) / SUM(u.units), 2), 0) AS average_price
FROM Prices p
LEFT JOIN UnitsSold u
  ON p.product_id = u.product_id
 AND u.purchase_date BETWEEN p.start_date AND p.end_date
GROUP BY p.product_id;`,
        approach: 'Between Date Interval Left Join with Weighted Mean',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT p.product_id,
       COALESCE(ROUND(SUM(p.price * u.units)::numeric / NULLIF(SUM(u.units), 0), 2), 0) AS average_price
FROM Prices p
LEFT JOIN UnitsSold u
  ON p.product_id = u.product_id
 AND u.purchase_date BETWEEN p.start_date AND p.end_date
GROUP BY p.product_id;`,
        approach: 'PostgreSQL Numeric Cast with Null-Safe Ratio',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def average_selling_price(prices: pd.DataFrame, units_sold: pd.DataFrame) -> pd.DataFrame:
    merged = prices.merge(units_sold, on='product_id', how='left')
    valid = merged[(merged['purchase_date'].isnull()) | 
                   ((merged['purchase_date'] >= merged['start_date']) & (merged['purchase_date'] <= merged['end_date']))]
    valid['revenue'] = valid['price'] * valid['units']
    grouped = valid.groupby('product_id').agg(
        total_rev=('revenue', 'sum'),
        total_units=('units', 'sum')
    ).reset_index()
    grouped['average_price'] = (grouped['total_rev'] / grouped['total_units']).fillna(0).round(2)
    return grouped[['product_id', 'average_price']]`,
        approach: 'Pandas Merge and Interval Mask with Zero Fill',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Prices (product_id int, start_date date, end_date date, price int);
CREATE TABLE UnitsSold (product_id int, purchase_date date, units int);`,
    referenceSql: `SELECT p.product_id, IFNULL(ROUND(SUM(p.price * u.units) / SUM(u.units), 2), 0) AS average_price FROM Prices p LEFT JOIN UnitsSold u ON p.product_id = u.product_id AND u.purchase_date BETWEEN p.start_date AND p.end_date GROUP BY p.product_id;`,
    generatorPy: `import json
cases = [
    {
        "Prices": [
            {"product_id": 1, "start_date": "2019-02-17", "end_date": "2019-02-28", "price": 5},
            {"product_id": 1, "start_date": "2019-03-01", "end_date": "2019-03-22", "price": 20},
            {"product_id": 2, "start_date": "2019-02-01", "end_date": "2019-02-20", "price": 15},
            {"product_id": 2, "start_date": "2019-02-21", "end_date": "2019-03-31", "price": 30}
        ],
        "UnitsSold": [
            {"product_id": 1, "purchase_date": "2019-02-25", "units": 100},
            {"product_id": 1, "purchase_date": "2019-03-01", "units": 15},
            {"product_id": 2, "purchase_date": "2019-02-10", "units": 200},
            {"product_id": 2, "purchase_date": "2019-03-22", "units": 30}
        ]
    }
]
print(json.dumps(cases))
`
  }
];
