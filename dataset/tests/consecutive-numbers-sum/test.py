class Solution:
    def consecutiveNumbersSum(self, n: int) -> int:
        ans = 0
        k = 1
        while k * (k - 1) // 2 < n:
            if (n - k * (k - 1) // 2) % k == 0:
                ans += 1
            k += 1
        return ans

def test():
    sol = Solution()
    assert sol.consecutiveNumbersSum(5) == 2, "test 1 failed"
    assert sol.consecutiveNumbersSum(9) == 3, "test 2 failed"
    assert sol.consecutiveNumbersSum(15) == 4, "test 3 failed"
    print("✓ consecutive-numbers-sum passed")

if __name__ == "__main__":
    test()
