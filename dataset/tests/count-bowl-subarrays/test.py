from typing import List

class Solution:
    def countBowlSubarrays(self, nums: List[int]) -> int:
        n = len(nums)
        ans = 0
        for l in range(n):
            for r in range(l + 2, n):
                boundary_min = min(nums[l], nums[r])
                is_bowl = True
                for i in range(l + 1, r):
                    if nums[i] >= boundary_min:
                        is_bowl = False
                        break
                if is_bowl:
                    ans += 1
        return ans

def run_tests():
    sol = Solution()
    assert sol.countBowlSubarrays([3, 1, 4]) == 1 # [3, 1, 4]: 1 < min(3, 4) -> valid
    assert sol.countBowlSubarrays([1, 2, 3]) == 0 # no element between is strictly smaller than both ends
    assert sol.countBowlSubarrays([5, 2, 1, 4]) == 2 # [5,2,1,4]->min(5,4)=4 > 2,1 valid; [2,1,4]->min(2,4)=2 > 1 valid
    print("All tests passed for 3676.")

if __name__ == "__main__":
    run_tests()
