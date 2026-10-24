import sys
from typing import List

class Solution:
    def isPossible(self, nums: List[int]) -> bool:
        from collections import Counter, defaultdict
        count = Counter(nums)
        end_count = defaultdict(int)
        for x in nums:
            if count[x] == 0:
                continue
            if end_count[x - 1] > 0:
                end_count[x - 1] -= 1
                end_count[x] += 1
                count[x] -= 1
            elif count[x + 1] > 0 and count[x + 2] > 0:
                count[x] -= 1
                count[x + 1] -= 1
                count[x + 2] -= 1
                end_count[x + 2] += 1
            else:
                return False
        return True

def test():
    sol = Solution()
    assert sol.isPossible([1, 2, 3, 3, 4, 5]) is True, "test 1 failed"
    assert sol.isPossible([1, 2, 3, 3, 4, 4, 5, 5]) is True, "test 2 failed"
    assert sol.isPossible([1, 2, 3, 4, 4, 5]) is False, "test 3 failed"
    print("✓ split-array-into-consecutive-subsequences passed")

if __name__ == "__main__":
    test()
