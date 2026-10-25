class Solution:
    def countSubstrings(self, s: str, t: str) -> int:
        ans = 0
        m, n = len(s), len(t)
        for i in range(m):
            for j in range(n):
                diff = 0
                k = 0
                while i + k < m and j + k < n:
                    if s[i + k] != t[j + k]:
                        diff += 1
                    if diff > 1:
                        break
                    if diff == 1:
                        ans += 1
                    k += 1
        return ans

def test():
    sol = Solution()
    assert sol.countSubstrings("aba", "baba") == 6
    assert sol.countSubstrings("ab", "bb") == 3
    assert sol.countSubstrings("a", "a") == 0

    print("✓ count-substrings-that-differ-by-one-character passed")

if __name__ == '__main__':
    test()
