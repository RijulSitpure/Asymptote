class Solution:
    def stoneGameVIII(self, stones: list[int]) -> int:
        n = len(stones)
        pref = [0] * n
        pref[0] = stones[0]
        for i in range(1, n):
            pref[i] = pref[i - 1] + stones[i]

        dp = pref[n - 1]
        for i in range(n - 2, 0, -1):
            dp = max(dp, pref[i] - dp)

        return dp

def test():
    sol = Solution()
    assert sol.stoneGameVIII([-1,2,-3,4,-5]) == 5
    assert sol.stoneGameVIII([7,-6,5,10,5,-2,-6]) == 13
    assert sol.stoneGameVIII([-10,-12]) == -22

if __name__ == '__main__':
    test()
