import sys
from typing import List

class Solution:
    def arrayNesting(self, nums: List[int]) -> int:
        max_len = 0
        for i in range(len(nums)):
            if nums[i] >= 0:
                count = 0
                curr = i
                while nums[curr] >= 0:
                    nxt = nums[curr]
                    nums[curr] = -1
                    curr = nxt
                    count += 1
                max_len = max(max_len, count)
        return max_len

def test():
    sol = Solution()
    assert sol.arrayNesting([5,4,0,3,1,6,2]) == 4, "test 1 failed"
    assert sol.arrayNesting([0,1,2]) == 1, "test 2 failed"
    print("✓ array-nesting passed")

if __name__ == "__main__":
    test()
