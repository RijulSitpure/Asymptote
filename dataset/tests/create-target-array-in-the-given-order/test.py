class Solution:
    def createTargetArray(self, nums: list[int], index: list[int]) -> list[int]:
        target = []
        for num, idx in zip(nums, index):
            target.insert(idx, num)
        return target

def test():
    sol = Solution()
    assert sol.createTargetArray([0,1,2,3,4], [0,1,2,2,1]) == [0,4,1,3,2], "test 1 failed"
    assert sol.createTargetArray([1,2,3,4,0], [0,1,2,3,0]) == [0,1,2,3,4], "test 2 failed"
    assert sol.createTargetArray([1], [0]) == [1], "test 3 failed"
    print("✓ create-target-array-in-the-given-order passed")

if __name__ == "__main__":
    test()
