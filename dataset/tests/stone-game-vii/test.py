class Solution:
    def stoneGameVII(self, stones: list[int]) -> int:
        n = len(stones)
        pref = [0] * (n + 1)
        for i in range(n):
            pref[i + 1] = pref[i] + stones[i]
        dp = [0] * n
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                pick_left = (pref[j + 1] - pref[i + 1]) - dp[i + 1]
                pick_right = (pref[j] - pref[i]) - dp[i]
                dp[i] = max(pick_left, pick_right)
        return dp[0]

def test():
    sol = Solution()
    assert sol.stoneGameVII([5,3,1,4,2]) == 6
    assert sol.stoneGameVII([7,90,5,1,100,10,10,2]) == 122

    print("✓ stone-game-vii passed")

if __name__ == '__main__':
    test()
