class Solution:
    def maximizeWin(self, prizePositions: list[int], k: int) -> int:
        n = len(prizePositions)
        pre = [0] * (n + 1)
        l = 0
        ans = 0
        for r in range(n):
            while prizePositions[r] - prizePositions[l] > k:
                l += 1
            cnt = r - l + 1
            ans = max(ans, cnt + pre[l])
            pre[r + 1] = max(pre[r], cnt)
        return ans
