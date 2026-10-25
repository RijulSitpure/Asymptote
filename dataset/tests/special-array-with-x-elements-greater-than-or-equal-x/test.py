class Solution:
    def specialArray(self, nums: list[int]) -> int:
        nums.sort(reverse=True)
        n = len(nums)
        for x in range(1, n + 1):
            if nums[x - 1] >= x and (x == n or nums[x] < x):
                return x
        return -1

def test():
    sol = Solution()
    assert sol.specialArray([3, 5]) == 2
    assert sol.specialArray([0, 0]) == -1
    assert sol.specialArray([0, 4, 3, 0, 4]) == 3

    print("✓ special-array-with-x-elements-greater-than-or-equal-x passed")

if __name__ == '__main__':
    test()
