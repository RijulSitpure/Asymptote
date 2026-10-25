class Solution:
    def minSideJumps(self, obstacles: list[int]) -> int:
        dp = [1, 0, 1]
        for obs in obstacles:
            if obs > 0:
                dp[obs - 1] = float('inf')
            min_val = min(dp)
            for j in range(3):
                if obs != j + 1:
                    dp[j] = min(dp[j], min_val + 1)
        return min(dp)

def test():
    sol = Solution()
    assert sol.minSideJumps([0,1,2,3,0]) == 2
    assert sol.minSideJumps([0,1,1,3,3,0]) == 0
    assert sol.minSideJumps([0,2,1,0,3,0]) == 2

if __name__ == '__main__':
    test()
