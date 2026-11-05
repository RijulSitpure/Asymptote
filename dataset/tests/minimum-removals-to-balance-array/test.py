import bisect
from typing import List

class Solution:
    def minRemovals(self, nums: List[int], k: int) -> int:
        nums.sort()
        n = len(nums)
        max_kept = 0
        for i in range(n):
            target = nums[i] * k
            idx = bisect.bisect_right(nums, target)
            max_kept = max(max_kept, idx - i)
        return n - max_kept

def run_tests():
    sol = Solution()
    assert sol.minRemovals([2, 1, 5, 8], 2) == 2
    assert sol.minRemovals([1, 10, 100], 1) == 2
    assert sol.minRemovals([4, 6, 8, 10], 2) == 1
    print("All tests passed for 3634.")

if __name__ == "__main__":
    run_tests()
