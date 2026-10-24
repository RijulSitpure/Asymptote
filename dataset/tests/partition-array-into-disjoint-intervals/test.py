from typing import List

class Solution:
    def partitionDisjoint(self, nums: List[int]) -> int:
        max_left = nums[0]
        cur_max = nums[0]
        split = 0
        for i in range(1, len(nums)):
            cur_max = max(cur_max, nums[i])
            if nums[i] < max_left:
                split = i
                max_left = cur_max
        return split + 1

def test():
    sol = Solution()
    assert sol.partitionDisjoint([5, 0, 3, 8, 6]) == 3, "test 1 failed"
    assert sol.partitionDisjoint([1, 1, 1, 0, 6, 12]) == 4, "test 2 failed"
    print("✓ partition-array-into-disjoint-intervals passed")

if __name__ == "__main__":
    test()
