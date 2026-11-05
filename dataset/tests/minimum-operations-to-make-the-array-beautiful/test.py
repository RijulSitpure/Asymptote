class Solution:
    def minOperations(self, nums: list[int]) -> int:
        # Array is beautiful if adjacent elements have alternating parity
        # Pattern 0: index i has parity (i % 2) [even at 0, odd at 1, ...]
        # Pattern 1: index i has parity ((i + 1) % 2) [odd at 0, even at 1, ...]
        mismatch0 = sum((nums[i] % 2) != (i % 2) for i in range(len(nums)))
        mismatch1 = sum((nums[i] % 2) != ((i + 1) % 2) for i in range(len(nums)))
        return min(mismatch0, mismatch1)

def run_tests():
    sol = Solution()
    assert sol.minOperations([1, 2, 3, 4]) == 0 # 1,2,3,4 alternates (odd, even, odd, even)
    assert sol.minOperations([2, 4, 6]) == 1 # change index 1 to odd -> 1 operation
    assert sol.minOperations([1]) == 0
    print("All tests passed for 3717.")

if __name__ == "__main__":
    run_tests()