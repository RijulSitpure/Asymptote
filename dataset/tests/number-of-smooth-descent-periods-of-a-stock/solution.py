class Solution:
    def getDescentPeriods(self, prices: list[int]) -> int:
        ans = 1
        curr_len = 1

        for i in range(1, len(prices)):
            if prices[i] == prices[i - 1] - 1:
                curr_len += 1
            else:
                curr_len = 1
            ans += curr_len

        return ans
