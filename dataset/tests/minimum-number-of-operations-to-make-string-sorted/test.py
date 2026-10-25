class Solution:
    def makeStringSorted(self, s: str) -> int:
        MOD = 10**9 + 7
        n = len(s)
        fact = [1] * (n + 1)
        for i in range(1, n + 1):
            fact[i] = (fact[i - 1] * i) % MOD

        inv_fact = [1] * (n + 1)
        inv_fact[n] = pow(fact[n], MOD - 2, MOD)
        for i in range(n - 1, -1, -1):
            inv_fact[i] = (inv_fact[i + 1] * (i + 1)) % MOD

        counts = [0] * 26
        for c in s:
            counts[ord(c) - ord('a')] += 1

        ans = 0
        for i in range(n):
            c_idx = ord(s[i]) - ord('a')
            rem = n - 1 - i
            for c in range(c_idx):
                if counts[c] > 0:
                    ways = fact[rem]
                    for j in range(26):
                        cnt = counts[j] - (1 if j == c else 0)
                        ways = (ways * inv_fact[cnt]) % MOD
                    ans = (ans + ways) % MOD
            counts[c_idx] -= 1

        return ans

def test():
    sol = Solution()
    assert sol.makeStringSorted("cba") == 5
    assert sol.makeStringSorted("aabaa") == 2
    assert sol.makeStringSorted("cdbea") == 63

if __name__ == '__main__':
    test()
