class Solution:
    def countCompleteDayPairs(self, hours: list[int]) -> int:
        cnt = [0] * 24
        ans = 0
        for h in hours:
            rem = h % 24
            comp = (24 - rem) % 24
            ans += cnt[comp]
            cnt[rem] += 1
        return ans