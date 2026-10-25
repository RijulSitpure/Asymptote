class Solution:
    def minStartValue(self, nums: list[int]) -> int:
        cur = 0
        min_prefix = 0
        for x in nums:
            cur += x
            min_prefix = min(min_prefix, cur)
        return 1 - min_prefix

def test():
    sol = Solution()
    assert sol.minStartValue([-3,2,-3,4,2]) == 5, "test 1 failed"
    assert sol.minStartValue([1,2]) == 1, "test 2 failed"
    assert sol.minStartValue([1,-2,-3]) == 5, "test 3 failed"
    print("✓ minimum-value-to-get-positive-step-by-step-sum passed")

if __name__ == "__main__":
    test()
