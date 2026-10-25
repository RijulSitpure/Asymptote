class Solution:
    def bestTeamScore(self, scores: list[int], ages: list[int]) -> int:
        players = sorted(zip(ages, scores))
        n = len(players)
        dp = [p[1] for p in players]
        for i in range(n):
            for j in range(i):
                if players[j][1] <= players[i][1]:
                    dp[i] = max(dp[i], dp[j] + players[i][1])
        return max(dp)

def test():
    sol = Solution()
    assert sol.bestTeamScore([1,3,5,10,15], [1,2,3,4,5]) == 34
    assert sol.bestTeamScore([4,5,6,5], [2,1,2,1]) == 16
    assert sol.bestTeamScore([1,2,3,5], [8,9,10,1]) == 6

    print("✓ best-team-with-no-conflicts passed")

if __name__ == '__main__':
    test()
