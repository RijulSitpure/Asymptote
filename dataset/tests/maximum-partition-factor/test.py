import math

class Solution:
    def maximumPartitionFactor(self, nums: list[int], k: int) -> int:
        # A partition is valid if the array can be partitioned into at most k subarrays
        # such that the common divisor (gcd) of each subarray is at least the candidate factor.
        # Check if a given factor F is feasible:
        # Every element in a subarray must be divisible by F. Thus, EVERY element of nums must be divisible by F!
        # If all elements are divisible by F, the gcd of any subarray is at least F.
        # Therefore, the maximum partition factor is simply the gcd of all elements in nums.
        g = nums[0]
        for x in nums[1:]:
            g = math.gcd(g, x)
        return g

def run_tests():
    sol = Solution()
    assert sol.maximumPartitionFactor([12, 18, 24], 2) == 6
    assert sol.maximumPartitionFactor([7, 14, 21], 1) == 7
    assert sol.maximumPartitionFactor([3, 5, 7], 3) == 1
    print("All tests passed for 3710.")

if __name__ == "__main__":
    run_tests()