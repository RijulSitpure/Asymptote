class Solution:
    def countVowelPermutation(self, n: int) -> int:
        MOD = 10**9 + 7
        a = e = i = o = u = 1
        for _ in range(n - 1):
            na = (e + i + u) % MOD
            ne = (a + i) % MOD
            ni = (e + o) % MOD
            no = i % MOD
            nu = (i + o) % MOD
            a, e, i, o, u = na, ne, ni, no, nu
        return (a + e + i + o + u) % MOD

def test():
    sol = Solution()
    assert sol.countVowelPermutation(1) == 5, "test 1 failed"
    assert sol.countVowelPermutation(2) == 10, "test 2 failed"
    assert sol.countVowelPermutation(5) == 68, "test 3 failed"
    print("✓ count-vowels-permutation passed")

if __name__ == "__main__":
    test()
