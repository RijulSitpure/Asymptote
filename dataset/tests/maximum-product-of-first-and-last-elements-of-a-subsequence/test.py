from typing import List

class Solution:
    def maxProduct(self, nums: List[int], m: int) -> int:
        n = len(nums)
        if n < m:
            return 0
        
        pref_min = float('inf')
        pref_max = -float('inf')
        best = -float('inf')
        
        for j in range(m - 1, n):
            i = j - (m - 1)
            pref_min = min(pref_min, nums[i])
            pref_max = max(pref_max, nums[i])
            
            val = nums[j]
            best = max(best, val * pref_min, val * pref_max)
            
        return best

def run_tests():
    s = Solution()
    res1 = s.maxProduct([1, 2, 3, 4], 2)
    assert res1 == 12, f"Expected 12, got {res1}" # 3 * 4 = 12
    res2 = s.maxProduct([-2, 1, -4], 2)
    assert res2 == 8, f"Expected 8, got {res2}" # -2 * -4 = 8
    print("3584 maximum-product-of-first-and-last-elements-of-a-subsequence PASSED")

if __name__ == "__main__":
    run_tests()
