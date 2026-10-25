class Solution:
    def runningSum(self, nums: list[int]) -> list[int]:
        for i in range(1, len(nums)):
            nums[i] += nums[i - 1]
        return nums

def test():
    sol = Solution()
    assert sol.runningSum([1,2,3,4]) == [1,3,6,10], "test 1 failed"
    assert sol.runningSum([1,1,1,1,1]) == [1,2,3,4,5], "test 2 failed"
    assert sol.runningSum([3,1,2,10,1]) == [3,4,6,16,17], "test 3 failed"
    print("✓ running-sum-of-1d-array passed")

if __name__ == "__main__":
    test()
