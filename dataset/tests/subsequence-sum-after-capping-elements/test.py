from typing import List

class Solution:
    def maxCappedSum(self, nums: List[int], k: int, cap: int) -> int:
        capped = [min(x, cap) for x in nums]
        capped.sort(reverse=True)
        return sum(capped[:k])

def run_tests():
    sol = Solution()
    assert sol.maxCappedSum([10, 20, 30, 40], 2, 25) == 50 # 25 + 25 = 50
    assert sol.maxCappedSum([5, 1, 3], 2, 10) == 8 # 5 + 3 = 8
    print("All tests passed for 3685.")

if __name__ == "__main__":
    run_tests()
