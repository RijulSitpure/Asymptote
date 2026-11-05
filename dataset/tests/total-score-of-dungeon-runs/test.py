class Solution:
    def maxDungeonScore(self, damage: list[int], points: list[int], hp: int, shield: int, hp_boost: int, k: int) -> int:
        memo = {}
        n = len(damage)
        
        def dfs(i: int, cur_hp: int, cur_shield: int, rem_k: int) -> int:
            if i == n:
                return 0
            state = (i, cur_hp, cur_shield, rem_k)
            if state in memo:
                return memo[state]
            
            res = 0
            dmg = damage[i]
            s_dmg = min(cur_shield, dmg)
            h_dmg = dmg - s_dmg
            if cur_hp - h_dmg > 0:
                res = max(res, points[i] + dfs(i + 1, cur_hp - h_dmg, cur_shield - s_dmg, rem_k))
            
            if rem_k > 0:
                boosted_hp = cur_hp + hp_boost
                if boosted_hp - h_dmg > 0:
                    res = max(res, points[i] + dfs(i + 1, boosted_hp - h_dmg, cur_shield - s_dmg, rem_k - 1))
            
            memo[state] = res
            return res
        
        return dfs(0, hp, shield, k)

def run_tests():
    sol = Solution()
    assert sol.maxDungeonScore([10, 20], [5, 10], 16, 5, 10, 1) == 15
    assert sol.maxDungeonScore([100], [50], 10, 0, 10, 0) == 0
    print("All tests passed for 3771.")

if __name__ == "__main__":
    run_tests()
