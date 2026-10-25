class Solution:
    def smallerNumbersThanCurrent(self, nums: list[int]) -> list[int]:
        s = sorted(nums)
        lookup = {}
        for i, x in enumerate(s):
            if x not in lookup:
                lookup[x] = i
        return [lookup[x] for x in nums]

def test():
    sol = Solution()
    assert sol.smallerNumbersThanCurrent([8,1,2,2,3]) == [4,0,1,1,3], "test 1 failed"
    assert sol.smallerNumbersThanCurrent([6,5,4,8]) == [2,1,0,3], "test 2 failed"
    assert sol.smallerNumbersThanCurrent([7,7,7,7]) == [0,0,0,0], "test 3 failed"
    print("✓ how-many-numbers-are-smaller-than-the-current-number passed")

if __name__ == "__main__":
    test()
