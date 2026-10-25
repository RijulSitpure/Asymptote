class Solution:
    def minCost(self, houses: list[int], cost: list[list[int]], m: int, n: int, target: int) -> int:
        memo = {}
        def dp(i, t, prev_c):
            if t < 0:
                return float("inf")
            if i == m:
                return 0 if t == 0 else float("inf")
            state = (i, t, prev_c)
            if state in memo:
                return memo[state]
            if houses[i] != 0:
                c = houses[i]
                ans = dp(i + 1, t - (1 if c != prev_c else 0), c)
            else:
                ans = float("inf")
                for c in range(1, n + 1):
                    cost_c = cost[i][c - 1]
                    ans = min(ans, cost_c + dp(i + 1, t - (1 if c != prev_c else 0), c))
            memo[state] = ans
            return ans
        res = dp(0, target, 0)
        return res if res != float("inf") else -1

def test():
    sol = Solution()
    assert sol.minCost([0,0,0,0,0], [[1,10],[10,1],[10,1],[1,10],[5,1]], 5, 2, 3) == 9, "test 1 failed"
    assert sol.minCost([0,2,1,2,0], [[1,10],[10,1],[10,1],[1,10],[5,1]], 5, 2, 3) == 11, "test 2 failed"
    assert sol.minCost([3,1,2,3], [[1,1,1],[1,1,1],[1,1,1],[1,1,1]], 4, 3, 3) == -1, "test 3 failed"
    print("✓ paint-house-iii passed")

if __name__ == "__main__":
    test()
