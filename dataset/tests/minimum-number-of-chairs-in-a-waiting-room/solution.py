class Solution:
    def minimumChairs(self, s: str) -> int:
        cur = 0
        ans = 0
        for ch in s:
            if ch == 'E':
                cur += 1
                ans = max(ans, cur)
            else:
                cur -= 1
        return ans