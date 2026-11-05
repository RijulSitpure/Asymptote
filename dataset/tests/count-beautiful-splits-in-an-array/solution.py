class Solution:
    def beautifulSplits(self, nums: list[int]) -> int:
        n = len(nums)
        lcp = [[0] * (n + 1) for _ in range(n + 1)]
        for i in range(n - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                if nums[i] == nums[j]:
                    lcp[i][j] = 1 + lcp[i + 1][j + 1]
                    
        ans = 0
        for i in range(n - 2):
            len1 = i + 1
            for j in range(i + 1, n - 1):
                len2 = j - i
                len3 = n - 1 - j
                cond1 = (len2 >= len1) and (lcp[0][i + 1] >= len1)
                cond2 = (len3 >= len2) and (lcp[i + 1][j + 1] >= len2)
                if cond1 or cond2:
                    ans += 1
                    
        return ans
