
class Solution:
    def maxCoins(self, lane1: list[int], lane2: list[int]) -> int:
        n = len(lane1)
        ans = -float('inf')
        dp0 = -float('inf')
        dp1 = -float('inf')
        dp2 = -float('inf')
        for i in range(n):
            c1, c2 = lane1[i], lane2[i]
            new_dp0 = max(c1, dp0 + c1)
            new_dp1 = max(c2, dp0 + c2, dp1 + c2)
            new_dp2 = max(dp1 + c1, dp2 + c1)
            dp0, dp1, dp2 = new_dp0, new_dp1, new_dp2
            ans = max(ans, dp0, dp1, dp2)
        return ans

def test_maximum_coin_collection():
    sol = Solution()
    assert sol.maxCoins([1, -2, -10, 3], [10, -1, 4, -20]) == 16
    assert sol.maxCoins([1, 2, 3], [-1, -2, -3]) == 6
    assert sol.maxCoins([-5, -1, -3], [-10, -2, -4]) == -1

if __name__ == '__main__':
    test_maximum_coin_collection()
    print('All tests passed.')
