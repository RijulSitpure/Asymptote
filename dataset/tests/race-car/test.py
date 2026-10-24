class Solution:
    def racecar(self, target: int) -> int:
        memo = {0: 0}

        def dp(t: int) -> int:
            if t in memo:
                return memo[t]
            k = t.bit_length()
            if (1 << k) - 1 == t:
                memo[t] = k
                return k

            ans = k + 1 + dp((1 << k) - 1 - t)
            for j in range(k - 1):
                ans = min(ans, (k - 1) + 1 + j + 1 + dp(t - ((1 << (k - 1)) - 1) + ((1 << j) - 1)))
            memo[t] = ans
            return ans

        return dp(target)

def test():
    sol = Solution()
    assert sol.racecar(3) == 2, "test 1 failed"
    assert sol.racecar(6) == 5, "test 2 failed"
    print("✓ race-car passed")

if __name__ == "__main__":
    test()
