class Solution:
    def minimumPartition(self, s: str, k: int) -> int:
        ans = 0
        cur = 0
        for ch in s:
            d = int(ch)
            if d > k:
                return -1
            if cur * 10 + d <= k:
                cur = cur * 10 + d
            else:
                ans += 1
                cur = d
        if cur > 0:
            ans += 1
        return ans
