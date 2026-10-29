import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'online-election.json')

import bisect

class TopVotedCandidate:
    def __init__(self, persons: list[int], times: list[int]):
        self.times = times
        self.leaders = []
        count = {}
        leader = -1
        max_votes = 0
        for p in persons:
            count[p] = count.get(p, 0) + 1
            if count[p] >= max_votes:
                max_votes = count[p]
                leader = p
            self.leaders.append(leader)

    def q(self, t: int) -> int:
        idx = bisect.bisect_right(self.times, t) - 1
        return self.leaders[idx]

tvc = TopVotedCandidate([0, 1, 1, 0, 0, 1, 0], [0, 5, 10, 15, 20, 25, 30])
assert tvc.q(3) == 0
assert tvc.q(12) == 1
assert tvc.q(25) == 1
assert tvc.q(15) == 0
assert tvc.q(24) == 0
assert tvc.q(8) == 1
print("✓ online-election passed")
