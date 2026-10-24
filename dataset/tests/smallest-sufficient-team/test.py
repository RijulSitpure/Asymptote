class Solution:
    def smallestSufficientTeam(self, req_skills: list[str], people: list[list[str]]) -> list[int]:
        n = len(req_skills)
        skill_map = {s: i for i, s in enumerate(req_skills)}
        dp = {0: []}
        
        for i, p_skills in enumerate(people):
            p_mask = 0
            for s in p_skills:
                if s in skill_map:
                    p_mask |= (1 << skill_map[s])
            if p_mask == 0:
                continue
            
            new_dp = {}
            for mask, team in dp.items():
                combined = mask | p_mask
                if combined not in dp or len(team) + 1 < len(dp[combined]):
                    if combined not in new_dp or len(team) + 1 < len(new_dp[combined]):
                        new_dp[combined] = team + [i]
            dp.update(new_dp)
        
        return dp[(1 << n) - 1]

def test():
    sol = Solution()
    skills1 = ["java","nodejs","reactjs"]
    p1 = [["java"],["nodejs"],["nodejs","reactjs"]]
    res1 = sorted(sol.smallestSufficientTeam(skills1, p1))
    assert res1 == [0, 2], f"test 1 failed: {res1}"
    print("✓ smallest-sufficient-team passed")

if __name__ == "__main__":
    test()
