class Solution:
    def getMaximumXor(self, nums: list[int], maximumBit: int) -> list[int]:
        max_mask = (1 << maximumBit) - 1
        x = 0
        for num in nums:
            x ^= num

        ans = []
        for num in reversed(nums):
            ans.append(x ^ max_mask)
            x ^= num
        return ans

def test():
    sol = Solution()
    assert sol.getMaximumXor([0,1,1,3], 2) == [0,3,2,3]
    assert sol.getMaximumXor([2,3,4,7], 3) == [5,2,6,5]
    assert sol.getMaximumXor([0,1,2,2,5,7], 3) == [4,3,6,4,6,7]

if __name__ == '__main__':
    test()
