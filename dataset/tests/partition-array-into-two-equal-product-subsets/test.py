from typing import List

class Solution:
    def checkEqualPartitions(self, nums: List[int], target: int) -> bool:
        total = 1
        for x in nums:
            total *= x
        if total != target * target:
            return False

        n = len(nums)
        for mask in range(1, (1 << n) - 1):
            curr = 1
            for i in range(n):
                if (mask >> i) & 1:
                    curr *= nums[i]
                    if curr > target:
                        break
            if curr == target:
                return True
        return False

def run_tests():
    s = Solution()
    res = s.checkEqualPartitions([2, 3, 6], 6)
    assert res is True, f"Expected True, got {res}"
    print("3566 partition-array-into-two-equal-product-subsets PASSED")

if __name__ == "__main__":
    run_tests()
