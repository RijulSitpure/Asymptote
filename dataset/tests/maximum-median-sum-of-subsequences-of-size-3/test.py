from typing import List

class Solution:
    def maxMedianSum(self, nums: List[int]) -> int:
        nums.sort()
        n = len(nums)
        k = n // 3
        # To maximize the 2nd largest of each triplet, pick 1 smallest and 2 largest
        # Medians are picked at indices: n-2, n-4, n-6, ..., n-2k
        ans = 0
        for i in range(k):
            ans += nums[n - 2 - 2 * i]
        return ans

def run_tests():
    s = Solution()
    res1 = s.maxMedianSum([1, 2, 3, 4, 5, 6]) # triplets: [1, 5, 6] (median 5) and [2, 3, 4] (median 3) -> 8
    assert res1 == 8, f"Expected 8, got {res1}"
    res2 = s.maxMedianSum([2, 4, 5]) # triplet [2, 4, 5] -> median 4
    assert res2 == 4, f"Expected 4, got {res2}"
    print("3627 maximum-median-sum-of-subsequences-of-size-3 PASSED")

if __name__ == "__main__":
    run_tests()
