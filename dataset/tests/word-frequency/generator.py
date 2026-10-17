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

# Scale fixture: 5,000 words
scale_vocab = ['algorithmic', 'asymptote', 'invariant', 'graph', 'frontier', 'traversal', 'matrix', 'interval', 'bitwise', 'monotonic']
scale_words = []
for i in range(5000):
    scale_words.append(scale_vocab[i % len(scale_vocab)])
    if (i + 1) % 10 == 0:
        scale_words.append('\n')

cases.append({
    'name': 'scale_5000_words',
    'wordCount': 5000,
    'content': ' '.join(scale_words) + '\n'
})

print(json.dumps(cases))
