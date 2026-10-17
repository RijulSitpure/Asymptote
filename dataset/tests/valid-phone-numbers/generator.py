import json, random

cases = [
    {
        'name': 'standard_sample',
        'content': """987-123-4567
123 456 7890
(123) 456-7890
"""
    },
    {
        'name': 'empty_file',
        'content': ''
    },
    {
        'name': 'malformed_variants',
        'content': """(123)456-7890
123-45-67890
123-456-789
123-456-78901
abc-def-ghij
(123) 456-7890 extra
prefix 987-123-4567
(123 456-7890
123) 456-7890
"""
    },
    {
        'name': 'all_valid',
        'content': """000-000-0000
(999) 999-9999
555-123-4567
(800) 555-0199
"""
    }
]

# 20 random cases
random.seed(42)
for i in range(20):
    lines = []
    for _ in range(random.randint(5, 20)):
        kind = random.randint(1, 4)
        a, b, c = random.randint(100, 999), random.randint(100, 999), random.randint(1000, 9999)
        if kind == 1:
            lines.append(f'{a}-{b}-{c}')
        elif kind == 2:
            lines.append(f'({a}) {b}-{c}')
        elif kind == 3:
            lines.append(f'({a}){b}-{c}') # invalid: no space
        else:
            lines.append(f'{a} {b} {c}') # invalid: spaces only
    cases.append({
        'name': f'random_case_{i+1}',
        'content': '\n'.join(lines) + '\n'
    })

# Scale fixture: 5,000 lines
scale_lines = []
for i in range(1, 5001):
    kind = i % 4
    a, b, c = 100 + (i % 900), 200 + (i % 800), 1000 + (i % 9000)
    if kind == 0:
        scale_lines.append(f'{a:03d}-{b:03d}-{c:04d}')
    elif kind == 1:
        scale_lines.append(f'({a:03d}) {b:03d}-{c:04d}')
    elif kind == 2:
        scale_lines.append(f'({a:03d}){b:03d}-{c:04d}') # invalid
    else:
        scale_lines.append(f'{a:03d} {b:03d} {c:04d}') # invalid

cases.append({
    'name': 'scale_5000_lines',
    'lineCount': 5000,
    'content': '\n'.join(scale_lines) + '\n'
})

print(json.dumps(cases))
