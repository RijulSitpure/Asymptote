import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'number-of-recent-calls.json')

import collections

class RecentCounter:
    def __init__(self):
        self.q = collections.deque()

    def ping(self, t: int) -> int:
        self.q.append(t)
        while self.q[0] < t - 3000:
            self.q.popleft()
        return len(self.q)

rc = RecentCounter()
assert rc.ping(1) == 1
assert rc.ping(100) == 2
assert rc.ping(3001) == 3
assert rc.ping(3002) == 3
print("✓ number-of-recent-calls passed")
