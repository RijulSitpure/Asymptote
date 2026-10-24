import sys
from typing import List

class Solution:
    def maxSubArrayLen(self, nums: List[int], k: int) -> int:
        prefix_map = {0: -1}
        curr_sum = 0
        max_len = 0
        for i, num in enumerate(nums):
            curr_sum += num
            if curr_sum - k in prefix_map:
                max_len = max(max_len, i - prefix_map[curr_sum - k])
            if curr_sum not in prefix_map:
                prefix_map[curr_sum] = i
        return max_len

def test():
    sol = Solution()
    assert sol.maxSubArrayLen([1, -1, 5, -2, 3], 3) == 4, "test 1 failed"
    assert sol.maxSubArrayLen([-2, -1, 2, 1], 1) == 2, "test 2 failed"
    print("✓ maximum-size-subarray-sum-equals-k passed")

if __name__ == "__main__":
    test()
