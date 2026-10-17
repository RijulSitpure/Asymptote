import json, random

cases = [
    {
        'name': 'exactly_10_lines',
        'content': '\n'.join([f'Line {i}' for i in range(1, 11)]) + '\n'
    },
    {
        'name': '20_lines',
        'content': '\n'.join([f'Line {i}' for i in range(1, 21)]) + '\n'
    },
    {
        'name': 'empty_file',
        'content': ''
    },
    {
        'name': '1_line_only',
        'content': 'Just one line\n'
    },
    {
        'name': '9_lines_boundary',
        'content': '\n'.join([f'Line {i}' for i in range(1, 10)]) + '\n'
    }
]

# 20 random cases
random.seed(42)
for i in range(20):
    n = random.randint(0, 30)
    lines = [f'Random line {k} [hash={random.randint(100, 999)}]' for k in range(1, n + 1)]
    cases.append({
        'name': f'random_case_{i+1}',
        'content': ('\n'.join(lines) + '\n') if lines else ''
    })

print(json.dumps(cases))
