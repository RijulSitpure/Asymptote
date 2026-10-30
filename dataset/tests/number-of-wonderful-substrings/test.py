class Solution:
    def wonderfulSubstrings(self, word: str) -> int:
        counts = [0] * 1024
        counts[0] = 1
        mask = 0
        res = 0
        for ch in word:
            mask ^= 1 << (ord(ch) - ord('a'))
            res += counts[mask]
            for b in range(10):
                res += counts[mask ^ (1 << b)]
            counts[mask] += 1
        return res

def test_wonderful_substrings():
    sol = Solution()
    assert sol.wonderfulSubstrings("aba") == 4
    assert sol.wonderfulSubstrings("aabb") == 9
    assert sol.wonderfulSubstrings("he") == 2

