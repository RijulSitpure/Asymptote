class Solution:
    def stoneGameV(self, stoneValue: list[int]) -> int:
        n = len(stoneValue)
        pref = [0] * (n + 1)
        for i in range(n):
            pref[i + 1] = pref[i] + stoneValue[i]
        memo = {}
        def dp(i, j):
            if i == j:
                return 0
            state = (i, j)
            if state in memo:
                return memo[state]
            ans = 0
            for k in range(i, j):
                left = pref[k + 1] - pref[i]
                right = pref[j + 1] - pref[k + 1]
                if left < right:
                    ans = max(ans, left + dp(i, k))
                elif right < left:
                    ans = max(ans, right + dp(k + 1, j))
                else:
                    ans = max(ans, left + max(dp(i, k), dp(k + 1, j)))
            memo[state] = ans
            return ans
        return dp(0, n - 1)

def test():
    sol = Solution()
    assert sol.stoneGameV([6,2,3,4,5,5]) == 18, "test 1 failed"
    assert sol.stoneGameV([7,7,7,7,7,7,7]) == 28, "test 2 failed"
    assert sol.stoneGameV([4]) == 0, "test 3 failed"
    print("✓ stone-game-v passed")

if __name__ == "__main__":
    test()
