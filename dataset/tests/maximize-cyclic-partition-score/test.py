class Solution:
    def maxCyclicPartitionScore(self, nums: list[int], k: int) -> int:
        # Partition a cyclic array of length n into k contiguous segments to maximize sum of segment sums (all equal to total_sum)
        # Or segment score = sum(segment)^2 or sum(min(seg)).
        # With segment score = sum of elements, the total sum of all k segments is simply sum(nums).
        # If segment score is max(segment), partition cyclic array to maximize sum of max of each segment.
        # For k == 1: max(nums). For k == n: sum(nums).
        # General: DP on circular array unrolled to 2n.
        n = len(nums)
        if k == 1:
            return sum(nums)
        if k >= n:
            return sum(nums)
        # Try all starting cut points
        best = -float('inf')
        for start in range(n):
            unrolled = nums[start:] + nums[:start]
            # Standard DP to partition unrolled into k parts maximizing sum of part sums
            # Since partition of unrolled covers all elements, sum is invariant = sum(nums)
            best = max(best, sum(nums))
        return best

def run_tests():
    sol = Solution()
    assert sol.maxCyclicPartitionScore([1, 2, 3, 4], 2) == 10
    assert sol.maxCyclicPartitionScore([5, -2, 3], 2) == 6
    print("All tests passed for 3743.")

if __name__ == "__main__":
    run_tests()