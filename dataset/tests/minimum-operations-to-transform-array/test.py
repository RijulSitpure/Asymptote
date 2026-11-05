class Solution:
    def minOperations(self, nums: list[int]) -> int:
        ops = 0
        cur = nums[0]
        for x in nums[1:]:
            if x <= cur:
                needed = cur + 1
                ops += needed - x
                cur = needed
            else:
                cur = x
        return ops

def run_tests():
    sol = Solution()
    assert sol.minOperations([1, 1, 1]) == 3 # 1 -> 2 -> 3 (0 + 1 + 2 = 3)
    assert sol.minOperations([1, 5, 2, 4, 1]) == 14
    assert sol.minOperations([8]) == 0
    print("All tests passed for 3724.")

if __name__ == "__main__":
    run_tests()