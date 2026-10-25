class Solution:
    def totalMoney(self, n: int) -> int:
        weeks = n // 7
        rem = n % 7
        total_weeks = 28 * weeks + 7 * (weeks * (weeks - 1) // 2)
        rem_sum = rem * (weeks + 1) + rem * (rem - 1) // 2
        return total_weeks + rem_sum

def test():
    sol = Solution()
    assert sol.totalMoney(4) == 10
    assert sol.totalMoney(10) == 37
    assert sol.totalMoney(20) == 96

    print("✓ calculate-money-in-leetcode-bank passed")

if __name__ == '__main__':
    test()
