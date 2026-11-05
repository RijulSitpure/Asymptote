class Solution:
    def longestBalancedSubarray(self, nums: list[int]) -> int:
        # Balanced with respect to modulo 3: equal counts of elements with rem 0, 1, 2
        # Signature: (cnt1 - cnt0, cnt2 - cnt0)
        seen = {(0, 0): -1}
        c0 = c1 = c2 = 0
        max_len = 0
        for i, x in enumerate(nums):
            r = x % 3
            if r == 0: c0 += 1
            elif r == 1: c1 += 1
            else: c2 += 1
            key = (c1 - c0, c2 - c0)
            if key in seen:
                max_len = max(max_len, i - seen[key])
            else:
                seen[key] = i
        return max_len

def run_tests():
    sol = Solution()
    assert sol.longestBalancedSubarray([0, 1, 2, 3, 4, 5]) == 6 # equal counts of mod 3 elements
    assert sol.longestBalancedSubarray([1, 1, 1]) == 0
    assert sol.longestBalancedSubarray([3, 1, 2, 4]) == 3 # [3, 1, 2] -> 3
    print("All tests passed for 3721.")

if __name__ == "__main__":
    run_tests()