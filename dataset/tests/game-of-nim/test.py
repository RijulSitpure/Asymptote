class Solution:
    def nimGame(self, piles: list[int]) -> bool:
        nim_sum = 0
        for p in piles:
            nim_sum ^= p
        return nim_sum != 0

def test():
    sol = Solution()
    assert sol.nimGame([1]) == True
    assert sol.nimGame([1,1]) == False
    assert sol.nimGame([1,2,3]) == False

if __name__ == '__main__':
    test()
