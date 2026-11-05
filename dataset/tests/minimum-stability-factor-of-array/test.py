from typing import List

class Solution:
    def minStabilityFactor(self, nums: List[int], k: int) -> int:
        # A partition into at most k subarrays
        # Stability factor is max(max(sub) - min(sub))
        def check(limit: int) -> bool:
            parts = 1
            curr_min = nums[0]
            curr_max = nums[0]
            for x in nums[1:]:
                n_min = min(curr_min, x)
                n_max = max(curr_max, x)
                if n_max - n_min > limit:
                    parts += 1
                    curr_min = x
                    curr_max = x
                    if parts > k:
                        return False
                else:
                    curr_min = n_min
                    curr_max = n_max
            return parts <= k

        low = 0
        high = max(nums) - min(nums) if nums else 0
        ans = high
        
        while low <= high:
            mid = (low + high) // 2
            if check(mid):
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
                
        return ans

def run_tests():
    s = Solution()
    res1 = s.minStabilityFactor([1, 5, 2, 7, 3], 2)
    assert res1 == 4, f"Expected 4, got {res1}" # [1, 5, 2] (diff 4) and [7, 3] (diff 4)
    res2 = s.minStabilityFactor([1, 2, 3], 3)
    assert res2 == 0, f"Expected 0, got {res2}"
    print("3605 minimum-stability-factor-of-array PASSED")

if __name__ == "__main__":
    run_tests()
