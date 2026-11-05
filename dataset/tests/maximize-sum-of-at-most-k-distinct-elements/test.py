from typing import List

class Solution:
    def maxDistinctSum(self, nums: List[int], k: int) -> int:
        positives = sorted([x for x in set(nums) if x > 0], reverse=True)
        return sum(positives[:k])

def run_tests():
    sol = Solution()
    assert sol.maxDistinctSum([3, 1, 3, 2, 5], 2) == 8 # 5 + 3 = 8
    assert sol.maxDistinctSum([-1, -2, -3], 2) == 0 # no positive numbers
    assert sol.maxDistinctSum([10, 20], 5) == 30
    print("All tests passed for 3684.")

if __name__ == "__main__":
    run_tests()
