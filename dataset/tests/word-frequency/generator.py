import json, random

cases = [
    {
        'name': 'standard_sample',
        'content': """the day is sunny the the
the sunny is is
"""
    },
    {
        'name': 'empty_file',
        'content': ''
    },
    {
        'name': 'single_word',
        'content': 'solitary\n'
    },
    {
        'name': 'spaces_tabs_newlines',
        'content': """   apple   banana  

  apple \t banana  cherry 
"""
    },
    {
        'name': 'ties_equal_counts',
        'content': 'alpha beta gamma delta epsilon\n'
    }
]

# 20 random cases
random.seed(42)
vocab = ['cat', 'dog', 'bird', 'fish', 'lion', 'tiger', 'bear', 'wolf', 'fox', 'deer']
for i in range(20):
    k = random.randint(1, 40)
    words = [random.choice(vocab) for _ in range(k)]
    cases.append({
        'name': f'random_case_{i+1}',
        'content': ' '.join(words) + '\n'
    })

print(json.dumps(cases))
