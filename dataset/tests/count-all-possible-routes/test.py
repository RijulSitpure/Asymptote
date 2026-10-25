class Solution:
    def countRoutes(self, locations: list[int], start: int, finish: int, fuel: int) -> int:
        MOD = 10**9 + 7
        n = len(locations)
        memo = {}
        def dp(u, f):
            state = (u, f)
            if state in memo:
                return memo[state]
            ans = 1 if u == finish else 0
            for v in range(n):
                if v != u:
                    cost = abs(locations[u] - locations[v])
                    if cost <= f:
                        ans = (ans + dp(v, f - cost)) % MOD
            memo[state] = ans
            return ans
        return dp(start, fuel)

def test():
    sol = Solution()
    assert sol.countRoutes([2,3,6,8,4], 1, 3, 5) == 4, "test 1 failed"
    assert sol.countRoutes([4,3,1], 1, 0, 6) == 5, "test 2 failed"
    assert sol.countRoutes([5,2,1], 0, 2, 3) == 0, "test 3 failed"
    print("✓ count-all-possible-routes passed")

if __name__ == "__main__":
    test()
