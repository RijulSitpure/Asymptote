from typing import List

class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:
        left = float(min(nums))
        right = float(max(nums))

        def check(mid: float) -> bool:
            curr_sum = sum(nums[i] - mid for i in range(k))
            if curr_sum >= 0:
                return True
            prev_sum = 0.0
            min_prev = 0.0
            for i in range(k, len(nums)):
                curr_sum += nums[i] - mid
                prev_sum += nums[i - k] - mid
                min_prev = min(min_prev, prev_sum)
                if curr_sum - min_prev >= 0:
                    return True
            return False

        while right - left > 1e-5:
            mid = (left + right) / 2
            if check(mid):
                left = mid
            else:
                right = mid
        return left

def test():
    sol = Solution()
    res1 = sol.findMaxAverage([1, 12, -5, -6, 50, 3], 4)
    assert abs(res1 - 12.75) < 1e-4, "test 1 failed"
    res2 = sol.findMaxAverage([5], 1)
    assert abs(res2 - 5.0) < 1e-4, "test 2 failed"
    print("✓ maximum-average-subarray-ii passed")

if __name__ == "__main__":
    test()
