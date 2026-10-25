class Solution:
    def numberOfMatches(self, n: int) -> int:
        return n - 1

def test():
    sol = Solution()
    assert sol.numberOfMatches(7) == 6
    assert sol.numberOfMatches(14) == 13

    print("✓ count-of-matches-in-tournament passed")

if __name__ == '__main__':
    test()
