import sys
from typing import List

class Solution:
    def splitArray(self, nums: List[int]) -> bool:
        n = len(nums)
        if n < 7:
            return False

        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + nums[i]

        def get_sum(l: int, r: int) -> int:
            return prefix[r + 1] - prefix[l]

        for j in range(3, n - 3):
            seen = set()
            for i in range(1, j - 1):
                if get_sum(0, i - 1) == get_sum(i + 1, j - 1):
                    seen.add(get_sum(0, i - 1))
            for k in range(j + 2, n - 1):
                if get_sum(j + 1, k - 1) == get_sum(k + 1, n - 1):
                    if get_sum(j + 1, k - 1) in seen:
                        return True

        return False

def test():
    sol = Solution()
    assert sol.splitArray([1,2,1,2,1,2,1]) is True, "test 1 failed"
    assert sol.splitArray([1,2,1,2,1,2,1,2]) is False, "test 2 failed"
    print("✓ split-array-with-equal-sum passed")

if __name__ == "__main__":
    test()
