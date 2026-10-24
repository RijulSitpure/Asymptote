import sys

class Solution:
    def isScramble(self, s1: str, s2: str) -> bool:
        memo = {}

        def dfs(a: str, b: str) -> bool:
            if (a, b) in memo:
                return memo[(a, b)]
            if a == b:
                return True
            if sorted(a) != sorted(b):
                memo[(a, b)] = False
                return False
            n = len(a)
            for i in range(1, n):
                if (dfs(a[:i], b[:i]) and dfs(a[i:], b[i:])) or \
                   (dfs(a[:i], b[n - i:]) and dfs(a[i:], b[:n - i])):
                    memo[(a, b)] = True
                    return True
            memo[(a, b)] = False
            return False

        return dfs(s1, s2)

def test():
    sol = Solution()
    assert sol.isScramble("great", "rgeat") is True, "test 1 failed"
    assert sol.isScramble("abcde", "caebd") is False, "test 2 failed"
    print("✓ scramble-string passed")

if __name__ == "__main__":
    test()
