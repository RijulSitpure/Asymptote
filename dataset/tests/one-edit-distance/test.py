import sys

class Solution:
    def isOneEditDistance(self, s: str, t: str) -> bool:
        m, n = len(s), len(t)
        if m > n:
            return self.isOneEditDistance(t, s)
        if n - m > 1:
            return False
        for i in range(m):
            if s[i] != t[i]:
                if m == n:
                    return s[i + 1:] == t[i + 1:]
                else:
                    return s[i:] == t[i + 1:]
        return m + 1 == n

def test():
    sol = Solution()
    assert sol.isOneEditDistance("ab", "acb") is True, "test 1 failed"
    assert sol.isOneEditDistance("", "") is False, "test 2 failed"
    assert sol.isOneEditDistance("a", "") is True, "test 3 failed"
    assert sol.isOneEditDistance("ab", "cd") is False, "test 4 failed"
    print("✓ one-edit-distance passed")

if __name__ == "__main__":
    test()
