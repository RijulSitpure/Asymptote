import sys, os

fixture_dir = sys.argv[1]
filepath = os.path.join(fixture_dir, 'file.txt')
if not os.path.exists(filepath):
    sys.exit(0)

with open(filepath) as f:
    lines = f.readlines()

if len(lines) >= 10:
    target = lines[9]
    sys.stdout.write(target)
    if not target.endswith('\n'):
        sys.stdout.write('\n')
