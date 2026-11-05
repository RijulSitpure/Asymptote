class Solution:
    def maxSum(self, nums: list[int]) -> int:
        mx = max(nums)
        if mx <= 0:
            return mx
        return sum(set(x for x in nums if x > 0))

def run_tests():
    s = Solution()
    assert s.maxSum([1, 2, 3, 1, 2]) == 6
    assert s.maxSum([-2, -1, -5]) == -1
    assert s.maxSum([0, -1, 0]) == 0
    print("All tests passed for maximum-unique-subarray-sum-after-deletion")

if __name__ == '__main__':
    run_tests()
