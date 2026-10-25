class Solution:
    def minPairSum(self, nums: list[int]) -> int:
        nums.sort()
        n = len(nums)
        return max(nums[i] + nums[n - 1 - i] for i in range(n // 2))

def test():
    sol = Solution()
    assert sol.minPairSum([3,5,2,3]) == 7
    assert sol.minPairSum([3,5,4,2,4,6]) == 8

if __name__ == '__main__':
    test()
