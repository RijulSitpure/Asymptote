class Solution:
    def longestSubsequence(self, nums: list[int]) -> int:
        total_xor = 0
        has_non_zero = False
        for x in nums:
            total_xor ^= x
            if x != 0:
                has_non_zero = True
        if total_xor != 0:
            return len(nums)
        if not has_non_zero:
            return 0
        # If total_xor == 0 and there is at least one non-zero element x,
        # removing x leaves total_xor ^ x = 0 ^ x = x != 0, so length is len(nums) - 1
        return len(nums) - 1

def run_tests():
    sol = Solution()
    assert sol.longestSubsequence([1, 2, 3]) == 2 # 1^2^3 = 0, removing 1 gives 2^3=1 != 0, len 2
    assert sol.longestSubsequence([1, 2, 4]) == 3 # 1^2^4 = 7 != 0, len 3
    assert sol.longestSubsequence([0, 0, 0]) == 0
    print("All tests passed for 3702.")

if __name__ == "__main__":
    run_tests()