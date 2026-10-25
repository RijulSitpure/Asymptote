class Solution:
    def countOdds(self, low: int, high: int) -> int:
        return (high + 1) // 2 - low // 2

def test():
    sol = Solution()
    assert sol.countOdds(3, 7) == 3, "test 1 failed"
    assert sol.countOdds(8, 10) == 1, "test 2 failed"
    print("✓ count-odd-numbers-in-an-interval-range passed")

if __name__ == "__main__":
    test()
