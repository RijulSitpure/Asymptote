from collections import defaultdict

class Solution:
    def countStableSubarrays(self, nums: list[int]) -> int:
        n = len(nums)
        P = [0] * (n + 1)
        for idx in range(n):
            P[idx + 1] = P[idx] + nums[idx]
            
        count = 0
        left_counts = defaultdict(int)
        for j in range(2, n):
            i = j - 2
            left_key = nums[i] + P[i + 1]
            left_counts[left_key] += 1
            right_key = P[j] - nums[j]
            count += left_counts[right_key]
        return count

def run_tests():
    sol = Solution()
    assert sol.countStableSubarrays([2, 3, 1]) == 1
    assert sol.countStableSubarrays([1, 1, 1, 1]) == 1
    assert sol.countStableSubarrays([1, 2, 3]) == 0
    print("All tests passed for 3748.")

if __name__ == "__main__":
    run_tests()