class Solution:
    def maximumSum(self, nums: list[int]) -> int:
        best = {}
        ans = -1
        for x in nums:
            d_sum = sum(int(ch) for ch in str(x))
            if d_sum in best:
                ans = max(ans, best[d_sum] + x)
                best[d_sum] = max(best[d_sum], x)
            else:
                best[d_sum] = x
        return ans
