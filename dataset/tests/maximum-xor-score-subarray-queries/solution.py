class Solution:
    def maximumSubarrayXor(self, nums: list[int], queries: list[list[int]]) -> list[int]:
        n = len(nums)
        # f[i][j] = xor score of nums[i..j]
        f = [[0] * n for _ in range(n)]
        for i in range(n):
            f[i][i] = nums[i]
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                f[i][j] = f[i][j - 1] ^ f[i + 1][j]
                
        # mx[i][j] = max xor score of any subsegment in [i..j]
        mx = [[0] * n for _ in range(n)]
        for i in range(n):
            mx[i][i] = nums[i]
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                mx[i][j] = max(f[i][j], mx[i + 1][j], mx[i][j - 1])
                
        return [mx[l][r] for l, r in queries]
