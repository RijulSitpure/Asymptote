class Solution:
    def maxCount(self, banned: list[int], n: int, maxSum: int) -> int:
        s = set(banned)
        ans = 0
        total = 0
        for i in range(1, n + 1):
            if i not in s:
                if total + i <= maxSum:
                    total += i
                    ans += 1
                else:
                    break
        return ans
