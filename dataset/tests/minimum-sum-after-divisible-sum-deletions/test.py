from typing import List

class Solution:
    def minSum(self, nums: List[int], k: int) -> int:
        prefix = 0
        dp = 0
        best = {0: 0}
        for x in nums:
            prefix += x
            rem = prefix % k
            dp += x
            if rem in best:
                dp = min(dp, best[rem])
            best[rem] = min(best.get(rem, float('inf')), dp)
        return dp

def run_tests():
    sol = Solution()
    assert sol.minSum([3, 1, 4, 2], 3) == 1
    assert sol.minSum([2, 2, 2], 3) == 0
    assert sol.minSum([1, 2, 3], 7) == 6
    print("All tests passed for 3654.")

if __name__ == "__main__":
    run_tests()
