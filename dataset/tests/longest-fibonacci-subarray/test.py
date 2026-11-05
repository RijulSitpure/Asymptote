class Solution:
    def longestFibonacciSubarray(self, nums: list[int]) -> int:
        n = len(nums)
        if n < 3:
            return 0
        max_len = 0
        cur_len = 2
        for i in range(2, n):
            if nums[i] == nums[i - 1] + nums[i - 2]:
                cur_len += 1
                max_len = max(max_len, cur_len)
            else:
                cur_len = 2
        return max_len if max_len >= 3 else 0

def run_tests():
    sol = Solution()
    assert sol.longestFibonacciSubarray([1, 2, 3, 5, 8]) == 5
    assert sol.longestFibonacciSubarray([1, 2, 4, 7]) == 0
    assert sol.longestFibonacciSubarray([2, 3, 5, 8, 1, 1, 2, 3]) == 4
    print("All tests passed for 3708.")

if __name__ == "__main__":
    run_tests()