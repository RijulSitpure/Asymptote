class Solution:
    def checkPartitioning(self, s: str) -> bool:
        n = len(s)
        is_pal = [[False] * n for _ in range(n)]

        for i in range(n - 1, -1, -1):
            for j in range(i, n):
                if s[i] == s[j] and (j - i <= 2 or is_pal[i + 1][j - 1]):
                    is_pal[i][j] = True

        for i in range(1, n - 1):
            if is_pal[0][i - 1]:
                for j in range(i + 1, n):
                    if is_pal[i][j - 1] and is_pal[j][n - 1]:
                        return True
        return False

def test():
    sol = Solution()
    assert sol.checkPartitioning("abcbdd") == True
    assert sol.checkPartitioning("bcbddxy") == False

    print("✓ palindrome-partitioning-iv passed")

if __name__ == '__main__':
    test()
