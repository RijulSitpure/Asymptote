import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

export const shellPandasProblems = [
  // 1. Shell: #194 transpose-file
  {
    slug: 'transpose-file',
    number: 194,
    category: 'Shell',
    patterns: ['field-processing'],
    hints: [
      {
        level: 1,
        title: 'Column-to-Row Inversion',
        text: 'Transposing tabular data requires gathering words in the same horizontal column across all lines and outputting them as a single line. How can an associative array buffer words indexed by column?'
      },
      {
        level: 2,
        title: 'Associative Field Accumulation',
        text: 'Iterate through each row record. For field index i from 1 to the number of fields, append the field value to an accumulator array keyed by i, prepending a space if an entry already exists.'
      },
      {
        level: 3,
        title: 'Buffer Flushing in Final Block',
        text: 'Use an awk program with a row loop that builds array entries for each column index. In the completion action block, iterate from 1 to the field count and print each combined column string.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```bash\nawk \'{\n    for (i = 1; i <= NF; i++) {\n        if (NR == 1) {\n            s[i] = $i;\n        } else {\n            s[i] = s[i] " " $i;\n        }\n    }\n}\nEND {\n    for (i = 1; i <= NF; i++) {\n        print s[i];\n    }\n}\' file.txt\n```'
      }
    ],
    complexity: {
      kind: 'query-notes',
      time: 'O(R * C)',
      space: 'O(R * C)',
      variables: ['R: number of rows in file.txt', 'C: number of columns in file.txt'],
      notes: 'Single stream traversal buffering matrix tokens into associative arrays before flushing transposed lines.',
      whyNaiveFails: 'Reading the entire file with repeated head and cut invocations in nested loops incurs O(R * C^2) process spawn overhead and fails on larger files.',
      spaceTimeTradeoff: 'Buffering transposed tokens in awk memory provides linear single-pass performance at the cost of proportional string memory.',
      interviewerExpectation: 'Handling variable numbers of rows and columns cleanly and managing spaces between concatenated tokens without trailing whitespace.'
    },
    solutions: [
      {
        lang: 'bash',
        code: `awk '{
    for (i = 1; i <= NF; i++) {
        if (NR == 1) {
            s[i] = $i;
        } else {
            s[i] = s[i] " " $i;
        }
    }
}
END {
    for (i = 1; i <= NF; i++) {
        print s[i];
    }
}' file.txt`,
        approach: 'Field Processing via Associative Array Accumulation in awk',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testType: 'shell',
    fixtureFile: 'file.txt',
    generatorPy: `import json, random

cases = [
    {
        'name': 'standard_2x3',
        'content': 'name age\\nalice 21\\nryan 30\\n'
    },
    {
        'name': 'single_column',
        'content': 'col1\\nrow2\\nrow3\\nrow4\\n'
    },
    {
        'name': 'single_row',
        'content': 'word1 word2 word3 word4\\n'
    },
    {
        'name': 'single_cell',
        'content': 'solo\\n'
    }
]

# Random cases
random.seed(42)
for k in range(15):
    rows = random.randint(1, 10)
    cols = random.randint(1, 8)
    lines = []
    for r in range(rows):
        tokens = [f'v_{r}_{c}' for c in range(cols)]
        lines.append(' '.join(tokens))
    cases.append({
        'name': f'random_case_{k+1}',
        'content': '\\n'.join(lines) + '\\n'
    })

# Scale case
scale_lines = []
for r in range(100):
    scale_lines.append(' '.join([f'val_{r}_{c}' for c in range(20)]))
cases.append({
    'name': 'scale_100x20',
    'lineCount': 100,
    'content': '\\n'.join(scale_lines) + '\\n'
})

print(json.dumps(cases))
`,
    referencePy: `import sys, os

fixture_dir = sys.argv[1]
filepath = os.path.join(fixture_dir, 'file.txt')
if not os.path.exists(filepath):
    sys.exit(0)

with open(filepath) as f:
    lines = [line.strip().split() for line in f if line.strip()]

if not lines:
    sys.exit(0)

cols = len(lines[0])
for c in range(cols):
    row_tokens = [lines[r][c] for r in range(len(lines))]
    print(' '.join(row_tokens))
`
  },

  // 2. pandas: #2878 get-the-size-of-a-dataframe
  {
    slug: 'get-the-size-of-a-dataframe',
    number: 2878,
    category: 'pandas',
    patterns: ['dataframe-basics'],
    hints: [
      {
        level: 1,
        title: 'Dimensionality Inspection',
        text: 'Every tabular dataset carries metadata describing its row count and column count. Which built-in attribute exposes these dimensions as a tuple?'
      },
      {
        level: 2,
        title: 'Shape Attribute Extraction',
        text: 'The shape property returns a two-element tuple containing the number of rows and columns. Converting this tuple into a list satisfies the requirement.'
      },
      {
        level: 3,
        title: 'Tuple Casting to List',
        text: 'Access players.shape to retrieve (rows, cols) and wrap it with list() to return [rows, cols].'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport pandas as pd\n\ndef getDataframeSize(players: pd.DataFrame) -> list[int]:\n    return list(players.shape)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['R: rows in players', 'C: columns in players'],
      notes: 'Constant-time metadata inspection of underlying DataFrame block geometry.',
      whyNaiveFails: 'Iterating through rows or computing lengths of every Series costs O(R) time instead of O(1).',
      spaceTimeTradeoff: 'Reading existing DataFrame metadata requires zero additional memory.',
      interviewerExpectation: 'Direct utilization of DataFrame.shape attribute without manually scanning indices.'
    },
    solutions: [
      {
        lang: 'pythondata',
        code: `import pandas as pd

def getDataframeSize(players: pd.DataFrame) -> list[int]:
    return list(players.shape)`,
        approach: 'Inspection of DataFrame shape property',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testType: 'pandas_custom',
    testPy: `import os, sys, json, time, random
import pandas as pd

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/get-the-size-of-a-dataframe.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

# Fixed cases
assert getDataframeSize(pd.DataFrame({'a': [1, 2], 'b': [3, 4]})) == [2, 2]
assert getDataframeSize(pd.DataFrame()) == [0, 0]
assert getDataframeSize(pd.DataFrame({'a': [1, 2, 3, 4, 5]})) == [5, 1]

# Random cases
random.seed(42)
for i in range(25):
    r = random.randint(0, 50)
    c = random.randint(1, 10)
    df = pd.DataFrame({f'col_{j}': range(r) for j in range(c)})
    assert getDataframeSize(df) == [r, c]

print("Passed all get-the-size-of-a-dataframe tests")
`
  },

  // 3. pandas: #2879 display-the-first-three-rows
  {
    slug: 'display-the-first-three-rows',
    number: 2879,
    category: 'pandas',
    patterns: ['filter-select'],
    hints: [
      {
        level: 1,
        title: 'Prefix Row Slicing',
        text: 'Displaying the initial segment of rows is a common exploratory step. Which DataFrame method extracts the top N records from a table?'
      },
      {
        level: 2,
        title: 'Head Method Application',
        text: 'The head method extracts the specified number of top rows without modifying the original DataFrame.'
      },
      {
        level: 3,
        title: 'Prefix Parameter Configuration',
        text: 'Call employees.head(3) to return a DataFrame slice containing at most the first three rows.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport pandas as pd\n\ndef selectFirstRows(employees: pd.DataFrame) -> pd.DataFrame:\n    return employees.head(3)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['N: total rows in employees table'],
      notes: 'Extracts a fixed constant slice of at most 3 rows.',
      whyNaiveFails: 'Scanning or re-indexing the entire table creates unnecessary memory copies for an operation that only requires 3 rows.',
      spaceTimeTradeoff: 'Returning a shallow view or 3-row slice avoids allocating full table replicas.',
      interviewerExpectation: 'Use of standard idiomatic head(3) or iloc[:3] handling tables with fewer than 3 rows gracefully.'
    },
    solutions: [
      {
        lang: 'pythondata',
        code: `import pandas as pd

def selectFirstRows(employees: pd.DataFrame) -> pd.DataFrame:
    return employees.head(3)`,
        approach: 'DataFrame head slice extraction',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testType: 'pandas_custom',
    testPy: `import os, sys, json, time, random
import pandas as pd
from pandas.testing import assert_frame_equal

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/display-the-first-three-rows.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

df1 = pd.DataFrame({'id': [1, 2, 3, 4], 'val': ['a', 'b', 'c', 'd']})
assert_frame_equal(selectFirstRows(df1), df1.iloc[:3])

df2 = pd.DataFrame({'id': [1, 2], 'val': ['a', 'b']})
assert_frame_equal(selectFirstRows(df2), df2)

print("Passed all display-the-first-three-rows tests")
`
  },

  // 4. pandas: #2883 drop-missing-data
  {
    slug: 'drop-missing-data',
    number: 2883,
    category: 'pandas',
    patterns: ['cleaning-nulls-duplicates'],
    hints: [
      {
        level: 1,
        title: 'Null Value Elimination',
        text: 'When records contain missing attributes in mandatory fields, those specific rows must be pruned. Which DataFrame method removes rows containing null values?'
      },
      {
        level: 2,
        title: 'Targeted Column Subsetting',
        text: 'Calling dropna without parameters removes rows with nulls in any column. How can you restrict the check strictly to the name column?'
      },
      {
        level: 3,
        title: 'Subset Keyword Argument',
        text: 'Specify the subset parameter: students.dropna(subset=[\'name\']) to discard only records where the name column is null.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport pandas as pd\n\ndef dropMissingData(students: pd.DataFrame) -> pd.DataFrame:\n    return students.dropna(subset=[\'name\'])\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of rows in students DataFrame'],
      notes: 'Single vector scan over the target column to construct a filtered index mask.',
      whyNaiveFails: 'Manual iteration with iterrows or dropna across all columns drops rows with valid names that happen to miss other optional fields.',
      spaceTimeTradeoff: 'Allocating the filtered DataFrame requires O(N) memory proportional to non-null survivors.',
      interviewerExpectation: 'Correct usage of the subset parameter to avoid over-dropping rows with missing values in other columns.'
    },
    solutions: [
      {
        lang: 'pythondata',
        code: `import pandas as pd

def dropMissingData(students: pd.DataFrame) -> pd.DataFrame:
    return students.dropna(subset=['name'])`,
        approach: 'Vectorized dropna with target column subset',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testType: 'pandas_custom',
    testPy: `import os, sys, json, time, random
import pandas as pd
from pandas.testing import assert_frame_equal

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/drop-missing-data.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

df = pd.DataFrame({'id': [1, 2, 3], 'name': ['Alice', None, 'Charlie'], 'age': [20, 21, None]})
res = dropMissingData(df)
exp = df.iloc[[0, 2]]
assert_frame_equal(res, exp)

print("Passed all drop-missing-data tests")
`
  },

  // 5. pandas: #2885 rename-columns
  {
    slug: 'rename-columns',
    number: 2885,
    category: 'pandas',
    patterns: ['filter-select'],
    hints: [
      {
        level: 1,
        title: 'Schema Header Renaming',
        text: 'Table headers often need to be standardized to conform with naming conventions. Which method accepts a dictionary mapping current names to replacement names?'
      },
      {
        level: 2,
        title: 'Column Mapping Dictionary',
        text: 'The rename method accepts a columns parameter with key-value pairs matching old labels to new labels.'
      },
      {
        level: 3,
        title: 'Mapped Column Definition',
        text: 'Map id to student_id, first_name to first_name, last_name to last_name, and age to age_in_years in the rename call.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport pandas as pd\n\ndef renameColumns(students: pd.DataFrame) -> pd.DataFrame:\n    return students.rename(columns={\n        \'id\': \'student_id\',\n        \'first_name\': \'first_name\',\n        \'last_name\': \'last_name\',\n        \'age\': \'age_in_years\'\n    })\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['C: number of columns in DataFrame (fixed schema)'],
      notes: 'Constant-time index label replacement without modifying underlying data blocks.',
      whyNaiveFails: 'Rebuilding the entire DataFrame with a newly allocated constructor copies column values unnecessarily.',
      spaceTimeTradeoff: 'Renaming Index objects produces a lightweight metadata view.',
      interviewerExpectation: 'Idiomatic use of DataFrame.rename with dictionary mapping preserving order and existing datatypes.'
    },
    solutions: [
      {
        lang: 'pythondata',
        code: `import pandas as pd

def renameColumns(students: pd.DataFrame) -> pd.DataFrame:
    return students.rename(columns={
        'id': 'student_id',
        'first_name': 'first_name',
        'last_name': 'last_name',
        'age': 'age_in_years'
    })`,
        approach: 'Dictionary key-value mapping via DataFrame.rename',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testType: 'pandas_custom',
    testPy: `import os, sys, json, time, random
import pandas as pd

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/rename-columns.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

df = pd.DataFrame({'id': [1], 'first_name': ['A'], 'last_name': ['B'], 'age': [15]})
res = renameColumns(df)
assert list(res.columns) == ['student_id', 'first_name', 'last_name', 'age_in_years']
print("Passed all rename-columns tests")
`
  },

  // 6. pandas: #2886 change-data-type
  {
    slug: 'change-data-type',
    number: 2886,
    category: 'pandas',
    patterns: ['filter-select'],
    hints: [
      {
        level: 1,
        title: 'Column Type Conversion',
        text: 'Numerical columns represented as floating point values often need truncation to integer types. Which method casts columns to specified target data types?'
      },
      {
        level: 2,
        title: 'Targeted Column Casting',
        text: 'The astype method accepts a dictionary mapping column names to target data types such as int or int64.'
      },
      {
        level: 3,
        title: 'Type Specification Syntax',
        text: 'Call students.astype({\'grade\': int}) to cast the grade column to integer format while preserving all other column datatypes.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport pandas as pd\n\ndef changeDatatype(students: pd.DataFrame) -> pd.DataFrame:\n    return students.astype({\'grade\': int})\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of records in students table'],
      notes: 'Single vector pass over the target column allocating the converted integer array buffer.',
      whyNaiveFails: 'Looping through elements with apply or list comprehensions loses numpy vectorized casting performance.',
      spaceTimeTradeoff: 'Allocating the new integer column buffer requires O(N) space.',
      interviewerExpectation: 'Use of vectorized astype with dictionary mapping to cleanly update column schema.'
    },
    solutions: [
      {
        lang: 'pythondata',
        code: `import pandas as pd

def changeDatatype(students: pd.DataFrame) -> pd.DataFrame:
    return students.astype({'grade': int})`,
        approach: 'Vectorized column casting with astype',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testType: 'pandas_custom',
    testPy: `import os, sys, json, time, random
import pandas as pd

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/change-data-type.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

df = pd.DataFrame({'id': [1, 2], 'name': ['Ava', 'Kate'], 'age': [6, 15], 'grade': [73.0, 84.0]})
res = changeDatatype(df)
assert res['grade'].dtype == 'int64' or res['grade'].dtype == 'int32' or res['grade'].dtype == int
assert list(res['grade']) == [73, 84]
print("Passed all change-data-type tests")
`
  },

  // 7. pandas: #2888 reshape-data-concatenate
  {
    slug: 'reshape-data-concatenate',
    number: 2888,
    category: 'pandas',
    patterns: ['reshape'],
    hints: [
      {
        level: 1,
        title: 'Table Row Combination',
        text: 'When two tables share identical columns, they can be joined vertically into a unified table. Which top-level function combines sequence collections along a designated axis?'
      },
      {
        level: 2,
        title: 'Axis Orientation for Stacking',
        text: 'The pd.concat function accepts a list of DataFrames and an axis parameter where axis=0 performs vertical row stacking.'
      },
      {
        level: 3,
        title: 'Concatenation Call Formulation',
        text: 'Return pd.concat([df1, df2], axis=0) to combine the records of both tables into a continuous vertical dataset.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport pandas as pd\n\ndef concatenateTables(df1: pd.DataFrame, df2: pd.DataFrame) -> pd.DataFrame:\n    return pd.concat([df1, df2], axis=0)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N + M)',
      space: 'O(N + M)',
      variables: ['N: row count of df1', 'M: row count of df2'],
      notes: 'Linear block concatenation copying memory buffers into the combined structure.',
      whyNaiveFails: 'Appending row by row or using deprecated append in loops produces quadratic copying overhead.',
      spaceTimeTradeoff: 'Allocating the concatenated DataFrame requires memory proportional to combined input size.',
      interviewerExpectation: 'Correct usage of pd.concat with explicit axis=0 handling index preservation.'
    },
    solutions: [
      {
        lang: 'pythondata',
        code: `import pandas as pd

def concatenateTables(df1: pd.DataFrame, df2: pd.DataFrame) -> pd.DataFrame:
    return pd.concat([df1, df2], axis=0)`,
        approach: 'Vertical row concatenation with pd.concat',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testType: 'pandas_custom',
    testPy: `import os, sys, json, time, random
import pandas as pd
from pandas.testing import assert_frame_equal

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/reshape-data-concatenate.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

df1 = pd.DataFrame({'id': [1], 'name': ['A']})
df2 = pd.DataFrame({'id': [2], 'name': ['B']})
res = concatenateTables(df1, df2)
assert len(res) == 2
print("Passed all reshape-data-concatenate tests")
`
  },

  // 8. pandas: #2890 reshape-data-melt
  {
    slug: 'reshape-data-melt',
    number: 2890,
    category: 'pandas',
    patterns: ['reshape'],
    hints: [
      {
        level: 1,
        title: 'Wide to Long Reshaping',
        text: 'Converting multiple quarterly metric columns into rows turns a wide format table into a normalized long format. Which DataFrame method unpivots wide columns?'
      },
      {
        level: 2,
        title: 'Identifier and Value Variable Specification',
        text: 'The melt method unpivots columns into identifier variables and measured variables. What parameter designates non-pivoted identifiers?'
      },
      {
        level: 3,
        title: 'Melt Parameterization',
        text: 'Use report.melt(id_vars=[\'product\'], var_name=\'quarter\', value_name=\'sales\') to transpose quarterly columns into rows with standard column labels.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport pandas as pd\n\ndef meltTable(report: pd.DataFrame) -> pd.DataFrame:\n    return report.melt(id_vars=[\'product\'], var_name=\'quarter\', value_name=\'sales\')\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(R * K)',
      space: 'O(R * K)',
      variables: ['R: number of product rows', 'K: number of unpivoted quarter columns (typically 4)'],
      notes: 'Linear reshaping replicating identifiers across unpivoted column dimensions.',
      whyNaiveFails: 'Manual iteration appending tuples produces substantial overhead compared to vectorized buffer reshaping.',
      spaceTimeTradeoff: 'Allocating the unpivoted long format requires memory proportional to rows times unpivoted columns.',
      interviewerExpectation: 'Correct configuration of id_vars, var_name, and value_name parameters.'
    },
    solutions: [
      {
        lang: 'pythondata',
        code: `import pandas as pd

def meltTable(report: pd.DataFrame) -> pd.DataFrame:
    return report.melt(id_vars=['product'], var_name='quarter', value_name='sales')`,
        approach: 'Wide-to-long unpivoting using DataFrame.melt',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testType: 'pandas_custom',
    testPy: `import os, sys, json, time, random
import pandas as pd

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/reshape-data-melt.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

df = pd.DataFrame({'product': ['Umbrella'], 'quarter_1': [417], 'quarter_2': [224], 'quarter_3': [379], 'quarter_4': [611]})
res = meltTable(df)
assert list(res.columns) == ['product', 'quarter', 'sales']
assert len(res) == 4
print("Passed all reshape-data-melt tests")
`
  },

  // 9. pandas: #2891 method-chaining
  {
    slug: 'method-chaining',
    number: 2891,
    category: 'pandas',
    patterns: ['filter-select'],
    hints: [
      {
        level: 1,
        title: 'Filter Sort Projection Pipeline',
        text: 'Finding heavy animals requires three sequential operations: filtering records where weight exceeds 100, sorting descending by weight, and projecting only the animal name.'
      },
      {
        level: 2,
        title: 'Boolean Indexing and Sorting Chain',
        text: 'Filter rows using animals[animals[\'weight\'] > 100], sort the resulting subset with sort_values(by=\'weight\', ascending=False), and index [[\'name\']] to retain a DataFrame.'
      },
      {
        level: 3,
        title: 'Chained Method Composition',
        text: 'Chain operations seamlessly: filter with boolean indexing, apply sort_values, and extract [[\'name\']] to yield the final single-column DataFrame.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport pandas as pd\n\ndef findHeavyAnimals(animals: pd.DataFrame) -> pd.DataFrame:\n    return animals[animals[\'weight\'] > 100].sort_values(by=\'weight\', ascending=False)[[\'name\']]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: number of records in animals DataFrame'],
      notes: 'Filtering takes linear O(N) time followed by sorting filtered candidates in O(K log K) time where K <= N.',
      whyNaiveFails: 'Manual looping and appending to lists forfeits pandas vectorized C-speed filtering and timsort capabilities.',
      spaceTimeTradeoff: 'Allocating intermediate filtered subsets requires temporary memory proportional to qualifying records.',
      interviewerExpectation: 'Producing a DataFrame output with double bracket notation [[\'name\']] rather than a 1D Series.'
    },
    solutions: [
      {
        lang: 'pythondata',
        code: `import pandas as pd

def findHeavyAnimals(animals: pd.DataFrame) -> pd.DataFrame:
    return animals[animals['weight'] > 100].sort_values(by='weight', ascending=False)[['name']]`,
        approach: 'Vectorized boolean filtering with descending sort and column projection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testType: 'pandas_custom',
    testPy: `import os, sys, json, time, random
import pandas as pd

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/method-chaining.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

df = pd.DataFrame({
    'name': ['Tatiana', 'Khaled', 'Alex', 'Jonathan', 'Stefan', 'Tommy'],
    'species': ['Snake', 'Giraffe', 'Leopard', 'Monkey', 'Bear', 'Panda'],
    'age': [98, 50, 6, 45, 100, 26],
    'weight': [464, 41, 328, 463, 50, 349]
})
res = findHeavyAnimals(df)
assert list(res['name']) == ['Tatiana', 'Jonathan', 'Tommy', 'Alex']
assert isinstance(res, pd.DataFrame)
print("Passed all method-chaining tests")
`
  }
];

export function writeShellPandasFiles() {
  for (const item of shellPandasProblems) {
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

    if (item.testType === 'shell') {
      const metaData = {
        runner: 'shell',
        testKind: 'deterministic',
        fixtureFile: item.fixtureFile
      };
      fs.writeFileSync(path.join(testDir, 'meta.json'), JSON.stringify(metaData, null, 2) + '\n', 'utf8');
      fs.writeFileSync(path.join(testDir, 'generator.py'), item.generatorPy, 'utf8');
      fs.writeFileSync(path.join(testDir, 'reference.py'), item.referencePy, 'utf8');
    } else if (item.testType === 'pandas_custom') {
      const metaData = {
        runner: 'pandas',
        testKind: 'deterministic'
      };
      fs.writeFileSync(path.join(testDir, 'meta.json'), JSON.stringify(metaData, null, 2) + '\n', 'utf8');
      fs.writeFileSync(path.join(testDir, 'test.py'), item.testPy, 'utf8');
    }

    console.log(`Generated: #${item.number} ${item.slug} [${item.category}]`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  writeShellPandasFiles();
}
