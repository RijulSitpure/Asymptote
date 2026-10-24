class Solution:
    def divisorGame(self, n: int) -> bool:
        return n % 2 == 0

def test():
    sol = Solution()
    assert sol.divisorGame(2) == True, "test 1 failed"
    assert sol.divisorGame(3) == False, "test 2 failed"
    print("✓ divisor-game passed")

if __name__ == "__main__":
    test()
