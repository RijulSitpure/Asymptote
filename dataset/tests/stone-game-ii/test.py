class Solution:
    def stoneGameII(self, piles: list[int]) -> int:
        n = len(piles)
        suffix = [0] * (n + 1)
        for i in range(n - 1, -1, -1):
            suffix[i] = suffix[i + 1] + piles[i]
        
        memo = {}
        
        def dp(i, m):
            if i + 2 * m >= n:
                return suffix[i]
            state = (i, m)
            if state in memo:
                return memo[state]
            
            res = 0
            for x in range(1, 2 * m + 1):
                opp = dp(i + x, max(m, x))
                res = max(res, suffix[i] - opp)
            memo[state] = res
            return res
        
        return dp(0, 1)

def test():
    sol = Solution()
    assert sol.stoneGameII([2,7,9,4,4]) == 10, "test 1 failed"
    assert sol.stoneGameII([1,2,3,4,5,100]) == 104, "test 2 failed"
    print("✓ stone-game-ii passed")

if __name__ == "__main__":
    test()
