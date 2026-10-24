from typing import List

class Solution:
    def maxSumTwoNoOverlap(self, nums: List[int], firstLen: int, secondLen: int) -> int:
        def helper(l: int, m: int) -> int:
            pref = [0] * (len(nums) + 1)
            for i, x in enumerate(nums):
                pref[i + 1] = pref[i] + x
            max_l = 0
            res = 0
            for i in range(l + m, len(nums) + 1):
                max_l = max(max_l, pref[i - m] - pref[i - m - l])
                res = max(res, max_l + (pref[i] - pref[i - m]))
            return res

        return max(helper(firstLen, secondLen), helper(secondLen, firstLen))

def test():
    sol = Solution()
    assert sol.maxSumTwoNoOverlap([0,6,5,2,2,5,1,9,4], 1, 2) == 20, "test 1 failed"
    assert sol.maxSumTwoNoOverlap([3,8,1,3,2,1,8,9,0], 3, 2) == 29, "test 2 failed"
    print("✓ maximum-sum-of-two-non-overlapping-subarrays passed")

if __name__ == "__main__":
    test()
