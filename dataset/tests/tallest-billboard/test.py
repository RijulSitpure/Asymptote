from typing import List

class Solution:
    def tallestBillboard(self, rods: List[int]) -> int:
        dp = {0: 0}
        for x in rods:
            cur = dp.copy()
            for diff, y in cur.items():
                dp[diff + x] = max(dp.get(diff + x, 0), y)
                new_diff = abs(diff - x)
                new_y = y + min(diff, x)
                dp[new_diff] = max(dp.get(new_diff, 0), new_y)
        return dp.get(0, 0)

def test():
    sol = Solution()
    assert sol.tallestBillboard([1,2,3,6]) == 6, "test 1 failed"
    assert sol.tallestBillboard([1,2,3,4,5,6]) == 10, "test 2 failed"
    assert sol.tallestBillboard([1,2]) == 0, "test 3 failed"
    print("✓ tallest-billboard passed")

if __name__ == "__main__":
    test()
