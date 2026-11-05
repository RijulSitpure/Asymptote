class Solution:
    def maxBalancedXorSubarray(self, nums: list[int]) -> int:
        # Balanced: exclusive-or sum is 0
        seen = {0: -1}
        cur_xor = 0
        max_len = 0
        for i, x in enumerate(nums):
            cur_xor ^= x
            if cur_xor in seen:
                max_len = max(max_len, i - seen[cur_xor])
            else:
                seen[cur_xor] = i
        return max_len

def run_tests():
    sol = Solution()
    assert sol.maxBalancedXorSubarray([1, 2, 3, 4]) == 3 # 1^2^3 = 0, length 3
    assert sol.maxBalancedXorSubarray([1, 1]) == 2 # 1^1 = 0, length 2
    assert sol.maxBalancedXorSubarray([1, 2, 4]) == 0
    print("All tests passed for 3755.")

if __name__ == "__main__":
    run_tests()