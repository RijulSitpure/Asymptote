class Solution:
    def minOperations(self, nums: list[int]) -> int:
        ans = 0
        for i in range(1, len(nums)):
            if nums[i] <= nums[i - 1]:
                target = nums[i - 1] + 1
                ans += target - nums[i]
                nums[i] = target
        return ans

def test():
    sol = Solution()
    assert sol.minOperations([1,1,1]) == 3
    assert sol.minOperations([1,5,2,4,1]) == 14
    assert sol.minOperations([8]) == 0

if __name__ == '__main__':
    test()
