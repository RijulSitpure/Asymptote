class Solution:
    def soupServings(self, n: int) -> float:
        if n >= 5000:
            return 1.0
        m = (n + 24) // 25
        memo = {}

        def dp(a: int, b: int) -> float:
            if a <= 0 and b <= 0:
                return 0.5
            if a <= 0:
                return 1.0
            if b <= 0:
                return 0.0
            if (a, b) in memo:
                return memo[(a, b)]
            ans = 0.25 * (
                dp(a - 4, b) +
                dp(a - 3, b - 1) +
                dp(a - 2, b - 2) +
                dp(a - 1, b - 3)
            )
            memo[(a, b)] = ans
            return ans

        return dp(m, m)

def test():
    sol = Solution()
    assert abs(sol.soupServings(50) - 0.625) < 1e-5, "test 1 failed"
    assert abs(sol.soupServings(100) - 0.71875) < 1e-5, "test 2 failed"
    assert sol.soupServings(5000) == 1.0, "test 3 failed"
    print("✓ soup-servings passed")

if __name__ == "__main__":
    test()
