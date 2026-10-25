class Solution:
    def getMinDistance(self, nums: list[int], target: int, start: int) -> int:
        return min(abs(i - start) for i, x in enumerate(nums) if x == target)

def test():
    sol = Solution()
    assert sol.getMinDistance([1,2,3,4,5], 5, 3) == 1
    assert sol.getMinDistance([1], 1, 0) == 0
    assert sol.getMinDistance([1,1,1,1,1], 1, 0) == 0

if __name__ == '__main__':
    test()
