import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'maximum-frequency-stack.json')

import collections

class FreqStack:
    def __init__(self):
        self.freq = collections.defaultdict(int)
        self.group = collections.defaultdict(list)
        self.max_freq = 0

    def push(self, val: int) -> None:
        f = self.freq[val] + 1
        self.freq[val] = f
        if f > self.max_freq:
            self.max_freq = f
        self.group[f].append(val)

    def pop(self) -> int:
        val = self.group[self.max_freq].pop()
        self.freq[val] -= 1
        if not self.group[self.max_freq]:
            self.max_freq -= 1
        return val

fs = FreqStack()
for v in [5, 7, 5, 7, 4, 5]:
    fs.push(v)
assert fs.pop() == 5
assert fs.pop() == 7
assert fs.pop() == 5
assert fs.pop() == 4
print("✓ maximum-frequency-stack passed")
