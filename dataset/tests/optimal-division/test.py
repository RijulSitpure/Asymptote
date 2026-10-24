import sys
from typing import List

class Solution:
    def optimalDivision(self, nums: List[int]) -> str:
        if len(nums) == 1:
            return str(nums[0])
        if len(nums) == 2:
            return f"{nums[0]}/{nums[1]}"
        return f"{nums[0]}/({'/'.join(map(str, nums[1:]))})"

def test():
    sol = Solution()
    assert sol.optimalDivision([1000,100,10,2]) == "1000/(100/10/2)", "test 1 failed"
    assert sol.optimalDivision([2,3,4]) == "2/(3/4)", "test 2 failed"
    print("✓ optimal-division passed")

if __name__ == "__main__":
    test()
