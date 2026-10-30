class Solution:
    def countPalindromes(self, s: str) -> int:
        MOD = 1_000_000_007
        n = len(s)
        if n < 5:
            return 0
        pref = [[[0] * 10 for _ in range(10)] for _ in range(n)]
        suff = [[[0] * 10 for _ in range(10)] for _ in range(n)]
        cnt = [0] * 10
        for i in range(n):
            d = int(s[i])
            if i > 0:
                for j in range(10):
                    for k in range(10):
                        pref[i][j][k] = pref[i - 1][j][k]
                for j in range(10):
                    pref[i][j][d] = (pref[i][j][d] + cnt[j]) % MOD
            cnt[d] += 1
        cnt = [0] * 10
        for i in range(n - 1, -1, -1):
            d = int(s[i])
            if i < n - 1:
                for j in range(10):
                    for k in range(10):
                        suff[i][j][k] = suff[i + 1][j][k]
                for k in range(10):
                    suff[i][d][k] = (suff[i][d][k] + cnt[k]) % MOD
            cnt[d] += 1
        ans = 0
        for i in range(2, n - 2):
            for j in range(10):
                for k in range(10):
                    ans = (ans + pref[i - 1][j][k] * suff[i + 1][k][j]) % MOD
        return ans
