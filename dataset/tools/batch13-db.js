import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

export const batch13DbProblems = [
  // 1. #512 game-play-analysis-ii
  {
    slug: 'game-play-analysis-ii',
    number: 512,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Earliest Activity Identification',
        text: 'Filter log rows to retain solely the hardware identifier linked to each participant initial participation record.'
      },
      {
        level: 2,
        title: 'Grouped Minimum Timestamp Pairing',
        text: 'Isolate each participant first event date using grouped aggregation, then filter the source records matching both user and timestamp.'
      },
      {
        level: 3,
        title: 'Subquery Filtering Blueprint',
        text: 'Select player_id and device_id where tuple (player_id, event_date) matches the subquery of minimum event_date grouped by player_id.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT player_id, device_id\nFROM Activity\nWHERE (player_id, event_date) IN (\n    SELECT player_id, MIN(event_date)\n    FROM Activity\n    GROUP BY player_id\n);\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: number of records in Activity table'],
      notes: 'Aggregation and tuple filter execute in linear-logarithmic scan time.',
      whyNaiveFails: 'Grouping by player_id and selecting device_id directly returns arbitrary non-deterministic device values in SQL standards.',
      spaceTimeTradeoff: 'Subquery materialization isolates earliest login dates per account.',
      interviewerExpectation: 'Use of subquery tuple filtering or window ranking functions.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT player_id, device_id
FROM Activity
WHERE (player_id, event_date) IN (
    SELECT player_id, MIN(event_date)
    FROM Activity
    GROUP BY player_id
);`,
        approach: 'Tuple Subquery Filtering',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT DISTINCT ON (player_id) player_id, device_id
FROM Activity
ORDER BY player_id, event_date ASC;`,
        approach: 'PostgreSQL Distinct On Clause',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def game_analysis(activity: pd.DataFrame) -> pd.DataFrame:
    sorted_df = activity.sort_values(by='event_date')
    first_logins = sorted_df.drop_duplicates(subset=['player_id'], keep='first')
    return first_logins[['player_id', 'device_id']]`,
        approach: 'Pandas Sort and Drop Duplicates First',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Activity (player_id int, device_id int, event_date date, games_played int);`,
    referenceSql: `SELECT player_id, device_id FROM Activity WHERE (player_id, event_date) IN (SELECT player_id, MIN(event_date) FROM Activity GROUP BY player_id);`,
    generatorPy: `import json
cases = [
    {
        "Activity": [
            {"player_id": 1, "device_id": 2, "event_date": "2016-03-01", "games_played": 5},
            {"player_id": 1, "device_id": 2, "event_date": "2016-05-02", "games_played": 6},
            {"player_id": 2, "device_id": 3, "event_date": "2017-06-25", "games_played": 1},
            {"player_id": 3, "device_id": 1, "event_date": "2016-03-02", "games_played": 0},
            {"player_id": 3, "device_id": 4, "event_date": "2018-07-03", "games_played": 5}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 2. #534 game-play-analysis-iii
  {
    slug: 'game-play-analysis-iii',
    number: 534,
    category: 'Database',
    patterns: ['running-total'],
    hints: [
      {
        level: 1,
        title: 'Cumulative Partition Aggregation',
        text: 'Compute a running sum of session metrics partitioned by user identity across chronological timestamps.'
      },
      {
        level: 2,
        title: 'Window Function Ordering',
        text: 'Apply an aggregate summation window partition by player ordered by date to accumulate values monotonically.'
      },
      {
        level: 3,
        title: 'Running Total Blueprint',
        text: 'Select player_id, event_date, and sum(games_played) over (partition by player_id order by event_date) as games_played_so_far.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT\n    player_id,\n    event_date,\n    SUM(games_played) OVER (\n        PARTITION BY player_id\n        ORDER BY event_date\n    ) AS games_played_so_far\nFROM Activity;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: number of records in Activity table'],
      notes: 'Window sort and prefix sum calculation evaluate in linear-logarithmic time.',
      whyNaiveFails: 'Self-join quadratic accumulation scales poorly on large log volumes.',
      spaceTimeTradeoff: 'Window frames compute running sums in a single pass without Cartesian products.',
      interviewerExpectation: 'Use of standard SQL window functions with PARTITION BY and ORDER BY clauses.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT
    player_id,
    event_date,
    SUM(games_played) OVER (
        PARTITION BY player_id
        ORDER BY event_date
    ) AS games_played_so_far
FROM Activity;`,
        approach: 'Window Aggregate Running Total',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT
    player_id,
    event_date,
    SUM(games_played) OVER (
        PARTITION BY player_id
        ORDER BY event_date
    ) AS games_played_so_far
FROM Activity;`,
        approach: 'PostgreSQL Cumulative Sum Window',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def gameplay_analysis(activity: pd.DataFrame) -> pd.DataFrame:
    activity = activity.sort_values(by=['player_id', 'event_date'])
    activity['games_played_so_far'] = activity.groupby('player_id')['games_played'].cumsum()
    return activity[['player_id', 'event_date', 'games_played_so_far']]`,
        approach: 'Pandas Cumulative Sum Groupby',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Activity (player_id int, device_id int, event_date date, games_played int);`,
    referenceSql: `SELECT player_id, event_date, SUM(games_played) OVER (PARTITION BY player_id ORDER BY event_date) AS games_played_so_far FROM Activity;`,
    generatorPy: `import json
cases = [
    {
        "Activity": [
            {"player_id": 1, "device_id": 2, "event_date": "2016-03-01", "games_played": 5},
            {"player_id": 1, "device_id": 2, "event_date": "2016-05-02", "games_played": 6},
            {"player_id": 1, "device_id": 3, "event_date": "2017-06-25", "games_played": 1},
            {"player_id": 3, "device_id": 1, "event_date": "2016-03-02", "games_played": 0},
            {"player_id": 3, "device_id": 4, "event_date": "2018-07-03", "games_played": 5}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 3. #550 game-play-analysis-iv
  {
    slug: 'game-play-analysis-iv',
    number: 550,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Retention Ratio Calculation',
        text: 'Determine the proportion of total unique participants who logged back into the platform exactly one day following their initial session.'
      },
      {
        level: 2,
        title: 'First Date Self Join',
        text: 'Find each user initial timestamp using a CTE or subquery, then inner join with the main table matching date plus one day.'
      },
      {
        level: 3,
        title: 'Retention Blueprint',
        text: 'Join first login table with activity on player_id and event_date equals first_date + 1 day. Return round(count(distinct a.player_id) / total, 2).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH FirstLogin AS (\n    SELECT player_id, MIN(event_date) AS first_date\n    FROM Activity\n    GROUP BY player_id\n)\nSELECT\n    ROUND(\n        COUNT(DISTINCT a.player_id) / (SELECT COUNT(DISTINCT player_id) FROM Activity),\n        2\n    ) AS fraction\nFROM FirstLogin f\nJOIN Activity a\n  ON f.player_id = a.player_id\n AND a.event_date = DATE_ADD(f.first_date, INTERVAL 1 DAY);\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: number of records in Activity table'],
      notes: 'Subquery aggregation and self-join execute in linear-logarithmic time.',
      whyNaiveFails: 'Checking consecutive days without verifying that the base date was the initial login overcounts later consecutive sessions.',
      spaceTimeTradeoff: 'Materializing earliest login isolates baseline cohorts accurately.',
      interviewerExpectation: 'Use of CTE or subquery with DATE_ADD and correct rounding to two decimals.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH FirstLogin AS (
    SELECT player_id, MIN(event_date) AS first_date
    FROM Activity
    GROUP BY player_id
)
SELECT
    ROUND(
        COUNT(DISTINCT a.player_id) / (SELECT COUNT(DISTINCT player_id) FROM Activity),
        2
    ) AS fraction
FROM FirstLogin f
JOIN Activity a
  ON f.player_id = a.player_id
 AND a.event_date = DATE_ADD(f.first_date, INTERVAL 1 DAY);`,
        approach: 'Common Table Expression and Date Offset Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH FirstLogin AS (
    SELECT player_id, MIN(event_date) AS first_date
    FROM Activity
    GROUP BY player_id
)
SELECT
    ROUND(
        COUNT(DISTINCT a.player_id)::numeric / NULLIF((SELECT COUNT(DISTINCT player_id) FROM Activity), 0),
        2
    ) AS fraction
FROM FirstLogin f
JOIN Activity a
  ON f.player_id = a.player_id
 AND a.event_date = f.first_date + INTERVAL '1 day';`,
        approach: 'PostgreSQL Numeric Cast Date Addition CTE',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def gameplay_analysis(activity: pd.DataFrame) -> pd.DataFrame:
    first_logins = activity.groupby('player_id')['event_date'].min().reset_index()
    first_logins['next_date'] = first_logins['event_date'] + pd.Timedelta(days=1)
    merged = pd.merge(first_logins, activity, left_on=['player_id', 'next_date'], right_on=['player_id', 'event_date'])
    total_players = activity['player_id'].nunique()
    retained_players = merged['player_id'].nunique()
    fraction = round(retained_players / total_players, 2) if total_players > 0 else 0.0
    return pd.DataFrame({'fraction': [fraction]})`,
        approach: 'Pandas Next-Day Merge Cohort Analysis',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Activity (player_id int, device_id int, event_date date, games_played int);`,
    referenceSql: `WITH FirstLogin AS (SELECT player_id, MIN(event_date) AS first_date FROM Activity GROUP BY player_id) SELECT ROUND(COUNT(DISTINCT a.player_id) / (SELECT COUNT(DISTINCT player_id) FROM Activity), 2) AS fraction FROM FirstLogin f JOIN Activity a ON f.player_id = a.player_id AND a.event_date = DATE_ADD(f.first_date, INTERVAL 1 DAY);`,
    generatorPy: `import json
cases = [
    {
        "Activity": [
            {"player_id": 1, "device_id": 2, "event_date": "2016-03-01", "games_played": 5},
            {"player_id": 1, "device_id": 2, "event_date": "2016-03-02", "games_played": 6},
            {"player_id": 2, "device_id": 3, "event_date": "2017-06-25", "games_played": 1},
            {"player_id": 3, "device_id": 1, "event_date": "2016-03-02", "games_played": 0},
            {"player_id": 3, "device_id": 4, "event_date": "2018-07-03", "games_played": 5}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 4. #585 investments-in-2016
  {
    slug: 'investments-in-2016',
    number: 585,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Dual Criterion Portfolio Aggregation',
        text: 'Tally total portfolio holdings for policyholders whose previous baseline values collide with peers while their spatial coordinates remain unique.'
      },
      {
        level: 2,
        title: 'Group Count Subquery Invariants',
        text: 'Identify duplicate previous year values and singular geographical locations using group-by count criteria, filtering matching policyholders.'
      },
      {
        level: 3,
        title: 'Investment Sum Blueprint',
        text: 'Select round(sum(tiv_2016), 2) as tiv_2016 where tiv_2015 is in duplicate values subquery and (lat, lon) is in unique coordinate pairs subquery.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016\nFROM Insurance\nWHERE tiv_2015 IN (\n    SELECT tiv_2015\n    FROM Insurance\n    GROUP BY tiv_2015\n    HAVING COUNT(*) > 1\n)\nAND (lat, lon) IN (\n    SELECT lat, lon\n    FROM Insurance\n    GROUP BY lat, lon\n    HAVING COUNT(*) = 1\n);\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: number of records in Insurance table'],
      notes: 'Grouped subqueries and composite tuple checks evaluate in linear-logarithmic time.',
      whyNaiveFails: 'Correlated subqueries or self-joins with Cartesian products scale quadratically on large tables.',
      spaceTimeTradeoff: 'Grouped aggregation isolates matching keys directly without join explosion.',
      interviewerExpectation: 'Use of subqueries with HAVING COUNT(*) conditions and composite tuple filtering.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016
FROM Insurance
WHERE tiv_2015 IN (
    SELECT tiv_2015
    FROM Insurance
    GROUP BY tiv_2015
    HAVING COUNT(*) > 1
)
AND (lat, lon) IN (
    SELECT lat, lon
    FROM Insurance
    GROUP BY lat, lon
    HAVING COUNT(*) = 1
);`,
        approach: 'Subquery Tuple Membership Filtering',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT ROUND(SUM(tiv_2016)::numeric, 2) AS tiv_2016
FROM Insurance
WHERE tiv_2015 IN (
    SELECT tiv_2015
    FROM Insurance
    GROUP BY tiv_2015
    HAVING COUNT(*) > 1
)
AND (lat, lon) IN (
    SELECT lat, lon
    FROM Insurance
    GROUP BY lat, lon
    HAVING COUNT(*) = 1
);`,
        approach: 'PostgreSQL Numeric Rounded Sum with Tuple Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def find_investments(insurance: pd.DataFrame) -> pd.DataFrame:
    dup_2015 = insurance[insurance.duplicated(subset=['tiv_2015'], keep=False)]
    unique_loc = insurance.drop_duplicates(subset=['lat', 'lon'], keep=False)
    filtered = insurance[insurance['pid'].isin(dup_2015['pid']) & insurance['pid'].isin(unique_loc['pid'])]
    total = round(filtered['tiv_2016'].sum(), 2)
    return pd.DataFrame({'tiv_2016': [total]})`,
        approach: 'Pandas Boolean Mask Filtering',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Insurance (pid int, tiv_2015 float, tiv_2016 float, lat float, lon float);`,
    referenceSql: `SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016 FROM Insurance WHERE tiv_2015 IN (SELECT tiv_2015 FROM Insurance GROUP BY tiv_2015 HAVING COUNT(*) > 1) AND (lat, lon) IN (SELECT lat, lon FROM Insurance GROUP BY lat, lon HAVING COUNT(*) = 1);`,
    generatorPy: `import json
cases = [
    {
        "Insurance": [
            {"pid": 1, "tiv_2015": 10.0, "tiv_2016": 5.0, "lat": 10.0, "lon": 10.0},
            {"pid": 2, "tiv_2015": 20.0, "tiv_2016": 20.0, "lat": 20.0, "lon": 20.0},
            {"pid": 3, "tiv_2015": 10.0, "tiv_2016": 30.0, "lat": 20.0, "lon": 20.0},
            {"pid": 4, "tiv_2015": 10.0, "tiv_2016": 40.0, "lat": 40.0, "lon": 40.0}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 5. #574 winning-candidate
  {
    slug: 'winning-candidate',
    number: 574,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Electoral Plurality Extraction',
        text: 'Retrieve the person record associated with the highest volume of cast ballots.'
      },
      {
        level: 2,
        title: 'Ballot Count Ranking',
        text: 'Join nominee records to submitted ballots, aggregate total tallies per person, and sort in descending order to fetch the top entrant.'
      },
      {
        level: 3,
        title: 'Winning Candidate Blueprint',
        text: 'Join Candidate c and Vote v on c.id = v.candidateId, group by c.id and c.name, order by count(v.id) descending, and limit 1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT c.name\nFROM Candidate c\nJOIN Vote v ON c.id = v.candidateId\nGROUP BY c.id, c.name\nORDER BY COUNT(v.id) DESC\nLIMIT 1;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: number of records in Vote table'],
      notes: 'Grouped aggregation and descending sort execute in linear-logarithmic time.',
      whyNaiveFails: 'Looking up candidate without tallying full votes produces incorrect winners.',
      spaceTimeTradeoff: 'Sort with limit 1 avoids computing full ranking structures.',
      interviewerExpectation: 'Use of inner join, group-by aggregate, descending order, and limit 1.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT c.name
FROM Candidate c
JOIN Vote v ON c.id = v.candidateId
GROUP BY c.id, c.name
ORDER BY COUNT(v.id) DESC
LIMIT 1;`,
        approach: 'Joined Aggregation Order By Limit',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT c.name
FROM Candidate c
JOIN Vote v ON c.id = v.candidateId
GROUP BY c.id, c.name
ORDER BY COUNT(v.id) DESC
LIMIT 1;`,
        approach: 'PostgreSQL Ballot Ranking Query',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def winning_candidate(candidate: pd.DataFrame, vote: pd.DataFrame) -> pd.DataFrame:
    top_candidate = vote['candidateId'].value_counts().index[0]
    winner = candidate[candidate['id'] == top_candidate]
    return winner[['name']]`,
        approach: 'Pandas Value Counts Mode Indexer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Candidate (id int, name varchar(255)); CREATE TABLE Vote (id int, candidateId int);`,
    referenceSql: `SELECT c.name FROM Candidate c JOIN Vote v ON c.id = v.candidateId GROUP BY c.id, c.name ORDER BY COUNT(v.id) DESC LIMIT 1;`,
    generatorPy: `import json
cases = [
    {
        "Candidate": [
            {"id": 1, "name": "A"},
            {"id": 2, "name": "B"},
            {"id": 3, "name": "C"},
            {"id": 4, "name": "D"},
            {"id": 5, "name": "E"}
        ],
        "Vote": [
            {"id": 1, "candidateId": 2},
            {"id": 2, "candidateId": 4},
            {"id": 3, "candidateId": 3},
            {"id": 4, "candidateId": 2},
            {"id": 5, "candidateId": 5}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 6. #580 count-student-number-in-departments
  {
    slug: 'count-student-number-in-departments',
    number: 580,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Preserving Outer Group Aggregation',
        text: 'Tally enrolled members across faculties, ensuring units without any registered members remain represented with zero.'
      },
      {
        level: 2,
        title: 'Left Outer Join and Null Count',
        text: 'Left join departments to students and count student identifiers rather than wildcard rows so that unmatched departments produce zero.'
      },
      {
        level: 3,
        title: 'Department Count Blueprint',
        text: 'Left join Department d with Student s on d.dept_id = s.dept_id, group by d.dept_id and d.dept_name, order by student_number descending, dept_name ascending.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT\n    d.dept_name,\n    COUNT(s.student_id) AS student_number\nFROM Department d\nLEFT JOIN Student s ON d.dept_id = s.dept_id\nGROUP BY d.dept_id, d.dept_name\nORDER BY student_number DESC, d.dept_name ASC;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: total number of department and student records'],
      notes: 'Left outer join and composite ordering evaluate in linear-logarithmic time.',
      whyNaiveFails: 'Inner join excludes departments having zero enrolled students.',
      spaceTimeTradeoff: 'Outer join maintains complete coverage of all defined departments.',
      interviewerExpectation: 'Use of LEFT JOIN and COUNT(column) instead of COUNT(*) to preserve zero for nulls.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT
    d.dept_name,
    COUNT(s.student_id) AS student_number
FROM Department d
LEFT JOIN Student s ON d.dept_id = s.dept_id
GROUP BY d.dept_id, d.dept_name
ORDER BY student_number DESC, d.dept_name ASC;`,
        approach: 'Left Join Null-Safe Column Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT
    d.dept_name,
    COUNT(s.student_id) AS student_number
FROM Department d
LEFT JOIN Student s ON d.dept_id = s.dept_id
GROUP BY d.dept_id, d.dept_name
ORDER BY student_number DESC, d.dept_name ASC;`,
        approach: 'PostgreSQL Outer Join Count Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def count_students(student: pd.DataFrame, department: pd.DataFrame) -> pd.DataFrame:
    merged = department.merge(student, on='dept_id', how='left')
    grouped = merged.groupby('dept_name')['student_id'].count().reset_index(name='student_number')
    return grouped.sort_values(by=['student_number', 'dept_name'], ascending=[False, True])`,
        approach: 'Pandas Left Merge and Column Count Sort',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Student (student_id int, student_name varchar(255), gender varchar(255), dept_id int); CREATE TABLE Department (dept_id int, dept_name varchar(255));`,
    referenceSql: `SELECT d.dept_name, COUNT(s.student_id) AS student_number FROM Department d LEFT JOIN Student s ON d.dept_id = s.dept_id GROUP BY d.dept_id, d.dept_name ORDER BY student_number DESC, d.dept_name ASC;`,
    generatorPy: `import json
cases = [
    {
        "Student": [
            {"student_id": 1, "student_name": "Jack", "gender": "M", "dept_id": 1},
            {"student_id": 2, "student_name": "Jane", "gender": "F", "dept_id": 1},
            {"student_id": 3, "student_name": "Mark", "gender": "M", "dept_id": 2}
        ],
        "Department": [
            {"dept_id": 1, "dept_name": "Engineering"},
            {"dept_id": 2, "dept_name": "Science"},
            {"dept_id": 3, "dept_name": "Law"}
        ]
    }
]
print(json.dumps(cases))
`
  }
];

export function writeBatch13Db() {
  for (const item of batch13DbProblems) {
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

    const metaData = { runner: 'database', ordered: false, testKind: 'deterministic' };
    fs.writeFileSync(path.join(testDir, 'meta.json'), JSON.stringify(metaData, null, 2) + '\n', 'utf8');
    fs.writeFileSync(path.join(testDir, 'schema.sql'), item.schemaSql, 'utf8');
    fs.writeFileSync(path.join(testDir, 'reference.sql'), item.referenceSql, 'utf8');
    fs.writeFileSync(path.join(testDir, 'generator.py'), item.generatorPy, 'utf8');

    console.log(`Generated: #${item.number} ${item.slug} [${item.category}]`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  writeBatch13Db();
}
