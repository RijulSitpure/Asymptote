class Solution:
    def maxCoins(self, piles: list[int]) -> int:
        piles.sort()
        n = len(piles)
        return sum(piles[n // 3::2])

def test():
    sol = Solution()
    assert sol.maxCoins([2,4,1,2,7,8]) == 9, "test 1 failed"
    assert sol.maxCoins([2,4,5]) == 4, "test 2 failed"
    assert sol.maxCoins([9,8,7,6,5,1,2,3,4]) == 18, "test 3 failed"
    print("✓ maximum-number-of-coins-you-can-get passed")

if __name__ == "__main__":
    test()
