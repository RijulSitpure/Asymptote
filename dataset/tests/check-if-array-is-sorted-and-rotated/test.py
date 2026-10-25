class Solution:
    def check(self, nums: list[int]) -> bool:
        drops = 0
        n = len(nums)
        for i in range(n):
            if nums[i] > nums[(i + 1) % n]:
                drops += 1
                if drops > 1:
                    return False
        return True

def test():
    sol = Solution()
    assert sol.check([3,4,5,1,2]) == True
    assert sol.check([2,1,3,4]) == False
    assert sol.check([1,2,3]) == True

    print("✓ check-if-array-is-sorted-and-rotated passed")

if __name__ == '__main__':
    test()
