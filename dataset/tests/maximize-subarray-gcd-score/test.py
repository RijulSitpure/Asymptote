from typing import List
import math

class Solution:
    def maxGCDScore(self, nums: List[int], k: int) -> int:
        n = len(nums)
        best = 0
        for i in range(n):
            curr_gcd = 0
            for j in range(i, n):
                curr_gcd = math.gcd(curr_gcd, nums[j])
                length = j - i + 1
                base_score = length * curr_gcd
                if base_score > best:
                    best = base_score
                
                # Check potential upgrade by doubling up to k elements
                odd_count = sum(1 for m in range(i, j + 1) if (nums[m] // curr_gcd) % 2 != 0)
                if odd_count <= k:
                    upgraded_score = length * (curr_gcd * 2)
                    if upgraded_score > best:
                        best = upgraded_score
        return best

def run_tests():
    s = Solution()
    res1 = s.maxGCDScore([2, 4], 1)
    assert res1 == 8, f"Expected 8, got {res1}" # [2, 4] -> double 2 to get [4, 4], gcd 4 * 2 = 8
    res2 = s.maxGCDScore([3, 5], 0)
    assert res2 == 5, f"Expected 5, got {res2}"
    print("3574 maximize-subarray-gcd-score PASSED")

if __name__ == "__main__":
    run_tests()
