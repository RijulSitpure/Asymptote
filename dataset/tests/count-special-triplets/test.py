from typing import List
from collections import Counter

class Solution:
    def countSpecialTriplets(self, nums: List[int]) -> int:
        n = len(nums)
        if n < 3:
            return 0
        
        right_counts = Counter(nums)
        left_counts = Counter()
        
        ans = 0
        for x in nums:
            right_counts[x] -= 1
            target = 2 * x
            ans += left_counts[target] * right_counts[target]
            left_counts[x] += 1
            
        return ans

def run_tests():
    s = Solution()
    res1 = s.countSpecialTriplets([4, 2, 4])
    assert res1 == 1, f"Expected 1, got {res1}" # 4 == 2*2, 4 == 2*2
    res2 = s.countSpecialTriplets([2, 1, 2, 1, 2])
    assert res2 == 4, f"Expected 4, got {res2}"
    print("3583 count-special-triplets PASSED")

if __name__ == "__main__":
    run_tests()
