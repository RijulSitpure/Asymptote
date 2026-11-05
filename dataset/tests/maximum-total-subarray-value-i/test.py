from typing import List

class Solution:
    def maxSubarrayValue(self, nums: List[int], k: int) -> int:
        n = len(nums)
        ans = 0
        for l in range(n):
            cur_max = nums[l]
            cur_min = nums[l]
            for r in range(l, n):
                cur_max = max(cur_max, nums[r])
                cur_min = min(cur_min, nums[r])
                if r - l + 1 >= k:
                    ans = max(ans, cur_max - cur_min)
        return ans

def run_tests():
    sol = Solution()
    assert sol.maxSubarrayValue([1, 4, 2, 5], 2) == 4 # [1, 4, 2, 5]: max 5, min 1 -> 4
    assert sol.maxSubarrayValue([3, 3, 3], 1) == 0
    print("All tests passed for 3689.")

if __name__ == "__main__":
    run_tests()
