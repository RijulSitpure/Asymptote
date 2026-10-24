from typing import List

class Solution:
    def canThreePartsEqualSum(self, arr: List[int]) -> bool:
        total = sum(arr)
        if total % 3 != 0:
            return False
        target = total // 3
        parts = 0
        cur = 0
        for x in arr:
            cur += x
            if cur == target:
                parts += 1
                cur = 0
        return parts >= 3

def test():
    sol = Solution()
    assert sol.canThreePartsEqualSum([0,2,1,-6,6,-7,9,1,2,0,1]) == True, "test 1 failed"
    assert sol.canThreePartsEqualSum([0,2,1,-6,6,7,9,-1,2,0,1]) == False, "test 2 failed"
    assert sol.canThreePartsEqualSum([3,3,6,5,-2,2,5,1,-9,4]) == True, "test 3 failed"
    print("✓ partition-array-into-three-parts-with-equal-sum passed")

if __name__ == "__main__":
    test()
