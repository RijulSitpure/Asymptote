from typing import List
import bisect

class Solution:
    def numberOfPairs(self, nums: List[int]) -> int:
        vals = sorted(abs(x) for x in nums)
        n = len(vals)
        ans = 0
        for i in range(n):
            target = 2 * vals[i]
            idx = bisect.bisect_right(vals, target)
            ans += (idx - 1 - i)
        return ans

def run_tests():
    sol = Solution()
    assert sol.numberOfPairs([1, 2, 4, 8]) == 3
    assert sol.numberOfPairs([5, 5, 5]) == 3
    assert sol.numberOfPairs([1, 10, 100]) == 0
    print("All tests passed for 3649.")

if __name__ == "__main__":
    run_tests()
