export const batch16Db2 = [
  // 1. #1075 project-employees-i
  {
    slug: 'project-employees-i',
    number: 1075,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Project Grouped Experience Mean',
        text: 'Join projects to their assigned personnel to calculate the mean professional experience per project.'
      },
      {
        level: 2,
        title: 'Aggregation and Rounding Specification',
        text: 'Group rows by project identifier and apply average aggregation on employee experience rounded to two decimals.'
      },
      {
        level: 3,
        title: 'Project Employees Query Blueprint',
        text: 'select p.project_id, round(avg(e.experience_years), 2) as average_years from Project p join Employee e on p.employee_id = e.employee_id group by p.project_id.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT p.project_id, ROUND(AVG(e.experience_years), 2) AS average_years\nFROM Project p\nJOIN Employee e ON p.employee_id = e.employee_id\nGROUP BY p.project_id;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(P + E)',
      space: 'O(P)',
      variables: ['P: number of project assignments', 'E: number of employee records'],
      notes: 'Equi-join on employee identifier followed by hash grouping executes in linear time relative to table sizes.',
      whyNaiveFails: 'Correlated scalar subqueries scanning the employee table per assignment yield quadratic complexity.',
      spaceTimeTradeoff: 'Grouped aggregation builds a compact hash table proportional to distinct projects.',
      interviewerExpectation: 'Use of inner join, AVG aggregation, and ROUND to 2 decimal places.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT p.project_id, ROUND(AVG(e.experience_years), 2) AS average_years
FROM Project p
JOIN Employee e ON p.employee_id = e.employee_id
GROUP BY p.project_id;`,
        approach: 'Inner Join with Grouped Mean Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT p.project_id, ROUND(AVG(e.experience_years)::numeric, 2) AS average_years
FROM Project p
JOIN Employee e ON p.employee_id = e.employee_id
GROUP BY p.project_id;`,
        approach: 'PostgreSQL Numeric Cast and Rounded Mean',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def project_employees_i(project: pd.DataFrame, employee: pd.DataFrame) -> pd.DataFrame:
    df = project.merge(employee, on='employee_id')
    res = df.groupby('project_id')['experience_years'].mean().round(2).reset_index()
    return res.rename(columns={'experience_years': 'average_years'})`,
        approach: 'Pandas Merge and Grouped Mean Rounding',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Project (project_id int, employee_id int);
CREATE TABLE Employee (employee_id int, name varchar(20), experience_years int);`,
    referenceSql: `SELECT p.project_id, ROUND(AVG(e.experience_years), 2) AS average_years FROM Project p JOIN Employee e ON p.employee_id = e.employee_id GROUP BY p.project_id;`,
    generatorPy: `import json
cases = [
    {
        "Project": [
            {"project_id": 1, "employee_id": 1},
            {"project_id": 1, "employee_id": 2},
            {"project_id": 1, "employee_id": 3},
            {"project_id": 2, "employee_id": 1},
            {"project_id": 2, "employee_id": 4}
        ],
        "Employee": [
            {"employee_id": 1, "name": "Khaled", "experience_years": 3},
            {"employee_id": 2, "name": "Ali", "experience_years": 2},
            {"employee_id": 3, "name": "John", "experience_years": 1},
            {"employee_id": 4, "name": "Doe", "experience_years": 2}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 2. #1076 project-employees-ii
  {
    slug: 'project-employees-ii',
    number: 1076,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Maximum Project Headcount Identification',
        text: 'Determine the maximum number of assigned employees across any project, then return all project identifiers achieving that count.'
      },
      {
        level: 2,
        title: 'Group Count with Subquery Ceiling',
        text: 'Group project records by project identifier and filter the groups using a having clause equal to the global maximum count.'
      },
      {
        level: 3,
        title: 'Project Headcount Query Blueprint',
        text: 'select project_id from Project group by project_id having count(employee_id) = (select count(employee_id) from Project group by project_id order by count(employee_id) desc limit 1).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT project_id\nFROM Project\nGROUP BY project_id\nHAVING COUNT(employee_id) = (\n    SELECT COUNT(employee_id)\n    FROM Project\n    GROUP BY project_id\n    ORDER BY COUNT(employee_id) DESC\n    LIMIT 1\n);\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(P log P)',
      space: 'O(P)',
      variables: ['P: number of project assignments'],
      notes: 'Grouping assignments and finding the maximum via scalar subquery executes in linear-logarithmic time.',
      whyNaiveFails: 'Hardcoding a single project identifier ignores possible ties across top projects.',
      spaceTimeTradeoff: 'Having filter against maximum subquery cleanly handles ties without row-number windowing.',
      interviewerExpectation: 'Handling ties properly when multiple projects share the maximum headcount.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT project_id
FROM Project
GROUP BY project_id
HAVING COUNT(employee_id) = (
    SELECT COUNT(employee_id)
    FROM Project
    GROUP BY project_id
    ORDER BY COUNT(employee_id) DESC
    LIMIT 1
);`,
        approach: 'Group Count Filtered by Global Maximum Subquery',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT project_id
FROM Project
GROUP BY project_id
HAVING COUNT(employee_id) = (
    SELECT COUNT(employee_id)
    FROM Project
    GROUP BY project_id
    ORDER BY COUNT(employee_id) DESC
    LIMIT 1
);`,
        approach: 'PostgreSQL Having Maximum Scalar Subquery',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def project_employees_ii(project: pd.DataFrame, employee: pd.DataFrame) -> pd.DataFrame:
    counts = project.groupby('project_id')['employee_id'].count().reset_index()
    max_count = counts['employee_id'].max()
    return counts[counts['employee_id'] == max_count][['project_id']]`,
        approach: 'Pandas Groupby Count and Max Filtering',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Project (project_id int, employee_id int);
CREATE TABLE Employee (employee_id int, name varchar(20), experience_years int);`,
    referenceSql: `SELECT project_id FROM Project GROUP BY project_id HAVING COUNT(employee_id) = (SELECT COUNT(employee_id) FROM Project GROUP BY project_id ORDER BY COUNT(employee_id) DESC LIMIT 1);`,
    generatorPy: `import json
cases = [
    {
        "Project": [
            {"project_id": 1, "employee_id": 1},
            {"project_id": 1, "employee_id": 2},
            {"project_id": 1, "employee_id": 3},
            {"project_id": 2, "employee_id": 1},
            {"project_id": 2, "employee_id": 4}
        ],
        "Employee": [
            {"employee_id": 1, "name": "Khaled", "experience_years": 3},
            {"employee_id": 2, "name": "Ali", "experience_years": 2},
            {"employee_id": 3, "name": "John", "experience_years": 1},
            {"employee_id": 4, "name": "Doe", "experience_years": 2}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 3. #1077 project-employees-iii
  {
    slug: 'project-employees-iii',
    number: 1077,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Project-Specific Seniority Ranking',
        text: 'Identify the employee or employees possessing the highest tenure in years within each individual project.'
      },
      {
        level: 2,
        title: 'Dense Rank Window Partition',
        text: 'Assign a dense ranking partitioned by project identifier and ordered descending by experience years, filtering for rank one.'
      },
      {
        level: 3,
        title: 'Project Experience Query Blueprint',
        text: 'with Ranked as (select p.project_id, p.employee_id, dense_rank() over (partition by p.project_id order by e.experience_years desc) as rnk from Project p join Employee e on p.employee_id = e.employee_id) select project_id, employee_id from Ranked where rnk = 1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nWITH Ranked AS (\n    SELECT p.project_id, p.employee_id,\n           DENSE_RANK() OVER (PARTITION BY p.project_id ORDER BY e.experience_years DESC) AS rnk\n    FROM Project p\n    JOIN Employee e ON p.employee_id = e.employee_id\n)\nSELECT project_id, employee_id\nFROM Ranked\nWHERE rnk = 1;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(P log P)',
      space: 'O(P)',
      variables: ['P: total number of project assignments'],
      notes: 'Joining tables followed by window partitioning and ranking executes in linear-logarithmic time.',
      whyNaiveFails: 'Correlated max subqueries on unindexed tables perform repeated full table scans.',
      spaceTimeTradeoff: 'Window ranking computes group maximums in a single scan without subquery re-execution.',
      interviewerExpectation: 'Use of DENSE_RANK() or RANK() window functions partitioned by project.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `WITH Ranked AS (
    SELECT p.project_id, p.employee_id,
           DENSE_RANK() OVER (PARTITION BY p.project_id ORDER BY e.experience_years DESC) AS rnk
    FROM Project p
    JOIN Employee e ON p.employee_id = e.employee_id
)
SELECT project_id, employee_id
FROM Ranked
WHERE rnk = 1;`,
        approach: 'Window Dense Rank Partitioned by Project',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `WITH Ranked AS (
    SELECT p.project_id, p.employee_id,
           DENSE_RANK() OVER (PARTITION BY p.project_id ORDER BY e.experience_years DESC) AS rnk
    FROM Project p
    JOIN Employee e ON p.employee_id = e.employee_id
)
SELECT project_id, employee_id
FROM Ranked
WHERE rnk = 1;`,
        approach: 'PostgreSQL Partitioned Window Dense Rank',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def project_employees_iii(project: pd.DataFrame, employee: pd.DataFrame) -> pd.DataFrame:
    df = project.merge(employee, on='employee_id')
    max_exp = df.groupby('project_id')['experience_years'].transform('max')
    res = df[df['experience_years'] == max_exp]
    return res[['project_id', 'employee_id']]`,
        approach: 'Pandas Merge and Groupby Transform Max Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Project (project_id int, employee_id int);
CREATE TABLE Employee (employee_id int, name varchar(20), experience_years int);`,
    referenceSql: `WITH Ranked AS (SELECT p.project_id, p.employee_id, DENSE_RANK() OVER (PARTITION BY p.project_id ORDER BY e.experience_years DESC) AS rnk FROM Project p JOIN Employee e ON p.employee_id = e.employee_id) SELECT project_id, employee_id FROM Ranked WHERE rnk = 1;`,
    generatorPy: `import json
cases = [
    {
        "Project": [
            {"project_id": 1, "employee_id": 1},
            {"project_id": 1, "employee_id": 2},
            {"project_id": 1, "employee_id": 3},
            {"project_id": 2, "employee_id": 1},
            {"project_id": 2, "employee_id": 4}
        ],
        "Employee": [
            {"employee_id": 1, "name": "Khaled", "experience_years": 3},
            {"employee_id": 2, "name": "Ali", "experience_years": 2},
            {"employee_id": 3, "name": "John", "experience_years": 3},
            {"employee_id": 4, "name": "Doe", "experience_years": 2}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 4. #1082 sales-analysis-i
  {
    slug: 'sales-analysis-i',
    number: 1082,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Top Seller Revenue Identification',
        text: 'Calculate total revenue generated by each seller across all transactions, identifying the highest aggregate earners.'
      },
      {
        level: 2,
        title: 'Having Filter on Maximum Aggregate',
        text: 'Group sales by seller identifier and retain sellers whose summed price matches the global maximum seller total.'
      },
      {
        level: 3,
        title: 'Sales Analysis Query Blueprint',
        text: 'select seller_id from Sales group by seller_id having sum(price) = (select sum(price) from Sales group by seller_id order by sum(price) desc limit 1).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT seller_id\nFROM Sales\nGROUP BY seller_id\nHAVING SUM(price) = (\n    SELECT SUM(price)\n    FROM Sales\n    GROUP BY seller_id\n    ORDER BY SUM(price) DESC\n    LIMIT 1\n);\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(S log S)',
      space: 'O(S)',
      variables: ['S: number of sales records'],
      notes: 'Grouped aggregation and scalar subquery limit operation run in linear-logarithmic time.',
      whyNaiveFails: 'Simple LIMIT 1 ignores revenue ties where multiple sellers share top earnings.',
      spaceTimeTradeoff: 'Subquery aggregation evaluates maximum revenue once, avoiding Cartesian joins.',
      interviewerExpectation: 'Use of HAVING clause with subquery or DENSE_RANK() window function to handle ties.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT seller_id
FROM Sales
GROUP BY seller_id
HAVING SUM(price) = (
    SELECT SUM(price)
    FROM Sales
    GROUP BY seller_id
    ORDER BY SUM(price) DESC
    LIMIT 1
);`,
        approach: 'Grouped Sum Having Global Maximum Subquery',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT seller_id
FROM Sales
GROUP BY seller_id
HAVING SUM(price) = (
    SELECT SUM(price)
    FROM Sales
    GROUP BY seller_id
    ORDER BY SUM(price) DESC
    LIMIT 1
);`,
        approach: 'PostgreSQL Having Maximum Sum Scalar Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def sales_analysis(sales: pd.DataFrame) -> pd.DataFrame:
    totals = sales.groupby('seller_id')['price'].sum().reset_index()
    max_val = totals['price'].max()
    return totals[totals['price'] == max_val][['seller_id']]`,
        approach: 'Pandas Groupby Sum and Max Filtering',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Product (product_id int, product_name varchar(10), unit_price int);
CREATE TABLE Sales (seller_id int, product_id int, buyer_id int, sale_date date, quantity int, price int);`,
    referenceSql: `SELECT seller_id FROM Sales GROUP BY seller_id HAVING SUM(price) = (SELECT SUM(price) FROM Sales GROUP BY seller_id ORDER BY SUM(price) DESC LIMIT 1);`,
    generatorPy: `import json
cases = [
    {
        "Product": [
            {"product_id": 1, "product_name": "S8", "unit_price": 1000},
            {"product_id": 2, "product_name": "G4", "unit_price": 800},
            {"product_id": 3, "product_name": "iPhone", "unit_price": 1400}
        ],
        "Sales": [
            {"seller_id": 1, "product_id": 1, "buyer_id": 1, "sale_date": "2019-01-21", "quantity": 2, "price": 2000},
            {"seller_id": 1, "product_id": 2, "buyer_id": 2, "sale_date": "2019-02-17", "quantity": 1, "price": 800},
            {"seller_id": 2, "product_id": 2, "buyer_id": 3, "sale_date": "2019-06-02", "quantity": 1, "price": 800},
            {"seller_id": 3, "product_id": 3, "buyer_id": 4, "sale_date": "2019-05-13", "quantity": 2, "price": 2800}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 5. #1083 sales-analysis-ii
  {
    slug: 'sales-analysis-ii',
    number: 1083,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Buyer Brand Adoption Filtering',
        text: 'Identify customers who purchased an S8 model while having never purchased an iPhone model.'
      },
      {
        level: 2,
        title: 'Conditional Sum Group Constraints',
        text: 'Join sales to products, group by buyer identifier, and enforce positive presence for S8 and zero presence for iPhone.'
      },
      {
        level: 3,
        title: 'Brand Analysis Query Blueprint',
        text: 'select s.buyer_id from Sales s join Product p on s.product_id = p.product_id group by s.buyer_id having sum(case when p.product_name = "S8" then 1 else 0 end) > 0 and sum(case when p.product_name = "iPhone" then 1 else 0 end) = 0.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT s.buyer_id\nFROM Sales s\nJOIN Product p ON s.product_id = p.product_id\nGROUP BY s.buyer_id\nHAVING SUM(CASE WHEN p.product_name = \'S8\' THEN 1 ELSE 0 END) > 0\n   AND SUM(CASE WHEN p.product_name = \'iPhone\' THEN 1 ELSE 0 END) = 0;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(S + P)',
      space: 'O(S)',
      variables: ['S: number of sales transactions', 'P: number of product catalog entries'],
      notes: 'Equi-join on product identifier followed by single-pass hash aggregation runs in linear time.',
      whyNaiveFails: 'Simple where clause filters out rows rather than checking buyer purchase history in aggregate.',
      spaceTimeTradeoff: 'Grouped conditional sum avoids two separate distinct subqueries and anti-joins.',
      interviewerExpectation: 'Use of conditional aggregation in HAVING clause or EXCEPT / NOT IN pattern.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT s.buyer_id
FROM Sales s
JOIN Product p ON s.product_id = p.product_id
GROUP BY s.buyer_id
HAVING SUM(CASE WHEN p.product_name = 'S8' THEN 1 ELSE 0 END) > 0
   AND SUM(CASE WHEN p.product_name = 'iPhone' THEN 1 ELSE 0 END) = 0;`,
        approach: 'Grouped Conditional Aggregation on Product Names',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT s.buyer_id
FROM Sales s
JOIN Product p ON s.product_id = p.product_id
GROUP BY s.buyer_id
HAVING SUM(CASE WHEN p.product_name = 'S8' THEN 1 ELSE 0 END) > 0
   AND SUM(CASE WHEN p.product_name = 'iPhone' THEN 1 ELSE 0 END) = 0;`,
        approach: 'PostgreSQL Conditional Aggregation Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def sales_analysis(product: pd.DataFrame, sales: pd.DataFrame) -> pd.DataFrame:
    df = sales.merge(product, on='product_id')
    grouped = df.groupby('buyer_id')['product_name'].agg(set).reset_index()
    res = grouped[grouped['product_name'].apply(lambda x: 'S8' in x and 'iPhone' not in x)]
    return res[['buyer_id']]`,
        approach: 'Pandas Groupby Set Membership Filtering',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Product (product_id int, product_name varchar(10), unit_price int);
CREATE TABLE Sales (seller_id int, product_id int, buyer_id int, sale_date date, quantity int, price int);`,
    referenceSql: `SELECT s.buyer_id FROM Sales s JOIN Product p ON s.product_id = p.product_id GROUP BY s.buyer_id HAVING SUM(CASE WHEN p.product_name = 'S8' THEN 1 ELSE 0 END) > 0 AND SUM(CASE WHEN p.product_name = 'iPhone' THEN 1 ELSE 0 END) = 0;`,
    generatorPy: `import json
cases = [
    {
        "Product": [
            {"product_id": 1, "product_name": "S8", "unit_price": 1000},
            {"product_id": 2, "product_name": "G4", "unit_price": 800},
            {"product_id": 3, "product_name": "iPhone", "unit_price": 1400}
        ],
        "Sales": [
            {"seller_id": 1, "product_id": 1, "buyer_id": 1, "sale_date": "2019-01-21", "quantity": 2, "price": 2000},
            {"seller_id": 1, "product_id": 2, "buyer_id": 2, "sale_date": "2019-02-17", "quantity": 1, "price": 800},
            {"seller_id": 2, "product_id": 1, "buyer_id": 3, "sale_date": "2019-06-02", "quantity": 1, "price": 800},
            {"seller_id": 3, "product_id": 3, "buyer_id": 3, "sale_date": "2019-05-13", "quantity": 2, "price": 2800}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 6. #1084 sales-analysis-iii
  {
    slug: 'sales-analysis-iii',
    number: 1084,
    category: 'Database',
    patterns: ['group-aggregate'],
    hints: [
      {
        level: 1,
        title: 'Quarter Boundary Interval Confinement',
        text: 'Identify products sold strictly within the first quarter of 2019 without any recorded transactions outside that interval.'
      },
      {
        level: 2,
        title: 'Minimum and Maximum Date Enclosure',
        text: 'Group sales records by product identifier and enforce that both the earliest and latest sales dates fall within the target range.'
      },
      {
        level: 3,
        title: 'Quarter Sales Query Blueprint',
        text: 'select p.product_id, p.product_name from Product p join Sales s on p.product_id = s.product_id group by p.product_id, p.product_name having min(s.sale_date) >= "2019-01-01" and max(s.sale_date) <= "2019-03-31".'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT p.product_id, p.product_name\nFROM Product p\nJOIN Sales s ON p.product_id = s.product_id\nGROUP BY p.product_id, p.product_name\nHAVING MIN(s.sale_date) >= \'2019-01-01\' AND MAX(s.sale_date) <= \'2019-03-31\';\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(S + P)',
      space: 'O(P)',
      variables: ['S: number of sales records', 'P: number of unique products'],
      notes: 'Joining products with sales and computing min and max dates per group runs in linear time.',
      whyNaiveFails: 'Filtering individual transaction rows with a where clause retains products that also had sales outside Q1.',
      spaceTimeTradeoff: 'Grouped min and max date comparison tests the entire transaction boundary in one aggregation.',
      interviewerExpectation: 'Use of HAVING MIN(...) >= date AND MAX(...) <= date to guarantee exclusive interval sales.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT p.product_id, p.product_name
FROM Product p
JOIN Sales s ON p.product_id = s.product_id
GROUP BY p.product_id, p.product_name
HAVING MIN(s.sale_date) >= '2019-01-01' AND MAX(s.sale_date) <= '2019-03-31';`,
        approach: 'Grouped Min and Max Date Enclosure Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT p.product_id, p.product_name
FROM Product p
JOIN Sales s ON p.product_id = s.product_id
GROUP BY p.product_id, p.product_name
HAVING MIN(s.sale_date) >= '2019-01-01' AND MAX(s.sale_date) <= '2019-03-31';`,
        approach: 'PostgreSQL Date Boundary Enclosure Group Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def sales_analysis(product: pd.DataFrame, sales: pd.DataFrame) -> pd.DataFrame:
    grouped = sales.groupby('product_id')['sale_date'].agg(['min', 'max']).reset_index()
    valid = grouped[(grouped['min'] >= '2019-01-01') & (grouped['max'] <= '2019-03-31')]
    return product.merge(valid[['product_id']], on='product_id')[['product_id', 'product_name']]`,
        approach: 'Pandas Min and Max Date Aggregation Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Product (product_id int, product_name varchar(10), unit_price int);
CREATE TABLE Sales (seller_id int, product_id int, buyer_id int, sale_date date, quantity int, price int);`,
    referenceSql: `SELECT p.product_id, p.product_name FROM Product p JOIN Sales s ON p.product_id = s.product_id GROUP BY p.product_id, p.product_name HAVING MIN(s.sale_date) >= '2019-01-01' AND MAX(s.sale_date) <= '2019-03-31';`,
    generatorPy: `import json
cases = [
    {
        "Product": [
            {"product_id": 1, "product_name": "S8", "unit_price": 1000},
            {"product_id": 2, "product_name": "G4", "unit_price": 800},
            {"product_id": 3, "product_name": "iPhone", "unit_price": 1400}
        ],
        "Sales": [
            {"seller_id": 1, "product_id": 1, "buyer_id": 1, "sale_date": "2019-01-21", "quantity": 2, "price": 2000},
            {"seller_id": 1, "product_id": 2, "buyer_id": 2, "sale_date": "2019-02-17", "quantity": 1, "price": 800},
            {"seller_id": 2, "product_id": 2, "buyer_id": 3, "sale_date": "2019-06-02", "quantity": 1, "price": 800},
            {"seller_id": 3, "product_id": 3, "buyer_id": 4, "sale_date": "2019-05-13", "quantity": 2, "price": 2800}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 7. #1141 user-activity-for-the-past-30-days-i
  {
    slug: 'user-activity-for-the-past-30-days-i',
    number: 1141,
    category: 'Database',
    patterns: ['date-time'],
    hints: [
      {
        level: 1,
        title: 'Daily Active User Window Aggregation',
        text: 'Filter events occurring within thirty days ending 2019-07-27, computing distinct active users for each calendar date.'
      },
      {
        level: 2,
        title: 'Between Date Filtering with Distinct Count',
        text: 'Filter records on the activity date between 2019-06-28 and 2019-07-27, then group by date and count distinct user identifiers.'
      },
      {
        level: 3,
        title: 'User Activity Query Blueprint',
        text: 'select activity_date as day, count(distinct user_id) as active_users from Activity where activity_date between "2019-06-28" and "2019-07-27" group by activity_date.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT activity_date AS day, COUNT(DISTINCT user_id) AS active_users\nFROM Activity\nWHERE activity_date BETWEEN \'2019-06-28\' AND \'2019-07-27\'\nGROUP BY activity_date;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(A)',
      space: 'O(D)',
      variables: ['A: number of activity logs', 'D: distinct days within the 30-day window'],
      notes: 'Filtering on date range and aggregating distinct users per day runs in linear time.',
      whyNaiveFails: 'Failing to deduplicate user identifiers overcounts multiple interactions from the same user on one day.',
      spaceTimeTradeoff: 'Grouped count distinct computes exact daily metrics with memory bounded by 30 days.',
      interviewerExpectation: 'Proper date interval inclusive range and COUNT(DISTINCT user_id).'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT activity_date AS day, COUNT(DISTINCT user_id) AS active_users
FROM Activity
WHERE activity_date BETWEEN '2019-06-28' AND '2019-07-27'
GROUP BY activity_date;`,
        approach: 'Date Range Filtering with Distinct User Counting',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT activity_date AS day, COUNT(DISTINCT user_id) AS active_users
FROM Activity
WHERE activity_date BETWEEN '2019-06-28' AND '2019-07-27'
GROUP BY activity_date;`,
        approach: 'PostgreSQL Date Window Distinct User Grouping',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def user_activity(activity: pd.DataFrame) -> pd.DataFrame:
    filtered = activity[(activity['activity_date'] >= '2019-06-28') & (activity['activity_date'] <= '2019-07-27')]
    res = filtered.groupby('activity_date')['user_id'].nunique().reset_index()
    return res.rename(columns={'activity_date': 'day', 'user_id': 'active_users'})`,
        approach: 'Pandas Date Mask and Nunique Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Activity (user_id int, session_id int, activity_date date, activity_type varchar(20));`,
    referenceSql: `SELECT activity_date AS day, COUNT(DISTINCT user_id) AS active_users FROM Activity WHERE activity_date BETWEEN '2019-06-28' AND '2019-07-27' GROUP BY activity_date;`,
    generatorPy: `import json
cases = [
    {
        "Activity": [
            {"user_id": 1, "session_id": 1, "activity_date": "2019-07-20", "activity_type": "open_session"},
            {"user_id": 1, "session_id": 1, "activity_date": "2019-07-20", "activity_type": "scroll_down"},
            {"user_id": 1, "session_id": 1, "activity_date": "2019-07-20", "activity_type": "end_session"},
            {"user_id": 2, "session_id": 4, "activity_date": "2019-07-20", "activity_type": "open_session"},
            {"user_id": 2, "session_id": 4, "activity_date": "2019-07-21", "activity_type": "send_message"},
            {"user_id": 2, "session_id": 4, "activity_date": "2019-07-21", "activity_type": "end_session"},
            {"user_id": 3, "session_id": 2, "activity_date": "2019-07-21", "activity_type": "open_session"},
            {"user_id": 3, "session_id": 2, "activity_date": "2019-07-21", "activity_type": "send_message"},
            {"user_id": 3, "session_id": 2, "activity_date": "2019-07-21", "activity_type": "end_session"},
            {"user_id": 4, "session_id": 3, "activity_date": "2019-06-25", "activity_type": "open_session"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 8. #1142 user-activity-for-the-past-30-days-ii
  {
    slug: 'user-activity-for-the-past-30-days-ii',
    number: 1142,
    category: 'Database',
    patterns: ['date-time'],
    hints: [
      {
        level: 1,
        title: 'Average Sessions Per Active User',
        text: 'Determine the average number of unique sessions per active user over the thirty days ending 2019-07-27, defaulting to zero if empty.'
      },
      {
        level: 2,
        title: 'Distinct Counting with Null-Safe Ratio',
        text: 'Count distinct session identifiers divided by distinct user identifiers within the date window, applying round and coalesce.'
      },
      {
        level: 3,
        title: 'Average Sessions Query Blueprint',
        text: 'select ifnull(round(count(distinct session_id) / count(distinct user_id), 2), 0.00) as average_sessions_per_user from Activity where activity_date between "2019-06-28" and "2019-07-27".'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT IFNULL(ROUND(COUNT(DISTINCT session_id) / COUNT(DISTINCT user_id), 2), 0.00) AS average_sessions_per_user\nFROM Activity\nWHERE activity_date BETWEEN \'2019-06-28\' AND \'2019-07-27\';\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(A)',
      space: 'O(U + S)',
      variables: ['A: number of activity records', 'U: unique users', 'S: unique sessions'],
      notes: 'Single scan with hash sets for distinct users and sessions executes in linear time.',
      whyNaiveFails: 'Failing to handle empty tables causes division-by-zero or unexpected null values.',
      spaceTimeTradeoff: 'Global aggregation performs distinct counting without grouping by individual user.',
      interviewerExpectation: 'Use of IFNULL / COALESCE to handle empty activity sets and division by zero.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT IFNULL(ROUND(COUNT(DISTINCT session_id) / COUNT(DISTINCT user_id), 2), 0.00) AS average_sessions_per_user
FROM Activity
WHERE activity_date BETWEEN '2019-06-28' AND '2019-07-27';`,
        approach: 'Single-Pass Distinct Session and User Ratio',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT COALESCE(ROUND(COUNT(DISTINCT session_id)::numeric / NULLIF(COUNT(DISTINCT user_id), 0), 2), 0.00) AS average_sessions_per_user
FROM Activity
WHERE activity_date BETWEEN '2019-06-28' AND '2019-07-27';`,
        approach: 'PostgreSQL Null-Safe Distinct Ratio with Numeric Round',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def user_activity(activity: pd.DataFrame) -> pd.DataFrame:
    filtered = activity[(activity['activity_date'] >= '2019-06-28') & (activity['activity_date'] <= '2019-07-27')]
    users = filtered['user_id'].nunique()
    sessions = filtered['session_id'].nunique()
    avg = round(sessions / users, 2) if users > 0 else 0.0
    return pd.DataFrame({'average_sessions_per_user': [avg]})`,
        approach: 'Pandas Distinct Ratio with Zero Guard',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Activity (user_id int, session_id int, activity_date date, activity_type varchar(20));`,
    referenceSql: `SELECT IFNULL(ROUND(COUNT(DISTINCT session_id) / COUNT(DISTINCT user_id), 2), 0.00) AS average_sessions_per_user FROM Activity WHERE activity_date BETWEEN '2019-06-28' AND '2019-07-27';`,
    generatorPy: `import json
cases = [
    {
        "Activity": [
            {"user_id": 1, "session_id": 1, "activity_date": "2019-07-20", "activity_type": "open_session"},
            {"user_id": 1, "session_id": 1, "activity_date": "2019-07-20", "activity_type": "scroll_down"},
            {"user_id": 1, "session_id": 1, "activity_date": "2019-07-20", "activity_type": "end_session"},
            {"user_id": 2, "session_id": 4, "activity_date": "2019-07-20", "activity_type": "open_session"},
            {"user_id": 2, "session_id": 4, "activity_date": "2019-07-21", "activity_type": "send_message"},
            {"user_id": 2, "session_id": 4, "activity_date": "2019-07-21", "activity_type": "end_session"},
            {"user_id": 3, "session_id": 2, "activity_date": "2019-07-21", "activity_type": "open_session"},
            {"user_id": 3, "session_id": 2, "activity_date": "2019-07-21", "activity_type": "send_message"},
            {"user_id": 3, "session_id": 2, "activity_date": "2019-07-21", "activity_type": "end_session"},
            {"user_id": 4, "session_id": 3, "activity_date": "2019-06-25", "activity_type": "open_session"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 9. #1148 article-views-i
  {
    slug: 'article-views-i',
    number: 1148,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Author Self-View Identification',
        text: 'Retrieve authors who viewed their own authored articles, returning unique author identifiers sorted ascending.'
      },
      {
        level: 2,
        title: 'Equi-Column Equality Filter',
        text: 'Filter rows where author identifier equals viewer identifier, then deduplicate and order the resulting ids.'
      },
      {
        level: 3,
        title: 'Article Views Query Blueprint',
        text: 'select distinct author_id as id from Views where author_id = viewer_id order by id asc.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT DISTINCT author_id AS id\nFROM Views\nWHERE author_id = viewer_id\nORDER BY id ASC;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(V log V)',
      space: 'O(V)',
      variables: ['V: number of view events'],
      notes: 'Row-level equality filtering followed by distinct sorting executes in linear-logarithmic time.',
      whyNaiveFails: 'Omitting distinct keyword produces duplicate author rows when multiple self-views occur.',
      spaceTimeTradeoff: 'Distinct sort deduplicates keys while satisfying the required sort order.',
      interviewerExpectation: 'Use of WHERE author_id = viewer_id and SELECT DISTINCT sorted by id.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT DISTINCT author_id AS id
FROM Views
WHERE author_id = viewer_id
ORDER BY id ASC;`,
        approach: 'Self View Equality Filter and Distinct Sorting',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT DISTINCT author_id AS id
FROM Views
WHERE author_id = viewer_id
ORDER BY id ASC;`,
        approach: 'PostgreSQL Distinct Self-View Sort',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def article_views(views: pd.DataFrame) -> pd.DataFrame:
    self_views = views[views['author_id'] == views['viewer_id']]
    unique_authors = self_views[['author_id']].drop_duplicates().rename(columns={'author_id': 'id'})
    return unique_authors.sort_values(by='id')`,
        approach: 'Pandas Boolean Filter and Deduplicated Sort',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Views (article_id int, author_id int, viewer_id int, view_date date);`,
    referenceSql: `SELECT DISTINCT author_id AS id FROM Views WHERE author_id = viewer_id ORDER BY id ASC;`,
    generatorPy: `import json
cases = [
    {
        "Views": [
            {"article_id": 1, "author_id": 3, "viewer_id": 5, "view_date": "2019-08-01"},
            {"article_id": 1, "author_id": 3, "viewer_id": 6, "view_date": "2019-08-02"},
            {"article_id": 2, "author_id": 7, "viewer_id": 7, "view_date": "2019-08-01"},
            {"article_id": 2, "author_id": 7, "viewer_id": 6, "view_date": "2019-08-02"},
            {"article_id": 4, "author_id": 7, "viewer_id": 1, "view_date": "2019-07-22"},
            {"article_id": 3, "author_id": 4, "viewer_id": 4, "view_date": "2019-07-21"},
            {"article_id": 3, "author_id": 4, "viewer_id": 4, "view_date": "2019-07-21"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 10. #1149 article-views-ii
  {
    slug: 'article-views-ii',
    number: 1149,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Multi-Article Daily Viewers Identification',
        text: 'Find all people who viewed more than one distinct article on the same calendar date, ordered ascending.'
      },
      {
        level: 2,
        title: 'Composite Grouping and Having Count',
        text: 'Group records by view date and viewer identifier, filtering with a having clause where distinct article count exceeds one.'
      },
      {
        level: 3,
        title: 'Multi-Article Views Query Blueprint',
        text: 'select distinct viewer_id as id from Views group by view_date, viewer_id having count(distinct article_id) > 1 order by id asc.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT DISTINCT viewer_id AS id\nFROM Views\nGROUP BY view_date, viewer_id\nHAVING COUNT(DISTINCT article_id) > 1\nORDER BY id ASC;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(V log V)',
      space: 'O(V)',
      variables: ['V: number of view logs'],
      notes: 'Composite grouping on date and viewer followed by distinct sort runs in linear-logarithmic time.',
      whyNaiveFails: 'Counting raw views instead of distinct article identifiers miscounts repeated views of the exact same article.',
      spaceTimeTradeoff: 'Grouped distinct evaluation avoids self-joins on views table.',
      interviewerExpectation: 'Use of GROUP BY view_date, viewer_id and HAVING COUNT(DISTINCT article_id) > 1.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT DISTINCT viewer_id AS id
FROM Views
GROUP BY view_date, viewer_id
HAVING COUNT(DISTINCT article_id) > 1
ORDER BY id ASC;`,
        approach: 'Composite Grouping with Having Distinct Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT DISTINCT viewer_id AS id
FROM Views
GROUP BY view_date, viewer_id
HAVING COUNT(DISTINCT article_id) > 1
ORDER BY id ASC;`,
        approach: 'PostgreSQL Composite Group Having Distinct Articles',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def article_views(views: pd.DataFrame) -> pd.DataFrame:
    grouped = views.groupby(['view_date', 'viewer_id'])['article_id'].nunique().reset_index()
    multi = grouped[grouped['article_id'] > 1]
    unique_viewers = multi[['viewer_id']].drop_duplicates().rename(columns={'viewer_id': 'id'})
    return unique_viewers.sort_values(by='id')`,
        approach: 'Pandas Multi-Key Groupby Nunique Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Views (article_id int, author_id int, viewer_id int, view_date date);`,
    referenceSql: `SELECT DISTINCT viewer_id AS id FROM Views GROUP BY view_date, viewer_id HAVING COUNT(DISTINCT article_id) > 1 ORDER BY id ASC;`,
    generatorPy: `import json
cases = [
    {
        "Views": [
            {"article_id": 1, "author_id": 3, "viewer_id": 5, "view_date": "2019-08-01"},
            {"article_id": 3, "author_id": 4, "viewer_id": 5, "view_date": "2019-08-01"},
            {"article_id": 1, "author_id": 3, "viewer_id": 6, "view_date": "2019-08-02"},
            {"article_id": 2, "author_id": 7, "viewer_id": 7, "view_date": "2019-08-01"},
            {"article_id": 2, "author_id": 7, "viewer_id": 6, "view_date": "2019-08-02"},
            {"article_id": 4, "author_id": 7, "viewer_id": 1, "view_date": "2019-07-22"},
            {"article_id": 3, "author_id": 4, "viewer_id": 4, "view_date": "2019-07-21"},
            {"article_id": 3, "author_id": 4, "viewer_id": 4, "view_date": "2019-07-21"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 11. #1158 market-analysis-i
  {
    slug: 'market-analysis-i',
    number: 1158,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'User Annual Purchase Volume Aggregation',
        text: 'Report each user join date and total orders placed as a buyer throughout calendar year 2019, including zero counts.'
      },
      {
        level: 2,
        title: 'Left Join with Filter Predicate in Join Condition',
        text: 'Left join users to orders matching buyer identifier and 2019 order dates, grouping by user identifier to count orders.'
      },
      {
        level: 3,
        title: 'Market Analysis Query Blueprint',
        text: 'select u.user_id as buyer_id, u.join_date, count(o.order_id) as orders_in_2019 from Users u left join Orders o on u.user_id = o.buyer_id and o.order_date between "2019-01-01" and "2019-12-31" group by u.user_id, u.join_date.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT u.user_id AS buyer_id, u.join_date,\n       COUNT(o.order_id) AS orders_in_2019\nFROM Users u\nLEFT JOIN Orders o ON u.user_id = o.buyer_id AND o.order_date BETWEEN \'2019-01-01\' AND \'2019-12-31\'\nGROUP BY u.user_id, u.join_date;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(U + O)',
      space: 'O(U)',
      variables: ['U: number of registered users', 'O: number of orders placed'],
      notes: 'Left join followed by grouping on user identifier runs in linear time relative to table sizes.',
      whyNaiveFails: 'Filtering orders in a where clause turns the left join into an inner join, discarding users with zero purchases.',
      spaceTimeTradeoff: 'Condition placed inside ON clause preserves all users while filtering order rows.',
      interviewerExpectation: 'Placing the date condition in the ON clause of the LEFT JOIN to retain users with 0 orders.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT u.user_id AS buyer_id, u.join_date,
       COUNT(o.order_id) AS orders_in_2019
FROM Users u
LEFT JOIN Orders o ON u.user_id = o.buyer_id AND o.order_date BETWEEN '2019-01-01' AND '2019-12-31'
GROUP BY u.user_id, u.join_date;`,
        approach: 'Left Join with Date Filter in Join Condition',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT u.user_id AS buyer_id, u.join_date,
       COUNT(o.order_id) AS orders_in_2019
FROM Users u
LEFT JOIN Orders o ON u.user_id = o.buyer_id AND o.order_date BETWEEN '2019-01-01' AND '2019-12-31'
GROUP BY u.user_id, u.join_date;`,
        approach: 'PostgreSQL Left Join Date Predicate Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def market_analysis(users: pd.DataFrame, orders: pd.DataFrame, items: pd.DataFrame) -> pd.DataFrame:
    orders_2019 = orders[(orders['order_date'] >= '2019-01-01') & (orders['order_date'] <= '2019-12-31')]
    counts = orders_2019.groupby('buyer_id')['order_id'].count().reset_index()
    counts = counts.rename(columns={'order_id': 'orders_in_2019'})
    merged = users.merge(counts, left_on='user_id', right_on='buyer_id', how='left')
    merged['orders_in_2019'] = merged['orders_in_2019'].fillna(0).astype(int)
    merged = merged.rename(columns={'user_id': 'buyer_id'})
    return merged[['buyer_id', 'join_date', 'orders_in_2019']]`,
        approach: 'Pandas Left Merge with Zero Fill',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Users (user_id int, join_date date, favorite_brand varchar(10));
CREATE TABLE Orders (order_id int, order_date date, item_id int, buyer_id int, seller_id int);
CREATE TABLE Items (item_id int, item_brand varchar(10));`,
    referenceSql: `SELECT u.user_id AS buyer_id, u.join_date, COUNT(o.order_id) AS orders_in_2019 FROM Users u LEFT JOIN Orders o ON u.user_id = o.buyer_id AND o.order_date BETWEEN '2019-01-01' AND '2019-12-31' GROUP BY u.user_id, u.join_date;`,
    generatorPy: `import json
cases = [
    {
        "Users": [
            {"user_id": 1, "join_date": "2018-01-01", "favorite_brand": "Lenovo"},
            {"user_id": 2, "join_date": "2018-02-09", "favorite_brand": "Samsung"},
            {"user_id": 3, "join_date": "2018-01-19", "favorite_brand": "LG"},
            {"user_id": 4, "join_date": "2018-05-21", "favorite_brand": "HP"}
        ],
        "Orders": [
            {"order_id": 1, "order_date": "2019-08-01", "item_id": 4, "buyer_id": 1, "seller_id": 2},
            {"order_id": 2, "order_date": "2018-08-02", "item_id": 2, "buyer_id": 1, "seller_id": 3},
            {"order_id": 3, "order_date": "2019-08-03", "item_id": 3, "buyer_id": 2, "seller_id": 3},
            {"order_id": 4, "order_date": "2018-08-04", "item_id": 1, "buyer_id": 4, "seller_id": 2},
            {"order_id": 5, "order_date": "2018-08-04", "item_id": 1, "buyer_id": 3, "seller_id": 4},
            {"order_id": 6, "order_date": "2019-08-05", "item_id": 2, "buyer_id": 2, "seller_id": 4}
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

  // 12. #1164 product-price-at-a-given-date
  {
    slug: 'product-price-at-a-given-date',
    number: 1164,
    category: 'Database',
    patterns: ['date-time'],
    hints: [
      {
        level: 1,
        title: 'As-Of Date Pricing Resolution',
        text: 'Determine the price of each product as of 2019-08-16, falling back to a default baseline price of ten if no price update preceded that date.'
      },
      {
        level: 2,
        title: 'Distinct Product Union with Latest Subquery',
        text: 'Left join all distinct products against the most recent price record on or before the target date, replacing nulls with ten.'
      },
      {
        level: 3,
        title: 'Price As-Of Query Blueprint',
        text: 'select p.product_id, coalesce(t.new_price, 10) as price from (select distinct product_id from Products) p left join (select product_id, new_price from Products where (product_id, change_date) in (select product_id, max(change_date) from Products where change_date <= "2019-08-16" group by product_id)) t on p.product_id = t.product_id.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT p.product_id, COALESCE(t.new_price, 10) AS price\nFROM (\n    SELECT DISTINCT product_id\n    FROM Products\n) p\nLEFT JOIN (\n    SELECT product_id, new_price\n    FROM Products\n    WHERE (product_id, change_date) IN (\n        SELECT product_id, MAX(change_date)\n        FROM Products\n        WHERE change_date <= \'2019-08-16\'\n        GROUP BY product_id\n    )\n) t ON p.product_id = t.product_id;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(P log P)',
      space: 'O(P)',
      variables: ['P: number of price modification records'],
      notes: 'Finding max change dates per product followed by left join executes in linear-logarithmic time.',
      whyNaiveFails: 'Simple inner join drops products whose initial price changes took place after the cutoff date.',
      spaceTimeTradeoff: 'Distinct product universe left joined against latest price subquery cleanly establishes baseline fallback.',
      interviewerExpectation: 'Preserving all distinct products with default price 10 using LEFT JOIN and COALESCE.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT p.product_id, COALESCE(t.new_price, 10) AS price
FROM (
    SELECT DISTINCT product_id
    FROM Products
) p
LEFT JOIN (
    SELECT product_id, new_price
    FROM Products
    WHERE (product_id, change_date) IN (
        SELECT product_id, MAX(change_date)
        FROM Products
        WHERE change_date <= '2019-08-16'
        GROUP BY product_id
    )
) t ON p.product_id = t.product_id;`,
        approach: 'Distinct Product Left Join with Latest Price Subquery',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT p.product_id, COALESCE(t.new_price, 10) AS price
FROM (
    SELECT DISTINCT product_id
    FROM Products
) p
LEFT JOIN (
    SELECT product_id, new_price
    FROM Products
    WHERE (product_id, change_date) IN (
        SELECT product_id, MAX(change_date)
        FROM Products
        WHERE change_date <= '2019-08-16'
        GROUP BY product_id
    )
) t ON p.product_id = t.product_id;`,
        approach: 'PostgreSQL Coalesce Latest Price Tuple Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def price_at_given_date(products: pd.DataFrame) -> pd.DataFrame:
    all_prods = pd.DataFrame({'product_id': products['product_id'].unique()})
    valid = products[products['change_date'] <= '2019-08-16']
    idx = valid.groupby('product_id')['change_date'].idxmax()
    latest = valid.loc[idx, ['product_id', 'new_price']].rename(columns={'new_price': 'price'})
    res = all_prods.merge(latest, on='product_id', how='left')
    res['price'] = res['price'].fillna(10).astype(int)
    return res`,
        approach: 'Pandas Sub-Date Idxmax and Outer Merge with Default Fill',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Products (product_id int, new_price int, change_date date);`,
    referenceSql: `SELECT p.product_id, COALESCE(t.new_price, 10) AS price FROM (SELECT DISTINCT product_id FROM Products) p LEFT JOIN (SELECT product_id, new_price FROM Products WHERE (product_id, change_date) IN (SELECT product_id, MAX(change_date) FROM Products WHERE change_date <= '2019-08-16' GROUP BY product_id)) t ON p.product_id = t.product_id;`,
    generatorPy: `import json
cases = [
    {
        "Products": [
            {"product_id": 1, "new_price": 20, "change_date": "2019-08-14"},
            {"product_id": 2, "new_price": 50, "change_date": "2019-08-14"},
            {"product_id": 1, "new_price": 30, "change_date": "2019-08-15"},
            {"product_id": 1, "new_price": 35, "change_date": "2019-08-16"},
            {"product_id": 2, "new_price": 65, "change_date": "2019-08-17"},
            {"product_id": 3, "new_price": 20, "change_date": "2019-08-18"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 13. #1173 immediate-food-delivery-i
  {
    slug: 'immediate-food-delivery-i',
    number: 1173,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Immediate Delivery Rate Computation',
        text: 'Compute the percentage of orders where customer preferred date matches the initial order date, rounded to two decimals.'
      },
      {
        level: 2,
        title: 'Conditional Sum over Total Count',
        text: 'Sum the matching date equality condition multiplied by 100 divided by total orders, formatted using round.'
      },
      {
        level: 3,
        title: 'Immediate Percentage Query Blueprint',
        text: 'select round(100.0 * sum(case when order_date = customer_pref_delivery_date then 1 else 0 end) / count(*), 2) as immediate_percentage from Delivery.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT ROUND(100.0 * SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END) / COUNT(*), 2) AS immediate_percentage\nFROM Delivery;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(D)',
      space: 'O(1)',
      variables: ['D: number of delivery orders'],
      notes: 'Single table scan evaluating conditional equality and aggregate counts executes in linear time with constant auxiliary space.',
      whyNaiveFails: 'Separate queries for immediate and total orders double table traversal overhead.',
      spaceTimeTradeoff: 'In-line conditional expression tallies matches without intermediate table buffering.',
      interviewerExpectation: 'Use of SUM(CASE WHEN ... THEN 1 ELSE 0 END) / COUNT(*) scaled by 100.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT ROUND(100.0 * SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END) / COUNT(*), 2) AS immediate_percentage
FROM Delivery;`,
        approach: 'Single-Pass Conditional Sum and Percentage Rounding',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT ROUND(100.0 * SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END)::numeric / COUNT(*), 2) AS immediate_percentage
FROM Delivery;`,
        approach: 'PostgreSQL Numeric Percentage Rounding',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def food_delivery(delivery: pd.DataFrame) -> pd.DataFrame:
    immediate = (delivery['order_date'] == delivery['customer_pref_delivery_date']).sum()
    total = len(delivery)
    pct = round(100.0 * immediate / total, 2) if total > 0 else 0.0
    return pd.DataFrame({'immediate_percentage': [pct]})`,
        approach: 'Pandas Vectorized Boolean Sum and Percentage Calculation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Delivery (delivery_id int, customer_id int, order_date date, customer_pref_delivery_date date);`,
    referenceSql: `SELECT ROUND(100.0 * SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END) / COUNT(*), 2) AS immediate_percentage FROM Delivery;`,
    generatorPy: `import json
cases = [
    {
        "Delivery": [
            {"delivery_id": 1, "customer_id": 1, "order_date": "2019-08-01", "customer_pref_delivery_date": "2019-08-02"},
            {"delivery_id": 2, "customer_id": 5, "order_date": "2019-08-02", "customer_pref_delivery_date": "2019-08-02"},
            {"delivery_id": 3, "customer_id": 1, "order_date": "2019-08-11", "customer_pref_delivery_date": "2019-08-11"},
            {"delivery_id": 4, "customer_id": 3, "order_date": "2019-08-24", "customer_pref_delivery_date": "2019-08-26"},
            {"delivery_id": 5, "customer_id": 4, "order_date": "2019-08-21", "customer_pref_delivery_date": "2019-08-22"},
            {"delivery_id": 6, "customer_id": 2, "order_date": "2019-08-11", "customer_pref_delivery_date": "2019-08-13"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 14. #1174 immediate-food-delivery-ii
  {
    slug: 'immediate-food-delivery-ii',
    number: 1174,
    category: 'Database',
    patterns: ['join-filter'],
    hints: [
      {
        level: 1,
        title: 'Customer First Order Immediate Percentage',
        text: 'Identify each customer first chronological order and calculate the percentage of those first orders that were immediate.'
      },
      {
        level: 2,
        title: 'Earliest Order Subquery Tuple Membership',
        text: 'Filter delivery records matching customer minimum order dates, then compute the immediate delivery ratio.'
      },
      {
        level: 3,
        title: 'First Order Immediate Query Blueprint',
        text: 'select round(100.0 * sum(case when order_date = customer_pref_delivery_date then 1 else 0 end) / count(*), 2) as immediate_percentage from Delivery where (customer_id, order_date) in (select customer_id, min(order_date) from Delivery group by customer_id).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT ROUND(100.0 * SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END) / COUNT(*), 2) AS immediate_percentage\nFROM Delivery\nWHERE (customer_id, order_date) IN (\n    SELECT customer_id, MIN(order_date)\n    FROM Delivery\n    GROUP BY customer_id\n);\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(D log D)',
      space: 'O(D)',
      variables: ['D: number of delivery orders'],
      notes: 'Finding customer first order dates followed by tuple filtering and conditional sum executes in linear-logarithmic time.',
      whyNaiveFails: 'Evaluating across all orders rather than exclusively customer initial transactions produces invalid cohorts.',
      spaceTimeTradeoff: 'Composite tuple IN subquery isolates earliest orders in a clean, indexable manner.',
      interviewerExpectation: 'Isolating first order per customer using MIN(order_date) subquery or ROW_NUMBER().'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT ROUND(100.0 * SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END) / COUNT(*), 2) AS immediate_percentage
FROM Delivery
WHERE (customer_id, order_date) IN (
    SELECT customer_id, MIN(order_date)
    FROM Delivery
    GROUP BY customer_id
);`,
        approach: 'Earliest Order Tuple Subquery Filtering',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT ROUND(100.0 * SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END)::numeric / COUNT(*), 2) AS immediate_percentage
FROM Delivery
WHERE (customer_id, order_date) IN (
    SELECT customer_id, MIN(order_date)
    FROM Delivery
    GROUP BY customer_id
);`,
        approach: 'PostgreSQL Earliest Order Subquery with Numeric Percentage',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def immediate_food_delivery(delivery: pd.DataFrame) -> pd.DataFrame:
    idx = delivery.groupby('customer_id')['order_date'].idxmin()
    first_orders = delivery.loc[idx]
    immediate = (first_orders['order_date'] == first_orders['customer_pref_delivery_date']).sum()
    pct = round(100.0 * immediate / len(first_orders), 2)
    return pd.DataFrame({'immediate_percentage': [pct]})`,
        approach: 'Pandas Groupby Idxmin for First Orders and Mean Ratio',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Delivery (delivery_id int, customer_id int, order_date date, customer_pref_delivery_date date);`,
    referenceSql: `SELECT ROUND(100.0 * SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END) / COUNT(*), 2) AS immediate_percentage FROM Delivery WHERE (customer_id, order_date) IN (SELECT customer_id, MIN(order_date) FROM Delivery GROUP BY customer_id);`,
    generatorPy: `import json
cases = [
    {
        "Delivery": [
            {"delivery_id": 1, "customer_id": 1, "order_date": "2019-08-01", "customer_pref_delivery_date": "2019-08-02"},
            {"delivery_id": 2, "customer_id": 2, "order_date": "2019-08-02", "customer_pref_delivery_date": "2019-08-02"},
            {"delivery_id": 3, "customer_id": 1, "order_date": "2019-08-11", "customer_pref_delivery_date": "2019-08-12"},
            {"delivery_id": 4, "customer_id": 3, "order_date": "2019-08-24", "customer_pref_delivery_date": "2019-08-24"},
            {"delivery_id": 5, "customer_id": 3, "order_date": "2019-08-21", "customer_pref_delivery_date": "2019-08-22"},
            {"delivery_id": 6, "customer_id": 2, "order_date": "2019-08-11", "customer_pref_delivery_date": "2019-08-13"},
            {"delivery_id": 7, "customer_id": 4, "order_date": "2019-08-09", "customer_pref_delivery_date": "2019-08-09"}
        ]
    }
]
print(json.dumps(cases))
`
  },

  // 15. #1179 reformat-department-table
  {
    slug: 'reformat-department-table',
    number: 1179,
    category: 'Database',
    patterns: ['string-handling'],
    hints: [
      {
        level: 1,
        title: 'Monthly Revenue Pivot Formulation',
        text: 'Pivot department records so each department identifier occupies one row with dedicated revenue columns for all twelve months.'
      },
      {
        level: 2,
        title: 'Conditional Sum Grouped by Identifier',
        text: 'Group rows by department identifier and compute conditional sums checking the month column string for each month from January to December.'
      },
      {
        level: 3,
        title: 'Pivot Query Blueprint',
        text: 'select id, sum(case when month = "Jan" then revenue else null end) as Jan_Revenue, sum(case when month = "Feb" then revenue else null end) as Feb_Revenue, sum(case when month = "Mar" then revenue else null end) as Mar_Revenue, sum(case when month = "Apr" then revenue else null end) as Apr_Revenue, sum(case when month = "May" then revenue else null end) as May_Revenue, sum(case when month = "Jun" then revenue else null end) as Jun_Revenue, sum(case when month = "Jul" then revenue else null end) as Jul_Revenue, sum(case when month = "Aug" then revenue else null end) as Aug_Revenue, sum(case when month = "Sep" then revenue else null end) as Sep_Revenue, sum(case when month = "Oct" then revenue else null end) as Oct_Revenue, sum(case when month = "Nov" then revenue else null end) as Nov_Revenue, sum(case when month = "Dec" then revenue else null end) as Dec_Revenue from Department group by id.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```mysql\nSELECT id,\n    SUM(CASE WHEN month = \'Jan\' THEN revenue ELSE NULL END) AS Jan_Revenue,\n    SUM(CASE WHEN month = \'Feb\' THEN revenue ELSE NULL END) AS Feb_Revenue,\n    SUM(CASE WHEN month = \'Mar\' THEN revenue ELSE NULL END) AS Mar_Revenue,\n    SUM(CASE WHEN month = \'Apr\' THEN revenue ELSE NULL END) AS Apr_Revenue,\n    SUM(CASE WHEN month = \'May\' THEN revenue ELSE NULL END) AS May_Revenue,\n    SUM(CASE WHEN month = \'Jun\' THEN revenue ELSE NULL END) AS Jun_Revenue,\n    SUM(CASE WHEN month = \'Jul\' THEN revenue ELSE NULL END) AS Jul_Revenue,\n    SUM(CASE WHEN month = \'Aug\' THEN revenue ELSE NULL END) AS Aug_Revenue,\n    SUM(CASE WHEN month = \'Sep\' THEN revenue ELSE NULL END) AS Sep_Revenue,\n    SUM(CASE WHEN month = \'Oct\' THEN revenue ELSE NULL END) AS Oct_Revenue,\n    SUM(CASE WHEN month = \'Nov\' THEN revenue ELSE NULL END) AS Nov_Revenue,\n    SUM(CASE WHEN month = \'Dec\' THEN revenue ELSE NULL END) AS Dec_Revenue\nFROM Department\nGROUP BY id;\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(D)',
      variables: ['N: number of department monthly entries', 'D: number of distinct department ids'],
      notes: 'Single group-by pass evaluating twelve conditional expressions runs in linear time.',
      whyNaiveFails: 'Dynamic pivots are not natively supported in standard ANSI SQL without conditional aggregation or crosstab.',
      spaceTimeTradeoff: 'Explicit conditional sum expressions avoid multi-table joins per month.',
      interviewerExpectation: 'Use of SUM(CASE WHEN month = ... THEN revenue ELSE NULL END) for each month.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT id,
    SUM(CASE WHEN month = 'Jan' THEN revenue ELSE NULL END) AS Jan_Revenue,
    SUM(CASE WHEN month = 'Feb' THEN revenue ELSE NULL END) AS Feb_Revenue,
    SUM(CASE WHEN month = 'Mar' THEN revenue ELSE NULL END) AS Mar_Revenue,
    SUM(CASE WHEN month = 'Apr' THEN revenue ELSE NULL END) AS Apr_Revenue,
    SUM(CASE WHEN month = 'May' THEN revenue ELSE NULL END) AS May_Revenue,
    SUM(CASE WHEN month = 'Jun' THEN revenue ELSE NULL END) AS Jun_Revenue,
    SUM(CASE WHEN month = 'Jul' THEN revenue ELSE NULL END) AS Jul_Revenue,
    SUM(CASE WHEN month = 'Aug' THEN revenue ELSE NULL END) AS Aug_Revenue,
    SUM(CASE WHEN month = 'Sep' THEN revenue ELSE NULL END) AS Sep_Revenue,
    SUM(CASE WHEN month = 'Oct' THEN revenue ELSE NULL END) AS Oct_Revenue,
    SUM(CASE WHEN month = 'Nov' THEN revenue ELSE NULL END) AS Nov_Revenue,
    SUM(CASE WHEN month = 'Dec' THEN revenue ELSE NULL END) AS Dec_Revenue
FROM Department
GROUP BY id;`,
        approach: 'Conditional Sum Pivot for Twelve Calendar Months',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'postgresql',
        code: `SELECT id,
    SUM(CASE WHEN month = 'Jan' THEN revenue ELSE NULL END) AS Jan_Revenue,
    SUM(CASE WHEN month = 'Feb' THEN revenue ELSE NULL END) AS Feb_Revenue,
    SUM(CASE WHEN month = 'Mar' THEN revenue ELSE NULL END) AS Mar_Revenue,
    SUM(CASE WHEN month = 'Apr' THEN revenue ELSE NULL END) AS Apr_Revenue,
    SUM(CASE WHEN month = 'May' THEN revenue ELSE NULL END) AS May_Revenue,
    SUM(CASE WHEN month = 'Jun' THEN revenue ELSE NULL END) AS Jun_Revenue,
    SUM(CASE WHEN month = 'Jul' THEN revenue ELSE NULL END) AS Jul_Revenue,
    SUM(CASE WHEN month = 'Aug' THEN revenue ELSE NULL END) AS Aug_Revenue,
    SUM(CASE WHEN month = 'Sep' THEN revenue ELSE NULL END) AS Sep_Revenue,
    SUM(CASE WHEN month = 'Oct' THEN revenue ELSE NULL END) AS Oct_Revenue,
    SUM(CASE WHEN month = 'Nov' THEN revenue ELSE NULL END) AS Nov_Revenue,
    SUM(CASE WHEN month = 'Dec' THEN revenue ELSE NULL END) AS Dec_Revenue
FROM Department
GROUP BY id;`,
        approach: 'PostgreSQL Conditional Aggregation Pivot Matrix',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def reformat_table(department: pd.DataFrame) -> pd.DataFrame:
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    pivot = department.pivot_table(index='id', columns='month', values='revenue', aggfunc='first').reset_index()
    for m in months:
        if m not in pivot.columns:
            pivot[m] = None
    cols = ['id'] + [f'{m}_Revenue' for m in months]
    pivot = pivot.rename(columns={m: f'{m}_Revenue' for m in months})
    return pivot[cols]`,
        approach: 'Pandas Pivot Table with Missing Month Column Handling',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    schemaSql: `CREATE TABLE Department (id int, revenue int, month varchar(5));`,
    referenceSql: `SELECT id, SUM(CASE WHEN month = 'Jan' THEN revenue ELSE NULL END) AS Jan_Revenue, SUM(CASE WHEN month = 'Feb' THEN revenue ELSE NULL END) AS Feb_Revenue, SUM(CASE WHEN month = 'Mar' THEN revenue ELSE NULL END) AS Mar_Revenue, SUM(CASE WHEN month = 'Apr' THEN revenue ELSE NULL END) AS Apr_Revenue, SUM(CASE WHEN month = 'May' THEN revenue ELSE NULL END) AS May_Revenue, SUM(CASE WHEN month = 'Jun' THEN revenue ELSE NULL END) AS Jun_Revenue, SUM(CASE WHEN month = 'Jul' THEN revenue ELSE NULL END) AS Jul_Revenue, SUM(CASE WHEN month = 'Aug' THEN revenue ELSE NULL END) AS Aug_Revenue, SUM(CASE WHEN month = 'Sep' THEN revenue ELSE NULL END) AS Sep_Revenue, SUM(CASE WHEN month = 'Oct' THEN revenue ELSE NULL END) AS Oct_Revenue, SUM(CASE WHEN month = 'Nov' THEN revenue ELSE NULL END) AS Nov_Revenue, SUM(CASE WHEN month = 'Dec' THEN revenue ELSE NULL END) AS Dec_Revenue FROM Department GROUP BY id;`,
    generatorPy: `import json
cases = [
    {
        "Department": [
            {"id": 1, "revenue": 8000, "month": "Jan"},
            {"id": 2, "revenue": 9000, "month": "Jan"},
            {"id": 3, "revenue": 10000, "month": "Feb"},
            {"id": 1, "revenue": 7000, "month": "Feb"},
            {"id": 1, "revenue": 6000, "month": "Mar"}
        ]
    }
]
print(json.dumps(cases))
`
  }
];
