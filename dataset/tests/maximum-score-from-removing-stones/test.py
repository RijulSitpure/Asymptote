class Solution:
    def maximumScore(self, a: int, b: int, c: int) -> int:
        a, b, c = sorted([a, b, c])
        if c >= a + b:
            return a + b
        return (a + b + c) // 2

def test():
    sol = Solution()
    assert sol.maximumScore(2, 4, 6) == 6
    assert sol.maximumScore(4, 4, 6) == 7
    assert sol.maximumScore(1, 8, 8) == 8

    print("✓ maximum-score-from-removing-stones passed")

if __name__ == '__main__':
    test()
