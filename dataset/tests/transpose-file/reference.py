import sys, os

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
