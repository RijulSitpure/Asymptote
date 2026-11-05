from typing import List

class Solution:
    def maxTrionicSubarraySum(self, nums: List[int]) -> int:
        n = len(nums)
        if n < 4:
            return -1
        INF = float('inf')
        inc1 = nums[:]
        peak = [-INF] * n
        dec = [-INF] * n
        inc2 = [-INF] * n
        best = -INF
        for i in range(1, n):
            if nums[i] > nums[i - 1]:
                inc1[i] = max(nums[i], inc1[i - 1] + nums[i])
                peak[i] = inc1[i - 1] + nums[i]
                if inc2[i - 1] != -INF:
                    inc2[i] = max(inc2[i], inc2[i - 1] + nums[i])
                if dec[i - 1] != -INF:
                    inc2[i] = max(inc2[i], dec[i - 1] + nums[i])
            elif nums[i] < nums[i - 1]:
                if peak[i - 1] != -INF:
                    dec[i] = max(dec[i], peak[i - 1] + nums[i])
                if dec[i - 1] != -INF:
                    dec[i] = max(dec[i], dec[i - 1] + nums[i])
            if inc2[i] != -INF:
                best = max(best, inc2[i])
        return best if best != -INF else -1

def run_tests():
    sol = Solution()
    assert sol.maxTrionicSubarraySum([1, 3, 5, 4, 2, 6, 8]) == 29
    assert sol.maxTrionicSubarraySum([1, 2, 3, 4]) == -1
    print("All tests passed for 3640.")

if __name__ == "__main__":
    run_tests()
