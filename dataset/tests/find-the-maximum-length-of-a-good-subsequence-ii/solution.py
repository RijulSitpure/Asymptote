class Solution:
    def maximumLength(self, nums: list[int], k: int) -> int:
        dp = {}
        max_len = [0] * (k + 1)
        for x in nums:
            if x not in dp:
                dp[x] = [0] * (k + 1)
            cur_x = dp[x]
            for j in range(k, -1, -1):
                cur_x[j] = cur_x[j] + 1
                if j > 0:
                    cur_x[j] = max(cur_x[j], max_len[j - 1] + 1)
                max_len[j] = max(max_len[j], cur_x[j])
        return max_len[k]