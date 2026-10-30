from collections import defaultdict

class Solution:
    def brightestPosition(self, lights: list[list[int]]) -> int:
        diff = defaultdict(int)
        for p, r in lights:
            diff[p - r] += 1
            diff[p + r + 1] -= 1
        best_pos = None
        max_bright = -1
        curr = 0
        for pos in sorted(diff.keys()):
            curr += diff[pos]
            if curr > max_bright:
                max_bright = curr
                best_pos = pos
        return best_pos
