from typing import List

class Solution:
    def subarraysWithKDistinct(self, nums: List[int], k: int) -> int:
        def atMost(distinct: int) -> int:
            if distinct <= 0:
                return 0
            count = {}
            left = 0
            res = 0
            for right, num in enumerate(nums):
                count[num] = count.get(num, 0) + 1
                while len(count) > distinct:
                    count[nums[left]] -= 1
                    if count[nums[left]] == 0:
                        del count[nums[left]]
                    left += 1
                res += right - left + 1
            return res

        return atMost(k) - atMost(k - 1)

def test():
    sol = Solution()
    assert sol.subarraysWithKDistinct([1,2,1,2,3], 2) == 7, "test 1 failed"
    assert sol.subarraysWithKDistinct([1,2,1,3,4], 3) == 3, "test 2 failed"
    print("✓ subarrays-with-k-different-integers passed")

if __name__ == "__main__":
    test()
