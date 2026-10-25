class Solution:
    def ways(self, pizza: list[str], k: int) -> int:
        MOD = 10**9 + 7
        R, C = len(pizza), len(pizza[0])
        apples = [[0] * (C + 1) for _ in range(R + 1)]
        for r in range(R - 1, -1, -1):
            for c in range(C - 1, -1, -1):
                apples[r][c] = (pizza[r][c] == "A") + apples[r + 1][c] + apples[r][c + 1] - apples[r + 1][c + 1]
        memo = {}
        def dp(r, c, cuts_left):
            if apples[r][c] < cuts_left + 1:
                return 0
            if cuts_left == 0:
                return 1
            state = (r, c, cuts_left)
            if state in memo:
                return memo[state]
            ans = 0
            for nr in range(r + 1, R):
                if apples[r][c] - apples[nr][c] > 0:
                    ans = (ans + dp(nr, c, cuts_left - 1)) % MOD
            for nc in range(c + 1, C):
                if apples[r][c] - apples[r][nc] > 0:
                    ans = (ans + dp(r, nc, cuts_left - 1)) % MOD
            memo[state] = ans
            return ans
        return dp(0, 0, k - 1)

def test():
    sol = Solution()
    assert sol.ways(["A..","AAA","..."], 3) == 3, "test 1 failed"
    assert sol.ways(["A..","AA.","..."], 3) == 1, "test 2 failed"
    assert sol.ways(["A..","A..","..."], 1) == 1, "test 3 failed"
    print("✓ number-of-ways-of-cutting-a-pizza passed")

if __name__ == "__main__":
    test()
