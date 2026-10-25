class Solution:
    def minDifference(self, nums: list[int]) -> int:
        if len(nums) <= 4:
            return 0
        nums.sort()
        return min(
            nums[-1] - nums[3],
            nums[-2] - nums[2],
            nums[-3] - nums[1],
            nums[-4] - nums[0]
        )

def test():
    sol = Solution()
    assert sol.minDifference([5,3,2,4]) == 0, "test 1 failed"
    assert sol.minDifference([1,5,0,10,14]) == 1, "test 2 failed"
    assert sol.minDifference([3,100,20]) == 0, "test 3 failed"
    print("✓ minimum-difference-between-largest-and-smallest-value-in-three-moves passed")

if __name__ == "__main__":
    test()
