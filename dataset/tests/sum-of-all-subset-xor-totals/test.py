class Solution:
    def subsetXORSum(self, nums: list[int]) -> int:
        total_or = 0
        for x in nums:
            total_or |= x
        return total_or << (len(nums) - 1)

def test():
    sol = Solution()
    assert sol.subsetXORSum([1,3]) == 6
    assert sol.subsetXORSum([5,1,6]) == 28
    assert sol.subsetXORSum([3,4,5,6,7,8]) == 480

if __name__ == '__main__':
    test()
