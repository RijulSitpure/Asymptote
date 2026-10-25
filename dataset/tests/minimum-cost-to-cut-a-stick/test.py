class Solution:
    def minCost(self, n: int, cuts: list[int]) -> int:
        cuts = sorted([0] + cuts + [n])
        m = len(cuts)
        memo = {}
        def dp(i, j):
            if j - i <= 1:
                return 0
            state = (i, j)
            if state in memo:
                return memo[state]
            ans = float("inf")
            cost = cuts[j] - cuts[i]
            for k in range(i + 1, j):
                ans = min(ans, cost + dp(i, k) + dp(k, j))
            memo[state] = ans
            return ans
        return dp(0, m - 1)

def test():
    sol = Solution()
    assert sol.minCost(7, [1,3,4,5]) == 16, "test 1 failed"
    assert sol.minCost(9, [5,6,1,4,2]) == 22, "test 2 failed"
    print("✓ minimum-cost-to-cut-a-stick passed")

if __name__ == "__main__":
    test()
