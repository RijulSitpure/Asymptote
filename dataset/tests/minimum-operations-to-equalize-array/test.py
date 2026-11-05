from collections import Counter
from typing import List

class Solution:
    def minOperations(self, nums: List[int]) -> int:
        if not nums:
            return 0
        freq = Counter(nums)
        max_f = max(freq.values())
        return len(nums) - max_f

def run_tests():
    sol = Solution()
    assert sol.minOperations([1, 2, 3, 2]) == 2
    assert sol.minOperations([4, 4, 4]) == 0
    assert sol.minOperations([1]) == 0
    print("All tests passed for 3674.")

if __name__ == "__main__":
    run_tests()
