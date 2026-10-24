import itertools
from typing import List

class Solution:
    def largestTimeFromDigits(self, arr: List[int]) -> str:
        max_time = -1
        res = ""
        for p in itertools.permutations(arr):
            h = p[0] * 10 + p[1]
            m = p[2] * 10 + p[3]
            if h < 24 and m < 60:
                total = h * 60 + m
                if total > max_time:
                    max_time = total
                    res = f"{p[0]}{p[1]}:{p[2]}{p[3]}"
        return res

def test():
    sol = Solution()
    assert sol.largestTimeFromDigits([1, 2, 3, 4]) == "23:41", "test 1 failed"
    assert sol.largestTimeFromDigits([5, 5, 5, 5]) == "", "test 2 failed"
    assert sol.largestTimeFromDigits([0, 0, 0, 0]) == "00:00", "test 3 failed"
    print("✓ largest-time-for-given-digits passed")

if __name__ == "__main__":
    test()
