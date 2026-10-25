class Solution:
    def minDifficulty(self, jobDifficulty: list[int], d: int) -> int:
        n = len(jobDifficulty)
        if n < d:
            return -1
        dp = [float("inf")] * (n + 1)
        dp[0] = 0
        for day in range(1, d + 1):
            nxt = [float("inf")] * (n + 1)
            for i in range(day, n + 1):
                cur_max = 0
                for j in range(i - 1, day - 2, -1):
                    cur_max = max(cur_max, jobDifficulty[j])
                    nxt[i] = min(nxt[i], dp[j] + cur_max)
            dp = nxt
        return dp[n]

def test():
    sol = Solution()
    assert sol.minDifficulty([6,5,4,3,2,1], 2) == 7, "test 1 failed"
    assert sol.minDifficulty([9,9,9], 4) == -1, "test 2 failed"
    assert sol.minDifficulty([1,1,1], 3) == 3, "test 3 failed"
    print("✓ minimum-difficulty-of-a-job-schedule passed")

if __name__ == "__main__":
    test()
