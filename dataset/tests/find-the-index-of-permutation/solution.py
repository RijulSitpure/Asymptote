class Solution:
    def getPermutationIndex(self, perm: list[int]) -> int:
        MOD = 10**9 + 7
        n = len(perm)
        fact = [1] * (n + 1)
        for i in range(1, n + 1):
            fact[i] = (fact[i - 1] * i) % MOD

        bit = [0] * (n + 2)

        def add(idx, val):
            while idx <= n + 1:
                bit[idx] += val
                idx += idx & (-idx)

        def query(idx):
            s = 0
            while idx > 0:
                s += bit[idx]
                idx -= idx & (-idx)
            return s

        ans = 0
        for i, x in enumerate(perm):
            smaller_seen = query(x)
            smaller_available = (x - 1) - smaller_seen
            rem = n - 1 - i
            ans = (ans + smaller_available * fact[rem]) % MOD
            add(x, 1)
        return ans
