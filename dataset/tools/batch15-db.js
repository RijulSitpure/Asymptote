export const batch15Db = [
  // 25. #569 median-employee-salary
  {
    slug: 'median-employee-salary',
    number: 569,
    category: 'Database',
    patterns: ['window-ranking'],
    hints: [
      {
        level: 1,
        title: 'Partitioned Row Rank Positioning',
        text: 'Assign sequential rankings to employees within each company ordered by salary, comparing each rank against half of the company headcount.'
      },
      {
        level: 2,
        title: 'Window Headcount and Position Range Filter',
        text: 'Compute row_number and total company count via window functions. A record qualifies as median when its rank lies between count / 2.0 and count / 2.0 + 1.'
      },
      {
        level: 3,
        title: 'Median Salary Blueprint',
        text: 'With CTE t as (select id, company, salary, row_number() over(partition by company order by salary, id) as rn, count(*) over(partition by company) as cnt from Employee) select id, company, salary from t where rn between cnt / 2.0 and cnt / 2.0 + 1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH Ranked AS (\n    SELECT \n        id,\n        company,\n        salary,\n        ROW_NUMBER() OVER(PARTITION BY company ORDER BY salary, id) AS rn,\n        COUNT(*) OVER(PARTITION BY company) AS total_count\n    FROM Employee\n)\nSELECT id, company, salary\nFROM Ranked\nWHERE rn BETWEEN total_count / 2.0 AND total_count / 2.0 + 1;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: number of records in Employee table'],
      notes: 'Window ranking and partitioning sorts rows per company in linear-logarithmic time.',
      whyNaiveFails: 'Self joins comparing greater and lesser salary counts scale quadratically on large tables.',
      spaceTimeTradeoff: 'Window ranking CTE computes median boundaries in a single query pass.',
      interviewerExpectation: 'Handling both odd and even headcounts using continuous division boundary conditions.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH Ranked AS (
    SELECT 
        id,
        company,
        salary,
        ROW_NUMBER() OVER(PARTITION BY company ORDER BY salary, id) AS rn,
        COUNT(*) OVER(PARTITION BY company) AS total_count
    FROM Employee
)
SELECT id, company, salary
FROM Ranked
WHERE rn BETWEEN total_count / 2.0 AND total_count / 2.0 + 1;`,
        approach: 'Window Ranking Headcount Interval Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH Ranked AS (
    SELECT 
        id,
        company,
        salary,
        ROW_NUMBER() OVER(PARTITION BY company ORDER BY salary, id) AS rn,
        COUNT(*) OVER(PARTITION BY company) AS total_count
    FROM Employee
)
SELECT id, company, salary
FROM Ranked
WHERE rn BETWEEN total_count / 2.0 AND total_count / 2.0 + 1;`,
        approach: 'PostgreSQL Window Rank Headcount Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def median_employee_salary(employee: pd.DataFrame) -> pd.DataFrame:
    df = employee.sort_values(by=['company', 'salary', 'id'])
    df['rn'] = df.groupby('company').cumcount() + 1
    df['cnt'] = df.groupby('company')['id'].transform('count')
    median_df = df[(df['rn'] >= df['cnt'] / 2.0) & (df['rn'] <= df['cnt'] / 2.0 + 1)]
    return median_df[['id', 'company', 'salary']]`,
        approach: 'Pandas Cumcount and Group Transform Median Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Employee (id int, company varchar(255), salary int);`,
    referenceSql: `WITH Ranked AS (SELECT id, company, salary, ROW_NUMBER() OVER(PARTITION BY company ORDER BY salary, id) AS rn, COUNT(*) OVER(PARTITION BY company) AS total_count FROM Employee) SELECT id, company, salary FROM Ranked WHERE rn BETWEEN total_count / 2.0 AND total_count / 2.0 + 1;`,
    generatorPy: `import json
cases = [
    {
        "Employee": [
            {"id": 1, "company": "A", "salary": 2341},
            {"id": 2, "company": "A", "salary": 341},
            {"id": 3, "company": "A", "salary": 15},
            {"id": 4, "company": "A", "salary": 15314},
            {"id": 5, "company": "A", "salary": 451},
            {"id": 6, "company": "A", "salary": 513},
            {"id": 7, "company": "B", "salary": 15},
            {"id": 8, "company": "B", "salary": 13},
            {"id": 9, "company": "B", "salary": 1154},
            {"id": 10, "company": "B", "salary": 1345},
            {"id": 11, "company": "B", "salary": 1221},
            {"id": 12, "company": "B", "salary": 234},
            {"id": 13, "company": "C", "salary": 2345},
            {"id": 14, "company": "C", "salary": 2645},
            {"id": 15, "company": "C", "salary": 2645},
            {"id": 16, "company": "C", "salary": 2652},
            {"id": 17, "company": "C", "salary": 65}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 26. #571 find-median-given-frequency-of-numbers
  {
    slug: 'find-median-given-frequency-of-numbers',
    number: 571,
    category: 'Database',
    patterns: ['window-ranking'],
    hints: [
      {
        level: 1,
        title: 'Bidirectional Cumulative Weight Balancing',
        text: 'The median in a weighted frequency distribution is any number whose cumulative frequency from both the left and right exceeds half the total frequency.'
      },
      {
        level: 2,
        title: 'Dual Running Sum Window Comparison',
        text: 'Compute ascending cumulative frequency and descending cumulative frequency over numbers ordered by value. Check that both running sums are greater than or equal to sum(frequency) / 2.0.'
      },
      {
        level: 3,
        title: 'Median Frequency Blueprint',
        text: 'With CTE as (select num, sum(frequency) over(order by num asc) as cum_asc, sum(frequency) over(order by num desc) as cum_desc, sum(frequency) over() as total from Numbers) select round(avg(num), 1) as median from CTE where cum_asc >= total / 2.0 and cum_desc >= total / 2.0.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH Cumulative AS (\n    SELECT \n        num,\n        SUM(frequency) OVER(ORDER BY num ASC) AS cum_asc,\n        SUM(frequency) OVER(ORDER BY num DESC) AS cum_desc,\n        SUM(frequency) OVER() AS total_freq\n    FROM Numbers\n)\nSELECT ROUND(AVG(num), 1) AS median\nFROM Cumulative\nWHERE cum_asc >= total_freq / 2.0 \n  AND cum_desc >= total_freq / 2.0;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: number of distinct number rows'],
      notes: 'Window prefix and suffix sums evaluate in sorted linear-logarithmic time.',
      whyNaiveFails: 'Expanding frequency counts into individual uncompressed rows wastes massive memory.',
      spaceTimeTradeoff: 'Dual cumulative window sums avoid table unnesting.',
      interviewerExpectation: 'Using ascending and descending cumulative weights to identify median boundaries.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH Cumulative AS (
    SELECT 
        num,
        SUM(frequency) OVER(ORDER BY num ASC) AS cum_asc,
        SUM(frequency) OVER(ORDER BY num DESC) AS cum_desc,
        SUM(frequency) OVER() AS total_freq
    FROM Numbers
)
SELECT ROUND(AVG(num), 1) AS median
FROM Cumulative
WHERE cum_asc >= total_freq / 2.0 
  AND cum_desc >= total_freq / 2.0;`,
        approach: 'Bidirectional Cumulative Window Sums',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH Cumulative AS (
    SELECT 
        num,
        SUM(frequency) OVER(ORDER BY num ASC) AS cum_asc,
        SUM(frequency) OVER(ORDER BY num DESC) AS cum_desc,
        SUM(frequency) OVER() AS total_freq
    FROM Numbers
)
SELECT ROUND(AVG(num)::numeric, 1)::double precision AS median
FROM Cumulative
WHERE cum_asc >= total_freq / 2.0 
  AND cum_desc >= total_freq / 2.0;`,
        approach: 'PostgreSQL Cumulative Window Median',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def median_frequency(numbers: pd.DataFrame) -> pd.DataFrame:
    df = numbers.sort_values(by='num')
    total = df['frequency'].sum()
    df['cum_asc'] = df['frequency'].cumsum()
    df['cum_desc'] = df['frequency'].iloc[::-1].cumsum().iloc[::-1]
    medians = df[(df['cum_asc'] >= total / 2.0) & (df['cum_desc'] >= total / 2.0)]
    med_val = round(medians['num'].mean(), 1)
    return pd.DataFrame({'median': [med_val]})`,
        approach: 'Pandas Cumulative Sum Median Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Numbers (num int, frequency int);`,
    referenceSql: `WITH Cumulative AS (SELECT num, SUM(frequency) OVER(ORDER BY num ASC) AS cum_asc, SUM(frequency) OVER(ORDER BY num DESC) AS cum_desc, SUM(frequency) OVER() AS total_freq FROM Numbers) SELECT ROUND(AVG(num), 1) AS median FROM Cumulative WHERE cum_asc >= total_freq / 2.0 AND cum_desc >= total_freq / 2.0;`,
    generatorPy: `import json
cases = [
    {
        "Numbers": [
            {"num": 0, "frequency": 7},
            {"num": 1, "frequency": 1},
            {"num": 2, "frequency": 3},
            {"num": 3, "frequency": 1}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 27. #578 get-highest-answer-rate-question
  {
    slug: 'get-highest-answer-rate-question',
    number: 578,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Ratio Aggregation of Logged Events',
        text: 'Group logs by question identifier and calculate the proportion of answered occurrences over total shown impressions.'
      },
      {
        level: 2,
        title: 'Summing Flagged Actions in Group By',
        text: 'Count answer events by evaluating sum(action = "answer") and divide by sum(action = "show"). Order the resulting answer rate in descending order.'
      },
      {
        level: 3,
        title: 'Top Answer Rate Blueprint',
        text: 'Select question_id as survey_log from SurveyLog group by question_id order by (sum(action = "answer") / sum(action = "show")) desc, question_id asc limit 1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT question_id AS survey_log\nFROM SurveyLog\nGROUP BY question_id\nORDER BY (SUM(action = \'answer\') / SUM(action = \'show\')) DESC, question_id ASC\nLIMIT 1;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: number of records in SurveyLog'],
      notes: 'Group by aggregation and sorting by answer rate runs in linear-logarithmic time.',
      whyNaiveFails: 'Joining separate show and answer tables introduces row multiplication overhead.',
      spaceTimeTradeoff: 'Conditional aggregation sums action events in a single group scan.',
      interviewerExpectation: 'Use of conditional sums (SUM(action = "answer")) and tie-breaking by question_id ASC.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT question_id AS survey_log
FROM SurveyLog
GROUP BY question_id
ORDER BY (SUM(action = 'answer') / SUM(action = 'show')) DESC, question_id ASC
LIMIT 1;`,
        approach: 'Conditional Grouped Ratio Sorting',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT question_id AS survey_log
FROM SurveyLog
GROUP BY question_id
ORDER BY (COUNT(*) FILTER (WHERE action = 'answer')::float / COUNT(*) FILTER (WHERE action = 'show')::float) DESC, question_id ASC
LIMIT 1;`,
        approach: 'PostgreSQL Filter Clause Ratio Sorting',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def highest_answer_rate_question(survey_log: pd.DataFrame) -> pd.DataFrame:
    grouped = survey_log.groupby('question_id').agg(
        answers=('action', lambda s: (s == 'answer').sum()),
        shows=('action', lambda s: (s == 'show').sum())
    ).reset_index()
    grouped['rate'] = grouped['answers'] / grouped['shows']
    sorted_df = grouped.sort_values(by=['rate', 'question_id'], ascending=[False, True])
    return pd.DataFrame({'survey_log': [sorted_df.iloc[0]['question_id']]})`,
        approach: 'Pandas Groupby Conditional Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE SurveyLog (id int, action varchar(255), question_id int, answer_id int, q_num int, timestamp int);`,
    referenceSql: `SELECT question_id AS survey_log FROM SurveyLog GROUP BY question_id ORDER BY (SUM(action = 'answer') / SUM(action = 'show')) DESC, question_id ASC LIMIT 1;`,
    generatorPy: `import json
cases = [
    {
        "SurveyLog": [
            {"id": 5, "action": "show", "question_id": 285, "answer_id": None, "q_num": 1, "timestamp": 123},
            {"id": 5, "action": "answer", "question_id": 285, "answer_id": 124124, "q_num": 1, "timestamp": 124},
            {"id": 5, "action": "show", "question_id": 369, "answer_id": None, "q_num": 2, "timestamp": 125},
            {"id": 5, "action": "skip", "question_id": 369, "answer_id": None, "q_num": 2, "timestamp": 126}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 28. #579 find-cumulative-salary-of-an-employee
  {
    slug: 'find-cumulative-salary-of-an-employee',
    number: 579,
    category: 'Database',
    patterns: ['running-total'],
    hints: [
      {
        level: 1,
        title: 'Three Month Rolling Salary Summation',
        text: 'Calculate the rolling sum of salaries for each employee over a window of up to 3 consecutive months, excluding each employee most recent month.'
      },
      {
        level: 2,
        title: 'Excluding Most Recent Month via Window Max',
        text: 'Filter out the maximum month worked per employee using max(month) over(partition by id). Then compute sum(salary) over a range between 2 preceding and current row.'
      },
      {
        level: 3,
        title: 'Cumulative Salary Blueprint',
        text: 'With Excluded as (select id, month, salary, max(month) over(partition by id) as max_m from Employee) select id, month, sum(salary) over(partition by id order by month range between 2 preceding and current row) as Salary from Excluded where month < max_m order by id asc, month desc.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH Filtered AS (\n    SELECT \n        id,\n        month,\n        salary,\n        MAX(month) OVER(PARTITION BY id) AS max_month\n    FROM Employee\n)\nSELECT \n    id,\n    month,\n    SUM(salary) OVER(\n        PARTITION BY id \n        ORDER BY month \n        RANGE BETWEEN 2 PRECEDING AND CURRENT ROW\n    ) AS Salary\nFROM Filtered\nWHERE month < max_month\nORDER BY id ASC, month DESC;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: number of records in Employee table'],
      notes: 'Window range aggregations and partition sorting execute in linear-logarithmic time.',
      whyNaiveFails: 'Self-joins across 3 month offset combinations generate multiple intermediate cartesian products.',
      spaceTimeTradeoff: 'RANGE BETWEEN 2 PRECEDING window frames compute exact monthly offsets without join explosion.',
      interviewerExpectation: 'Using RANGE rather than ROWS to respect exact numeric month differences.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH Filtered AS (
    SELECT 
        id,
        month,
        salary,
        MAX(month) OVER(PARTITION BY id) AS max_month
    FROM Employee
)
SELECT 
    id,
    month,
    SUM(salary) OVER(
        PARTITION BY id 
        ORDER BY month 
        RANGE BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS Salary
FROM Filtered
WHERE month < max_month
ORDER BY id ASC, month DESC;`,
        approach: 'Window Range Running Sum with Max Month Exclusion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH Filtered AS (
    SELECT 
        id,
        month,
        salary,
        MAX(month) OVER(PARTITION BY id) AS max_month
    FROM Employee
)
SELECT 
    id,
    month,
    SUM(salary) OVER(
        PARTITION BY id 
        ORDER BY month 
        RANGE BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS "Salary"
FROM Filtered
WHERE month < max_month
ORDER BY id ASC, month DESC;`,
        approach: 'PostgreSQL Range Between 2 Preceding Window Sum',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def cumulative_salary(employee: pd.DataFrame) -> pd.DataFrame:
    df = employee.copy()
    max_months = df.groupby('id')['month'].transform('max')
    df = df[df['month'] < max_months].sort_values(by=['id', 'month'])
    
    records = []
    for emp_id, group in df.groupby('id'):
        for _, row in group.iterrows():
            m = row['month']
            s_sum = group[(group['month'] >= m - 2) & (group['month'] <= m)]['salary'].sum()
            records.append({'id': emp_id, 'month': m, 'Salary': s_sum})
            
    res = pd.DataFrame(records)
    if res.empty:
        return pd.DataFrame(columns=['id', 'month', 'Salary'])
    return res.sort_values(by=['id', 'month'], ascending=[True, False])`,
        approach: 'Pandas Window Range Filtering and Rolling Sum',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Employee (id int, month int, salary int);`,
    referenceSql: `WITH Filtered AS (SELECT id, month, salary, MAX(month) OVER(PARTITION BY id) AS max_month FROM Employee) SELECT id, month, SUM(salary) OVER(PARTITION BY id ORDER BY month RANGE BETWEEN 2 PRECEDING AND CURRENT ROW) AS Salary FROM Filtered WHERE month < max_month ORDER BY id ASC, month DESC;`,
    generatorPy: `import json
cases = [
    {
        "Employee": [
            {"id": 1, "month": 1, "salary": 20},
            {"id": 2, "month": 1, "salary": 20},
            {"id": 1, "month": 2, "salary": 30},
            {"id": 2, "month": 2, "salary": 30},
            {"id": 3, "month": 2, "salary": 40},
            {"id": 1, "month": 3, "salary": 40},
            {"id": 3, "month": 3, "salary": 60},
            {"id": 1, "month": 4, "salary": 60},
            {"id": 3, "month": 4, "salary": 70}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 29. #597 friend-requests-i-overall-acceptance-rate
  {
    slug: 'friend-requests-i-overall-acceptance-rate',
    number: 597,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Distinct Request Acceptance Ratio',
        text: 'Count unique sender-receiver acceptance pairs and divide by the count of unique sender-receiver request pairs.'
      },
      {
        level: 2,
        title: 'Safe Division and Zero Handling',
        text: 'Retrieve distinct counts from both tables. Use ifnull or coalesce to return 0.00 if the total number of distinct friend requests is zero.'
      },
      {
        level: 3,
        title: 'Acceptance Rate Blueprint',
        text: 'Select round(ifnull(count(distinct requester_id, accepter_id) / nullif(count(distinct sender_id, send_to_id), 0), 0.0), 2) as accept_rate from RequestAccepted, FriendRequest.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT \n    ROUND(\n        IFNULL(\n            (SELECT COUNT(DISTINCT requester_id, accepter_id) FROM RequestAccepted) /\n            NULLIF((SELECT COUNT(DISTINCT sender_id, send_to_id) FROM FriendRequest), 0),\n            0.0\n        ),\n        2\n    ) AS accept_rate;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(R + A)',
      space: 'O(R + A)',
      variables: ['R: records in FriendRequest', 'A: records in RequestAccepted'],
      notes: 'Distinct pair hashing executes in linear time across both input tables.',
      whyNaiveFails: 'Cross joining raw tables without distinct subqueries produces Cartesian row multiplication.',
      spaceTimeTradeoff: 'Independent scalar subqueries isolate distinct pair counts with minimal memory footprint.',
      interviewerExpectation: 'Using NULLIF to guard against division by zero and returning 0.00 on empty tables.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT 
    ROUND(
        IFNULL(
            (SELECT COUNT(DISTINCT requester_id, accepter_id) FROM RequestAccepted) /
            NULLIF((SELECT COUNT(DISTINCT sender_id, send_to_id) FROM FriendRequest), 0),
            0.0
        ),
        2
    ) AS accept_rate;`,
        approach: 'Scalar Distinct Subquery Safe Division',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT 
    ROUND(
        COALESCE(
            (SELECT COUNT(DISTINCT (requester_id, accepter_id)) FROM RequestAccepted)::numeric /
            NULLIF((SELECT COUNT(DISTINCT (sender_id, send_to_id)) FROM FriendRequest), 0)::numeric,
            0.0
        ),
        2
    )::double precision AS accept_rate;`,
        approach: 'PostgreSQL Coalesce Numeric Division',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def acceptance_rate(friend_request: pd.DataFrame, request_accepted: pd.DataFrame) -> pd.DataFrame:
    req_count = len(friend_request[['sender_id', 'send_to_id']].drop_duplicates())
    acc_count = len(request_accepted[['requester_id', 'accepter_id']].drop_duplicates())
    rate = round(acc_count / req_count, 2) if req_count > 0 else 0.0
    return pd.DataFrame({'accept_rate': [rate]})`,
        approach: 'Pandas Distinct Pair Count Division',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE FriendRequest (sender_id int, send_to_id int, request_date date);\nCREATE TABLE RequestAccepted (requester_id int, accepter_id int, accept_date date);`,
    referenceSql: `SELECT ROUND(IFNULL((SELECT COUNT(DISTINCT requester_id, accepter_id) FROM RequestAccepted) / NULLIF((SELECT COUNT(DISTINCT sender_id, send_to_id) FROM FriendRequest), 0), 0.0), 2) AS accept_rate;`,
    generatorPy: `import json
cases = [
    {
        "FriendRequest": [
            {"sender_id": 1, "send_to_id": 2, "request_date": "2016-06-01"},
            {"sender_id": 1, "send_to_id": 3, "request_date": "2016-06-01"},
            {"sender_id": 1, "send_to_id": 4, "request_date": "2016-06-01"},
            {"sender_id": 2, "send_to_id": 3, "request_date": "2016-06-02"},
            {"sender_id": 3, "send_to_id": 4, "request_date": "2016-06-09"}
        ],
        "RequestAccepted": [
            {"requester_id": 1, "accepter_id": 2, "accept_date": "2016-06-03"},
            {"requester_id": 1, "accepter_id": 3, "accept_date": "2016-06-08"},
            {"requester_id": 2, "accepter_id": 3, "accept_date": "2016-06-08"},
            {"requester_id": 3, "accepter_id": 4, "accept_date": "2016-06-09"},
            {"requester_id": 3, "accepter_id": 4, "accept_date": "2016-06-10"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 30. #602 friend-requests-ii-who-has-the-most-friends
  {
    slug: 'friend-requests-ii-who-has-the-most-friends',
    number: 602,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Bidirectional Friendship Union',
        text: 'Friendship is symmetric. Each accepted request contributes one friend to both the requester and the accepter.'
      },
      {
        level: 2,
        title: 'Union All Participant Stacking',
        text: 'Combine requester_id and accepter_id into a single unified column of participant IDs by vertically stacking accepted records. Then group by participant and count occurrences.'
      },
      {
        level: 3,
        title: 'Most Friends Blueprint',
        text: 'With Friends as (select requester_id as id from RequestAccepted union all select accepter_id as id from RequestAccepted) select id, count(*) as num from Friends group by id order by num desc limit 1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH AllFriends AS (\n    SELECT requester_id AS id FROM RequestAccepted\n    UNION ALL\n    SELECT accepter_id AS id FROM RequestAccepted\n)\nSELECT id, COUNT(*) AS num\nFROM AllFriends\nGROUP BY id\nORDER BY num DESC\nLIMIT 1;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: number of accepted requests'],
      notes: 'Union all and grouping by participant executes in linear-logarithmic sorting time.',
      whyNaiveFails: 'Counting only requester or accepter separately misses reciprocal friendships.',
      spaceTimeTradeoff: 'UNION ALL preserves duplicates without dedup overhead before grouping.',
      interviewerExpectation: 'Use of UNION ALL rather than UNION to properly tally both endpoints of a friendship.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH AllFriends AS (
    SELECT requester_id AS id FROM RequestAccepted
    UNION ALL
    SELECT accepter_id AS id FROM RequestAccepted
)
SELECT id, COUNT(*) AS num
FROM AllFriends
GROUP BY id
ORDER BY num DESC
LIMIT 1;`,
        approach: 'Bidirectional UNION ALL Group Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH AllFriends AS (
    SELECT requester_id AS id FROM RequestAccepted
    UNION ALL
    SELECT accepter_id AS id FROM RequestAccepted
)
SELECT id, COUNT(*) AS num
FROM AllFriends
GROUP BY id
ORDER BY num DESC
LIMIT 1;`,
        approach: 'PostgreSQL UNION ALL Group Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def most_friends(request_accepted: pd.DataFrame) -> pd.DataFrame:
    all_ids = pd.concat([request_accepted['requester_id'], request_accepted['accepter_id']])
    counts = all_ids.value_counts().reset_index()
    counts.columns = ['id', 'num']
    return counts.head(1)`,
        approach: 'Pandas Concat and Value Counts Head',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE RequestAccepted (requester_id int, accepter_id int, accept_date date);`,
    referenceSql: `WITH AllFriends AS (SELECT requester_id AS id FROM RequestAccepted UNION ALL SELECT accepter_id AS id FROM RequestAccepted) SELECT id, COUNT(*) AS num FROM AllFriends GROUP BY id ORDER BY num DESC LIMIT 1;`,
    generatorPy: `import json
cases = [
    {
        "RequestAccepted": [
            {"requester_id": 1, "accepter_id": 2, "accept_date": "2016-06-03"},
            {"requester_id": 1, "accepter_id": 3, "accept_date": "2016-06-08"},
            {"requester_id": 2, "accepter_id": 3, "accept_date": "2016-06-08"},
            {"requester_id": 3, "accepter_id": 4, "accept_date": "2016-06-09"}
        ]
    }
]
print(json.dumps(cases))
`
  }
];
