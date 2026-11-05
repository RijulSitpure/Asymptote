class Solution:
    def maxScore(self, nums: list[int]) -> int:
        total = sum(nums)
        n = len(nums)
        if n % 2 != 0:
            return total - min(nums)
        return total - min(nums[i] + nums[i + 1] for i in range(n - 1))

def run_tests():
    s = Solution()
    assert s.maxScore([1, 2, 3]) == 5
    assert s.maxScore([2, 4, 1, 3]) == 6
    print("All tests passed for maximize-score-after-pair-deletions")

if __name__ == '__main__':
    run_tests()
