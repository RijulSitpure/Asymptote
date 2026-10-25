class Solution:
    def minDays(self, n: int) -> int:
        memo = {0: 0, 1: 1}
        def dp(x):
            if x in memo:
                return memo[x]
            res = 1 + min(x % 2 + dp(x // 2), x % 3 + dp(x // 3))
            memo[x] = res
            return res
        return dp(n)

def test():
    sol = Solution()
    assert sol.minDays(10) == 4, "test 1 failed"
    assert sol.minDays(6) == 3, "test 2 failed"
    print("✓ minimum-number-of-days-to-eat-n-oranges passed")

if __name__ == "__main__":
    test()
