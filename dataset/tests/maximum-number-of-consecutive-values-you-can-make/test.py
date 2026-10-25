class Solution:
    def getMaximumConsecutive(self, coins: list[int]) -> int:
        coins.sort()
        reach = 0
        for c in coins:
            if c <= reach + 1:
                reach += c
            else:
                break
        return reach + 1

def test():
    sol = Solution()
    assert sol.getMaximumConsecutive([1,3]) == 2
    assert sol.getMaximumConsecutive([1,1,1,4]) == 8
    assert sol.getMaximumConsecutive([1,4,10,3,1]) == 20

    print("✓ maximum-number-of-consecutive-values-you-can-make passed")

if __name__ == '__main__':
    test()
