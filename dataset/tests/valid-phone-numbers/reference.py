import sys, os, re

fixture_dir = sys.argv[1]
filepath = os.path.join(fixture_dir, 'file.txt')
if not os.path.exists(filepath):
    sys.exit(0)

pat = re.compile(r'^(\d{3}-|\(\d{3}\) )\d{3}-\d{4}$')

with open(filepath) as f:
    for line in f:
        line_clean = line.rstrip('\r\n')
        if pat.match(line_clean):
            print(line_clean)
