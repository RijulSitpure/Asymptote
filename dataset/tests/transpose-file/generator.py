import json, random

cases = [
    {
        'name': 'standard_2x3',
        'content': 'name age\nalice 21\nryan 30\n'
    },
    {
        'name': 'single_column',
        'content': 'col1\nrow2\nrow3\nrow4\n'
    },
    {
        'name': 'single_row',
        'content': 'word1 word2 word3 word4\n'
    },
    {
        'name': 'single_cell',
        'content': 'solo\n'
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
        'content': '\n'.join(lines) + '\n'
    })

# Scale case
scale_lines = []
for r in range(100):
    scale_lines.append(' '.join([f'val_{r}_{c}' for c in range(20)]))
cases.append({
    'name': 'scale_100x20',
    'lineCount': 100,
    'content': '\n'.join(scale_lines) + '\n'
})

print(json.dumps(cases))
