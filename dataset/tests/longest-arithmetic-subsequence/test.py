from typing import List

class Solution:
    def longestArithSeqLength(self, nums: List[int]) -> int:
        dp = {}
        max_len = 2
        for i in range(len(nums)):
            for j in range(i):
                diff = nums[i] - nums[j]
                dp[(i, diff)] = dp.get((j, diff), 1) + 1
                if dp[(i, diff)] > max_len:
                    max_len = dp[(i, diff)]
        return max_len

def test():
    sol = Solution()
    assert sol.longestArithSeqLength([3,6,9,12]) == 4, "test 1 failed"
    assert sol.longestArithSeqLength([9,4,7,2,10]) == 3, "test 2 failed"
    assert sol.longestArithSeqLength([20,1,15,3,10,5,8]) == 4, "test 3 failed"
    print("✓ longest-arithmetic-subsequence passed")

if __name__ == "__main__":
    test()
