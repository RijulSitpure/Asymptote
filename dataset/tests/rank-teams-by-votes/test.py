class Solution:
    def rankTeams(self, votes: list[str]) -> str:
        num_teams = len(votes[0])
        counts = {c: [0] * num_teams for c in votes[0]}
        for v in votes:
            for i, c in enumerate(v):
                counts[c][i] += 1
        teams = list(votes[0])
        teams.sort(key=lambda c: ([-counts[c][i] for i in range(num_teams)], c))
        return "".join(teams)

def test():
    sol = Solution()
    assert sol.rankTeams(["WXYZ","XYZW"]) == "XWYZ", "test 1 failed"
    assert sol.rankTeams(["ZMNAGUEDSJYLBOPHRQICWFXTVK"]) == "ZMNAGUEDSJYLBOPHRQICWFXTVK", "test 2 failed"
    print("✓ rank-teams-by-votes passed")

if __name__ == "__main__":
    test()
