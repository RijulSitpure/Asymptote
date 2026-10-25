class Solution:
    def shuffle(self, nums: list[int], n: int) -> list[int]:
        res = []
        for i in range(n):
            res.append(nums[i])
            res.append(nums[i + n])
        return res

def test():
    sol = Solution()
    assert sol.shuffle([2,5,1,3,4,7], 3) == [2,3,5,4,1,7], "test 1 failed"
    assert sol.shuffle([1,2,3,4,4,3,2,1], 4) == [1,4,2,3,3,2,4,1], "test 2 failed"
    assert sol.shuffle([1,1,2,2], 2) == [1,2,1,2], "test 3 failed"
    print("✓ shuffle-the-array passed")

if __name__ == "__main__":
    test()
