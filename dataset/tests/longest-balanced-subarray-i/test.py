class Solution:
    def longestBalancedSubarray(self, nums: list[int]) -> int:
        # Subarray with equal numbers of even and odd values
        # Transform: even -> +1, odd -> -1
        # Find longest subarray with sum 0
        seen = {0: -1}
        pref = 0
        max_len = 0
        for i, x in enumerate(nums):
            pref += 1 if x % 2 == 0 else -1
            if pref in seen:
                max_len = max(max_len, i - seen[pref])
            else:
                seen[pref] = i
        return max_len

def run_tests():
    sol = Solution()
    assert sol.longestBalancedSubarray([1, 2, 3, 4]) == 4 # equal evens and odds
    assert sol.longestBalancedSubarray([2, 4, 6]) == 0 # no odds
    assert sol.longestBalancedSubarray([1, 2, 2, 1, 1]) == 4 # [1, 2, 2, 1] has 2 evens, 2 odds
    print("All tests passed for 3719.")

if __name__ == "__main__":
    run_tests()