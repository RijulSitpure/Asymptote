class Solution:
    def minOperationsToDistinct(self, nums: list[int]) -> int:
        n = len(nums)
        ops = 0
        while 3 * ops < n:
            suffix = nums[3 * ops:]
            if len(set(suffix)) == len(suffix):
                return ops
            ops += 1
        return ops

def run_tests():
    sol = Solution()
    assert sol.minOperationsToDistinct([1, 2, 3, 4, 2, 3, 3, 5, 7]) == 2
    assert sol.minOperationsToDistinct([4, 5, 6, 4, 4]) == 2
    assert sol.minOperationsToDistinct([6, 7, 8, 9]) == 0
    print("All tests passed for 3779.")

if __name__ == "__main__":
    run_tests()
