from functools import lru_cache

class Solution:
    def connectTwoGroups(self, cost: list[list[int]]) -> int:
        size1, size2 = len(cost), len(cost[0])
        min_cost2 = [min(cost[i][j] for i in range(size1)) for j in range(size2)]
        @lru_cache(maxsize=None)
        def dp(i: int, mask: int) -> int:
            if i == size1:
                res = 0
                for j in range(size2):
                    if not (mask & (1 << j)):
                        res += min_cost2[j]
                return res
            ans = float("inf")
            for j in range(size2):
                ans = min(ans, cost[i][j] + dp(i + 1, mask | (1 << j)))
            return ans
        return dp(0, 0)

def test():
    sol = Solution()
    assert sol.connectTwoGroups([[15, 96], [36, 2]]) == 17
    assert sol.connectTwoGroups([[1, 3, 5], [4, 1, 1], [1, 5, 3]]) == 4
    assert sol.connectTwoGroups([[2, 5, 1], [3, 4, 7], [8, 1, 2], [6, 2, 4], [3, 8, 8]]) == 10

    print("✓ minimum-cost-to-connect-two-groups-of-points passed")

if __name__ == '__main__':
    test()
