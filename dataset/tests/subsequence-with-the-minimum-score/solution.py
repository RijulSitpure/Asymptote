class Solution:
    def minimumScore(self, s: str, t: str) -> int:
        n, m = len(s), len(t)
        right = [-1] * m
        j = n - 1
        for i in range(m - 1, -1, -1):
            while j >= 0 and s[j] != t[i]:
                j -= 1
            if j >= 0:
                right[i] = j
                j -= 1
            else:
                break
        ans = m
        for i in range(m):
            if right[i] != -1:
                ans = min(ans, i)
                break
        j_idx = 0
        p = 0
        for i in range(m):
            while p < n and s[p] != t[i]:
                p += 1
            if p >= n:
                break
            while j_idx < m and (j_idx <= i or right[j_idx] <= p):
                j_idx += 1
            ans = min(ans, j_idx - i - 1)
            p += 1
        return ans
