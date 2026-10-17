import sys, os, collections

fixture_dir = sys.argv[1]
filepath = os.path.join(fixture_dir, 'words.txt')
if not os.path.exists(filepath):
    sys.exit(0)

with open(filepath) as f:
    text = f.read()

words = text.split()
counts = collections.Counter(words)

# Group by count descending, then sort words for deterministic comparison
freq_map = collections.defaultdict(list)
for w, c in counts.items():
    freq_map[c].append(w)

for count in sorted(freq_map.keys(), reverse=True):
    for w in sorted(freq_map[count]):
        print(f'{w} {count}')
