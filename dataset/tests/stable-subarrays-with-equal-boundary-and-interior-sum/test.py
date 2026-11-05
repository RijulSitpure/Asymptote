from collections import defaultdict

class Solution:
    def countStableSubarrays(self, nums: list[int]) -> int:
        # A subarray nums[i..j] with j - i >= 2 is stable if:
        # nums[i] + nums[j] == sum(nums[i+1..j-1])
        # sum(nums[i+1..j-1]) = P[j] - P[i+1] where P is prefix sum
        # So nums[i] + nums[j] == P[j] - P[i+1]
        # Rearranging: nums[i] + P[i+1] == P[j] - nums[j]
        # We need pairs (i, j) with j >= i + 2 where (nums[i] + P[i+1]) == (P[j] - nums[j])
        n = len(nums)
        P = [0] * (n + 1)
        for idx in range(n):
            P[idx + 1] = P[idx] + nums[idx]
            
        count = 0
        left_counts = defaultdict(int)
        for j in range(2, n):
            # i = j - 2 is newly eligible
            i = j - 2
            left_key = nums[i] + P[i + 1]
            left_counts[left_key] += 1
            
            right_key = P[j] - nums[j]
            count += left_counts[right_key]
            
        return count

def run_tests():
    sol = Solution()
    # nums = [2, 3, 1] -> i=0, j=2: nums[0]+nums[2] = 2+1=3; interior nums[1] = 3. Equal! -> count 1
    assert sol.countStableSubarrays([2, 3, 1]) == 1
    assert sol.countStableSubarrays([1, 2, 3]) == 0 # 1+3=4 != 2
    assert sol.countStableSubarrays([1, 1, 1, 1]) == 1
    print("All tests passed for 3728.")

if __name__ == "__main__":
    run_tests()